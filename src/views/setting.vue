<template>
    <div>
        <MenuBar></MenuBar>
        <div class="certify-detail">
            <div v-if="identity == 'VISITOR'" style="width: 100%; text-align: center; height: 200px;">
                <h2 style="margin-top: 80px">您还未登录！<br> Zebra 请您登录</h2>
            </div>
            <Tabs value="name1" :animated="false" style="margin-top: 60px; width: 100%; text-align: center" v-show="identity != 'VISITOR'">
                <TabPane label="修改用户名" name="name1"  @click.native="handleReset ('change_pwd')">
                    <div class="layout-content-main">
                        <Form ref="change_name" :model="change_name" :rules="change_name_rule" :label-width="100">
                            <FormItem label="新用户名" prop="name">
                                <Input v-model="change_name.name" placeholder="请输入用户名" class="input-select-class"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('change_name')" >修改</Button>
                            </FormItem>
                        </Form>
                    </div>
                </TabPane>
                <TabPane label="修改密码" name="name2" @click.native="handleReset ('change_name')">
                    <div class="layout-content-main">
                        <Form ref="change_pwd" :model="change_pwd" :rules="change_pwd_rule" :label-width="100">
                            <FormItem label="旧密码" prop="old_password">
                                <Input type="password" v-model="change_pwd.old_password" placeholder="请输入旧密码" class="input-select-class"/>
                            </FormItem>
                            <FormItem label="新密码" prop="password">
                                <Input type="password" v-model="change_pwd.password" placeholder="请输入长度不超过10的新密码" class="input-select-class"/>
                            </FormItem>
                            <FormItem label="确认密码" prop="cpwd">
                                <Input type="password" v-model="change_pwd.cpwd" placeholder="请再次输入密码" class="input-select-class"/>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('change_pwd')" >提交</Button>
                                <Button type="primary" @click="handleReset('change_pwd')" style="margin-left: 6%" >重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </TabPane>
                <TabPane label="修改头像" name="name3" >
                        <div class="layout-content-main">
                            <img :src="previewImageSrc" alt="请上传头像" height="100px" style="margin: 5px">
                            <br/>
                            <input type="file" @change="displayImage" ref="fileInput">
                            <button @click="upload">上传</button>
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
    import MenuBar from './menuBar.vue'
    export default {
        components:{
            MenuBar
        },
        name: "setting",
        data () {
            return {
                previewImageSrc:'',
                userName:'',
                identity: this.GLOBAL.userType,
                //identity:'EXPERT', //EXPERT USER VISITOR
                old_pwd:'123',
                //change_pwd: false,
                change_name: {
                    name: '',
                },
                change_pwd: {
                    old_password: '',
                    password:'',
                    cpwd: '',
                },
                change_name_rule: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                },
                change_pwd_rule: {
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
                            else if(value!==this.change_pwd.password){
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
            handleSubmit (name) {
                console.log(this.GLOBAL.userName);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (name === 'change_name') {
                            console.log('if '+this.change_name.name);
                            this.GLOBAL.setUserName(this.change_name.name);
                            console.log('this is ' + this.GLOBAL.userName)
                        }
                        else if (name === 'change_pwd') {
                            console.log('else if')
                        }
                        else {
                            console.log('else')
                        }
                        this.$refs[name].resetFields()
                        this.$Message.success('提交成功!')
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            displayImage() {
                const file = this.$refs.fileInput.files[0]
                const fr = new FileReader()
                fr.onload = (e) => {
                    this.previewImageSrc = e.target.result
                }
                fr.readAsDataURL(file)
            },
            upload(){
                if(this.previewImageSrc=="")
                    return
                alert("cxk")
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