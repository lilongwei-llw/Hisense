var begindata = new Date();
endTime = begindata.getTime() + 86400000;
var time = document.querySelector(".daojishi");

function djs() {
    begindata = new Date();
    console.log((endTime - begindata));
    shengyu = (endTime - begindata) / 1000;
    time.innerText = Math.floor(shengyu / 3600) + "小时" + Math.floor(shengyu % 3600 / 60) + "分" + Math.ceil(shengyu) % 60 + "秒";

    if (shengyu <= 0) {
        clearInterval(newtimer);
        newtimer = null;
    }


}
var newtimer = setInterval(djs, 1000);