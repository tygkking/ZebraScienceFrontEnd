<template>
    <div v-if="flag" class="page">
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <Layout id="layout">
                <div style="margin-left: 15%; width: 68%; min-width: 500px">
                    <h3 style="color: #06c;font-size: 26px;font-weight: bold;word-break: break-all">{{paper.name}}</h3>
                    <div class="dtl_l_content">
                        <Divider dashed/>
                        <div class="dtl_l_love_wr ">
                            <span>来自&nbsp</span>
                            <a :href=paper.source_url[0]>{{paper.source_url[0]}}</a>
                            <br><br>
                            <span>期刊来源&nbsp</span>
                            <span style="margin-top: 2%;color: #363e4f; font-family: 微软雅黑;"> {{this.paper.source_journal.name}}&nbsp-&nbsp{{this.paper.source_journal.date}}</span>
                            <br><br>
                            <span>年份&nbsp</span>
                            <span style="margin-top: 2%;color: #363e4f; font-family: 微软雅黑;">{{this.paper.year}}</span>
                        </div>
                        <div class="dtl_l_love_auth_wr" >
                            <Row>
                                <Col span="2">
                                    <label style="width: 90px;color: #999999" >作者：</label>
                                </Col>
                                <Col span="22">
                                    <label @click="jump_man(key)" v-for="(value, key) in paper.author" style="color: #2b85e4;font-size: 15px; cursor:pointer; width: fit-content; font-size: 13px; font-family: 微软雅黑">
                                        {{key}}<Divider type="vertical" />
                                    </label>
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
                                    <label class="multiLineText" style="width: 100%; color: #3f3f3f">
                                        {{paper.abstract}}
                                    </label>
                                </Col>
                            </Row>
                        </div>
                        <div class="dtl_l_love_auth_wr"  style="margin-top: 7px">
                            <Row>
                                <Col span="2">
                                    <label style="width: 90px;color: #999999" >关键词：</label>
                                </Col>
                                <Col span="22">
                                    <label v-for="word in paper.keyword" style="color: #3f3f3f;font-size: 15px;word-break: break-all; font-size: 13px; font-family: 微软雅黑">
                                        {{word}}<Divider type="vertical" />
                                    </label>
                                </Col>
                            </Row>
                            <!--<label style="width: 60px;color: #999999" >作者：</label>-->
                            <!--<label v-for="auth in paper.author" style="color: #2b85e4;font-size: 14px">{{auth}}&nbsp;&nbsp;&nbsp;</label>-->
                        </div>
<!--                        <Divider />-->
                        <Button icon="ios-star" style="width: 30%; min-width: 200px; font-size: 14px;margin-left: 35%;margin-top: 20px" v-model="showlike" :class="{liked: isliked}" @click.native="toggle_like">
                            {{showlike}}</Button>
<!--                        <Button icon="ios-text" style="width: 20%; font-size: 14px;margin-left: 10%;margin-top: 7px"-->
<!--                                @click="add_comment"> 添加评论</Button>-->
                        <Modal v-model="modal2" title="回复评论" ok-text="确定" cancel-text="取消" @on-ok="sub_comment"
                               @on-cancel="cancel" >
                            <textarea v-model="content" placeholder="写下你的想法" style="margin-left: 4%;width:90%;height: 200px"/>
                        </Modal>
                    </div>
                </div>
            <Divider />
            <div style="margin-left: 20%; width: 60%; min-width: 500px">
                <h2 style="margin-bottom: 10px">评论区</h2>
                <div style="min-width: 500px;">
                    <Row type="flex" justify="center" align="middle" style="min-width: 450px">
                        <Col span="3" style="min-width: 110px">
                            <img :src=this.GLOBAL.avatar height="90px" style="margin: 5px; border-radius: 50%; padding: 3px; background-color: #fff; border: 1px solid rgba(0, 0, 0, 0.15);">
                        </Col>
                        <Col span="18">
                            <Input v-model="content" type="textarea" :autosize="{minRows: 4,maxRows: 4}" :maxlength=140 placeholder="写下你的想法" style="margin-left: 4%;width:90%;"/>
                        </Col>
                    </Row>
                </div>
                <Button icon="ios-text" style="width: 20%; min-width: 100px; font-size: 14px; float: right; margin-right: 10%; margin-top:10px; margin-bottom:10px; padding: 5px"
                                @click="sub_comment">发表评论</Button>
                <Divider />
                <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
                <div v-else >
                    <div  v-for="item in this.comment.slice((pageNum-1)*pageSize, pageNum*pageSize)" >
                        <b style="color: #2B86E4;font-size: 14px ">
                            {{item.from.username}}
                            <span style="color: #999999;font-size: 12px; margin-left: 10px">{{item.date}}</span>&nbsp&nbsp&nbsp
                            <Button type="text" shape="circle" icon="md-chatboxes" style="color: #666666" @click="add_reply(item)">回复</Button>
                            <Modal v-model="modal3" title="回复评论" cancel-text="取消" ok-text="回复" @on-ok="reply_comment"
                                   @on-cancel="cancel" >
                                <Input v-model="content" type="textarea" :autosize="{minRows: 4,maxRows: 4}" :maxlength=140 placeholder="写下你的回复" style="margin-left: 4%;width:90%;"/>
                            </Modal>
                        </b>
                        <p class="commentColor">{{item.content}}</p>
                        <div v-if="item.replies.length>0" style="width: 70%; margin: 0px 20px 0px 20px; padding: 5px; border-left: 2px solid #8391a5; background-color: #fcfcfc">
                            <div style="padding:0px 5px 0px 5px;" v-for="reply in item.replies">
                                <b style="color: #86bbf2;font-size: 14px">{{reply.from_name}}&nbsp;&nbsp;<span style="color: #999999">回复</span>&nbsp;&nbsp;{{item.from.username}}
                                    <span style="color: #999999">{{reply.time}}</span>&nbsp&nbsp
                                    <!--<Button type="text" shape="circle" icon="md-chatboxes" style="color: #999999" @click="add_reply"></Button>-->
                                    <!--<Modal v-model="modal3" title="添加评论" ok-text="确定" cancel-text="取消" @on-ok="reply_comment"-->
                                           <!--@on-cancel="cancel" >-->
                                        <!--<textarea v-model="content" placeholder="写下你的想法" style="margin-left: 4%;width:90%;height: 200px"/>-->
                                    <!--</Modal>-->
                                </b>
                                <p class="commentColor">{{reply.content}}</p>
                                <Divider v-if="item.replies.length>1" dashed style="margin:10px"/>
                            </div>
                        </div>
                        <Divider dashed style="margin:10px"/>
                    </div>
                    <Page :current="pageNum" :total="comment.length" :page-size="pageSize" @on-change="change_page"
                          simple style="margin-left: 32%"/>
                </div>
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
    import MenuBar from './menuBar.vue'
    export default {
        components:{
            MenuBar
        },
        name: "paperDetails",
        data(){
            return{
                flag:false,
                modal2: false,
                modal3: false,
                identity:this.GLOBAL.userType,
                //identity:'EXPERT', //EXPERT USER VISITOR
                isliked: '',
                showlike: '',
                content:'',
                pageNum:1,
                pageSize:5,
                cur_cmt:[],
                paper:{
                    // paper_id:'', //'13e8bab7244258710c462441e19afbad',
                    // name:'',
                    // year:'',
                    // source_url:[],
                    // free_url:[],
                    // source_journal:{
                    //     name:'',
                    //     date:''
                    // },
                    // author:[],
                    // keyword:[],
                    // abstract:''
                },
                comment:[
                    // {
                    //     date:'2019-5-16',from:{username:"cxk",userid:"111@123.com"},
                    //     content:'你打篮球像我！',
                    //     replies: [{              //回复评论的信息，是一个数组，如果没内容就是一个空数组
                    //             responder: "xzd",    //评论者
                    //             reviewers: "cxk",         //被评论者
                    //             time: "2016-09-05",
                    //             content: "你写代码像蔡徐坤"
                    //         }]
                    // },
                    // {
                    //     date:'2019-5-15',from:{username:"xzd",userid:"111@12354.com"},
                    //     content:'你打篮球像cxk！',
                    //     replies:[],
                    // },
                ]
            }
        },
        created() {
            this.paper.paper_id = this.$route.query.paperID;
            this.get_paperDetails(this.paper.paper_id);
            console.log("1111"+this.flag);
            this.judge_like();
            this.get_comment();
        },
        methods:{
            cancel () {
                //this.$Message.info('cancel');
            },
            judge_login(){
                if(this.identity === "VISITOR"){
                    this.$Message.info("请先登录");
                    return false;
                }
            },
            toggle_like (){
                console.log(this.identity);
                if(this.judge_login()==false)return;
                let params = {'user_id':this.GLOBAL.email,'paper_id':this.paper.paper_id};
                if(this.isliked){
                    this.$http.delete(this.GLOBAL.domain + "/api/v1/collect",{params:params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state == "fail"){
                                this.$Message.info("取消收藏失败");
                            }
                            else {
                                this.showlike = '收藏';
                                this.isliked = !this.isliked;
                                this.refresh_user_info();
                            }
                        },function (res) {
                            alert(res);
                        })
                }
                else {
                    this.$http.get(this.GLOBAL.domain + "/api/v1/collect",{params:params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state=="fail"){
                                this.$Message.info("收藏失败")
                            }
                            else {
                                this.showlike = '已收藏';
                                this.isliked = !this.isliked;
                                this.refresh_user_info();
                            }
                        }, function (res) {
                            alert(res);
                        });
                }
            },
            get_comment(){
                let params = {'paper_id':this.paper.paper_id};
                this.$http.get(this.GLOBAL.domain + "/api/v1/comment",{params:params})
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        if(detail.state=="fail"){
                            //this.$Message.info("获取评论失败")
                        }
                        else{
                            this.comment = detail.msg;
                            console.log(this.comment)
                        }
                    }, function (res) {
                        alert(res);
                    });
            },
            change_page (value) {
                this.pageNum = value;
                console.log(this.pageNum);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            add_comment(){
                if(this.judge_login()==false)return;
                this.modal2 = true;
            },
            add_reply(item){
                if(this.judge_login()==false)return;
                this.cur_cmt = item;
                this.modal3 = true;
            },
            sub_comment(){
                if(this.judge_login()==false)return;
                if(this.content.trim()==''){
                    this.$Message.error('内容不能为空');
                    this.content = '';
                    return
                }
                else {
                    console.log(this.paper.paper_id)
                    let params = {'from_email':this.GLOBAL.email,'paper_id':this.paper.paper_id,'content':this.content};
                    this.$http.post(this.GLOBAL.domain + "/api/v1/comment",params,{
                        headers:{
                            'Content-Type':"application/json",
                        }
                    }).then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state=="fail"){
                                this.$Message.info("评论失败")
                            }
                            else{
                                this.$Message.success('评论成功');
                                this.get_comment()
                                this.content="";
                            }
                        }, function (res) {
                            alert(res);
                        });
                }
            },
            reply_comment(){
                if(this.content.trim()==''){
                    this.$Message.error('内容不能为空');
                    this.content = '';
                    return
                }
                else {
                    let params = {'from_email':this.GLOBAL.email,'comment_id':this.cur_cmt.comment_id,'to_email':this.cur_cmt.from.userid,
                        'to_name':this.cur_cmt.from.username,'content':this.content,'comment':this.cur_cmt.content,
                        'from_name':this.GLOBAL.userName};
                    this.$http.post(this.GLOBAL.domain + "/api/v1/reply_comment",params,{
                        headers:{
                            'Content-Type':"application/json",
                        }
                    }).then(function (res) {
                        var detail = JSON.parse(res.body);
                        if(detail.state=="fail"){
                            this.$Message.info("回复失败")
                        }
                        else{
                            this.get_comment();
                            this.content="";
                        }
                    }, function (res) {
                        alert(res);
                    });
                }

            },
            jump_man(man){
                this.$router.push({
                    name: 'search_detail',
                    query: {
                        search_content: man,
                        search_type: 'professor'
                    }
                })
            },
            get_paperDetails(pid) {
                this.$http.get(this.GLOBAL.domain + "/api/v1/paper_detail/" + pid)
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        this.paper.name = detail.msg.name;
                        this.paper.abstract = detail.msg.abstract;
                        this.paper.keyword = detail.msg.keyword;
                        this.paper.year = detail.msg.year;
                        this.paper.author = detail.msg.author;
                        this.paper.source_journal = detail.msg.source_journal;
                        this.paper.source_url = detail.msg.source_url;
                        this.flag=true
                    }, function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                });
            },
            judge_like(){
                let params = {'user_id':this.GLOBAL.email,'paper_id':this.paper.paper_id};
                this.$http.post(this.GLOBAL.domain+"/api/v1/is_collect",params,{
                    headers:{
                        'Content-Type':"application/json",
                    }
                }).then(function(res){
                    var detail = JSON.parse(res.body);
                    if(detail.state=="yes") {
                        this.showlike = "已收藏";
                        this.isliked = true;
                    }
                    else {
                        this.showlike = "收藏";
                        this.isliked = false;
                    }
                },function (res) {
                });
            },
            refresh_user_info () {
                this.$http.get(this.GLOBAL.domain + '/api/v1/user_detail/' + this.GLOBAL.email)
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        this.GLOBAL.setFollowList(detail.msg.follow_list);
                        this.GLOBAL.setCollectList(detail.msg.star_list);
                    },function (res) {
                        console.log('Failed');
                        var detail = JSON.parse(res.body);
                        console.log(detail);
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
        margin-top: 55px;
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
         margin: 15px 0 12px;
         color: #999999;
     }
    .dtl_l_love_auth_wr{
        font-size:13px;
        width: 100%;
        overflow: hidden;
        color: #999;
        margin-top: 10px;
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
        color: #3f3f3f;
        font-family: 微软雅黑;
        font-size: 13px;
        margin: 0px 0px 10px 20px;
    }
    .top{
        padding: 10px;
        background: rgba(0, 140, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>