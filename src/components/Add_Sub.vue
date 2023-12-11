<template>
  <div class="Add_Sub">
    <div class="main_Overlay" @click="Close"></div>
    <div
      class="container bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
    >
      <div class="header text-left p-2.5 text-lg">
        <font-awesome-icon :icon="['fas', 'xmark']" @click="Close" />
      </div>
      <div class="body flex flex-wrap justify-between gap-3">
        <div class="form-floating text-end long">
          <input type="text" class="form-control" id="Sub" />
          <label for="Sub">اسم المادة</label>
        </div>
        <div class="term form-floating text-end long flex justify-between">
          <div class="w-48 text-center cursor-pointer border p-2.5">
            ترم أول
          </div>
          <div class="w-48 text-center cursor-pointer border p-2.5">
            ترم ثاني
          </div>
        </div>
      </div>
      <div class="footer text-left mt-5">
        <div
          class="button bg-[--main-color] p-2.5 cursor-pointer text-white text-center"
          @click="Add_Data"
        >
          تم
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { collection, addDoc, getFirestore } from "firebase/firestore";
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
  name: "Add_Sub",
  mounted() {
    this.SelectFunction();
  },
  data() {
    return {
      name: "",
    };
  },

  methods: {
    SelectFunction() {
      let term = document.querySelectorAll(".term > div");
      for (let i = 0; i < term.length; i++) {
        term[i].onclick = () => {
          term.forEach((e) => {
            e.classList.remove("active");
          });
          term[i].classList.add("active");
        };
      }
    },
    async Add_Data() {
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];

      await addDoc(
        collection(
          db,
          `كورسات - ${firstWord} - ${localStorage.getItem(
            "updateLang"
          )} - ${localStorage.getItem("updateClass")}`
        ),
        {
          sub_name: document.getElementById("Sub").value,
          Season: document.querySelector(".term .active").innerHTML,
          BookLink: "",
          FreeCourse_Video: "",
          FreeCourse_Pdf_1: "",
          FreeCourse_Pdf_2: "",
          CachCourse_Video: 0,
          CachCourse_PdfPrice_1: 0,
          CachCourse_PdfPrice_2: 0,
          AllCourse: 0,
        }
      );
      document.getElementById("Sub").value = "";
      let term = document.querySelectorAll(".term > div");
      term.forEach((e) => {
        e.classList.remove("active");
      });
      this.Close();
      this.GetData();
    },
    GetData() {
      this.$emit("GetData");
    },
    Close() {
      this.$emit("close");
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
