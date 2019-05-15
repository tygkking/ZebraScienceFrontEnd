<template>
    <div class="page">
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
                    用户信息
                </template>
                <MenuItem name="2-1" @click.native="userpage()">个人主页</MenuItem>
                <MenuItem name="2-2" @click.native="setting()">设置</MenuItem>
                <MenuItem name="2-3" @click.native="logout()">退出登录</MenuItem>
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
            <Footer class="layout-footer-center" style="background-color: #666666; color: #eeeeee;">
                2019-2019 &copy; ZebraScience
                <a href="http://www.baidu.com" style="margin-left: 20px; color: #eeeeee">联系我们</a>
            </Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "paperDetails",
        data(){
            return{
                modal1: false,
                index_url:'/',
                register_url:'/register',
                identity:'professor', //professor user visitor
                theme1: 'primary',
            }
        },
        methods:{
            login () {
                this.$Message.info('login');
            },
            cancel () {
                this.$Message.info('cancel');
            },
            userpage () {
                alert("To user page")
            },
            setting () {
                alert('To Setting page')
            },
            logout () {
                alert('User Logout')
            }
        }
    }
</script>

<style scoped>
    .page{
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
</style>