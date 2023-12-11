<template>
  <div class="Main_Testing CC pt-2.5">
    <div class="container">
      <AddTest
        @Close="CloseAndOpenAddTest"
        @GetData="GetData"
        v-if="ShowAddTest"
      />
      <ShowTest @Close="Close" v-if="ShowTest" :TestIndex="this.TestIndex" />
      <nav
        aria-label="breadcrumb"
        class="flex items-center justify-between mb-2.5"
      >
        <nav aria-label="breadcrumb">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem
              ><router-link to="/">{{ Type }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem>
              <router-link to="/">{{ Lang }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem>
              <router-link to="/Main_Class">{{ Class }}</router-link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{{ Sub }}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </nav>
        <span
          class="bg-[#eee] p-2.5 rounded cursor-pointer flex items-center gap-2.5"
          @click="CloseAndOpenAddTest"
          v-if="UserAdmin === 'Admin'"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>اضف اختبار</span>
        </span>

        <!-- @click="CloseAndOpenAddSub" -->
      </nav>
      <div class="data flex flex-wrap gap-2.5 justify-between">
        <img
          src="../assets/animation_lolk2w1w_small.gif"
          alt="animation"
          class="m-auto"
          v-if="ShowLoding"
        />
        <div v-if="ShowMsg" class="text-center">{{ MsgEmpty }}</div>
        <div
          class="box border p-2.5 rounded w-32"
          v-for="(test, index) in AllTest"
          :key="index"
        >
          <div class="flex justify-between">
            <div
              class="number"
              style="
                font-size: 21px;
                font-weight: bold;
                font-family: system-ui;
                color: var(--main-color);
              "
            >
              اختبار رقم (<span>{{ index + 1 }}</span
              >)
            </div>
            <div style="display: flex; gap: 10px; align-items: center">
              <!-- <div v-if="test.Type === 'مجاني'">
                <font-awesome-icon :icon="['fas', 'file-circle-check']" />
              </div>
              <div v-if="test.Type === 'مدفوع'">
                <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" />
              </div> -->
              <div
                style="
                  font-size: 14px;
                  font-weight: bold;
                  font-family: system-ui;
                  color: var(--main-color);
                "
              >
                {{ test.Type }}
              </div>
            </div>
          </div>
          <div
            class="flex gap-2.5 items-center"
            style="
              ackground: #fafafa;
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              font-family: system-ui;
              margin-bottom: 10px;
            "
          >
            <font-awesome-icon :icon="['fas', 'clock']" />
            <p class="Time">{{ test.Time }}</p>
          </div>
          <div
            class="flex gap-2.5 items-center"
            style="
              ackground: #fafafa;
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              font-family: system-ui;
              margin-bottom: 10px;
            "
          >
            <font-awesome-icon :icon="['fas', 'calendar-days']" />
            <p class="Date">{{ test.Date }}</p>
          </div>
          <div
            class="btn"
            style="
              color: var(--main-color);
              font-size: 15px;
              border: 1px solid var(--main-color);
              padding: 0;
              height: 35px;
              width: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              cursor: pointer;
            "
            @click="CheckTimeAndData(index)"
          >
            أختبر نفسك
          </div>
        </div>
      </div>
    </div>
  </div>
  <PayTest v-if="PayTest" @ColseAndOpen="ColseAndOpen" />
</template>
<script>
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-vue-ui-kit";
import AddTest from "../components/Add_Test.vue";
import ShowTest from "../components/ShowTest.vue";
import PayTest from "../components/PayTest.vue";

import {
  getDoc,
  getFirestore,
  doc,
  query,
  where,
  collection,
  getDocs,
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
import moment from "moment";
import "moment/locale/ar";
export default {
  name: "Main_Testing",
  emits: ["GetData"],
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  mounted() {
    this.getvalues();
    setTimeout(() => {
      this.GetData();
    }, 1000);
  },
  data() {
    return {
      ShowAddTest: null,
      ShowAddQu: null,
      MsgEmpty: "",
      ShowMsg: null,
      ShowLoding: true,
      ShowPopup: null,
      ShowTest: null,
      AllTest: [],
      AllQu: [],
      TestIndex: "",
      Type: "",
      Lang: "",
      Class: "",
      Sub: "",
      PayState: true,
      PayTest: null,
    };
  },
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddTest,
    ShowTest,
    PayTest,
  },
  methods: {
    Time() {
      for (let i = 0; i < this.AllTest.length; i++) {
        moment(this.AllTest[i].Time, "HH:mm").locale("ar").format("h:mm A");
        let AllTime = document.querySelectorAll(".box .Time");
        AllTime[i].innerHTML = moment(this.AllTest[i].Time, "HH:mm")
          .locale("ar")
          .format("h:mm A");
      }
    },
    ColseAndOpen() {
      this.PayTest = !this.PayTest;
    },
    async CheckTimeAndData(index) {
      this.TestIndex = index;
      const currentDate = new Date();
      const currentTime = moment(currentDate).format("HH:mm");
      let currentYear = moment().locale("ar").format("YYYY");
      let currentMonth = moment().locale("ar").format("MM");
      let currentDay = moment().locale("ar").format("DD");
      const year = moment(this.AllTest[index].Date, "DD/MM/YYYY").format(
        "YYYY"
      );
      const Month = moment(this.AllTest[index].Date, "DD/MM/YYYY").format("MM");
      const Day = moment(this.AllTest[index].Date, "DD/MM/YYYY").format("DD");
      let state;
      if (currentYear > year) {
        state = true;
      } else {
        if (currentMonth > Month) {
          state = true;
        } else {
          if (currentDay > Day) {
            state = true;
          } else {
            state = "Day";
          }
        }
      }
      if (state === "Day") {
        if (currentTime >= this.AllTest[index].Time) {
          if (this.AllTest[index].Type === "مدفوع") {
            const q = query(
              collection(db, "الطلاب"),
              where("userid", "==", localStorage.getItem("userid"))
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const user = doc.data();
              for (let i = 0; i < user.pay.length; i++) {
                if (
                  user.pay[i].BillName === "جميع الإختبارات" &&
                  user.pay[i].BillType === this.Type &&
                  user.pay[i].BillClass === this.Class &&
                  user.pay[i].BillLang === this.Lang
                ) {
                  if (user.pay[i].success === "true") {
                    this.ShowTest = true;
                  } else {
                    this.PayTest = true;
                  }
                }
              }
            });
          } else {
            this.ShowTest = true;
          }
        }
      }
      if (state) {
        if (this.AllTest[index].Type === "مدفوع") {
          const q = query(
            collection(db, "الطلاب"),
            where("userid", "==", localStorage.getItem("userid"))
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            for (let i = 0; i < user.pay.length; i++) {
              if (
                user.pay[i].BillName === "جميع الإختبارات" &&
                user.pay[i].BillType === this.Type &&
                user.pay[i].BillClass === this.Class &&
                user.pay[i].BillLang === this.Lang
              ) {
                if (user.pay[i].success === "true") {
                  this.ShowTest = true;
                } else {
                  this.PayTest = true;
                }
              }
            }
          });
        } else {
          this.ShowTest = true;
        }
      }
    },
    getvalues() {
      setTimeout(() => {
        this.Type = localStorage.getItem("updateType");
        this.Lang = localStorage.getItem("updateLang");
        this.Class = localStorage.getItem("updateClass");
        this.Sub = localStorage.getItem("updateSub");
      }, 100);
    },
    Close() {
      this.ShowTest = !this.ShowTest;
    },
    ToggelPopop() {
      this.ShowPopup = !this.ShowPopup;
    },
    async GetData() {
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;

      const docRef = doc(db, collectionPath, this.Sub);
      const docSnap = await getDoc(docRef);
      this.ShowLoding = false;
      if (docSnap.exists()) {
        let arr = [];
        arr.push(docSnap.data());
        this.AllTest = arr[0].test;
        this.AllQu = arr[0].test;
        this.ShowMsg = false;
      } else {
        this.MsgEmpty = `لا توجد إختبارات متاحة الآن لمادة ${this.Sub}`;
        this.ShowMsg = true;
      }
      setTimeout(() => {
        this.Time();
      }, 100);
    },
    CloseAndOpenAddQu() {
      this.ShowAddQu = !this.ShowAddQu;
    },
    CloseAndOpenAddTest() {
      this.ShowAddTest = !this.ShowAddTest;
    },
  },
};
</script>
<style lang="scss" scoped>
nav {
  background: #fafafa;
  padding: 10px;
  border-radius: 5px;
  nav ol.breadcrumb {
    margin: 0 !important;
    li {
      transition: 0.3s;
      font-weight: bold;
      &:hover {
        color: var(--main-color) !important;
      }
    }
    li.breadcrumb-item.active {
      font-weight: bold;
      color: var(--main-color);
    }
  }
}
.border-[--main-color] {
  border: 1px solid var(--main-color) !important;
}

.hover-0 {
  transition: 0.3s;
}
.hover-0:hover {
  background: var(--main-color);
  color: #fff;
}
.hover-0:hover svg,
.hover-0:hover span {
  color: #fff;
}
.table_1 {
  height: 35px;
  border: 1px solid var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-bottom: none;
  &:last-child {
    border: 1px solid var(--main-color);
  }
}
.table_2 {
  border: 1px solid var(--main-color);
  height: 35px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: none;
  border-top: none;

  &:last-child {
    border-top: 1px solid var(--main-color);
  }
}

@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
  // .body .main_box {
  //   width: 100% !important;
  // }
}

@media (max-width: 767px) {
  .data {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
  .body .main_box {
    width: 100% !important;
  }
  section {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
  .nav_1 {
    flex-direction: column;
    align-items: stretch;
    & > div {
      justify-content: center;
    }
  }
}
</style>
