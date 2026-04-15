<script setup>
import { useRouter } from 'vue-router'
import DynamicIcons from './DynamicIcons.vue'

const router = useRouter()

const myroutes = router.getRoutes().find((route) => route.name === 'HomeLayout').children
</script>

<template>
  <div class="w-[15%] min-h-screen bg-gray-200 p-4">
    <!-- Logo Section -->
    <div class="flex items-center justify-center w-full">
      <div
        class="w-full bg-linear-to-br from-[#C1FF00] to-[#A8DD00] rounded-lg p-4 flex items-center justify-center shadow-md"
      >
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-[#1B212D] rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-[#C1FF00]" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>
          <div>
            <h1 class="font-bold text-xl text-[#1B212D] leading-tight">Logo.</h1>
            <p class="text-xs text-[#1B212D] opacity-75">Finance</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <aside class="shrink-0 z-50 bg-transparent transition-all duration-300">
        <div class="">
          <!-- Navigation -->
          <div class="flex flex-col gap-4">
            <nav class="flex flex-col gap-2">
              <router-link
                v-for="route in myroutes"
                :key="route.path"
                :to="route.path"
                v-slot="{ isActive }"
              >
                <div
                  class="grid grid-cols-[30px_1fr] transition-all duration-300 p-4 rounded-lg font-kumbhsans text-gray-400"
                  :class="
                    isActive ? 'bg-primary-background text-primary-text ' : 'hover:bg-[#d7e4aa]'
                  "
                >
                  <DynamicIcons :name="route.meta.icon" class="shrink-0" />
                  <span class="text-sm" :class="isActive ? 'font-bold' : 'font-medium'">
                    {{ route.name }}
                  </span>
                </div>
              </router-link>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Pacifico:regular);
.logo {
  font-family: Pacifico;
}
</style>
