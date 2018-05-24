var hiddenItems = []
var MutationObserver = window.MutationObserver;
var observer = new MutationObserver(function (mutationRecords) {
    mutationRecords.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0) {
            var $addNode = $(mutation.addedNodes);
            processItem($addNode)
        }
    });
});
var shouldDelete = true;

chrome.runtime.sendMessage({greeting: "e"}, function (response) {
    var cond = response.farewell;
    if(cond.length==0){
        cond = "length<=100;p_length<=30;p_num==1,length>=100;p_num==2,length>=350";
        chrome.runtime.sendMessage({
            greeting: "o" + "length<=100;p_length<=30;p_num==1,length>=100;p_num==2,length>=350"
        });
    }
    console.log("屏蔽规则："+cond);
    check(cond)
});

//单个问题全部回答的页面
$(document).ready(function () {
    $("div.QuestionAnswers-answers div.List-item").each(function () {
        processItem($(this))
    })
})

//单个问题摘录回答的页面
$(document).ready(function () {
    $("div.Card.AnswerCard div.QuestionAnswer-content").each(function () {
        processItem($(this))
    })
    $("div.Card.MoreAnswers div.List-item").each(function () {
        processItem($(this))
    })
})

// 添加动态加载div的监视
// $(document).ready(function () {
    t = setInterval(function () {
        if ($('div.QuestionAnswers-answers div.List>div:eq(1)>div')[0]) {
            if (shouldDelete == true) {
                console.log('开始监控新回答')
                observer.observe($('div.QuestionAnswers-answers div.List>div:eq(1)>div')[0], {
                    'childList': true
                })
            }
            clearInterval(t)
        }
    }, 1000)
// });

//处理单div
function processItem(item) {
    var p_num = item.find("span.RichText.ztext.CopyrightRichText-richText p,br,blockquote,code").length;
    var text = item.find("span.RichText.ztext.CopyrightRichText-richText").text();
    text = text.replace(/<img[^>]*>/g, "");
    var length = text.length;
    var p_length = length / p_num;

    var isDelete = false
    if (shouldDelete == true) {
        if (judge(text, length, p_length, p_num, judgeCondition, keywordCondition) == true) {
            isDelete = true
            item.hide();
            hiddenItems.push(item);
        }
    }

    console.log(text);
    console.log("长度length: " + length + "   段落数p_num: " + p_num +
        "   平均段长p_length: " + p_length.toFixed(2) +
        (shouldDelete ? (isDelete ? '  删' : '  未删') : (isDelete ? '  应删' : '  不应删')));
}

//返回true时删除
function judge(text, length, p_length, p_num, judgeCondition, keywordCondition) {
    //关键字删除
    for (var i = 0; i < keywordCondition.length; i++) {
        for (var j = 0; j < keywordCondition[i].items.length; j++) {
            if (text.indexOf(keywordCondition[i].items[j]) >= 0) {
                return true;
            }
        }
    }
    //条件判断删除
    for (var i = 0; i < judgeCondition.length; i++) {
        var jud = true
        for (var j = 0; j < judgeCondition[i].length; j++) {
            var firstNum = judgeCondition[i][j].firstNum;
            var secondNum = judgeCondition[i][j].secondNum;
            var num = judgeCondition[i][j].num;
            // console.log("first:"+firstNum+" second:"+secondNum+" num:"+num)
            if (secondNum == 1) {
                if (firstNum == 2) {
                    if (length > num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 3) {
                    if (p_length > num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 4) {
                    if (p_num > num) {} else {
                        jud = jud & false
                    };
                }
            } else if (secondNum == 2) {
                if (firstNum == 2) {
                    if (length < num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 3) {
                    if (p_length < num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 4) {
                    if (p_num < num) {} else {
                        jud = jud & false
                    };
                }
            } else if (secondNum == 3) {
                if (firstNum == 2) {
                    if (length >= num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 3) {
                    if (p_length >= num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 4) {
                    if (p_num >= num) {} else {
                        jud = jud & false
                    };
                }
            } else if (secondNum == 4) {
                if (firstNum == 2) {
                    if (length <= num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 3) {
                    if (p_length <= num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 4) {
                    if (p_num <= num) {} else {
                        jud = jud & false
                    };
                }
            } else if (secondNum == 5) {
                if (firstNum == 2) {
                    if (length == num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 3) {
                    if (p_length == num) {} else {
                        jud = jud & false
                    };
                } else if (firstNum == 4) {
                    if (p_num == num) {} else {
                        jud = jud & false
                    };
                }
            }
        }
        if (jud == true) return true;
    }
    return false;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting == "stop") {
        console.log("收到停止删除请求")
        hiddenItems.forEach(function (item, index) {
            item.show()
        })
        observer.disconnect();
        shouldDelete = false
    }
});