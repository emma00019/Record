#Record
-克隆项目
```sh
    git clone https://github.com/emma00019/Record.git
```

# switch
-实现开关的功能
-描述
```sh
	使用html，原生js和css3动画实现开关的开关效果。
	默认状态是开（绿色），关闭状态是灰色。
	2016-8-24第一次的尝试，以后想到更好的再做修改。
```
-使用的知识点
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

＃table
-实现在表格中添加一行，编辑/删除某行的功能
-使用的知识点
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
