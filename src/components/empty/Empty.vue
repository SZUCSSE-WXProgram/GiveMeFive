<template>
  <div>
    <div style="height: 50px;"></div>
    <div style="line-height: 30px;; text-align: center; color: #888;">
      <img src="/static/img/empty.svg" style="width: 50%" mode="widthFix" alt="空"/>
      <br/>{{title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Empty',
    props: {
      title: String
    }
  }
</script>

<style scoped lang="less">
</style>
