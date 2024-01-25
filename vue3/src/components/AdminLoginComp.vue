<template>
  <div id="adminlogin">
    <div class="formLogin">
      <h1 class="text-center mb-5">ورود</h1>
      <div class="w-100 mb-3">
        <label for="formGroupExampleInput" class="mb-2">نام کاربری</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="formGroupExampleInput"
        />
      </div>
      <div class="w-100 mb-5">
        <label for="formGroupExampleInput" class="mb-2">پسورد</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
          v-model="password"
        />
      </div>
      <div class="w-100 mb-5">
        <button @click="Login()" type="button" class="w-100 btn btn-primary">
          ورود
        </button>
      </div>
    </div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar3">
        {{ text }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="Login_finish()">
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import cookie from "js-cookie";
import { useStore } from "../plugins/pinia";
import router from "../plugins/router";

export default {
  name: "AdminLogin",
  created() {
    document.title = "ورود ادمین";
  },
  setup() {
    const store = useStore();
    const username = ref("");
    const password = ref("");
    const snackbar = ref(false);
    const snackbar3 = ref(false);
    const text = ref("");

    const Login = () => {
      if (username.value && password.value) {
        let obj = {
          username: username.value,
          password: password.value,
        };
        axios.post(store.api + "/admin_login", obj).then((response) => {
          console.log(response.data);
          if (response.data.check == "ok") {
            snackbar3.value = true;
            text.value = "ورود انجام شد";
            cookie.set("admin", response.data.token);
          }
          if (response.data == "notFound") {
            snackbar.value = true;
            text.value = "کاربر مورد نظر پیدا نشد";
          }
          if (response.data == "password") {
            snackbar.value = true;
            text.value = "پسورد شما اشتباه است";
          }
        });
      } else {
        snackbar.value = true;
        text.value = "لطفا تمام قیلدها را پر کنید";
      }
    };

    const Login_finish = () => {
      snackbar3.value = false;
      router.push("/admin");
    };

    return {
      username,
      password,
      Login,
      snackbar,
      text,
      snackbar3,
      Login_finish,
    };
  },
};
</script>

<style>
.formLogin,
formRegister {
  width: 25%;
  margin: 50px auto;
}
@media (min-width: 320px) and (max-width: 480px) {
  .formLogin,
  formRegister {
    width: 75%;
  }
}
@media (min-width: 481px) and (max-width: 991px) {
  .formLogin,
  formRegister {
    width: 50%;
  }
}
</style>
