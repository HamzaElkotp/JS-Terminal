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


class Style{
    constructor(TbgC,IbgC,InC,OuC,ErC){
        this.TbgC = TbgC;
        this.IbgC = IbgC;
        this.InC = InC;
        this.OuC = OuC;
        this.ErC = ErC;
    }

}


let root = document.querySelector(':root');

function applyStyle(inx){
    root.style.setProperty('--bgColor', JSON.parse(localStorage.styles)[inx].TbgC);
    root.style.setProperty('--inpArea', JSON.parse(localStorage.styles)[inx].IbgC);
    root.style.setProperty('--input', JSON.parse(localStorage.styles)[inx].InC);
    root.style.setProperty('--output', JSON.parse(localStorage.styles)[inx].OuC);
    root.style.setProperty('--err', JSON.parse(localStorage.styles)[inx].ErC);
}


window.addEventListener('load',function(){
    if(localStorage.style == undefined){
        let styles = [new Style("#111","#1d1d1d","#fff","#00ffcc","#ff0040")];
        localStorage.setItem("styles", JSON.stringify(styles));
        localStorage.style = 0;
        applyStyle(0);
    }else{
        applyStyle(localStorage.style);
    }
})



let boxes = Array.from(document.querySelectorAll('.Aboxes .boxes'));

let addBox = document.querySelector('.add.boxes');
addBox.addEventListener('click', function(){
    if(boxes.length < 3){
        let newBox = `<div class="boxes">${boxes.length + 1}</div>`;
        document.querySelector('.Aboxes').innerHTML += newBox;
        boxes = Array.from(document.querySelectorAll('.Aboxes .boxes'))
        boxes[boxes.length - 1].addEventListener('click',cpevent(ele))
        boxes[boxes.length - 1].click()
    }
    if(boxes.length == 3){
        addBox.remove() 
    }
})
