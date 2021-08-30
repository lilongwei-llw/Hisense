// 判断登录
if (Cookies.get("username") !== undefined) {
    console.log("denglule");
    document.querySelectorAll(".login-display").forEach(function(item) {
        item.style.display = "inline-block";
        console.log("")
    });
    document.querySelectorAll(".login-none").forEach(function(item) {

        item.style.display = "none";
    });

} else {
    console.log("meideng");
    document.querySelectorAll(".login-none").forEach(function(item) {

        item.style.display = "inline-block";
    });
    document.querySelectorAll(".login-display").forEach(function(item) {
        item.style.display = "none";
        console.log("")
    });
}
console.log(document.querySelectorAll(".login-none")[0]);


// var liArr = document.querySelectorAll(".menu-ul>li");
// var secMenu = document.querySelector(".sec-menu");
// var secMenuContent = document.querySelectorAll(".moban");
// var totalback = document.querySelector(".total-back"); //要变化的
// console.log(totalback);
// var flag = 0;
// var th;
// var menuback = document.querySelector(".menu-back"); //监听的
// console.log(menuback);
// menuback.onmouseover = function() {
//     // console.log("ccc");
//     // console.log(menuback.style.display);
// }


// var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
// var box1 = document.querySelector(".menu-back"); //被监听对象{}
// var box2 = document.querySelector(".total-back"); //变化对象{}
// //var btn = document.getElementById("btn");
// let width = 100;
// var observer = new MutationObserver(function(mutations) {
//     console.log("wdnmd");
//     mutations.forEach(function(mutation) {
//         if (mutation.type == "attributes") {
//             console.log("attributes changed", mutation);
//             box2.style.display = mutation.target.style.display
//         }
//     });
// });
// observer.observe(box1, {
//     attributes: true, //configure it to listen to attribute changes,
//     attributeFilter: ['style']
// });

// function backdisply() {
//     // console.log(menuback);
//     if (menuback.style.display == "block")
//         totalback.style.display = "block";
// }

// function backnone() {
//     if (menuback.style.display == "none")
//         totalback.style.display = "none";
// }
// function tabToggle() {
//     // console.log("dian");
//     this.flag++;
//     for (var j = 0; j < 11; j++) {
//         secMenuContent[j].classList.remove("list-block");
//         secMenuContent[j].classList.add("list-none");
//     }
//     secMenuContent[this.th].classList.remove("list-none");
//     secMenuContent[this.th].classList.add("list-block");
//     console.log(secMenuContent[this.th]);
//     console.log(this.th);
//     if (this.flag == 1) {
//         secMenu.classList.remove("js-displaynone")
//         secMenu.classList.add("js-displayblock");
//         for (var i = 2; i < 13; i++) {
//             liArr[i].flag = 0;
//         }
//         this.flag = 1;
//     } else if (this.flag > 1) {
//         secMenu.classList.remove("js-displayblock")
//         secMenu.classList.add("js-displaynone");
//         for (var i = 2; i < 13; i++) {
//             liArr[i].flag = 0;
//         }
//     }

// }

//选项卡 。。。。

var headMenu = document.querySelector(".menu");
var divHeight;
var doHeight;
window.onscroll = function() {
    divHeight = headMenu.scrollTop;
    doHeight = document.documentElement.scrollTop; //document被卷起的高度
    //console.log(doHeight);
    if (doHeight > 580) {
        headMenu.style.position = "fixed";
        headMenu.style.top = "0";
        headMenu.style.zIndex = "999";
    } else {
        headMenu.style.position = "absolute";
        headMenu.style.top = "36px";

    }
}
var oldMethod = window.onscroll;
//固定菜单


// 自动切换
var indicators;
indicators = document.querySelectorAll(".indicator");
var isToggling = false;
var index = 1; //当前显示第几张
var timer = null;
var tureContent = document.querySelector(".true-content");
var slidemove = document.querySelector(".move");
var length = document.querySelectorAll(".lunbo").length;


function bannerToggle(nextIndex) {
    index = nextIndex;
    isToggling = true;
    slidemove.style.transition = "all 0.4s";
    slidemove.style.left = `-${nextIndex}00%`;
    //console.log(length + "length");
    // console.log(index + "???");

    //小圆点active变化
    document.querySelector(".indicator-wrapper .active").classList.remove("active");
    var i = nextIndex;
    if (i == length - 1) i = 1;
    else if (i == 0) i = length - 2;
    document.querySelectorAll(".indicator-wrapper span")[i - 1].classList.add("active");
    setTimeout(function() {

        if (nextIndex == length - 1) {
            index = 1;
            slidemove.style.transitionDuration = "0s";
            slidemove.style.left = `-${index}00%`;
            console.log("生效了没");
            //小圆点active变化
            //document.querySelector(".indicator-wrapper .active").classList.remove("active");
            //indicators[index - 1].classList.add("active");
        }
        if (nextIndex == 0) {
            index = length - 2;
            slidemove.style.transitionDuration = "0s";
            slidemove.style.left = `-${index}00%`;

            // document.querySelector(".indicator-wrapper .active").classList.remove("active");
            // indicators[index - 1].classList.add("active");
        }
        isToggling = false;
    }, 400);

}
timer = setInterval(function() {
    bannerToggle(index + 1)
}, 3000);
tureContent.onmouseover = function() {
    clearInterval(timer);

    //停止计时
}
tureContent.onmouseout = function() {
    timer = setInterval(function() {
        bannerToggle(index + 1)
    }, 3000);
    //继续计时
}


for (var i = 0; i < indicators.length; i++) {
    indicators[i].index = i;
    indicators[i].onclick = function() {
        if (isToggling || this.classList.contains("active")) return;
        bannerToggle(this.index + 1);
    };
}


//左右箭头滚动
var leftear = document.querySelector(".left-ear");
leftear.onclick = function() {
    if (isToggling) return;
    bannerToggle(index - 1);
    console.log(index);
}
var rightear = document.querySelector(".right-ear");
rightear.onclick = function() {
        if (isToggling) return;
        bannerToggle(index + 1);
    }
    //返回顶部
var fixedwrapper = document.querySelector(".fixed-wrapper");
var righttable = function() {
    oldMethod.call(this);
    if (document.documentElement.scrollTop < 700) {
        fixedwrapper.style.bottom = 0 + "px";
        document.querySelector(".return-top").style.display = "none";
        document.querySelector(".fixed-wrapper").style.height = 256 + "px";
    } else {
        fixedwrapper.style.bottom = 200 + "px";
        document.querySelector(".return-top").style.display = "block";
        document.querySelector(".fixed-wrapper").style.height = 320 + "px";
    }
}
window.onscroll = righttable;
var returntop = document.querySelector(".return-top");
console.log(document.documentElement.scrollTop);
returntop.onclick = function() {
    nowTop = document.documentElement.scrollTop;
    console.log(nowTop);
    timer = setInterval(
        function() {
            window.scroll(0, nowTop *= 0.9);
            if (nowTop <= 5) {
                window.scroll(0, 0);
                window.clearInterval(timer);
                timer = null;
            }
        }, 1);
}
document.querySelector(".icon-weibiaoti--").onclick = function() {
    window.location.replace("../cart/cart.html");
}