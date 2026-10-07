/* 拾光小站 · 交互脚本（无依赖） */
(function () {
  "use strict";

  /* ---------- 移动端汉堡菜单 ---------- */
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
    mainNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") mainNav.classList.remove("open");
    });
  }

  /* ---------- 导航高亮（按当前页面） ---------- */
  var page = document.body.getAttribute("data-page");
  if (page && mainNav) {
    var links = mainNav.querySelectorAll("a[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === page) {
        links[i].classList.add("active");
      }
    }
  }

  /* ---------- 回到顶部 ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 主题切换（浅色 / 深色） ---------- */
  var themeBtn = document.getElementById("themeBtn");
  var root = document.documentElement;
  try {
    if (localStorage.getItem("pg-theme") === "dark") root.setAttribute("data-theme", "dark");
  } catch (e) {}
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark";
      if (dark) {
        root.removeAttribute("data-theme");
        try { localStorage.setItem("pg-theme", "light"); } catch (e) {}
      } else {
        root.setAttribute("data-theme", "dark");
        try { localStorage.setItem("pg-theme", "dark"); } catch (e) {}
      }
    });
  }

  /* ---------- 站内搜索（纯前端小索引） ---------- */
  var SEARCH_INDEX = [
    { t: "首页", d: "拾光小站主页", u: "index.html" },
    { t: "冰川极光：七日挪威峡湾徒步纪实", d: "游记 · 挪威", u: "travel.html" },
    { t: "一场说走就走的旅行——云南", d: "游记 · 云南", u: "travel.html" },
    { t: "随笔", d: "短内容时间流", u: "essays.html" },
    { t: "相册 · 光影留存", d: "旅拍 / 城市 / 自然", u: "album.html" },
    { t: "百宝箱 · 资源中心", d: "工具与收藏", u: "treasure.html" },
    { t: "记录", d: "站点时间线", u: "records.html" }
  ];
  var searchBtn = document.getElementById("searchBtn");
  var searchBar = document.getElementById("searchBar");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", function () {
      searchBar.classList.toggle("open");
      if (searchBar.classList.contains("open") && searchInput) searchInput.focus();
    });
  }
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim();
      searchResults.innerHTML = "";
      if (!q) return;
      var hit = SEARCH_INDEX.filter(function (it) {
        return it.t.indexOf(q) !== -1 || it.d.indexOf(q) !== -1;
      });
      if (!hit.length) {
        searchResults.innerHTML = '<div class="search-empty">没有找到相关内容，换个关键词试试～</div>';
        return;
      }
      hit.forEach(function (it) {
        var a = document.createElement("a");
        a.href = it.u;
        a.textContent = it.t + " · " + it.d;
        searchResults.appendChild(a);
      });
    });
  }

  /* ---------- 相册分类筛选 ---------- */
  var tabs = document.querySelectorAll(".tab[data-filter]");
  var photos = document.querySelectorAll(".photo[data-cat]");
  if (tabs.length && photos.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var f = tab.getAttribute("data-filter");
        photos.forEach(function (p) {
          p.classList.toggle("hide", f !== "all" && p.getAttribute("data-cat") !== f);
        });
      });
    });
  }

  /* ---------- 文章目录滚动高亮 ---------- */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length) {
    var sections = [];
    tocLinks.forEach(function (a) {
      var el = document.querySelector(a.getAttribute("href"));
      if (el) sections.push({ a: a, el: el });
    });
    window.addEventListener("scroll", function () {
      var cur = null;
      sections.forEach(function (s) {
        if (s.el.getBoundingClientRect().top < 160) cur = s;
      });
      tocLinks.forEach(function (a) { a.classList.remove("active"); });
      if (cur) cur.a.classList.add("active");
    }, { passive: true });
  }

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
