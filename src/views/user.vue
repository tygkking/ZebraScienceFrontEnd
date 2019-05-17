<style scoped>
.userpage{
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

.user-intro{
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 60px;
}

.professor-detail{
    margin-bottom: 30px;
}

.paper-detail{
    margin-top: 10px;
    margin-bottom: 10px;
    /*font-family: 华文中宋;*/
    font-size: 18px;
}

.paper-list{
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 40px
}

.relevant-detail{
    font-size: 14px;
    margin-bottom: 3px;
}

.relevant-info{
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 40px
}

</style>

<template>
    <div class="userpage">
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="width:100%; position: fixed">
            <a :href="index_url" style="float:left">
                <MenuItem name="1">
                    <Icon type="ios-home" size="20"/>
                    首页
                </MenuItem>
            </a>
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
        <Layout id="layout">
            <Content :style="{padding: '0 50px'}">
                <div class="user-intro">
                    <Row>
                        <Col span="5">
                            <div class="person-image" style="text-align: center">
                                <img src="../images/zebra.png" height="100px" style="margin: 5px">
                                <br>
                                <Button v-if="identity == 'user'" style="width: 90%; font-size: 14px" @click.native="applyfor">
                                    申请认证
                                </Button>
                            </div>
                        </Col>
                        <Col span="19">
                            <div class="person-detail" style="margin-left: 30px; margin-top: 20px">
                                <h2>{{this.GLOBAL.userName}}</h2>
                                <br>
                                <h3>邮箱：{{this.GLOBAL.email}}</h3>
                                <br>
                                <h3>个人简介：{{introduction}}</h3>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Tabs value="name2">
                    <TabPane label="我的论文" name="name1" v-if="identity=='professor'">
                        <div class="paper-list">
                            <ul style="list-style-type:none">
                                <li v-for="item in my_paper_items">
                                    <div class="paper-detail">
                                        <a href="http://www.baidu.com">
                                            {{ item.paper_detail.title }}
                                        </a>
                                        <br>
                                        <div style="font-size: 14px">
                                            {{item.paper_detail.year }}
                                            {{ item.paper_detail.author }}
                                            {{ item.paper_detail.source }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Page :current="1" :total="50" simple style="text-align: center; margin-bottom: 20px"/>
                    </TabPane>
                    <TabPane label="我的收藏" name="name2">
                        <div class="paper-list">
                            <ul style="list-style-type:none">
                                <li v-for="item in star_paper_items">
                                    <div class="paper-detail">
                                        <a href="http://www.baidu.com">
                                            {{ item.paper_detail.title }}
                                        </a>
                                        <br>
                                        <div style="font-size: 14px">
                                            {{item.paper_detail.year }}
                                            {{ item.paper_detail.author }}
                                            {{ item.paper_detail.source }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Page :current="1" :total="50" simple style="text-align: center; margin-bottom: 20px"/>
                    </TabPane>
                    <TabPane label="我的关注" name="name3">
                        <div class="relevant-info">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                <li v-for="item in like_sch">
                                    <div class="relevant-detail">
                                        {{ item.message }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </TabPane>
                </Tabs>
            </Content>
            <Footer class="layout-footer-center" style="background-color: #666666; color: #eeeeee;">
                2019-2019 &copy; ZebraScience
                <a href="http://www.baidu.com" style="margin-left: 20px; color: #eeeeee">联系我们</a>
            </Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: 'user',
        data () {
            return {
                modal1: false,
                index_url:'/',
                register_url:'/register',
                theme1: 'primary',
                identity: this.GLOBAL.userType,
                //identity:'professor', //professor user visitor
                userName: '姓名',
                email: '邮箱',
                introduction: '个人简介',
                my_paper_items: [
                    {
                        paper_detail: {
                            title: 'This is Paper Title One',
                            year: '2018',
                            author: '郭子溢 黎昆昌 许志达 何浩乾',
                            source: 'This is Paper Source'
                        }
                    },
                    {
                        paper_detail: {
                            title: 'This is Paper Title One',
                            year: '2018',
                            author: '郭子溢 黎昆昌 许志达 何浩乾',
                            source: 'This is Paper Source'
                        }
                    },
                ],
                star_paper_items: this.GLOBAL.collectList,
                like_sch: this.GLOBAL.followList,
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
                this.$router.push({path: '/'})
            },
            applyfor () {
                this.$router.push({path: '/certify'})
            }
        }
    }
</script>

<style scoped>

</style>