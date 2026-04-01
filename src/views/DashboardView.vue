<script setup>
import DynamicIcons from '@/components/DynamicIcons.vue'
import useDashboard from '@/composables/useDashboard'

import { onMounted, ref } from 'vue'

const { dashboardData, fetchDashboardData } = useDashboard()
const hoveredCardId = ref(null)

onMounted(() => {
  fetchDashboardData()
})
</script>
<template>
  <div class="w-full h-full p-8">
    <div class="flex">
      <div
        v-for="card in dashboardData.balanceCards"
        :key="card.id"
        @mouseenter="hoveredCardId = card.id"
        @mouseleave="hoveredCardId = null"
        class="grid grid-cols-[auto_1fr] items-center mx-10 gap-4 w-60 pl-6 pr-10 py-8 rounded-lg bg-[#F8F8F8] hover:bg-[#363A3F] transition-all duration-300"
      >
        <div
          class="p-3 rounded-full transition-colors duration-300"
          :class="hoveredCardId === card.id ? 'bg-[#4E5257]' : 'bg-[#EBE8E8]'"
        >
          <DynamicIcons
            :name="card.meta?.icon || ''"
            :class="
              hoveredCardId === card.id ? 'text-primary-background' : 'text-tertiary-background'
            "
            class="transition-colors duration-300"
          />
        </div>
        <div class="flex flex-col items-center">
          <h1 class="text-[#929EAE] font-kumbhsans transition-colors duration-300">
            {{ card.title }}
          </h1>
          <p
            :class="hoveredCardId === card.id ? 'text-white' : 'text-[#1B212D]'"
            class="font-kumbhsans text-2xl font-bold transition-colors duration-300"
          >
            ${{ card.amount }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
