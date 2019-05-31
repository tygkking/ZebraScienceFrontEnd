<template>
    <div class="page">
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <Layout id="layout">
                <div style="margin-left: 26%;width: 50%">
                    <h3 style="color: #06c;font-size: 26px;font-weight: bold;word-break: break-all">{{paper.name}}</h3>
                    <div class="dtl_l_content">
                        <div class="dtl_l_love_wr ">
                            <span>来自</span>
                            <a :href=paper.source_url[0]>{{paper.source_url[0]}}</a>
                            <p style="margin-top: 2%;color: #363e4f"> {{this.paper.source_journal.name}}&nbsp-&nbsp{{this.paper.source_journal.date}}</p>
                        </div>

                        <div class="dtl_l_love_auth_wr" >
                            <Row>
                                <Col span="2">
                                    <label style="width: 90px;color: #999999" >作者：</label>
                                </Col>
                                <Col span="22">
                                    <label @click="jump_man" v-for="(value, key) in paper.author" style="color: #2b85e4;font-size: 15px">{{key}}&nbsp;&nbsp;&nbsp;</label>
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
                                    <label v-for="word in paper.keyword" style="color: #2b85e4;font-size: 15px;word-break: break-all">{{word}}&nbsp;&nbsp;&nbsp;</label>
                                </Col>
                            </Row>
                            <!--<label style="width: 60px;color: #999999" >作者：</label>-->
                            <!--<label v-for="auth in paper.author" style="color: #2b85e4;font-size: 14px">{{auth}}&nbsp;&nbsp;&nbsp;</label>-->
                        </div>
                        <Button icon="ios-star" style="width: 20%; font-size: 14px;margin-left: 20%;margin-top: 7px" v-model="showlike" :class="{liked: isliked}" @click.native="toggle_like">
                            {{showlike}}</Button>
                        <Button icon="ios-text" style="width: 20%; font-size: 14px;margin-left: 10%;margin-top: 7px"
                                @click="add_comment"> 添加评论</Button>
                        <Modal v-model="modal2" title="添加评论" ok-text="确定" cancel-text="取消" @on-ok="sub_comment"
                               @on-cancel="cancel" >
                            <textarea v-model="content" placeholder="写下你的想法" style="margin-left: 4%;width:90%;height: 200px"/>
                        </Modal>
                    </div>
                </div>

            <div style="margin-left: 26%;margin-top: 25px; width: 55%">
                <h2 style="">评论</h2>
                <Divider style="height: 85%" />
                <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
                <div v-else >
                    <div  v-for="item in comment" >
                        <b style="color: #52c41a;font-size: 17px ">{{item.from.username}}
                            <span style="color: #999999;font-size: 12px">{{item.date}}</span>&nbsp&nbsp&nbsp
                            <Button type="text" shape="circle" icon="md-chatboxes" style="color: #999999" @click="add_reply"></Button>
                            <Modal v-model="modal3" title="添加评论" ok-text="确定" cancel-text="取消" @on-ok="reply_comment"
                                   @on-cancel="cancel" >
                                <textarea v-model="content" placeholder="写下你的想法" style="margin-left: 4%;width:90%;height: 200px"/>
                            </Modal>
                        </b>
                        <p class="commentColor">{{item.content}}</p>
                        <div v-if="item.replies.length>0">
                            <div style="margin-left: 20px" v-for="reply in item.replies">
                                <b style="color: #52c41a;font-size: 14px">{{reply.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.reviewers}}
                                    <span style="color: #999999">{{reply.time}}</span>&nbsp&nbsp
                                    <Button type="text" shape="circle" icon="md-chatboxes" style="color: #999999" @click="add_reply"></Button>
                                    <Modal v-model="modal3" title="添加评论" ok-text="确定" cancel-text="取消" @on-ok="reply_comment"
                                           @on-cancel="cancel" >
                                        <textarea v-model="content" placeholder="写下你的想法" style="margin-left: 4%;width:90%;height: 200px"/>
                                    </Modal>
                                </b>
                                <p class="commentColor">{{reply.content}}</p>
                            </div>
                        </div>
                        <Divider style="height: 85%" dash="true"/>
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
    import MenuBar from './menuBar.vue'
    export default {
        components:{
            MenuBar
        },
        name: "paperDetails",
        data(){
            return{
                commentData: [],
                modal2: false,
                modal3: false,
                identity:this.GLOBAL.userType,
                //identity:'EXPERT', //EXPERT USER VISITOR
                isliked: '',
                showlike: '',
                content:'',
                other_cmt:[],
                paper:{
                    paper_id:'13e8bab7244258710c462441e19afbad',
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
                    abstract:'大多数情况下,麻醉药物的选择对神经外科手术的过程和患者的转归并无决定性影响。深入理解CNS的' +
                        '生理学、神经生理学和麻醉药物对大脑的影响,掌握熟练的麻醉技术,才是决定神经外科手术患者转归的关键。'
                },
                comment:[
                    {
                        date:'2019-5-16',from:{username:"cxk",userid:"111@123.com"},
                        content:'你打篮球像我！',
                        replies: [{              //回复评论的信息，是一个数组，如果没内容就是一个空数组
                                responder: "xzd",    //评论者
                                reviewers: "cxk",         //被评论者
                                time: "2016-09-05",
                                content: "你写代码像蔡徐坤"
                            }]
                    },
                    {
                        date:'2019-5-15',from:{username:"xzd",userid:"111@12354.com"},
                        content:'你打篮球像cxk！',
                        replies:[],
                    },
                ]
            }
        },
        created() {
            this.paper.paper_id = this.$route.query.paperID;
            this.get_paperDetails(this.paper.paper_id);
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
                                this.isliked = !this.isliked
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
                            this.$Message.info("获取评论失败")
                        }
                        else{
                            this.comment = detail.msg;
                            console.log(this.comment)
                        }
                    }, function (res) {
                        alert(res);
                    });
            },
            add_comment(){
                console.log(this.identity);
                if(this.judge_login()==false)return;
                this.modal2 = true;
            },
            add_reply(){
                console.log(this.identity);
                if(this.judge_login()==false)return;
                this.modal3 = true;
            },
            sub_comment(){
                if(this.content=='')
                    return
                else {
                    console.log(this.paper.paper_id)
                    let params = {'from_email':this.GLOBAL.email,'paper_id':this.paper.paper_id,'content':this.content};
                    this.$http.get(this.GLOBAL.domain + "/api/v1/comment",{params:params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state=="fail"){
                                this.$Message.info("评论失败")
                            }
                        }, function (res) {
                            alert(res);
                        });
                }
            },
            reply_comment(){

            },
            jump_man(){
                this.$router.push({
                    name: 'search_detail',
                    query: {
                        search_detail: this.temp_detail,
                        search_type: 'prof'
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
         font-size: 15px;
         overflow: hidden;
         line-height: 15px;
         margin: 15px 0 12px;
         color: #999999;
     }
    .dtl_l_love_auth_wr{
        width: 100%;
        overflow: hidden;
        color: #999;
        margin-top: 2px;
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