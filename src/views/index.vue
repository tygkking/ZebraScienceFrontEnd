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
        <a :href="login_url" style="padding-left: 95%">登录</a>
        <a :href="register_url" >注册</a>
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="../images/zebra.png">
                </h1>

                <h2>
                    <p>Welcome to Zebra Science!</p>
                    <Button @click="handleStart">Start learning</Button>
                </h2>
                <Input style="width: 50%; margin-left: 25%" v-model="value13">
                    <Select v-model="select3" slot="prepend" style="width: 80px;background-color: #808695">
                        <Option value="prof">专家</Option>
                        <Option value="paper">论文</Option>
                        <Option value="org">机构</Option>
                    </Select>
                    <Button  slot="append" style="background-color:#57c5f7;color: white" icon="ios-search" ></Button>
                </Input>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                login_url:'/login',
                register_url:'/register'
            }
        },
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        }
    }
</script>
