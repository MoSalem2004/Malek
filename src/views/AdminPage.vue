<template>
  <div class="container AdminPage flex">
    <router-link to="#" class="box border p-2.5 w-24"> إحصائيات </router-link>
    <router-link to="/ManageAdmins" class="box border p-2.5 w-24">
      إدارة المشرفين
    </router-link>
    <router-link to="/TheStudents" class="box border p-2.5 w-24">
      الطلاب
    </router-link>
    <router-link to="#" class="box border p-2.5 w-24">
      أرباح الموقع
    </router-link>
  </div>
</template>
<script>
export default {
  name: "AdminPage",
};
</script>
