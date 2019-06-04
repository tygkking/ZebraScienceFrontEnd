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
                    <Button type="primary" shape="circle" @click="requ_ecode(formValidate.mail)">{{codeContent}}</Button>
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
                    <Button type="primary" @click="handleSubmit('formValidate',formValidate)" >提交</Button>
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
                codeContent:'获取验证码',
                codeCanclick:true,
                totalTime: 60,
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
            handleSubmit (name,f) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!')
                        let params = {'username':f.name,'email':f.mail,'password':f.password,'email_code':f.code}
                        this.$http.post(this.GLOBAL.domain + "/api/v1/register",params,{
                            headers:{
                                'Content-Type':"application/json",
                            }
                        }).then(function(res){
                            console.log(res);
                            var s = JSON.parse(res.body);
                            if(s["state"]=="fail"){
                                alert(s["reason"])
                            }
                            else {
                                alert("注册成功！");
                                this.$router.push({
                                    path: '/'
                                })
                            }
                        },function (res) {
                            console.log(res)
                        });
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            requ_ecode(mail){
                if(mail==='' || !this.codeCanclick) return;
                console.log(mail);
                var re=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(re.test(mail)) {
                    let params = {"email": mail};
                    //let params = {"email":this.formValidate.mail};
                    this.$http.post(this.GLOBAL.domain + "/api/v1/email_code", params, {
                        headers: {
                            'Content-Type': "application/json",
                        }
                    }).then(function (res) {
                        console.log(res);
                        this.$Message.success('发送成功!');
                        this.codeCanclick = false;
                        this.codeContent = this.totalTime + 's后可重新发送';
                        let clock = window.setInterval(() => {
                            this.totalTime--;
                            this.codeContent = this.totalTime + 's后重新发送';
                            if (this.totalTime < 0) {
                                window.clearInterval(clock);
                                this.codeContent = '重新发送验证码';
                                this.totalTime = 10;
                                this.codeCanclick = true
                            }
                        }, 1000)
                    }, function (res) {
                        console.log(res)
                        alert("发送验证码失败！")
                    });
                }
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
