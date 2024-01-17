<template>
  <div id="logreg">
    <HeaderComp></HeaderComp>
    <div v-if="formLogin" class="formLogin">
      <h1 class="text-center mb-5">ورود</h1>
      <div class="w-100 mb-3">
        <label for="formGroupExampleInput" class="mb-2">نام کاربری</label>
        <input type="text" class="form-control" id="formGroupExampleInput" />
      </div>
      <div class="w-100 mb-5">
        <label for="formGroupExampleInput" class="mb-2">پسورد</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
        />
      </div>
      <div class="w-100 mb-5">
        <button type="button" class="w-100 btn btn-primary">ورود</button>
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
        <input type="text" class="form-control" id="formGroupExampleInput" />
      </div>
      <div class="w-100 mb-3">
        <label for="formGroupExampleInput" class="mb-2">پسورد</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
        />
      </div>
      <div class="w-100 mb-5">
        <label for="formGroupExampleInput" class="mb-2">تایید پسورد</label>
        <input
          type="password"
          class="form-control"
          id="formGroupExampleInput"
        />
      </div>
      <div class="w-100 mb-5">
        <button type="button" class="w-100 btn btn-primary">ثبت نام</button>
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
  </div>
</template>

<script>
import { ref } from "vue";
import HeaderComp from "./HeaderComp.vue";

export default {
  name: "LogRegComp",
  components: { HeaderComp },
  setup() {
    const formLogin = ref(true);
    const formRegister = ref(false);
    return {
      formLogin,
      formRegister,
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
