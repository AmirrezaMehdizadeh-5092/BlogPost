<template>
    <HeaderComp></HeaderComp>
    <h1>amir</h1>
</template>

<script>
import HeaderComp from "./HeaderComp.vue";
export default {
    name: "HomeComp",
    created() {
        document.title = "وبلاگ"
    },
    components: { HeaderComp }
}
</script>