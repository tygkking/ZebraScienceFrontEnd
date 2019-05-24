<template>
    <div>
        <div class="top_xf">
            <Menu mode="horizontal" :theme="theme1" active-name="1" style="width:100%; position: fixed">
                <router-link :to="index_url" style="float:left">
                    <MenuItem name="1">
                        <Icon type="ios-home" size="20"/>
                        首页
                    </MenuItem>
                </router-link>
                <MenuItem name="5">
                    <Input style="width: 450px;margin-top: 12px" v-model="search_content" @keyup.enter.native="search">
                        <Select v-model="search_item" slot="prepend" style="width: 80px;background-color: #eeeeee;color: black">
                            <Option value="professor">专家</Option>
                            <Option value="paper">论文</Option>
                            <Option value="organization">机构</Option>
                        </Select>
                        <Button  @click="search"  slot="append" style="background-color:#57c5f7;color: white" icon="ios-search" ></Button>
                    </Input>
                </MenuItem>
                <Submenu v-if="identity != 'VISITOR'" name="2" style="float:right">
                    <template slot="title">
                        <Icon type="ios-contact" size="20"/>
                        {{this.GLOBAL.userName}}
                    </template>
                    <MenuItem name="2-1" @click.native="user_page()">个人主页</MenuItem>
                    <MenuItem name="2-2" @click.native="news_page()">消息/通知</MenuItem>
                    <MenuItem name="2-3" @click.native="setting()">设置</MenuItem>
                    <MenuItem name="2-4" @click.native="logout()">退出登录</MenuItem>
                </Submenu>
                <MenuItem v-if="identity == 'VISITOR'" @click.native="modal1=true" name="3" style="float:right">
                    登录
                    <Modal v-model="modal1" title="登录" ok-text="登录" cancel-text="取消" @on-ok="login" @on-cancel="cancel" @keyup.enter.native="login">
                        <p>邮箱<input v-model="email" type="email" style="margin-left: 17px"/></p><br/>
                        <p>密码<input v-model="password" type="password" style="margin-left: 17px"/></p>
                    </Modal>
                </MenuItem>
                <a :href="register_url" style="float: right;">
                    <MenuItem v-if="identity == 'VISITOR'" :href="register_url" name="4">
                        注册
                    </MenuItem>
                </a>
            </Menu>
        </div>
        <div class="sc_detail">
            <div v-for="item in search_results" class="sc_content">
                <div v-if="type=='paper'">
                    <div class="c_font">
                        <router-link tag="a" :to="{path:'/paperDetails',query:{paperID:'111111'}}" target="_blank">{{item.name}}</router-link>
                    </div>
                    <div class="c_abstract">{{item.abstract}}</div>
                    <div class="paper-author">
                        <div v-for="(value, key) in item.author" style="display: inline">{{ key }}&nbsp&nbsp</div>
                        <div style="display: inline">-&nbsp&nbsp{{item.source_journal.name}}&nbsp&nbsp-&nbsp&nbsp{{item.source_journal.date}}&nbsp&nbsp-&nbsp&nbsp{{item.year}}</div>
                    </div>
                    <div class="paper-key">
                        关键词：<div v-for="keyword in item.keyword" style="display: inline">{{keyword}}&nbsp</div>
                    </div>
                </div>

                <div v-else-if="type=='professor'">
                    <div class="searchResultItem">
                        <router-link tag="a" class="searchResult_pic" :to="{path: '/professorDetails',query:{profID:'11111'}}" target="_blank">
                            <img src="/src/images/zebra.png" alt="图片" width="64" height="64">
                        </router-link>
                        <div class="searchResult_text">
                            <router-link class="personName" :to="{path: '/professorDetails',query:{profID: item.scid}}" target="_blank">
                                {{item.name}}
                            </router-link>
                            <p class="personInstitution">{{item.mechanism}}</p>
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
                        <a href="https://www.baidu.com" target="_blank" style="color: black">{{item.mechanism}}</a>
                    </div>
                    <div class="c_abstract" v-for="intro in item.introduction">{{intro}}</div>
                </div>

            </div>
        </div>
        <Layout>
            <Footer class="layout-footer-center" style="background-color: #666666; color: #eeeeee;">
                2019-2019 &copy; ZebraScience
                <a href="http://www.baidu.com" style="margin-left: 20px; color: #eeeeee">联系我们</a>
            </Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
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
                email: '',
                password: '',
                search_content: '',
                search_item: '',
            }
        },
        created() {
            this.search_item = this.$route.query.search_type;
            this.search_content = this.$route.query.search_content;
            this.getSearchDetails(this.$route.query.search_type);
        },
        methods: {
            login () {
                this.modal1 = false;
                let params = {'email':this.email,'password':this.password}
                this.$http.post(this.GLOBAL.domain+"/api/v1/login",params,{
                    headers:{
                        'Content-Type':"application/json",
                    }
                }).then(function(res){
                    console.log(res);
                    var s = JSON.parse(res.body);
                    if(s["state"]=="fail"){
                        this.$Message.info(s["reason"]);
                    }
                    else {
                        this.$Message.info('成功登录');
                        console.log("qqqq"+this.GLOBAL.userType)
                        this.GLOBAL.setUserType(s["msg"]["user_type"]);
                        console.log("hhhh"+this.GLOBAL.userType)
                        this.identity = this.GLOBAL.userType;
                        this.GLOBAL.setUserName(s["msg"]["username"])
                    }
                },function (res) {
                    console.log(res)
                });
            },
            cancel () {
                this.$Message.info('cancel');
            },
            user_page () {
                this.$router.push({path: '/user'})
            },
            news_page () {
                this.$router.push({path: '/news'})
            },
            setting () {
                this.$router.push({path: '/setting'})
            },
            logout () {
                this.GLOBAL.setUserType('VISITOR');
                this.identity = this.GLOBAL.userType;
            },
            getSearchDetails(temp) {
                var that = this;
                console.log("get +" + temp);
                if(temp)
                {
                    this.$http.get(this.GLOBAL.domain + "/api/v1/search_" + temp + "/" + that.search_content)
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            that.search_results=detail.msg;
                            that.type = temp;
                            if(detail.reason == "未搜索到该专家" || detail.reason == "未查找到相关论文" || detail.reason == "未查找到相关机构")
                                alert(detail.reason);
                    },function (res) {
                        console.log(res)
                    })
                }
                else
                {
                    alert("请选择搜索类型");
                }
            },

            search() {
                var that = this;
                if(this.search_content == "")
                    return;
                this.$router.push({
                    query:{
                        search_content: that.search_content,
                        search_type: that.search_item
                    }
                })
                console.log("search +" + this.search_item);
                this.getSearchDetails(this.search_item);
            }
        },
        computed: {

        }

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
    }
    .paper-author{
        color: #333333;
        font-size: 15px;
        margin: 2px 0 2px 0;
        width: 80%;
    }
    .paper-key{
        color: #444444;
        font-size: 15px;
        width: 80%;
        border-bottom: #9999 1px solid;
    }
    .sc_detail{
        margin-left: 10%;
        margin-top: 6%;
    }
    .sc_content{
        margin-top: 15px;
    }
    .c_font{
        font-family: "Helvetica Neue";
        margin-bottom: 6px;
        font-size: 20px;
        word-wrap:break-word;
        width: 80%;
    }
    .c_abstract{
        line-height: 17px;
        width: 80%;
        color: #666;
        font-size: 13px;
        word-wrap:break-word;
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
