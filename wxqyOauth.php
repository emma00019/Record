<?php
namespace webapp\modules\micromall\controllers;

use Yii;
use MongoId;
use yii\web\Controller;
use yii\web\View;
use yii\web\Cookie;
use backend\utils\UrlUtil;
use backend\utils\LogUtil;
use backend\models\Token;

/**
 * Corporation controller
 */
class CorporationController extends Controller
{
    const WEIXIN_QIYE_DOMAIN = 'https://qyapi.weixin.qq.com';
    const CORP_ID = 'wx28f0f3647489f4a7';
    const CORP_SECRET = 'Em5qyzfwpL4tGF1vF36zD3DByypJFkjPhjTJQPpsILN4oIl864Qncv9JLi9gjycz';

    const PREFIX = 'micromall';
    const CACHE_TYPE_TOKEN = 'qy_token_';

    /*
    * this is for weixin qy oauth
    */
    public function actionOauth()
    {
        $redirect = Yii::$app->request->get('redirect');
        $userId = $this->getUserInfo();
        if (empty($userId)) {
            $url = $this->buildOauthUrl(self::CORP_ID, $redirect);
            $this->redirect($url);
        } else {
            $this->updateUserExpire();
            $url = UrlUtil::buildQuery($redirect, ['userId' => $userId]);
            $this->redirect($url);
        }
    }

    public function actionBaseOauth()
    {
        $code = Yii::$app->request->get('code');
        $redirectUri = Yii::$app->request->get('redirect');
        $result = $this->getUserIdByCode($code);
        if ($result) {
            $userId = $result->UserId;
            $this->setUserId($userId);
            $redirectUri = urldecode($redirectUri);
            $url = UrlUtil::buildQuery($redirectUri, ['userId' => $userId]);
            $this->redirect($url);
        }
    }

    public function updateUserExpire()
    {
        $cookies = Yii::$app->request->cookies;
        if (($cookie = $cookies->get('userid')) !== null) {
            $cookie->secure = SECURE_COOKIE;
            $cookie->expire = time() + Token::EXPIRE_TIME;
            Yii::$app->response->cookies->add($cookie);
        }
    }

    private function formatRedirect($redirect)
    {
        return urlencode($redirect);
    }

    private function buildOauthUrl($corpId, $redirectUri)
    {
        $doamin = UrlUtil::getDomain();
        $redirectUri = urlencode($redirectUri);
        $redirect = $doamin . '/webapp/micromall/corporation/base-oauth?redirect=' . $redirectUri;
        $redirect = $this->formatRedirect($redirect);
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=$corpId&redirect_uri=$redirect&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    }

    /* add userid to cookie*/
    private function setUserId($userId)
    {
        $cookies = Yii::$app->response->cookies;
        $cookies->add(new Cookie(['name' => 'userid', 'value' => $userId, 'expire' => time() + Token::EXPIRE_TIME, 'secure' => SECURE_COOKIE]));
    }

    /* get userId from cookie by userid*/
    private function getUserInfo()
    {
        $cookies = Yii::$app->request->cookies;
        $userId = '';
        if (($cookie = $cookies->get('userid')) !== null) {
            $userId = $cookie->value;
        }
        return $userId;
    }

    /*get userid from weixin api*/
    private function getUserIdByCode($code)
    {
        $accessToken = $this->getAccessToken();
        $url = self::WEIXIN_QIYE_DOMAIN . "/cgi-bin/user/getuserinfo?access_token=$accessToken&code=$code";
        return json_decode($this->_curl($url));
    }

    /*get accesstoken from weixin api by corpid and corpsecret*/
    private function getQyAccessToken($corpId, $corpSecret)
    {
        $url = self::WEIXIN_QIYE_DOMAIN . "/cgi-bin/gettoken?corpid=$corpId&corpsecret=$corpSecret";
        return json_decode($this->_curl($url));
    }

    /*get accesstoken from cache or call getAccessToken method*/
    private function getAccessToken()
    {
        try {
            $token =  Yii::$app->cache->get(self::PREFIX . self::CACHE_TYPE_TOKEN . self::CORP_ID);
            if (empty($token)) {
                $data = $this->getQyAccessToken(self::CORP_ID, self::CORP_SECRET);
                $token = $data->access_token;
                $expire_in = (int)$data->expires_in;
                if ($expire_in > 0) {
                    Yii::$app->cache->set(self::PREFIX . self::CACHE_TYPE_TOKEN . self::CORP_ID, $token, $expire_in);
                    LogUtil::info(['message' => 'get token','token' => $token], 'micromall-qyapi');
                }
            }
            return $token;
        } catch (yii\base\Exception $e) {
            LogUtil::error(['message' => 'Get access_token occurs error', 'error' => $e->getMessage()], 'micromall-qyapi');
            return '';
        }
    }

    //just get method
    private function _curl($url)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $output = curl_exec($ch);
        if ($output === false) {
            $output = '{"error": "error"}';
        }
        curl_close($ch);

        return $output;
    }

}
