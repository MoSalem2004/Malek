<template>
  <div class="TheUser" style="margin-top: -20px; padding-bottom: 50px">
    <div class="container relative" style="padding-top: 160px">
      <div
        class="title flex items-center gap-2.5 mb-5 justify-between"
        style="
          font-size: 30px;
          color: var(--main-color);
          font-weight: bold;
          font-family: system-ui;
        "
      >
        <div class="flex items-center gap-2.5">
          <font-awesome-icon :icon="['fas', 'id-card']" />
          <span>حسابي</span>
        </div>
        <!-- v-show="ShowAppreciations" -->
        <!-- v-if="RankingShow" -->
        <div
          class="ranking flex items-center gap-2.5 justify-between"
          style="
            background: rgb(255, 255, 255);
            padding: 10px;
            border-radius: 5px;
            color: var(--main-color);
            font-weight: bold;
            font-size: 17px;
          "
        >
          <div
            class="flex gap-2.5"
            style="align-items: center; justify-content: center"
          >
            <font-awesome-icon
              :icon="['fas', 'trophy']"
              color="gold"
              v-if="index1"
            />
            <font-awesome-icon
              :icon="['fas', 'trophy']"
              color="silver"
              v-if="index2"
            />
            <font-awesome-icon
              :icon="['fas', 'trophy']"
              color="#c77b30"
              v-if="index3"
            />
            <font-awesome-icon
              v-if="top10"
              :icon="['fas', 'medal']"
              color="gold"
            />
            <font-awesome-icon
              v-if="top50"
              :icon="['fas', 'certificate']"
              color="gold"
            />
            <font-awesome-icon
              v-if="top100"
              :icon="['fas', 'certificate']"
              color="silver"
            />
            <div>الترتيب</div>
            <div
              style="
                isplay: flex;
                background: #fafafa;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                font-weight: bold;
                padding: 0 5px;
              "
            >
              {{ Ranking }}
            </div>
          </div>
          <font-awesome-icon
            :icon="['fas', 'circle-info']"
            color="info !important"
            style="
              font-size: 24px;
              border-right: 2px solid #ddd;
              padding-right: 10px;
            "
            @click="Info = !Info"
          />
          <div
            v-if="Info"
            class="main_Overlay"
            style="z-index: 101"
            @click="Info = !Info"
          ></div>
          <div
            v-if="Info"
            class="Info bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-h-90 overflow-auto"
            style="width: 90%; z-index: 101"
          >
            <div class="flex justify-between align-center p-2.5">
              <div style="font-size: 25px; color: var(--main-color)">
                الشارات
              </div>
              <font-awesome-icon
                @click="Info = !Info"
                :icon="['fas', 'circle-xmark']"
                style="font-size: 25px; color: red"
              />
            </div>
            <div>
              <table border="1" width="100%">
                <thead>
                  <tr>
                    <th>الشارة</th>
                    <th>الترتيب</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="">
                      <div class="flex align-center p-2.5 gap-2.5">
                        <font-awesome-icon
                          :icon="['fas', 'trophy']"
                          color="gold"
                        />
                        <div>الكأس الذهبي</div>
                      </div>
                    </td>
                    <td>الأول</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="flex align-center p-2.5 gap-2.5">
                        <font-awesome-icon
                          :icon="['fas', 'trophy']"
                          color="silver"
                        />
                        <div>الكأس الفضي</div>
                      </div>
                    </td>
                    <td>الثاني</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="flex align-center p-2.5 gap-2.5">
                        <font-awesome-icon
                          :icon="['fas', 'trophy']"
                          color="#c77b30"
                        />
                        <div>الكأس البرونزي</div>
                      </div>
                    </td>
                    <td>الثالث</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="flex align-center p-2.5 gap-2.5">
                        <font-awesome-icon
                          :icon="['fas', 'medal']"
                          color="gold"
                        />
                        <div>الميدالية الذهبية</div>
                      </div>
                    </td>
                    <td>العشرة الأوائل</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="flex align-center p-2.5 gap-2.5">
                        <font-awesome-icon
                          :icon="['fas', 'certificate']"
                          color="gold"
                        />
                        <div>الشارة الذهبية</div>
                      </div>
                    </td>
                    <td>الخمسون الأوائل</td>
                  </tr>
                  <tr>
                    <td>
                      <div class="flex align-center p-2.5 gap-2.5">
                        <font-awesome-icon
                          :icon="['fas', 'certificate']"
                          color="silver"
                        />
                        <div>الشارة الفضية</div>
                      </div>
                    </td>
                    <td>المائة الأوائل</td>
                  </tr>
                </tbody>
              </table>
              <div
                class="text"
                style="
                  padding: 10px;
                  background: #fafafa;
                  margin: 10px auto;
                  border-radius: 5px;
                  line-height: 2;
                  color: var(--main-color);
                "
              >
                في حالة حصولك علي شارة من هذه الشارات حتي آخر يوم في الشهر
                ستتواصل معك أكاديمية الإمام لإستلام جائزتك و أرسل صورتك ليتم
                تكريمك , بالتوفيق للجميع ❤️
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="User_file flex items-center">
        <div
          class="data w-1/2 flex flex-col gap-2.5"
          style="padding: 10px; border-radius: 5px"
        >
          <div
            class="name"
            style="
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              background: #fff;
              color: var(--main-color);
            "
          >
            <font-awesome-icon :icon="['fas', 'user-graduate']" />
            <span>
              {{ AllName }}
            </span>
          </div>
          <div
            class="phone flex items-center gap-2.5"
            style="
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              background: #fff;
              color: var(--main-color);
            "
          >
            <font-awesome-icon icon="fa-solid fa-phone" />
            <span>{{ phone }}</span>
          </div>
          <div
            class="phone flex items-center gap-2.5"
            style="
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              background: #fff;
              color: var(--main-color);
            "
          >
            <font-awesome-icon :icon="['fas', 'at']" />
            <span>{{ email }}</span>
          </div>
          <div
            class="location flex items-center gap-2.5"
            style="
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              background: #fff;
              color: var(--main-color);
            "
          >
            <font-awesome-icon :icon="['fas', 'location-dot']" />
            <span>{{ college_place }}</span>
          </div>
          <div
            class="class flex items-center gap-2.5"
            style="
              padding: 10px;
              border-radius: 5px;
              font-weight: bold;
              background: #fff;
              color: var(--main-color);
            "
          >
            <font-awesome-icon :icon="['fas', 'chalkboard-user']" />
            <span>{{ Class }} - {{ Lang }}</span>
          </div>
        </div>
        <div
          class="text-center w-1/2 flex flex-col gap-2.5"
          style="justify-content: center; align-items: center"
        >
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :model-value="value"
            style="color: var(--main-color) !important"
          >
            <template v-slot:default>
              <div
                style="
                  font-size: 20px !important;
                  color: var(--main-color) !important;
                  font-weight: bold !important;
                "
              >
                {{ value || 0 }} %
              </div>
            </template>
          </v-progress-circular>
          <div
            style="
              background: #fafafa;
              width: 100px;
              padding: 5px;
              border-radius: 5px;
              font-size: 20px;
              min-height: 42px;
            "
            class="ranking"
          >
            <div
              v-show="ShowAppreciations"
              style="
                font-size: 20px;
                font-weight: bold;
                color: var(--main-color);
                border: 1px solid var(--main-color);
                border-radius: 5px;
              "
            >
              {{ Appreciations }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-2.5 justify-between All_Btn my-5">
        <div
          class="All_Result bg-[#eee] w-48 text-center p-2.5 cursor-pointer rounded hover-0 active"
          @click="CloseTogell_2"
        >
          نتائجي
        </div>
        <div
          class="All_Courses bg-[#eee] w-48 text-center p-2.5 cursor-pointer rounded hover-0"
          @click="CloseTogell_1"
        >
          فواتيري
          <!-- FawryPay Checkout Button -->
        </div>
      </div>
      <MyCourse v-if="close_1" />
      <MyResults
        v-if="close_2"
        @TotalResultFunction="handleTotalResult"
        @AppreciationsFunction="handleAppreciations"
      />
    </div>
  </div>
</template>
<script>
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  updateDoc,
  doc,
  getDoc,
  // setDoc,
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
// import crypto from "crypto-js";
import MyCourse from "../components/MyCourse.vue";
import MyResults from "../components/MyResults.vue";
export default {
  name: "TheUser",
  components: {
    MyCourse,
    MyResults,
  },

  mounted() {
    this.GetData();
    this.State();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  data() {
    return {
      AllName: "",
      name1: "",
      name2: "",
      name3: "",
      phone: "",
      email: "",
      college_place: "",
      Class: "",
      Lang: "",
      close_1: null,
      close_2: true,
      TotalResult: 0,
      Appreciations: "",
      Ranking: "",
      TypeOfClass: "",
      User: "",
      interval: 0,
      value: 0,
      ShowAppreciations: null,
      index1: null,
      index2: null,
      index3: null,
      top10: null,
      top50: null,
      top100: null,
      RankingShow: null,
      Info: null,
    };
  },
  methods: {
    All_Btn() {
      let btn = document.querySelectorAll(".All_Btn > div");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
          btn.forEach((e) => {
            e.classList.remove("active");
          });
          btn[i].classList.add("active");
        };
      }
    },
    Progress() {
      if (!isNaN(Math.round(+this.TotalResult))) {
        this.interval = setInterval(() => {
          if (this.value === Math.round(+this.TotalResult) || 0) {
            this.ShowAppreciations = true;
            return (this.value = Math.round(+this.TotalResult) || 0);
          }
          this.value += 1;
        }, 100);
      }
    },
    handleAppreciations(Data) {
      this.Appreciations = Data;
    },
    async handleTotalResult(Data) {
      this.TotalResult = Data;

      const studentsCollection = collection(db, "الطلاب");
      const querySnapshot = await getDocs(studentsCollection);
      const documentRef = doc(db, "الطلاب", localStorage.getItem("userid"));

      // تحديث الوثيقة
      await updateDoc(documentRef, {
        AllResults: `${Data || 0}`,
      });
      let array = [];
      querySnapshot.forEach((doc) => {
        if (
          doc.data().Class === this.Class &&
          doc.data().Lang === this.Lang &&
          doc.data().TypeOfClass === this.TypeOfClass
        ) {
          array.push(doc.data().AllResults);
        }
      });
      const filteredArray = array.filter((element) => element !== undefined);
      const sortedArray = filteredArray.sort((a, b) => b - a);
      const top10Elements = sortedArray.slice(0, 10);
      // إنشاء مصفوفة مكونة من كائنات تحتوي على القيم والفهارس الأصلية
      const indexedArray = top10Elements.map((value, index) => ({
        value,
        originalIndex: index,
      }));

      // تجميع العناصر المتكررة في مصفوفة جديدة
      const ReducedArray = indexedArray.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.value === item.value);
        if (existingItem) {
          existingItem.originalIndexes.push(item.originalIndex);
        } else {
          acc.push({
            value: item.value,
            originalIndexes: [item.originalIndex],
          });
        }
        return acc;
      }, []);

      // فرز المصفوفة المجمعة بناءً على القيم ومواقع الفهارس
      ReducedArray.sort((a, b) => {
        if (a.value === b.value) {
          return a.originalIndexes[0] - b.originalIndexes[0];
        }
        return b.value - a.value;
      });

      // عرض العناصر المفرزة للمستخدم مع رقم الفهرس
      ReducedArray.forEach((item, index) => {
        item.originalIndexes.forEach(() => {
          // console.log(this.TotalResult);
          if (this.TotalResult === Math.floor(item.value)) {
            this.RankingShow = true;
            this.Ranking = index + 1;
            if (index + 1 === 1) {
              this.index1 = true;
              this.top10 = true;
              this.top50 = true;
            } else if (index + 1 === 2) {
              this.index2 = true;
              this.top10 = true;
              this.top50 = true;
            } else if (index + 1 === 3) {
              this.index3 = true;
              this.top10 = true;
              this.top50 = true;
            } else if (index + 1 < 11) {
              this.top10 = true;
              this.top50 = true;
            } else if (index + 1 < 51) {
              this.top50 = true;
            } else if (index + 1 < 101) {
              this.top100 = true;
            }
          }
        });
      });
      this.Progress();
    },
    CloseTogell_1() {
      this.close_1 = true;
      this.close_2 = false;
    },
    CloseTogell_2() {
      this.close_1 = false;
      this.close_2 = true;
    },
    Hmac() {},
    async State() {
      const urlParams = new URLSearchParams(window.location.search);

      const washingtonRef = doc(db, "الطلاب", localStorage.getItem("userid"));

      const washingtonSnap = await getDoc(washingtonRef);

      const payArray = washingtonSnap.data().pay;

      for (let i = 0; i < payArray.length; i++) {
        if (+urlParams.get("order") === payArray[i].order_id) {
          if (
            urlParams.get("success") !== "true" &&
            urlParams.get("pending") === "false"
          ) {
            const updatedPayArray = [...payArray];

            // استخدم splice لحذف العنصر المحدد
            updatedPayArray.splice(i, 1);

            await updateDoc(washingtonRef, { pay: updatedPayArray });

            break;
          }
        }
      }
    },
    async GetData() {
      const q = query(
        collection(db, "الطلاب"),
        where("userid", "==", localStorage.getItem("userid"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        this.name1 = user.name_1;
        this.name2 = user.name_2;
        this.name3 = user.name_3;

        this.AllName = `
        ${this.name1} ${this.name2} ${this.name3}
        `;
        this.phone = user.phone;
        this.email = user.email;
        this.college_place = user.college_place;
        this.Class = user.Class;
        this.Lang = user.Lang;
        this.TypeOfClass = user.TypeOfClass;
        this.User = user;
      });
      // setTimeout(() => {
      this.handleTotalResult();
      this.All_Btn();

      // }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.TheUser {
  background-image: url("../assets/WhatsApp Image 2023-12-04 at 11.00.58 PM.jpeg");
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
}
.v-progress-circular__overlay {
  color: var(--main-color) !important;
}
.v-progress-circular {
  margin: 1rem;
}
.ranking {
  transition: 0.5s;
}
.Info {
  background-image: url("../assets/WhatsApp Image 2023-12-04 at 11.00.58 PM.jpeg");
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
}
.v-progress-circular__content {
  font-size: 20px !important;
  color: var(--main-color) !important;
  font-weight: bold !important;
}
.All_Btn {
  div {
    font-size: 20px;
    font-weight: bold;
    background: #fff;
    border: 1px solid var(--main-color);
    color: var(--main-color);
  }
}
.active {
  color: #fff !important;
  background: var(--main-color) !important;
}
table th,
td {
  text-align: center;
  border: 1px solid #ddd;
  padding: 10px;
  color: var(--main-color);
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .title {
    flex-direction: column;
  }
  .ranking {
    width: 100%;
    margin-top: 10px;
  }
  .TheUser {
    margin-top: -20px !important;
    .container {
      padding-top: 123px !important;
    }
  }
  .User_file {
    flex-direction: column-reverse;
    gap: 25px;
    & > div {
      width: 100%;
    }
  }
}
</style>
