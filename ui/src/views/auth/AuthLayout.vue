<template>
  <a-row :style="{ background: '#fff', height: '100vh' }">
    <a-col :span="24" :lg="14">
      <router-view></router-view>
    </a-col>
    <a-col
      :span="0"
      :lg="10"
      :style="{
        background: '#ff0',
        overflow: 'hidden',
        height: '100vh'
      }"
    >
      <!-- <a-image :preview="false" src="../../assets/21330.jpg" /> -->
      <img src="../../assets/loginPic.jpg" alt="" style="height: 100%" />
    </a-col>
  </a-row>
</template>
<script setup></script>
<style scoped></style>
