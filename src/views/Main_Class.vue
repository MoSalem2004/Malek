<template>
  <div class="Main_Class pt-2.5">
    <div class="container">
      <AddSub
        v-if="showAddSub"
        @Close="CloseAndOpenAddSub"
        @GetData="getdata"
      />
      <nav
        aria-label="breadcrumb"
        class="nav_1 flex items-center justify-between"
      >
        <nav aria-label="breadcrumb">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem
              ><router-link to="/">{{ Type }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem
              ><router-link to="/">{{ Lang }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem active>{{ Class }}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </nav>
        <div
          @click="CloseAndOpenAddSub"
          class="flex items-center gap-2.5 p-2.5 bg-[#fff] rounded cursor-pointer"
          v-if="UserAdmin === 'Admin'"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>أضف مادة</span>
        </div>
      </nav>
      <section class="flex justify-between p-2.5 gap-2.5">
        <div class="w-48 p-2.5 text-center cursor-pointer" @click="AllTest">
          شراء اختبارات {{ Class }} كاملة
        </div>
        <div class="w-48 p-2.5 text-center cursor-pointer" @click="AllCourses">
          شراء كورسات {{ Class }} كاملة
        </div>
      </section>
      <div style="min-height: 58vh" class="mt-2.5">
        <div class="text-left my-2.5 p-2.5 text-[--main-color]">
          ({{ AllData.length }}) مادة
        </div>
        <div
          class="body flex gap-2.5 items-center flex-wrap justify-between mt-2.5"
        >
          <img
            src="../assets/animation_loia37xm_small.gif"
            alt=""
            v-if="showDownloadIcon"
            class="m-auto"
          />
          <div
            class="main_box w-48 border-1 p-2.5 rounded relative"
            v-for="(Data, index) in AllData"
            :key="Data"
          >
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="absolute left-[7px] top-[7px] bg-[var(--main-color)] text-white text-xs p-1 rounded-full"
              v-if="UserAdmin === 'Admin'"
            />
            <span
              class="absolute left-[35px] top-[7px] bg-[var(--main-color)] text-white text-xs p-1 rounded-full cursor-pointer hidden"
              @click="Updata"
              v-if="UserAdmin === 'Admin'"
              >حفظ التغييرات</span
            >
            <div class="header flex justify-between p-2.5 items-center mt-2.5">
              <div class="flex gap-2.5 items-center">
                <div
                  class="num bg-[--main-color] text-white w-6 h-6 flex items-center justify-center rounded"
                >
                  {{ index + 1 }}
                </div>
                <div class="title font-bold text-[--main-color] text-xl">
                  {{ Data.sub_name }}
                </div>
              </div>
              <div class="text-[#6e6e6e] text-xs font-bold text-sm">
                {{ Data.Season }}
              </div>
            </div>
            <div class="book flex gap-2.5 relative flex-wrap">
              <a
                :href="Data.BookLink"
                class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0 cursor-pointer w-48 mb-2.5"
              >
                <font-awesome-icon
                  :icon="['fas', 'book']"
                  class="text-[--main-color]"
                />
                <span class="text-[--main-color]">تحميل كتاب المادة</span>
              </a>

              <div class="cursor-pointer w-48 mb-2.5">
                <router-link
                  to="/Main_Testing"
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
                >
                  <font-awesome-icon
                    :icon="['fas', 'clipboard-question']"
                    class="text-[dimgrey]"
                  />
                  <span class="text-[dimgrey]"> الإختبارات </span>
                </router-link>
              </div>
              <input
                type="text"
                placeholder="لينك كتاب المادة"
                class="border p-1 input1 pointer-events-none"
                :value="Data.BookLink"
                v-if="UserAdmin === 'Admin'"
                style="height: 26px; width: 100%"
              />
            </div>
            <div
              class="free_course flex flex-col gap-2.5 my-2.5 mt-3"
              v-if="false"
            >
              <div class="title flex gap-1 items-center">
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  class="text-[--main-color]"
                />

                <div class="text-lg text-[--main-color]">الكورس المجاني</div>
              </div>
              <div class="All_Course flex justify-between">
                <div class="video flex flex-col gap-2.5 w-32 cursor-pointer">
                  <a
                    :href="Data.FreeCourse_Video"
                    class="flex-col border-1 border-[#ff0000] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'youtube']"
                      class="text-[#ff0000] text-2xl"
                    />
                    <span class="text-[#ff0000]">الفيديوهات</span>
                  </a>
                  <input
                    type="text"
                    placeholder="لينك فيديوهات المادة"
                    class="border p-1 input2 pointer-events-none"
                    :value="Data.FreeCourse_Video"
                    v-if="UserAdmin === 'Admin'"
                  />
                </div>
                <div class="pdf1 flex flex-col gap-2.5 w-32 cursor-pointer">
                  <a
                    :href="Data.FreeCourse_Pdf_1"
                    class="flex-col border-1 border-[#857155] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'book-open-reader']"
                      class="text-[#857155] text-2xl"
                    />
                    <span class="text-[#857155]">المذكرات</span>
                  </a>
                  <input
                    type="text"
                    placeholder="لينك مذكرات المادة"
                    class="border p-1 input3 pointer-events-none"
                    :value="Data.FreeCourse_Pdf_1"
                    v-if="UserAdmin === 'Admin'"
                  />
                </div>
                <div class="pdf2 flex flex-col gap-2.5 w-32 cursor-pointer">
                  <a
                    :href="Data.FreeCourse_Pdf_2"
                    class="flex-col border-1 border-[dimgrey] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
                  >
                    <font-awesome-icon
                      :icon="['fas', 'clipboard-question']"
                      class="text-[dimgrey] text-2xl"
                    />
                    <span class="text-[dimgrey]">بنك الأسئلة</span>
                  </a>
                  <input
                    type="text"
                    placeholder="لينك كتاب المادة"
                    class="border p-1 input4 pointer-events-none"
                    :value="Data.FreeCourse_Pdf_2"
                    v-if="UserAdmin === 'Admin'"
                  />
                </div>
              </div>
            </div>
            <div class="Cash_course flex flex-col gap-2.5 my-2.5" v-if="false">
              <div class="title flex gap-1 items-center">
                <font-awesome-icon
                  :icon="['fas', 'coins']"
                  class="text-[gold]"
                />

                <div class="text-lg text-[--main-color]">الكورس المدفوع</div>
              </div>
              <div class="All_Course flex justify-between">
                <div
                  class="video p-2.5 box border-1 border-[#ff0000] flex flex-col items-center justify-center gap-2.5 p-2.5 rounded w-32"
                >
                  <div class="flex flex-col">
                    <font-awesome-icon
                      :icon="['fab', 'youtube']"
                      class="text-[#ff0000] text-2xl"
                    />
                    <div
                      class="title text-xl BillName text-base text-[#ff0000] mt-2.5"
                    >
                      الفيديوهات
                    </div>
                    <div
                      class="price text-sm text-center flex gap-1.5 font-bold text-lg items-center"
                    >
                      <input
                        type="number"
                        class="w-10 p-1 rounded input5 pointer-events-none text-center ml-1"
                        v-if="UserAdmin === 'Admin'"
                        :value="Data.CachCourse_Video"
                      />
                      <span v-else>{{ Data.CachCourse_Video }}</span>
                      <span>جنية</span>
                    </div>
                  </div>
                  <div
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay w-100 text-left mt-2 text-center"
                  >
                    شراء
                  </div>
                </div>
                <div
                  class="pdf1 p-2.5 box border-1 border-[#857155] flex flex-col items-center justify-center gap-2.5 p-2.5 rounded w-32"
                >
                  <div class="flex flex-col">
                    <font-awesome-icon
                      :icon="['fas', 'book-open-reader']"
                      class="text-[#857155] text-2xl"
                    />
                    <div
                      class="title text-xl BillName text-base text-[#857155] mt-2.5"
                    >
                      المذكرات
                    </div>
                    <div
                      class="price text-sm text-center flex gap-1.5 font-bold text-lg items-center"
                    >
                      <input
                        type="number"
                        class="w-10 p-1 rounded input6 pointer-events-none text-center ml-1"
                        v-if="UserAdmin === 'Admin'"
                        :value="Data.CachCourse_PdfPrice_1"
                      />
                      <span v-else>{{ Data.CachCourse_PdfPrice_1 }}</span>
                      <span>جنية </span>
                    </div>
                  </div>
                  <div
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay w-100 text-left mt-2 text-center"
                  >
                    شراء
                  </div>
                </div>
                <div
                  class="pdf2 p-2.5 box border-1 border-[dimgrey] flex flex-col items-center justify-center gap-2.5 p-2.5 rounded w-32"
                >
                  <div class="flex flex-col">
                    <font-awesome-icon
                      :icon="['fas', 'clipboard-question']"
                      class="text-[dimgrey] text-2xl"
                    />
                    <div
                      class="title text-xl BillName text-base text-[dimgrey] mt-2.5"
                    >
                      بنك الأسئلة
                    </div>
                    <div
                      class="price text-sm text-center flex gap-1.5 font-bold text-lg items-center"
                    >
                      <input
                        type="number"
                        class="w-10 p-1 rounded input7 pointer-events-none text-center ml-1"
                        v-if="UserAdmin === 'Admin'"
                        :value="Data.CachCourse_PdfPrice_2"
                      />
                      <span v-else>{{ Data.CachCourse_PdfPrice_2 }}</span>
                      <span>جنية </span>
                    </div>
                  </div>
                  <div
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay w-100 text-left mt-2 text-center"
                  >
                    شراء
                  </div>
                </div>
              </div>
              <div
                class="AllCourse p-2.5 box border-1 border-[--main-color] flex flex-col gap-2.5 p-2.5 rounded"
              >
                <div class="flex-col">
                  <div class="title text-xl BillName">الكورس كامل</div>
                </div>
                <div class="price text-sm text-left flex flex-col gap-2.5">
                  <div class="line-through flex justify-end">
                    <span class="ml-1">{{
                      +Data.CachCourse_Video +
                        +Data.CachCourse_PdfPrice_1 +
                        +Data.CachCourse_PdfPrice_2 || 0
                    }}</span>
                    <span>جنية مصري</span>
                  </div>
                  <div class="flex gap-1.5 justify-end">
                    <input
                      type="number"
                      class="w-10 p-1 rounded input8 pointer-events-none text-center ml-1"
                      v-if="UserAdmin === 'Admin'"
                      :value="Data.AllCourse"
                    />

                    <span v-else>{{ Data.AllCourse }}</span>
                    <span>جنية مصري</span>
                  </div>
                </div>
                <div class="w-100 flex justify-between items-center mt-2">
                  <div class="flex items-center gap-2.5">
                    <img
                      src="../assets/free-discount-icon-9685-thumb.png"
                      style="width: 40px"
                    />
                    <span> خصم 10% في حالة شراء الكورس كاملا </span>
                  </div>
                  <span
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay"
                    >شراء</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_Overlay" v-if="Close"></div>
      <div
        class="popup rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto h-1/2 z-20 w-1/2"
        v-if="Close"
        style="height: 387px"
      >
        <div class="header flex justify-between items-center p-2.5">
          <div class="flex items-center gap-2.5">
            <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" />
            <span>فاتورة</span>
          </div>
          <font-awesome-icon :icon="['fas', 'xmark']" @click="Close = false" />
        </div>
        <div class="body">
          <div class="flex items-center justify-center">
            <div class="w-24 text-center table_1">الدراسة</div>

            <strong class="table_2">{{ BillType }}</strong>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-24 text-center table_1">القسم</div>
            <strong class="table_2">{{ BillLang }}</strong>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-24 text-center table_1">الفرقة</div>
            <strong class="table_2">{{ BillClass }}</strong>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-24 text-center table_1">الصنف</div>

            <strong class="table_2">{{ BillName }}</strong>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-24 text-center table_1">السعر</div>

            <strong class="table_2 flex gap-2.5"
              >{{ BillPrice || 0 }} <span>جنية مصري</span></strong
            >
          </div>
          <div class="flex items-center justify-center">
            <div class="w-24 text-center table_1">المادة</div>

            <strong class="table_2">{{ SubName }}</strong>
          </div>
          <table>
            <tbody>
              <tr>
                <td>الدراسة</td>
                <td>{{ BillType }}</td>
              </tr>
              <tr>
                <td>القسم</td>
                <td>{{ BillLang }}</td>
              </tr>
              <tr>
                <td>الفرقة</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </table>
        </div>
        <div class="footer flex justify-between">
          <div
            class="pay bg-[--main-color] p-2.5 cursor-pointer text-white text-center mt-2.5 w-48"
            @click="pay1"
          >
            <font-awesome-icon :icon="['fas', 'credit-card']" />
            <span> أدفع بالكارت </span>
          </div>
          <div
            class="pay bg-[--main-color] p-2.5 cursor-pointer text-white text-center mt-2.5 w-48"
            @click="pay_1"
          >
            <font-awesome-icon :icon="['fas', 'money-bill']" />
            <span> أدفع بفودافون كاش </span>
          </div>
        </div>
      </div>
    </div>
    <div @click="ThePay">ThePay</div>
  </div>
</template>

<script>
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-vue-ui-kit";
import { ref } from "vue";
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  getDoc,
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
import AddSub from "../components/Add_Sub.vue";
export default {
  name: "Main_Class",
  emits: ["getData"],
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  data() {
    return {
      AllData: [],
      showAddSub: null,
      Ids: [],
      MainId: "",
      showDownloadIcon: null,
      Type: "",
      Lang: "",
      Class: "",
      Edit1: "",
      Admin: true,
      num: "",
      CachCourse_Video: 0,
      CachCourse_PdfPrice_1: 0,
      CachCourse_PdfPrice_2: 0,
      AllCourse: "",
      Close: false,
      BillVedio: "",
      BillName: "",
      BillPrice: "",
      BillType: "",
      BillClass: "",
      BillLang: "",
      SubName: "",
      FullName: `
       ${localStorage.getItem("username_1")} ${localStorage.getItem(
        "username_2"
      )} ${localStorage.getItem("username_3")}
       
       `,
      // UserAdmin: "Admin",
    };
  },
  props: ["Main_Id"],
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddSub,
  },
  mounted() {
    setTimeout(() => {
      this.getvalues();
    }, 10);
    setTimeout(() => {
      this.getdata();
    }, 100);
  },
  methods: {
    AllTest() {
      this.SubName = `جميع اختبارات ${this.Class}`;
      this.BillPrice = 100;
      this.BillName = "جميع الإختبارات";
      this.BillType = localStorage.getItem("updateType");
      this.BillLang = localStorage.getItem("updateLang");
      this.BillClass = localStorage.getItem("updateClass");
      this.Close = true;
    },
    AllCourses() {
      this.SubName = `جميع مواد ${this.Class}`;
      this.BillPrice = 1500;
      this.BillName = "جميع المواد";
      this.BillType = localStorage.getItem("updateType");
      this.BillLang = localStorage.getItem("updateLang");
      this.BillClass = localStorage.getItem("updateClass");
      this.Close = true;
    },
    CloseFunction() {
      setTimeout(() => {
        let boxes = document.querySelectorAll(".main_box .Cash_course");
        let title = document.querySelectorAll(".main_box > .header .title ");

        for (let i = 0; i < boxes.length; i++) {
          boxes[i].querySelectorAll(".main_box .pay")[0].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].CachCourse_Video;
            this.BillName = "الفيديوهات";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
          boxes[i].querySelectorAll(".main_box .pay")[1].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].CachCourse_PdfPrice_1;
            this.BillName = "المذكرات";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
          boxes[i].querySelectorAll(".main_box .pay")[2].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].CachCourse_PdfPrice_2;
            this.BillName = "بنك الأسئلة";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
          boxes[i].querySelectorAll(".main_box .pay")[3].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].AllCourse;
            this.BillName = "الكورس كامل";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
        }
      }, 1000);
    },

    async pay_1() {
      const API =
        "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRd056UXdMQ0p1WVcxbElqb2lNVGN3TVRVeE56Z3dNUzQwTkRBek9USWlmUS5yTXlWZEl0RzUwRGJWb0R0aXlWSGFNaDBmWXVxV2R3TG4xUjVvV3ZGUXZDTTcwUzBrZ3EzTU9JY2t6dVJsVFVxVWVTbVBETXJLNXVKaTVfN0MwZWlKZw==";
      let Data = {
        api_key: API,
      };
      let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });

      let response = await request.json();

      if (response && response.token) {
        let token = response.token;
        this.pay_2(token);
      }
      let token = response.token;
      this.pay_2(token);
    },
    async pay_2(token) {
      let Data = {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: `${this.BillPrice}00`,
        currency: "EGP",
        merchant_order_id:
          Date.now() + Math.floor(Math.random() * 100000000000) + 10000000000,
        integration_id: 4352564,
        lock_order_when_paid: "false",
        order_description: "Product description goes here", // وصف المنتج - قم بتحديثه
        order_items: [],
        items: [],
      };
      let request = await fetch(
        "https://accept.paymob.com/api/ecommerce/orders",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        }
      );
      let response = await request.json();
      let id = response.id;
      this.pay_3(token, id);
    },

    async pay_3(token, id) {
      let userid = localStorage.getItem("userid");
      const documentRef = doc(db, "الطلاب", userid);
      const documentSnapshot = await getDoc(documentRef);
      const fieldName = "pay";
      const currentFieldValue = documentSnapshot.data()[fieldName];
      let Data = {
        auth_token: token,
        amount_cents: `${this.BillPrice}00`,
        expiration: 3600,
        order_id: id,
        currency: "EGP",
        integration_id: 4399813,
        lock_order_when_paid: "false",
        order_description: "Product description goes here", // وصف المنتج - قم بتحديثه
        order_items: [],
        billing_data: {
          apartment: "803",
          email: documentSnapshot.data().email,
          floor: "42",
          first_name: this.FullName,
          street: "Ethan Land",
          building: "8028",
          phone_number: documentSnapshot.data().phone,
          shipping_method: "PKG",
          postal_code: "01898",
          city: "Jaskolskiburgh",
          country: "CR",
          last_name: "Nicolas",
          state: "Utah",
        },
      };
      let request = await fetch(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        }
      );

      let response = await request.json();

      // تحقق مما إذا كانت الاستجابة تحتوي على الـ token
      let TheToken = response.token;

      let newObject = {
        BillName: this.BillName,
        BillType: this.BillType,
        BillLang: this.BillLang,
        BillClass: this.BillClass,
        BillPrice: `${this.BillPrice}00`,
        BillItem: this.SubName,
        Time: new Date(),
        order_id: id,
        success: null,
      };
      // إضافة الكائن الجديد إلى القيمة الحالية للحقل
      currentFieldValue.push(newObject);

      // تحديث المستند بالقيمة الجديدة
      await updateDoc(documentRef, {
        [fieldName]: currentFieldValue,
      });
      this.CardPayment_1(TheToken);
    },
    CardPayment_1(token) {
      let iframURL = `https://accept.paymob.com/api/acceptance/iframes/806158?payment_token=${token}`;
      location.href = iframURL;
    },
    async pay1() {
      const API =
        "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRd056UXdMQ0p1WVcxbElqb2lNVGN3TVRVeE56Z3dNUzQwTkRBek9USWlmUS5yTXlWZEl0RzUwRGJWb0R0aXlWSGFNaDBmWXVxV2R3TG4xUjVvV3ZGUXZDTTcwUzBrZ3EzTU9JY2t6dVJsVFVxVWVTbVBETXJLNXVKaTVfN0MwZWlKZw==";
      let Data = {
        api_key: API,
      };
      let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });

      let response = await request.json();

      if (response && response.token) {
        let token = response.token;
        this.pay2(token);
      }
      let token = response.token;
      this.pay2(token);
    },
    async pay2(token) {
      let Data = {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: `${this.BillPrice}00`,
        currency: "EGP",
        merchant_order_id:
          Date.now() + Math.floor(Math.random() * 100000000000) + 10000000000,
        integration_id: 4352564,
        lock_order_when_paid: "false",
        order_description: "Product description goes here", // وصف المنتج - قم بتحديثه
        order_items: [],
        items: [],
      };
      let request = await fetch(
        "https://accept.paymob.com/api/ecommerce/orders",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        }
      );
      let response = await request.json();
      let id = response.id;
      this.pay3(token, id);
    },

    async pay3(token, id) {
      let userid = localStorage.getItem("userid");
      const documentRef = doc(db, "الطلاب", userid);
      const documentSnapshot = await getDoc(documentRef);
      const fieldName = "pay";
      const currentFieldValue = documentSnapshot.data()[fieldName];
      let Data = {
        auth_token: token,
        amount_cents: `${this.BillPrice}00`,
        expiration: 3600,
        order_id: id,
        currency: "EGP",
        integration_id: 4352564,
        lock_order_when_paid: "false",
        order_description: "Product description goes here", // وصف المنتج - قم بتحديثه
        order_items: [],
        billing_data: {
          apartment: "803",
          email: documentSnapshot.data().email,
          floor: "42",
          first_name: this.FullName,
          street: "Ethan Land",
          building: "8028",
          phone_number: documentSnapshot.data().phone,
          shipping_method: "PKG",
          postal_code: "01898",
          city: "Jaskolskiburgh",
          country: "CR",
          last_name: "Nicolas",
          state: "Utah",
        },
      };
      let request = await fetch(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        }
      );

      let response = await request.json();

      // تحقق مما إذا كانت الاستجابة تحتوي على الـ token
      let TheToken = response.token;

      let newObject = {
        BillName: this.BillName,
        BillType: this.BillType,
        BillLang: this.BillLang,
        BillClass: this.BillClass,
        BillPrice: `${this.BillPrice}00`,
        BillItem: this.SubName,
        Time: new Date(),
        order_id: id,
        success: null,
      };
      // إضافة الكائن الجديد إلى القيمة الحالية للحقل
      currentFieldValue.push(newObject);

      // تحديث المستند بالقيمة الجديدة
      await updateDoc(documentRef, {
        [fieldName]: currentFieldValue,
      });
      this.CardPayment(TheToken);
    },
    CardPayment(token) {
      let iframURL = `https://accept.paymob.com/api/acceptance/iframes/802769?payment_token=${token}`;
      location.href = iframURL;
    },

    async Updata() {
      let input1 = document.querySelectorAll(".main_box  input.input1");
      let input2 = document.querySelectorAll(".main_box  input.input2");
      let input3 = document.querySelectorAll(".main_box  input.input3");
      let input4 = document.querySelectorAll(".main_box  input.input4");
      let input5 = document.querySelectorAll(".main_box  input.input5");
      let input6 = document.querySelectorAll(".main_box  input.input6");
      let input7 = document.querySelectorAll(".main_box  input.input7");
      let input8 = document.querySelectorAll(".main_box  input.input8");
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const washingtonRef = doc(
        db,
        `كورسات - ${firstWord} - ${localStorage.getItem(
          "updateLang"
        )} - ${localStorage.getItem("updateClass")}`,
        this.Ids[this.num]
      );
      await updateDoc(washingtonRef, {
        BookLink: input1[this.num].value,
        FreeCourse_Video: input2[this.num].value,
        FreeCourse_Pdf_1: input3[this.num].value,
        FreeCourse_Pdf_2: input4[this.num].value,
        CachCourse_Video: input5[this.num].value,
        CachCourse_PdfPrice_1: input6[this.num].value,
        CachCourse_PdfPrice_2: input7[this.num].value,
        AllCourse: input8[this.num].value,
      });
      this.getdata();
    },
    EditFunction() {
      let box = document.querySelectorAll(".main_box");
      let svg = document.querySelectorAll(".main_box > svg");
      let span = document.querySelectorAll(".main_box > span");
      let inputs = document.querySelectorAll(".main_box  input");
      for (let i = 0; i < svg.length; i++) {
        svg[i].onclick = async () => {
          this.num = i;
          box.forEach((e) => {
            e.classList.remove("border-[--main-color]");
          });
          span.forEach((e) => {
            e.classList.add("hidden");
          });
          span[i].classList.remove("hidden");
          inputs.forEach((e) => {
            e.classList.add("pointer-events-none");
          });
          box[i].classList.add("border-[--main-color]");
          box[i].querySelectorAll("input").forEach((e) => {
            e.classList.remove("pointer-events-none");
          });
        };
      }
    },
    getvalues() {
      this.Type = localStorage.getItem("updateType");
      this.Lang = localStorage.getItem("updateLang");
      this.Class = localStorage.getItem("updateClass");
    },
    AddSubToStore() {
      let link = document.querySelectorAll(".main_box .book a:last-child");
      let Sub_Name = this.AllData;
      for (let i = 0; i < link.length; i++) {
        link[i].onclick = () => {
          localStorage.setItem("updateSub", Sub_Name[i].sub_name);
        };
      }
    },

    CloseAndOpenAddSub() {
      this.showAddSub = !this.showAddSub;
    },
    CloseAndOpenEditSub() {
      this.ShowEdit = !this.ShowEdit;
    },
    async getdata() {
      this.showDownloadIcon = true;
      this.AllData = [];
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const querySnapshot = await getDocs(
        collection(
          db,
          `كورسات - ${firstWord} - ${localStorage.getItem(
            "updateLang"
          )} - ${localStorage.getItem("updateClass")}`
        )
      );
      querySnapshot.forEach((doc) => {
        this.AllData.push(doc.data());
        this.Ids.push(doc.id);
      });
      this.showDownloadIcon = false;
      setTimeout(() => {
        this.EditFunction();
        this.AddSubToStore();
        this.CloseFunction();
      }, 1000);
    },
  },
  setup() {
    const activeItem = ref("collapseOne");
    return {
      activeItem,
    };
  },
};
</script>
<style lang="scss" scoped>
section {
  div {
    border: 1px solid var(--main-color);
    background: #fff;
    border-radius: 5px;
    font-size: 21px;
    color: var(--main-color);
    transition: 0.3s;
    &:hover {
      background: var(--main-color);
      color: #fff;
    }
  }
}
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
