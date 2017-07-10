<style lang="scss">

.module-article-list {
    padding: 1rem 0;
    li {
        line-height: 1.5;
        padding: 1rem 1.5rem 2rem 1.5rem;
        position: relative;
        margin: 1rem 0;
        border-bottom: 1px solid #eee;
        &:last-child{
            border-bottom: none;
        }
        a {
            color: #2f64be;
            display: flex;
            justify-content: space-between;
        }
        .title{
            font-size: 1.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        p{
            padding: 0 1rem 0 0;
        }
        img {
            height: 8rem;
        }
        .article-link-bar{
            position: absolute;
            bottom: 1.5rem;
            padding: 0.5rem 1rem 0.5rem 0;
            color: #666;
        }
    }
    .btn-load-more{
        text-align: center;
        border: 1px solid #ddd;
        padding: 10px;
        margin: 0 10px;
        color: #999;
    }
}

</style>

<template>

<div class="module module-article-list">
    <ul>
        <li v-for="item in list">
            <router-link :to="{path: `/article/${item.ContentID}/`, query: $route.query}" class="article-link">
                <p>
                    <span class="title">{{ item.Title }}</span>
                </p>
                <img :src="item.Image" :alt="item.Title">
            </router-link>
            <p class="article-link-bar">
                <span><i class="glyphicon glyphicon-eye-open"></i> {{ item.TotalView }}</span>
                <span @click="SET_PRAISE(item)"><i class="glyphicon" :class="{'glyphicon-heart': item.praised, 'glyphicon-heart-empty': !item.praised}"></i> {{  item.AgreeNum }}</span>
            </p>
        </li>
    </ul>

    <div class="btn-load-more" v-show="!isLoadEnd" @click="loadmore">
        查看更多
    </div>
</div>

</template>

<script>

import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  data () {
    return {
      index: 1,
      isLoadEnd: false,
      isLoading: false,
      loadOnce: false
    }
  },
  asyncData ({ store, route}) {
    return store.dispatch('FETCH_ARTICLE_LIST', 1)
  },
  computed: {
    ...mapState({
      list: 'list'
    })
  },
  methods: {
    ...mapActions([
      'FETCH_ARTICLE_LIST'
    ]),
    ...mapMutations([
      'SET_PRAISE'
    ]),
    getList (index) {
            // send request for get data
      this.$store.dispatch('FETCH_ARTICLE_LIST', index)
    },
    getListMore () {
      if (this.isLoadEnd) return

      this.index++
      this.getList(this.index)
      if (this.index > 2) {
        this.isLoadEnd = true
      }
    },
    loadmore () {
      this.getListMore()
    },
    scroll () {
            // 滚动事件
    }
  },

  beforeMount () {
    console.log('beforeMount')
        // 处理store中文章列表已经由服务端拉取过，客户跳过处理，或者加载第二页
    if (this.list.length === 0) {
      this.getList(1)
    }
  }
}


</script>
