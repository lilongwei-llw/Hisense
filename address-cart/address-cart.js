var address = [
    { id: 1, receivename: "李龙威", phone: "18300277830", receiveRegion: "山东省 青岛市 城阳区 城阳街道", regionDetail: "今日紫都25#4-1", isDefault: true },
    { id: 2, receivename: "李龙威", phone: "1368237751", receiveRegion: "山东省 菏泽市 曹县 曹城街道", regionDetail: "🐂🍺666", isDefault: false }
];

(function() {
    var addressTitle = document.querySelector(".address-title");
    var htmlStr = "";
    for (var i = 0; i < address.length; i++) {
        htmlStr += getAddressHtml(address[i]);
    }
    addressTitle.innerHTML += htmlStr;

    function getAddressHtml(item) {
        var liStr = `
        <div class="address ${item.isDefault}" data-id="${item.id}">
        <div class="one-line">
            <span class="receive-name">${item.receivename}</span>
            <span class="receive-phone">${item.phone}</span>
            <span class="isdefault">默认地址</span>
            <input type="button" value="设为默认地址" data-id="${item.id}" class="changedefault">
        </div>
        <div class="two-line">
            <span class="receive-region">${item.receiveRegion+item.regionDetail}</span>
        </div>
        <div class="three-line">
            <input type="button" value="修改" data-id="${item.id}" class="change">
            <input type="button" value="删除" data-id="${item.id}" class="remove">
        </div>
    </div>
        `;
        return liStr;
    }

    //绑定点击事件
    addressTitle.onclick = function(e) {
            if (e.target.classList.contains("changedefault")) {
                changeDefaultHandler(e.target);
            } else if (e.target.classList.contains("change")) {
                changeHandler(e.target);
            } else if (e.target.classList.contains("remove")) {
                removeHandler(e.target);
            } else if (e.target.classList.contains("new-address")) {
                addAddress(e.target);
            }
        }
        //修改默认地址
    function changeDefaultHandler(target) {
        document.querySelector(".true").classList.add("false")
        document.querySelector(".true").classList.remove("true");

        target.parentNode.parentNode.classList.add("true");
        target.parentNode.parentNode.classList.remove("false");
    }
    //删除
    var beremove; //定义被删除address按钮对象

    function removeHandler(target) {
        console.log(target);
        document.querySelector(".remove-mengban").style.display = "block";
        beremove = target;
        console.log(beremove);
    }
    //确定删除取消按钮
    document.querySelector(".remove-qx").onclick = function() {
            document.querySelector(".remove-mengban").style.display = "none";
        }
        //确定删除确认按钮
    document.querySelector(".remove-qd").onclick = function() {
            console.log(beremove);
            beremove.parentNode.parentNode.remove();
            document.querySelector(".remove-mengban").style.display = "none";

        }
        // 新增收货地址按钮
    var newaddress = document.querySelector(".new-address");
    //newaddress.onclick = addAddress;

    function addAddress(target) {
        document.querySelector(".hidden").value = 0;
        console.log("点了");
        document.querySelector(".new-address-mengban").style.display = "block";
        var form = document.forms["addressEdit"];
        form.reset();
        regionPicker.reset();
    }
    document.querySelector(".btn-cancel").onclick = function() {
            document.querySelector(".new-address-mengban").style.display = "none";
        }
        // 确定按钮 判断时修改还是新增
    document.querySelector(".btn-ok").onclick = function() {
            console.log(address);
            var add = {
                id: address[address.length - 1].id + 1,
                receivename: document.querySelector(".receiveName").value,
                phone: document.querySelector(".receivePhone").value,
                receiveRegion: regionPicker.get(),
                regionDetail: document.querySelector(".receiveDetail").value,
                isDefault: false
            }

            if (document.querySelector(".hidden").value == 0) {
                address.push(add);
                console.log(add);
                addressTitle.innerHTML += getAddressHtml(add);
            } else {
                var x = document.querySelector(".hidden").value;
                add.id = x;
                address.splice(document.querySelector(".hidden").value - 1, 1, add);

                var bechange = document.querySelectorAll(".address")
                for (var i = 0; i < bechange.length; i++) {
                    if (bechange[i].dataset.id == x) var index = i;
                }

                bechange[index].querySelector(".receive-name").innerText = add.receivename;
                bechange[index].querySelector(".receive-phone").innerText = add.phone;
                bechange[index].querySelector(".receive-region").innerText = add.receiveRegion + add.regionDetail;
            }
            document.querySelector(".new-address-mengban").style.display = "none";

        }
        // 修改按钮
    function changeHandler(target) {
        console.log(target);
        document.querySelector(".hidden").value = target.dataset.id;
        console.log(document.querySelector(".hidden").value);
        document.querySelector(".new-address-mengban").style.display = "block";
        var form = document.forms["addressEdit"];
        form.reset();
        regionPicker.reset();
        console.log(target);
        var id = target.dataset.id;
        var nowaddress = address.find(function(item) { return item.id == id; });
        form["receiveName"].value = nowaddress.receivename;
        form["receivePhone"].value = nowaddress.phone;
        form["receiveDetail"].value = nowaddress.regionDetail;
        regionPicker.set(nowaddress.receiveRegion);
        //console.log(address);
    }
})();