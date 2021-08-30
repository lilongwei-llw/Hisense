// 动态渲染
var whatsThis = function() {
    return this.jiage * this.shuliang; // this 的值取决于函数被调用的方式
}
var cartList = [
    { id: 1, img: "img\\btv1.png", xinxi: "海信75吋/纯净三色光源/107%超广色域/Air超轻屏", jiage: 13999, shuliang: 1, xiaoji: whatsThis },
    { id: 2, img: "img\\btv2.png", xinxi: "海信3匹/新一级能效/语音智控/全域净化/智能睡眠空调", jiage: 5999, shuliang: 1, xiaoji: whatsThis },
    { id: 3, img: "img\\btv3.png", xinxi: "海信556升/十字对开门/记录食材/管理新鲜", jiage: 3799, shuliang: 1, xiaoji: whatsThis },
    { id: 4, img: "img\\btv4.png", xinxi: "海信65英寸悬浮全面屏/AI声控/2+32GB大内存电视", jiage: 28999, shuliang: 1, xiaoji: whatsThis }
];
console.log(cartList[0].xiaoji());
console.log(cartList[1].xiaoji());
console.log(cartList[2].xiaoji());
console.log(cartList[3].xiaoji());


var goods = document.querySelector(".goods");
var htmlStr = "";
cartList.forEach(function(item) {
    htmlStr += `
    <div class="one-goods" data-id=${item.id}>
    <input type="checkbox" class="checkbox">
    <img src="${item.img}" alt="">
    <span class="xinxi">${item.xinxi}</span>
    <span class="jiage">￥${item.jiage}</span>
    <input class="de-btn" type="button" value="-">
    <input class="number" type="number" value="1">
    <input class="in-btn" type="button" value="+">
    <span class="xiaoji">￥${item.xiaoji()}</span>
    <input class="remove" type="button" value="删除">
    </div>
    `;
});
goods.innerHTML = htmlStr;
// 冒泡绑定按钮事件
document.querySelector(".goods").onclick = function(e) {
        if (e.target.classList.contains("in-btn"))
            inHandler(e.target);
        else if (e.target.classList.contains("de-btn"))
            deHandler(e.target);
        else if (e.target.classList.contains("remove"))
            reHandler(e.target);
        else if (e.target.classList.contains("checkbox"))
            checkHandler(e.target);
        else
            return;
    }
    // 增加
function inHandler(target) {
    var numberCount = target.parentNode.querySelector(".number");
    var number = numberCount.value
        //console.log(number);
    numberCount.value = parseInt(number) + 1;
    var id = target.parentNode.dataset.id;
    //console.log(id);
    var nowid;
    for (var i = 0; i < cartList.length; i++) {
        nowid = i;
        if (cartList[i].id == id) {
            cartList[i].shuliang += 1;
            break;

        }
    }
    var xiaoji = target.parentNode.querySelector(".xiaoji");
    //console.log(xiaoji);
    xiaoji.innerText = "￥" + cartList[nowid].xiaoji();
    //console.log(target.parentNode.querySelector(".de-btn"));
    target.parentNode.querySelector(".de-btn").disabled = false;
    updataTotal();

}
//减少
var numberCounts = document.querySelectorAll(".number");

var bitDe = document.querySelectorAll(".de-btn");
for (var i = 0; i < bitDe.length; i++) {
    if (numberCounts[i].value == 1) bitDe[i].disabled = true;
}

function deHandler(target) {
    var numberCount = target.parentNode.querySelector(".number");
    var number = numberCount.value
    console.log(number);
    if (number < 3) target.disabled = true;
    //
    numberCount.value = parseInt(number) - 1;
    var id = target.parentNode.dataset.id;
    //console.log(id);
    var nowid;
    for (var i = 0; i < cartList.length; i++) {
        nowid = i;
        if (cartList[i].id == id) {
            cartList[i].shuliang -= 1;

            break;

        }
    }

    var xiaoji = target.parentNode.querySelector(".xiaoji");
    console.log("xiaoji=" + cartList[nowid].xiaoji());
    //console.log("!!!" + ID);
    xiaoji.innerText = "￥" + cartList[nowid].xiaoji();
    updataTotal();
}
//删除按钮
function reHandler(target) {
    var id = target.parentNode.dataset.id;
    if (!confirm("确认删除?")) {
        return;
    }
    var number = cartList.findIndex(function(item) {
        return item.id == id;
    });
    cartList.splice(number, 1)
    target.parentNode.parentNode.removeChild(target.parentNode);
    updataTotal();
}
//勾选盒子
function checkHandler(target) {
    var allcheckx = document.querySelectorAll(".allcheck");
    var allcheck = document.querySelector(".allcheck");
    target.classList.toggle("checked");
    var unchecked = target.parentNode.parentNode.querySelectorAll(".checkbox:not(.checked)");
    if (unchecked.length == 0) {
        allcheck.checked = true;
        allcheck.classList.add("checked");
        allcheckx[1].checked = allcheckx[0].checked;
    } else if (unchecked.length > 0) {
        allcheck.checked = false;
        allcheck.classList.remove("checked");
        allcheckx[1].checked = allcheckx[0].checked;
    }
    console.log(cartList);
    updataTotal();

}
//全选按钮 
var allcheck = document.querySelectorAll(".allcheck");
allcheck[0].onchange = function() {
    this.classList.toggle("checked");
    var that = this;
    var boxlist = document.querySelectorAll(".goods .checkbox");
    for (i = 0; i < boxlist.length; i++) {
        boxlist[i].checked = that.checked;
        if (that.classList.contains("checked")) {
            boxlist[i].classList.add("checked");
        } else {
            boxlist[i].classList.remove("checked");
        }

    }
    allcheck[1].checked = allcheck[0].checked;
    updataTotal();
}
allcheck[1].onchange = function() {
    allcheck[0].click();
}

function updataTotal() {
    var total = 0;
    var checkboxs = document.querySelectorAll(".goods .checkbox.checked");
    for (var i = 0; i < checkboxs.length; i++) {
        var id = parseInt(checkboxs[i].parentNode.dataset.id);
        console.log(id);
        console.log(cartList);
        target = cartList.find(function(item) {
            return item.id == id;
        });
        console.log(target);
        total += target.xiaoji();
    }
    document.querySelector(".jsjiage").innerText = "￥" + total;
}