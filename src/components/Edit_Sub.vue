<template>
  <img
    src="../assets/animation_loia37xm_small.gif"
    alt=""
    v-if="showDownloadIcon"
    class="m-auto"
  />
  <div class="Edit_Sub">
    <div class="main_Overlay" @click="Close"></div>
    <div
      class="container bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
    >
      <div class="header text-left p-2.5 text-lg">
        <font-awesome-icon :icon="['fas', 'xmark']" @click="Close" />
      </div>
      <div class="body flex flex-wrap justify-between gap-3">
        <div class="form-floating text-end long">
          <input type="text" class="form-control" id="Sub" v-model="sub_name" />
          <label for="Sub">المادة</label>
        </div>
        <div class="form-floating text-end w-48">
          <select @change="SelectFunction" :value="this.Season">
            <option></option>
            <option value="ترم أول">ترم أول</option>
            <option value="ترم ثاني">ترم ثاني</option>
          </select>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Number_of_videos"
            v-model="Number_of_videos"
          />
          <label for="Number_of_videos">عدد الفيديوهات</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Video_price"
            @change="Calc"
            v-model="Video_price"
          />
          <!-- value="0" -->
          <label for="Video_price">سعر الفيديوهات</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Number_of_books"
            v-model="Number_of_books"
          />
          <label for="Number_of_books">عدد الملازم</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Book_price"
            @change="Calc"
            v-model="Book_price"
          />
          <label for="Book_price">سعر الملازم</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Question_bank_price"
            @change="Calc"
            v-model="Question_bank_price"
          />
          <label for="Question_bank_price">سعر بنك الأسئلة</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Price_of_online_tests"
            @change="Calc"
            v-model="Price_of_online_tests"
          />
          <label for="Price_of_online_tests">سعر اختبارات الأونلاين</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control pointer-events-none"
            id="total"
            v-model="Total"
          />
          <label for="total">إجمالي سعر الكورس</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Discount"
            v-model="Discount"
            @change="DiscountFunction"
            minlength="9"
          />
          <label for="Discount"> الخصم من 10% </label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Discount_Total"
            v-model="Discount_Total"
          />
          <label for="Discount_Total"> السعر بعد الخصم </label>
        </div>
      </div>
      <div class="footer text-left mt-5">
        <div
          class="button bg-[--main-color] p-2.5 cursor-pointer text-white text-center"
          @click="SetData"
        >
          تم
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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
  name: "Edit_Sub",
  props: ["Main_Id"],
  emits: ["close"],
  data() {
    return {
      showDownloadIcon: null,
      sub_name: "",
      Total: "",
      Discount_Total: "",
      Discount: "",
      Number_of_videos: "",
      Video_price: "",
      Number_of_books: "",
      Book_price: "",
      Question_bank_price: "",
      Price_of_online_tests: "",
      Season: "",
    };
  },
  mounted() {
    this.getdata();
    setTimeout(() => {
      this.Calc();
    }, 1000);
  },
  methods: {
    SelectFunction(event) {
      console.log(event.target.value);
      this.Season = event.target.value;
    },
    Close() {
      this.$emit("close");
    },
    Calc() {
      this.Total =
        +this.Video_price +
        +this.Book_price +
        +this.Question_bank_price +
        +this.Price_of_online_tests;
    },
    async SetData() {
      await setDoc(
        doc(
          db,
          `${localStorage.getItem("updateType")} - ${localStorage.getItem(
            "updateLang"
          )} - ${localStorage.getItem("updateClass")}`,
          `${this.Main_Id}`
        ),
        {
          sub_name: this.sub_name,
          Number_of_videos: this.Number_of_videos,
          Video_price: this.Video_price,
          Number_of_books: this.Number_of_books,
          Book_price: this.Book_price,
          Question_bank_price: this.Question_bank_price,
          Price_of_online_tests: this.Price_of_online_tests,
          Season: this.Season,
        }
      );
      this.Close();
      this.GetData();
    },
    async getdata() {
      this.showDownloadIcon = true;
      // this.AllData = [];
      console.log(
        `${localStorage.getItem("updateType")} - ${localStorage.getItem(
          "updateLang"
        )} - ${localStorage.getItem("updateClass")}`
      );

      const docRef = doc(
        db,
        `${localStorage.getItem("updateType")} - ${localStorage.getItem(
          "updateLang"
        )} - ${localStorage.getItem("updateClass")}`,
        `${this.Main_Id}`
      );
      try {
        const doc = await getDoc(docRef);
        console.log("Document data:", doc.data());
        this.sub_name = doc.data().sub_name;
        this.Number_of_videos = doc.data().Number_of_videos;
        this.Video_price = doc.data().Video_price;
        this.Number_of_books = doc.data().Number_of_books;
        this.Book_price = doc.data().Book_price;
        this.Question_bank_price = doc.data().Question_bank_price;
        this.Price_of_online_tests = doc.data().Price_of_online_tests;
      } catch (e) {
        console.log("Error getting document:", e);
      }
      this.showDownloadIcon = false;
    },
    GetData() {
      this.$emit("GetData");
    },
  },
};
</script>
