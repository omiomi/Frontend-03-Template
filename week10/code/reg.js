var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;
var dictionary = ["Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"];


function* tokenize(source){
    var result = null;
    var lastIndex = null;
    while(true){
        lastIndex = regexp.lastIndex;
        result = regexp.exec(source);                
        if(!result){
            break; 
        } 
        if(regexp.lastIndex - lastIndex > result[0].length){
            break;
        }

        let token = {
            type: null,
            value: null
        }

        for(let i = 1; i<= dictionary.length; i++){
            if(result[i]){
                token.type = dictionary[i-1];
                token.value = result[i];
            }
        }
        yield token; 
    }
    yield {type: "EOF"};
}

let source = [];
for(let token of tokenize("10 - 25 * 5")){
    if(token.type!=='Whitespace' && token.type!=='LineTerminator')
        source.push(token);
}

function expression(source){
    if(source[0].type==="AdditiveExpression" && source[1] && source[1].type==="EOF"){
        let node = {
            type: "Expression",
            children: [source.shift(), source.shift()]
        }
        source.unshift(node);
        return node; // not return source, because we want a tree instead of a list
    }
    additiveExpression(source);
    return expression(source);
}

function additiveExpression(source){
    if(source[0].type === "MultiplicativeExpression"){
        let node = {
            type: "AdditiveExpression",
            children: [source[0]]
        }
        source[0] = node;
        return additiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression" && source[1] && (source[1].type==="+"|| source[1].type==="-")){
        let node = {
            type: "AdditiveExpression",
            operator: source[1].type,
            children: [] 
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        multiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return additiveExpression(source);
    }
    // it's a default else branch
    if(source[0].type==="AdditiveExpression"){
        return source[0]; // remove EOF in the final result
    }
    multiplicativeExpression(source);
    return additiveExpression(source);
}

function multiplicativeExpression(source){
    if(source[0].type === "Number"){
        let node = {
            type: "MultiplicativeExpression",
            children: [source[0]]
        }
        source[0] = node;
        return multiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression" && source[1] && (source[1].type==="*" || source[1].type==="/")){
        let node = {
            type: "MultiplicativeExpression",
            operator: source[1].type,
            children: [] 
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return multiplicativeExpression(source);
    }
    // it's a default else branch
    if(source[0].type==="MultiplicativeExpression"){
        return source[0]; // remove EOF in the final result
    }

    return multiplicativeExpression(source);//It's never be called?
}
console.log(JSON.stringify(expression(source)));