import { ref, computed } from 'vue'

export const useDashboard = () => {
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch transactions from json-server
  const fetchTransactions = async () => {
    try {
      loading.value = true
      const response = await fetch('http://localhost:3000/transactions')
      transactions.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Calculate balance cards dynamically
  const balanceCards = computed(() => {
    const totalBalance = transactions.value.reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.value
      .filter((t) => t.isWithdrawal || t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const totalSaved = transactions.value
      .filter((t) => !t.isWithdrawal && t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)

    return [
      {
        id: 1,
        title: 'Total Balance',
        amount: totalBalance.toFixed(2),
        currency: 'USD',
        icon: 'wallet',
      },
      {
        id: 2,
        title: 'Total Expenses',
        amount: totalExpenses.toFixed(2),
        currency: 'USD',
        icon: 'expense',
      },
      {
        id: 3,
        title: 'Total Saved',
        amount: totalSaved.toFixed(2),
        currency: 'USD',
        icon: 'save',
      },
    ]
  })

  return {
    transactions,
    balanceCards,
    loading,
    error,
    fetchTransactions,
  }
}
