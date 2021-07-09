<template>
  <div>
    <div v-for="(item, i) in categories" :key="i" class="home-category">
      <a :href="'/pages/activityList/main?id=' + (i + 1)">
        <div class="home-category-title">
          {{item.title}}
        </div>
        <ul>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
        <div class="home-category-text">
          新活动
        </div>
        <div class="home-category-total">
          {{item.total}}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import { categories } from '../../constants'

  export default {
    name: 'home',
    data () {
      return {
        load: true,
        categories: [
          {
            title: categories[0],
            total: '...'
          },
          {
            title: categories[1],
            total: '...'
          },
          {
            title: categories[2],
            total: '...'
          },
          {
            title: categories[3],
            total: '...'
          },
          {
            title: categories[4],
            total: '...'
          }
        ]
      }
    },
    methods: {
      onLoad () {
        this.$store.commit('incLoading')
        this.$api.activity.count().then((res) => {
          res.data.forEach((item, index) => {
            this.categories[index].total = String(item)
          })
          wx.stopPullDownRefresh()
          this.$store.commit('decLoading')
        })
      }
    },
    mounted () {
      this.onLoad()
    },
    onShareAppMessage (res) {
    }
  }
</script>

<style scoped lang="less">
  .home-category {
    width: 90%;
    height: 3.5rem;
    line-height: 3.5rem;
    margin: 0.5rem auto 0.75rem auto;
    box-shadow: 0 0 10px #CCC;
    border-radius: 5px;
    position: relative;
    font-size: 0.6rem;
    overflow: hidden;
    color: #fff;

    &-title {
      text-align: center;
    }

    &-total {
      left: 5%;
      bottom: 5%;
      width: 0.75rem;
      height: 0.75rem;
      line-height: 0.75rem;
      background-color: #fff;
      box-shadow: 0 0 10px #888;
      border-radius: 100%;
      text-align: center;
      position: absolute;
      font-size: 0.5rem;
      opacity: 0.5;
      color: #333;
    }

    &-text {
      bottom: 5%;
      left: 5%;
      width: 2.5rem;
      height: 0.75rem;
      line-height: 0.75rem;
      text-indent: 0.85rem;
      background: linear-gradient(to right, #fff, transparent);
      border-radius: 0.75rem 0 0 0.75rem;
      position: absolute;
      font-size: 0.35rem;
      opacity: 0.7;
      color: #888;
    }

    // Cards' background
    &:nth-child(1) {
      background: linear-gradient(to bottom right, #fddc98, #fd5a49)
    }

    &:nth-child(2) {
      background: linear-gradient(to bottom right, #0af, #0e7);
    }

    &:nth-child(3) {
      background: linear-gradient(to bottom right, #1bf, #d1f);
    }

    &:nth-child(4) {
      background: linear-gradient(to bottom right, #fad, #6ce);
    }

    &:nth-child(5) {
      background: linear-gradient(to bottom right, #fa2, #f09);
    }

    // White circles
    ul {
      margin: 0;
      padding: 0;

      li {
        background-color: #fff;
        border-radius: 100%;
        position: absolute;
        list-style: none;
      }
    }

    // White circles in odd cards
    &:nth-child(2n+1) ul li {
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      &:nth-child(1) {
        top: 30%;
        left: 20%;
        width: 1rem;
        height: 1rem;
        opacity: 0.3;

        animation: circle11 7.5s alternate infinite;
      }

      &:nth-child(2) {
        top: 30%;
        left: 80%;
        width: 0.5rem;
        height: 0.5rem;
        opacity: 0.4;

        animation: circle12 5s alternate infinite;
      }

      &:nth-child(3) {
        top: 60%;
        left: 30%;
        width: 0.25rem;
        height: 0.25rem;
        opacity: 0.5;

        animation: circle13 2.5s alternate infinite;
      }

      &:nth-child(4) {
        top: 70%;
        left: 70%;
        width: 0.75rem;
        height: 0.75rem;
        opacity: 0.4;

        animation: circle14 5s alternate infinite;
      }

      &:nth-child(5) {
        width: 0;
        height: 0;
      }
    }

    // White circles in even cards
    &:nth-child(2n) ul li {
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);

      &:nth-child(1) {
        top: 70%;
        left: 30%;
        width: 0.5rem;
        height: 0.5rem;
        opacity: 0.5;

        animation: circle21 5s alternate infinite;
      }

      &:nth-child(2) {
        top: 20%;
        left: 90%;
        width: 0.5rem;
        height: 0.5rem;
        opacity: 0.3;

        animation: circle22 5s alternate infinite;
      }

      &:nth-child(3) {
        top: 30%;
        left: 20%;
        width: 0.75rem;
        height: 0.75rem;
        opacity: 0.4;

        animation: circle23 7.5s alternate infinite;
      }

      &:nth-child(4) {
        top: 80%;
        left: 80%;
        width: 0.75rem;
        height: 0.75rem;
        opacity: 0.2;

        animation: circle24 3s alternate infinite;
      }

      &:nth-child(5) {
        top: 20%;
        left: 70%;
        width: 0.25rem;
        height: 0.25rem;
        opacity: 0.3;

        animation: circle25 2.5s alternate infinite;
      }
    }
  }

  @keyframes circle11 {
    from {
      width: 0.25rem;
      height: 0.25rem;
    }
    to {
      width: 1rem;
      height: 1rem;
    }
  }

  @keyframes circle12 {
    from {
      width: 0.5rem;
      height: 0.5rem;
    }
    to {
      width: 0.25rem;
      height: 0.25rem;
    }
  }

  @keyframes circle13 {
    from {
      width: 0.25rem;
      height: 0.25rem;
    }
    to {
      width: 0.1rem;
      height: 0.1rem;
    }
  }

  @keyframes circle14 {
    from {
      width: 0.25rem;
      height: 0.25rem;
    }
    to {
      width: 0.75rem;
      height: 0.75rem;
    }
  }

  @keyframes circle21 {
    from {
      width: 0.1rem;
      height: 0.1rem;
    }
    to {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  @keyframes circle22 {
    from {
      width: 0.1rem;
      height: 0.1rem;
    }
    to {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  @keyframes circle23 {
    from {
      width: 0.75rem;
      height: 0.75rem;
    }
    to {
      width: 0.25rem;
      height: 0.25rem;
    }
  }

  @keyframes circle24 {
    from {
      width: 0.75rem;
      height: 0.75rem;
    }
    to {
      width: 0.25rem;
      height: 0.25rem;
    }
  }

  @keyframes circle25 {
    from {
      width: 0.05rem;
      height: 0.05rem;
    }
    to {
      width: 0.25rem;
      height: 0.25rem;
    }
  }
</style>
