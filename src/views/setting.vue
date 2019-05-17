<template>
    <div>
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
                    {{this.GLOBAL.username}}
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
        <div class="certify-detail">
            <div v-if="identity == 'visitor'" style="width: 100%; text-align: center; height: 200px;">
                <h2 style="margin-top: 80px">您还未登录！<br> 请登录后再申请认证</h2>
            </div>
            <Tabs value="name1" :animated="false" style="margin-top: 60px; width: 100%; text-align: center">
                <TabPane label="修改用户名" name="name1"  @click.native="handleReset ('formValidate2')">
                    <div class="layout-content-main">
                        <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="100">
                            <FormItem label="新用户名" prop="name">
                                <Input v-model="formValidate1.name" placeholder="请输入用户名" class="input-select-class"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formValidate1')" >修改</Button>
                            </FormItem>
                        </Form>
                    </div>
                </TabPane>
                <TabPane label="修改密码" name="name2" @click.native="handleReset ('formValidate1')">
                    <div class="layout-content-main">
                        <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
                            <FormItem label="旧密码" prop="old_password">
                                <Input type="password" v-model="formValidate2.old_password" placeholder="请输入旧密码" class="input-select-class"/>
                            </FormItem>
                            <FormItem label="新密码" prop="password">
                                <Input type="password" v-model="formValidate2.password" placeholder="请输入长度不超过10的新密码" class="input-select-class"/>
                            </FormItem>
                            <FormItem label="确认密码" prop="cpwd">
                                <Input type="password" v-model="formValidate2.cpwd" placeholder="请再次输入密码" class="input-select-class"/>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formValidate2')" >提交</Button>
                                <Button type="primary" @click="handleReset('formValidate2')" style="margin-left: 6%" >重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <Layout>
            <Footer class="layout-footer-center" style="background-color: #666666; color: #eeeeee;">
                2019-2019 &copy; ZebraScience
                <a href="http://www.baidu.com" style="margin-left: 20px; color: #eeeeee">联系我们</a>
            </Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "setting",
        data () {
            return {
                modal1: false,
                index_url:'/',
                register_url:'/register',
                theme1: 'primary',
                identity: this.GLOBAL.userType,
                //identity:'professor', //professor user visitor
                old_pwd:'123',
                change_pwd: false,
                formValidate1: {
                    name: '',
                },
                formValidate2: {
                    old_password: '',
                    password:'',
                    cpwd: '',
                },
                ruleValidate1: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                },
                ruleValidate2: {
                    old_password: [
                        { required: true, message: '旧密码不能为空', trigger: 'blur' },{
                        validator:(rule,value,callback)=>{
                            if(value===''){
                                callback(new Error('请输入旧密码'))
                            }
                            else if(value!==this.old_pwd){
                                console.log(this.old_pwd);
                                callback(new Error('旧密码输入错误'))
                            }else{
                                callback()
                            }
                        },trigger:'blur'}
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                    cpwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }, {
                        validator:(rule,value,callback)=>{
                            if(value===''){
                                callback(new Error('请再次输入密码'))
                            }
                            else if(value!==this.formValidate2.password){
                                callback(new Error('两次输入密码不一致'))
                            }else{
                                callback()
                            }
                        },trigger:'blur'}
                    ]
                },
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!')
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            }
        }
    }
</script>

<style>
    .certify-detail{
        padding-top: 60px;
        min-height: 480px;
        padding-left: 20%;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        width: 80%;
    }
    .input-select-class {
        width: 200px;
        padding-bottom:5px;
    }
    .layout-content-main{
        padding: 40px;
    }
</style>