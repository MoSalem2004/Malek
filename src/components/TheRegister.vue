<template>
  <div
    class="main_Overlay"
    @click="close_2"
    style="z-index: 101; pointer-events: none"
  ></div>
  <div
    class="container bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-h-90 overflow-auto"
    style="z-index: 101"
  >
    <section>
      <div class="header flex justify-between items-center">
        <h3>حساب جديد</h3>
        <font-awesome-icon :icon="['fas', 'xmark']" @click="close_2" />
      </div>

      <v-sheet width="300" class="mx-auto">
        <v-form fast-fail @submit.prevent>
          <font-awesome-icon :icon="['fas', 'xmark']" />
          <v-text-field
            v-model="Name1"
            label="الإسم الأول"
            :rules="firstNameRules1"
          ></v-text-field>
          <v-text-field
            v-model="Name2"
            label="الإسم الثاني"
            :rules="firstNameRules2"
          ></v-text-field>
          <v-text-field
            v-model="Name3"
            label="الإسم الثالث"
            :rules="firstNameRules3"
          ></v-text-field>

          <v-text-field
            v-model="phone"
            label="رقم الهاتف"
            :rules="lastNameRules"
          ></v-text-field>

          <v-select label="حدد مكان كليتك / معهدك" :items="items"></v-select>
          <v-text-field
            v-model="email"
            label="الإيميل"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="كلمة المرور"
            :rules="passRules"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2">تم</v-btn>
        </v-form>
      </v-sheet>
    </section>
  </div>
  <div id="user"></div>
</template>
<script>
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  where,
  query,
  updateDoc,
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
import bcrypt from "bcryptjs";
export default {
  name: "TheRegister",
  selectedValue: "",
  emits: ["close_2"],
  mounted() {
    // this.select();
  },
  data() {
    return {
      user: {
        Name_1: "",
        Name_2: "",
        Name_3: "",
        email: "",
        phone: "",
        parents_phone: "",
        password_1: "",
        password_2: "",
      },
      ErrorMsg: "",
      errorEmailMsg: "",
      errorEmailMsg_stat: null,
      items: [
        "كلية الشريعة و القانون - عربي - القاهرة - بنين",
        "كلية الشريعة و القانون - English - القاهرة - بنين",
        "كلية الشريعة و القانون - عربي - طنطا - بنين",
        "كلية الشريعة و القانون - English - طنطا - بنين",
        "كلية الشريعة و القانون - عربي - تفهنا الأشراف - بنين",
        "كلية الشريعة و القانون - English - تفهنا الأشراف - بنين",
        "كلية الشريعة و القانون - عربي - دمنهور - بنين",
        "كلية الشريعة و القانون - English - دمنهور - بنين",
        "كلية الشريعة و القانون - عربي - أسيوط - بنين",
        "كلية الشريعة و القانون - English - أسيوط - بنين",
        "كلية الشريعة و القانون - عربي - القاهرة - بنات",
        "كلية الشريعة و القانون - English - القاهرة - بنات",
        "كلية الشريعة و القانون - عربي - الإسكندرية - بنات",
        "كلية الشريعة و القانون - English - الإسكندرية - بنات",
        "كلية الشريعة و القانون - عربي - دمنهور - بنات",
        "كلية الشريعة و القانون - English - دمنهور - بنات",
        "كلية الشريعة و القانون - عربي - الفيوم - بنات",
        "كلية الشريعة و القانون - English - الفيوم - بنات",
        "كلية الشريعة و القانون - عربي - المنيا - بنات",
        "كلية الشريعة و القانون - English - المنيا - بنات",
        "كلية الشريعة و القانون - عربي - المنصورة - بنات",
        "كلية الشريعة و القانون - English - المنصورة - بنات",
        "كلية الشريعة و القانون - عربي - أسيوط - بنات",
        "كلية الشريعة و القانون - English - أسيوط - بنات",
        "معهد أعوان القضاء - عربي - القاهرة - بنين",
        "معهد أعوان القضاء - عربي - طنطا - بنين",
        "معهد أعوان القضاء - عربي - تفهنا الأشراف - بنين",
        "معهد أعوان القضاء - عربي - دمنهور - بنين",
        "معهد أعوان القضاء - عربي - أسيوط - بنين",
        "معهد أعوان القضاء - عربي - القاهرة - بنات",
      ],
      closeHelloUser: null,
      PhoneState: null,
      showPassword_1: false,
      showPassword_2: false,
      type: "",
      lang: "",
      class: "",
      classes: [
        "الفرقة الأولي",
        "الفرقة الثانية",
        "الفرقة الثالثة",
        "الفرقة الرابعة",
      ],
      value: false,
      Name1: "",
      Name2: "",
      Name3: "",
      email: "",
      Data: [],
      ShowAddAdmin: null,
      firstNameRules1: [
        (value) => {
          if (value?.length > 1) return true;

          return "يجب كتابة الإسم";
        },
      ],
      firstNameRules2: [
        (value) => {
          if (value?.length > 1) return true;

          return "يجب كتابة الإسم";
        },
      ],
      firstNameRules3: [
        (value) => {
          if (value?.length > 1) return true;

          return "يجب كتابة الإسم";
        },
      ],
      phone: "",
      lastNameRules: [
        (value) => {
          if (value.length === 11) return true;

          return "يجب إدخال رقم صالح";
        },
      ],
      password: "",
      passRules: [
        (value) => {
          if (value?.length > 6) return true;

          return "يجب ان لا كلمة المرور عن 6 احرف";
        },
      ],
      emailRules: [
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;

          return "البريد الإلكتروني غير صحيح";
        },
      ],
    };
  },
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  methods: {
    async State() {
      try {
        const q_Admin = query(
          collection(db, "المشرفين"),
          where("Id", "==", localStorage.getItem("userid"))
        );
        const querySnapshot_Admin = await getDocs(q_Admin);
        if (!querySnapshot_Admin.empty) {
          this.$store.commit("setUserAdmin", "Admin");
        } else {
          this.$store.commit("setUserAdmin", "");
        }
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
        } else {
          this.$store.commit("setUserAdmin", "");
        }
      } catch (error) {
        error;
      }
    },
    close_2() {
      this.$emit("close_2");
    },
    close() {
      this.closeHelloUser = !this.closeHelloUser;
    },
    handleSelectChange(event) {
      this.selectedValue = event.target.value;
    },
    async Register() {
      const arabicRegex = /[\u0600-\u06FF\s]+/;
      let en;
      let pass;
      let email;
      let phone;
      let Samephone;
      let AllData;
      let SameData;
      let SameData1;
      const q = query(
        collection(db, "الطلاب"),
        where("phone", "==", this.user.phone)
      );
      const q1 = query(
        collection(db, "الطلاب"),
        where("email", "==", this.user.email)
      );
      const querySnapshot = await getDocs(q);
      const querySnapshot1 = await getDocs(q1);
      if (!querySnapshot.empty) {
        SameData = false;
        this.ErrorMsg = "رقم الهاتف  مسجل بالفعل علي الموقع";
      } else {
        SameData = true;
      }
      if (!querySnapshot1.empty) {
        SameData1 = false;
        this.ErrorMsg = "الإيميل مسجل بالفعل علي الموقع";
      } else {
        SameData1 = true;
      }

      if (this.user.password_1 !== this.user.password_2) {
        pass = false;
        this.ErrorMsg = "يرجى التأكد من كتابة تأكيد كلمة السر بنجاح";
      } else {
        pass = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        email = false;
        this.ErrorMsg = "البريد الإلكتروني غير صالح";
      } else {
        email = true;
      }
      if (this.user.phone === this.user.parents_phone) {
        Samephone = false;
        this.ErrorMsg = "لا يجوز ان يتشابه رقم ولي الأمر مع رقم الطالب";
      } else {
        Samephone = true;
      }
      const egyptianPhoneNumberRegex = /^(10|11|12|15)[0-9]{8}$/;
      if (!egyptianPhoneNumberRegex.test(+`0${+this.user.phone}`)) {
        phone = false;
        this.ErrorMsg =
          "رقم الهاتف المدخل غير صحيح , ملحوظة :   يمكنك إدخال رقمك المصري فقط";
      } else {
        phone = true;
      }
      if (
        !arabicRegex.test(this.user.Name_1) ||
        !arabicRegex.test(this.user.Name_2) ||
        !arabicRegex.test(this.user.Name_3)
      ) {
        en = false;
        this.ErrorMsg = "يرجي كتابة الإسم باللغة العربية";
      } else {
        en = true;
      }
      if (
        this.user.Name_1 === "" ||
        this.user.Name_2 === "" ||
        this.user.Name_3 === "" ||
        this.user.email === "" ||
        this.user.phone === "" ||
        this.user.college_place === "" ||
        this.user.password_1 === "" ||
        this.user.password_2 === "" ||
        document.querySelector(".form-floating>.form-select").value === "" ||
        this.value === false
      ) {
        AllData = false;
        this.ErrorMsg = "يرجي إكمال كافة البينات";
      } else {
        AllData = true;
      }
      if (
        en === true &&
        pass === true &&
        email === true &&
        phone === true &&
        Samephone === true &&
        AllData === true &&
        SameData === true &&
        SameData1 === true
      ) {
        this.ErrorMsg = "";

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(this.user.password_1, salt);
        let pass = hashedPassword;
        const str = document.querySelector(".form-floating>.form-select").value;
        const wordsArray = str.split(" "); // تحويل السلسلة إلى مصفوفة من الكلمات
        const lastWord = wordsArray[wordsArray.length - 1]; // الحصول على آخر كلمة في المصفوفة
        const docRef = await addDoc(collection(db, "الطلاب"), {
          name_1: this.user.Name_1,
          name_2: this.user.Name_2,
          name_3: this.user.Name_3,
          email: this.user.email,
          phone: this.user.phone,
          parents_phone: this.user.parents_phone,
          college_place: document.querySelector(".form-floating>.form-select")
            .value,
          password: pass,
          resultes: [],
          pay: [],
          type: lastWord,
          Class: this.class,
          TypeOfClass: this.type,
          Lang: this.lang,
          userid: null,
          AllResults: 0,
        });
        await updateDoc(docRef, { userid: docRef.id });
        setTimeout(() => {
          localStorage.setItem("username_1", this.user.Name_1);
          localStorage.setItem("username_2", this.user.Name_2);
          localStorage.setItem("username_3", this.user.Name_3);
          localStorage.setItem("userid", docRef.id);
          this.closeHelloUser = true;
        }, 100);

        this.$emit("close_2");
        setTimeout(() => {
          this.State();
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss">
input {
  &.form-control {
    border-bottom: 1px solid #333 !important;
    border-radius: 0;
  }
}
.container_1 {
  section {
    display: flex;
    .imges {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      img {
        width: 100%;
        z-index: -1;
      }
    }
    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      img {
        width: 100%;
        z-index: -1;
      }
    }
    form {
      font-family: Century Gothic;
      width: 50%;
      h2 {
        margin: 10px auto;
        color: var(--Black-color);

        strong {
          color: var(--main-color);
        }
      }
      p {
        color: var(--Black-color);
      }
      .small_container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;
        & > div {
          position: relative;
          width: 48%;
          &.long {
            width: 100%;
          }
          label {
            svg {
              color: var(--main-color);
            }
          }
          input {
            &.form-control {
              border-bottom: 1px solid #333 !important;
              border-radius: 0;
            }
          }
        }
      }
      .Register_Login {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px auto;
        button {
          min-width: 150px;
          background: var(--main-color);
          border: none;
          min-height: 37px;
          font-weight: 700;
        }
        .social_media {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          p {
            margin: 0;
            color: var(--Black-color);
          }
          .icons_social {
            display: flex;
            gap: 10px;
            align-items: center;
            svg {
              cursor: pointer;
              border-radius: 4px;
              padding: 5px;
              width: 30px;
              height: 30px;
              color: #fff;
              &:first-child {
                background-color: #3b5998;
              }
              &:last-child {
                background-color: rgb(234, 67, 53);
              }
            }
          }
        }
      }
      .TheLogin {
        font-size: 14px;
        margin: 15px auto 0;
      }
    }
  }
}
.Error_Email_Msg {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 12;
  background: var(--main-color);
  min-width: 300px;
  transform: translate(-50%, -50%);
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  color: #fff;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  font-size: 20px;
  div {
    font-weight: bold;
  }
  button {
    border: none;
    border-radius: 6px;
    background: #fff;
    font-size: 18px;
    cursor: pointer;
    padding: 6px 12px;
  }
}
.v-field__append-inner {
  display: none !important;
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .select {
    top: 12px !important;
    left: 26px !important;
  }
  .content > div {
    flex-direction: column;
    & > span {
      width: 100%;
    }
  }
  .selecte_3 > div {
    width: 100%;
    & > span {
      flex-direction: column;
    }
  }
  .TheName {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
}
</style>
