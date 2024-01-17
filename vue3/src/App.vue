<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css"
      integrity="sha384-nU14brUcp6StFntEOOEBvcJm4huWjB0OcIeQ3fltAfSmuZFrkAif0T+UtNGlKKQv"
      crossorigin="anonymous"
    />
  </head>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      let recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      );
      document.head.appendChild(recaptchaScript);
      let recaptchaScript2 = document.createElement("script");
      recaptchaScript2.setAttribute(
        "src",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      );
      document.head.appendChild(recaptchaScript2);
    });
  },
};
</script>

<style>
@font-face {
  font-family: IranianSans;
  src: url(./assets/fonts/IranianSans.ttf);
}

* {
  font-family: IranianSans;
  direction: rtl;
}
a {
  text-decoration: none;
}
</style>
