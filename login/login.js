console.log(document.referrer);
document.querySelector(".login-submit").onclick = function() {

    Cookies.set("username", "haslogined")

    window.location.replace(document.referrer);
    // 返回前一个页面
}