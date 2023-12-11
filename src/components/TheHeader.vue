<template>
  <div
    class="Header border-b border-gray-300"
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: transparent;
      z-index: 100;
    "
  >
    <div class="container flex justify-between items-center gap-2.5">
      <div class="logo">
        <router-link to="/" class="flex items-center gap-2.5">
          <img
            src="../assets/elemam_logo.png"
            alt="أكاديمية الإمام القانونية"
            class="h-24 rounded-full"
          />
          <span
            class="text-xl"
            style="
              font-weight: bold;
              color: var(--main-color);
              font-family: system-ui;
            "
            >أكاديمية الإمام القانونية</span
          >
        </router-link>
      </div>
      <div class="left flex items-center gap-2.5 flex-wrap">
        <div class="links relative hidden">
          <div class="all_links flex gap-2.5 rounded p-2.5">
            <!-- <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >أحدث الأخبار</span
            > -->
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >الفرق الدراسية</span
            >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >معرض الصور
            </span>
            <span class="cursor-pointer">تواصل معنا</span>
          </div>
        </div>

        <!-- <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> -->

        <div v-if="UserState" class="Sign_In">
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <div
                  class="User_Logo bg-[--main-color] h-10 w-10 text-white rounded-full flex justify-center items-center cursor-pointer"
                  @click="State"
                >
                  {{ firstLetters }}
                </div>
              </div>
            </template>
            <v-list>
              <v-list-item>
                <div style="position: relative">
                  <div class="user">
                    <div class="user" v-if="state">
                      <div
                        style="
                          background: #fff;
                          color: var(--main-color);
                          padding: 10px;
                          border-radius: 5px;
                          margin-bottom: 5px;
                          border: 1px solid var(--main-color);
                        "
                        class="hover-0"
                      >
                        <v-list-item-title class="flex align-center gap-1.5">
                          <span>👋🏻</span>
                          <span> أهلا {{ thetype }} {{ UserName }} </span>
                        </v-list-item-title>
                      </div>
                      <div
                        style="
                          background: #fff;
                          color: var(--main-color);
                          padding: 10px;
                          border-radius: 5px;
                          margin-bottom: 5px;
                          border: 1px solid var(--main-color);
                          cursor: pointer;
                        "
                        class="hover-0"
                        v-if="UserAdmin === 'User'"
                      >
                        <router-link to="/TheUser">
                          <v-list-item-title
                            class="flex align-center gap-1.5"
                            style="color: var(--main-color)"
                          >
                            <font-awesome-icon :icon="['fas', 'id-card']" />
                            <span> حسابي </span>
                          </v-list-item-title></router-link
                        >
                      </div>
                      <div
                        style="
                          background: #fff;
                          color: var(--main-color);
                          padding: 10px;
                          border-radius: 5px;
                          margin-bottom: 5px;
                          border: 1px solid var(--main-color);
                          cursor: pointer;
                        "
                        class="hover-0"
                        v-if="UserAdmin === 'Admin'"
                      >
                        <router-link to="/AdminPage"
                          ><v-list-item-title
                            class="flex align-center gap-1.5"
                            style="color: var(--main-color)"
                          >
                            <font-awesome-icon :icon="['fas', 'user-tie']" />
                            <span> الإشراف </span>
                          </v-list-item-title></router-link
                        >
                      </div>
                      <div
                        style="
                          background: #fff;
                          color: var(--main-color);
                          padding: 10px;
                          border-radius: 5px;
                          margin-bottom: 5px;
                          border: 1px solid var(--main-color);
                          cursor: pointer;
                        "
                        @click="SignOut"
                        class="hover-0"
                      >
                        <v-list-item-title
                          class="flex align-center gap-1.5"
                          style="color: var(--main-color)"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'arrow-right-to-bracket']"
                          />
                          <span class="cursor-pointer"> تسجيل خروج </span>
                        </v-list-item-title>
                      </div>
                    </div>
                    <div
                      class="main_popup bg-transparent"
                      v-if="state"
                      @click="State"
                    ></div>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div
          class="ShowLogin hover-0 flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
          v-if="!UserState"
          @click="close_1"
          style="border: 1px solid var(--main-color); color: var(--main-color)"
        >
          <font-awesome-icon :icon="['fas', 'user-lock']" />
          <span>تسجيل دخول</span>
        </div>
        <div
          class="ShowLogin hover-0 flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
          style="border: 1px solid var(--main-color); color: var(--main-color)"
          v-if="!UserState"
          @click="close_2"
        >
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          <span>حساب جديد</span>
        </div>
        <v-menu transition="slide-y-transition" style="min-width: 300px">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              <font-awesome-icon :icon="['fas', 'bars']" class="text-2xl" />
            </div>
          </template>
          <v-list>
            <v-list-item-title
              class="mobile registr"
              v-if="!UserState"
              @click="close_2"
            >
              <a href="#">
                <font-awesome-icon :icon="['fas', 'user-plus']" />
                <span>حساب جديد</span>
              </a>
            </v-list-item-title>
            <v-list-item-title
              class="mobile login"
              v-if="!UserState"
              @click="close_1"
            >
              <a href="#">
                <font-awesome-icon :icon="['fas', 'user-lock']" />
                <span>تسجيل دخول</span>
              </a>
            </v-list-item-title>
            <v-list-item-title>
              <a href="#TheClasses">
                <font-awesome-icon :icon="['fas', 'people-group']" />
                <span>الفرق الدراسية</span>
              </a>
            </v-list-item-title>
            <v-list-item-title>
              <a href="#TheGallary">
                <font-awesome-icon :icon="['fas', 'image']" />
                <span>معرض الصور</span>
              </a>
            </v-list-item-title>
            <v-list-item-title>
              <a href="#ContactUs">
                <font-awesome-icon :icon="['fas', 'comments']" />
                <span>تواصل معنا</span>
              </a>
            </v-list-item-title>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
  <SignIn @close_1="close_1" v-if="close_1_State" />
  <TheRegister @close_2="close_2" v-if="close_2_State" />
</template>
<script>
import SignIn from "./SignIn.vue";
import TheRegister from "./TheRegister.vue";
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
  name: "TheHeader",
  emits: ["State"],
  mounted() {
    this.UserStateFunction();
    this.Header();
  },
  data() {
    return {
      UserState: null,
      state: null,
      close_1_State: null,
      close_2_State: null,
      firstLetters: "",
      UserName: "",
      UserEmail: "",
      ShowHelloUser: null,
      thetype: "",
      visitorCount: null,
    };
  },
  components: {
    SignIn,
    TheRegister,
  },
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  methods: {
    Header() {
      window.onscroll = () => {
        if (window.scrollY === 0) {
          document.querySelector(".Header").style.background = "transparent";
        } else {
          document.querySelector(".Header").style.background = "#fff";
        }
      };
    },
    async TheState() {
      try {
        const q_Admin = query(
          collection(db, "المشرفين"),
          where("Id", "==", localStorage.getItem("userid"))
        );
        const querySnapshot_Admin = await getDocs(q_Admin);
        if (!querySnapshot_Admin.empty) {
          this.$store.commit("setUserAdmin", "Admin");
        }
        // else {
        //   this.$store.commit("setUserAdmin", "");
        // }
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
        // else {
        //   this.$store.commit("setUserAdmin", "");
        // }
      } catch (error) {
        error;
      }
    },
    ShowLinks() {
      document.querySelector(".all_links").classList.toggle("hidden");
    },
    State() {
      this.state = !this.state;
    },
    close_1() {
      this.close_1_State = !this.close_1_State;
      this.UserStateFunction();
    },
    close_2() {
      this.close_2_State = !this.close_2_State;
      setTimeout(() => {
        this.UserStateFunction();
      }, 100);
    },
    SignOut() {
      localStorage.removeItem("username_1");
      localStorage.removeItem("username_2");
      localStorage.removeItem("username_3");
      localStorage.removeItem("userid");
      localStorage.removeItem("type");
      localStorage.removeItem("userphone");
      this.state = null;
      setTimeout(() => {
        this.UserStateFunction();
        this.TheState();
      }, 1009);
    },
    UserStateFunction() {
      this.state = null;
      this.thetype = "";
      this.UserName = `${localStorage.getItem("username_1")} 
        ${localStorage.getItem("username_2") || ""} 
        ${localStorage.getItem("username_3") || ""}`;
      this.UserState = localStorage.getItem("userid") ? true : false;
      if (this.UserState) {
        var words = this.UserName.split(" ");
        this.firstLetters = words[0].charAt(0) + " " + words[1].charAt(0);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v-menu > .v-overlay__content {
  min-width: 300px !important;
}
.hover-0:hover {
  .v-list-item-title {
    color: #fff !important;
  }
}
.v-list-item-title {
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    color: var(--main-color) !important;
    font-weight: bold;
    transition: 0.3s;
  }
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  &:hover {
    // transform: translateX(7px);
    // background: #fafafa;
  }
}
.Header {
  transition: 0.5s;
}
.v-list-item-title {
  transition: 00.3s;
}
// .hover-0:hover .v-list-item-title {
//   transform: scale(1.1);
// }
// .mobile {
//   display: none;
// }
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .ShowLogin {
    display: none;
  }
  .container {
    flex-direction: row;
    .logo {
      width: fit-content;
      img {
        height: 65px;
      }
      span {
        display: none;
      }
    }
    .left {
      width: fit-content;
      justify-content: space-between;
      .links {
        width: 90%;
        .click {
          justify-content: space-between;
        }
      }
    }
    // .mobile {
    //   display: flex;
    // }
  }
}
</style>
