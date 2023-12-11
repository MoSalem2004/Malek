<template>
  <TheHeader />
  <router-view />
  <ContactUs />
</template>
<script>
import TheHeader from "@/components/TheHeader.vue";
import ContactUs from "@/components/ContactUs.vue";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBOlDn6NmPGHHfdY-gYHvnA6MoM-y0Xbmo",
  authDomain: "elemam-center-for-training.firebaseapp.com",
  projectId: "elemam-center-for-training",
  storageBucket: "elemam-center-for-training.appspot.com",
  messagingSenderId: "253703295162",
  appId: "1:253703295162:web:927a97dbbc2276f30d7283",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default {
  mounted() {
    this.State();
  },
  components: {
    TheHeader,
    ContactUs,
  },
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  methods: {
    async State() {
      try {
        const q_Admin = query(
          collection(db, "المشرفين"),
          where("Id", "==", localStorage.getItem("userid"))
        );
        const querySnapshot_Admin = await getDocs(q_Admin);
        if (!querySnapshot_Admin.empty) {
          this.$store.commit("setUserAdmin", "Admin");
        }
      } catch (error) {
        error;
      }
      try {
        const q_User = query(
          collection(db, "الطلاب"),
          where("userid", "==", localStorage.getItem("userid"))
        );
        const querySnapshot_User = await getDocs(q_User);
        if (!querySnapshot_User.empty) {
          this.$store.commit("setUserAdmin", "User");
        }
      } catch (error) {
        error;
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
:root {
  --main-color: #075e55;
}
* {
  direction: rtl;
}
body {
  direction: rtl;
  background: #fff;
}
.container {
  width: 90% !important;
  margin: 20px auto;
}
svg {
  cursor: pointer;
}
a {
  color: #000 !important;
}
p {
  margin: 0 !important;
}
.mcolor {
  color: var(--main-color);
}
.bcolor {
  background: var(--main-color);
}
.hover-0 {
  transition: 0.3s;
}
.hover-0:hover {
  background: var(--main-color) !important;
  color: #fff !important;
}
.main_title {
  color: var(--main-color);
  text-align: center;
  margin: 100px auto 50px;
  font-size: 24px;
  font-weight: bold;
}
.main_Overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.429);
  width: 100%;
  height: 100%;
  z-index: 3;
  filter: blur(1px);
}
.hover_color:hover {
  background: var(--main-color) !important;
  color: #fff;
  transition: 0.3s;
}
.hover_color_border:hover {
  border-color: var(--main-color) !important;
  transition: 0.3s;
}
.breadcrumb-item + .breadcrumb-item::before {
  float: right !important;
  padding-left: var(--mdb-breadcrumb-item-padding-x);
}
.form-floating > .form-control ~ label {
  opacity: 1 !important;
  transform: scale(1) translateY(0) translateX(0) !important;
}
.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label,
.form-floating > .form-control-plaintext ~ label,
.form-floating > .form-select ~ label {
  opacity: 0.65 !important;
  transform: scale(0.85) translateY(-0.5rem) translateX(18%) !important;
}
.form-control:focus {
  border-color: transparent !important;
  box-shadow: inset 0px 0px 0px 1px var(--main-color) !important;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input:focus {
  outline: none !important;
}
.long {
  width: 100%;
}
.CC {
  margin-top: 137px;
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .CC {
    margin-top: 192px;
  }
}
</style>
