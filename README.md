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
    | 参数 | 事件接口 | 初始化方法 |
    | -----|:----:| ----:|
    |HTMLEvents | HTMLEvent| initEvent()|
    |MouseEvents | MouseEvent| initMouseEvent()|
    |UIEvents | UIEvent| initUIEvent()|

    initEvent方法用于初始化通过DocumentEvent接口创建的Event的值，支持三个参数
    initEvent(eventName, canBubble,preventDefault).分别表示事件名称，是否可以冒泡，是否阻止事件的默认操作。

    dispatchEvent()就是触发执行了，参数表示事件对象，就是createEvent()方法返回的创建的Event对象。
```
