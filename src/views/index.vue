<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 130px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 30px;
            p{
                width: 100%;
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
        #ftCon {
            width: 100%;
            height: 24px;
            line-height: 24px;
            text-align: center;
            z-index: 10;
            overflow: hidden;
            bottom: 0;
            position: absolute;
            background: #e9e9e9;
            color: #bbb;
            font-size: 13px;
        }
    }
</style>
<template>
    <div class="index">
        <Dropdown v-if="identity != 'visitor'" placement="bottom-start" style="margin-left: 90%; margin-top: 1%; font-size: 14px">
            <a style="color: black">
                <Icon type="ios-contact"></Icon>
                {{this.GLOBAL.userName}}
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list" style="font-size: 14px">
                <DropdownItem @click.native="user_page()">个人主页</DropdownItem>
                <DropdownItem @click.native="news_page()">消息/通知</DropdownItem>
                <DropdownItem @click.native="setting()">设置</DropdownItem>
                <DropdownItem @click.native="logout()">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <div v-else style="margin-left: 85%; margin-top:1%;">
            <Button type="text" @click="modal1=true" style="font-size: 15px; text-align: right; margin-right: 2%">登录</Button>
            <Modal v-model="modal1" title="登录" ok-text="登录" cancel-text="取消" @on-ok="login" @on-cancel="cancel">
                <p>邮箱<input v-model="email" type="email" style="margin-left: 17px"/></p><br/>
                <p>密码<input v-model="password" type="password" style="margin-left: 17px"/></p>
            </Modal>
            <Button type="text" @click="jump_register" style="font-size: 15px;">注册</Button>
        </div>
        <Row type="flex" justify="center" align="middle" style="height: 70%">
            <Col span="24" offset="">
                <h1>
                    <img src="../images/zebra.png">
                </h1>

                <h2>
                    <p>Welcome to Zebra Science!</p>
                </h2>
                <Input style="width: 50%; margin-left: 25%" v-model="search_content" @keyup.enter.native="search">
                    <Select v-model="search_item" slot="prepend" style="width: 80px;background-color: #eeeeee;color: black">
                        <Option value="prof">专家</Option>
                        <Option value="paper">论文</Option>
                        <Option value="org">机构</Option>
                    </Select>
                    <Button  @click="search"  slot="append" style="background-color:#57c5f7;color: white" icon="ios-search" ></Button>
                </Input>
            </Col>
        </Row>
        <a :href="professorDetails_url">专家详情</a>
        <a :href="user_url">个人主页</a>
        <a :href="paperDetails_url">论文详情</a>
        <a :href="news_url">消息界面</a>
        <a :href="certify_url">申请认证</a>
        <a :href="setting_url">信息设置</a>
        <div id="ftCon">
            2019-2019 &copy; ZebraScience
            <a href="http://www.baidu.com">联系我们</a>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                email: '',
                password: '',
                identity: this.GLOBAL.userType,
                search_item: '',
                search_content: '',
                temp_detail: [
                    {
                        name: '名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字',
                        detail: 'detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1',
                        img_url: ''
                    },
                    {
                        name: 'name2',
                        detail: 'detail2'
                    },
                    {
                        name: 'name3',
                        detail: 'detail3'
                    },
                    {
                        name: 'name1',
                        detail: 'detail1',
                        img_url: ''
                    },
                    {
                        name: 'name1',
                        detail: 'detail1',
                        img_url: ''
                    },
                    {
                        name: 'name1',
                        detail: 'detail1',
                        img_url: ''
                    },
                    {
                        name: 'name1',
                        detail: 'detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1detail1',
                        img_url: ''
                    },
                    {
                        name: 'name2',
                        detail: 'detail2'
                    },
                    {
                        name: 'name3',
                        detail: 'detail3'
                    },
                    {
                        name: 'name1',
                        detail: 'detail1',
                        img_url: ''
                    },
                    {
                        name: 'name1',
                        detail: 'detail1',
                        img_url: ''
                    },
                    {
                        name: 'name1',
                        detail: 'detail1',
                        img_url: ''
                    },
                ],
                search_content: '',
                professorDetails_url: '/professorDetails',
                user_url:'/user',
                paperDetails_url:'/paperDetails',
                news_url:'/news',
                certify_url:'/certify',
                setting_url:'/setting',
            }
        },
        methods: {
            login () {
                if (this.email === this.GLOBAL.email && this.password === this.GLOBAL.password) {
                    this.GLOBAL.setUserType('user');
                    this.identity = this.GLOBAL.userType;
                    this.$Message.info('成功登录');
                }
                else {
                    this.$Message.info('邮箱或密码错误');
                }
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
            jump_register(){
                this.$router.push({path: '/register'})
            },
            search() {
                if(this.search_content == "")
                    return;
                if (this.search_item=='prof')
                    alert("专家搜索："+this.search_content);
                else if (this.search_item=='paper')
                    alert("论文搜索："+this.search_content);
                else if (this.search_item=='org')
                    alert("机构搜索："+this.search_content);
                this.$router.push({
                    name: 'search_detail',
                    query: {
                        search_detail: this.temp_detail,
                        search_type: this.search_item
                    }
                })
            }
        }
    }
</script>
