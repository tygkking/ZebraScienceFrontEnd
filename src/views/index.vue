<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 130px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 30px;
            p{
                width: 100%;
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Button type="text" @click="modal1=true" style="margin-left: 89%;font-size: 15px;text-align: right">登陆</Button>
        <Modal v-model="modal1" title="登录" ok-text="登录" cancel-text="取消" @on-ok="login" @on-cancel="cancel">
            <p>用户名<input style="margin-left: 8px"/></p><br/>
            <p>密  码<input style="margin-left: 17px"/></p>
        </Modal>
        <Button type="text" @click="jump_register" style="font-size: 15px;">注册</Button>
        <Row type="flex" justify="center" align="middle" style="height: 70%">
            <Col span="24">
                <h1>
                    <img src="../images/zebra.png">
                </h1>

                <h2>
                    <p>Welcome to Zebra Science!</p>
                </h2>
                <Input style="width: 50%; margin-left: 25%" v-model="search_content">
                    <Select v-model="search_item" slot="prepend" style="width: 80px;background-color: #eeeeee;color: black">
                        <Option value="prof">专家</Option>
                        <Option value="paper">论文</Option>
                        <Option value="org">机构</Option>
                    </Select>
                    <Button @click="search" slot="append" style="background-color:#57c5f7;color: white" icon="ios-search" ></Button>
                </Input>
            </Col>
        </Row>
        <a :href="professorDetails_url">专家详情</a>
        <a :href="user_url">个人主页</a>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                search_item: '',
                search_content: '',
                professorDetails_url: '/professorDetails',
                user_url:'/user'
            }
        },
        methods: {
            login () {
                this.$Message.info('login');
            },
            cancel () {
                this.$Message.info('cancel');
            },
            jump_register(){
                this.$router.push({path: '/register'})
            },
            search() {
                if (this.search_item=='prof')
                    alert("专家搜索："+this.search_content);
                else if (this.search_item=='paper')
                    alert("论文搜索："+this.search_content);
                else if (this.search_item=='org')
                    alert("机构搜索："+this.search_content);
                else
                    alert("请选择搜索项！");
            }
        }
    }
</script>
