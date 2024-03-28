<script setup lang="ts">
import usePosts from './useBlogPosts'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

const { allPosts: posts } = usePosts()

</script>

<template>
  <VPFeatures
    :features="posts.map(post => ({
      icon: { src: `/blog/${post.slug}/hero.png`, width: 400 } as any,
      title: post.title,
      details: post.excerpt + '<br /><br />' + post.date.string,
      link: `/blog/${post.slug}/`,
    }))"
  />
</template>