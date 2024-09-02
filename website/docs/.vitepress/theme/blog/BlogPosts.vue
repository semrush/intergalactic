<script setup lang="ts">
import usePosts from './useBlogPosts'
import VPFeatures from '../VPFeatures.vue'

const { allPosts: posts } = usePosts()
defineProps<{
  header?: number
}>()

</script>

<template>
  <VPFeatures
    :features="posts.map(post => ({
      icon: { src: `/blog/${post.slug}/hero.png`, width: 400 } as any,
      title: post.title,
      details: post.excerpt + '<br /><br />' + post.date.string,
      link: `/blog/${post.slug}/`,
    }))"
    :header="header"
  />
</template>

<style>
.vp-doc .VPFeatures {
  padding: 24px 0px;
}
</style>