<template>
    <div>
        <MenuBar  v-on:user="identity = 'USER'" v-on:visitor="identity = 'VISITOR'" v-on:expert="identity = 'EXPERT'" v-on:admin="identity = 'ADMIN'"></MenuBar>
        <Modal v-model="modal1" cancel-text="取消" @on-cancel="check_ok" draggable scrollable title="发送申请成功">
            <h3>您已成功发送申请，请耐心等待管理员审核</h3>
            <div slot="footer">
                <Button type="primary"  @click="check_ok">确定</Button>
            </div>
        </Modal>
        <Layout>
            <Content>
                <div v-show=same_name class="same-name-expert">
                    <h2 style="margin-left: 30%">{{showedMessage}}</h2>
                    <ul style="list-style-type:none; margin-left: 5px; margin-top: 5px;">
                        <li v-for="item in same_name_sch" style="width:40%; float:left; margin-left: 20px; min-width: 320px">
                                <div onmouseover="this.style.background = '#e7e7e7'" onmouseout="this.style.background = '#f5f7f9'" @click="confirm_prof_id(item.scid)" style="cursor:pointer; margin:5px; padding: 5px; border: #2b85e4 solid 1px; border-radius: 5px; overflow: hidden">
                                    <Row>
                                        <Col span="9" style="text-align: center; overflow: hidden; white-space: nowrap; padding-top: 5px">
                                            <div class="relevant-detail">
                                                <b>{{ item.name }}</b>
                                            </div>
                                            <Tag color="blue">ID:{{item.scid}}</Tag>

                                        </Col>
                                        <Col span="14" offset="1" style="font-size:13px; overflow: hidden; white-space: nowrap;">
                                            机构：{{item.mechanism}}<br>
                                            领域：<div style="display: inline" v-for="value in item.field">{{value}}&nbsp</div>
                                            <br>
                                            论文数量：{{item.resultsnumber}} &nbsp被引数量：{{item.citedtimes}}
                                        </Col>
                                    </Row>
                                </div>
                        </li>
                    </ul>
                </div>
                <div class="certify-detail" style="background: #f5f7f9;">
                    <div v-if="identity == 'VISITOR'" style="width: 100%; text-align: center;">
                        <h2 style="margin-top: 80px">您还未登录！<br> 请登录后再申请认证</h2>
                    </div>
                    <div class="layout-content-main" v-show="(identity == 'USER' || identity == 'ADMIN') && same_name == false">
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
            </Content>
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
                same_name: false,
                modal1: false,
                profID: '',
                showedMessage: '正在检测同名专家...',
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
                same_name_sch: '',
            }
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        console.log(this.formValidate.name);
                        //获取同名专家列表
                        // this.$http.get(this.GLOBAL.domain + '/api/v1/common_name', {params:{'professor_name':this.formValidate.name}})
                        //     .then(function (res) {
                        //         var detail = JSON.parse(res);
                        //         console.log(detail);
                        //         this.same_name = true;
                        //     },function (res) {
                        //         console.log('Failed');
                        //     });
                        this.same_name = true;
                        this.$http.get(this.GLOBAL.domain + '/api/v1/search_professor/' + this.formValidate.name)
                            .then(function (res) {
                                //this.same_name = true;
                                var detail = JSON.parse(res.body);
                                if(detail.state === 'fail'){
                                    this.showedMessage = detail.reason;
                                }
                                else{
                                    this.same_name_sch = detail.msg;
                                    this.showedMessage = '检测到同名专家，请选择您是哪一位';
                                }
                                console.log(detail);
                            },function (res) {
                                console.log('Failed');
                                var detail = JSON.parse(res.body);
                                console.log(detail);
                                this.$Message.info(detail);
                            })
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            confirm_prof_id (id) {
                this.profID = id;
                console.log(id);
                var form = this.formValidate;
                let params = {'email':this.GLOBAL.email,'name':form.name,'ID_num':form.id_num,'field':form.field,'text':form.else_info,'scid':id};
                console.log(params);
                this.$http.get(this.GLOBAL.domain + '/api/v1/certification',{params:params})
                    .then(function (res) {
                        console.log('SuccessFFF');
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                        if(detail.state == 'fail'){
                            this.$Message.error(detail.reason);
                        }
                        else{
                            this.modal1 = true;
                        }
                    },function (res) {
                        console.log("Failed");
                        var detail = JSON.parse(res.body);
                        console.log(detail);
                    })
            },
            check_ok () {
                setTimeout(() => {
                    this.modal1 = false;
                    this.$Message.success('成功提交申请');
                }, 300);
                this.$router.push({
                    path: '/user'
                })
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
        border-radius: 4px;
        background: #f5f7f9;
        width: 80%;
    }
    .input-select-class {
        width: 200px;
        padding-bottom:5px;
    }
    .layout-content-main{
        padding: 40px;
    }
    .same-name-expert{
        padding-top: 80px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 40px;
        padding-bottom: 40px;
    }
    .relevant-detail{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 15px;
        margin-bottom: 3px;
    }
</style>
