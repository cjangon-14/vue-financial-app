import { ref } from 'vue'

const loading = ref(false)
const dashboardData = ref([])

const fetchDashboardData = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3005/dashboard')
    dashboardData.value = await response.json()
    console.log('fetchDashboardData:', dashboardData.value)
  } finally {
    loading.value = false
  }
}

export default function useDashboard() {
  return { loading, dashboardData, fetchDashboardData }
}
