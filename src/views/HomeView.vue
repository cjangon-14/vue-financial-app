<script setup>
import DashboardNavLinks from '@/components/DashboardNavLinks.vue'
import DynamicIcons from '@/components/DynamicIcons.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  seed: { type: String, default: 'John Doe' },
})

const src = computed(() => {
  const url = new URL('https://api.dicebear.com/9.x/lorelei/svg')
  url.searchParams.set('seed', props.seed)
  url.searchParams.set('size', '128')
  // ... other options
  return url.href
})
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar with Navigation -->
    <dashboard-nav-links />

    <div class="grid grid-rows-[10%_1fr] flex-1">
      <header class="grid grid-cols-[1fr_350px] p-4 items-center border-b mx-6 border-gray-200">
        <div class="bg-red-200">
          <h1 class="font-kumbhsans font-semibold text-2xl">{{ route.name }}</h1>
        </div>
        <div class="bg-blue-200 grid grid-cols-[50px_50px_1fr] items-center gap-4">
          <dynamic-icons name="search" class="shrink-0" />
          <dynamic-icons name="notification" class="shrink-0" />
          <!-- User -->
          <div class="flex gap-5 bg-[#FAFAFA] w-full mr-4 rounded-full items-center px-2 py-2">
            <img :src="src" alt="Avatar" class="w-10 h-10 rounded-full bg-gray-200" />
            <div class="flex flex-col">
              <h2 class="font-kumbhsans font-semibold text-sm">John Doe</h2>
              <p class="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </header>
      <!-- Main Content -->
      <main class="ml-64 pt-16">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
