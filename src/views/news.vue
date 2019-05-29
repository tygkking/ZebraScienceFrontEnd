<style>
.news_page{
    /*border: 1px solid #d7dde4;*/
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
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'"></MenuBar>
        <div style="margin-top: 60px">
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
                    <Menu :theme="theme3" active-name="1" style="padding-top: 20px; max-width: 80%">
                        <MenuItem name="1" @click.native="news_type = 'comments'">
                            <Icon type="md-chatbubbles" />
                            评论
                        </MenuItem>
                        <MenuItem name="2" @click.native="news_type = 'like'">
                            <Icon type="md-heart" />
                            关注
                        </MenuItem>
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
                    <div>这是消息详情</div>
                    <div slot="footer">
                        <Button type="primary" size="large"  @click="check_news">确定</Button>
                    </div>
                </Modal>
                <Modal v-model="modal_verify" draggable scrollable title="认证详情">
                    <div style="margin: 0 0 10px 0">这是认证详情信息</div>
                    <Input type="textarea" placeholder="备注理由" class="input-select-class" :maxlength="140" :rows="4"/>
                    <div slot="footer">
                        <Button type="success" size="large"  @click="check_verify('Yes')">同意</Button>
                        <Button type="error" size="large"  @click="check_verify('No')">拒绝</Button>
                    </div>
                </Modal>
                <Col span="16" style="padding-top: 30px; margin: 0px">
                    <div class="comments_news" v-if="news_type=='comments'">
                        <Button @click="modal_clean=true" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>This is comments news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in comments_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Button type="error" size="small" style="float: right; margin-left: 5px" @click="modal_delete=true">删除</Button>
                                        <Button v-show="item.message.status == '已查看'" type="success" size="small" style="float:right;">已查看</Button>
                                        <Button v-show="item.message.status == '未查看'" type="info" size="small" style="float:right;" @click="modal_msg=true">未查看</Button>
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
                        <h3>This is like news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in like_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Button type="error" size="small" style="float: right; margin-left: 5px" @click="modal_delete=true">删除</Button>
                                        <Button v-show="item.message.status == '已查看'" type="success" size="small" style="float:right;">已查看</Button>
                                        <Button v-show="item.message.status == '未查看'" type="info" size="small" style="float:right;" @click="modal_msg=true">未查看</Button>
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
                        <h3>This is system news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in system_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Button type="error" size="small" style="float: right; margin-left: 5px" @click="modal_delete=true">删除</Button>
                                        <Button v-show="item.message.status == '已查看'" type="success" size="small" style="float:right;">已查看</Button>
                                        <Button v-show="item.message.status == '未查看'" type="info" size="small" style="float:right;" @click="modal_msg=true">未查看</Button>
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
                        <h3>This is verify news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in verify_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Button type="error" size="small" style="float: right; margin-left: 5px" @click="modal_delete=true">删除</Button>
                                        <Button v-show="item.message.status == '已查看'" type="success" size="small" style="float:right;">已查看</Button>
                                        <Button v-show="item.message.status == '未查看'" type="info" size="small" style="float:right;" @click="modal_verify=true">未查看</Button>
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
                    <a href="http://www.baidu.com" style="margin-left: 20px; color: #eeeeee">联系我们</a>
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
                theme3: 'light',
                identity: this.GLOBAL.userType,
                //identity:'ADMIN', //EXPERT USER visitor ADMIN
                news_type:'comments', //comments like system verify
                comments_news: [
                    {
                        message: {
                            id: 'c1',
                            text: 'message1',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 'c2',
                            text: 'message2',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 'c3',
                            text: 'message3',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 'c4',
                            text: 'message4',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 'c5',
                            text: 'message5',
                            status: '未查看',
                        }
                    },
                ],
                like_news: [
                    {
                        message: {
                            id: 'l1',
                            text: 'message1',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 'l2',
                            text: 'message2',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 'l3',
                            text: 'message3',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 'l4',
                            text: 'message4',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 'l5',
                            text: 'message5',
                            status: '已查看',
                        }
                    },
                ],
                system_news: [
                    {
                        message: {
                            id: 's1',
                            text: 'message1',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 's2',
                            text: 'message2',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 's3',
                            text: 'message3',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 's4',
                            text: 'message4',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 's5',
                            text: 'message5',
                            status: '已查看',
                        }
                    },
                ],
                verify_news: [
                    {
                        message: {
                            id: 'v1',
                            text: 'message1',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 'v2',
                            text: 'message2',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            id: 'v3',
                            text: 'message3',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 'v4',
                            text: 'message4',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            id: 'v5',
                            text: 'message5',
                            status: '已查看',
                        }
                    },
                ],
            }
        },
        methods:{
            check_news () {
                setTimeout(() => {
                    this.modal_msg = false;
                    this.$Message.success('已读该信息');
                }, 300);
            },
            check_verify (type) {
                if (type === 'Yes') {
                    setTimeout(() => {
                    this.modal_verify = false;
                    this.$Message.success('已同意该认证');
                }, 300);
                }
                else {
                    setTimeout(() => {
                    this.modal_verify = false;
                    this.$Message.error('已拒绝该认证');
                }, 300);
                }
            },
            delete_news () {
                setTimeout(() => {
                    this.modal_clean = false;
                    this.$Message.success('成功清空 '+ this.news_type + ' 信息');
                }, 300);
            },
            del () {
                setTimeout(() => {
                    this.modal_delete = false;
                    this.$Message.success('成功删除');
                }, 300);
            },
        },
        created() {
            this.$http.get(this.GLOBAL.domain + '/api/v1/get_sys_message',{params: {'email':this.GLOBAL.email}})
                .then(function (res) {
                    var detail = JSON.parse(res.body);
                    console.log(detail);
                    if(detail.state == 'fail'){
                        this.$Message.info('Fail，未查找到信息');
                    }
                    else{
                        console.log('Test' + detail);
                    }
                },function (res) {
                    console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>