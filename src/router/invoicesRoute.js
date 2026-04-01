export const invoicesRoute = {
  path: '/invoices',
  name: 'Invoices',
  component: () => import('@/views/InvoicesView.vue'),
  meta: { icon: 'invoices' },
}
