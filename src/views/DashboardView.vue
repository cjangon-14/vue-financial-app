<script setup>
import DynamicIcons from '@/components/DynamicIcons.vue'
import { useDashboard } from '@/composables/useDashboard'
import { onMounted } from 'vue'

const { dashboardData, loading, fetchDashboardData } = useDashboard()

onMounted(() => {
  fetchDashboardData()
})
</script>
<template>
  <div class="w-full h-full p-8">
    <div class="w-80 h-20">
      <div>
        <DynamicIcons name="wallet-primary" class="text-tertiary-background" />
        <div>
          <h1 class="font-kumbhsans font-semibold text-2xl">Total balance</h1>
          <p class="text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  </div>
</template>
