<style lang="scss" scoped>

    .load-bar{
        position: fixed;
        top: 5rem;
        right:0;
        bottom: 0;
        left: 0;
        background-color: rgba(255,255,255,1);
    }
    .grey-line{
        background-color: #eee;
        height: 2rem;
        // width: 100%;
        margin: 2rem 4rem;
    }
    .line-large{
        height: 20rem;
    }
    .line-short{
        width: 50%;
    }

</style>

<template>

    <div class="load-bar" v-show="isShow">

        <div class="grey-line line-large"></div>
        <div class="grey-line"></div>
        <div class="grey-line"></div>
        <div class="grey-line"></div>
        <div class="grey-line line-short"></div>
    </div>

</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      setTimeout(() => {
        this.isShow = false
      }, 200)
    }
  }
}
</script>
