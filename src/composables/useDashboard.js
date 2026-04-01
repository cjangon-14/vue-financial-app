import { ref } from 'vue'

const loading = ref(false)
const dashboardData = ref([])

const fetchDashboardData = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3005/dashboard')
    dashboardData.value = await response.json()
  } finally {
    loading.value = false
  }
}
