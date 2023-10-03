<template>
  <a href="https://developer.semrush.com/" target="_blank">
    <img src="/devportal-logo.svg" width="30" height="30" class="devportal-logo" />
  </a>
  <a .href="homeUrl" class="title intergalactic-logo">
    Intergalactic
  </a>
</template>
<script setup>
const homeUrl = process.env.NODE_ENV === 'development' ? '/' : '/intergalactic/'
</script>