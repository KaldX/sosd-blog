<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 v-if="title" class="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
      {{ title }}
    </h3>
    <slot></slot> <!-- 内容将通过slot传入 -->
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: '',
    },
  });
</script>
