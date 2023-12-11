import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../HomeView.vue";
import Main_Class from "../views/Main_Class.vue";
import Main_Testing from "../views/Main_Testing.vue";
import TheUser from "../views/TheUser.vue";
import AdminPage from "../views/AdminPage.vue";
import TheStudents from "../views/TheStudents.vue";
import ManageAdmins from "../views/ManageAdmins.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Main_Class",
    name: "Main_Class",
    component: Main_Class,
  },
  {
    path: "/Main_Testing",
    name: "Main_Testing",
    component: Main_Testing,
  },
  {
    path: "/TheUser",
    name: "TheUser",
    component: TheUser,
  },
  {
    path: "/AdminPage",
    name: "AdminPage",
    component: AdminPage,
  },
  {
    path: "/TheStudents",
    name: "TheStudents",
    component: TheStudents,
  },
  {
    path: "/ManageAdmins",
    name: "ManageAdmins",
    component: ManageAdmins,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
