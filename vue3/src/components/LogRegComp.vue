<template>
  <div id="logreg">
    <HeaderComp></HeaderComp>
    <div v-if="formLogin" class="formLogin">
      <h1 class="text-center mb-5">ورود</h1>
      <div class="w-100 mb-3">
        <label for="formGroupExampleInput" class="mb-2">نام کاربری</label>
        <input
          v-model="L_username"
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
          v-model="L_password"
        />
      </div>
      <div class="w-100 mb-5">
        <button @click="Login()" type="button" class="w-100 btn btn-primary">
          ورود
        </button>
      </div>
      <div class="w-100 mb-3 d-flex justify-content-center align-items-center">
        <span
          @click="
            formLogin = false;
            formRegister = true;
          "
          class="fs-6 text-primary"
          style="cursor: pointer"
          >حسابی ندارید؟</span
        >
      </div>
    </div>
    <div v-if="formRegister" class="formLogin">
      <h1 class="text-center mb-5">ثبت نام</h1>
      <div class="w-100 mb-3">
        <label for="formGroupExampleInput" class="mb-2">نام کاربری</label>
        <input
          v-model="R_username"
          type="text"
          class="form-control"
          id="formGroupExampleInput"
        />
      </div>
      <div class="w-100 mb-3">
        <label for="formGroupExampleInput" class="mb-2">پسورد</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
          v-model="R_password"
        />
      </div>
      <div class="w-100 mb-5">
        <label for="formGroupExampleInput" class="mb-2">تایید پسورد</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
          v-model="R_Cpasword"
        />
      </div>
      <div class="w-100 mb-5">
        <button @click="Register()" type="button" class="w-100 btn btn-primary">
          ثبت نام
        </button>
      </div>
      <div class="w-100 mb-3 d-flex justify-content-center align-items-center">
        <span
          @click="
            formRegister = false;
            formLogin = true;
          "
          class="fs-6 text-primary"
          style="cursor: pointer"
          >ورود به حساب</span
        >
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
      <v-snackbar v-model="snackbar2">
        {{ text }}
        <template v-slot:actions>
          <v-btn
            color="pink"
            variant="text"
            @click="
              snackbar2 = false;
              formRegister = false;
              formLogin = true;
            "
          >
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HeaderComp from "./HeaderComp.vue";
import { useStore } from "../plugins/pinia";
import axios from "axios";

export default {
  name: "LogRegComp",
  components: { HeaderComp },
  created() {
    document.title = "ورود / ثبت نام";
  },
  setup() {
    const store = useStore();
    const formLogin = ref(true);
    const formRegister = ref(false);

    const text = ref("");
    const snackbar = ref(false);
    const snackbar2 = ref(false);
    const R_username = ref("");
    const R_password = ref("");
    const R_Cpasword = ref("");

    const L_username = ref("");
    const L_password = ref("");

    const Register = () => {
      if (R_username.value && R_password.value && R_Cpasword.value) {
        if (R_password.value.length >= 4) {
          if (R_password.value == R_Cpasword.value) {
            let obj = {
              username: R_username.value,
              password: R_password.value,
              Cpassword: R_Cpasword.value,
            };
            axios.post(store.api + "/register", obj).then((response) => {
              if (response.status == 200) {
                snackbar2.value = true;
                text.value = response.data;
              } else if (response.data == "existing") {
                snackbar.value = true;
                return (text.value = response.data);
              }
            });
          } else {
            snackbar.value = true;
            text.value = "پسوردها یکسان نیستند";
          }
        } else {
          snackbar.value = true;
          text.value = "طول پسورد باید بیشتر از 4 کاراکتر باشد";
        }
      } else {
        snackbar.value = true;
        text.value = "لطفا تمام قیلدها را پر کنید";
      }
    };

    const Login = () => {
      if (L_username.value && L_password.value) {
        let obj = {
          username: L_username.value,
          password: L_password.value,
        };
        axios.post(store.api + "/login", obj).then((response) => {
          if (response.status == 200) {
            snackbar2.value = true;
            text.value = response.data;
          } else if (response.data == "existing") {
            snackbar.value = true;
            return (text.value = response.data);
          }
        });
      } else {
        snackbar.value = true;
        text.value = "لطفا تمام قیلدها را پر کنید";
      }
    };

    return {
      snackbar2,
      formLogin,
      formRegister,
      Register,
      text,
      snackbar,
      R_username,
      R_password,
      R_Cpasword,
      L_username,
      L_password,
      Login,
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
