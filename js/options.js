document.getElementById("confirm").onclick = function () {
    var text = document.getElementById("conditionsCheck");
    console.log(text.value)
    var c;
    if ((c = check(text.value)) != false) {
        alert("设置成功！")
        chrome.runtime.sendMessage({greeting: "o"+c});
    } else {
        alert("语法有误，请检查")
    }

    console.log(judgeCondition)
    console.log(keywordCondition)


}