<template>
  <div>
    <h1>Pay with Vodafone Cash</h1>
    <button @click="initiatePayment">Pay Now</button>
  </div>
</template>

<script>
export default {
  methods: {
    async initiatePayment() {
      try {
        // استبدل الـ API_KEY بمفتاح Paymob الخاص بك
        const API_KEY =
          "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRd056UXdMQ0p1WVcxbElqb2lNVGN3TVRVeE56Z3dNUzQwTkRBek9USWlmUS5yTXlWZEl0RzUwRGJWb0R0aXlWSGFNaDBmWXVxV2R3TG4xUjVvV3ZGUXZDTTcwUzBrZ3EzTU9JY2t6dVJsVFVxVWVTbVBETXJLNXVKaTVfN0MwZWlKZw==";

        // استبدل الـ ORDER_ID برقم الطلب الفريد الخاص بك
        const ORDER_ID = Math.floor(Math.random() * 1000000) + 1;

        // استيراد مكتبة axios
        const axios = require("axios");

        // استدعاء API للحصول على معرف الدفع
        const response = await axios.post(
          "https://accept.paymob.com/api/acceptance/payment_keys",
          {
            auth_token: API_KEY,
            amount_cents: 1000, // استبدلها بالمبلغ المطلوب بالقروش
            expiration: 3600,
            order_id: ORDER_ID.toString(),
            billing_data: {
              first_name: "John",
              last_name: "Doe",
              email: "john.doe@example.com",
              phone_number: "+201234567890",
              country: "EG",
              city: "Cairo",
              street: "123 Main Street",
            },
            currency: "EGP",
            integration_id: 123,
            lock_order_when_paid: "false",
          }
        );

        // استخدام response.data.token للحصول على رابط الـ iframe
        const iframeLink = `https://accept.paymob.com/api/acceptance/iframes/${response.data.token}`;

        // يمكنك إعادة توجيه المستخدم إلى الـ iframeLink لتنفيذ عملية الدفع
      } catch (error) {
        error;
      }
    },
  },
};
</script>

<style scoped>
/* أضف أي استايلات تحتاجها هنا */
</style>
