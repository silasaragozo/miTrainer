import Header from "@/views/Layout/Header.vue";
import AuthLayout from "@/views/Pages/Login/AuthLayout.vue";

import NotFound from "@/views/Pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "login",
    component: Header,
    beforeEnter: function(to, from, next) {
      const token = localStorage.getItem("token");

      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
    children: [
      {
        path: "/home",
        name: "Encotrar Leilões",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Dashboard/Home.vue"
          )
      },

      {
        path: "/profile",
        name: "Perfil e Favoritos",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/UserProfile/UserProfile.vue"
          )
      },
      {
        path: "/administrativo",
        name: "Painel Administrativo",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Administrativo/Administrativo.vue"
          )
      }
    ]
  },

  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Login/Login.vue"
          )
      },
      {
        path: "/senha",
        name: "recuperar senha",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Login/Senha.vue"
          )
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Login/Register.vue"
          )
      },
      {
        path: "/redirect",
        name: "redirect",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Login/Redirect.vue"
          )
      },
      {
        path: "/AuthAutomatico",
        name: "AuthAutomatico",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Login/AuthAutomatico.vue"
          )
      },

      { path: "*", component: NotFound }
    ]
  }
];

export default routes;
