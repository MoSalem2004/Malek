<template>
  <div class="mt-2.5 flex flex-wrap justify-between contain">
    <img
      src="../assets/animation_lolk2w1w_small.gif"
      alt=""
      style="width: 100px; margin: auto"
      v-if="ShowImg"
    />
    <div v-if="ShowMyResult" class="Msg">لا توجد فواتير لك</div>

    <div
      class="box w-50 border p-2.5 rounded"
      v-for="(data, index) in AllData"
      :key="data"
    >
      <div class="header">
        <div
          class="number mb-2.5"
          style="
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--main-color);
            color: #fff;
            font-weight: bold;
            border-radius: 5px;
          "
        >
          {{ index + 1 }}
        </div>
        <div class="">
          <div class="box">
            <div class="flex align-items w-100">
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-left: none;
                "
              >
                الدراسة
              </div>
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                {{ data.BillType }}
              </div>
            </div>
            <div class="flex align-items w-100">
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-left: none;
                "
              >
                الفرقة
              </div>
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                {{ data.BillClass }}
              </div>
            </div>
            <div class="flex align-items w-100">
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-left: none;
                "
              >
                الصنف
              </div>
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                {{ data.BillItem }}
              </div>
            </div>
            <div class="flex align-items w-100">
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-left: none;
                "
              >
                السعر
              </div>
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                {{ data.BillPrice / 100 }} ج م
              </div>
            </div>
            <div class="flex align-items w-100">
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-left: none;
                "
              >
                تاريخ الدفع
              </div>
              <div
                style="
                  width: 50%;
                  border: 1px solid var(--main-color);
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                {{
                  new Date(data.Time.toMillis()).toLocaleString(["ar"], {
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
  </div>
</template>
<script>
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
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

export default {
  name: "MyCourse",
  props: ["success"],

  mounted() {
    this.State();
    this.GetData();
  },
  data() {
    return {
      AllData: [],
      ShowMyResult: null,
      ShowImg: true,
    };
  },
  methods: {
    State() {
      // const urlParams = new URLSearchParams(window.location.search);
      // جمع البيانات المطلوبة لحساب الهاش
      // const dataKeys = [
      //   "amount_cents",
      //   "created_at",
      //   "currency",
      //   "error_occured",
      //   "has_parent_transaction",
      //   "obj.id",
      //   "integration_id",
      //   "is_3d_secure",
      //   "is_auth",
      //   "is_capture",
      //   "is_refunded",
      //   "is_standalone_payment",
      //   "is_voided",
      //   "order.id",
      //   "owner",
      //   "pending",
      //   "source_data.pan",
      //   "source_data.sub_type",
      //   "source_data.type",
      //   "success",
      // ];
    },
    async GetData() {
      const q = query(
        collection(db, "الطلاب"),
        where("userid", "==", localStorage.getItem("userid"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const user = doc.data().pay;
        let AllDataArray = [];
        AllDataArray.push(user);
        this.AllData = AllDataArray[0];
        this.AllData.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
        this.ShowImg = false;
      });
      if (this.AllData.length === 0) {
        this.ShowMyResult = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box div {
  font-size: 14px;
  font-weight: bold;
  color: var(--main-color);
  text-align: center;
}
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
      width: 100% !important;
    }
  }
}
</style>
