<template>
  <div class="AboutCollege">
    <div class="container">
      <div class="main_title"><h1>the last test عشان انا زهقت</h1></div>
      <div>
        - Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
        aspernatur excepturi quisquam sed. Maiores magni perspiciatis ullam
        veniam optio! Rem.
      </div>
      <div v-for="da in data" :key="da">
        {{ da }}

        <span>
          {{ da.الأسئلة }}
        </span>
        <span> وقت الإمتحان </span>
        <span></span>
        <span></span>
      </div>
      <div
        class="bg-[--main-color] p-2.5 rounded text-white mx-auto text-center my-2.5 cursor-pointer"
      >
        مجالات العمل بعد التخرج
      </div>
    </div>
  </div>
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

export default {
  name: "AboutCollege",
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.getdata();
    }, 1000);
  },
  methods: {
    async getdata() {
      const querySnapshot = await getDocs(collection(db, "كلية"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // if (doc.id === "كلية  عربي  فرقة أولي  قضايا") {
        this.data.push(doc.data());
        // }
      });
    },
  },
};
</script>
