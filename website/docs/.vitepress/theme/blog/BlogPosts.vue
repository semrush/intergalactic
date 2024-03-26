<script setup lang="ts">
import usePosts from './useBlogPosts'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

const { allPosts: posts } = usePosts()

</script>

<template>
  <VPFeatures
    :features="posts.map(post => ({
      icon: post.image ? { src: `/blog/${post.image}`, width: 400 } : undefined,
      title: post.title,
      details: post.excerpt + ' ' + post.date.string,
      link: `/blog/${post.slug}/`,
    }))"
  />
</template>