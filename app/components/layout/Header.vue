<template>
  <UHeader title="Nuxt Skeleton">
    <UNavigationMenu :items="items" />
    <template #toggle="{ open, toggle, ui }">
      <UButton size="sm" variant="ghost" color="neutral" square :class="ui.toggle({ toggleSide: 'right' })"
        @click="toggle">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <motion.line x1="4" y1="6" x2="20" y2="6" :variants="variants" :animate="open ? 'close' : 'normal'"
            :custom="1" class="outline-none" />
          <motion.line x1="4" y1="12" x2="20" y2="12" :variants="variants" :animate="open ? 'close' : 'normal'"
            :custom="2" class="outline-none" />
          <motion.line x1="4" y1="18" x2="20" y2="18" :variants="variants" :animate="open ? 'close' : 'normal'"
            :custom="3" class="outline-none" />
        </svg>
      </UButton>
    </template>
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { motion } from 'motion-v'
import type { VariantType } from 'motion-v'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-box',
    active: route.path.endsWith('/')
  },
  {
    label: 'Blog',
    to: '/blog',
    icon: 'i-lucide-book-open',
    active: route.path.endsWith('/blog')
  },
  {
    label: 'Login',
    to: '/auth/login',
    icon: 'i-lucide-book-open',
    active: route.path.endsWith('/auth/login')
  }])


const variants: { [k: string]: VariantType | ((custom: unknown) => VariantType) } = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1
  },
  close: (custom: unknown) => {
    const c = custom as number
    return {
      rotate: c === 1 ? 45 : c === 3 ? -45 : 0,
      y: c === 1 ? 6 : c === 3 ? -6 : 0,
      opacity: c === 2 ? 0 : 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  }
}
</script>
