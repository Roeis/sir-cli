<style lang="scss">

.wrapper{

}
.layout{
    width: 640px;
}
@media screen and (max-width: 640px) {
    .layout{
        width: 100%;
    }
}

</style>

<template>

<div class="wrapper">
    <div class="layout">
        <div class="row">
            <div class="col-12">
                <v-header></v-header>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import vHeader from '../widgets/header';

export default {
    components: {
        vHeader
    },
    mounted(){
        console.log('app mounted');
    }
}

</script>
