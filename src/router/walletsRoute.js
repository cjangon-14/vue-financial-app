export const walletsRoute = {
  path: 'wallets',
  name: 'Wallets',
  component: () => import('@/views/WalletsView.vue'),
  meta: { icon: 'wallets' },
}
