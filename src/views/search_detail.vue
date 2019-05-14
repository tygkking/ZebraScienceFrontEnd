<template>
    <div>
        <div class="top_xf">
            asd
        </div>
        <div class="sc_detail">
            <div v-for="item in search_results" class="sc_content">
                <div v->
                    <h3 class="c_font">
                        <a href="https://www.baidu.com">{{item.name}}</a>
                    </h3>
                        <div class="c_abstract">{{item.detail}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import temp from './index.vue'
    export default {
        name: "search_paper",
        data() {
            return {
                search_results: []
            }
        },
        created() {
            this.getSearchDetails()
        },
        methods: {
            getSearchDetails() {
                this.search_results = this.$route.query.search_paper
            }
        }

    }
</script>

<style scoped>
    .top_xf{
        background-color:deepskyblue;
        width:100%;
        height: 5%;
        margin:0 auto;
        overflow:hidden;
        position: fixed;
        top: 20px;
    }
    .sc_detail{
        margin-left: 20%;
        margin-top: 10%;
        width: 60%;
    }
    .sc_content{
        margin-top: 5px;
    }
    .c_font{
        font-size: 20px;
    }
    .c_abstract{
        line-height: 24px;
    }
</style>
