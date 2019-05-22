<template>
    <div class="page">
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="width:100%; position: fixed">
            <router-link :to="index_url" style="float:left">
                <MenuItem name="1">
                    <Icon type="ios-home" size="20"/>
                    首页
                </MenuItem>
            </router-link>
            <Submenu v-if="identity != 'visitor'" name="2" style="float:right">
                <template slot="title">
                    <Icon type="ios-contact" size="20"/>
                    {{this.GLOBAL.userName}}
                </template>
                <MenuItem name="2-1" @click.native="user_page()">个人主页</MenuItem>
                <MenuItem name="2-2" @click.native="news_page()">消息/通知</MenuItem>
                <MenuItem name="2-3" @click.native="setting()">设置</MenuItem>
                <MenuItem name="2-4" @click.native="logout()">退出登录</MenuItem>
            </Submenu>
            <MenuItem v-if="identity == 'visitor'" @click.native="modal1=true" name="3" style="float:right">
                登录
                <Modal v-model="modal1" title="登录" ok-text="登录" cancel-text="取消" @on-ok="login" @on-cancel="cancel" @keyup.enter.native="login">
                    <p>邮箱<input v-model="email" type="email" style="margin-left: 17px"/></p><br/>
                    <p>密码<input v-model="password" type="password" style="margin-left: 17px"/></p>
                </Modal>
            </MenuItem>
            <a :href="register_url" style="float: right;">
                <MenuItem v-if="identity == 'visitor'" :href="register_url" name="4">
                    注册
                </MenuItem>
            </a>
        </Menu>
        <Layout id="layout">
                <div style="margin-left: 26%;width: 50%">
                    <h3 style="color: #06c;font-size: 24px;font-weight: bold;word-break: break-all">{{paper.name}}</h3>
                    <div class="dtl_l_content">
                        <div class="dtl_l_love_wr">
                            <span>来自</span>
                            <a :href=paper.source_url[0]>{{paper.source_url[0]}}</a>
                        </div>
                        <div class="dtl_l_love_auth_wr" >
                            <Row>
                                <Col span="2">
                                    <label style="width: 90px;color: #999999" >作者：</label>
                                </Col>
                                <Col span="22">
                                    <label @click="jump_man" v-for="auth in paper.author" style="color: #2b85e4;font-size: 14px">{{auth}}&nbsp;&nbsp;&nbsp;</label>
                                </Col>
                            </Row>
                            <!--<label style="width: 60px;color: #999999" >作者：</label>-->
                            <!--<label v-for="auth in paper.author" style="color: #2b85e4;font-size: 14px">{{auth}}&nbsp;&nbsp;&nbsp;</label>-->
                        </div>
                        <div class="dtl_l_love_auth_wr" >
                            <Row>
                                <Col span="2">
                                    <label style="width: 52px;color: #999999" >摘要：</label>
                                </Col>
                                <Col span="22">
                                    <label class="multiLineText" style="width: 100%">{{paper.abstract}}</label>
                                </Col>
                            </Row>
                        </div>
                        <div class="dtl_l_love_auth_wr"  style="margin-top: 7px">
                            <Row>
                                <Col span="2">
                                    <label style="width: 90px;color: #999999" >关键字：</label>
                                </Col>
                                <Col span="22">
                                    <label v-for="word in paper.keyword" style="color: #2b85e4;font-size: 14px;word-break: break-all">{{word}}&nbsp;&nbsp;&nbsp;</label>
                                </Col>
                            </Row>
                            <!--<label style="width: 60px;color: #999999" >作者：</label>-->
                            <!--<label v-for="auth in paper.author" style="color: #2b85e4;font-size: 14px">{{auth}}&nbsp;&nbsp;&nbsp;</label>-->
                        </div>
                        <Button icon="ios-star" style="width: 20%; font-size: 14px;margin-left: 20%;margin-top: 7px" v-model="showlike" :class="{liked: isliked}" @click.native="toggle_like">
                            {{showlike}}</Button>
                        <Button icon="ios-text" style="width: 20%; font-size: 14px;margin-left: 10%;margin-top: 7px"
                                @click="modal2=true"> 添加评论</Button>
                        <Modal v-model="modal2" title="添加评论" ok-text="确定" cancel-text="取消" @on-ok="sub_comment"
                               @on-cancel="cancel" >
                            <textarea v-model="content" placeholder="写下你的想法" style="margin-left: 4%;width:90%;height: 200px"/>
                        </Modal>
                    </div>
                </div>

            <div style="margin-left: 26%;margin-top: 30px; width: 55%">
                <h2 style="">评论</h2>
                <Divider/>
                <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
                <div v-else st>
                    <div  v-for="item in comment"  >
                        <b style="color: #52c41a;font-size: 16px ">{{item.from}}
                            <span style="color: #999999;font-size: 12px">{{item.date}}</span>
                        </b>
                        <p class="commentColor">{{item.content}}</p>
                        <div v-if="item.reply.length>0">
                            <div style="margin-left: 20px" v-for="reply in item.reply">
                                <b style="color: #52c41a ">{{reply.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.reviewers}}
                                    <span style="color: #999999">{{reply.time}}
                                    </span>
                                </b>
                                <p class="commentColor">{{reply.content}}</p>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <Page :current="2" :total="50" simple style="margin-left: 32%"/>
                <BackTop :height="100" :bottom="200">
                    <Icon type="md-arrow-up" class="top"/>
                    <br/>返回顶端
                </BackTop>
            </div>
            <Footer class="layout-footer-center" style="background-color: #666666; color: #eeeeee;margin-top: 3%">
                2019-2019 &copy; ZebraScience
                <a href="http://www.baidu.com" style="margin-left: 20px; color: #eeeeee">联系我们</a>
            </Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "paperDetails",
        data(){
            return{
                commentData: [],
                modal1: false,
                modal2: false,
                index_url:'/',
                email: '',
                password: '',
                register_url:'/register',
                identity: this.GLOBAL.userType,
                //identity:'professor', //professor user visitor
                theme1: 'primary',
                isliked: false,
                showlike: '收藏',
                content:'',
                other_cmt:[],
                paper:{
                    paper_id:'',
                    name:'Matlab toolbox for pet / ct image segmentation with the',
                    year:'',
                    source_url:['http://www.baidu.com'],
                    free_url:[],
                    source_journal:{
                        name:'',
                        date:''
                    },
                    author:['Chan-Vese model','xjx'],
                    keyword:['deep learning','computer vision','chan-vese',],
                    abstract:'1. Unpack the toolbox (\'chanvese_tb_1.0.zip\') to a directory of your choice2. Optionally unpack ' +
                        'the examples folder (\'examples.zip\') to a directory of your choice3. Start Matlab4. Add directory containi' +
                        'ng the toolbox to the Matlab path. To do this: a) choose toolbox directory as Matlab working directory,' +
                        ' execute the following commands:1. Unpack the toolbox (\'chanvese_tb_1.0.zip\') to a directory of your choice2. ' +
                        'Optionally unpack the examples folder (\'examples.zip\') to a directory of your choice3. Start Matlab4. Add ' +
                        'directory containing the toolbox to the Matlab path. To do this: a) choose toolbox directory as Matlab working ' +
                        'directory, execute the following commands:'
                },
                comment:[
                    {
                        date:'2019-5-16',from:'cxk',
                        content:'你打篮球像我！',
                        reply: [{              //回复评论的信息，是一个数组，如果没内容就是一个空数组
                                responder: "xzd",    //评论者
                                reviewers: "cxk",         //被评论者
                                time: "2016-09-05",
                                content: "你写代码像蔡徐坤"
                            }]
                    },
                    {
                        date:'2019-5-15',from:'xzd',
                        content:'你打篮球像cxk！',
                        reply:[],
                    },
                ]
            }
        },
        created() {
            this.identity = this.GLOBAL.userType;
            console.log(this.GLOBAL.userType);
            console.log(this.identity)
        },
        methods:{
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
                        //console.log("hhhh"+this.GLOBAL.userName)
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
                this.GLOBAL.setUserType('visitor');
                this.identity = this.GLOBAL.userType;
            },
            toggle_like (){
                if(this.isliked){
                    this.showlike = '收藏'
                }
                else {
                    this.showlike = '已收藏'
                }
                this.isliked = !this.isliked
            },
            sub_comment(){
                if(this.content=='')
                    return
                else
                    this.$Message.info('评论成功!');
            },
            jump_man(){
                this.$router.push({
                    name: 'search_detail',
                    query: {
                        search_detail: this.temp_detail,
                        search_type: 'prof'
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .page{
        /*border: 1px solid #d7dde4;*/
        background-color: white;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    #layout{
        margin-top: 60px;
        padding-top: 40px;
    }
    .layout-footer-center{
        text-align: center;
    }
    .dtl_l_content {
        line-height: 24px;
        text-align: left;
        color: #333;
        margin-top: 5px;
    }
    .dtl_l_love_wr {
         font-size: 13px;
         overflow: hidden;
         line-height: 15px;
         margin: 15px 0 24px;
         color: #999999;
     }
    .dtl_l_love_auth_wr{
        width: 100%;
        overflow: hidden;
        color: #999;
    }
    .multiLineText{
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 6;  /*限制在一个块元素显示的文本的行数*/
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .liked{
        background-color: #2d8cf0;
        color: white;
    }
    .commentColor{
        color: #444444;
    }
    .top{
        padding: 10px;
        background: rgba(0, 140, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>