<script setup>
import { onMounted, ref, computed } from 'vue'
import useInvoices from '@/composables/useInvoices'

const { invoiceData, fetchInvoiceData } = useInvoices()
const searchQuery = ref('')

const filteredInvoices = computed(() => {
  if (!searchQuery.value) return invoiceData.value
  return invoiceData.value.filter((invoice) =>
    invoice.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
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

const getStatusStyles = (status) => {
  const statusStyles = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    unpaid: 'bg-red-100 text-red-700',
  }
  return statusStyles[status.toLowerCase()] || 'bg-gray-100 text-gray-700 border border-gray-300'
}

const showFilters = ref(false)

const openCreateInvoice = () => {
  // TODO: Implement create invoice modal/form
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

onMounted(() => {
  fetchInvoiceData()
})
</script>

<template>
  <div class="w-full h-full px-8 pb-8 bg-white">
    <!-- Header with Search, Create Invoice, and Filters -->
    <div class="mb-8 flex items-center justify-between gap-4">
      <!-- Search Bar -->
      <div class="relative flex-1">
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
          placeholder="Search invoices"
          class="w-1/4 pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-background focus:border-transparent placeholder-gray-400"
        />
      </div>

      <!-- Create Invoice Button -->
      <button
        @click="openCreateInvoice"
        class="flex items-center gap-2 px-4 py-3 bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-lg transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Create Invoice
      </button>

      <!-- Filters Button -->
      <button
        @click="toggleFilters"
        class="flex items-center gap-2 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L14 6.414V16a1 1 0 01-1.447.894l-4-2a1 1 0 01-.553-.894V6.414L3.293 3.707A1 1 0 013 3z"
            clip-rule="evenodd"
          />
        </svg>
        Filters
      </button>
    </div>

    <!-- Invoices Table -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">NAME/CLIENT</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">DATE</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">ORDERS/TYPE</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">AMOUNT</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">STATUS</th>
            <th class="text-left py-4 px-6 text-sm font-semibold text-gray-600">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="invoice in filteredInvoices"
            :key="invoice.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <!-- Name/Business -->
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div
                  :class="`w-10 h-10 rounded-lg bg-linear-to-br ${getCategoryColor(invoice.category)} flex items-center justify-center text-lg`"
                >
                  {{ getCategoryIcon(invoice.category) }}
                </div>
                <div>
                  <p class="font-medium text-[#1B212D]">{{ invoice.name }}</p>
                </div>
              </div>
            </td>

            <!-- Date -->
            <td class="py-4 px-6">
              <p class="text-[#1B212D] font-medium">{{ invoice.date }}</p>
              <p class="text-xs text-gray-500">{{ invoice.time }}</p>
            </td>

            <!-- Type -->
            <td class="py-4 px-6">
              <p class="text-gray-600">{{ invoice.type }}</p>
            </td>

            <!-- Amount -->
            <td class="py-4 px-6">
              <p
                :class="invoice.amount < 0 ? 'text-red-600' : 'text-[#1B212D]'"
                class="font-semibold"
              >
                {{ invoice.amount < 0 ? '- ' : '' }}${{ Math.abs(invoice.amount).toFixed(2) }}
              </p>
            </td>

            <!-- Status -->
            <td class="py-4 px-6">
              <span
                :class="`px-4 py-2 rounded-lg text-sm font-medium capitalize ${getStatusStyles(invoice.status)}`"
              >
                {{ invoice.status }}
              </span>
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
        v-if="filteredInvoices.length === 0"
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
