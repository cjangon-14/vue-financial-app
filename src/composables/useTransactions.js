import { ref } from 'vue'

const loading = ref(false)
const transactionData = ref([])

const fetchTransactionData = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3005/transactions')
    transactionData.value = await response.json()
    console.log('fetchTransactionData:', transactionData.value)
  } finally {
    loading.value = false
  }
}

export default function useTransactions() {
  return { loading, transactionData, fetchTransactionData }
}
