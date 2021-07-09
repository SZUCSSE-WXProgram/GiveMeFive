<template>
  <div class="separator">
    ————— · {{value}} · —————
  </div>
</template>

<script>
  export default {
    name: 'Separator',
    props: {
      value: {
        default: null
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .separator {
    margin: 10px 0;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
</style>
