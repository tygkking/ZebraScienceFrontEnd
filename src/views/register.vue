<template>
    <div class="layout-content">
        <p style="font-size: 40px;">欢迎注册 Zebra Science</p>
        <div class="layout-content-main">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="用户名" prop="name" >
                    <Input v-model="formValidate.name" placeholder="请输入用户名" class="input-select-class"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="mail" >
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱" class="input-select-class" icon="ios-mail"></Input>
                    <Button type="primary" shape="circle">获取验证码</Button>
                </FormItem>
                <FormItem label="验证码" prop="code" >
                    <Input v-model="formValidate.code" placeholder="验证码" class="input-select-class"/>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="formValidate.password" placeholder="请输入长度不超过10的密码" class="input-select-class"/>
                </FormItem>
                <FormItem label="确认密码" prop="cpwd">
                    <Input type="password" v-model="formValidate.cpwd" placeholder="请再次输入密码" class="input-select-class"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
                    <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 6%" >重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    password:'',
                    cpwd: '',
                    code: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '验证码不能为空', trigger: 'blur' }
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
                            else if(value!==this.formValidate.password){
                                callback(new Error('两次输入密码不一致'))
                            }else{
                                callback()
                            }
                        },trigger:'blur'}
                    ]
                },
            }
        },
        methods: {
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

<style scoped>
    .layout-content{
        min-height: 480px;
        margin: 40px;
        padding-left: 30%;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .input-select-class {
        width: 200px;
        padding-bottom:5px;
    }
    .layout-content-main{
        padding: 40px;
    }
</style>
