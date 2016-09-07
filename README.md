# Record
+ 克隆项目
```sh
    git clone https://github.com/emma00019/Record.git
```

# Switch
+ 实现开关的功能
+ 描述
```sh
	使用html，原生js和css3动画实现开关的开关效果。
	默认状态是开（绿色），关闭状态是灰色。
	2016-8-24第一次的尝试，以后想到更好的再做修改。
```
+ 使用的知识点
```sh
    @keyframes name //普通
    {
        from {background: green; margin-left:0px;}
        to {background: grey; margin-left:43px;}
    }
    @-webkit-keyframes name //chrome
    {
        from {background: green; margin-left:0px;}
        to {background: grey; margin-left:43px;}
    }
    样式
    -webkit-animation: name[@keyframes后面的名字] 1s（动画持续的时间）;
    -webkit-animation-fill-mode:forwards; /*停留在最后的位置*/（是否停留在最后的位置）

```

# Table
+ 实现在表格中添加一行，编辑/删除某行的功能
+ 使用的知识点
```sh
    创建元素:document.createElement(tag)
    创建内容：document.createTextNode(text)
    添加元素：parent.appendChild(child)
    删除元素：parent.removeChild(child)
    设置样式：tag.style.attr = "value"
    查找父元素：child.parentNode
    查找所有孩子：parent.childNodes
    删除父节点的所有子节点,循环使用倒序：
        for (var i = children.length - 1; i >= 0; i--) {
             parent.removeChild(children[i]);
        };
```
```sh
    最后一行的样式可以使用 tr:last-child 进行设置
    第一行的样式可以使用 tr:first-child 进行设置
```

# Event
+ 实现自定义事件
+ 使用的知识点
```sh
    创建事件：var ev = document.createEvent('HTMLEvents');
    初始化事件：ev.initEvent('myEvent',false,false);
    某个标签元素监听事件：el.addEventListener('myEvent',function(){})
    然后派发事件：el.dispatchEvent('ev');
```
+ createEvent|initEvent|dispatchEvent
```sh
    createEvent()方法返回新创建的Event对象，支持一个参数，表示事件类型，
    |参数        |事件接口    | 初始化方法 |
    |HTMLEvents  |HTMLEvent | initEvent()|
    |MouseEvents |MouseEvent| initMouseEvent()|
    |UIEvents    |UIEvent   | initUIEvent()|

    initEvent方法用于初始化通过DocumentEvent接口创建的Event的值，支持三个参数
    initEvent(eventName, canBubble,preventDefault).分别表示事件名称，是否可以冒泡，是否阻止事件的默认操作。

    dispatchEvent()就是触发执行了，参数表示事件对象，就是createEvent()方法返回的创建的Event对象。
```

# Bear
+ 绘制小熊图案
+ 使用的知识点
```sh
    getContext("2d")该方法返回一个对象,该对象提供了用于在画布上绘图的方法和属性
    moveTo(x1,y1)->移动绘画开始点到x1,y1
    lineTo(x1,y2)->从x1,y1画一条直线到（x2,y2）
    beginPath()方法开始一条路径，或重置当前的路径
    stroke()方法会实际绘制通过moveTo()和lineTo()方法定义的路径。默认颜色是黑色。
    canvas的绘制方法都是从beginPath之后的所有路径开始绘制的。
    closePath()不是关闭路径，它会试图从当前路径的终点连一条路径到起点，让整个路径闭合起来。但是，这并不是意味着它之后的路径就是新路径了。
    lineTo()方法添加一个新点，然后创建从该点到画布中最后指定点的线条（该方法并不会创建线条）。
    fillStyle属性设置或返回用于填充绘画的颜色、渐变或模式。
    strokeStyle属性设置或返回用于笔触的颜色、渐变或模式。
```
```sh
    globalCompositeOperation属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
        源图像=打算放置到画布上的绘图
        目标图像=已经放置到画布上的绘图
        source-over:在目标图像上显示源图像
        source-atop:在目标图像顶部显示源图像。源图像位于目标之外的部分是不可见的。
        source-in：在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。
        source-out：在目标图像中显示源图像。只有在目标图像之外的部分会显示，目标图像是透明的。
        destination-over：在源图像上方显示目标图像
        destination-atop：在源图像上方显示目标图像。源图像之外的目标图像部分不会被显示
        destination-in：在源图像上显示目标图像，只有源图像内的目标图像部分会被显示，源图像是透明的。
        destination-out：在源图像上显示目标图像，只有源图像外的目标图像部分会被显示，源图像是透明的。
        lighter：显示源图像+目标图像（叠加后的颜色显示）
        copy：显示源图像，忽视目标图像
        xor：使用异或操作对源图像与目标图像进行组合
```
```sh
    scale()方法缩放当前绘图，更大或更小
     如果对绘图进行缩放，所有之后的绘图也会被缩放。定位也会被缩放。如果scale(2,2)，那么绘图将定位于距离画布左上角两倍远的位置。
    translate()方法重新映射画布上的（0,0）位置。
    rotate（）方法旋转当前绘图。
```
# Radio
+ 多个单选按钮，双击可以取消
+ 使用的知识点
```sh
    单个单选按钮设置name属性相等，可以实现只选中一个按钮
    根据name得到所有的标签元素：var radios = document.getElementsByName('Gender');
    现在知道的好像是只要点击radio，就会是checked=true的状态，所以如果我们想要达到双击取消单选按钮，需要自己设置checked=false
    如有不同意见，可以给出自己的见解
```

# Mask遮罩层
+ 给一个选中的div添加遮罩层
+ 使用的知识点
```sh
    getBoundingClientRect()该方法返回一个矩形对象，包含四个属性：left,top,right和bottom；分别表示元素各边与页面上边和左边的距离
    getComputedStyle()方法得出所有在应该用的有效的样式和分解任何可能会包含值的基础计算后的元素的css属性值
    offsetLeft是相对于直接父元素的/left是相对于父级元素的position为relative的offSetLeft返回的是数值不带单位，style.left返回的是带单位的数值
    设置样式：el.style.prop = value
    创建节点:document.createElement()
    元素添加新的兄弟节点：el.parentNode.appendChild(child);
```
# html/css3实现文字旋转
+ 使用的知识点
```sh
    具体知识点见textEffect.html中的注释
```
# html/css3实现酷炫背景
+ 使用的知识点
```sh
    window.requestAnimationFrame和setTimeout的联系和区别：
        实现效果一致；
        但是requestAnimationFrame不需要自己指定回调函数的运行时间，而是跟着浏览器内建的刷新频率来执行回调的；
        requestAnimationFrame会把每帧中的所有Dom操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般为每秒60帧；
        requestAnimationFrame比set
        在隐藏或不可见元素中，requestAnimationFrame将不会重绘或回流，这就意味着更少的cpu，gpu和内存使用量。
        总结：requestAnimationFrame优于setTimeout/setInterval的地方在于它是浏览器专门为动画提供的api，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了cpu开销。
    requestAnimationFrame会返回一个资源标识符，可以把它作为参数传入到cancelAnimationFrame函数中，来取消requestAnimationFrame的 回调。
    context.createRadialGradient(x0,y0,r0,x1,y1,r1);
        x0:渐变的开始圆的x坐标
        y0:渐变的开始圆的y坐标
        r0:开始圆的半径
        x1:渐变的结束圆的x坐标
        y1:渐变的结束圆的y坐标
        r1:结束圆的半径
    gradient.addColorStop(stop,color)
        stop:介于0.0与1.0之间的值，表示渐变中开始与结束之间的位置
        color:在结束位置显示的css颜色值
    context.acr(x,y,r,sAngle,eAngle,counterclockwise[顺时针/逆时针])
    context.drawImage(img,x,y):在画布上定位图像
    context.drawImage(img,x,y,width,height):在画布上定位图像，并规定图像的宽度和高度
    context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height):剪切图像，并在画布上定位被剪切的部分
    context.globalAlpha:设置透明度
    hsla（h s l a）：
        H:Hue（色调）。0（或360）表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0-360
        S:Saturation(饱和度)。取值为：0.0%-100.0%
        L:Lightness(亮度)。取值为：0.0%-100.0%
        A:Alpha透明度。取值0-1之间
    shadowBlur:设置或返回阴影的级别
    shadowColor:设置或返回阴影的颜色
    querySelector():返回文档中匹配指定css选择器的一个元素[仅仅返回匹配指定选择器的第一个元素，如果需要返回所有的元素，需要使用querySelectorAll()方法]
    css3 filter:
        语法：
            elm {
                filter: none | <filter-function> [<fillter-function>] *
            }
        filter-function:
            grayscale:灰度
            sepia:褐色
            saturate:饱和度
            hue-rotate:色相旋转
            invert:反色
            opacity:透明度
            brightness:亮度
            contrast:对比度
            blur:模糊
            drop-shadow:阴影
    animation:name duration timing-function delay iteration-count direction
        name:规定需要绑定到选择器的keyframe名称
        duration:规定完成动画所花费的时间，以秒或毫秒计
        timing-function:规定动画的【速度】曲线
            linear:动画从头到尾的速度是相同的
            ease:默认，动画以低速开始，然后加快，在结束前变慢
            ease-in:动画以低速开始
            ease-out:动画以低速结束
            ease-in-out:动画以低速开始和结束
            cubic-bezier(n,n,n,n):在cubic-bezier函数中自己的值。可能的值是从0到1的数值
        delay:规定在动画开始之前的延迟
        iteration-count:动画应该播放的次数
            n:播放次数的数值
            infinite:无限次播放
        direction:规定是否应该轮流反向播放动画
            normal:正常播放
            alternate:轮流反向播放
    transform-origin:设置被转换元素的位置
        x-axis:left|center|right|length|%
        y-axis:top|center|bottom|length|%
        z-axis:length

```
