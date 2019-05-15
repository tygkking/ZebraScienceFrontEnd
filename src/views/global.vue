<template>

</template>

<script>

    export default {
        name: "global",
        userID: '123456',
        userType: 'professer',
        collectList: [],
        followList: [],
        setUserID(id) {
            this.userID = id;
        },
        setUserType(type) {
            this.userType = type;
        }
    }
</script>

<style scoped>

</style>
