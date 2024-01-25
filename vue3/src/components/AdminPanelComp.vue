<template>
  <div id="admin">
    <nav class="navbar navbar-expand-lg py-4 bg-primary-subtle">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul
            class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px"
          >
            <li class="nav-item px-3">
              <span
                style="cursor: pointer"
                class="nav-link active"
                aria-current="page"
                >کاربران</span
              >
            </li>
            <li
              @click="
                add_article = false;
                show_edit = !show_edit;
              "
              class="nav-item px-3"
            >
              <span
                style="cursor: pointer"
                class="nav-link active"
                aria-current="page"
                >مقاله ها</span
              >
            </li>
            <li
              class="nav-item px-3"
              @click="
                show_edit = false;
                add_article = !add_article;
              "
            >
              <span
                style="cursor: pointer"
                class="nav-link active"
                aria-current="page"
                >درج مقاله</span
              >
            </li>
          </ul>
        </div>
        <span
          @click="Logout()"
          style="cursor: pointer"
          class="text-primary ml-4"
          >خروج</span
        >
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import cookie from "js-cookie";
import router from "../plugins/router";

export default {
  name: "AdminPanel",
  setup() {
    const Logout = () => {
      cookie.set("admin", "");
      window.location.reload();
    };

    onMounted(() => {
      let token = cookie.get("admin");
      if (!token) {
        router.push("/adminlogin");
      }
    });

    return{
        Logout
    }
  },
};
</script>
