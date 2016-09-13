// 动画结束事件
var animationEnd = (function() {
   var explorer = navigator.userAgent;
   if (~explorer.indexOf('WebKit')) {
       return 'webkitAnimationEnd';
   }
   return 'animationend';
})();

//lamp animation
var lamp = {
    elem : $('.b_background'),
    bright: function () {
        this.elem.addClass('lamp-bright');
    },
    dark:function () {
        this.elem.removeClass('lamp-bright');
    }
}

var container = $("#content");
var swipe = Swipe(container);
var visualWidth = container.width();
var visualHeight = container.height();

//****************screen  scroll
function scrollTo (time, proportionX) {
    var distX = container.width() * proportionX;
    swipe.scrollTo(distX, time);
}
swipe.scrollTo(0, 0);
//*******************************

var getValue = function (className) {
    var $elem = $('' + className + '')
    return {
        height: $elem.height(),
        top: $elem.position().top
    }
}

var bridgeY = function () {
    var data = getValue('.c_background_middle');
    return data.top;
}();


//****************************girl
var girl = {
    elem: $('.girl'),
    getHeight: function() {
        return this.elem.height();
    },
    rotate: function() {
        this.elem.addClass('girl-rotate');
    },
    setOffset: function (){
        this.elem.css({
            left: visualWidth /2,
            top: bridgeY - this.getHeight()
        });
    },
    setPosition:function() {
        this.elem.css({
            left: visualWidth /2,
            top: bridgeY - this.getHeight()
        })
    },
    getPosition: function() {
        return this.elem.position();
    },
    getOffset: function() {
        return this.elem.offset();
    },
    getWidth: function() {
        return this.elem.width();
    }
}

girl.setPosition();
//***************************************
//***********************logo
var logo = {
    elem: $('.logo'),
    run: function() {
        this.elem.addClass('logolightSpeedIn')
        .on('webkitAnimationEnd', function() {
            $(this).addClass('logoshake').off();
        })
    }
}
//**********************************
//********************flower
var snowflakeURL = [
    'images/snowflake/snowflake1.png',
    'images/snowflake/snowflake2.png',
    'images/snowflake/snowflake3.png',
    'images/snowflake/snowflake4.png',
    'images/snowflake/snowflake5.png',
    'images/snowflake/snowflake6.png'
]
function snowflake () {
    var $flakeContainer = $('#snowflake');

    function getImagesName () {
        return snowflakeURL[[Math.floor(Math.random() * 6)]];
    }

    function createSnowBox (argument) {
        var url = getImagesName();
        return $('<div class="snowbox" />').css({
            'width': 41,
            'height': 41,
            'position': 'absolute',
            'backgroundSize': 'cover',
            'zIndex': 100000,
            'top': '-41px',
            'backgroundImage': 'url(' + url + ')'
        }).addClass('snowRoll');
    }

    // 开始飘花
    setInterval(function() {
        // 运动的轨迹
        var startPositionLeft = Math.random() * visualWidth - 100,
            startOpacity    = 1,
            endPositionTop  = visualHeight - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration        = visualHeight * 10 + Math.random() * 5000;

        // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;

        // 创建一个雪花
        var $flake = createSnowBox();

        // 设计起点位置
        $flake.css({
            left: startPositionLeft,
            opacity : randomStart
        });

        // 加入到容器
        $flakeContainer.append($flake);

        // 开始执行动画
        $flake.transition({
            top: endPositionTop,
            left: endPositionLeft,
            opacity: 0.7
        }, duration, 'ease-out', function() {
            $(this).remove() //结束后删除
        });

    }, 200);
}
//********************************
//*************************bird
var bird = {
    elem:$(".bird"),
    fly:function(){
        this.elem.addClass('birdFly')
        this.elem.transition({
            right:container.width()
        },15000,'linear');
    }
}
//******************************


function doorAction (left, right, time) {
    var $door = $('.door');
    var doorLeft = $('.door-left');
    var doorRight = $('.door-right');
    var defer = $.Deferred();
    var count = 2;//开关门是两个动作此处是为了监听动画是否完成即开关门动作是否结束
    var complete = function () {
        if (count == 1) {
            defer.resolve();
            return;
        }
        count --;
    }
    doorLeft.transition({
        'left': left
    }, time, complete);

    doorRight.transition({
        'left':right
    },time, complete);
    return defer;
}

function openDoor(){
    return doorAction('-50%', '100%', 2000);
}

function shutDoor () {
    return doorAction('0%', '50%', 2000);
}

var instanceX;
//boy walk
function BoyWalk () {
    var container = $('#content');
    //page visible zone
    var visualWidth = container.width();
    var visualHeight = container.height();
    // var swipe = Swipe($("#content"));

    //get data
    var getValue = function (className) {
        var $elem = $('' + className + '');
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    };

    var pathY = function () {
        var data = getValue('.a_background_middle');
        return data.top + data.height /2 ;
    }();

    var $boy = $('#boy');
    var boyHeight = $boy.height();
    var boyWidth = $boy.width();
    $boy.css({
        top:pathY - boyHeight + 25 //25是个修正值路中间的坐标减去男孩的身高
    })

    /////////////////////////////////////
    //================animation==================

    function pauseWalk () {
        $boy.addClass('pauseWalk');
    }

    function restoreWalk () {
        $boy.removeClass('pauseWalk');
    }

    function slowWalk () {
        $boy.addClass('slowWalk');//class slowWalk mainly be used to set the boy.png's background-poistion through which we can emulate walking animation.
    }

    function startRun (options, runTime) {
        var dfdPlay = $.Deferred();
        restoreWalk();
        $boy.transition(
            options,
            runTime,
            'linear',
            function(){
                dfdPlay.resolve();//set deferred's status is done(success)
            }
            );
        return dfdPlay;
    }

    function walkRun (time, dist, disY) {
        time = time || 3000;
        slowWalk();// call the function of slowWalk to relize walking animation but stay put
        var d1 = startRun({//设置男孩走动的动画
            'left': dist + 'px',
            'top': disY ? disY :undefined
        },time);//set the destionation then relize real walking animation not stay put
        return d1;
    }

    function walkToShop (runTime) {
        var defer = $.Deferred();
        var doorObj = $('.door');
        var offsetDoor = doorObj.offset();
        var doorOffsetLeft = offsetDoor.left;
        var offsetBoy = $boy.offset();
        var boyOffsetLeft = offsetBoy.left;

        instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + $boy.width() /2);//得出小男孩走到门中间还需要多少距离
        var walkPlay = startRun({
            transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
            opacity: 0.1
        }, 2000);
        walkPlay.done(function(){
            $boy.css({
                opacity:0
            })
            defer.resolve();
        })
        return defer;
    }

    function walkOutShop (runTime) {
        var defer = $.Deferred();
        restoreWalk();
        var walkPlay = startRun({
            transform:'translateX' + instanceX + 'px),scale(1,1)',
            opacity:1
        },runTime);
        walkPlay.done(function(){
            defer.resolve();
        })
        return defer;
    }

    function takeFlower () {
        var defer = $.Deferred();
        setTimeout(function(){
            $boy.addClass('slowflowerWalk');
            defer.resolve();
        },1000);
        return defer;
    }

    function calculateDist (direction, proportion) {
        return (direction == 'x' ? visualWidth: visualHeight) * proportion;
    }

    return {
        walkTo: function (time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX);
            var distY = calculateDist('y', proportionY);
            return walkRun(time, distX, distY); //call the function of walkRun to relize walking animation
        },
        toShop:function() {
            return walkToShop.apply(null, arguments);
        },
        outShop: function(){
            return walkOutShop.apply(null, arguments);
        },
        stopWalk: function (value) {
            pauseWalk();
        },
        setColor:function (value) {
            $boy.css('background-color', value)
        },
        takeFlower: function() {
            return takeFlower();
        },
        // 获取男孩的宽度
        getWidth: function() {
            return $boy.width();
        },
        // 复位初始状态
        resetOriginal: function() {
            this.stopWalk();
            // 恢复图片
            $boy.removeClass('slowWalk slowflowerWalk').addClass('boyOriginal');
        },
       // 转身动作
       rotate: function(callback) {
           restoreWalk();
           $boy.addClass('boy-rotate');
           // 监听转身完毕
           if (callback) {
               $boy.on(animationEnd, function() {
                   callback();
                   $(this).off();
               })
           }
       },
        setFlowerWalk:function(){
             $boy.addClass('slowflowerWalk');
        }
    }
}

