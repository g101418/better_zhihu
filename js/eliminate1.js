// console.log("Better_Zhihu is working...");

// var first_time = true;
// $(document).ready(function () {
//     $("div.QuestionAnswers-answers div.List-item").each(function () {
//         var p_num = $(this).find("span.RichText.ztext.CopyrightRichText-richText p,br,blockquote,code").length;
//         var text = $(this).find("span.RichText.ztext.CopyrightRichText-richText").text();
//         text = text.replace(/<img[^>]*>/g, "");
//         var length = text.length;
//         var p_length = length / p_num;
//         if (text.length < 1 || length <= 1) return;
//         console.log(text);
//         console.log("三：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
//         if (length <= 100 || p_length <= 30 || (p_num <= 1 && length >= 100) ||
//             (p_num == 2 && length >= 350)) {
//             $(this).remove();
//         }

//         if (first_time == true) {
//             var observer = new MutationObserver(function (mutations, observer) {
//                 $("div.QuestionAnswers-answers div.List-item").each(function () {
//                     // if ($(this).length < 1) return;  
//                     console.log("变化");
//                     var p_num = $(this).find("span.RichText.ztext.CopyrightRichText-richText p,br,blockquote,code").length;
//                     var text = $(this).find("span.RichText.ztext.CopyrightRichText-richText").text();
//                     text = text.replace(/<img[^>]*>/g, "");
//                     var length = text.length;
//                     var p_length = length / p_num;
//                     if (text.length < 1 || length <= 1) return;
//                     console.log(text);
//                     console.log("三：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
//                     if (length <= 100 || p_length <= 30 || (p_num <= 1 && length >= 100) ||
//                         (p_num == 2 && length >= 350)) {
//                         $(this).remove();
//                     }
//                 });
//             });
//             // console.log(document.getElementsByClassName("List-item")[0].parentElement);
//             observer.observe(document.getElementsByClassName("List-item")[0].parentElement, {
//                 'childList': true
//             });
//             first_time = false;
//         }
//     });
// });

// $('div.QuestionAnswers-answers div.Car div.List').find("div").not('.List-header').bind('contentchanged', function () {
//     // do something after the div content has changed 
//     alert('woo');
// });

// $('div.QuestionAnswers-answers div.Car div.List').find("div").not('.List-header').trigger('contentchanged'); 
// window.onload = function () {
//     console.log($("div.QuestionAnswers-answers>div.Card>div.List>div:eq(1)>div"));
//     $("div.QuestionAnswers-answers>div.Card>div.List>div:eq(1)>div").bind('DOMNodeInserted', function (e) {
//         console.log('element now contains: ');
//     });
// }

$(document).ready(function () {
    $("div.QuestionAnswers-answers div.List-item").each(function () {
        processItem($(this))
    })
})


$(document).ready(function () {
    var MutationObserver = window.MutationObserver;
    var observer = new MutationObserver(function (mutationRecords) {
        mutationRecords.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                var $addNode = $(mutation.addedNodes);
                console.log($addNode);

                // TODO: 处理获取的新节点
                processItem($addNode)
            }
        });
    });
    console.log('开始监控:')
    observer.observe($('div.QuestionAnswers-answers div.List>div:eq(1)>div')[0], {
        'childList': true
    })
});

function processItem(item) {
    var p_num = item.find("span.RichText.ztext.CopyrightRichText-richText p,br,blockquote,code").length;
    var text = item.find("span.RichText.ztext.CopyrightRichText-richText").text();
    text = text.replace(/<img[^>]*>/g, "");
    var length = text.length;
    var p_length = length / p_num;

    console.log(text);
    console.log("三：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
    if (length <= 100 || p_length <= 30 || (p_num <= 1 && length >= 100) ||
        (p_num == 2 && length >= 350)) {
        item.remove();
    }
}