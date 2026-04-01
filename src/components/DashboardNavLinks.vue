<script setup>
import { useRouter } from 'vue-router'
import DynamicIcons from './DynamicIcons.vue'

const router = useRouter()

const myroutes = router.getRoutes().find((route) => route.name === 'HomeLayout').children
</script>

<template>
  <div class="w-[15%] min-h-screen bg-gray-200 p-4">
    <div class="bg-red-200 w-full p-8">
      <h2>Logo</h2>
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
                    isActive
                      ? 'bg-primary-background text-primary-text font-semibold '
                      : 'hover:bg-[#d7e4aa]'
                  "
                >
                  <DynamicIcons :name="route.meta.icon" class="shrink-0" />
                  <span class="text-sm font-medium">{{ route.name }}</span>
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
