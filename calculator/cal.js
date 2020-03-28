let keys = document.querySelector(".keypad")
let screen = document.querySelector(".screen")
let numkey=0;
let open=0;
keys.addEventListener("click",selected)
function selected(){
    if(event.target.id!=""){
        if(event.target.id=="eval"){
            screen.textContent=eval(screen.textContent).toFixed(10)
        }
        else if(event.target.id=="clear"){
            screen.textContent="0"
            numkey=0
        }
        else {
            let key = document.getElementsByClassName(event.target.className)[0].textContent
            var string =screen.textContent
            if(numkey==0&&key=="-"){
                screen.textContent=key
                numkey=1
                return
            }
            if(numkey==0&&key=="."){
                screen.textContent+="."
                numkey=1
                return
            }
            if(numkey==0){
                numkey=1
                screen.textContent=""
            }
            if(checkNumber(key)){
                if(string==""||!(string.charAt(string.length-1)==")")){
                screen.textContent+=key
                }
            }
            else if(checkOperator(key)){
                screen.textContent=addOperator(screen.textContent,key)
            }
            else{
                screen.textContent=addBrackets(screen.textContent,key)
            }
        }
    }
}
function addBrackets(string, op){
    if(addAbleBrackets(string)){
    if(op=="("){
        open++;
        string= string+"(";
    }
}
    if(checkNumber(string.charAt(string.length-1))){
    if(op==")"&&open>0){
            open--;
            string= string+")";
    }
}
    return string
}
function addAbleBrackets(string){
    return string==""||(string.charAt(string.length-1)!="."&&checkOperator(string.charAt(string.length-1))||string.charAt(string.length-1)=="(")
}
function addOperator(string,op){
    if(op=="."){
        var flag=0
        for(var i=0;i<string.length;i++){
            if(string.charAt(i)=="."){
                flag=1;
            }
            else{
                if(checkOperator(string.charAt(i))){
                    flag=0;
                }
            }
        }
        if(flag==1){
            return string
        }
    }
    if(!checkOperator(string.charAt(string.length-1))){
        return string+op
    }
    else{
        return string.substring(0,string.length-1)+op
    }
}
function checkNumber(string){
    var numbers = ["0","1","2","3","4","5","6","7","8","9"]
    if(numbers.indexOf(string)!=-1){
        return true
    }
    return false
}
function checkOperator(string){
    var operators =["+","-","*","%","/","."]
    if(operators.indexOf(string)!=-1){
        return true
    }
    return false
}