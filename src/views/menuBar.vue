<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1" style="width:100%; position: fixed">
        <router-link :to="index_url" style="float:left">
            <MenuItem name="1">
                <Icon type="ios-home" size="20"/>
                首页
            </MenuItem>
        </router-link>
        <Submenu v-if="identity != 'VISITOR'" name="2" style="float:right">
            <template slot="title">
                <Icon type="ios-contact" size="20"/>
                {{this.GLOBAL.userName}}
            </template>
            <MenuItem name="2-1" @click.native="user_page()">个人主页</MenuItem>
            <MenuItem name="2-2" @click.native="news_page()">消息/通知</MenuItem>
            <MenuItem name="2-3" @click.native="setting()">设置</MenuItem>
            <MenuItem name="2-4" @click.native="logout()">退出登录</MenuItem>
        </Submenu>
        <MenuItem v-if="identity == 'VISITOR'" @click.native="modal1=true" name="3" style="float:right">
            登录
            <Modal v-model="modal1" title="登录" ok-text="登录" cancel-text="取消" @on-ok="login" @on-cancel="cancel" @keyup.enter.native="login">
                <p>邮箱<input v-model="email" type="email" style="margin-left: 17px"/></p><br/>
                <p>密码<input v-model="password" type="password" style="margin-left: 17px"/></p>
            </Modal>
        </MenuItem>
        <a :href="register_url" style="float: right;">
            <MenuItem v-if="identity == 'VISITOR'" :href="register_url" name="4">
                注册
            </MenuItem>
        </a>
    </Menu>
</template>

<script>
    export default {
        name: "MenuBar",
        props:{
            main:'',
            input:'',
        },
        data(){
            return{
                modal1: false,
                theme1: 'primary',
                index_url:'/',
                register_url:'/register',
                email: '',
                password: '',
                identity: this.GLOBAL.userType,
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
                        this.GLOBAL.setUserName(s["msg"]["username"]);
                        this.GLOBAL.setUserEmail(s["msg"]["email"]);
                        this.email = this.GLOBAL.email;
                        this.GLOBAL.setFollowList(s["msg"]["follow_list"]);
                        this.like_sch = this.GLOBAL.followList;
                        this.GLOBAL.setCollectList(s["msg"]["star_list"]);
                        this.star_paper_items = this.GLOBAL.collectList;
                        //console.log("hhhh"+this.GLOBAL.userName)

                        this.$emit('user')
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
                this.GLOBAL.setUserType('VISITOR');
                this.identity = this.GLOBAL.userType;
                this.$emit('visitor')
            },
        }
    }
</script>

<style scoped>

</style>
