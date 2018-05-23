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
$(document).ready(function () {
    var MutationObserver = window.MutationObserver;
    var observer = new MutationObserver(function (mutationRecords) {
        mutationRecords.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                var $addNode = $(mutation.addedNodes);
                // TODO: 处理获取的新节点
                processItem($addNode)
            }
        });
    });

    if ($('div.QuestionAnswers-answers div.List>div:eq(1)>div')[0]) {
        console.log('开始监控:')
        observer.observe($('div.QuestionAnswers-answers div.List>div:eq(1)>div')[0], {
            'childList': true
        })
    }
});

//处理单div
function processItem(item) {
    var p_num = item.find("span.RichText.ztext.CopyrightRichText-richText p,br,blockquote,code").length;
    var text = item.find("span.RichText.ztext.CopyrightRichText-richText").text();
    text = text.replace(/<img[^>]*>/g, "");
    var length = text.length;
    var p_length = length / p_num;

    var isDelete = false
    if (length <= 100 || p_length <= 30 || (p_num <= 1 && length >= 100) ||
        (p_num == 2 && length >= 350)) {
        isDelete = true
        item.remove();
    }
    console.log(text);
    console.log("长度length: " + length + "   段落数p_num: " + p_num + 
        "   平均段长p_length: " + p_length.toFixed(2) + (isDelete?'  删':'  未删'));
}