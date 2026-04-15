import { ref } from 'vue'

const loading = ref(false)
const invoiceData = ref([])

const fetchInvoiceData = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3005/invoices')
    invoiceData.value = await response.json()
    console.log('fetchInvoiceData:', invoiceData.value)
  } finally {
    loading.value = false
  }
}

export default function useInvoices() {
  return { loading, invoiceData, fetchInvoiceData }
}
