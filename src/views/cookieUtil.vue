<template>

</template>

<script>
    export default {
        name: "cookieUtil",
        methods: {
            setCookie(key, value) {
                var exdate = new Date();
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 10);
                window.document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString();
            },
            getCookie(param) {
                var res = '';
                if (document.cookie.length > 0) {
                    var begin = document.cookie.indexOf(param);
                    if (begin != -1) {
                        begin += param.length + 1;
                        var end = document.cookie.indexOf(";", begin);
                        end == -1 ? end = document.cookie.length : end = end;
                        return unescape(document.cookie.substring(begin, end));
                    }
                }
                return res;
            },
            delCookie(NameOfCookie) {
                if (getCookie(NameOfCookie)) {
                    document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
                }
            }
        }
    }
</script>

<style scoped>

</style>
