<template>

</template>

<script>

    export default {
        name: "global",
        userID: '123456',
        userName: '蔡徐坤',
        email: 'caixukun@rap.com',
        password: '123', // Just For Test
        userType: 'professer',
        collectList: [
            {
                paper_detail: {
                    title: 'This is Paper Title One',
                    year: '2018',
                    author: '郭子溢 黎昆昌 许志达 何浩乾',
                    source: 'This is Paper Source'
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
            { message: '郭子溢' },
            { message: '黎昆昌' },
            { message: '许志达' },
            { message: '何浩乾' }
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
