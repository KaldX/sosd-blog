<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <app-header />
    <main class="container mx-auto px-4 py-6 flex-grow w-full">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script setup>
  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppFooter from '@/components/layout/AppFooter.vue';
</script>
