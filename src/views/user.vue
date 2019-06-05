<style scoped>
.userpage{
    /*border: 1px solid #d7dde4;*/
    min-width: 700px;
    background-color: white;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.ivu-layout{
    background-color: white;
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
    border-bottom: dashed #8391a5 1px;
    padding-bottom: 10px;
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
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <Layout id="layout">
            <div v-if="identity == 'VISITOR'" style="width: 100%; text-align: center; height: 480px;">
                <h2 style="margin-top: 80px">您还未登录！<br> 无法查看个人主页</h2>
            </div>
            <Content v-else style="padding: 0 50px; min-height: 480px">
                <div class="user-intro">
                    <Row>
                        <Col span="5">
                            <div class="person-image" style="text-align: center">
                                <img :src=this.GLOBAL.avatar height="125px" style="margin: 5px; border-radius: 20%; padding: 3px; background-color: #fff; border: 1px solid rgba(0, 0, 0, 0.15);">
                                <br>
                                <Button v-if="identity == 'USER'" style="width: 90%; font-size: 14px" @click.native="applyfor">
                                    申请认证
                                </Button>
                            </div>
                        </Col>
                        <Col span="19">
                            <div class="person-detail" style="margin-left: 30px; padding: 30px; border-left: 1px dashed #8391a5">
                                <h2 style="font-family: 华文中宋; padding-left: 10px">{{this.GLOBAL.userName}}</h2>
                                <br>
                                <h3 style="font-family: 微软雅黑">邮箱：{{this.GLOBAL.email}}</h3>
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
                                <li v-for="item in my_paper_items.slice((pageNum_M-1)*pageSize, pageNum_M*pageSize)">
                                    <div class="paper-detail">
                                        <div @click="to_paper(item.paperid)" style="cursor:pointer; color: #2b85e4;">{{ item.name }}</div>
                                        <div style="font-size: 14px">
                                            年份：{{ item.year }}
                                            &nbsp
                                            作者：<div style="display: inline" v-for="(key, value) in item.author">{{ key }}&nbsp&nbsp</div>
                                            <br>
                                            出处：{{ item.source_journal.name }}&nbsp&nbsp{{ item.source_journal.date }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Page :current="pageNum_M" :total="my_paper_num" :page-size="pageSize" @on-change="change_page_M" simple style="text-align: center; margin-bottom: 20px"/>
                    </TabPane>
                    <TabPane label="我的收藏" name="name2">
                        <div class="paper-list">
                            <ul style="list-style-type:none">
                                <li v-for="item in star_paper_items.slice((pageNum_S-1)*pageSize, pageNum_S*pageSize)">
                                    <div class="paper-detail">
                                        <div @click="to_paper(item.paperid)" style="cursor:pointer; color: #2b85e4;">{{ item.name }}</div>
                                        <div style="font-size: 14px">
                                            年份：{{ item.year }}
                                            &nbsp
                                            作者：<div style="display: inline" v-for="(key, value) in item.author">{{ key }}&nbsp&nbsp</div>
                                            <br>
                                            出处：{{ item.source_journal.name }}&nbsp&nbsp{{ item.source_journal.date }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Page :current="pageNum_S" :total="star_paper_num" :page-size="pageSize" @on-change="change_page_S" simple style="text-align: center; margin-bottom: 20px"/>
                    </TabPane>
                    <TabPane label="我的关注" name="name3">
                        <div class="relevant-info">
                            <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px;">
                                <li v-for="item in like_sch" style="width:40%; float:left; margin-left: 20px; min-width: 320px">
                                    <div @click="to_scholar(item.scid)" style="cursor:pointer; margin:5px; padding: 5px; border: #2b85e4 solid 1px; border-radius: 5px; overflow: hidden">
                                        <Row>
                                            <Col span="9" style="text-align: center; overflow: hidden; white-space: nowrap; padding-top: 5px">
                                                <div class="relevant-detail">
                                                    <b>{{ item.name }}</b>
                                                </div>
                                                <Tag color="blue">ID:{{item.scid}}</Tag>

                                            </Col>
                                            <Col span="14" offset="1" style="font-size:13px; overflow: hidden; white-space: nowrap;">
                                                机构：{{item.mechanism}}<br>
                                                领域：<div style="display: inline" v-for="value in item.field">{{value}}&nbsp</div>
                                                <br>
                                                论文数量：{{item.resultsnumber}} &nbsp被引数量：{{item.citedtimes}}
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
                <router-link :to="{path:'/aboutUs'}" style="margin-left: 20px; color: #eeeeee">联系我们</router-link>            </Footer>
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
                pageNum_M: 1,
                pageNum_S: 1,
                pageSize: 10,
                // my_paper_items: [
                //     {
                //         name: 'This is Paper Title One This is Paper Title One This is Paper Title One This is Paper Title One',
                //         year: '2018',
                //         author: {'郭子溢':'1', '黎昆昌':'2', '许志达':'3', '何浩乾':'4'},
                //         source_journal: {
                //             name: 'This is Paper Source',
                //             date: 2018,
                //         }
                //     },
                //     {
                //         name: 'This is Paper Title One',
                //         year: '2018',
                //         author: {'郭子溢':'1', '黎昆昌':'2', '许志达':'3', '何浩乾':'4'},
                //         source_journal: {
                //             name: 'This is Paper Source',
                //             date: 2019,
                //         }
                //     },
                // ],
                my_paper_items: this.GLOBAL.paperList,
                my_paper_num: 0,
                star_paper_items: this.GLOBAL.collectList,
                star_paper_num: this.GLOBAL.collectList.length,
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
            to_paper (paperID) {
                this.$router.push({
                    path: '/paperDetails',
                    query:{paperID: paperID},
                })
            },
            change_page_S (value) {
                this.pageNum_S = value;
                console.log(this.pageNum_S);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            change_page_M (value) {
                this.pageNum_M = value;
                console.log(this.pageNum_M);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
        },
        created() {
            this.userName = this.GLOBAL.userName;
            this.email = this.GLOBAL.email;
            this.star_paper_items = this.GLOBAL.collectList;
            this.like_sch = this.GLOBAL.followList;
            this.my_paper_num = this.my_paper_items.length;
            console.log(this.my_paper_items.length)
        }
    }
</script>

<style scoped>

</style>