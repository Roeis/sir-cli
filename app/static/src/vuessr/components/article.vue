<style lang="scss">

    .module-detail{
        // padding: 2rem 0;
    }
    .context-header{
        margin-bottom: 2rem;
        padding: 0 1rem;
        .context-banner{
            margin: 0 -1rem;
        }
        img{
            width: 100%;
        }
        p{
            color: #999;
        }
        .title{
            margin: 1rem 0 0.5rem;
        }
    }
    .context-body{
        word-break: break-word;
        font-size: 1.6rem;
        padding: 0 1rem;
        line-height: 1.5;
        color: #333;
        .para,
        p{
            margin-bottom: 1rem;
        }
        img{
            max-width: 100%;
            margin: 1rem 0;
        }
        audio{
            width: 100%;
        }
    }
    .article-related{
        padding: 0 1rem;
        .btn-next{
            text-align: center;
            display: block;
            border: 1px solid #ddd;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 3px;
        }
    }

</style>

<template>

<div class="module module-detail">
    <div class="article-content">
        <div class="context-header">
            <div class="context-banner">
                <img :src="context.Image" alt="head banner">
            </div>
            <h1 class="title">{{ context.Title }}</h1>
            <p>
                <span>{{ context.Author ? context.Author : context.Source }}</span>
                <span>{{ context.LastUpdateTime }}</span>
            </p>
        </div>
        <div class="context-body" v-html="context.Content"></div>
    </div>
    <div class="article-related">
        <router-link :to="{path: `/article/${context.NextContentID}`, query: $route.query }" class="btn-next">下一篇</router-link>
    </div>
</div>

</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  asyncData ({ store, route: {params: {id}}}) {
    return store.dispatch('FETCH_DETAIL', id).catch(err => {
      console.log(err)
    })
  },
  computed: {
    ...mapState({
      context: 'article'
    })
  },
  methods: {
    getArticle (id) {
      this.$bar.show()
      this.$store.dispatch('FETCH_DETAIL', id).then(() => {
        this.$bar.hide()
      }).catch(err => {
        console.log('has error', err)
        this.$bar.hide()
      })
    }
  },
    // 使用watch，不同params下切换时，监听到$route的变化
    // watch: {
    //     $route(to, from) {
    //         console.log(to, from)
    //     }
    // },
    // 组件内路由钩子 router hook
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter', to, from)

    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate', to, from)
    document.body.scrollTop = 0
    this.getArticle(to.params.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next()
  },

    // vue生命周期 lifeCycle
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeUpdate () {
        // 统一大路由，不同参数
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },

    // 在routerview包裹keep-alive时，将启用下面生命周期钩子
  activated () {
    console.log('activated')
    this.getArticle(this.$route.params.id)
  },
  deactivated () {
    this.$store.dispatch('RESET_DETAIL')
    console.log('deactivated')
  }
}

</script>
