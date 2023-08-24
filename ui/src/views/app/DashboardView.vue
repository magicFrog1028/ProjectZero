<template>
  <div class="h-96">{{ brandStore.curBrand.brandName }}的起始页</div>
</template>

<script setup>
import { useBrandStore } from '@/stores/brand'
const brandStore = useBrandStore()
</script>

<style lang="scss" scoped></style>
