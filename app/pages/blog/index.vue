<template>
  <div>
    <UPageHeader title="Skeleton Blog" />

    <UBlogPosts>
      <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="post" :to="post.id" />
    </UBlogPosts>


    <UEmpty v-show="isEmpty.value" variant="naked" icon="i-lucide-bell" title="No Blog posts"
      description="You're all caught up. New Blog posts will appear here." :actions="[
        {
          icon: 'i-lucide-refresh-cw',
          label: 'Refresh',
          color: 'neutral',
          variant: 'subtle',
        }
      ]" />
  </div>
</template>


<script setup lang="ts">
import type { BlogPostProps } from '@nuxt/ui'

const isEmpty = ref(true)

const posts = ref<BlogPostProps[]>([
  {
    title: 'Nuxt Icon v1',
    description: 'Discover Nuxt Icon v1!',
    image: 'https://nuxt.com/assets/blog/nuxt-icon/cover.png',
    date: '2024-11-25',

  },
  {
    title: 'Nuxt 3.14',
    description: 'Nuxt 3.14 is out!',
    image: 'https://nuxt.com/assets/blog/v3.14.png',
    date: '2024-11-04'
  },
  {
    title: 'Nuxt 3.13',
    description: 'Nuxt 3.13 is out!',
    image: 'https://nuxt.com/assets/blog/v3.13.png',
    date: '2024-08-22'
  }
])

</script>
