<script setup>
import { onMounted, ref, computed } from 'vue'
import useTransactions from '@/composables/useTransactions'

const { transactionData, fetchTransactionData } = useTransactions()
const searchQuery = ref('')

const filteredTransactions = computed(() => {
  if (!searchQuery.value) return transactionData.value
  return transactionData.value.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      transaction.company?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const getCategoryColor = (category) => {
  const colors = {
    technology: 'from-blue-200 to-blue-300',
    entertainment: 'from-red-200 to-red-300',
    software: 'from-purple-200 to-purple-300',
    cryptocurrency: 'from-yellow-200 to-yellow-300',
    withdrawal: 'from-green-200 to-green-300',
    advertising: 'from-pink-200 to-pink-300',
  }
  return colors[category] || 'from-gray-200 to-gray-300'
}

const getCategoryIcon = (category) => {
  const icons = {
    technology: '💻',
    entertainment: '🎬',
    software: '⚙️',
    cryptocurrency: '₿',
    withdrawal: '📤',
    advertising: '📣',
  }
  return icons[category] || '📦'
}

onMounted(() => {
  fetchTransactionData()
})
</script>

<template>
  <div class="w-full h-full p-8 pt-0 bg-white">
    <!-- Search Bar -->
    <div class="mb-8">
      <div class="relative">
        <svg
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search anything on Transactions"
          class="w-1/4 pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-background focus:border-transparent placeholder-gray-400"
        />
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">NAME/BUSINESS</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">TYPE</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">AMOUNT</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">DATE</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">INVOICE ID</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <!-- Name/Business -->
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div
                  :class="`w-10 h-10 rounded-lg bg-linear-to-br ${getCategoryColor(transaction.category)} flex items-center justify-center text-lg`"
                >
                  {{ getCategoryIcon(transaction.category) }}
                </div>
                <div>
                  <p class="font-medium text-[#1B212D]">{{ transaction.name }}</p>
                  <p class="text-sm text-gray-600">{{ transaction.company }}</p>
                </div>
              </div>
            </td>

            <!-- Type -->
            <td class="py-4 px-6">
              <p class="text-gray-600">{{ transaction.type }}</p>
            </td>

            <!-- Amount -->
            <td class="py-4 px-6">
              <p
                :class="transaction.amount < 0 ? 'text-red-600' : 'text-[#1B212D]'"
                class="font-semibold"
              >
                {{ transaction.amount < 0 ? '- ' : '' }}${{
                  Math.abs(transaction.amount).toFixed(2)
                }}
              </p>
            </td>

            <!-- Date -->
            <td class="py-4 px-6">
              <p class="text-[#1B212D] font-medium">{{ transaction.date }}</p>
              <p class="text-xs text-gray-500">{{ transaction.time }}</p>
            </td>

            <!-- Invoice ID -->
            <td class="py-4 px-6">
              <p class="text-gray-600 font-mono text-sm">{{ transaction.invoiceId }}</p>
            </td>

            <!-- Action -->
            <td class="py-4 px-6">
              <button
                class="px-4 py-2 bg-primary-background hover:bg-opacity-90 text-black rounded-lg font-medium text-sm transition-all duration-300"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="filteredTransactions.length === 0"
        class="flex flex-col items-center justify-center py-12"
      >
        <svg
          class="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-gray-500 text-lg">No transactions found</p>
      </div>
    </div>
  </div>
</template>
