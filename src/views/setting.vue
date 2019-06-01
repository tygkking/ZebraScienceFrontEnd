<template>
    <div>
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <div class="certify-detail">
            <div v-if="identity == 'VISITOR'" style="width: 100%; text-align: center; height: 200px;">
                <h2 style="margin-top: 80px">您还未登录！<br> Zebra 请您登录</h2>
            </div>
            <Tabs value="name2" :animated="false" style="margin-top: 60px; width: 100%; text-align: center" v-show="identity != 'VISITOR'">
                <TabPane label="修改用户名" name="name1"  @click.native="handleReset ('change_pwd')" v-if="identity != 'EXPERT'">
                    <div class="layout-content-main">
                        <Form ref="change_name" :model="change_name" :rules="change_name_rule" :label-width="100">
                            <FormItem label="新用户名" prop="name">
                                <Input v-model="change_name.name" placeholder="请输入用户名" class="input-select-class" onkeypress="if(event.keyCode == 13) return false;"></Input>
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
<!--                            <img :src="previewImageSrc" alt="请上传头像" height="100px" style="margin: 5px">-->
<!--                            <br/>-->
<!--                            <input type="file" @change="displayImage" ref="fileInput">-->
<!--                            <button @click="upload">上传</button>-->
<!--                            <a class="btn" @click="toggleShow">设置头像</a>-->
                            <my-upload field="img"
                                @crop-success="cropSuccess"
                                @crop-upload-success="cropUploadSuccess"
                                @crop-upload-fail="cropUploadFail"
                                v-model="show"
                                :width="150"
                                :height="150"
                                :url=this.upload_url
                                :params="params"
                                :headers="headers"
                                img-format="png"></my-upload>
                            <img :src="imgDataUrl" style="border-radius: 20%; padding: 3px; background-color: #fff; border: 1px solid rgba(0, 0, 0, 0.15);">
                            <br><br>
                            <Button @click="toggleShow">设置头像</Button>
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
    import myUpload from 'vue-image-crop-upload';
    export default {
        components:{
            MenuBar,
            'my-upload': myUpload,
        },
        name: "setting",
        data () {
            return {
                previewImageSrc:'',
                userName:'',
                identity: this.GLOBAL.userType,
                //identity:'EXPERT', //EXPERT USER VISITOR
                //old_pwd:'123',
                //change_pwd: false,
                show: false,
                upload_url: this.GLOBAL.domain + '/api/v1/upload_avatar',
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
                imgDataUrl: this.GLOBAL.avatar, // the datebase64 url of created image
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
                        { required: true, message: '旧密码不能为空', trigger: 'blur' }
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
                // console.log(name);
                console.log(this.GLOBAL.userName);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (name === 'change_name') {
                            console.log('if '+this.change_name.name);
                            // this.GLOBAL.setUserName(this.change_name.name);
                            // console.log('this is ' + this.GLOBAL.userName)
                            let params = {'user_id':this.GLOBAL.email, 'username':this.change_name.name}
                            this.$http.post(this.GLOBAL.domain + '/api/v1/information_change',params)
                                .then(function (res) {
                                    var detail = JSON.parse(res.body);
                                    console.log(detail);
                                    if(detail.state === 'success'){
                                        this.refresh_user_info();
                                        this.$Message.success('修改成功!');
                                    }
                                    else{
                                        this.$Message.error('修改失败!')
                                    }
                                },function (res) {
                                    console.log('Failed');
                                    var detail = JSON.parse(res.body);
                                    console.log(detail);
                                })
                        }
                        else if (name === 'change_pwd') {
                            console.log('else if')
                            let params = {'user_id':this.GLOBAL.email, 'old_password':this.change_pwd.old_password, 'new_password':this.change_pwd.password}
                            console.log(params);
                            this.$http.post(this.GLOBAL.domain + '/api/v1/password_change', params)
                                .then(function (res) {
                                    var detail = JSON.parse(res.body);
                                    console.log(detail);
                                    if(detail.state === 'fail'){
                                        this.$Message.error(detail.reason);
                                    }
                                    else{
                                        this.$Message.success(detail.reason);
                                    }
                                },function (res) {
                                    console.log('Failed');
                                    var detail = JSON.parse(res.body);
                                    console.log(detail);
                                })
                        }
                        else {
                            console.log('else')
                        }
                        this.$refs[name].resetFields()
                        // this.$Message.success('提交成功!')
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                if(this.identity !== 'EXPERT')
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
            },
            refresh_user_info () {
                this.$http.get(this.GLOBAL.domain + '/api/v1/user_detail/' + this.GLOBAL.email)
                    .then(function (res) {
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        this.GLOBAL.setUserName(detail.msg.username);
                        this.GLOBAL.setAvatar(detail.msg.avatar);
                    },function (res) {
                        console.log('Failed');
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                    })
            },
            toggleShow() {
				this.show = !this.show;
			},
            cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
            /**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
				var detail = JSON.parse(jsonData);
				console.log(detail.url);
				if(detail.state == 'success'){
				    let params = { 'user_id':this.GLOBAL.email, 'avatar':detail.url };
                    this.$http.post(this.GLOBAL.domain + '/api/v1/information_change',params)
                        .then(function (res) {
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                            if(detail.state === 'success'){
                                this.refresh_user_info();
                                this.show = !this.show;
                                this.$Message.success('修改成功!');
                            }
                            else{
                                this.$Message.error('修改失败!')
                            }
                        },function (res) {
                            console.log('Failed');
                            var detail = JSON.parse(res.body);
                            console.log(detail);
                        })
                }
				else{
				    this.$Message.error('服务器出错，上传失败')
                }
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			},
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