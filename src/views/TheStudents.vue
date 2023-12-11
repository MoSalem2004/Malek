<template>
  <div class="container TheStudents flex CC">
    <div class="right w-2/5">
      <div class="box">
        <div class="Type border p-2.5 cursor-pointer">
          كلية الشريعة و القانون
        </div>
        <div class="Lang p-2.5 cursor-pointer hidden">عربي</div>
        <div class="Lang p-2.5 cursor-pointer hidden">English</div>
        <div class="Class p-2.5 cursor-pointer hidden">الفرقة الأولي</div>
        <div class="Class p-2.5 cursor-pointer hidden">الفرقة الثانية</div>
        <div class="Class p-2.5 cursor-pointer hidden">الفرقة الثالثة</div>
        <div class="Class p-2.5 cursor-pointer hidden">الفرقة الرابعة</div>
      </div>
      <div class="box">
        <div class="Type border p-2.5 cursor-pointer">معهد أعوان القضاء</div>
        <div class="Lang p-2.5 cursor-pointer hidden">عربي</div>
        <div class="Class p-2.5 cursor-pointer hidden">الفرقة الأولي</div>
        <div class="Class p-2.5 cursor-pointer hidden">الفرقة الثانية</div>
      </div>
    </div>
    <div class="left w-3/5">
      <div>عدد الطلاب : {{ Students.length }}</div>
      <div>عدد البنات : {{ Female.length }}</div>
      <div>عدد الأولاد : {{ Male.length }}</div>
      <input
        v-model="searchInput"
        @input="searchNames"
        placeholder="ابحث في الأسماء"
        class="border w-100 p-2.5"
      />

      <div class="content flex">
        <img
          src="../assets/animation_loia37xm_small.gif"
          alt=""
          v-if="showDownloadIcon"
          class="m-auto"
        />
        <div
          class="box border p-2.5"
          v-for="(Student, index) in Students"
          :key="Student"
        >
          <div class="num">{{ index + 1 }}</div>
          <div class="flex">
            <div class="name">{{ Student.Name }}</div>
            <div class="flex flex-col justify-between items-center">
              <div class="AllResults">{{ Student.AllResults || 0 }}%</div>
              <div>متوسط النتائج</div>
            </div>
          </div>
          <div class="flex justify-between">
            <div
              class="button border p-2.5 cursor-pointer"
              @click="GetBIll(index)"
            >
              الفواتير
            </div>
            <div
              class="button border p-2.5 cursor-pointer"
              @click="GetResult(index)"
            >
              النتائج
            </div>
          </div>
        </div>
        <div class="main_Overlay" v-if="BIllShow" style="z-index: 101"></div>
        <div class="main_Overlay" v-if="ResultShow" style="z-index: 101"></div>
        <div
          class="BILL bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-h-90 overflow-auto"
          style="z-index: 101"
          v-if="BIllShow"
        >
          <div>
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              @click="BIllShowFunction"
            />
          </div>
          <div class="BIll border p-2.5" v-for="bill in BIll" :key="bill">
            <div>الدراسة : {{ bill.BillType }}</div>
            <div>القسم : {{ bill.BillLang }}</div>
            <div>الفرقة : {{ bill.BillClass }}</div>
            <div>الصنف : {{ bill.BillItem }}</div>
            <div>السعر : {{ +bill.BillPrice / 100 }}</div>
            <div>المادة : {{ bill.BillName }}</div>
            <div>كود الإستلام : {{ bill.order_id }}</div>
            <div>
              تاريخ الدفع :
              {{
                new Date(bill.Time.toMillis()).toLocaleString(["ar"], {
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
        </div>
        <div
          class="BILL bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-h-90 overflow-auto"
          v-if="ResultShow"
          style="z-index: 101"
        >
          <div>
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              @click="ResultShowFunction"
            />
          </div>
          <div class="BIll border p-2.5" v-for="bill in Result" :key="bill">
            <div>الدراسة : {{ bill.Type }}</div>
            <div>القسم : {{ bill.Lang }}</div>
            <div>الفرقة : {{ bill.Class }}</div>
            <div>المادة : {{ bill.Sub }}</div>

            <div>اختبار رقم ({{ bill.TestNumber }})</div>
            <div>التقدير : {{ bill.appreciation }}</div>
            <div>النسبة المؤية : {{ bill.percent }}%</div>
            <div>المجموع : {{ bill.result }} / {{ bill.Allresult }}</div>
            <div>
              تاريخ اختبار الطالب :
              {{
                new Date(bill.Time.toMillis()).toLocaleString(["ar"], {
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
        </div>
      </div>
    </div>
  </div>
  <AlarmClock />
</template>
<script>
import { collection, getDocs, getFirestore } from "firebase/firestore";

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
import AlarmClock from "../components/AlarmClock.vue";
export default {
  name: "TheStudents",
  components: {
    AlarmClock,
  },
  mounted() {
    setTimeout(() => {
      this.HandelClick();
    }, 10);
  },
  data: () => ({
    Type: "",
    Lang: "",
    Class: "",
    Students: [],
    showDownloadIcon: false,
    BIll: [],
    Result: [],
    BIllShow: null,
    ResultShow: null,
    Male: [],
    Female: [],
    names: [],
    searchInput: "",
  }),
  methods: {
    searchNames() {
      if (this.searchInput.trim() !== "") {
        const searchTerm = this.searchInput.toLowerCase();
        const results = this.names.filter((name) =>
          name.toLowerCase().includes(searchTerm)
        );
        let names = document.querySelectorAll(".box .name");
        names.forEach((e1) => {
          results.forEach((e2) => {
            names.forEach((e) => {
              e.parentElement.parentElement.classList.add("hidden");
            });
            setTimeout(() => {
              if (e1.innerHTML === e2) {
                e1.parentElement.parentElement.classList.remove("hidden");
              }
            }, 10);
          });
        });
      }
    },
    ResultShowFunction() {
      this.ResultShow = !this.ResultShow;
    },
    BIllShowFunction() {
      this.BIllShow = !this.BIllShow;
    },
    async GetResult(index) {
      this.ResultShow = true;
      this.Result = [];
      let theResult;
      const querySnapshot = await getDocs(collection(db, "الطلاب"));
      querySnapshot.forEach((doc) => {
        let sentence = doc.data().TypeOfClass;
        let words = sentence.split(" ");
        let firstWord = words[0];
        if (
          firstWord === this.Type &&
          doc.data().Lang === this.Lang &&
          doc.data().Class === this.Class
        ) {
          this.Result.push(doc.data().resultes);
          this.Result.push(doc.data().resultes);
          this.Students.sort((a, b) => b.AllResults - a.AllResults);
          theResult = this.Result[index];
        }
      });
      this.Result = theResult;
      // this.Result.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
    },
    async GetBIll(index) {
      this.BIllShow = true;
      this.BIll = [];
      let thebill;
      const querySnapshot = await getDocs(collection(db, "الطلاب"));
      querySnapshot.forEach((doc) => {
        let sentence = doc.data().TypeOfClass;
        let words = sentence.split(" ");
        let firstWord = words[0];
        if (
          firstWord === this.Type &&
          doc.data().Lang === this.Lang &&
          doc.data().Class === this.Class
        ) {
          this.BIll.push(doc.data().pay);
          thebill = this.BIll[index];
        }
      });
      this.BIll = thebill;
      this.BIll.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
    },
    async GetData() {
      this.showDownloadIcon = false;
      this.Students = [];
      this.Male = [];
      this.Female = [];
      const querySnapshot = await getDocs(collection(db, "الطلاب"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let sentence = doc.data().TypeOfClass;
        let words = sentence.split(" ");
        let firstWord = words[0];
        if (
          firstWord === this.Type &&
          doc.data().Lang === this.Lang &&
          doc.data().Class === this.Class
        ) {
          let data = {
            Name: `${doc.data().name_1} ${doc.data().name_2} ${
              doc.data().name_3
            }`,
            AllResults: doc.data().AllResults,
            type: doc.data().type,
          };
          this.Students.push(data);
          this.names.push(data.Name);
          this.Students.sort((a, b) => b.AllResults - a.AllResults);
          if (data.type === "بنين") {
            this.Male.push(data.type);
          } else {
            this.Female.push(data.type);
          }
        }
      });
    },
    HandelClick() {
      let TypeDevs = document.querySelectorAll(".box .Type");
      let LangDevs = document.querySelectorAll(".Lang ");
      let classDevs = document.querySelectorAll(".Class");

      for (let i = 0; i < TypeDevs.length; i++) {
        TypeDevs[i].onclick = () => {
          // this.Type = TypeDevs[i].innerHTML;
          TypeDevs.forEach((e) => {
            e.classList.remove("active");
          });
          TypeDevs[i].classList.add("active");
          LangDevs.forEach((e) => {
            e.classList.remove("hidden");
            e.onclick = () => {
              LangDevs.forEach((e) => {
                e.classList.remove("active");
              });
              e.classList.add("active");

              classDevs.forEach((ele) => {
                ele.onclick = () => {
                  this.showDownloadIcon = true;
                  classDevs.forEach((e) => {
                    e.classList.remove("active");
                  });

                  ele.classList.add("active");
                  let sentence =
                    document.querySelector(".box .Type.active").innerHTML;
                  let words = sentence.split(" ");
                  let firstWord = words[1];
                  this.Type = firstWord;
                  this.Lang =
                    document.querySelector(".box .Lang.active").innerHTML;
                  this.Class =
                    document.querySelector(".box .Class.active").innerHTML;
                  setTimeout(() => {
                    this.GetData();
                  }, 10);
                };
                ele.classList.remove("hidden");
              });
            };
          });
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.active {
  background: var(--main-color);
  color: #fff;
}
</style>
