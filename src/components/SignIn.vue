<template>
  <div class="main_Overlay" @click="close_1"></div>
  <div
    class="container bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
  >
    <div class="header flex justify-between items-center">
      <h2>تسجيل الدخول</h2>
      <font-awesome-icon
        @click="close_1"
        :icon="['fas', 'xmark']"
        class="text-2xl bg-[--main-color] p-1 text-white rounded"
      />
    </div>
    <form>
      <div class="input-group mb-3">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="number"
            v-model="number"
          />

          <label for="number"
            ><font-awesome-icon :icon="['fas', 'user-edit']" /> رقم
            الهاتف</label
          >
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="form-floating">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            placeholder="كلمة السر"
            v-model="password"
            required
          />
          <label for="Password"
            ><font-awesome-icon :icon="['fas', 'lock']" /> كلمة السر
          </label>
          <div
            class="Show_Password absolute -translate-x-1/2 -translate-y-1/2 left-5 top-1/2"
            @click="showPassword = !showPassword"
          >
            <font-awesome-icon
              :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
            />
          </div>
        </div>
      </div>
      <p class="error">{{ loginError }}</p>
      <div
        @click="login"
        class="w-fit mr-auto p-2.5 text-white bg-[--main-color] rounded cursor-pointer"
      >
        تسجيل الدخول
      </div>
    </form>
  </div>
</template>
<script>
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
import bcrypt from "bcryptjs";
export default {
  name: "SignIn",
  emits: ["close_1"],
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  data() {
    return {
      number: null,
      password: null,
      loginError: "",
      showPassword: false,
    };
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
        } else {
          this.$store.commit("setUserAdmin", "");
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
        } else {
          this.$store.commit("setUserAdmin", "");
        }
      } catch (error) {
        error;
      }
    },
    close_1() {
      this.$emit("close_1");
    },

    async login(event) {
      event.preventDefault();

      try {
        const q_Admin = query(
          collection(db, "المشرفين"),
          where("phone", "==", this.number)
        );
        const querySnapshot_Admin = await getDocs(q_Admin);
        querySnapshot_Admin.forEach((doc) => {
          const user = doc.data();
          const isPasswordCorrect_Admin = bcrypt.compareSync(
            this.password,
            user.Password
          );

          if (isPasswordCorrect_Admin) {
            localStorage.setItem("userphone", user.phone);
            localStorage.setItem("userid", doc.id);
            localStorage.setItem("username_1", user.Name);
            this.loginError = "";
            this.number = "";
            this.password = "";
            this.$emit("close_1");
            setTimeout(() => {
              this.State();
            }, 100);
          } else {
            this.loginError = "بيانات تسجيل الدخول غير صحيحة !";
          }
        });
        const q = query(
          collection(db, "الطلاب"),
          where("phone", "==", this.number)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          const isPasswordCorrect = bcrypt.compareSync(
            this.password,
            user.password
          );
          if (isPasswordCorrect) {
            this.username = user.name;
            this.useremail = user.number;
            localStorage.setItem("username_1", user.name_1);
            localStorage.setItem("username_2", user.name_2);
            localStorage.setItem("username_3", user.name_3);
            localStorage.setItem("userid", doc.id);
            this.loginError = "";
            this.number = "";
            this.password = "";
            this.$emit("close_1");
            setTimeout(() => {
              this.State();
            }, 100);
          } else {
            this.loginError = "بيانات تسجيل الدخول غير صحيحة !";
          }
        });
      } catch (error) {
        this.loginError = "حدث خطأ أثناء تسجيل الدخول!";
      }
    },
  },
};
</script>
