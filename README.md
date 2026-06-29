# 罗立虎 的个人空间

一个基于场景滚动的沉浸式个人主页，用视频背景、滚轮转场和玻璃卡片打造属于自己的小世界。

## 页面介绍

- **首页** — 欢迎来到罗立虎的主页，个人简介与基本信息
- **喜欢的偶像** — 劳大 & 圆头耄耋，闪闪发光的存在
- **近期照片** — 帅照、好厚米、猫咪日常，左右双列自动滚动相册
- **联系我** — 邮箱、抖音，以及留言功能（通过 Formspree 发送到邮箱）

## 技术栈

- 原生 HTML / CSS / JavaScript
- 视频背景场景切换
- 玻璃拟态（Glassmorphism）卡片设计
- 3D 照片墙 + 轮播查看器
- Formspree 留言转发到邮箱
- Vercel 静态部署

## 本地运行

```bash
npm install
npm run dev
```

打开浏览器访问：

```
http://localhost:5173
```

## 部署

项目通过 GitHub + Vercel 自动部署。推送到 GitHub 后 Vercel 会自动构建上线。

## 项目结构

```
.
├── index.html          # 主页面
├── styles.css          # 样式
├── script.js           # 主逻辑（场景切换、留言表单）
├── project-cards.js    # 偶像卡片数据与弹窗
├── gallery-3d.js       # 3D 照片墙
├── gallery-carousel.js # 照片轮播查看器
├── audio-control.js    # 背景音乐控制
├── audio-spectrum.js   # 音频频谱
├── water-ripple.js     # 水波纹特效
├── effects-init.js     # 特效初始化
└── assets/             # 图片、视频、音乐资源
```
