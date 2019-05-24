<template>

</template>

<script>
    export default {
        name: "cookieUtil",
        methods:{
            setCookie(key, value){
                var exdate = new Date();
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 10);
                window.document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString();
            },
            getCookie(param){
                var c_param = '';
                if (document.cookie.length > 0) {
                    var begin = document.cookie.indexOf(param);
                    if(begin != -1) {
                        begin += param.length + 1;
                        var end = document.cookie.indexOf(";", begin);
                        end == -1 ? end = document.cookie.length : end = end;
                        return unescape(document.cookie.substring(begin, end));
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
