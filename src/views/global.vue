<template>

</template>

<script>

    export default {
        domain:'http://qsz.lkc1621.xyz',
        name: "global",
        userID: '123456',
        userName: '',
        email: 'caixukun@rap.com',
        password: '123', // Just For Test
        userType: 'VISITOR',
        collectList: [
            {
                paper_detail: {
                    title: 'This is Paper Title One This is Paper Title One This is Paper Title One This is Paper Title One',
                    year: '2018',
                    author: '郭子溢 黎昆昌 许志达 何浩乾 郭子溢 黎昆昌 许志达 何浩乾 郭子溢 黎昆昌 许志达 何浩乾',
                    source: 'This is Paper Source This is Paper Source This is Paper Source'
                }
            },
            {
                paper_detail: {
                    title: 'This is Paper Title One',
                    year: '2018',
                    author: '郭子溢 黎昆昌 许志达 何浩乾',
                    source: 'This is Paper Source'
                }
            },
        ],
        followList: [
            {
                profID: 1005,
                name: '郭子溢',
                field: '计算机',
                organization: '北航',
                paper_num: 99,
                ref_num: 98,
            },
            {
                profID: 1022,
                name: '黎昆昌黎昆昌',
                field: '计算机计算机计算机',
                organization: '北航北航北航北航北航',
                paper_num: 97,
                ref_num: 96,
            },
            {
                profID: 1020,
                name: '许志达',
                field: '计算机',
                organization: '北航',
                paper_num: 95,
                ref_num: 94,
            },
            {
                profID: 1026,
                name: '何浩乾',
                field: '计算机',
                organization: '北航',
                paper_num: 93,
                ref_num: 92,
            }
        ],
        setUserID(id) {
            this.userID = id;
        },
        setUserType(type) {
            this.userType = type;
        },
        setUserName(name) {
            this.userName = name;
        },
    }
</script>

<style scoped>

</style>
