<template>
    <HeaderComp></HeaderComp>
    <div class="show_edit">
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
                <button @click="show(article)" class="btn btn-light ">
                  مشاهده
                </button>
              </div>
              <div class="w-100 my-4">
                <span class="fs-6" style="color: yellow;">نویسنده: {{article.user_id}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import {onMounted ,  ref } from "vue";
import axios from "axios";
import HeaderComp from "./HeaderComp.vue";
import { useStore } from "../plugins/pinia";

export default {
    name: "HomeComp",
    created() {
        document.title = "وبلاگ"
    },
    components: { HeaderComp },
    setup()
    {
        const store = useStore();
        const articles = ref('');
        onMounted(() => {
            axios.get(store.api + '/get_article').then((response) => {
                articles.value = response.data
            });
        })
        return{
            articles
        }
    }
}
</script>