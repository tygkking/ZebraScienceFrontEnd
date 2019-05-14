<template>
    <div>
        <div class="top_xf">
            asd
        </div>
        <div class="sc_detail">
            <div v-for="item in search_results" class="sc_content">
                <div v-if="type=='paper'" style="margin-left: 10%;width: 50%;">
                    <div class="c_font">
                        <a href="https://www.baidu.com" target="_blank">{{item.name}}</a>
                        <img src="/src/images/未收藏.png" alt="收藏" height="25px" width="25px" @click="shoucang" class="collect_img">
                    </div>
                    <div class="c_abstract">{{item.detail}}</div>
                    <div class="paper-author">作者 - 报刊 - 时间</div>
                    <div class="paper-key">关键词1、关键词2</div>
                </div>

                <div v-else-if="type=='prof'">
                    <div class="searchResultItem">
                        <a class="searchResult_pic" href="https://www.baidu.com" target="_blank">
                            <img src="/lib/static/scholar/cache/homepage/img/default_a139b75.png" alt="图片" width="64" height="64">
                        </a>
                        <div class="searchResult_text">
                            <a class="personName" href="https://www.baidu.com" target="_blank">
                                徐家兴
                            </a>
                            <p class="personInstitution">空军总医院</p>
                            <div class="personNum">
                                <p class="personNumItem">
                                    <span>发表文章：</span>
                                    <span class="color_black">166</span>
                                </p>
                                <p class="personNumItem">
                                    <span>被引次数：</span>
                                    <span class="color_black">1534</span>
                                </p>
                            </div>
                            <br>
                            <p class="personField">
                                <span style="display: inline-block">研究领域：</span>
                                <span class="color_black">肿瘤学</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
        <div v-if="type=='paper'" class="paper-img">
            <img src="/src/images/zebra.png" style="width: 300px;height: 300px">
            <p style="text-align: center;font-size: 30px">斑马学术<br>给你不一样的体验</p>
        </div>
    </div>
</template>

<script>
    import temp from './index.vue'
    export default {
        name: "search_paper",
        data() {
            return {
                search_results: [],
                type: ''
            }
        },
        created() {
            this.getSearchDetails()
        },
        methods: {
            getSearchDetails() {
                this.search_results = this.$route.query.search_detail;
                this.type = this.$route.query.search_type;
            },
            shoucang() {
                alert("shoucang")
            }
        }

    }
</script>

<style scoped>
    .top_xf{
        background-color:#666666;
        width:100%;
        height: 5%;
        margin:0 auto;
        overflow:hidden;
        position: fixed;
        top: 0px;
    }
    .paper-img{
        position: fixed;
        top: 20%;
        right: 10%;
    }
    .paper-author{
        margin-top: 5px;
        color: #333333;
        font-size: 15px;
    }
    .paper-key{
        color: #444444;
        font-size: 15px;
    }
    .sc_detail{
        margin-left: 10%;
        margin-top: 7%;
    }
    .sc_content{
        margin-top: 15px;
    }
    .c_font{
        font-family: "Helvetica Neue";
        font-size: 22px;
        word-wrap:break-word;
    }
    .c_abstract{
        line-height: 24px;
        color: #666;
        font-size: 15px;
        word-wrap:break-word;
    }
    .collect_img{
        margin-left: 30px;
        vertical-align:middle;
    }
    .searchResultItem {
        float: left;
        width: 500px;
        height: 96px;
        text-align: left;
        padding: 80px 64px 25px 58px
    }
    .searchResultItem .searchResult_pic {
        display: block;
        text-decoration: none;
        float: left;
        width: 78px;
        height: 78px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        border: 3px solid #fff;
        box-shadow: 0 1px 6px rgba(0,0,0,.25)
    }
    .searchResultItem .searchResult_text {
        float: left;
        width: 256px;
        overflow: hidden;
        margin-left: 16px;
        color: #999
    }
    .searchResultItem .searchResult_text .personName {
        display: block;
        text-decoration: none;
        color: #212121;
        font-size: 18px;
        cursor: pointer
    }
    .personInstitution {
        color: #212121;
        width: 252px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    .searchResultItem .searchResult_text .personNum .personNumItem {
        float: left;
        width: 128px
    }
    .color_black{
        color: black;
    }
</style>
