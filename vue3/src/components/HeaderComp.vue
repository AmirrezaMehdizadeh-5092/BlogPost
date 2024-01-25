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
              <router-link class="nav-link active" aria-current="page" to="/">خانه</router-link>
            </li>
            <li class="nav-item px-3">
                <router-link class="nav-link active" aria-current="page" to="/user">ورود به پنل</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="جستجو کنید"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
              تایید
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
};
</script>

