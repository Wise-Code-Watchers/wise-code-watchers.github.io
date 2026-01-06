# wcw AI 代码审查评测 - GitHub Pages 部署指南

## 前置要求

- 安装 [Node.js](https://nodejs.org/) (v16 或更高版本)
- 安装 [Git](https://git-scm.com/)
- 拥有 GitHub 账号

---

## 第一步：创建 React 项目

打开终端，执行以下命令：

```bash
# 创建新的 React 项目
npx create-react-app wcw-benchmark

# 进入项目目录
cd wcw-benchmark
```

---

## 第二步：安装 gh-pages

```bash
npm install gh-pages --save-dev
```

---

## 第三步：替换项目文件

### 3.1 替换 `src/App.js`

删除 `src/App.js` 的所有内容，替换为本目录下 `App.js` 文件的内容。

### 3.2 替换 `src/App.css`

删除 `src/App.css` 的所有内容，替换为本目录下 `App.css` 文件的内容。

### 3.3 修改 `src/index.js`

确保 `src/index.js` 内容如下：

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3.4 修改 `src/index.css`

替换为本目录下 `index.css` 文件的内容。

### 3.5 修改 `public/index.html`

替换为本目录下 `index.html` 文件的内容。

---

## 第四步：配置 package.json

打开项目根目录的 `package.json`，进行以下修改：

### 4.1 添加 homepage 字段

在文件顶部添加（替换 `你的GitHub用户名` 为你的实际用户名）：

```json
{
  "name": "wcw-benchmark",
  "version": "0.1.0",
  "homepage": "https://你的GitHub用户名.github.io/wcw-benchmark",
  ...
}
```

### 4.2 添加部署脚本

在 `scripts` 部分添加两行：

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

完整的 `package.json` 示例见本目录下的 `package.json.example` 文件。

---

## 第五步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 仓库名称填写：`wcw-benchmark`
4. 选择 **Public**
5. 点击 **Create repository**

---

## 第六步：连接本地项目到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的GitHub用户名/wcw-benchmark.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

---

## 第七步：部署到 GitHub Pages

```bash
npm run deploy
```

这个命令会：
1. 构建生产版本
2. 自动创建 `gh-pages` 分支
3. 将构建文件推送到该分支

---

## 第八步：配置 GitHub Pages（首次部署需要）

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** → 左侧菜单 **Pages**
3. 在 **Source** 部分：
   - Branch 选择：`gh-pages`
   - Folder 选择：`/ (root)`
4. 点击 **Save**

---

## 第九步：访问你的网站

等待 1-2 分钟后，访问：

```
https://你的GitHub用户名.github.io/wcw-benchmark
```

---

## 后续更新

每次修改代码后，只需运行：

```bash
git add .
git commit -m "更新说明"
git push origin main
npm run deploy
```

---

## 常见问题

### Q: 页面显示 404？
A: 等待几分钟，GitHub Pages 需要时间部署。也检查 Settings → Pages 是否正确配置。

### Q: 页面空白？
A: 检查 `package.json` 中的 `homepage` 地址是否正确。

### Q: 样式丢失？
A: 确保所有 CSS 文件都已正确替换。

---

## 文件清单

本目录包含以下文件：

| 文件 | 用途 |
|------|------|
| `App.js` | 主组件代码，替换 `src/App.js` |
| `App.css` | 样式文件，替换 `src/App.css` |
| `index.css` | 全局样式，替换 `src/index.css` |
| `index.html` | HTML模板，替换 `public/index.html` |
| `package.json.example` | package.json 配置示例 |

