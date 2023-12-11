<template>
  <div
    class="TheLanding p-2.5"
    style="margin: 0; min-height: 122vh; padding-bottom: 50px"
  >
    <div class="container relative" style="margin-top: 140px">
      <div class="flex justify-end w-100 absolute bottom-14 left-0">
        <img
          src="../assets/Animation - 1701642743520.gif"
          alt=""
          width="50px"
          class="law"
          style="z-index: 0"
        />
      </div>
      <div class="flex justify-center items-center h-80 contain">
        <div class="right w-1/2 relative">
          <img src="../assets/الإمام-بدون-خلفية2.webp" alt="" class="m-auto" />
          <div class="absolute -bottom-2.5">
            <img
              src="../assets/Animation - 1701644199286.gif"
              alt=""
              width="50px"
              class="law"
              style="z-index: 0"
            />
          </div>
        </div>
        <div class="left w-1/2 flex flex-col justify-center gap-2.5">
          <h2 class="title" style="font-size: 35px">د /</h2>
          <h1 class="title_2" style="font-size: 46px">محمد الإمام</h1>
          <div class="title_3">
            منصة الإمام منصة متخصصة في تدريس المواد القانونية
          </div>
          <div style="z-index: 1; width: fit-content">
            <v-dialog v-model="dialog">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="button_2 p-0">
                  <font-awesome-icon :icon="['fas', 'scale-balanced']" />
                  <span>مجالات العمل بعد التخرج</span>
                </div>
              </template>
              <v-card>
                <div
                  class="flex justify-between items-center p-2.5"
                  style="
                    display: flex;
                    align-items: center;
                    padding: 18px 24px;
                    gap: 10px;
                  "
                >
                  <v-card-title>
                    <div class="title_1_1 flex items-center gap-2.5">
                      <font-awesome-icon :icon="['fas', 'scale-balanced']" />
                      <span>مجالات العمل بعد التخرج </span>
                    </div>
                  </v-card-title>

                  <font-awesome-icon
                    @click="dialog = false"
                    class="text-2xl text-[--main-color]"
                    :icon="['fas', 'xmark']"
                  />
                </div>
                <v-card-text>
                  <div class="text-ringth text-[--main-color] mb-2.5 font-bold">
                    ({{ data_1.length }}) مجال
                  </div>
                  <div v-for="(data, index) in data_1" :key="data" class="feat">
                    <span>{{ index + 1 }}</span>
                    <div>{{ data }}</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
          <div style="z-index: 1; width: fit-content">
            <v-dialog v-model="dialog2">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="button_2 p-0">
                  <font-awesome-icon :icon="['fas', 'circle-question']" />
                  <span>لماذا تختار كلية الشريعة و القانون</span>
                </div>
              </template>
              <v-card>
                <div
                  class="flex justify-between items-center p-2.5"
                  style="
                    display: flex;
                    align-items: center;
                    padding: 18px 24px;
                    gap: 10px;
                  "
                >
                  <v-card-title>
                    <div class="title_1_1 flex items-center gap-2.5">
                      <font-awesome-icon :icon="['fas', 'circle-question']" />
                      <span>لماذا تختار كلية الشريعة و القانون</span>
                    </div>
                  </v-card-title>

                  <font-awesome-icon
                    @click="dialog2 = false"
                    class="text-2xl text-[--main-color]"
                    :icon="['fas', 'xmark']"
                  />
                </div>
                <v-card-text>
                  <div
                    style="
                      font-family: system-ui;
                      line-height: 2;
                      background: #fafafa;
                      text-align: center;
                      border-radius: 5px;
                      padding: 10px;
                    "
                  >
                    كلية الشريعة والقانون هي من الكليات ذات الشأن العالى والرفعه
                    في مصر، وهي إحدى أقدم وأعرق كليات جامعة الأزهر وهي كلية خاصة
                    بدراسة العلوم الشرعية (الفقه والفقه المقارن وأصول الفقه)
                    إضافة إلى مواد العلوم القانونية (القانون الجنائي والقانون
                    الدستوري والقانون المدني والقانون الدولي... إلخ)والتي تماثل
                    تلك المواد التي يتم تدريسها في كليات الحقوق مما أكسب هذه
                    الكلية ميزةَ الجمع بين العلوم الدينية " المتمثلة في المواد
                    الشرعية. والعلوم الدنيوية " المتمثله في المواد القانونية.
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheLanding",
  data() {
    return {
      dialog: false,
      dialog2: false,
      data_1: [
        "معيدا بكليه (يعني دكتور جامعي )",
        "الهيئات القضائية",
        "مجلس الدوله",
        "النيابه العامه",
        "النيابه الاداريه",
        "هيئه قضايا الدوله",
        "الالتحاق بكليه الشرطه(ضباط متخصصين )",
        "الكليه الحربيه النيابه العسكريه",
        "مأذون شرعي",
        "وزاره الخارجيه (سفير )",
        "وزاره التموين والتجارة الداخلية",
        "الرقابه الإدارية",
        "الجهاز المركزي للمحاسبات",
        "مصلحة الضرائب",
        "الشئون القانونية",
        "المحاماه",
        "وظائف اخري بقطاعات العامه والخاصه",
        "وزارة الأوقاف",
        "وزير",
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.TheLanding {
  background-image: url("../assets/WhatsApp Image 2023-12-04 at 11.00.58 PM.jpeg");
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
}
.icon {
  bottom: 403px;
  left: 140px;
}
img {
  width: 400px;
  border-radius: 5px;
}
.law {
  width: 75px;
  filter: grayscale(1);
}
.title_1_1 {
  color: var(--main-color) !important;
  font-weight: bold;
  font-size: 20px;
}
.feat {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  margin-bottom: 10px;
  font-size: 14px;
  span {
    width: 30px;
    background: var(--main-color);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 5px;
  }
}
.left {
  font-family: system-ui;
  h1 {
    font-weight: bold;
  }
  h2,
  .title_3 {
    color: #ef4444;
    font-weight: bold;
  }
  .title_3 {
    font-size: 23px;
  }
  .title_2 {
    color: var(--main-color);
  }
  .button_1,
  .button_2 {
    padding: 10px !important;
    width: fit-content;
    border: 1px solid var(--main-color) !important;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px !important;
    font-weight: bold;
    color: var(--main-color) !important;
    cursor: pointer;
    transition: 0.3s;
    svg {
      font-size: 19px;
    }
    &:hover {
      background: var(--main-color) !important;
      color: #fff !important;
    }
  }
}
.v-card .v-card-title {
  padding: 0 !important;
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .contain {
    flex-direction: column;
    gap: 10px;
    > div {
      width: 100%;
    }
  }
  img.m-auto {
    // width: 145px;
  }
  .icon {
    bottom: 378px;
    left: 268px;
  }
  .container {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
}
</style>
