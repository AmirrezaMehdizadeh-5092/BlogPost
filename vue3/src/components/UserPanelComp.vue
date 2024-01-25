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
        <span @click="Logout()" style="cursor: pointer" class="text-primary ml-4">خروج</span>
      </div>
    </nav>
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
    <div v-if="show_edit" class="show_edit">
      <div class="add_article_form mx-auto mt-10">
        <div class="list-group">
          <div
            v-for="article in articles"
            class="list-group-item list-group-item-action flex-column align-items-start mb-4 active"
          >
            <div
              class=" d-flex w-100 justify-content-between align-items-center flex-row flex-wrap"
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
              <button @click="Edit(article)" class="btn btn-light ">
                ویرایش
              </button>
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
    <v-row justify="center">
      <v-dialog v-model="edit" width="800">
        <v-card>
          <v-card-title class="mt-2">
            <span class="text-h5">{{ show_obj.subject }}</span>
          </v-card-title>
          <v-card-text>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="mb-2">توضیحات</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                v-model="edit_description"
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
                v-model="edit_text"
              ></textarea>
            </div>
            <button
            @click="edit_article(show_obj)"
            type="button"
            class="w-25 mt-3 btn btn-primary"
          >
            ثبت
          </button>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="edit = false"
            >
              بستن
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    const articles = ref("");
    const snackbar = ref(false);
    const snackbar2 = ref(false);
    const msg = ref("");
    const user = ref("");
    const add_article = ref(false);
    const show_edit = ref(true);
    const subject = ref("");
    const description = ref("");
    const text = ref("");
    const explain = ref(false);
    const show_obj = ref("");
    const edit = ref(false);
    const edit_description = ref("");
    const edit_text = ref("");

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

    const Del_article = (index) => {
      let art_id = index.art_id;
      axios.post(store.api + "/del_article", { art_id }).then((response) => {
        snackbar2.value = true;
        msg.value = response.data;
      });
    };

    const show = (index) => {
      explain.value = true;
      show_obj.value = index;
    };

    const Edit = (index) => {
      edit.value = true;
      show_obj.value = index;
    }

    const edit_article = (index) => {
      if (edit_description.value && edit_text.value)
      {
        let obj = {
          art_id : index.art_id,
          new_description : edit_description.value,
          new_text : edit_text.value
        }
        axios.post(store.api + '/edit_article', obj).then((response)=>{
          if (response.data == "success")
          {
            alert("ویرایش مقاله با موفقیت انجام شد");
            window.location.reload()
          }
          else 
          {
            alert("خطایی رخ داد. لطفا دوباره امتحان کنید");
            window.location.reload()
          }
        })
      }
      else 
      {
        alert("لطفا برای ویرایش اطلاعات را وارد کنید")
      }
    }

    const Logout = ()=>{
      cookie.set("token" , '');
      window.location.reload();
    }

    onMounted(() => {
      let token = cookie.get("token");
      if (!token) 
      {
        router.push("/login");
      } 
      else 
      {
        axios.post(store.api + "/token", { token }).then((response) => {
          user.value = response.data;
          var userid = response.data;
          axios.post(store.api + "/articles", { userid }).then((response) => {
            articles.value = response.data;
          });
        }).catch((error) => {
          
            window.location.href = "/login";
          
        });
      }
    });

    return {
      articles,
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
      Del_article,
      explain,
      show_obj,
      show,
      edit,
      Logout,
      Edit,
      edit_description,
      edit_text,
      edit_article
    };
  },
};
</script>

<style>
.add_article_form {
  width: 50%;
}
@media (min-width: 320px) and (max-width: 480px) {
  .add_article_form {
    width: 75%;
  }
}
@media (min-width: 481px) and (max-width: 991px) {
  .add_article_form {
    width: 60%;
  }
}
</style>
