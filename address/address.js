var users = [
    { name: "zhang" },
    { name: "li" }
];
var address = [
    { id: 1, user: "zhang", receiveName: "德玛西亚之力-盖伦", receivePhone: "1368237751", receiveRegion: "山东省 青岛市 城阳区 城阳街道", regionDetail: "今日紫都25#4-1", isDefault: true },
    { id: 2, user: "zhang", receiveName: "德玛西亚皇子-嘉文三世", receivePhone: "1638537721", receiveRegion: "山东省 菏泽市 曹县 曹城街道", regionDetail: "紫都金日25#4-2", isDefault: false },
    { id: 3, user: "zhang", receiveName: "德邦总管-赵信", receivePhone: "1836753382", receiveRegion: "北京市 市辖区 东城区 东华门街道", regionDetail: "金紫日都25#4-3", isDefault: false },
    { id: 4, user: "li", receiveName: "无极剑圣-易", receivePhone: "1387213652", receiveRegion: "天津市 市辖区 和平区 劝业场街道", regionDetail: "都日金子25#4-4", isDefault: false },
    { id: 5, user: "li", receiveName: "蛮族之王-泰达米尔", receivePhone: "28453168", receiveRegion: "河北省 石家庄市 长安区 建北街道", regionDetail: "金都日子25#4-5", isDefault: false }
];

(function() {
    var user = "zhang"; //假设登陆人
    var htmlStr = "";
    address.filter(function(item) { return item.user === user; }).forEach(function(item) {
        htmlStr += getAddressHtml(item);
    });
    document.querySelector("ul.address-list").innerHTML += htmlStr;
    //给address-list绑定点击事件
    document.querySelector("ul.address-list").onclick = function(e) {
            if (e.target.classList.contains("btn-remove")) {
                removeHandler(e.target);
            } else if (e.target.classList.contains("btn-default")) {
                defaultHandler(e.target);
            } else if (e.target.classList.contains("btn-modify")) {
                beginModifyHandler(e.target);
            } else if (e.target.classList.contains("btn-add")) {
                beginAddHandler(e.target);
            } else
                return;
        }
        // 取消按钮

    document.querySelector("button.btn-cancel").onclick = function() {
            document.querySelector(".edit-dialog-wrapper").classList.remove("show");
        }
        //删除按钮
    function removeHandler(target) {
        var id = target.parentNode.parentNode.dataset.id;
        if (!confirm("确认删除？")) {
            return;
        }
        var number;
        target.parentNode.parentNode.remove();
        number = address.findIndex(function(item) { return item.id == id; });
        // for (var i = 0; i < address.length; i++) {
        //     if (address[i].id == id) {
        //         number = i;
        //         break;
        //     }
        // }
        address.splice(number, 1);
        console.log(address);
    };
    //默认地址按钮
    function defaultHandler(target) {
        var id = parseInt(target.parentNode.parentNode.dataset.id);
        var curDefault = address.find(function(item) {
            return item.user == user && item.isDefault;
        });
        if (curDefault !== undefined) curDefault.isDefault = false;
        address.find(function(item) {
            return item.id == id;
        }).isDefault = true;

        var curDefaultDom = document.querySelector("span.is-default");
        if (curDefault !== null) curDefaultDom.classList.remove("is-default");
        target.parentNode.classList.add("is-default");

        alert("默认地址设置成功");
    };
    //修改按钮
    function beginModifyHandler(target) {
        console.log("???");
        // 读取要修改的地址id
        var id = parseInt(target.parentNode.parentNode.dataset.id);
        var nowaddress = address.find(function(item) { return item.id == id; });
        // 让表单回显要修改的地址的当前值
        var form = document.forms["addressEdit"];
        console.log(form);
        form["id"].value = nowaddress.id;
        form["receiveName"].value = nowaddress.receiveName;
        form["receivePhone"].value = nowaddress.receivePhone;
        form["receiveDetail"].value = nowaddress.regionDetail;
        //...........
        regionPicker.set(nowaddress.receiveRegion);
        // 模态框显示
        document.querySelector(".edit-dialog-wrapper").classList.add("show");
    };
    // 函数封装
    function getAddressHtml(item) {
        var liStr = `
		<li data-id="${item.id}">
		<span class="name">${item.receiveName}</span>
		<span class="phone">${item.receivePhone}</span>
		<span class="region">${item.receiveRegion}</span>
		<span class="detial">${item.regionDetail}</span>
		<span class="default-wrapper ${item.isDefault ? 'is-default':''}">
		<span class='default'>默认地址</span>
		<button class='btn-default'>设为默认地址</button>
		</span>
		<span class="operate">
			<input type="button" name="" id="" value="修改" class="btn-modify" data-id="${item.id}"/>
			<input type="button" name="" id="" value="删除" class="btn-remove" data-id="${item.id}"/>
		</span>
	</li>
		`;
        return liStr;
    }
    //添加按钮
    function beginAddHandler(target) {
        //表单重置 表单调用reset方法重置 name为“id”的hidden重置为0，regionPicker调用reset方法
        var form = document.forms["addressEdit"];
        form.reset();
        form["id"].value = 0;
        regionPicker.reset();
        //模态框显示
        document.querySelector(".edit-dialog-wrapper").classList.add("show");
    };
    document.querySelector("button.btn-ok").onclick = function() {
        // 搜集用户输入，整合为对象
        var form = document.forms["addressEdit"];
        var add = {
            id: parseInt(form["id"].value),
            receiveName: form["receiveName"].value,
            receivePhone: form["receivePhone"].value,
            regionDetail: form["receiveDetail"].value,
            receiveRegion: regionPicker.get()

        }


        // 判断新增还是修改
        if (add.id == 0) {
            add.id = address[address.length - 1].id + 1;
            add.isDefault = false;
            address.push(add);
            document.querySelector("ul.address-list").innerHTML += getAddressHtml(add);
        } else {
            var i = address.findIndex(function(item) { return item.id == add.id; });
            console.log(i);
            add.isDefault = address[i].isDefault;
            // 数据变更
            address.splice(i, 1, add);
            // dom变更
            var li = document.querySelector(`ul.address-list li[data-id='${add.id}']`);
            li.querySelector("span.name").innerText = add.receiveName;
            li.querySelector("span.phone").innerText = add.receivePhone;
            li.querySelector("span.region").innerText = add.receiveRegion;
            li.querySelector("span.detial").innerText = add.regionDetail;
            alert("修改成功");
        }
        document.querySelector(".edit-dialog-wrapper").classList.remove("show");
    }
})();