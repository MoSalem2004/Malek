<template>
  <div class="contain flex my-7 gap-2.5 flex-wrap">
    <img
      src="../assets/animation_lolk2w1w_small.gif"
      alt=""
      style="width: 100px; margin: auto"
      v-if="ShowImg"
    />
    <div v-if="ShowMyResult1" class="Msg">لا توجد نتائج لك</div>
    <div
      class="box border p-2.5 Main_Box w-32 rounded bg-[#ffffff6e]"
      v-for="(Subject, index) in Subjects"
      :key="Subject"
    >
      <div class="flex justify-between">
        <div class="flex flex-col justify-between">
          <div
            style="
              width: 30px;
              background: var(--main-color);
              color: #fff;
              height: 30px;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: bold;
            "
          >
            {{ index + 1 }}
          </div>
          <div style="font-size: 20px; font-weight: bold; color: #636262">
            {{ Subject }}
          </div>
          <div
            class="ShowResult cursor-pointer bg-[--main-color] text-[--main-color] p-2.5 text-center flex align-center gap-2.5 justify-center hover-0"
            @click="GetDataByIndex(index)"
            style="justify-content: flex-start;
    background: #fff;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    margin-top: 10px;
    width: fit-content;
    padding: 5px 11px;
}"
          >
            <font-awesome-icon :icon="['fas', 'circle-info']" />
            <!-- color="var(--main-color)" -->
            <div>التفاصيل</div>
          </div>
        </div>
        <div class="AllResults flex flex-col align-center justify-between">
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :model-value="value[index]"
            style="color: var(--main-color) !important"
          >
            <template v-slot:default>
              <div
                class="value"
                style="
                  font-size: 20px !important;
                  color: var(--main-color) !important;
                  font-weight: bold !important;
                "
              >
                <span>{{ value[index] }}</span> %
              </div>
            </template>
          </v-progress-circular>
          <div
            class="appreciation"
            style="
              background: rgb(250, 250, 250);
              width: 99px;
              padding: 4px;
              border-radius: 5px;
              font-size: 17px;
              min-height: 38px;
              transition: all 0.3s ease 0s;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: var(--main-color);
              margin-top: 20px;
            "
          ></div>
        </div>
      </div>

      <div
        class="main_Overlay"
        v-if="ShowResult"
        @click="ShowResultFunction"
        style="z-index: 101"
      ></div>
      <div
        class="bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-h-90 overflow-auto container"
        v-show="ShowResult"
        style="z-index: 101"
      >
        <div
          class="text-left p-2.5"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            font-size: 23px;
            font-weight: bold;
            color: var(--main-color);
            background: #fafafa;
            border-radius: 5px;
            margin-bottom: 20px;
          "
        >
          <div>تفاصيل النتائج - {{ Name_Sub }}</div>
          <font-awesome-icon
            :icon="['fas', 'xmark']"
            @click="ShowResultFunction"
          />
        </div>
        <div class="contain flex flex-wrap gap-2.5">
          <div
            class="test border border-[--main-color] rounded p-2.5 w-32 flex flex-wrap"
            v-for="(Result, index) in Results_1"
            :key="Result"
          >
            <div class="flex justify-between flex-col w-1/2">
              <div
                style="
                  font-size: 18px;
                  font-weight: bold;
                  color: var(--main-color);
                "
              >
                اختبار رقم ( {{ Result.TestNumber }})
              </div>
            </div>
            <div class="flex justify-between items-center flex-col w-1/2">
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :model-value="value_1[index]"
                style="color: var(--main-color) !important"
              >
                <template v-slot:default>
                  <div
                    class="value"
                    style="
                      font-size: 20px !important;
                      color: var(--main-color) !important;
                      font-weight: bold !important;
                    "
                  >
                    <span>{{ value_1[index] || 0 }}</span> %
                  </div>
                </template>
              </v-progress-circular>
              <div
                style="
                  background: rgb(250, 250, 250);
                  width: 99px;
                  padding: 4px;
                  border-radius: 5px;
                  font-size: 17px;
                  min-height: 38px;
                  transition: all 0.3s ease 0s;
                  text-align: center;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  color: var(--main-color);
                  margin-top: 20px;
                "
              >
                {{ Result.appreciation }}
              </div>
            </div>
            <div
              class="w-100"
              style="
                font-size: 13px;
                font-weight: bold;
                color: rgb(105, 105, 105);
                display: flex;
                align-items: center;
                gap: 10px;
                background: #fafafa;
                padding: 5px;
                margin-top: 15px;
                border-radius: 5px;
              "
            >
              <font-awesome-icon
                :icon="['fas', 'clock']"
                color="var(--main-color)"
              />
              <div>
                {{
                  new Date(Result.Time.toMillis()).toLocaleString(["ar"], {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </div>
            </div>
            <div class="flex justify-between items-center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    style="
      width: 100%;
      border: 1px solid var(--main-color);
      height: 53px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: linear-gradient(-45deg, #075e55, white);
      font-size: 20px;
      font-weight: bold;
      color: var(--main-color);
    "
  >
    نتائج أخري ( غير تابعة لفرقتك الدراسية )
  </div>
  <div class="contain">
    <img
      src="../assets/animation_lolk2w1w_small.gif"
      alt=""
      style="width: 100px; margin: auto"
      v-if="ShowImg"
    />
    <div v-if="ShowMyResult2" class="Msg">لا توجد نتائج لك</div>
    <div class="box border p-2.5" v-for="Result in Results_2" :key="Result">
      <div>{{ Result.Type }}</div>
      <div>{{ Result.Class }}</div>
      <div>{{ Result.Lang }}</div>
      <div>{{ Result.Sub }}</div>
      <div>{{ Result.result }}/{{ Result.Allresult }}</div>
      <div class="flex justify-between items-center">
        <div>اختبار رقم ( {{ Result.TestNumber }})</div>
        <div>
          <div>{{ Result.percent }}%</div>
          <div>{{ Result.appreciation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
  name: "MyResults",
  emits: ["TotalResultFunction", "AppreciationsFunction"],
  data() {
    return {
      Results_1: [],
      Results_2: [],
      ShowResult: null,
      Subjects: [],
      Main_Index: "",
      Sub: [],
      TotalResult: "",
      Appreciations: "",
      interval: [],
      interval_1: [],
      value: [],
      value_1: [],
      ShowImg: true,
      ShowMyResult1: null,
      ShowMyResult2: null,
      Name_Sub: "",
    };
  },
  mounted() {
    this.GetData();
  },
  methods: {
    Progress() {},
    async GetPercent() {
      // let Percents = document.querySelectorAll(".AllResults .percent");
      // let value = document.querySelectorAll(".AllResults .value");
      let Appreciations = document.querySelectorAll(
        ".AllResults .appreciation"
      );
      let Array = [];
      let Array_1 = [];
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      for (let e = 0; e < this.Sub.length; e++) {
        Array = [];
        for (let i = 0; i < docData.resultes.length; i++) {
          if (docData.resultes[i].Sub === this.Sub[e]) {
            Array.push(docData.resultes[i].percent);
          }
        }
        const sum = Array.reduce(
          (accumulator, currentValue) => accumulator + parseInt(currentValue),
          0
        );
        const average = sum / (Array.length * 100);
        const result = (average * 100).toFixed(0);
        console.log(result);
        // Percents[e].innerHTML = `${result}%`;
        // value[e].innerHTML = `${result}%`;

        Array_1.push(result);
        // this.value.push(result);

        if (result >= 90 && result <= 100) {
          Appreciations[e].innerHTML = "إمتياز";
        } else if (result >= 80 && result <= 89) {
          Appreciations[e].innerHTML = "جيد جدا";
        } else if (result >= 70 && result <= 79) {
          Appreciations[e].innerHTML = "جيد";
        } else if (result >= 50 && result <= 69) {
          Appreciations[e].innerHTML = "مقبول";
        } else if (result >= 25 && result <= 49) {
          Appreciations[e].innerHTML = "ضعيف";
        } else if (result >= 0 && result <= 24) {
          Appreciations[e].innerHTML = "ضعيف جدا";
        }
      }

      for (let i = 0; i < Array_1.length; i++) {
        this.interval[i] = 0;
        this.value[i] = 0;
        this.interval[i] = setInterval(() => {
          if (this.value[i] === Math.round(+Array_1[i]) || 0) {
            //     this.ShowAppreciations = true;
            return (this.value[i] = Math.round(+Array_1[i]) || 0);
          }
          this.value[i] += 1;
        }, 10);
      }
      const sum = Array_1.reduce(
        (accumulator, currentValue) => accumulator + parseFloat(currentValue),
        0
      );
      this.TotalResult = ((sum / +`${Array_1.length}00`) * 100).toFixed(0);
      // this.Appreciations = sum;

      if (this.TotalResult >= 90 && this.TotalResult <= 100) {
        this.Appreciations = "إمتياز";
      } else if (this.TotalResult >= 80 && this.TotalResult <= 89) {
        this.Appreciations = "جيد جدا";
      } else if (this.TotalResult >= 70 && this.TotalResult <= 79) {
        this.Appreciations = "جيد";
      } else if (this.TotalResult >= 50 && this.TotalResult <= 69) {
        this.Appreciations = "مقبول";
      } else if (this.TotalResult >= 25 && this.TotalResult <= 49) {
        this.Appreciations = "ضعيف";
      } else if (this.TotalResult >= 0 && this.TotalResult <= 24) {
        this.Appreciations = "ضعيف جدا";
      }
      this.$emit("TotalResultFunction", Math.round(this.TotalResult));
      this.$emit("AppreciationsFunction", this.Appreciations);
    },
    async GetDataByIndex(index) {
      this.Results_1 = [];
      this.interval_1 = [];
      this.value_1 = [];
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let Array = [];
      for (let i = 0; i < docData.resultes.length; i++) {
        if (docData.resultes[i].Sub === this.Sub[index]) {
          this.Name_Sub = docData.resultes[i].Sub;
          this.ShowResult = true;
          this.Results_1.push(docData.resultes[i]);
          this.Results_1?.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
          Array.push(this.Results_1[0].percent);
        }
      }
      // this.Results_1;
      for (let i = 0; i < this.Results_1.length; i++) {
        this.interval_1[i] = 0;
        this.value_1[i] = 0;
        this.interval_1[i] = setInterval(() => {
          if (
            this.value_1[i] === Math.round(+this.Results_1[i]?.percent) ||
            0
          ) {
            this.ShowAppreciations = true;
            return (this.value_1[i] =
              Math.round(+this.Results_1[i].percent) || 0);
          }
          this.value_1[i] += 1;
        }, 10);
      }
    },
    ShowResultFunction() {
      this.ShowResult = !this.ShowResult;
    },
    async GetData() {
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let Array = [];
      // let State;
      for (let i = 0; i < docData.resultes.length; i++) {
        if (
          docData.resultes[i].Type === docData.TypeOfClass &&
          docData.resultes[i].Class === docData.Class &&
          docData.resultes[i].Lang === docData.Lang
        ) {
          Array.push(docData.resultes[i].Sub);
          const uniqueValues = new Set(Array);
          this.Subjects = uniqueValues;
          const arrayMethod1 = [...this.Subjects];
          this.Sub = arrayMethod1;
          setTimeout(() => {
            this.GetPercent();
          }, 10);
        } else {
          this.Results_2.push(docData.resultes[i]);
        }
      }
      if (this.Subjects.length === 0) {
        this.ShowMyResult1 = true;
      }
      if (this.Results_2.length === 0) {
        this.ShowMyResult2 = true;
      }

      this.Progress();
      this.ShowImg = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.Msg {
  background: #fafafa;
  padding: 10px;
  text-align: center;
  margin: 10px auto;
  border-radius: 5px;
  font-weight: 700;
  color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .contain {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
}
</style>
