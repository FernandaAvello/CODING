<template lang="pug">
#AdminView
  AdminLayout
</template>
<script>
import AdminLayout from '@/components/AdminLayout.vue'
export default {
  components: {
    AdminLayout
  }
}
</script>
<style lang="scss">
@import '@/styles/main.scss';
#AdminView {
  background-color: white;
  height: 100%;
  padding: 100px 100px;
}

</style>