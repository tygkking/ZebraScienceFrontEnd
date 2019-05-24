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
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 15px;
    margin-bottom: 3px;
}

.relevant-info{
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 40px;
}

</style>

<template>
    <div class="userpage">
        <MenuBar></MenuBar>
        <Layout id="layout">
            <Content :style="{padding: '0 50px'}">
                <div class="user-intro">
                    <Row>
                        <Col span="5">
                            <div class="person-image" style="text-align: center">
                                <img src="../images/zebra.png" height="100px" style="margin: 5px">
                                <br>
                                <Button v-if="identity == 'USER'" style="width: 90%; font-size: 14px" @click.native="applyfor">
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
<!--                                <h3>个人简介：{{introduction}}</h3>-->
                            </div>
                        </Col>
                    </Row>
                </div>
                <Tabs value="name2">
                    <TabPane label="我的论文" name="name1" v-if="identity=='EXPERT'">
                        <div class="paper-list">
                            <ul style="list-style-type:none">
                                <li v-for="item in my_paper_items">
                                    <div class="paper-detail">
                                        <a href="http://www.baidu.com" target="_blank">
                                            {{ item.paper_detail.title }}
                                        </a>
                                        <br>
                                        <div style="font-size: 14px">
                                            年份:{{ item.paper_detail.year }}
                                            &nbsp
                                            作者:{{ item.paper_detail.author }}
                                            <br>
                                            出处:{{ item.paper_detail.source }}
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
                                        <a href="http://www.baidu.com" target="_blank">
                                            {{ item.paper_detail.title }}
                                        </a>
                                        <br>
                                        <div style="font-size: 14px">
                                            年份:{{ item.paper_detail.year }}
                                            &nbsp
                                            作者:{{ item.paper_detail.author }}
                                            <br>
                                            出处:{{ item.paper_detail.source }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Page :current="1" :total="50" simple style="text-align: center; margin-bottom: 20px"/>
                    </TabPane>
                    <TabPane label="我的关注" name="name3">
                        <div class="relevant-info">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px;">
                                <li v-for="item in like_sch" style="width:40%; float:left; margin-left: 20px; min-width: 320px">
                                    <div @click="to_scholar(item.profID)" style="cursor:pointer; margin:5px; padding: 5px; border: #2b85e4 solid 1px; border-radius: 5px; overflow: hidden">
                                        <Row>
                                            <Col span="8" style="text-align: center; overflow: hidden; white-space: nowrap; padding-top: 5px">
                                                <div class="relevant-detail">
                                                    <b>{{ item.name }}</b>
                                                </div>
                                                <Tag color="blue">ID:{{item.profID}}</Tag>

                                            </Col>
                                            <Col span="15" offset="1" style="font-size:13px; overflow: hidden; white-space: nowrap;">
                                                机构：{{item.organization}}<br>
                                                领域：{{item.field}}<br>
                                                论文数量：{{item.paper_num}} &nbsp被引数量：{{item.ref_num}}
                                            </Col>
                                        </Row>
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
    import MenuBar from './menuBar.vue'
    export default {
        components:{
            MenuBar
        },
        name: 'user',
        data () {
            return {
                identity: this.GLOBAL.userType,
                userName: '姓名',
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
            applyfor () {
                this.$router.push({path: '/certify'})
            },
            to_scholar (profID) {
                //跳转到专家页面
                console.log('toProfID');
                this.$router.push({
                    path: '/professorDetails',
                    query:{profID:profID},
                })
            },
        },
        created() {
            this.userName = this.GLOBAL.userName;
            this.email = this.GLOBAL.email;
        }
    }
</script>

<style scoped>

</style>