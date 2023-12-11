<template>
  <div class="TheNews">
    <div class="container">
      <div class="main_title">أحدث الأخبار</div>
      <div class="box flex gap-2.5">
        <v-card class="mx-auto" width="344" v-for="news in News" :key="news">
          <v-img
            src="https://scontent.fcai2-2.fna.fbcdn.net/v/t39.30808-6/370163562_754495903355628_2280858242050324458_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c42490&_nc_ohc=XUzbX9sJTeYAX9U5qBo&_nc_ht=scontent.fcai2-2.fna&oh=00_AfBqiM78QQNBqFTmKvtEB8apP7fpSRuU78lOpPnRS32Y9Q&oe=6572AAC7"
            height="200px"
            cover
          ></v-img>

          <v-card-title>Event لإستقبال الطلبة الجدد </v-card-title>

          <v-card-subtitle> الخميس، 30 نوفمبر 2023، 01:48 ص</v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" variant="text">
              <font-awesome-icon :icon="['fas', 'share-nodes']" />
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="show = !show"
              ><font-awesome-icon :icon="['fas', 'caret-down']"
            /></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheNews",
  data: () => ({
    show: false,
    News: 3,
  }),
};
</script>
<style lang="scss" scoped>
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .box {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
}
</style>
