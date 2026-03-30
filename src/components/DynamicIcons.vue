<!-- src/components/DynamicIcon.vue -->
<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

// Dynamically import the SVG component using defineAsyncComponent and a computed property
const iconComponent = computed(() => {
  if (!props.name) return null
  // Use a template literal for dynamic imports with a known base directory
  return defineAsyncComponent(() => import(`/src/assets/icons/${props.name}.svg?component`))
})
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" class="fill-current" />
  <span v-else>Icon not found: {{ name }}</span>
</template>
