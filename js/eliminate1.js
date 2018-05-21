console.log("Better_Zhihu is working...");

var first_time = true;
$(document).ready(function () {
    $("div.QuestionAnswers-answers div.List-item").each(function () {
        var p_num = $(this).find("span.RichText.ztext.CopyrightRichText-richText p,br").length;
        var text = $(this).find("span.RichText.ztext.CopyrightRichText-richText").text();
        text = text.replace(/<img[^>]*>/g, "");
        var length = text.length;
        var p_length = length / p_num;
        if (text.length < 1 || length <= 1) return;
        console.log(text);
        console.log("三：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
        if (length <= 100 || p_length <= 30 || (p_num <= 1 && length >= 100) ||
            (p_num == 2 && length >= 350)) {
            $(this).remove();
        }

        if (first_time == true) {
            var observer = new MutationObserver(function (mutations, observer) {
                $("div.QuestionAnswers-answers div.List-item").each(function () {
                    // if ($(this).length < 1) return;  
                    console.log("变化");
                    var p_num = $(this).find("span.RichText.ztext.CopyrightRichText-richText p,br").length;
                    var text = $(this).find("span.RichText.ztext.CopyrightRichText-richText").text();
                    text = text.replace(/<img[^>]*>/g, "");
                    var length = text.length;
                    var p_length = length / p_num;
                    if (text.length < 1 || length <= 1) return;
                    console.log(text);
                    console.log("三：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
                    if (length <= 100 || p_length <= 30 || (p_num <= 1 && length >= 100) ||
                        (p_num == 2 && length >= 350)) {
                        $(this).remove();
                    }
                });
            });
            // console.log(document.getElementsByClassName("List-item")[0].parentElement);
            observer.observe(document.getElementsByClassName("List-item")[0].parentElement, {
                'childList': true
            });
            first_time = false;
        }
    });
});