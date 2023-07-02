// Fundmetals of Terminal script
let outScreen = window.OutScreen;
let codeInp = document.getElementById("CMinput");

console.oldLog = console.log;
console.log = function(value){
    console.oldLog(value);
    return value;
};


let codes = "";
function newInput(code){
    let inputT = document.createElement("p");
    inputT.classList.add("code","inputT");
    inputT.textContent = `> ${code}`;

    codes += `${code}`+"\n"

    let copyB = document.createElement("button");
    copyB.classList.add("button","is-primary");
    copyB.textContent = `copy`;
    copyB.onclick = function(){
        copyFun(copyB)
    }

    inputT.append(copyB);
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




// Code of Terminal Settings and controle
class Style{
    constructor(TbgC,IbgC,InC,OuC,ErC){
        this.TbgC = TbgC;
        this.IbgC = IbgC;
        this.InC = InC;
        this.OuC = OuC;
        this.ErC = ErC;
    }
}

function applyStyle(inx){
    root.style.setProperty('--bgColor', JSON.parse(localStorage.styles)[inx].TbgC);
    root.style.setProperty('--inpArea', JSON.parse(localStorage.styles)[inx].IbgC);
    root.style.setProperty('--input', JSON.parse(localStorage.styles)[inx].InC);
    root.style.setProperty('--output', JSON.parse(localStorage.styles)[inx].OuC);
    root.style.setProperty('--err', JSON.parse(localStorage.styles)[inx].ErC);
}


let root = document.querySelector(':root');
let boxes = [...document.querySelectorAll('.Aboxes .boxes')];
let Aboxes = document.querySelector('.Aboxes');




let cp = document.querySelector('.colorsPanle');
let styleNumber = 0; // the style index to can select it easy in the  LocalStorge

function cpevent(index){
    cp.classList.toggle('hide');
    styleNumber = index - 1;
    // console.log(styleNumber)
}

function valgetter(){ // take the values from every color input to object
    return new Style(
        document.getElementById("TbgC").value,
        document.getElementById("IbgC").value,
        document.getElementById("InC").value,
        document.getElementById("OuC").value,
        document.getElementById("ErC").value
    )
}
function styleGettByIndex(inx){ // take the values of color by index from local storage
    let val = JSON.parse(localStorage.styles)[inx];
    return val
}
function styleApplyByIndex(indx){ // apply style using its index
    localStorage.style = indx;
    applyStyle(indx);
}


let apply = document.getElementById("apply");
function applyFun(){ // apply style when click apply
    let vals = valgetter()
    root.style.setProperty('--bgColor',vals.TbgC);
    root.style.setProperty('--inpArea',vals.IbgC);
    root.style.setProperty('--input',vals.InC);
    root.style.setProperty('--output',vals.OuC);
    root.style.setProperty('--ere',vals.ErC);
    return vals
}
apply.addEventListener('click',applyFun);


let save = document.getElementById("save");
function saveFun(){ // save new colors to localstorage
    let newObj = valgetter()
    let arr = JSON.parse(localStorage.styles);
    arr[styleNumber]=newObj;
    localStorage.setItem('styles',JSON.stringify(arr));
    styleApplyByIndex(styleNumber)
}
save.addEventListener('click',saveFun);


let down = document.getElementById("down");
function downFun(){
    let vals = styleGettByIndex(styleNumber);
    let data = JSON.stringify(vals);
    let file = new File([data], "colorCode.txt", {type:"text/txt"});
    let url = URL.createObjectURL(file);

    let a = document.createElement("a"); 
    a.href = url;
    a.download = `${file.name}.txt`;

    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
down.addEventListener('click', downFun);


let del = document.getElementById("del");
function delFun(){
    let arr = JSON.parse(localStorage.styles);
    arr.splice(styleNumber,1);
    boxes[styleNumber].remove();
    boxes.splice(styleNumber,1);
    localStorage.setItem('styles',JSON.stringify(arr));
    localStorage.style = 0;
    cp.classList.add('hide');
    for(let i=0; i<boxes.length; i++){
        boxes[i].textContent = i+1
    }
}
del.addEventListener('click',delFun);


let copyBox = document.querySelector(".copy");
function copyFun(e){ // code copy function, using clipboard API
    let code = e.previousSibling.textContent;
    navigator.clipboard
    .writeText(code.replace("> ",""))
    .then(()=>{
        copyBox.classList.add("active");
    })
    .then(()=>{
        setTimeout(()=>{
            copyBox.classList.remove("active");
        },4500)
    })
}


function downCode(){
    let file = new File([codes], "jsCode.js", {type:"text/js"});
    let url = URL.createObjectURL(file);

    let a = document.createElement("a");
    a.href = url;
    a.download = `${file.name}.js`;

    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}





let addBox = document.querySelector('.add.boxes');
addBox.addEventListener('click', function(){
    if(boxes.length < 3){
        let newBox = document.createElement('div');
        newBox.classList.add("boxes");
        newBox.textContent = boxes.length+1;
        Aboxes.appendChild(newBox);

        addevent(newBox)
        let stylist = JSON.parse(localStorage.styles);
        stylist.push(new Style("#111","#1d1d1d","#fff","#00ffcc","#ff0040"));
        localStorage.styles = JSON.stringify(stylist);

        newBox.click();
    }
    if(boxes.length >= 2){
        addBox.remove();
    }
    boxes = [...document.querySelectorAll('.Aboxes .boxes')]
});


function localStyleDom(){
    let styles = JSON.parse(localStorage.styles);
    for(let i=0;i<styles.length;i++){
        let newBox = document.createElement('div');
        newBox.classList.add("boxes");
        newBox.textContent = i+1
        Aboxes.appendChild(newBox);
        addevent(newBox);
    }
}


window.addEventListener('load',function(){
    // Defualt Style
    if(localStorage.styles == "[]" || localStorage.styles == undefined){
        let styles = [new Style("#111","#1d1d1d","#fff","#00ffcc","#ff0040")];
        localStorage.setItem("styles", JSON.stringify(styles));
        styleApplyByIndex(0);
    }else{
        applyStyle(localStorage.style);
    }

    // Add styles to DOM as buttons
    localStyleDom();

    // Check if there is more than 2 boxes to remove add button
    boxes = [...document.querySelectorAll('.Aboxes .boxes')]
    if(boxes.length == 3){
        addBox.remove();
    }

})

function addevent(ele){
    ele.addEventListener("click", function(e){
        let indx = +e.target.textContent;
        cpevent(indx)
        styleApplyByIndex(indx - 1)
    })
}