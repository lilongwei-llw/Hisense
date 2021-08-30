var products = [
    { id: 1, img: "img/1.png", inch: "海信【65E8D】65英寸", inchNumber: 65, price: 5699, saleNumber: 66775 },
    { id: 2, img: "img/2.png", inch: "海信65英寸悬浮全面屏/AI声控", inchNumber: 65, price: 3799, saleNumber: 9160 },
    { id: 3, img: "img/3.png", inch: "海信【43E2F】43英寸/悬浮全", inchNumber: 43, price: 1599, saleNumber: 6415 },
    { id: 4, img: "img/4.png", inch: "海信75英寸悬浮全面屏/AI声", inchNumber: 75, price: 4599, saleNumber: 6677 },
    { id: 5, img: "img/5.png", inch: "海信【55E2F】55英寸/悬浮", inchNumber: 55, price: 1049, saleNumber: 10399 },
    { id: 6, img: "img/6.png", inch: "Vidda 43英寸/悬浮全面屏/智", inchNumber: 43, price: 1399, saleNumber: 4095 },
    { id: 7, img: "img/7.png", inch: "海信【65E3F-Y】65英寸悬浮", inchNumber: 65, price: 3299, saleNumber: 4570 },
    { id: 8, img: "img/8.png", inch: "Vidda55英寸/4K HDR高清", inchNumber: 55, price: 2199, saleNumber: 1259 },
    { id: 9, img: "img/9.png", inch: "海信【65E3F-MAX】65英寸", inchNumber: 65, price: 3899, saleNumber: 1583 },
    { id: 10, img: "img/10.png", inch: "海信【55E5F】55英寸/多路", inchNumber: 55, price: 3399, saleNumber: 662 }
];
var flag = 0;
var inchFlag = 0;
var currentArr = products; //定义当前数组
arr = products;
//flag为0 默认排序 
// 1 销量由大到小 2由小到大
// 3 价格由大到小 4由小到大

// 字符串拼接函数
function sort(flag, arr) {
    var str = "";
    arr.forEach(function(item) {
        str += `
        <div class="product">
        <img src="${item.img}" alt="" onclick="window.open('../detail/detail.html');">
        <div class="inch" onclick="window.open('../detail/detail.html');">${item.inch}</div>
        <div class="price">￥${item.price}</div>
        <div class="number">已售${item.saleNumber}台</div>
    </div>
        
        `;
    });
    document.querySelector(".product-list").innerHTML = str;
}
sort(0, products);

// 价格按钮
var salesBtn = document.querySelector(".salesBtn");
var salearrow = document.querySelector(".jian1");
var saleflag = 0;

salesBtn.onclick = function() {
        var sortarr = currentArr.slice();
        saleflag++;
        saleflag = saleflag % 3;
        pricearrow.style.fontSize = 0;
        pricearrow.classList.add("fanzhuan");
        priceflag = 0;
        if (saleflag == 0) {
            salearrow.style.fontSize = 0;
            sort(1, currentArr);
        } else if (saleflag == 1) {
            salearrow.style.fontSize = 22 + "px";
            salearrow.classList.toggle("fanzhuan");
            sortarr.sort(compare2('price'));
            sort(1, sortarr);
        } else if (saleflag == 2) {
            salearrow.classList.toggle("fanzhuan");
            sortarr.sort(compare('price'));
            sort(1, sortarr);
        }

    }
    // 销量按钮
var priceBtn = document.querySelector(".priceBtn");
var pricearrow = document.querySelector(".jian2");
var priceflag = 0;
priceBtn.onclick = function(e) {
    var sortarr = currentArr.slice();
    priceflag++;
    priceflag = priceflag % 3;
    salearrow.style.fontSize = 0;
    salearrow.classList.add("fanzhuan");
    saleflag = 0;
    console.log(e.target);
    if (priceflag == 0) {
        pricearrow.style.fontSize = 0;
        sort(1, currentArr);
    } else if (priceflag == 1) {
        pricearrow.style.fontSize = 22 + "px";
        pricearrow.classList.toggle("fanzhuan");
        sortarr.sort(compare2('saleNumber'));
        sort(1, sortarr);
    } else if (priceflag == 2) {
        pricearrow.classList.toggle("fanzhuan");
        sortarr.sort(compare('saleNumber'));
        sort(1, sortarr);
    }

};

//比较函数
function compare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

function compare2(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}



// 按左边栏英寸进行排序
(function() {
    var inch = 0;
    var newArr = [];
    var leftDiv = document.querySelector(".left-div");
    leftDiv.onclick = function(e) {
        if (!e.target.classList.contains("search-btn")) return;
        //html改变 
        inch = e.target.dataset.id;
        var displayarr = getnewArr(inch);
        sort(1, displayarr);

        //改变样式
        var btnActive = e.target.parentNode.querySelector(".search-btn-active");

        if (e.target.classList.contains("search-btn-active")) { //如果点击选中的选项
            e.target.classList.remove("search-btn-active");
            sort(1, products); //变为默认排序
            currentArr = products; //表示当前数组
            salearrow.style.fontSize = 0;
            salearrow.classList.add("fanzhuan");
            saleflag = 0;
            pricearrow.style.fontSize = 0;
            pricearrow.classList.add("fanzhuan");
            priceflag = 0; //右面箭头复位
        } else if (btnActive) { //如果当前有选项被选中
            btnActive.classList.remove("search-btn-active");
            e.target.classList.add("search-btn-active");

        } else { //如果没有选项被选中
            e.target.classList.add("search-btn-active");
            salearrow.style.fontSize = 0;
            salearrow.classList.add("fanzhuan");
            saleflag = 0;
            pricearrow.style.fontSize = 0;
            pricearrow.classList.add("fanzhuan");
            priceflag = 0; //右面箭头复位
        }
    }

    // 重构数组
    function getnewArr(inCh) {
        newArr = [];
        var j = 0;
        for (let i in products) {
            if (products[i].inchNumber == inCh) {
                newArr[j++] = products[i];
            }
        }
        currentArr = newArr; //表示当前数组
        return newArr;

    }


})();