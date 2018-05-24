    // var conditions = "text=aa,vv,啊的;length>12,length>=23,p_length>2;p_num<1;p_length==1;text=aa.a"

    // 关键字：text, length, p_length, p_num
    // 符号：  ,  ;  =  >  <  >=  <=  ==
    // 语法：  分号之前的所有判断都属于与判断,分号与分号之间的判断属于或判断；所有判断都是反向判断，即符合条件则删除对应回答
    // 对应编号：text(1,0)、length(2)、p_length(3)、p_num(4)
    // 对应编号：>(1)、<(2)、>=(3)、<=(4)、==(5)

    var judgeCondition = []
    var keywordCondition = []

    // console.log("结果:" + (check(conditions)))


    function check(conditions) {
        conditions = conditions.replace(/\n|\r|\t/g, ""); //去除所有回车、制表符
        conditions = conditions.replace(/\s+/g,""); //去除所有空格
        // console.log(conditions)
        if (conditions.length <= 0) {
            return false;
        }
        if (conditions[conditions.length - 1] == ";") {
            conditions = conditions.substring(0, conditions.length - 1)
        }

        var strs = conditions.split(';');
        // console.log(strs)
        for (var i = 0; i < strs.length; i++) {
            if (strs[i].length == 0) {
                return false;
            }
        }
        for (var i = 0; i < strs.length; i++) {
            var str = strs[i]
            items = str.split(',')
            for (var j = 0; j < items.length; j++) {
                var item = items[j]
                if (item.length == 0) {
                    return false;
                }
            }
            // console.log(items)
            if (items[0].substr(0, 5) == "text=") {
                if (items[0].length <= 5) {
                    return false;
                }
                var fst = items[0].substr(5, items[0].length - 5)
                if (fst.length == 0) {
                    return false;
                }
                var it = new Object();
                it.firstNum = 1;
                it.secondNum = 0;
                it.items = items.slice(1)
                it.items.unshift(fst)
                keywordCondition.push(it)
            } else {
                var itt = []
                for (var j = 0; j < items.length; j++) {
                    var item = items[j]
                    var it = new Object()
                    // console.log("item:" + item)
                    if (item.indexOf('==') >= 0) {
                        var ss = item.split('==')
                        // console.log(ss)
                        if (isNumber(ss[1])) {
                            if (ss[0] == "length") {
                                it.firstNum = 2;
                            } else if (ss[0] == "p_length") {
                                it.firstNum = 3;
                            } else if (ss[0] == "p_num") {
                                it.firstNum = 4;
                            } else {
                                return false;
                            }
                            it.secondNum = 5;
                        } else {
                            return false;
                        }
                    } else if (item.indexOf('>=') >= 0) {
                        var ss = item.split('>=')
                        // console.log(ss)
                        if (isNumber(ss[1])) {
                            if (ss[0] == "length") {
                                it.firstNum = 2;
                            } else if (ss[0] == "p_length") {
                                it.firstNum = 3;
                            } else if (ss[0] == "p_num") {
                                it.firstNum = 4;
                            } else {
                                return false;
                            }
                            it.secondNum = 3;
                        } else {
                            return false;
                        }
                    } else if (item.indexOf('<=') >= 0) {
                        var ss = item.split('<=')
                        // console.log(ss)
                        if (isNumber(ss[1])) {
                            if (ss[0] == "length") {
                                it.firstNum = 2;
                            } else if (ss[0] == "p_length") {
                                it.firstNum = 3;
                            } else if (ss[0] == "p_num") {
                                it.firstNum = 4;
                            } else {
                                return false;
                            }
                            it.secondNum = 4;
                        } else {
                            return false;
                        }
                    } else if (item.indexOf('>') >= 0) {
                        var ss = item.split('>')
                        // console.log(ss)
                        if (isNumber(ss[1])) {
                            if (ss[0] == "length") {
                                it.firstNum = 2;
                            } else if (ss[0] == "p_length") {
                                it.firstNum = 3;
                            } else if (ss[0] == "p_num") {
                                it.firstNum = 4;
                            } else {
                                return false;
                            }
                            it.secondNum = 1;
                        } else {
                            return false;
                        }
                    } else if (item.indexOf('<') >= 0) {
                        var ss = item.split('<')
                        // console.log(ss)
                        if (isNumber(ss[1])) {
                            if (ss[0] == "length") {
                                it.firstNum = 2;
                            } else if (ss[0] == "p_length") {
                                it.firstNum = 3;
                            } else if (ss[0] == "p_num") {
                                it.firstNum = 4;
                            } else {
                                return false;
                            }
                            it.secondNum = 2;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                    it.num = parseInt(ss[1])
                    // console.log("int:" + ss[1])
                    itt.push(it)
                }
                judgeCondition.push(itt)
            }
        }
        return conditions;
    }

    function isNumber(s) {
        if (s != null && s.length > 0) {
            var r, re;
            re = /\d*/i; //\d表示数字,*表示匹配多个数字
            r = s.match(re);
            return (r == s) ? true : false;
        }
        return false;
    }