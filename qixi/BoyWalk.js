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

    function calculateDist (direction, proportion) {
        return (direction == 'x' ? visualWidth: visualHeight) * proportion;
    }

    return {
        walkTo: function (time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX);
            var distY = calculateDist('y', proportionY);
            return walkRun(time, distX, distY); //call the function of walkRun to relize walking animation
        },
        stopWalk: function (value) {
            pauseWalk();
        },
        setColor:function (value) {
            $boy.css('background-color', value)
        }
    }
}
