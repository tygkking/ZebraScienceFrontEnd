<template>
    <div class="page">
        <Menu mode="horizontal" :theme="theme1" active-name="1" style="width:100%; position: fixed">
            <a :href="index_url" style="float:left">
                <MenuItem name="1" :href="index_url">
                    <Icon type="ios-home" size="20"/>
                    首页
                </MenuItem>
            </a>
            <Submenu name="2" style="float:right">
                <template slot="title">
                    <Icon type="ios-contact" size="20"/>
                    用户信息
                </template>
                <MenuItem name="2-1" @click.native="userpage()">个人主页</MenuItem>
                <MenuItem name="2-2" @click.native="setting()">设置</MenuItem>
                <MenuItem name="2-3" @click.native="logout()">退出登录</MenuItem>
            </Submenu>
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
                index_url:'/',
                theme1: 'primary',
            }
        },
        methods:{
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