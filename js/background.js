if(localStorage.condition.length==0){
    localStorage.condition = "length<=100;p_length<=30;p_num==1,length>=100;p_num==2,length>=350"
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request.greeting);

    var sender = request.greeting.substr(0,1)
    var greeting = request.greeting.substr(1,request.greeting.length-1)
    if(sender=="o"){
        localStorage.condition = greeting;
    }else{
        sendResponse({farewell: localStorage.condition});
    }
    
});

