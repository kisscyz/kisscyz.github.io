# 拾光小站 · 纯静态个人博客

一个 Facebook 蓝主色调、玻璃拟态风格的纯静态个人博客。
**无构建步骤**：只有 HTML / CSS / JS，双击 `index.html` 就能本地预览，
推到 GitHub 开启 Pages 即可免费上线。

> 全部代码为原创，仅借鉴了 POETIZE 类博客的版式感觉，
> 未复制其源码与素材。

## 目录结构

```
poetize-static/
├── index.html      首页（hero + 最新文章 + 右侧栏）
├── travel.html     游记详情（大图 hero + 正文 + 目录/作者侧栏）
├── essays.html     随笔（短内容时间流）
├── album.html      相册（分类 tabs + 瀑布流）
├── treasure.html   百宝箱（资源中心 + 资源卡片）
├── records.html    记录（垂直时间线）
├── css/
│   └── style.css   全站共享样式（含深浅色主题、响应式）
├── js/
│   └── main.js     汉堡菜单 / 导航高亮 / 回到顶部 / 搜索 / 相册筛选
└── README.md
```

## 本地预览

```bash
cd poetize-static
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

也可以直接双击 `index.html` 用文件协议打开（搜索/主题切换等功能不受影响）。

## 推送到 GitHub 并开启 Pages

### 方式一：从根目录部署（推荐，最简单）

```bash
cd poetize-static
git init
git add .
git commit -m "init: 拾光小站静态博客"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后在 GitHub 仓库页面：

1. 进入 **Settings → Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `main`，目录选择 `/ (root)`
4. 点 **Save**，等 1–2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/`

### 方式二：从 /docs 目录部署

如果你想把源码和博客放在同一个仓库、但只发布博客：

```bash
# 在仓库根目录执行
mkdir -p docs
cp -r /path/to/poetize-static/* docs/
git add docs
git commit -m "deploy blog to docs"
git push
```

Pages 设置里 Branch 选 `main`，目录选 `/docs`，保存即可。

> 注意：自定义域名可在 Pages 设置里填写，会自动生成 CNAME；
> 仓库设为 Private 也可以用 Pages（免费版公开仓库即可）。

## 换成你自己的内容

| 想改什么 | 怎么改 |
|---|---|
| 站名「拾光小站」 | 全局搜索替换 6 个 HTML 里的「拾光小站」 |
| 导航菜单 | 改每页 `<nav class="main-nav">` 里的链接文字/地址 |
| 主色调 | 改 `css/style.css` 顶部 `:root` 里的 `--fb` 等变量 |
| 文章 | 直接复制 `travel.html` 的 `<article class="article-body">` 结构新增页面，并在首页加卡片 |
| 头像 | 把 `.avatar` 的「拾」字换成你的名字首字，或换成 `<img>` |

## 替换占位图片

站内图片目前用 [picsum.photos](https://picsum.photos) 随机占位图，
格式如 `https://picsum.photos/seed/pick-hero/900/560`
（`seed/` 后面是固定种子，保证每次打开是同一张图；最后两段是宽/高）。

替换方法（二选一）：

1. **用自己的图床/直链**：把 `src="https://picsum.photos/..."` 换成你的图片 URL。
2. **用本地图片**：在项目根目录建 `images/` 文件夹，把照片放进去，
   改成 `src="images/云南-洱海.jpg"` 这样的相对路径即可（GitHub Pages 同样生效）。

## 功能说明

- 📱 响应式：窄屏自动单列，导航收进汉堡菜单
- 🌙 深浅色切换：右上角月亮按钮，偏好保存在 localStorage
- 🔍 站内搜索：右上角放大镜，可搜文章/相册/百宝箱
- ⬆️ 回到顶部：滚动超过 400px 自动出现
- 🖼️ 相册分类筛选：点 tab 即时过滤，无需刷新
