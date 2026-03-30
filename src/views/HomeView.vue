<script setup>
const sidebarNavItems = [
  { name: 'Home', path: '/', meta: { icon: 'home' } },
  { name: 'Transactions', path: '/transactions', meta: { icon: 'transactions' } },
  { name: 'Invoices', path: '/invoices', meta: { icon: 'invoices' } },
  { name: 'My Wallets', path: '/wallets', meta: { icon: 'wallet' } },
  { name: 'Settings', path: '/settings', meta: { icon: 'settings' } },
]
</script>

<template>
  <main class="flex">
    <!-- Sidebar -->
    <div class="w-[15%] min-h-screen bg-gray-200 p-4">
      <h2>Logo</h2>
      <div class="mt-4">
        <ul class="flex flex-col gap-4">
          <li
            v-for="item in sidebarNavItems"
            :key="item.path"
            class="bg-primary-background p-4 rounded-lg text-primary-text font-semibold font-kumbhsans"
          >
            <router-link :to="item.path">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1">
      <h2>Main Content</h2>
      <p>This is the main content area.</p>
    </div>
  </main>
</template>

<style scoped></style>
