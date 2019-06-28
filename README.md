# cursor-dot
> Fancy cursor dot

![](https://travis-ci.org/gaoryrt/cursor-dot.svg?branch=master)
![](https://img.badgesize.io/gaoryrt/cursor-dot/master/index.js)
![](https://img.badgesize.io/gaoryrt/cursor-dot/master/index.js?compression=gzip)

English | [简体中文](./README.zh-cn.md)

## Installation 🏗️

```bash
$ yarn add cursor-dot
```

## Usage 🍹

```js
import curDot from 'cursor-dot'
```
---
![](./smoothcursorfollowing.gif)
```js
const cursor = curDot()
// or, set as you want
// cursor({
//   diameter: 80,
//   borderWidth: 1,
//   borderColor: 'transparent',
//   easing: 4,
//   background: '#fff'
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

## [Give it a try](https://codesandbox.io/s/focused-ellis-g9mpm)
