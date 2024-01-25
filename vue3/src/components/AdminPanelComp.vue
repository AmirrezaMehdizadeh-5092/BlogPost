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
            <li
              @click="
                show_article = false;
                add_article = false;
                add_user = false;
                show_user = !show_user;
              "
              class="nav-item px-3"
            >
              <span
                style="cursor: pointer"
                class="nav-link active"
                aria-current="page"
                >کاربران</span
              >
            </li>
            <li
              @click="
                show_article = false;
                add_article = false;
                show_user = false;
                add_user = !add_user;
              "
              class="nav-item px-3"
            >
              <span
                style="cursor: pointer"
                class="nav-link active"
                aria-current="page"
                >افزودن کاربر</span
              >
            </li>
            <li
              @click="
                show_user = false;
                add_article = false;
                add_user = false;
                show_article = !show_article;
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
                show_user = false;
                show_article = false;
                add_user = false;
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
    <div v-if="show_user" class="show_user">
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
    <div v-if="show_article" class="show_article">
      <div class="add_article_form mx-auto mt-10">
        <div class="list-group">
          <div
            v-for="article in articles"
            class="list-group-item list-group-item-action flex-column align-items-start mb-4 active"
          >
            <div
              class="d-flex w-100 justify-content-between align-items-center flex-row flex-wrap"
            >
              <h5 class="fs-4">{{ article.subject }}</h5>
              <small>{{
                article.joinDate.substring(0, 16).replace("T", " ")
              }}</small>
            </div>
            <p class="fs-6 mb-2 mt-2">
              {{ article.description }}
            </p>
            <div class="w-100 my-4">
              <button @click="Del_article(article)" class="btn btn-warning">
                حذف
              </button>
              <button @click="show(article)" class="btn btn-light mx-2">
                مشاهده
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="add_article" class="add_article">
      <div class="add_article_form mx-auto mt-10">
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
    <div v-if="add_user" class="add_user">
      <div class="formLogin">
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
        <select
          v-model="select"
          class="mb-5 p-2"
          name=""
          id=""
          style="width: 100%; border: 1px solid black"
        >
          <option v-bind:value="{ id: 'user' }" value="user">کاربر</option>
          <option v-bind:value="{ id: 'admin' }" value="admin">ادمین</option>
        </select>
        <div class="w-100 mb-5">
          <button @click="User()" type="button" class="w-100 btn btn-primary">
            ورود
          </button>
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
    <v-row justify="center">
      <v-dialog v-model="explain" width="800">
        <v-card>
          <v-card-title class="mt-2">
            <span class="text-h5">{{ show_obj.subject }}</span>
          </v-card-title>
          <v-card-text> {{ show_obj.text }} </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="explain = false"
            >
              بستن
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    const show_article = ref(false);
    const add_user = ref(false);
    const useres = ref("");
    const snackbar2 = ref(false);
    const msg = ref("");
    const articles = ref("");
    const explain = ref(false);
    const show_obj = ref("");
    const add_article = ref(false);
    const subject = ref("");
    const description = ref("");
    const text = ref("");
    const snackbar = ref(false);
    const username = ref("");
    const password = ref("");
    const select = ref({ id: "user" });

    const User = () => {
      if (username.value && password.value) {
        if (password.value.length >= 4) {
          let obj = {
            username: username.value,
            password: password.value,
            role: select.value.id,
          };
          axios.post(store.api + "/add_user", obj).then((response) => {
            if (response.status == 200) {
              snackbar2.value = true;
              msg.value = response.data;
            } else if (response.data == "existing") {
              snackbar.value = true;
              return (msg.value = response.data);
            }
          });
        } else {
          snackbar.value = true;
          msg.value = "طول پسورد باید بیشتر از 4 کاراکتر باشد";
        }
      } else {
        snackbar.value = true;
        msg.value = "لطفا تمام قیلدها را پر کنید";
      }
    };

    const Confirm_article = () => {
      if (subject.value && description.value && text.value) {
        let obj = {
          user_id: "admin",
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

    const show = (index) => {
      explain.value = true;
      show_obj.value = index;
    };

    const Del_article = (index) => {
      let art_id = index.art_id;
      axios.post(store.api + "/del_article", { art_id }).then((response) => {
        snackbar2.value = true;
        msg.value = response.data;
      });
    };

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
      axios.get(store.api + "/get_article").then((response) => {
        articles.value = response.data;
      });
    });

    return {
      Logout,
      Del_user,
      show_user,
      useres,
      snackbar,
      snackbar2,
      msg,
      finish_del,
      show_article,
      articles,
      Del_article,
      show,
      explain,
      show_obj,
      add_article,
      subject,
      description,
      text,
      Confirm_article,
      add_user,
      username,
      password,
      select,
      User,
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
