var list = document.querySelectorAll(".security-list");
var content = document.querySelectorAll(".setting-warp");
list.forEach(function(item, index) {
    item.number = index;
    item.onclick = function(e) {
        //console.log(e.target.number);
        e.target.parentNode.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        document.querySelector(".display").classList.remove("display");
        content[e.target.number].classList.add("display");

    }
});