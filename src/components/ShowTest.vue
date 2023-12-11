<template>
  <div class="ShowTest">
    <div class="main_Overlay z-10" style="z-index: 101"></div>
    <div
      class="container rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto h-4/5 z-20"
      style="z-index: 101"
    >
      <div
        class="header flex justify-between border-b border-[#eee] mb-2.5 p-2.5 rounded items-center"
      >
        <span>اختبار رقم ({{ TestIndex + 1 }})</span>
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          class="bg-[red] rounded text-white py-1 px-2.5"
          @click="OpenCheck"
        />
      </div>
      <div
        class="Check bg-[#fafafa] p-2.5 text-center flex flex-col gap-2.5"
        v-if="ShowCheck"
      >
        <div>هل متأكد من أنك تريد الخروج من الإمتحان ؟</div>

        <div>
          <span class="btn" @click="Close">نعم</span>
          <span class="btn" @click="CloseCheck">لا</span>
        </div>
      </div>
      <div class="form" v-if="ShowQu">
        <div class="rounded p-2.5">
          <div class="body flex flex-col gap-2.5">
            <div class="feat border p-2 5 rounded">
              <div>الأسئلة</div>
              <div class="form flex flex-col gap-2.5">
                <textarea
                  name="qu1"
                  id="qu1"
                  cols="10"
                  rows="5"
                  placeholder="السؤال"
                  class="resize-none border p-2.5"
                  v-model="qu1"
                ></textarea>
                <input
                  type="text"
                  id="RightAnswer"
                  placeholder="الإجابة الصحيحة"
                  class="border p-2.5"
                  v-model="RightAnswer"
                />
                <textarea
                  name="qu2"
                  id="qu2"
                  cols="10"
                  rows="3"
                  placeholder="تكملة السؤال"
                  class="resize-none border p-2.5"
                  v-model="qu2"
                ></textarea>
                <input
                  type="text"
                  id="WrongAnswer1"
                  placeholder="إجابة خاطئة - 1"
                  class="border p-2.5"
                  v-model="WrongAnswer1"
                /><input
                  type="text"
                  id="WrongAnswer2"
                  placeholder="إجابة خاطئة - 2"
                  class="border p-2.5"
                  v-model="WrongAnswer2"
                />
              </div>
            </div>
          </div>

          <div
            class="Add_Qu flex items-center gap-2.5 mr-auto w-fit p-2 text-[--main-color] border-[--main-color] border-1 rounded cursor-pointer"
            @click="AddData"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
            <span>اضف سؤال</span>
          </div>
        </div>
      </div>
      <div class="Notes">
        <div
          class="border p-2.5 text-center cursor-pointer w-fit mr-auto rounded"
          @click="ShowQuFunction"
          v-if="UserAdmin === 'Admin'"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span> اضف سؤال </span>
        </div>
        <div v-if="TestState">
          <h3>ملاحظات هامة قبل بدأ الإختبار :</h3>
          <div class="countain py-2.5 flex flex-col gap-2.5">
            <div class="flex items-center gap-2.5">
              <font-awesome-icon
                :icon="['fas', 'clock']"
                class="text-[--main-color]"
              />
              <span
                >الإختبار بوقت محدد بمعدل دقيقة و نصف لكل سؤال وقت الإختبار ({{
                  this.Qu.length * 1.5 || 0
                }}
                دقيقة )</span
              >
            </div>
            <div class="flex items-center gap-2.5">
              <font-awesome-icon
                :icon="['fas', 'square-poll-vertical']"
                class="text-[--main-color]"
              />
              <span>يتم حساب نتيجة أول أختبار فقط</span>
            </div>
            <div class="flex items-center gap-2.5">
              <font-awesome-icon
                :icon="['fas', 'thumbs-up']"
                class="text-[--main-color]"
              />
              <span
                >بمجرد ضغطك علي زر البدأ يتم احتساب النتيجة حتي لو اغلقت
                الإختبار</span
              >
            </div>
          </div>
          <div
            class="button border p-3 text-center cursor-pointer mt-2.5"
            @click="StarTest"
            style="
              border: 1px solid var(--main-color) !important;
              border-radius: 5px;
              color: var(--main-color);
              font-size: 17px;
              font-weight: bold;
            "
          >
            ابدأ الإختبار
          </div>
        </div>
      </div>
      <div class="body mt-2.5" v-if="StarTestState">
        <div class="flex items-center p-2.5 bg-[#eee] justify-between">
          <p>{{ formatTime }}</p>
          <div>({{ this.Qu.length }}) سؤال</div>
        </div>
        <img
          src="../assets/animation_lolk2w1w_small.gif"
          alt=""
          class="m-auto"
          v-if="ShowImg"
        />
        <div class="All_Qu my-3">
          <div class="box my-2.5 relative" v-for="(qu, index) in Qu" :key="qu">
            <div
              class="qu flex items-center p-2.5 gap-1 bg-[#fafafa] rounded whitespace-pre-line"
            >
              <div class="num">{{ index + 1 }} -</div>
              <div class="qu1">{{ qu.qu1 }}</div>
              <span>...</span>
              <div class="qu2">{{ qu.qu2 }}</div>
            </div>
            <div class="Answer flex mt-2.5 flex-wrap gap-2.5">
              <div
                class="RightAnswer w-auto min-w-32 text-center border p-2.5 cursor-pointer rounded"
              >
                {{ qu.RightAnswer }}
              </div>
              <div
                class="WrongAnswer1 w-auto min-w-32 text-center border p-2.5 cursor-pointer rounded"
              >
                {{ qu.WrongeAnswer1 }}
              </div>
              <div
                class="WrongAnswer2 w-auto min-w-32 text-center border p-2.5 cursor-pointer rounded"
              >
                {{ qu.WrongeAnswer2 }}
              </div>
            </div>
          </div>
        </div>
        <div class="error text-[red] text-center p-2.5" v-if="ErrorActive">
          أكمل الأسئلة
        </div>

        <div
          class="showresult bg-[--main-color] p-2.5 text-center cursor-pointer text-white"
          @click="ShowResult"
        >
          النتيجة
        </div>
        <div
          class="main_Overlay"
          v-if="MyResult"
          @click="MyResult = !MyResult"
        ></div>
        <div
          class="result"
          v-if="MyResult"
          style="
            position: fixed;
            top: 50%;
            left: 50%;
            background: rgb(255, 255, 255);
            width: 95%;
            transform: translate(-50%, -50%);
            z-index: 101;
            padding: 10px;
            border-radius: 5px;
          "
        >
          <div class="flex items-center justify-between">
            <span
              style="
                font-size: 25px;
                font-weight: bold;
                font-family: system-ui;
                color: var(--main-color);
              "
            >
              نتيجتك
            </span>
            <font-awesome-icon
              :icon="['fas', 'rectangle-xmark']"
              @click="CloseMyResult()"
              style="
                font-size: 25px;
                font-weight: bold;
                font-family: system-ui;
                color: var(--main-color);
              "
            />
          </div>
          <div class="body mt-2.5">
            <div>
              <div>درجتك :</div>
              <div>{{ result }} / {{ Allresult }}</div>
            </div>
            <div>
              <div>التقدير :</div>
              <div>
                {{ appreciation }}
              </div>
            </div>
            <div>
              <div>النسبة المئوية :</div>
              <div>{{ percent }}%</div>
            </div>
            <div>
              <div>
                <div class="color"></div>
              </div>
              <div>لون الإجابة الصحيحة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDoc, getFirestore, setDoc, doc } from "firebase/firestore";
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
  name: "ShowTest",
  emits: ["close"],
  props: ["TestIndex"],
  mounted() {
    this.ShowImg = true;
    // setTimeout(() => {
    this.GetData();
    // }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.timeout);
  },

  data() {
    return {
      ShowCheck: null,
      Qu: [],
      qu1: "",
      qu2: "؟",
      RightAnswer: "",
      WrongAnswer1: "",
      WrongAnswer2: "",
      ShowImg: null,
      MyResult: null,
      appreciation: "",
      percent: "",
      result: 0,
      Allresult: "",
      ErrorActive: null,
      ShowQu: null,
      StarTestState: null,
      TestState: true,
      targetTime: new Date().getTime() + 0 * 60 * 1000,
      currentTime: new Date().getTime(),
      QULength: 0,
      StateSub: null,
    };
  },
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
    timeRemaining() {
      return this.targetTime - this.currentTime;
    },
    formatTime() {
      const minutes = Math.floor(
        (this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((this.timeRemaining % (1000 * 60)) / 1000);

      return `${minutes} دقيقة ${seconds} ثانية `;
    },
  },
  methods: {
    CloseMyResult() {
      this.MyResult = !this.MyResult;
    },
    async AddResultInData() {
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const index = this.TestIndex;
        const newData = {
          Type: localStorage.getItem("updateType"),
          Lang: localStorage.getItem("updateLang"),
          Class: localStorage.getItem("updateClass"),
          Sub: localStorage.getItem("updateSub"),
          TestNumber: index + 1,
          result: this.result,
          Allresult: this.Allresult,
          appreciation: this.appreciation,
          percent: this.percent,
          Time: new Date(),
        };
        if (docData.resultes.length === 0) {
          docData.resultes.push(newData);
        }
        let Array = [];
        for (let i = 0; i < docData.resultes.length; i++) {
          if (docData.resultes[i].Sub === localStorage.getItem("updateSub")) {
            Array.push(docData.resultes[i].TestNumber);
            this.StateSub = !Array.includes(index + 1);
          } else {
            this.StateSub = true;
          }
        }
        if (this.StateSub) {
          docData.resultes.push(newData);
        }

        await setDoc(docRef, docData);
      }
    },
    handleCountdownExpired() {
      let AnswerDad = document.querySelectorAll(".Answer");
      let AllAnswer = document.querySelectorAll(".Answer > div");
      let active = document.querySelectorAll(".Answer > .active");
      this.MyResult = true;
      this.ErrorActive = false;
      AllAnswer.forEach((e) => {
        e.classList.add("pointer-events-none");
      });
      this.Allresult = this.Qu.length;
      for (let i = 0; i < this.Qu.length; i++) {
        for (let j = 0; j < 3; j++) {
          if (AnswerDad[i].children[j].innerHTML === this.Qu[i].RightAnswer) {
            AnswerDad[i].children[j].style.background = "#0088ff";
            AnswerDad[i].children[j].style.color = "#fff";
          }
        }
      }
      for (let i = 0; i < active.length; i++) {
        if (active[i].innerHTML === this.Qu[i].RightAnswer) {
          this.result += 1;
          if (this.result !== 0) {
            this.percent = ((this.result / this.Allresult) * 100).toFixed(0);
          } else {
            this.percent = 0;
          }
          if (this.percent >= 90 && this.percent <= 100) {
            this.appreciation = "إمتياز";
          } else if (this.percent >= 80 && this.percent <= 89) {
            this.appreciation = "جيد جدا";
          } else if (this.percent >= 70 && this.percent <= 79) {
            this.appreciation = "جيد";
          } else if (this.percent >= 50 && this.percent <= 69) {
            this.appreciation = "مقبول";
          } else if (this.percent >= 25 && this.percent <= 49) {
            this.appreciation = "ضعيف";
          } else if (this.percent >= 0 && this.percent <= 24) {
            this.appreciation = "ضعيف جدا";
          }
        } else {
          this.result = 0;
          this.percent = 0;
          this.appreciation = "ضعيف جدا";
        }
      }
      if (active.length === 0) {
        this.result = 0;
        this.percent = 0;
        this.appreciation = "ضعيف جدا";
      }

      this.AddResultInData();
    },
    StartTime() {
      this.targetTime = new Date().getTime() + this.Qu.length * 1.5 * 60 * 1000;
      this.updateCurrentTime();
      this.timer = setInterval(() => {
        this.updateCurrentTime();
        if (this.formatTime === "0 دقيقة 0 ثانية ") {
          clearInterval(this.timer);
          setTimeout(() => {
            this.handleCountdownExpired();
          }, 100);
        }
      }, 1000);
    },
    updateCurrentTime() {
      this.currentTime = new Date().getTime();
    },
    StarTest() {
      this.StarTestState = true;
      this.TestState = false;
      this.GetData();
    },
    ShowQuFunction() {
      this.formatTime === "0 دقيقة 0 ثانية ";
      this.ShowQu = !this.ShowQu;
    },
    ShowResult() {
      let AnswerDad = document.querySelectorAll(".Answer");
      let AllAnswer = document.querySelectorAll(".Answer > div");
      let active = document.querySelectorAll(".Answer > .active");
      if (active.length !== this.Qu.length || active.length === 0) {
        this.ErrorActive = true;
        this.MyResult = false;
      } else {
        this.MyResult = true;
        this.ErrorActive = false;
        AllAnswer.forEach((e) => {
          e.classList.add("pointer-events-none");
        });
        for (let i = 0; i < active.length; i++) {
          this.Allresult = active.length;
          for (let j = 0; j < 3; j++) {
            if (AnswerDad[i].children[j].innerHTML === this.Qu[i].RightAnswer) {
              AnswerDad[i].children[j].style.background = "#0088ff";
              AnswerDad[i].children[j].style.color = "#fff";
            }
          }
          if (active[i].innerHTML === this.Qu[i].RightAnswer) {
            document
              .querySelector(".showresult")
              .classList.add("pointer-events-none");
            this.result += 1;
            if (this.result !== 0) {
              this.percent = ((this.result / this.Allresult) * 100).toFixed(0);
            } else {
              this.percent = 0;
              this.appreciation = "ضعيف جدا";
              this.result = 0;
            }
            if (this.percent >= 90 && this.percent <= 100) {
              this.appreciation = "إمتياز";
            } else if (this.percent >= 80 && this.percent <= 89) {
              this.appreciation = "جيد جدا";
            } else if (this.percent >= 70 && this.percent <= 79) {
              this.appreciation = "جيد";
            } else if (this.percent >= 50 && this.percent <= 69) {
              this.appreciation = "مقبول";
            } else if (this.percent >= 25 && this.percent <= 49) {
              this.appreciation = "ضعيف";
            } else if (this.percent >= 0 && this.percent <= 24) {
              this.appreciation = "ضعيف جدا";
            }
          } else {
            this.percent = 0;
            this.appreciation = "ضعيف جدا";
            this.result = 0;
          }
        }
        setInterval(() => {
          // this.formatTime = "0 دقيقة 0 ثانية ";
          clearInterval(this.timer);
        }, 1000);
        setTimeout(() => {
          // this.AddResultInData();
        }, 1000);
      }
    },
    ClickActive() {
      let AnswerDad = document.querySelectorAll(".Answer");
      AnswerDad.forEach(() => {
        for (let i = 0; i < AnswerDad.length; i++) {
          document
            .querySelectorAll(".Answer")
            [i].querySelectorAll("div")
            .forEach((e) => {
              e.style.order = -Math.floor(Math.random() * 10);
              e.onclick = () => {
                document
                  .querySelectorAll(".Answer")
                  [i].querySelectorAll("div")
                  .forEach((e) => {
                    e.classList.remove("active");
                  });
                e.classList.add("active");
              };
            });
        }
      });
    },
    CleanData() {
      this.qu1 = "";
      this.qu2 = "";
      this.RightAnswer = "";
      this.WrongAnswer1 = "";
      this.WrongAnswer2 = "";
    },

    async GetData() {
      let sentence = localStorage.getItem("updateType");

      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;
      const docRef = doc(db, collectionPath, localStorage.getItem("updateSub"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const index = this.TestIndex;
      this.Qu = docData.test[index].AllQu;
      this.ShowImg = false;
      setTimeout(() => {
        this.ClickActive();
        setTimeout(() => {
          this.StartTime();
        }, 1000);
      }, 100);
    },
    async AddData() {
      this.MyResult = false;
      let AllAnswer = document.querySelectorAll(".Answer > div");
      if (AllAnswer.length !== 0) {
        AllAnswer.forEach((e) => {
          e.classList.remove("pointer-events-none");
        });
      }
      this.formatTime = "0 دقيقة 0 ثانية ";
      let sentence = localStorage.getItem("updateType");

      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;
      const docRef = doc(db, collectionPath, localStorage.getItem("updateSub"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (!docData.test) {
          docData.test = [];
        }
        const index = this.TestIndex;
        const newData = {
          qu1: document.getElementById("qu1").value,
          RightAnswer: document.getElementById("RightAnswer").value,
          qu2: document.getElementById("qu2").value,
          WrongeAnswer1: document.getElementById("WrongAnswer1").value,
          WrongeAnswer2: document.getElementById("WrongAnswer2").value,
        };

        if (Array.isArray(docData.test[index].AllQu)) {
          docData.test[index].AllQu.push(newData);
        } else {
          docData.test[index].AllQu = [newData];
        }
        this.Qu = docData.test[index].AllQu;
        await setDoc(docRef, docData);
      } else {
        await setDoc(docRef, {
          test: [
            {
              AllQu: {
                [0]: {
                  qu1: document.getElementById("qu1").value,
                  RightAnswer: document.getElementById("RightAnswer").value,
                  qu2: document.getElementById("qu2").value,
                  WrongeAnswer1: document.getElementById("WrongAnswer1").value,
                  WrongeAnswer2: document.getElementById("WrongAnswer2").value,
                },
              },
            },
          ],
        });
      }
      setTimeout(() => {
        this.ClickActive();
      }, 100);
    },
    OpenCheck() {
      this.ShowCheck = true;
    },
    CloseCheck() {
      this.ShowCheck = false;
    },
    Close() {
      if (this.StarTestState) {
        this.handleCountdownExpired();
      }
      let AllAnswer = document.querySelectorAll(".Answer > div");
      if (AllAnswer.length !== 0) {
        AllAnswer.forEach((e) => {
          e.classList.remove("pointer-events-none");
        });
      }
      setTimeout(() => {
        this.$emit("close");
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.active {
  background: var(--main-color);
  color: #fff;
}
.Check {
  animation: Check 0.3s 1;
}
h3 {
  font-size: 35px;
  font-family: system-ui;
  color: red;
}
.header {
  span {
    font-family: system-ui;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
  }
}
.countain {
  > div {
    flex-direction: column;
    align-items: flex-start;
    /* border: 1px solid #ddd; */
    background: #fafafa;
    padding: 7px 10px;
    border-radius: 5px;
  }
}
.result .body {
  & > div {
    display: flex;
    align-items: center;
    & > div {
      width: 50%;
      border: 1px solid;
      padding: 5px;
      text-align: center;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .color {
        width: 30px;
        height: 30px;
        background: #0088ff;
        border-radius: 50%;
        margin: auto;
      }
    }
  }
}
@keyframes Check {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .Answer {
    flex-direction: column;
    & > div {
      width: 100% !important;
    }
  }
}
</style>
