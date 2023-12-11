<template>
  <div id="TheGallary" class="TheGallary">
    <div class="container">
      <div class="main_title">معرض الصور</div>
      <div class="Add_Img">
        <font-awesome-icon
          :icon="['fas', 'times']"
  
        />
          <!-- @click="" -->
      </div>
      <div class="buttons flex items-center gap-2.5 justify-between">
        <div class="flex items-center gap-2.5">
          <div
            class="active bg-[#eee] p-2.5 cursor-pointer text-center text-xl"
          >
            الكل
          </div>
          <div class="bg-[#eee] p-2.5 cursor-pointer text-center text-xl">
            تكريم
          </div>
          <div class="bg-[#eee] p-2.5 cursor-pointer text-center text-xl">
            في الأكاديمية
          </div>
        </div>
        <div
          class="flex items-center gap-2.5 bg-[#eee] p-2.5 cursor-pointer text-center text-xl"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <div>اضف صورة</div>
        </div>
      </div>
      <div class="box flex justify-between gap-2.5 flex-wrap">
        <div
          v-for="(n, index) in img"
          :key="n"
          class="d-flex child-flex relative"
          cols="4"
        >
          <v-img
            :src="n"
            :lazy-src="n"
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2 Main_Img"
            @click="showModal(index)"
            style="
              cursor: zoom-in !important;
              border-radius: 6px;
              z-index: 1;
              transition: 0.3s;
            "
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
        <div class="Modal" v-if="showModalFlag">
          <font-awesome-icon
            :icon="['fas', 'chevron-left']"
            @click="previousImage"
            v-show="this.currentIndex"
            style="
              position: absolute;
              left: 30px;
              font-size: 30px;
              color: var(--main-color);
              cursor: pointer;
              background: #fff;
              width: 25px;
              height: 25px;
              padding: 10px;
              border-radius: 50%;
              opacity: 0.7;
              font-weight: bold;
            "
          />
          <img :src="img[currentIndex]" alt="" />
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            @click="nextImage"
            v-show="this.currentIndex < this.img.length - 1"
            style="
              position: absolute;
              right: 30px;
              font-size: 30px;
              color: var(--main-color);
              cursor: pointer;
              background: #fff;
              width: 25px;
              height: 25px;
              padding: 10px;
              border-radius: 50%;
              opacity: 0.7;
              font-weight: bold;
            "
          />
          <font-awesome-icon
            :icon="['fas', 'times']"
            @click="closeModal"
            style="
              position: absolute;
              top: 20px;
              left: 30px;
              font-size: 30px;
              color: var(--main-color);
              cursor: pointer;
              background: #fff;
              width: 40px;
              height: 40px;
              padding: 10px;
              border-radius: 50%;
              opacity: 0.7;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheGallary",
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "var(--main-color)";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
  data() {
    return {
      imges: 4,
      tab: null,
      value: 1,
      img: [
        "https://scontent.fcai16-1.fna.fbcdn.net/v/t39.30808-6/406489843_792872509517967_1297581263697999196_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=c42490&_nc_ohc=Jpw6LuZ61J0AX-rvDl1&_nc_ht=scontent.fcai16-1.fna&oh=00_AfDwM2SSTTB8qlqd34NqnxOsjIRz0fxCVQnxwXHvVqZwww&oe=657A1838",
        "https://scontent.fcai16-1.fna.fbcdn.net/v/t39.30808-6/406526774_793684099436808_7586636419559248211_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c42490&_nc_ohc=4ighKk_26XsAX8YXDMp&_nc_ht=scontent.fcai16-1.fna&oh=00_AfC6jj8daRBJXu0QbVp9lkhLwZeIogZQ7Kom0HmDaMRDjg&oe=657B6C54",
        "https://scontent.fcai16-1.fna.fbcdn.net/v/t39.30808-6/404331592_784878700317348_1282460817674185613_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c42490&_nc_ohc=sI1X8efE_FsAX-AGJSl&_nc_ht=scontent.fcai16-1.fna&oh=00_AfCrrDw_ojpkg5asqCRpsiAooCWzY0Fvg6d7IZgch94U6g&oe=657AAB3E",
        "https://scontent.fcai16-1.fna.fbcdn.net/v/t39.30808-6/401791080_779827404155811_402491244374509482_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=c42490&_nc_ohc=HZetVBBvb54AX98GjQ6&_nc_ht=scontent.fcai16-1.fna&oh=00_AfBcl5F56BKYmoDT4kc-tA1rNkZL9vPk3J3tQunoTlB4CA&oe=657BFB27",
        "https://scontent.fcai16-1.fna.fbcdn.net/v/t39.30808-6/400102107_775423324596219_7386782142255727679_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c42490&_nc_ohc=EJzJdgKG-DMAX8ZrTlH&_nc_ht=scontent.fcai16-1.fna&oh=00_AfD9SJoRA9vMd1nzDbjZmKUmg_MWB6pUh5dzLEfknkkn5A&oe=657A9104",
      ],
      showModalFlag: false,
      currentIndex: 0,
    };
  },
  methods: {
    showModal(index) {
      this.currentIndex = index;
      this.showModalFlag = true;
    },
    closeModal() {
      this.showModalFlag = false;
    },
    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextImage() {
      if (this.currentIndex < this.img.length - 1) {
        this.currentIndex++;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.buttons {
  display: flex;
  gap: 10px;
  text-align: center;
  margin: -40px auto 40px;
  div {
    // border: 1px solid var(--main-color);
    // cursor: pointer;
    // color: var(--main-color);
    // width: 90px;
    // height: 40px;
    // border-radius: 5px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // font-size: 18px;
    // &.active {
    //   background: var(--main-color);
    //   color: #fff;
    // }
  }
}

.v-Main_Img > img {
  // width: 100%;
  cursor: zoom-in !important;
  border-radius: 6px;
  z-index: 1;
  transition: 0.3s;
  &:hover {
    transform: scale(1.03);
  }
}
.Modal {
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
}
.See_All {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  color: var(--main-color);
  transition: 0.3s;
  &:hover {
    color: #fff;
    background: var(--main-color);
  }
}
.Main_Img:hover {
  transform: scale(1.03);
}
svg {
  transition: 0.3s;
}
svg:hover {
  opacity: 1 !important;
}
@media (min-width: 1200px) {
  .box {
    & > div {
      // width: 24%;
    }
  }
}
@media (min-width: 768px) and (max-width: 1199px) {
  .box {
    & > div:not(:last-child) {
      width: 24%;
    }
  }
}

@media (max-width: 767px) {
  .box {
    flex-wrap: wrap;
    & > div:not(:last-child) {
      width: 48% !important;
    }
  }
}
</style>
