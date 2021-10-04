import { route } from "quasar/wrappers";
import router from ".";
const routes = [
  {
    path: "/",
    component: () => import("layouts/indexLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/auth/Login.vue"),
        name: "login",
      },
      {
        path: "/forget",
        component: () => import("pages/auth/Forget_password.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "profile",
        component: () => import("src/pages/profile.vue"),
        name: "profile",
      },
      {
        path: "company",
        component: () => import("src/pages/company/Company.vue"),
        name: "company",
      },
      {
        path: "dashboard",
        component: () => import("src/pages/dashboard.vue"),
        name: "dashboard",
      },
      {
        path: "mycompany",
        component: () => import("src/pages/company/Mycompany.vue"),
        name: "Mycompany",
      },
      {
        path: "environmental_monitored",
        component: () => import("src/pages/environmental_monitored.vue"),
        name: "environmental_monitored",
      },
      {
        path: "load_of_obligations",
        component: () => import("src/pages/load_of_obligations/obligation.vue"),
        name: "pma",
      },
      {
        path: "departments",
        component: () => import("src/pages/structure/departments.vue"),
        name: "departments",
      },
      {
        path: "organization",
        component: () => import("src/pages/structure/organizationtree.vue"),
        name: "organization",
      },
      {
        path: "plans",
        component: () => import("src/pages/plans/plans.vue"),
        name: "plans",
      },
      {
        path: "plansuser",
        component: () => import("src/pages/plans/viewPlansUser.vue"),
        name: "plansuser",
      },
      {
        path: "formatSIG",
        component: () => import("src/pages/formatSIG.vue"),
        name: "formatSIG",
      },
    ],
    meta: { requireAuth: true },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
