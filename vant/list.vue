<template>
  <div class="demo_list">
    <van-pull-refresh v-model="listState.refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="listState.loading"
        :finished="listState.finished"
        finished-text="-- 我是有底线的 --"
        @load="fetchList"
      >
        <div class="item_card" v-for="item in listState.list" :key="item.appid">
          {{item.appid}}
        </div>
      </van-list>
    </van-pull-refresh>
    <robot-back-home />
  </div>
</template>

<!-- 代码主要是演示了useList的使用姿势 -->
<script lang="ts">
  import { defineComponent } from 'vue';
  import { List, PullRefresh, Tag, Icon } from 'vant';
  import useList from './useList';
  import { inviteList } from '@/apis/invite';

  export default defineComponent({
    name: 'demo-list',
    components: {
      [List.name]: List,
      [PullRefresh.name]: PullRefresh,
      [Tag.name]: Tag,
      [Icon.name]: Icon
    },
    setup() {
      return {
        ...useList(inviteList)
      }
    }
  });
</script>
