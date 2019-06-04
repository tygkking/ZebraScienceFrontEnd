<template>
    <div>
        <MenuBar></MenuBar>
        <div class="aboutUs" >
            <span style="font-size: 30px">团队介绍：</span><br>
            前端工程狮：<b>赵楠</b>、<b>何浩乾</b>、<b>胡琦</b><br>
            后端工程狮：<b>黎昆昌</b>、<b>仇善召</b>、<b>杜予同</b><br>
            数据库工程狮：<b>阙子烝</b>、<b>郭子溢</b><br>
            爬虫工程狮：<b>许志达</b>
            <br>
            <br>
            <br>
            <span style="font-size: 30px">联系我们：</span><br>
            斑马会所群号：473326561<br>
            办公地址：主南210<br>
        </div>
    </div>
</template>

<script>
    import MenuBar from './menuBar.vue'
    export default {
        components:{
            MenuBar
        },
        name: "aboutUs",
    }
</script>

<style scoped>
    .aboutUs{
        font-size: 20px;
        height: 500px;
        width: 100%;
        text-align: center;
        /* background-color: #666; */
        padding-top: 20%;
    }
</style>
