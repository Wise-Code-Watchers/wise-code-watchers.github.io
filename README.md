# wcw AI 代码审查评测 2025

基于 50 个真实 Bug 的 AI 代码审查工具性能对比评测。

## 部署步骤

### 1. 创建 GitHub 仓库

在 GitHub 创建一个新仓库（如 `wcw-benchmark`）

### 2. 上传代码

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/wcw-benchmark.git
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 等待 Actions 运行完成（约2分钟）

### 4. 访问网站

```
https://你的用户名.github.io/wcw-benchmark
```

---

## 本地开发

```bash
npm install
npm start
```

然后打开 http://localhost:3000
