<style lang="scss">

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    border-bottom: 1px solid #ddd;
    span{
        padding: 0 1.5rem;
    }
}

</style>

<template>

    <header>
        <span @click="toHome">
            <i class="glyphicon glyphicon-home"></i>
        </span>
        <h3>ssr+</h3>
        <span @click="toUser">
            <i class="glyphicon glyphicon-user"></i>
        </span>
    </header>

</template>

<script>
export default {
  computed: {
    isHome () {
      return this.$route.path === '/'
    },
    backText () {
      return this.isHome ? 'home' : 'back'
    }
  },

  props: {
    optText: {
      type: String,
      default: 'user'
    }
  },

  methods: {
    toHome () {
      if (!this.isHome) {
        this.$router.push({path: '/', query: this.$route.query})
      }
    },
    toUser () {
      this.$router.push({path: '/user', query: this.$route.query})
    }
  }
}
</script>
