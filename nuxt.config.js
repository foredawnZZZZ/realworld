export default {
 // 自定义路由规则
 router: {
  linkActiveClass: "active",
  extendRoutes(routes, resolve) {
   //清空根据pages制定的路由表
   routes.splice(0);
   routes.push(...[
    {
     path: '/',
     component: resolve(__dirname, 'pages/layout/'),
     children: [
      {
       path: "",
       name: "home",
       component: resolve(__dirname, 'pages/home/')
      },
      {
       path: "/login",
       name: "login",
       component: resolve(__dirname, "pages/login/")
      },
      {
       path: "/register",
       name: "register",
       component: resolve(__dirname, "pages/login/")
      },
      {
       path: "/article/:slug",
       name: "article",
       component: resolve(__dirname, "pages/article/")
      },
      {
       path: "/profile/:username",
       name: "profile",
       component: resolve(__dirname, "pages/profile/")
      },
      {
       path: "/editor/",
       name: "editor",
       component: resolve(__dirname, "pages/editor/"),
       beforeEnter(to, from, next) {
        from.name === "editorslug" ? next(false) : next();
       }
      },
      {
       path: "/editor/:slug",
       name: "editorslug",
       component: resolve(__dirname, "pages/editor/")
      },
      {
       path: "/settings",
       name: "settings",
       component: resolve(__dirname, "pages/settings/")
      },
     ]
    }
   ])
  }
 },
 plugins: [
  '~/plugins/request.js',
  '~/plugins/day.js',
 ],
 server: {
  host: '0.0.0.0',
  port: 3000
 }
}