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
let boxes = Array.from(document.querySelectorAll('.Aboxes .boxes'));
let Aboxes = document.querySelector('.Aboxes');

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


let cp = document.querySelector('.colorsPanle');

function valgetter(){
    return new Style(
        document.getElementById("TbgC").value,
        document.getElementById("IbgC").value,
        document.getElementById("InC").value,
        document.getElementById("OuC").value,
        document.getElementById("ErC").value
    )
}

function applyFun(){
    let vals = valgetter()
    root.style.setProperty('--bgColor',vals.TbgC);
    root.style.setProperty('--inpArea',vals.IbgC);
    root.style.setProperty('--input',vals.InC);
    root.style.setProperty('--output',vals.OuC);
    root.style.setProperty('--ere',vals.ErC);
}

function saveFun(e){
    let vals = valgetter();
    let newObj = new Style(vals.TbgC,vals.IbgC,vals.InC,vals.OuC,vals.ErC);
    let arr = JSON.parse(localStorage.styles);
    let index = e.textContent - 1;
    arr[index]=newObj;
    localStorage.setItem('styles',JSON.stringify(arr));
    localStorage.style = index;
    applyFun()
}

function downFun(){
    let vals = valgetter();
    let data = JSON.stringify(vals);
    let file = new Blob([data],{type:"txt"});
    let a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.classList.add("hide")
    a.download = file;
    document.body.appendChild(a);
    a.click()
}

function delFun(e){
    let index = e.textContent - 1;
    let arr = JSON.parse(localStorage.styles);
    arr.splice(index,1)
    boxes.splice(index,1)
    localStorage.setItem('styles',JSON.stringify(arr));
    localStorage.style = 0;
    e.remove();
    cp.classList.add('hide');
}

function cpevent(){
    cp.classList.toggle('hide');
    let apply = document.getElementById("apply");
    apply.addEventListener('click',applyFun);
    let save = document.getElementById("save");
    save.addEventListener('click',()=>{return saveFun(this)});
    let down = document.getElementById("down");
    down.addEventListener('click',downFun);
    let del = document.getElementById("del");
    del.addEventListener('click',()=>{
        return delFun(this)
    });
}



let addBox = document.querySelector('.add.boxes');
addBox.addEventListener('click', function(){
    if(boxes.length < 3){
        let newBox = `<div class="boxes">${boxes.length + 1}</div>`;
        Aboxes.innerHTML += newBox;
        boxes = Array.from(document.querySelectorAll('.Aboxes .boxes'));
        boxes[boxes.length - 1].addEventListener('click',cpevent);
        boxes[boxes.length - 1].click();
        let stylist = JSON.parse(localStorage.styles);
        stylist.push("");
        localStorage.styles = JSON.stringify(stylist);
    }
    if(boxes.length == 3){
        addBox.remove();
    }
})
