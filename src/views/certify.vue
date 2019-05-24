<template>
    <div>
        <MenuBar></MenuBar>
        <div class="certify-detail">
            <div v-if="identity == 'VISITOR'" style="width: 100%; text-align: center; height: 200px;">
                <h2 style="margin-top: 80px">您还未登录！<br> 请登录后再申请认证</h2>
            </div>
            <div class="layout-content-main" v-show="identity == 'USER' || identity == 'ADMIN'">
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
     import MenuBar from './menuBar.vue'
     export default {
        components:{
            MenuBar
        },
        name: "certify",
        data () {
            return {
                identity: this.GLOBAL.userType,
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!')
                        //Error 暂时有错误
                        var form = this.formValidate;
                        let params = {'email':this.GLOBAL.email,'name':form.name,'ID_num':form.id_num,'field':form.field,'text':form.else_info};
                        this.$http.get(this.GLOBAL.domain + '/api/v1/certification',params,{
                            headers:{
                                'Content-Type':"application/json",
                            }
                        }).then(function (res) {
                                var detail = JSON.parse(res.body);
                                console.log(detail);
                            },function (res) {
                                var detail = JSON.parse(res.body);
                                console.log(detail);
                            })
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