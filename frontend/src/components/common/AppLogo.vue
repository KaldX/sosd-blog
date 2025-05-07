<template>
  <router-link to="/" class="inline-flex items-center focus:outline-none group" aria-label="SOSD Blog Home">
    <img
      src="@/assets/images/logo.png"
      alt="SOSD Blog Logo"
      :class="['h-auto group-hover:opacity-90 transition-opacity duration-200', imageClass]"
      :style="{ width: imageWidth }"
    />
    <span
      v-if="showText"
      :class="['ml-2 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200', textClass]"
    >
      SOSD Blog
    </span>
  </router-link>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    // 可以通过 size prop 控制logo大小预设
    size: {
      type: String,
      default: 'default', // 'default', 'small', 'large'
    },
    // 直接传递宽度，高度会自适应
    width: {
      type: [String, Number], // e.g. '40px' or 40 (converted to px)
      default: null,
    },
    showText: {
      type: Boolean,
      default: true, // 是否显示 "SOSD Blog" 文字
    },
    textClass: {
      type: String,
      default: 'text-xl', // Logo旁边文字的Tailwind类
    },
    imageClass: {
      type: String,
      default: '', // 额外的给img标签的Tailwind类
    }
  });

  const imageWidth = computed(() => {
    if (props.width) {
      return typeof props.width === 'number' ? `${props.width}px` : props.width;
    }
    switch (props.size) {
      case 'small':
        return '32px'; // 示例小尺寸
      case 'large':
        return '64px'; // 示例大尺寸
      default:
        return '51px'; // Logo原始宽度
    }
  });
</script>
