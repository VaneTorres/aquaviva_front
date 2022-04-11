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
        path: "",
        component: () => import("pages/ErrorPermission.vue"),
        name: "ErrorPermission",
      },
      {
        path: "/forget",
        component: () => import("src/pages/auth/Forget.vue"),
      },
      {
        path: "/forget/password/:token",
        component: () => import("src/pages/auth/Password.vue"),
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
        meta: { Company: true },
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
        path: "load_of_obligations/obligation",
        component: () => import("src/pages/load_of_obligations/obligation.vue"),
        name: "obligation",
      },
      {
        path: "load_of_obligations/evidence",
        component: () => import("src/pages/evidence.vue"),
        name: "evidence",
      },
      {
        path: "parameterize/project",
        component: () => import("src/pages/parameterize/project.vue"),
        name: "project",
      },
      {
        path: "parameterize/program",
        component: () => import("src/pages/parameterize/program.vue"),
        name: "program",
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
        component: () => import("src/pages/formatSig/formatSIG.vue"),
        name: "formatSIG",
      },
      {
        path: "excel",
        component: () => import("src/pages/formatSig/excel.vue"),
        name: "excel",
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
