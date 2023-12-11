<template>
  <div class="main_Overlay"></div>
  <v-sheet
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    class="pa-4 text-center mx-auto z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 fixed"
  >
    <font-awesome-icon
      :icon="['fas', 'circle-check']"
      class="text-7xl text-success mb-2.5"
    />

    <h2 class="text-h5 mb-6">أشترك في الإختبارات</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      أشتري الآن
      <a href="#" class="text-decoration-none text-info"
        >View reconciliation report.</a
      >

      <br />

      Otherwise, you're done!
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
        class="text-none"
        color="success"
        rounded
        variant="flat"
        width="90"
        @click="Colse"
      >
        <router-link to="/Main_Class"> شراء </router-link>
      </v-btn>
    </div>
  </v-sheet>
</template>
<script>
export default {
  name: "PayTest",
  emits: ["ColseAndOpen"],
  methods: {
    Colse() {
      this.$emit("ColseAndOpen");
    },
  },
};
</script>
