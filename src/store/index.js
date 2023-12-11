import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      UserAdmin: "", // حالة لتخزين الاسم
    };
  },
  mutations: {
    setUserAdmin(state, UserAdmin) {
      state.UserAdmin = UserAdmin; // تعيين الاسم
    },
  },
});
