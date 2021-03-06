/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (source,pattern)=>{
    if(pattern==="" || source === pattern) return 0
    //计算table找重复子串
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1, j=0
        while(i<pattern.length){
            if(pattern[i] === pattern[j]){
                ++j,++i;
                table[i] = j
            }else{
                if(j>0){
                    j = table[j];
                }else{
                    ++i
                }
            }
        }
    }
    {
        let i = 0, j = 0
        while(i<source.length){
            if(source[i] === pattern[j]){
                ++i,++j
            }else{
                if(j>0){
                    j = table[j]
                }else{
                    ++i
                }
            }
            if(j === pattern.length)
                return i-j
        }
        return -1
    }

}


// console.log(strStr("mississippi","issip"))
let result3 =strStr('mississippi','issip')
console.log(result3);
// let result = KMP('hello','ll')
// console.log(result);
// let result2 = KMP('abcaabcea','abcdabce')
// console.log(result2);

// KMP('','aabaaac')

// console.log(strStr("hello","ll"));
// strStr("mississippi","issip")
console.log(strStr("mississippi","issip"))