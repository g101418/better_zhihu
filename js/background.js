chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request.greeting);

    var sender = request.greeting.substr(0,1)
    var greeting = request.greeting.substr(1,request.greeting.length-1)
    if(sender=="o"){
        localStorage.condition = greeting;
    }else{
        if(localStorage.condition){
            console.log("send:"+localStorage.condition)
            sendResponse({farewell: localStorage.condition});
        }else{
            sendResponse({farewell: ""});
        }
    }
    
});

