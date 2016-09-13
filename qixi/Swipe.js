function Swipe (container) {
    var element = container.find(":first");//获取第一个子节点

    var swipe = {};//滑动对象

    // var slides = element.find("li");//li页面的数量
    var slides = element.find('>');
    var width = container.width();
    var height = container.height();
    //设置li的总宽度和高度
    element.css({
        width: (slides.length * width) + 'px',
        height: height + 'px'
    });
    //设置每一个页面li的宽高
    $.each(slides, function(idx){
        var slide = slides.eq(idx);//.eq(index)方法将匹配元素集缩减值指定index上的一个
        slide.css({
            width: width + 'px',
            height: height + 'px'
        })
    });

    swipe.scrollTo = function (x, speed) {
        element.css({
            'transition-timing-function': 'liner',
            'transition-duration':  speed + 'ms',
            'transform': 'translate3d( -' + x + 'px, 0px, 0px)'
        });
        return this;
    };
    return swipe;
}
