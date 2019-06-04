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
    margin-bottom: 10px;
}

.professor-detail{
    margin-bottom: 30px;
}

.paper-detail{
    margin-top: 3px;
    margin-bottom: 10px;
    /*font-family: 华文中宋;*/
    font-size: 18px;
    border-bottom: dashed #8391a5 1px;
    padding-bottom: 10px;
}

.relevant-detail{
    font-size: 14px;
    margin-bottom: 6px;
    border-bottom: dashed #8391a5 1px;
    /*border-radius: 5px;*/
    padding: 3px;
    min-width: 30%;
}

</style>

<template>
    <div class="userpage">
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <Layout id="layout">
            <Content :style="{padding: '0 50px'}">
                <div class="user-intro">
                    <Row>
                        <Col span="5">
                            <div class="person-image" style="text-align: center">
                                <img src="../images/zebra.png" height="125px" style="margin: 5px; border-radius: 20%; padding: 3px; background-color: #fff; border: 1px solid rgba(0, 0, 0, 0.15);">
                                <br>
                                <Button v-if="identity != 'VISITOR'" icon="ios-heart" style="width: 90%; font-size: 14px" v-model="showlike" :class="{liked: isliked}" @click.native="toggle_like">
                                    {{showlike}}
                                </Button>
                            </div>
                        </Col>
                        <Col span="9">
                            <div class="person-detail" style="margin-left: 30px; margin-top: 20px">
                                <h2>{{userName}}<Tag color="orange" style="margin-left:20px">Scholar ID: {{profID}}</Tag></h2>
                                <br>
                                <h3>机构：{{organization}}</h3>
                                <br>
                                <h3 style="display: inline">领域：</h3> <h3 style="display: inline" v-for="item in field">{{item}}&nbsp</h3>
                                <br>
                                <br>
                                <h4>发表论文数：{{paper_num}}&nbsp&nbsp被引次数：{{ref_num}}</h4>
                            </div>
                        </Col>
                        <Col span="10">
                            <Netgraph :cop="coop_sch" :man="userName"></Netgraph>
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
                                    <li v-for="item in paper_items.slice((pageNum-1)*pageSize, pageNum*pageSize)">
                                        <div class="paper-detail">
                                            <a @click="to_paper(item.paperid)" target="_blank">
                                                {{ item.name }}
                                            </a>
                                            <br>
                                            <div style="font-size: 14px;">
                                                年份：{{ item.year }}
                                                &nbsp&nbsp&nbsp
                                                作者：<div style="display: inline" v-for="name in item.author">{{ name }}&nbsp&nbsp</div>
                                                <br>
                                                出处：{{ item.source_journal.name }}&nbsp{{item.source_journal.date}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <Page :current="pageNum" :total="got_paper_num" :page-size="pageSize" @on-change="change_page" simple style="text-align: center; margin-bottom: 20px"/>
                        </Col>
                        <Col span="8" offset="2">
                            <div class="relevant-info">
                                <div>
                                    <h3>合作学者</h3>
                                    <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">
                                        <li v-for="item in coop_sch">
                                            <div class="relevant-detail" @click="to_scholar(item.scid)" style="cursor:pointer; color: #2b85e4; width: fit-content">
                                                {{item.name}}&nbsp&nbsp合作次数：{{ item.count }}
                                                <br>
                                                {{ item.mechanism }}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <Divider dashed/>
<!--                                <div>-->
<!--                                    <h3>合作机构</h3>-->
<!--                                    <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px">-->
<!--                                    <li v-for="item in coop_org">-->
<!--                                        <div class="relevant-detail">-->
<!--                                            {{ item.message }}-->
<!--                                        </div>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                                </div>-->
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
    import MenuBar from './menuBar.vue'
    import Netgraph from './netgraph'
    export default {
        components:{
            MenuBar,
            Netgraph
        },
        name: 'professorDetails',
        data () {
            return {
                isliked: false,
                identity: this.GLOBAL.userType,
                showlike: '关注',
                userName: '姓名',
                profID: 'ProfID',
                organization: '机构',
                field: '领域',
                paper_num: 120,
                ref_num: 130,
                pageNum: 1,
                pageSize: 10,
                got_paper_num: 1,
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
            toggle_like (){
                let params = {'user_id':this.GLOBAL.email,'professor_id':this.profID}
                console.log(params)
                if(this.isliked){
                    this.$http.delete(this.GLOBAL.domain + "/api/v1/follow",{params: params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state == "fail"){
                                this.$Message.info(detail.reason);
                            }
                            else {
                                this.showlike = '关注';
                                this.isliked = !this.isliked;
                                this.refresh_user_info();
                            }
                    },function (res) {
                        alert(res);
                    })
                }
                else {
                    this.$http.get(this.GLOBAL.domain + "/api/v1/follow",{params: params})
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state == "fail"){
                                this.$Message.info(detail.reason);
                            }
                            else {
                                this.showlike = '已关注';
                                this.isliked = !this.isliked;
                                this.refresh_user_info();
                            }
                    },function (res) {
                        alert(res);
                    })
                }
            },
            to_scholar (id) {
                this.$router.push({
                    path: '/professorDetails',
                    query: {
                        profID: id
                    }
                })
                this.getProfessorDetails(this.$route.query.profID);
                this.checkFollowed(id);
            },
            to_paper (id) {
                this.$router.push({
                    path: '/paperDetails',
                    query: {
                        paperID: id
                    }
                })
            },
            getProfessorDetails (profID) {
                var that = this;
                console.log("get +" + profID);
                if(profID)
                {
                    this.$http.get(this.GLOBAL.domain + "/api/v1/professor_detail/" + profID)
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state == 'fail'){
                                this.$Message.error(detail.reason);
                                that.to_scholar(that.profID);
                                window.location.href='http://xueshu.baidu.com/scholarID/' + profID;
                            }
                            else{
                                that.userName = detail.msg.name;
                                that.profID = profID;
                                that.organization = detail.msg.mechanism;
                                that.field = detail.msg.field;
                                that.paper_num = detail.msg.resultsnumber;
                                that.ref_num = detail.msg.citedtimes;
                                that.coop_sch = detail.msg.copinfo;
                                that.paper_items = detail.msg.paper;
                                that.got_paper_num = detail.msg.paper.length;
                            }
                    },function (res) {
                        console.log(res)
                    })
                }
                else {
                    alert('No Such Professor');
                }
            },
            checkFollowed (nowprofID) {
                let params = {'user_id':this.GLOBAL.email,'professor_id':nowprofID}
                this.$http.post(this.GLOBAL.domain+"/api/v1/is_follow",params,{
                    headers:{
                        'Content-Type':"application/json",
                    }
                }).then(function(res){
                    var detail = JSON.parse(res.body);
                    console.log(detail);
                    if(detail.state=="fail"){
                        this.$Message.info(s["reason"]);
                    }
                    else if(detail.state=="no"){
                        this.isliked = false;
                        this.showlike = '关注';
                    }
                    else if(detail.state=="yes"){
                        this.isliked = true;
                        this.showlike = '已关注';
                    }
                })
            },
            change_page (value) {
                this.pageNum = value;
                console.log(this.pageNum);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
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
            },
        },
        created() {
            //判断是否关注
            console.log('sadasdasdas'+this.$route.query.profID);
            //this.profID = this.$route.query.profID;
            this.getProfessorDetails(this.$route.query.profID);
            this.checkFollowed(this.$route.query.profID);

            console.log(this.GLOBAL.userType + 'prof global')
        }
    }
</script>

<style scoped>

</style>
