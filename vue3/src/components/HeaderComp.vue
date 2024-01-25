<template>
  <div id="header">
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
              <router-link class="nav-link active" aria-current="page" to="/"
                >خانه</router-link
              >
            </li>
            <li class="nav-item px-3">
              <router-link
                class="nav-link active"
                aria-current="page"
                to="/user"
                >ورود به پنل</router-link
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="جستجو کنید"
              aria-label="Search"
              v-model="search_val"
            />
            <button class="btn btn-outline-primary" @click="search()">
              تایید
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="search_res" class="w-100 mb-5 py-4 mt-0">
      <h2 v-if="negetiveSearch" class="text-center">نتیجه ای یافت نشد</h2>
      <div class="show_edit">
        <div class="add_article_form mx-auto mt-10 mb-5">
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
                <button @click="show(article)" class="btn btn-light">
                  مشاهده
                </button>
              </div>
              <div class="w-100 my-4">
                <span class="fs-6" style="color: yellow"
                  >نویسنده: {{ article.user_id }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "../plugins/pinia";

export default {
  name: "HeaderComp",
  setup() {
    const store = useStore();
    const search_val = ref("");
    const negetiveSearch = ref(false);
    const search_res = ref(false);
    const articles = ref("");

    const search = () => {
      let obj = {
        search_val: search_val.value,
      };
      axios.post(store.api + "/search", obj).then((response) => {
        search_res.value = true;
        console.log(response.data);
        if (response.data.length == 0) {
          negetiveSearch.value = true;
        } else {
          articles.value = response.data;
          negetiveSearch.value = false;
        }
      });
    };

    return {
      search_val,
      search,
      negetiveSearch,
      search_res,
      articles,
    };
  },
};
</script>
