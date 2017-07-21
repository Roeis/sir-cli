<style lang="scss">

    .module{
        img{
            max-width: 100%;
        }
    }


</style>

<template>

<div class="col-12">
    <div class="module">
        <div class="head-banner">
            <img src="http://img.zcool.cn/community/01bdf7572a19db6ac725381256a469.jpg@900w_1l_2o" alt="" />
        </div>
        <p>
            {{ message }}
        </p>

    </div>

</div>

</template>

<script>
export default {
  data () {
    return {
      message: 'hello vue2'
    }
  },
  mounted () {
  }
}
</script>
