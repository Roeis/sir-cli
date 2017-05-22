<style lang="scss">

.wrapper{
    background-color: #ddd;
}
.layout{
    width: 640px;
}

.link {
    display: inline-block;
    padding: 12px 16px;
    background-color: #eee;
}
.router-link-active {
    background-color: #fff;
    color: #ed675f;
}

</style>

<template>

<div class="wrapper">
    <div class="layout">
        <router-link to="/foo" class="link">Go to Foo</router-link>
        <router-link to="/bar" class="link">Go to Bar</router-link>
        <router-view></router-view>
    </div>
</div>

</template>

<script>

export default {
    mounted(){
        console.log('mounted');
    }
}

</script>
