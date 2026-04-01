export const transactionRoute = {
  path: 'transactions',
  name: 'Transactions',
  component: () => import('@/views/TransactionView.vue'),
  meta: { icon: 'transaction' },
}
