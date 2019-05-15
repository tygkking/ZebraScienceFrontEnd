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
                    用户信息
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
            <div class="layout-content-main">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="真实姓名" prop="name" >
                        <Input v-model="formValidate.name" placeholder="请输入真实名" class="input-select-class"></Input>
                    </FormItem>
                    <FormItem label="身份证号" prop="id_num" >
                        <Input v-model="formValidate.id_num" placeholder="请输入身份证号" class="input-select-class"></Input>
                    </FormItem>
                    <FormItem label="研究领域" prop="field" >
                        <Input v-model="formValidate.field" placeholder="研究领域" class="input-select-class"/>
                    </FormItem>
                    <FormItem label="所属机构" prop="organization">
                        <Input v-model="formValidate.organization" placeholder="所属机构" class="input-select-class"/>
                    </FormItem>
                    <FormItem label="备注" prop="else_info">
                        <Input type="textarea" v-model="formValidate.else_info" placeholder="备注信息" class="input-select-class" :maxlength="140" :rows="6"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 6%">提交</Button>
                        <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 6%" >重置</Button>
                    </FormItem>
                </Form>
            </div>
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
        name: "certify",
        data () {
            return {
                modal1: false,
                index_url:'/',
                register_url:'/register',
                theme1: 'primary',
                identity:'professor', //professor user visitor
                formValidate: {
                    name: '',
                    id_num: '',
                    field:'',
                    organization: '',
                    else_info: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                    ],
                    id_num: [
                        { required: true, message: '身份证号码不能为空', trigger: 'blur' },
                    ],
                    field: [
                        { required: true, message: '研究领域不能为空', trigger: 'blur' }
                    ],
                    organization: [
                        { required: true, message: '所属机构不能为空', trigger: 'blur' },
                    ],
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
                alert('To Setting page')
            },
            logout () {
                this.identity = 'visitor';
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
        padding-left: 25%;
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