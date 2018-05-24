document.getElementById("confirm").onclick = function () {
    var text = document.getElementById("conditionsCheck");
    console.log(text.value)
    var c;
    if ((c = check(text.value)) != false) {
        alert("设置成功！")
        chrome.runtime.sendMessage({
            greeting: "o" + c
        });
    } else {
        alert("语法有误，请检查")
    }

    console.log(judgeCondition)
    console.log(keywordCondition)
}

chrome.runtime.sendMessage({greeting: "e"}, function (response) {
    if (response.farewell.length > 0) {
        document.getElementById("conditionText").innerHTML = "当前规则： " + response.farewell;
    } else {
        chrome.runtime.sendMessage({
            greeting: "o" + "length<=100;p_length<=30;p_num==1,length>=100;p_num==2,length>=350"
        });
        document.getElementById("conditionText").innerHTML = "当前规则： " 
            + "length<=100;p_length<=30;p_num==1,length>=100;p_num==2,length>=350";
    }
});