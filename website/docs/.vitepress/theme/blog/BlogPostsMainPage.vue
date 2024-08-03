<script setup lang="ts">
import BlogPosts from './BlogPosts.vue'
</script>

<template>
  <section class="blog-posts-main-page">
    <div class="blog-posts-main-page-container">
      <h2 class="blog-posts-main-page-title">Latest updates</h2>
      <BlogPosts />
    </div>
  </section>
</template>

<style>
.blog-posts-main-page {
  position: relative;
  margin-top: 48px;
}
h2.blog-posts-main-page-title.blog-posts-main-page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}
.blog-posts-main-page .VPFeatures {
  padding: 0px;
}

.box > .VPImage {
  width: 100%;
}

@media (min-width: 640px) {
  .blog-posts-main-page-title {
    font-size: 32px;
  }
}


.blog-posts-main-page-container {
  margin: 0 auto;
  max-width: 1152px;
}

.blog-posts-main-page-title {
  margin-top: 70px;
  margin-bottom: 20px;
}
</style>