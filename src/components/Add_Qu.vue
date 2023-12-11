<template>
  <div class="Add_Test">
    <div class="main_Overlay z-20" @click="CloseAddTest"></div>
    <div
      class="container rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto h-4/5 z-20"
    >
      <div class="head text-left flex justify-between mb-2.5">
        <span>أضف أسئلة</span
        ><font-awesome-icon :icon="['fas', 'xmark']" @click="CloseAddTest" />
      </div>
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
            ></textarea>
            <input
              type="text"
              id="RightAnswer"
              placeholder="الإجابة الصحيحة"
              class="border p-2.5"
            />
            <textarea
              name="qu2"
              id="qu2"
              cols="10"
              rows="3"
              placeholder="تكملة السؤال"
              class="resize-none border p-2.5"
              value="؟"
            ></textarea>
            <input
              type="text"
              id="WrongAnswer1"
              placeholder="إجابة خاطئة - 1"
              class="border p-2.5"
            /><input
              type="text"
              id="WrongAnswer2"
              placeholder="إجابة خاطئة - 2"
              class="border p-2.5"
            />
          </div>
        </div>
      </div>
      <div class="button text-left mt-5">
        <span
          class="bg-[--main-color] text-white p-2.5 rounded cursor-pointer"
          @click="AddData"
          >تم</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

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
  name: "Add_Qu",
  data() {
    return {
      time: "",
    };
  },
  mounted() {
    this.ClassActive();
  },
  methods: {
    GetData() {
      this.$emit("GetData");
    },
    ClassActive() {
      let btn = document.querySelectorAll(".type > div");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
          btn.forEach((e) => {
            e.classList.remove("active");
            e.classList.remove("border-2");
          });
          btn[i].classList.add("active");
          btn[i].classList.add("border-2");
        };
      }
    },
    CloseAddTest() {
      this.$emit("close");
    },
    async AddData() {
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;
      const timeInput = document.getElementById("Time");

      if (!timeInput) {
        console.error("Time input element not found");
        return;
      }

      const docRef = doc(db, collectionPath, this.Sub);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (!docData.test) {
          docData.test = [];
        }
        const allQuIndex = Object.keys(docData.test).length;
        const allQuCount = Object.keys(
          docData.test[allQuIndex]?.AllQu || {}
        ).length;
        const newData = {
          ...docData.test[allQuIndex]?.AllQu,
          [allQuCount]: {
            qu1: document.getElementById("qu1").value,
            RightAnswer: document.getElementById("RightAnswer").value,
            qu2: document.getElementById("qu2").value,
            WrongeAnswer1: document.getElementById("WrongAnswer1").value,
            WrongeAnswer2: document.getElementById("WrongAnswer2").value,
          },
        };
        docData.test.AllQu.push(newData);
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

      this.CloseAddTest();
      this.GetData();
    },
  },
};
</script>
