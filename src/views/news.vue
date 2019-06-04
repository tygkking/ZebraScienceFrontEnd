<style>
.news_page{
    /*border: 1px solid #d7dde4;*/
    min-width: 700px;
    background-color: white;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
#layout{
    margin-top: 60px;
}

.layout-footer-center{
    text-align: center;
}

.message-list{
    margin-top: 30px;
}
</style>

<template>
    <div class="news_page">
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <div v-if="identity == 'VISITOR'" style="width: 100%; text-align: center; height: 200px;">
            <h2 style="margin-top: 100px">您还未登录！<br> 无法查看消息页面</h2>
        </div>
        <div v-else style="margin-top: 60px">
            <Row>
                <Col span="7">
                    <div v-show="false" class="user-intro" style="text-align: center; width: 100%; margin-top: 20px; margin-bottom: 20px;">
                        <div class="person-image" style="text-align: center">
                            <img src="../images/zebra.png" height="50px" style="margin: 5px">
                        </div>
                        <div class="person-detail">
                            用户名：{{this.GLOBAL.userName}}
                            <br>
                            邮箱：{{this.GLOBAL.email}}
                        </div>
                    </div>
                    <Menu :theme="theme3" active-name="1" style="padding-top: 20px; max-width: 80%; z-index: 0">
                        <MenuItem name="1" @click.native="news_type = 'comments'">
                            <Icon type="md-chatbubbles" />
                            评论
                        </MenuItem>
<!--                        <MenuItem name="2" @click.native="news_type = 'like'">-->
<!--                            <Icon type="md-heart" />-->
<!--                            关注-->
<!--                        </MenuItem>-->
                        <MenuItem name="3" @click.native="news_type = 'system'">
                            <Icon type="md-alert" />
                            系统通知
                        </MenuItem>
                        <MenuItem name="4" @click.native="news_type = 'verify'" v-if="identity == 'ADMIN'">
                            <Icon type="md-checkbox" />
                            认证信息
                        </MenuItem>
                    </Menu>
                </Col>
                <Modal v-model="modal_delete" width="240">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="ios-information-circle"></Icon>
                        <span>删除确认</span>
                    </p>
                    <div style="text-align:center">
                        <p style="font-size: 16px">您是否要删除该信息</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long  @click="del">删除</Button>
                    </div>
                </Modal>
                <Modal v-model="modal_clean" width="240">
                    <p slot="header" style="color:#2baee9;text-align:center">
                        <Icon type="ios-information-circle"></Icon>
                        <span>清空确认</span>
                    </p>
                    <div style="text-align:center">
                        <p style="font-size: 16px">您是否要清空该页面所有信息</p>
                    </div>
                    <div slot="footer">
                        <Button type="warning" size="large" long  @click="delete_news">清空</Button>
                    </div>
                </Modal>
                <Modal v-model="modal_msg" draggable scrollable title="消息详情">
                    <div style="font-size: 13px; margin: 10px;">
                        {{news_detail}}
                    </div>
                    <div slot="footer">
                        <Button type="primary" size="large"  @click="check_news">确定</Button>
                    </div>
                </Modal>
                <Modal v-model="modal_verify" draggable scrollable title="申请人详细信息">
                    <div v-model="apply_msg" style="font-size: 14px">
                        <Row>
                            <Col span="8" style="text-align: right">
                                姓名：<br>
                                Email：<br>
                                绑定ScholarID：<br>
                                身份证号：<br>
                                专家领域：<br>
                                备注：<br>
                                申请日期：<br>
                                申请状态：<br>
                            </Col>
                            <Col span="16">
                                {{ apply_msg.name }} <br>
                                {{ apply_msg.email }} <br>
                                {{ apply_msg.scid }} <br>
                                {{ apply_msg.ID }} <br>
                                {{ apply_msg.field }} <br>
                                {{ apply_msg.text }} <br>
                                {{ apply_msg.date }} <br>
                                {{ apply_msg.state }}<br>
                            </Col>
                        </Row>
                    </div>
                    <div slot="footer">
                        <Button type="success" size="large" :disabled="apply_msg.state!=='waiting'" @click="check_verify('Yes')">同意</Button>
                        <Button type="error" size="large" :disabled="apply_msg.state!=='waiting'" @click="check_verify('No')">拒绝</Button>
                    </div>
                </Modal>
                <Col span="16" style="padding-top: 30px; margin: 0px; min-height: 470px">
                    <div class="comments_news" v-if="news_type=='comments'">
                        <Button @click="modal_clean=true" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>评论消息页</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in comments_news">
                                    <div class="relevant-detail">
                                        <Row>
                                            <Col span="19">
                                                {{ item.content }}
                                                <div style="display: inline; color: #8391a5; font-size: 12px; margin-left: 10px; float: right">{{ item.date }}</div>
                                            </Col>
                                            <Col span="5">
                                                <Button type="error" size="small" style="float: right; margin-left: 5px" @click="show_del_modal(item.msg_id)">删除</Button>
                                                <Button v-show="item.status == 'Yes'" type="success" size="small" style="float:right;">已查看</Button>
                                                <Button v-show="item.status == 'No'" type="info" size="small" style="float:right;" @click="show_msg_modal(item.content, item.msg_id)">未查看</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="like_news" v-if="news_type=='like'">
                        <Button @click="modal_clean=true" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>关注消息页</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in like_news">
                                    <div class="relevant-detail">
                                        <Row>
                                            <Col span="19">
                                                {{ item.content }}
                                                <div style="display: inline; color: #8391a5; font-size: 12px; margin-left: 10px; float: right">{{ item.date }}</div>
                                            </Col>
                                            <Col span="5">
                                                <Button type="error" size="small" style="float: right; margin-left: 5px" @click="show_del_modal(item.msg_id)">删除</Button>
                                                <Button v-show="item.status == 'Yes'" type="success" size="small" style="float:right;">已查看</Button>
                                                <Button v-show="item.status == 'No'" type="info" size="small" style="float:right;" @click="show_msg_modal(item.content, item.msg_id)">未查看</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="system_news" v-if="news_type=='system'">
                        <Button @click="modal_clean=true" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>系统消息页</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in system_news">
                                    <div class="relevant-detail">
                                        <Row>
                                            <Col span="19">
                                                {{ item.content }}
                                                <div style="display: inline; color: #8391a5; font-size: 12px; margin-left: 10px; float: right">{{ item.date }}</div>
                                            </Col>
                                            <Col span="5">
                                                <Button type="error" size="small" style="float: right; margin-left: 5px" @click="show_del_modal(item.msg_id)">删除</Button>
                                                <Button v-show="item.status == 'Yes'" type="success" size="small" style="float:right;">已查看</Button>
                                                <Button v-show="item.status == 'No'" type="info" size="small" style="float:right;" @click="show_msg_modal(item.content, item.msg_id)">未查看</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="verify_news" v-if="news_type=='verify'">
                        <Button @click="modal_clean=true" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>认证消息页</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in verify_news">
                                    <div class="relevant-detail">
                                        <Row>
                                            <Col span="19">
                                                {{ item.content }}
                                                <div style="display: inline; color: #8391a5; font-size: 12px; margin-left: 10px; float: right">{{ item.date }}</div>
                                            </Col>
                                            <Col span="5">
                                                <Button type="error" size="small" style="float: right; margin-left: 5px" @click="show_del_modal(item.msg_id)">删除</Button>
                                                <Button v-show="item.status == 'Yes'" type="success" size="small" style="float:right;" @click="show_verify_modal(item.apply_id, item.msg_id, item.status)">已查看</Button>
                                                <Button v-show="item.status == 'No'" type="info" size="small" style="float:right;" @click="show_verify_modal(item.apply_id, item.msg_id, item.status)">未查看</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
            <Layout id="layout">
                <Footer class="layout-footer-center" style="background-color: #666666; color: #eeeeee;">
                    2019-2019 &copy; ZebraScience
                    <router-link :to="{path:'/aboutUs'}" style="margin-left: 20px; color: #eeeeee">联系我们</router-link>
                </Footer>
            </Layout>
        </div>
    </div>
</template>

<script>
    import MenuBar from './menuBar.vue'
    export default {
        components:{
            MenuBar
        },
        name: "news",
        data () {
            return {
                modal_delete: false,
                modal_clean: false,
                modal_msg: false,
                modal_verify: false,

                del_msg_id: '',
                del_msg_type: '',
                apply_id: '',

                news_detail: '',
                news_id: '',

                theme3: 'light',
                identity: this.GLOBAL.userType,
                //identity:'ADMIN', //EXPERT USER visitor ADMIN
                news_type:'comments', //comments like system verify
                comments_news: [
                    // {
                    //     msg_id: 'c1',
                    //     content: 'message1',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'c2',
                    //     content: 'message2',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'c3',
                    //     content: 'message3',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'c4',
                    //     content: 'message4',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'c5',
                    //     content: 'message5',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                ],
                like_news: [
                    // {
                    //     msg_id: 'l1',
                    //     content: 'message1',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'l2',
                    //     content: 'message2',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'l3',
                    //     content: 'message3',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'l4',
                    //     content: 'message4',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 'l5',
                    //     content: 'message5',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                ],
                system_news: [
                    // {
                    //     msg_id: 's1',
                    //     content: 'message1',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 's2',
                    //     content: 'message2',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 's3',
                    //     content: 'message3',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 's4',
                    //     content: 'message4',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                    // {
                    //     msg_id: 's5',
                    //     content: 'message5',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    // },
                ],
                verify_news: [
                    // {
                    //     msg_id: 'v1',
                    //     content: 'message1',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    //     apply_id: '5cf37fdc9c89e67433cbbea4',
                    // },
                    // {
                    //     msg_id: 'v2',
                    //     content: 'message2',
                    //     status: 'No',
                    //     date: '2019-6-2 15:31:28',
                    //     apply_id: '',
                    // },
                    // {
                    //     msg_id: 'v3',
                    //     content: 'message3',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    //     apply_id: '',
                    // },
                    // {
                    //     msg_id: 'v4',
                    //     content: 'message4',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    //     apply_id: '',
                    // },
                    // {
                    //     msg_id: 'v5',
                    //     content: 'message5',
                    //     status: 'Yes',
                    //     date: '2019-6-2 15:31:28',
                    //     apply_id: '',
                    // },
                ],
                apply_msg:[],
            }
        },
        methods:{
            check_news () {
                this.change_news_status (this.news_id);
                setTimeout(() => {
                    this.modal_msg = false;
                    this.$Message.success('已读该信息');
                }, 300);
            },
            show_msg_modal (content, id) {
                this.modal_msg = true;
                this.news_detail = content;
                this.news_id = id;
            },
            show_verify_modal (apply_id, msg_id, status){
                this.modal_verify = true;
                this.apply_id = apply_id;
                console.log('apply_id '+apply_id);
                this.$http.get(this.GLOBAL.domain + '/api/v1/get_apply',{params: {'apply_id': this.apply_id}})
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        if(detail.state == 'fail'){
                            this.$Message.info('Fail，未查找到信息');
                        }
                        else{
                            this.apply_msg = detail.msg;
                            console.log('msg_id '+msg_id);
                            if(status == 'No')
                                this.change_news_status(msg_id);
                        }
                    })
            },
            check_verify (type) {
                if (type === 'Yes') {
                    console.log("YES");
                    let params = {'apply_id':this.apply_id,'deal':true};
                    console.log(params);
                    this.$http.get(this.GLOBAL.domain + '/api/v1/deal_certification',{params: params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state == 'success'){
                                setTimeout(() => {
                                    this.modal_verify = false;
                                    this.$Message.success('已同意该认证');
                                }, 300);
                            }
                            else{
                                this.modal_verify = false;
                                this.$Message.error(detail.reasons);
                            }
                        },function (res) {
                            var detail = JSON.parse(res.body);
                            console.log('Failed');
                            console.log(detail);
                        })
                }
                else {
                    console.log("NO");
                    let params = {'apply_id':this.apply_id,'deal':false};
                    console.log(params);
                    this.$http.get(this.GLOBAL.domain + '/api/v1/deal_certification',{params: params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state == 'success'){
                                setTimeout(() => {
                                    this.modal_verify = false;
                                    this.$Message.success('已拒绝该认证');
                                }, 300);
                            }
                            else{
                                this.modal_verify = false;
                                this.$Message.error(detail.reasons);
                            }
                        },function (res) {
                            var detail = JSON.parse(res.body);
                            console.log('Failed');
                            console.log(detail);
                        })
                }
            },
            delete_news () {
                var type;
                switch (this.news_type){
                    case 'comments':
                        type = 'REPLY';
                        break;
                    case 'like':
                        type = 'LIKE';
                        break;
                    case 'system':
                        type = 'SYSTEM';
                        break;
                    case 'verify':
                        type = 'APPLY';
                        break;
                }
                let params = {'user_id':this.GLOBAL.email, 'message_type': type};
                this.$http.post(this.GLOBAL.domain + '/api/v1/delete_message', params)
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        if(detail.state == 'success'){
                            this.refresh_news();
                            setTimeout(() => {
                                this.modal_clean = false;
                                this.$Message.success('成功清空 '+ this.news_type + ' 信息');
                            }, 300);
                        }
                        else{
                            this.modal_clean = false;
                            this.$Message.error('出现错误，清空失败');
                        }
                    },function (res) {
                        var detail = JSON.parse(res.body);
                        console.log("Failed");
                        console.log(detail);
                    })
            },
            show_del_modal (msg_id) {
                this.modal_delete = true;
                this.del_msg_id = msg_id;
                console.log(this.del_msg_id);
            },
            del () {
                let params = {'user_id':this.GLOBAL.email, 'message_id': this.del_msg_id};
                this.$http.post(this.GLOBAL.domain + '/api/v1/delete_message', params)
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        if(detail.state == 'success'){
                            this.refresh_news();
                            setTimeout(() => {
                                this.modal_delete = false;
                                this.$Message.success('成功删除');
                            }, 300);
                        }
                        else{
                            this.modal_delete = false;
                            this.$Message.error('出现错误，删除失败');
                        }
                    },function (res) {
                        console.log("Failed");
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                    })
            },
            change_news_status (id) {
                console.log(id);
                let params = {'msg_id':id};
                this.$http.get(this.GLOBAL.domain + '/api/v1/change_message_status',{params:params})
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        if(detail.state == 'success'){
                            console.log('success');
                            this.refresh_news();
                        }
                        else{
                            this.$Message.error(detail.reason);
                        }

                    },function (res) {
                        var detail = JSON.parse(res.body);
                        console.log("Failed");
                        console.log(detail);
                    })
            },
            refresh_news () {
                var all_news = [];
                this.verify_news = [];
                this.system_news = [];
                this.comments_news = [];
                this.like_news = [];
                this.$http.get(this.GLOBAL.domain + '/api/v1/get_sys_message',{params: {'email':this.GLOBAL.email}})
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        console.log(detail.messages);
                        // console.log(this.verify_news);
                        // console.log(this.system_news);
                        if(detail.state == 'fail'){
                            this.$Message.info('未查找到信息');
                        }
                        else{
                            // console.log('Test' + detail);
                            all_news = detail.messages;
                            for (let news of all_news){
                                // console.log(news);
                                switch (news.type){
                                    case 'APPLY':
                                        this.verify_news.unshift(news);
                                        break;
                                    case 'SYSTEM':
                                        this.system_news.unshift(news);
                                        break;
                                    case 'REPLY':
                                        this.comments_news.unshift(news);
                                        break;
                                    case 'APPLYRESULT':
                                        this.system_news.unshift(news);
                                    default:
                                        break;
                                }
                            }
                            console.log(this.verify_news);
                            console.log(this.system_news);
                        }
                    },function (res) {
                        console.log(res);
                })
            },
        },
        created() {
            this.refresh_news();
        }
    }
</script>

<style scoped>

</style>