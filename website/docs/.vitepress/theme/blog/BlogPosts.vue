<script setup lang="ts">
import usePosts from './useBlogPosts'
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue'
const { allPosts: posts } = usePosts()

</script>

<template>
  <ul v-for="post of posts" style="list-style: none; padding-left: 0;">
    <li>
      <VPFeature :title="post.title" :link="`/blog/${post.slug}/`" :details="post.excerpt + ' (' + post.date.string + ')'"
        :icon="post.image ? { src: `/blog/${post.image}`, width: 400 } : undefined" />
    </li>
  </ul>
</template>