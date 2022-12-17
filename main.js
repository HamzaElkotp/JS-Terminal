let outScreen = window.OutScreen;
let codeInp = document.getElementById("CMinput");

console.oldLog = console.log;
console.log = function(value){
    console.oldLog(value);
    return value;
};

function newInput(code){
    let inputT = document.createElement("p");
    inputT.classList.add("code","inputT");
    inputT.textContent = `> ${code}`;
    outScreen.append(inputT);
    newOutput(code);
}

function newOutput(code){
    let outPutT = document.createElement("p");
    outPutT.classList.add("code","outputT")
    try{
        outPutT.textContent = eval(code); 
    }catch(err){
        outPutT.textContent = `${code, err}`;
        outPutT.classList.add("err")
    }
    outScreen.append(outPutT);
}

function factory(){
    let code = document.getElementById("CMinput").value;
    newInput(code);
}

codeInp.addEventListener("keydown",function(e){
    if (e.key === "Enter" && !e.shiftKey){
        factory()
        codeInp.value = ""
    }
})






