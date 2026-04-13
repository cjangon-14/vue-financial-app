<!-- src/components/DynamicIcon.vue -->
<script setup>
import { shallowRef, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const iconComponent = shallowRef(null)

// Load the SVG component dynamically
const loadIcon = async (iconName) => {
  if (!iconName) {
    iconComponent.value = null
    return
  }
  try {
    const module = await import(`@/assets/icons/${iconName}.svg`)
    iconComponent.value = module.default
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`, error)
    iconComponent.value = null
  }
}

watch(() => props.name, loadIcon, { immediate: true })
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" v-bind="$attrs" />
  <span v-else>Icon not found: {{ name }}</span>
</template>
