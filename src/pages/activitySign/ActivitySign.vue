<template>
  <div>
    <van-tabs color="#39f">
      <van-tab title="待确认">
        <van-cell-group>
          <van-swipe-cell :right-width="65" v-for="(item, i) in lists[0]" :key="i">
            <van-cell-group>
              <van-cell title-class="sign-cell" title-width="calc(100% - 100px)">
                <van-button type="primary" size="small" @click="onSign(item)" :loading="item.loading"
                            :disabled="item.loading">签到
                </van-button>
                <div slot="title">
                  {{item.name}}<br/>
                  <div style="font-size: 12px; color:#999;">
                    学号：{{item.student_id}}<br/>
                    电话：{{item.phone}}<br/>
                    班级：{{item.class_name}}
                  </div>
                </div>
              </van-cell>
            </van-cell-group>
            <div slot="right" class="cell-delete" @click="onDelete(item)">删除</div>
          </van-swipe-cell>
        </van-cell-group>
        <empty title="暂无数据" v-if="lists[0].length === 0"></empty>
        <separator value="这是底线" v-else></separator>
      </van-tab>

      <van-tab title="未签到">
        <van-cell-group>
          <van-cell title-class="sign-cell" title-width="calc(100% - 100px)" v-for="(item, i) in lists[1]" :key="i">
            <van-button type="primary" size="small" @click="onSign(item)" :loading="item.loading"
                        :disabled="item.loading">签到
            </van-button>
            <div slot="title">
              {{item.name}}<br/>
              <div style="font-size: 12px; color:#999;">
                学号：{{item.student_id}}<br/>
                电话：{{item.phone}}<br/>
                班级：{{item.class_name}}
              </div>
            </div>
          </van-cell>
        </van-cell-group>
        <empty title="暂无数据" v-if="lists[1].length === 0"></empty>
        <separator value="这是底线" v-else></separator>
      </van-tab>

      <van-tab title="已签到">

        <van-cell-group>
          <van-cell title-class="sign-cell" title-width="calc(100% - 100px)" v-for="(item, i) in lists[2]" :key="i">
            <van-button type="danger" size="small" @click="onCancel(item)" :loading="item.loading"
                        :disabled="item.loading">撤销
            </van-button>
            <div slot="title">
              {{item.name}}<br/>
              <div style="font-size: 12px; color:#999;">
                学号：{{item.student_id}}<br/>
                电话：{{item.phone}}<br/>
                班级：{{item.class_name}}
              </div>
            </div>
          </van-cell>
        </van-cell-group>
        <empty title="暂无数据" v-if="lists[2].length === 0"></empty>
        <separator value="这是底线" v-else></separator>

      </van-tab>
    </van-tabs>

    <van-dialog id="van-dialog"/>

    <MyLoading :loading="load"></MyLoading>
  </div>
</template>

<script>
  import Dialog from '../../../static/vant/dialog/dialog'
  import Separator from '../seperator/Separator'
  import Empty from '../../components/empty/Empty'

  export default {
    name: 'ActivitySign',
    components: { Empty, Separator },
    data () {
      return {
        activity_id: null,
        scrollTop: 0,
        lists: [
          [
            // {id: 1, title: '2017152001'},
            // {id: 2, title: '2017152002'},
            // {id: 3, title: '2017152003', value: '', class_name: ''}
          ], [
            // {id: 1, title: '2017152001'},
            // {id: 2, title: '2017152002'},
            // {id: 3, title: '2017152003', value: '', class_name: ''}
          ], [
            // {id: 1, title: '2017152001'},
            // {id: 2, title: '2017152002'},
            // {id: 3, title: '2017152003', value: '', class_name: ''}
          ]
        ]
      }
    },
    computed: {
      load () {
        return this.$store.state.loading
      }
    },
    methods: {
      updateSign (item, status) {
        item.loading = true

        this.$api.activityJoin.update({
          activity_id: item.activity_id,
          openid: item.openid,
          status: status
        }).then((res) => {
          this.lists[item.status] = this.lists[item.status].filter((item2) => {
            return item.openid !== item2.openid
          })
          item.loading = false
          item.status = status
          this.lists[status].unshift(item)
        })
      },
      onDelete (item) {
        Dialog.confirm({
          title: '确认',
          message: '确认删除吗？'
        }).then(() => {
          this.updateSign(item, 1)
        }).catch(() => {
        })
      },
      onSign (item) {
        this.updateSign(item, 2)
      },
      onCancel (item) {
        this.updateSign(item, 0)
      },
      loadData () {
        this.$store.commit('incLoading')
        this.lists = [[], [], []]

        this.$api.activityJoin.getSignList({
          activity_id: this.activity_id
        }).then((res) => {
          res.data.forEach((item) => {
            this.lists[item.status].push({
              activity_id: item.activity_id,
              openid: item.openid,
              name: item.name,
              phone: item.phone,
              student_id: item.student_id,
              class_name: item.class_name,
              status: item.status,
              loading: false
            })
          })

          this.$store.commit('decLoading')
          wx.stopPullDownRefresh()
        })
      }
    },
    onLoad (e) {
      this.activity_id = e.id
      this.loadData()
    },
    onPullDownRefresh () {
      this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .cell-delete {
    width: 65px;
    line-height: 44px;
    background-color: #f33;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
</style>
