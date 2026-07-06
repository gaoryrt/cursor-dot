# cursor-dot
> 平滑的鼠标跟随

![](https://img.badgesize.io/gaoryrt/cursor-dot/master/index.js)
![](https://img.badgesize.io/gaoryrt/cursor-dot/master/index.js?compression=gzip)

[English](./README.md) | 简体中文

## 安装 🏗️

### 方法1: yarn 或者 npm

```bash
$ yarn add cursor-dot
```
或者
```bash
npm i cursor-dot
```
然后可以在 js 文件里面使用
```js
import curDot from 'cursor-dot'
```
来引入

### 方法2: 直接引入 `window.curDot.min.js` 文件
下载 `dist/window.curDot.min.js` 文件到你的工程中，在 html 文件里直接引用:
```html
<script src="path/to/your/window.curDot.min.js"></script>
```
然后就可以使用 `window.curDot`

## 使用 🍹

![](./smoothcursorfollowing.gif)
```js
const cursor = curDot()
// 也可以自定义：
// cursor({
//   diameter: 80,
//   borderWidth: 1,
//   borderColor: 'transparent',
//   easing: 4,
//   background: '#ddd'
// })
```
---
![](./customhoverstyles.gif)
```js
cursor.over('span.selector', {
  borderColor: 'rgba(255,255,255,.38)',
  broderWidth: 2
})

cursor.over($('El'), {
  scale: .5,
  background: '#fff'
})
```

## 销毁与重新初始化 🔄

```js
let cursor = curDot({ easing: 4 })

// 销毁实例（移除监听、停止动画、移除 DOM）
cursor.destroy()

// 重新初始化，可传入新配置
cursor = curDot({ easing: 8, diameter: 100 })
```

## [在线 Demo](https://codesandbox.io/s/focused-ellis-g9mpm)
