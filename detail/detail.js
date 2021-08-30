//点击小图片切换大图片
var imgs = [
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png"
];
var zoomBig = document.querySelector(".zoom-big");
var imgWrapper = document.querySelector(".img-wrapper");
var bigPic = document.querySelector(".big-pic");
var imgList = document.querySelectorAll(".list");
imgList.forEach(function(item, index) {
    item.onclick = function() {
        bigPic.src = imgs[index];
        item.parentNode.querySelector(".active").classList.remove("active");
        item.classList.add("active");
        zoomBig.style.backgroundImage = `url(${imgs[index]})`;
        //console.log(zoomBig.style.backgroundImage);
    }

});

//放大镜效果

var zoom = document.querySelector(".zoom");

var zoomMask = document.querySelector(".zoom-mask");
var maxLeft = zoomMask.offsetWidth - (zoom.offsetWidth);
var maxTop = zoomMask.offsetHeight - (zoom.offsetHeight);
//console.log(zoom.offsetWidth);
var ratio = 2;
zoomMask.onmousemove = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var left = x - (zoom.offsetWidth / 2);
    var top = y - (zoom.offsetHeight / 2);
    if (left <= 0)
        left = 0;
    if (left >= maxLeft)
        left = maxLeft;
    if (top <= 0)
        top = 0;
    if (top >= maxTop)
        top = maxTop;
    zoom.style.left = left + "px";
    zoom.style.top = top + "px";
    zoomBig.style.backgroundPosition = `-${left*ratio}px -${top*ratio}px`;
}

var listWrapper = document.querySelector(".list-wrapper");
var optionList = document.querySelectorAll(".option-list");
var listOption = document.querySelectorAll(".option");
//absolute父元素塌陷
window.onload = function() {
        optionList[0].parentNode.style.height = optionList[0].offsetHeight + "px";
    }
    //选项卡
listOption.forEach(function(item, index) {
    item.onclick = function() {
        item.parentNode.querySelector(".active2").classList.remove("active2");
        item.classList.add("active2");
        //console.log(optionList[index]);
        document.querySelector(".listdisplay").classList.remove("listdisplay")
        optionList[index].classList.add("listdisplay");
        optionList[index].parentNode.style.height = optionList[index].offsetHeight + "px";
    }
});