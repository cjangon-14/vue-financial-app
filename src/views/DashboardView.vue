<script setup>
import DynamicIcons from '@/components/DynamicIcons.vue'
import useDashboard from '@/composables/useDashboard'
import useTransactions from '@/composables/useTransactions'

import { onMounted, ref } from 'vue'

const { dashboardData, fetchDashboardData } = useDashboard()
const { transactionData, fetchTransactionData } = useTransactions()
const hoveredCardId = ref(null)

onMounted(() => {
  fetchDashboardData()
  fetchTransactionData()
})
</script>
<template>
  <div class="flex flex-col h-full p-8 bg-white gap-8">
    <!-- Main Content -->
    <div class="grid grid-cols-[1fr_360px] gap-8 flex-1">
      <!-- Left Section -->
      <div class="flex flex-col gap-8">
        <!-- Balance Cards -->
        <div class="flex gap-4">
          <div
            v-for="card in dashboardData.balanceCards"
            :key="card.id"
            @mouseenter="hoveredCardId = card.id"
            @mouseleave="hoveredCardId = null"
            class="flex-1 grid grid-cols-[auto_1fr] items-center gap-4 pl-6 pr-10 py-8 rounded-lg bg-[#F8F8F8] hover:bg-[#363A3F] transition-all duration-300 cursor-pointer"
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
                class="transition-colors duration-300 w-6 h-6"
              />
            </div>
            <div class="flex flex-col">
              <p class="text-[#929EAE] text-sm font-medium">{{ card.title }}</p>
              <p
                :class="hoveredCardId === card.id ? 'text-white' : 'text-[#1B212D]'"
                class="font-bold text-2xl transition-colors duration-300"
              >
                ${{ card.amount.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Working Capital Chart -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <div class="flex justify-between items-center gap-6">
              <h3 class="text-xl font-bold text-[#1B212D]">Working Capital</h3>
              <div class="flex items-center gap-4 mt-2">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span class="text-sm text-gray-600">Income</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span class="text-sm text-gray-600">Expenses</span>
                </div>
              </div>
            </div>
            <button class="text-gray-400 hover:text-gray-600 text-sm">Last 7 days</button>
          </div>
          <div
            class="h-64 flex items-center justify-center bg-linear-to-b from-gray-50 to-white rounded"
          >
            <p class="text-gray-400">Chart visualization would go here</p>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 pb-0">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-[#1B212D]">Recent Transaction</h3>
            <router-link
              to="/transactions"
              class="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              View All →
            </router-link>
          </div>
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  NAME/BUSINESS
                </th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">TYPE</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">AMOUNT</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600">DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactionData.slice(0, 3)"
                :key="transaction.id"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-lg bg-linear-to-br from-blue-200 to-blue-300 flex items-center justify-center"
                    >
                      <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-semibold text-[#1B212D]">{{ transaction.name }}</p>
                      <p class="text-sm text-gray-600">{{ transaction.company }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 text-gray-600">
                  {{ transaction.type }}
                </td>
                <td class="py-4 px-4 font-semibold text-[#1B212D]">
                  ${{ transaction.amount.toFixed(2) }}
                </td>
                <td class="py-4 px-4 text-gray-600">
                  {{ transaction.date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="flex flex-col gap-8">
        <!-- Wallet Section -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-[#1B212D]">Wallet</h3>
            <button class="text-gray-400 hover:text-gray-600">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                class="cursor-pointer"
              >
                <g clip-path="url(#clip0_36_667)">
                  <path
                    d="M4.50033 9.16675C3.48741 9.16675 2.66699 9.98716 2.66699 11.0001C2.66699 12.013 3.48741 12.8334 4.50033 12.8334C5.51324 12.8334 6.33366 12.013 6.33366 11.0001C6.33366 9.98716 5.51324 9.16675 4.50033 9.16675ZM17.5003 9.16675C16.4874 9.16675 15.667 9.98716 15.667 11.0001C15.667 12.013 16.4874 12.8334 17.5003 12.8334C18.5132 12.8334 19.3337 12.013 19.3337 11.0001C19.3337 9.98716 18.5132 9.16675 17.5003 9.16675ZM11.0003 9.16675C9.98741 9.16675 9.16699 9.98716 9.16699 11.0001C9.16699 12.013 9.98741 12.8334 11.0003 12.8334C12.0132 12.8334 12.8337 12.013 12.8337 11.0001C12.8337 9.98716 12.0132 9.16675 11.0003 9.16675Z"
                    fill="#currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_36_667">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <div class="space-y-3">
            <!-- Card 1 -->
            <div
              class="bg-linear-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg"
            >
              <div class="flex justify-between items-start mb-12">
                <h4 class="font-semibold">Maglo.</h4>
                <svg class="w-12 h-8 opacity-80" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.2" />
                </svg>
              </div>
              <p class="text-2xl font-bold tracking-widest mb-4">5495 7381 3759 2321</p>
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-xs opacity-75 mb-1">Universal Bank</p>
                  <p class="text-sm">Maglo.</p>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Visa"
                  class="h-6 opacity-80"
                />
              </div>
            </div>
            <!-- Card 2 -->
            <div
              class="bg-linear-to-br from-amber-600 to-red-600 rounded-xl p-6 text-white shadow-lg"
            >
              <div class="flex justify-between items-start mb-12">
                <h4 class="font-semibold">Maglo.</h4>
                <svg class="w-12 h-8 opacity-80" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="currentColor" opacity="0.2" />
                </svg>
              </div>
              <p class="text-2xl font-bold tracking-widest mb-4">8595 2548 ****</p>
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-xs opacity-75 mb-1">Commercial Bank</p>
                  <p class="text-sm">09/25</p>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg"
                  alt="Visa"
                  class="h-6 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Scheduled Transfers -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-[#1B212D]">Scheduled Transfers</h3>
            <router-link
              to="/invoices"
              class="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              View All →
            </router-link>
          </div>
          <div class="space-y-3">
            <div
              v-for="transfer in dashboardData.scheduledTransfers"
              :key="transfer.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div class="flex items-center gap-3 flex-1">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=random&size=40"
                  alt="User"
                  class="w-10 h-10 rounded-full"
                />
                <div class="flex-1">
                  <p class="text-sm font-semibold text-[#1B212D]">{{ transfer.recipientName }}</p>
                  <p class="text-xs text-gray-600">{{ transfer.date }}</p>
                </div>
              </div>
              <p class="text-sm font-bold text-[#1B212D]">- ${{ transfer.amount.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
