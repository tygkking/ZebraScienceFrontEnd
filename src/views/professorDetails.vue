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

.liked{
    background-color: #2d8cf0;
    color: white;
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

.relevant-detail{
    font-size: 14px;
    margin-bottom: 3px;
}

</style>

<template>
    <div class="userpage">
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
            <Content :style="{padding: '0 50px'}">
                <div class="user-intro">
                    <Row>
                        <Col span="5">
                            <div class="person-image" style="text-align: center">
                                <img src="../images/zebra.png" height="100px" style="margin: 5px">
                                <br>
                                <Button icon="ios-heart" style="width: 90%; font-size: 14px" v-model="showlike" :class="{liked: isliked}" @click.native="toggle_like">
                                    {{showlike}}
                                </Button>
                            </div>
                        </Col>
                        <Col span="19">
                            <div class="person-detail" style="margin-left: 30px; margin-top: 20px">
                                <h2>{{userName}}<Tag color="orange" style="margin-left:20px">Scholar ID: {{profID}}</Tag></h2>
                                <br>
                                <h3>机构：{{organization}}</h3>
                                <br>
                                <h3>领域：{{field}}</h3>
                                <br>
                                <h4>发表论文数：{{paper_num}}&nbsp&nbsp被引次数：{{ref_num}}</h4>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Divider />
                <div class="professor-detail">
                    <Row>
                        <Col span="14">
                            <h3>论文列表</h3>
                            <div class="paper-list">
                                <ul style="list-style-type:none">
                                    <li v-for="item in paper_items">
                                        <div class="paper-detail">
                                            <a href="http://www.baidu.com" target="_blank">
                                                {{ item.paper_detail.title }}
                                            </a>
                                            <br>
                                            <div style="font-size: 14px">
                                                年份:{{ item.paper_detail.year }}
                                                &nbsp&nbsp&nbsp
                                                作者:{{ item.paper_detail.author }}
                                                <br>
                                                出处:{{ item.paper_detail.source }}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <Page :current="1" :total="50" simple style="text-align: center; margin-bottom: 20px"/>
                        </Col>
                        <Col span="8" offset="2">
                            <div class="relevant-info">
                                <div>
                                    <h3>合作学者</h3>
                                    <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                        <li v-for="item in coop_sch">
                                            <div class="relevant-detail" @click="to_scholar(item.message)" style="cursor:pointer; color: #2b85e4; width: fit-content">
                                                {{ item.message }}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <Divider dashed/>
                                <div>
                                    <h3>合作机构</h3>
                                    <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                    <li v-for="item in coop_org">
                                        <div class="relevant-detail">
                                            {{ item.message }}
                                        </div>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
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
        name: 'professorDetails',
        data () {
            return {
                modal1: false,
                index_url:'/',
                register_url:'/register',
                identity: this.GLOBAL.userType,
                //identity:'professor', //professor user visitor
                theme1: 'primary',
                isliked: false,
                showlike: '关注',
                userName: '姓名',
                profID: 'ProfID',
                organization: '机构',
                field: '领域',
                paper_num: 120,
                ref_num: 130,
                paper_items: [
                    {
                        paper_detail: {
                            title: 'This is Paper Title One This is Paper Title One This is Paper Title One This is Paper Title One',
                            year: '2018',
                            author: '郭子溢 黎昆昌 许志达 何浩乾 郭子溢 黎昆昌 许志达 何浩乾 郭子溢 黎昆昌 许志达 何浩乾',
                            source: 'This is Paper Source This is Paper Source This is Paper Source'
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
                coop_sch: [
                    { message: '郭子溢' },
                    { message: '黎昆昌' },
                    { message: '许志达' },
                    { message: '何浩乾' }
                ],
                coop_org: [
                    { message: '北大' },
                    { message: '清华' },
                    { message: '北航' },
                    { message: '北师' }
                ]
            }
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
                    this.showlike = '关注'
                }
                else {
                    this.showlike = '已关注'
                }
                this.isliked = !this.isliked
            },
            to_scholar (name) {
                this.$router.push({
                    name: 'search_detail',
                    query: {
                        search_detail: name,
                        search_type: 'prof'
                    }
                })
            },
        },
        created() {
            //判断是否关注
            console.log('sadasdasdas'+this.$route.query.profID);
            this.profID = this.$route.query.profID;
        }
    }
</script>

<style scoped>

</style>
