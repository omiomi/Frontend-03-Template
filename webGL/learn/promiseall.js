const promiseAll = (promises)=> {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (var i = 0; i < promiseNum; i++) {
            (function (i) {
                Promise.resolve(promises[i]).then(function (value) {
                    
                    resolvedCounter++
                    resolvedValues[i] = value
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedValues)
                    }
                }, function (reason) {
                    return reject(reason)
                })
            })(i)
        }
    })
}


var p1 = Promise.resolve(1).then(res=>{
         console.log('aaaa---',res)
    }),
    p2 = Promise.resolve(2).then(res=>{
        console.log('aaaa---',res)
    })
    p3 = Promise.reject(3).then(res=>{
        console.log('aaaa---',res)
    })

promiseAll([p1,p2,p3])