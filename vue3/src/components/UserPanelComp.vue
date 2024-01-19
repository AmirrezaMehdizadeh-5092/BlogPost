<template>
  <div id="user">
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
        <h2 class="text-info">{{ user }}</h2>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul
            class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px"
          >
            <li class="nav-item px-3">
              <router-link class="nav-link active" aria-current="page" to="/"
                >خانه</router-link
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
        <span style="cursor: pointer" class="text-primary ml-4">خروج</span>
      </div>
    </nav>
    <div v-if="add_article" class="add_article">
      <div class="add_article_form w-50 mx-auto mt-10">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="mb-2">موضوع</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            v-model="subject"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="mb-2">توضیحات</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            v-model="description"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label mb-2"
            >متن</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            v-model="text"
          ></textarea>
        </div>
        <button
          @click="Confirm_article()"
          type="button"
          class="w-25 mt-3 btn btn-primary"
        >
          ثبت
        </button>
      </div>
    </div>
    <div v-if="show_edit" class="show_edit">
      <div class="add_article_form w-50 mx-auto mt-10">
        <div class="list-group">
          <div
            class="list-group-item list-group-item-action flex-column align-items-start mb-3 active"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="fs-4 mb-4 mt-2">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p class="fs-6 mb-2">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>
            <div class="w-100 my-4">
              <button class="btn btn-warning">حذف</button>
              <button class="btn btn-light mx-2">ویرایش</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ msg }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar2">
        {{ msg }}
        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="finish_add()">
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import { onMounted, ref } from "vue";
import router from "../plugins/router";
import { useStore } from "../plugins/pinia";
import axios from "axios";

export default {
  name: "UserPanelComp",
  created() {
    document.title = "پنل کاربر";
  },
  setup() {
    const store = useStore();
    const snackbar = ref(false);
    const snackbar2 = ref(false);
    const msg = ref("");
    const user = ref("");
    const add_article = ref(false);
    const show_edit = ref(true);
    const subject = ref("");
    const description = ref("");
    const text = ref("");

    const Confirm_article = () => {
      if (subject.value && description.value && text.value) {
        let obj = {
          user_id: user.value,
          subject: subject.value,
          description: description.value,
          text: text.value,
        };
        axios.post(store.api + "/add_article", obj).then((response) => {
          if (response.data == "success") {
            snackbar2.value = true;
            msg.value = "مقاله با موفقیت ثبت شد";
          } else {
            snackbar.value = true;
            msg.value = "خظایی رخ داد";
          }
        });
      } else {
        snackbar.value = true;
        msg.value = "تمام فیلدهارا پر کنید";
      }
    };

    const finish_add = () => {
      snackbar2.value = false;
      window.location.reload();
    };

    onMounted(() => {
      let token = cookie.get("token");
      if (!token) {
        router.push("/login");
      } else {
        axios.post(store.api + "/token", { token }).then((response) => {
          user.value = response.data;
        });
      }
    });

    return {
      snackbar,
      snackbar2,
      msg,
      user,
      add_article,
      show_edit,
      subject,
      description,
      text,
      Confirm_article,
      finish_add,
    };
  },
};
</script>
