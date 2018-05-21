console.log("Better_Zhihu is working...");

$(document).ready(function () {
    $("div.Card.AnswerCard div.QuestionAnswer-content").each(function () {
        var p_num = $(this).find("span.RichText.ztext.CopyrightRichText-richText p,br").length;
        var text = $(this).find("span.RichText.ztext.CopyrightRichText-richText").text();
        text = text.replace(/<img[^>]*>/g,"");
        var length = text.length;
        var p_length = length / p_num;
        console.log(text);
        console.log("一：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
        if (length <= 100 || p_length <= 40 || (p_num <= 1 && length >= 100) 
            || (p_num == 2 && length >= 350)) {
            $(this).remove();
        }
    });

    $("div.Card.MoreAnswers div.List-item").each(function () {
        var p_num = $(this).find("span.RichText.ztext.CopyrightRichText-richText p,br").length;
        var text = $(this).find("span.RichText.ztext.CopyrightRichText-richText").text();
        text = text.replace(/<img[^>]*>/g,"");
        var length = text.length;
        var p_length = length / p_num;

        console.log(text);
        console.log("二：length:" + length + " p_num:" + p_num + " p_length:" + p_length);
        if (length <= 100 || p_length <= 40 || (p_num <= 1 && length >= 100) 
            || (p_num == 2 && length >= 350)) {
            $(this).remove();
        }
    });
});