<template>
    <div style="min-width: 900px;">
        <div class="top_xf">
            <MenuBar :input=true :search_content='this.$route.query.search_content' :search_item="this.$route.query.search_type" @search="search"></MenuBar>
        </div>
        <div class="sc_detail" id="showArea">
            <div v-for="item in search_results" class="sc_content">
                <div v-if="type=='paper'">
                    <div class="c_font">
                        <router-link tag="a" :to="{path:'/paperDetails',query:{paperID: item.paperid}}" target="_blank" v-html="item.name">{{item.name}}</router-link>
                    </div>
                    <div class="c_abstract" v-html="item.abstract">{{item.abstract}}</div>
                    <div class="paper-author">
                        <b>作者：</b>
                        <span v-for="(value, key) in item.author" style="display: inline">{{ key }}&nbsp&nbsp</span>
                        <b>年份：</b>
                        <span style="display: inline" v-html="item.year">{{item.year}}</span><br>
                        <b>来源：</b>
                        <span style="display: inline">&nbsp&nbsp{{item.source_journal.name}}&nbsp&nbsp&nbsp&nbsp{{item.source_journal.date}}&nbsp&nbsp&nbsp&nbsp</span><br>

                    </div>
                    <div class="paper-key">
                        <b>关键词：</b>
                        <div v-for="keyword in item.keyword" style="display: inline">{{keyword}}&nbsp</div>
                    </div>
                    <Divider/>
                </div>

                <div v-else-if="type=='professor'">
                    <div class="searchResultItem">
                        <router-link tag="a" class="searchResult_pic" :to="{path: '/professorDetails',query:{profID: item.scid}}" target="_blank">
                            <img src="/src/images/zebra.png" alt="图片" width="64" height="64">
                        </router-link>
                        <div class="searchResult_text">
                            <router-link class="personName" :to="{path: '/professorDetails',query:{profID: item.scid}}" target="_blank">
                                <div v-html="item.name" id="professorName">{{item.name}}</div>
                            </router-link>
                            <p class="personInstitution" v-html="item.mechanism">{{item.mechanism}}</p>
                            <div class="personNum">
                                <p class="personNumItem">
                                    <span>发表文章：</span>
                                    <span class="color_black">{{item.resultsnumber}}</span>
                                </p>
                                <p class="personNumItem">
                                    <span>被引次数：</span>
                                    <span class="color_black">{{item.citedtimes}}</span>
                                </p>
                            </div>
                            <br>
                            <div class="personField">
                                <span style="display: inline-block">研究领域：</span>
                                <div v-for="field in item.field" class="color_black" style="display: inline;">
                                    {{field}}&nbsp
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="type=='organization'">
                    <div class="c_font">
                        <a :href="item.url" target="_blank">{{item.mechanism}}</a>
                    </div>
                    <div class="c_abstract" v-for="intro in item.introduction">{{intro}}</div>
                    <Divider/>
                </div>

            </div>
            <div v-if="this.$route.query.search_type == 'paper' || this.$route.query.search_type == 'organization'" style="margin: 3% 20% 10% 0">
                <Page :current="pageNum" :total="totalNum" :page-size=10 @on-change="change_page" simple style="text-align: center;"/>
            </div>

        </div>
    </div>
</template>

<script>
    import MenuBar from './menuBar.vue'
    import Button from "../../dist/vendors";
    export default {
        components: {
            Button,
            MenuBar
        },
        name: "search_paper",
        data() {
            return {
                modal1: false,
                index_url:'/',
                register_url:'/register',
                identity: this.GLOBAL.userType,
                theme1: 'primary',
                search_results: [],
                type: '',
                pageNum: 0,
                totalNum: 0,
            }
        },
        created() {
            this.getSearchDetails(this.$route.query.search_type, this.$route.query.search_content)
        },
        methods: {
            getSearchDetails(item, content) {

                var that = this;
                console.log("get: item + " + item + "; content + " + content + "; pageNum + " + this.pageNum);
                if(this.$route.query.advance_data)
                {
                    let params = {'keyw_and': this.$route.query.advance_data.and,
                        'keyw_or': this.$route.query.advance_data.or,
                        'keyw_not': this.$route.query.advance_data.none,
                        'title': content,
                        'author': this.$route.query.advance_writer,
                        'journal': this.$route.query.advance_book,
                        'start_time': this.$route.query.advance_time[0],
                        'end_time': this.$route.query.advance_time[1],
                        'page_num': this.pageNum
                    }
                    this.$http.post("http://qsz.lkc1621.xyz/api/v1/search_paper_nb", params).then(function (res) {
                        console.log(res)
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        that.search_results = detail.msg;
                        that.type = item;
                        if (detail.reason == "未搜索到该专家" || detail.reason == "未查找到相关论文" || detail.reason == "未查找到相关机构")
                            alert(detail.reason);
                        if (detail.total_count != 0)
                            that.totalNum = detail.total_count;
                        if (that.pageNum == 0)
                            that.pageNum++;

                        window.scrollTo(0, 0);
                    },function (res) {
                        console.log(res)
                    })
                }
                else if(this.$route.query.extra_org_name)
                {
                    let params = {'organization_name': this.$route.query.extra_org_name, 'professor_name': content}
                    this.$http.post("http://qsz.lkc1621.xyz/api/v1/search_professor_nb",params).then(function (res) {
                        console.log(res)
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        that.search_results = detail.msg;
                        that.type = item;
                        if (detail.reason == "未搜索到该专家" || detail.reason == "未查找到相关论文" || detail.reason == "未查找到相关机构")
                            alert(detail.reason);
                        if (detail.total_count != 0)
                            that.totalNum = detail.total_count;
                        if (that.pageNum == 0)
                            that.pageNum++;

                        window.scrollTo(0, 0);
                      },function (res) {
                        console.log(res)
                    })
                }
                else
                {
                    let param = {'page_num' : this.pageNum};
                    console.log(param);
                    this.$http.get(this.GLOBAL.domain + "/api/v1/search_" + item + "/" + content, {params:param})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            that.search_results=detail.msg;
                            that.type = item;
                            if(detail.reason == "未搜索到该专家" || detail.reason == "未查找到相关论文" || detail.reason == "未查找到相关机构")
                                alert(detail.reason);
                            if(item == 'paper' || item == 'organization')
                                that.totalNum = detail.count
                            window.scrollTo(0,0);
                        },function (res) {
                            console.log(res);
                        })
                }
            },

            search(item, content) {
                if(item=="")
                {
                    alert("请输入搜索类型");
                    return;
                }
                this.pageNum = 1;
                var that = this;
                if(content == "")
                    return;
                this.$router.push({
                    query:{
                        search_content: content,
                        search_type: item
                    }
                });
                console.log("item + " + item + "; search + " + content);
                this.getSearchDetails(item, content);
            },
            change_page(value) {

                this.pageNum = value;
                this.getSearchDetails(this.$route.query.search_type, this.$route.query.search_content);
            },
        },
        computed: {

        },


    }
</script>

<style scoped>
    #layout{
        margin-top: 60px;
        padding-top: 40px;
        width: 100%;
    }
    .layout-footer-center{
        text-align: center;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
    .top_xf{
        background-color:#666666;
        width:100%;
        height: 5%;
        margin:0 auto;
        overflow:hidden;
        position: fixed;
        top: 0px;
        z-index: 1;
    }
    .paper-author{
        color: #333333;
        font-size: 14px;
        margin: 10px 0 2px 10px;
        width: 80%;
        font-family: 微软雅黑;
    }
    .paper-key{
        color: #444444;
        font-size: 14px;
        width: 80%;
        font-family: 微软雅黑;
        margin-left: 10px;
        /*border-bottom: #9999 1px solid;*/
    }
    .sc_detail{
        margin-left: 10%;
        margin-top: 80px;
        z-index: 3;
    }
    .sc_content{
        margin-top: 15px;
        width: 90%;
    }
    .c_font{
        font-family: "Helvetica Neue";
        margin-bottom: 6px;
        font-size: 20px;
        word-wrap:break-word;
        width: 90%;
    }
    .c_abstract{
        line-height: 20px;
        width: 90%;
        color: #666;
        font-size: 14px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;  /*限制在一个块元素显示的文本的行数*/
        -webkit-box-orient: vertical;
        overflow: hidden;
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
        -webkit-border-radius: 10%;
        -moz-border-radius: 10%;
        -ms-border-radius: 10%;
        border-radius: 10%;
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
