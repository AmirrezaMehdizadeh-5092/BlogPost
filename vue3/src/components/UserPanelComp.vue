<template>
    <div id="user">
        <nav class="navbar navbar-expand-lg py-3 bg-primary-subtle">
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
                      <router-link class="nav-link active" aria-current="page" to="/about">درباره ما</router-link>
                  </li>
                  <li class="nav-item px-3">
                      <router-link class="nav-link active" aria-current="page" to="/login">ورود / ثبت نام</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    </div>
</template>

<script>
export default {
  name
}
</script>