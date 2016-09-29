## 申请企业号
- 登录https://qy.weixin.qq.com/
- 注册（在选择主体类型的时候可以选择“团体”接下来根据提示填写信息）
- 操作流程：http://jingyan.baidu.com/article/5553fa82e6e8da65a239340e.html

## 扫描登录企业号初始化员工列表
- 在”通讯录“中的”组织架构“中添加部门或子部门，在”标签“中添加标签
- 在对应的部门下添加成员填写基本信息，可以设置所在部门和标签

## 添加应用

### 应用类别
- 消息型应用和主页型应用
- 消息型应用以会话的形式展现，可配置菜单；适合发送通知，跟成员互动
- 主页型应用，进入应用后可直接打开自定义的页面，同时具备消息提醒能力；适合作为社区，OA等类型应用入口

## 设置权限
- 设置权限是因为如果你想跟企业号中的员工进行互动，比如说发送消息是需要调用企业号接口的,这个时候我们是需要accesstoken。
- 在每次主动调用企业号接口的时候需要带上AccessToken。AccessToken参数由CorpID和Secret换取。CorpID是企业号的标识，每个企业号拥有一个CorpID;Secret是管理组凭证密钥。
- 系统管理员可通过管理端的”权限“管理功能创建管理组，分配管理组对应用、通讯的访问权限。完成后，管理组即可获得唯一的Secret。系统管理组可以通过权限管理查看所有管理组的secret。

## 获取AccessToken
**GET** https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=id&corpsecret=secrect
- 参数说明

    | 参数 | 必须 | 说明 |
    | --- | --- | --- |
    |corpid|是|企业Id|
    |corpsecret| 是|管理组的凭证密钥|

- 权限说明：
    每个secret代表了对应用、通讯录的不同权限；不同的管理组拥有不同的secret
- 返回结果：

  ```
    {
        "access_token": "ObOMcH1q4-ToOLdjAvozKjMTkYY805tuJ_A7ee1JlL9iiuzlIAHGvAUc18HUoUsM",
        "expires_in": 7200
    }
  ```

## 发送消息
**POST** https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=ACCESS_TOKEN
- 参数说明

    | 参数 | 必须 | 说明 |
    | --- | --- | --- |
    |access_token|是|调用接口凭证|

- 权限说明
    收件人必须处于应用的可见范围内【应用中心中该应用的可见范围】，并且管理组对应用有使用权限【设置中权限管理中的应用权限】、对收件人有查看权限【设置中的通讯录权限】，否则本次调用失败
- 如果"touser" 中包含没有权限的用户则不会发送成功，请求参数和发送结果如下：

    ```
    请求的参数：
        {
           "touser":"YT00555|YT00604",
           "toparty":"3|4",
           "totag":"2",
           "msgtype": "text",
           "agentid": 2,
           "text": {
               "content": "微商城列表7"
           },
           "safe":0
        }
    发送结果：
        {
            "errcode": 60011,
            "errmsg": "no privilege to access/modify contact/party/agent ",
            "invaliduser": "yt00604",
            "invalidparty": "all party invalid"
        }
    ```

- 如果“toparty”要发送的部门或“totag”要发送的标签包含没有权限的，但"touser"有权限也可以发送成功，请求参数和发送结果如下：

    ```
    请求的参数：
        {
           "touser":"YT00555",
           "toparty":"4",
           "totag":"2",
           "msgtype": "text",
           "agentid": 2,
           "text": {
               "content": "微商城列表7"
           },
           "safe":0
        }
    发送结果：
        {
            "errcode": 0,
            "errmsg": "ok",
            "invalidparty": "all party invalid"
        }
    ```

## 员工查看微商城订单
- 在企业号的菜单中配置订单列表的url
- 调用weconnect创建菜单的api创建菜单<br/>
    http://git.augmentum.com.cn/scrm/we-connect/blob/develop/docs/wechatcp_api.md#create-or-update-menus
- 直接调用微信创建菜单的api创建菜单<br/>
    **POST** https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN&agentid=AGENTID

    ```
    click和view类型请求包如下：
    {
       "button":[
           {
               "type":"click",
               "name":"今日歌曲",
               "key":"V1001_TODAY_MUSIC"
           },
           {
               "name":"菜单",
               "sub_button":[
                   {
                       "type":"view",
                       "name":"搜索",
                       "url":"http://www.soso.com/"
                   },
                   {
                       "type":"click",
                       "name":"赞一下我们",
                       "key":"V1001_GOOD"
                   }
               ]
          }
       ]
    }
    ```

## 群脉客服
- 企业号的系统管理员可以授权安装第三方应用，授权可以有两种发起方式：<br/>
     1.企业号第三方网站发起（授权完成跳转到服务商网站）<br/>
     2.服务商网站发起（授权完成跳转到服务商网站）<br/>
     以上两种授权方式并不冲突，服务商可以同时支持。<br/>

     在企业号中<br/>
         服务中心->企业客服->点击“开始使用”按钮->点击“授权第三方”->外部客户客服->选择客服列表之后点击“开始授权”<br/>
     在群脉的客服设置中（服务商）<br/>
         客服接入渠道->微信企业号->点击新增微信企业号->登录->设置授权内容->点击授权安装<br/>
         客服的企业号必须跟企业号中的唯一id一致【如果不一致登录或登出会提示“用户不存在”】<br/>
     结果：在企业号中能看到“群脉微客服-小助手”

- 取消授权：
     在企业号中取消

## 身份验证
### OAuth验证接口
- 企业应用中的URL链接（包括自定义菜单或者消息中的链接），可以通过OAuth2.0验证接口来获取成员的身份信息。

- 此URL的域名，必须完全匹配企业应用设置项中的’可信域名‘（如果你的redirect_uri有端口，那’可信域名‘也必须加上端口号），否则跳转时会提示 redirect_uri参数错误。

- 企业获取code
    如果需要员工在跳转到企业网页时带上员工的身份信息，需构造如下链接：<br/>
        https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
    参数说明：

    | 参数 | 必须 | 说明 |
    | --- | --- | --- |
    |appid|是|企业的CorpID|
    |redirect_uri|是|授权后重定向的回调链接地址，请使用urlencode对链接进行处理|
    |response_type|是|返回类型，此时固定为code|
    |scope|是|应用授权作用域，固定为snsapi_base|
    |state|否|重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不超过128个字节|
    |#wechat_redirect|是|微信终端使用此参数判断是否需要带上身份信息|

    员工点击后，页面将跳转至redirect_uri?code=CODE&state=STATE,企业可根据code参数获得员工的userid。

- 根据code获取成员信息
**GET** https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE
    参数说明：

    | 参数 | 必须 | 说明 |
    | --- | --- | --- |
    |access_token|是|调用接口凭证|
    |code|是|通过成员授权获取到的code，每次成员授权带上的code将不一样，code只能使用一次，10分钟未被使用自动过期|
    权限说明：跳转的域名必须完全匹配管理组中任一应用的可信域名。
    返回结果：<br/>
    a)企业成员授权时返回

        ```
        {
            "UserId":"USERID",
            "DeviceId":"DEVICEID"
        }
        ```

    b)非企业成员授权时返回

        ```
        {
            "OpenId":"OPENID",
            "DeviceId":"DEVICEID"
        }
        ```

    c)出错时返回

        ```
        {
            "errorcode":"40029",
            "errmsg":"invalid code"
        }
        ```

## 关于套件的问题
  - 只有第三方应用提供商可以创建套件
  - 只有认证过得企业号才可以申请成为第三方应用提供商，并且需要是系统管理员的身份进行申请
  - 未认证过的企业号，不能创建应用套件，只能添加应用
