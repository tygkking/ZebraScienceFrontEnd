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
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="width:100%; position: fixed;">
            <a :href="index_url" style="float:left">
                <MenuItem name="1">
                    <Icon type="ios-home" size="20"/>
                    首页
                </MenuItem>
            </a>
            <Submenu v-if="identity != 'visitor'" name="2" style="float:right">
                <template slot="title">
                    <Icon type="ios-contact" size="20"/>
                    用户信息
                </template>
                <MenuItem name="2-1" @click.native="user_page()">个人主页</MenuItem>
                <MenuItem name="2-2" @click.native="news_page()">消息/通知</MenuItem>
                <MenuItem name="2-3" @click.native="setting()">设置</MenuItem>
                <MenuItem name="2-4" @click.native="logout()">退出登录</MenuItem>
            </Submenu>
            <MenuItem v-if="identity == 'visitor'" @click.native="modal1=true" name="3" style="float:right">
                登录
                <Modal v-model="modal1" title="登录" ok-text="登录" cancel-text="取消" @on-ok="login" @on-cancel="cancel">
                    <p>用户名<input style="margin-left: 8px"/></p><br/>
                    <p>密  码<input style="margin-left: 17px"/></p>
                </Modal>
            </MenuItem>
            <a :href="register_url" style="float: right;">
                <MenuItem v-if="identity == 'visitor'" :href="register_url" name="4">
                    注册
                </MenuItem>
            </a>
        </Menu>
        <div style="margin-top: 60px">
            <Row>
                <Col span="7">
                    <div v-show="false" class="user-intro" style="text-align: center; width: 100%; margin-top: 20px; margin-bottom: 20px;">
                        <div class="person-image" style="text-align: center">
                            <img src="../images/zebra.png" height="50px" style="margin: 5px">
                        </div>
                        <div class="person-detail">
                            用户名：{{username}}
                            <br>
                            邮箱：{{email}}
                            <br>
                            个人简介：{{introduction}}
                        </div>
                    </div>
                    <Menu :theme="theme3" active-name="1" style="padding-top: 20px">
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
                        <MenuItem name="4" @click.native="news_type = 'verify'" v-if="identity == 'admin'">
                            <Icon type="md-checkbox" />
                            认证信息
                        </MenuItem>
                    </Menu>
                </Col>
                <Col span="16" offset="1" style="padding-top: 30px; margin: 0px">
                    <div class="comments_news" v-if="news_type=='comments'">
                        <Button @click="delete_news" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>This is comments news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in comments_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Tag color="default" style="float: right;">{{ item.message.status }}</Tag>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="like_news" v-if="news_type=='like'">
                        <Button @click="delete_news" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>This is like news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in like_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Tag color="default" style="float: right;">{{ item.message.status }}</Tag>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="system_news" v-if="news_type=='system'">
                        <Button @click="delete_news" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>This is system news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in system_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Tag color="default" style="float: right;">{{ item.message.status }}</Tag>
                                    </div>
                                    <Divider dashed />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="verify_news" v-if="news_type=='verify'">
                        <Button @click="delete_news" style="float: right;">
                            清空
                        </Button>
                        <br>
                        <h3>This is verify news page</h3>
                        <div class="message-list">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in verify_news">
                                    <div class="relevant-detail">
                                        {{ item.message.text }}
                                        <Tag color="default" style="float: right;">{{ item.message.status }}</Tag>
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
    export default {
        name: "news",
        data () {
            return {
                modal1: false,
                index_url:'/',
                register_url:'/register',
                theme1: 'primary',
                theme3: 'light',
                identity: this.GLOBAL.userType,
                //identity:'admin', //professor user visitor admin
                news_type:'comments', //comments like system verify
                comments_news: [
                    {
                        message: {
                            text: 'message1',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message2',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message3',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message4',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message5',
                            status: '未查看',
                        }
                    },
                ],
                like_news: [
                    {
                        message: {
                            text: 'message1',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message2',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message3',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message4',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message5',
                            status: '已查看',
                        }
                    },
                ],
                system_news: [
                    {
                        message: {
                            text: 'message1',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message2',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message3',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message4',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message5',
                            status: '已查看',
                        }
                    },
                ],
                verify_news: [
                    {
                        message: {
                            text: 'message1',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message2',
                            status: '未查看',
                        }
                    },
                    {
                        message: {
                            text: 'message3',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message4',
                            status: '已查看',
                        }
                    },
                    {
                        message: {
                            text: 'message5',
                            status: '已查看',
                        }
                    },
                ],
            }
        },
        methods:{
            login () {
                this.$Message.info('login');
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
            delete_news () {
                alert('Delete ' + this.news_type + ' News')
            },
        }
    }
</script>

<style scoped>

</style>