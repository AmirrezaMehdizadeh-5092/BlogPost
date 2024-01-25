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
    <div v-if="show_user" class="show_edit">
      <div class="add_article_form mx-auto mt-10">
        <div class="list-group">
          <div
            v-for="user in useres"
            class="list-group-item list-group-item-action flex-column align-items-start mb-4 active"
          >
            <div
              class="d-flex w-100 justify-content-between align-items-center flex-row flex-wrap"
            >
              <h5 class="fs-4">{{ user.username }}</h5>
              <small>{{
                user.joinDate.substring(0, 16).replace("T", " ")
              }}</small>
            </div>
            <div class="w-100 my-4">
              <button @click="Del_user(user)" class="btn btn-warning">
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar2">
          {{ msg }}
          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="finish_del()">
              بستن
            </v-btn>
          </template>
        </v-snackbar>
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import cookie from "js-cookie";
import router from "../plugins/router";
import { useStore } from "../plugins/pinia";
import axios from "axios";

export default {
  name: "AdminPanel",
  created() {
    document.title = "پنل ادمین";
  },
  setup() {
    const store = useStore();
    const show_user = ref(true);
    const useres = ref("");
    const snackbar2 = ref(false);
    const msg = ref("");

    const Del_user = (index) => {
      let username = index.username;
      axios.post(store.api + "/del_user", { username }).then((response) => {
        snackbar2.value = true;
        msg.value = response.data;
      });
    };

    const finish_del = () => {
      snackbar2.value = false;
      window.location.reload();
    };

    const Logout = () => {
      cookie.set("admin", "");
      window.location.reload();
    };

    onMounted(() => {
      let token = cookie.get("admin");
      if (!token) {
        router.push("/adminlogin");
      }
      axios.get(store.api + "/get_user").then((response) => {
        useres.value = response.data;
      });
    });

    return {
      Logout,
      Del_user,
      show_user,
      useres,
      snackbar2,
      msg,
      finish_del
    };
  },
};
</script>
