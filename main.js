// Fundmetals of Terminal script
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


let root = document.querySelector(':root');
let boxes = [...document.querySelectorAll('.Aboxes .boxes')];
let Aboxes = document.querySelector('.Aboxes');

function applyStyle(inx){
    root.style.setProperty('--bgColor', JSON.parse(localStorage.styles)[inx].TbgC);
    root.style.setProperty('--inpArea', JSON.parse(localStorage.styles)[inx].IbgC);
    root.style.setProperty('--input', JSON.parse(localStorage.styles)[inx].InC);
    root.style.setProperty('--output', JSON.parse(localStorage.styles)[inx].OuC);
    root.style.setProperty('--err', JSON.parse(localStorage.styles)[inx].ErC);
}


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
    console.log(e)
    let vals = valgetter();
    let newObj = new Style(vals.TbgC, vals.IbgC, vals.InC, vals.OuC, vals.ErC);
    let arr = JSON.parse(localStorage.styles);
    let index = e - 1;
    console.log(`### ${JSON.stringify(arr[index])}`)
    arr[index]=newObj;
    console.log(`*** ${JSON.stringify(arr[index])}`)
    localStorage.setItem('styles',JSON.stringify(arr));
    localStorage.style = index;
    // applyFun()
}

// function downFun(){
//     let vals = valgetter();
//     let data = JSON.stringify(vals);
//     let file = new Blob([data],{type:"txt"});
//     let a = document.createElement("a"), url = URL.createObjectURL(file);
//     a.href = url;
//     a.classList.add("hide")
//     a.download = file;
//     document.body.appendChild(a);
//     a.click()
// }

// function delFun(e){
//     let arr = JSON.parse(localStorage.styles);
//     arr.splice(e,1)
//     boxes.splice(e,1)
//     localStorage.setItem('styles',JSON.stringify(arr));
//     localStorage.style = 0;
//     boxes[e].remove();
//     cp.classList.remove('hide');
// }

let styleNumber = 0;
function cpevent(index){
    cp.classList.toggle('hide');
    styleNumber = index - 1;
    console.log(styleNumber)

    // let apply = document.getElementById("apply");
    // apply.addEventListener('click',applyFun);

    // let save = document.getElementById("save");
    // save.addEventListener('click',()=>{
    //     return saveFun(index)
    // });

    // let down = document.getElementById("down");
    // down.addEventListener('click',downFun);

    // let del = document.getElementById("del");
    // del.addEventListener('click',()=>{
    //     return delFun(index)
    // });
}



let addBox = document.querySelector('.add.boxes');
addBox.addEventListener('click', function(){
    if(boxes.length < 3){
        let newBox = document.createElement('div');
        newBox.classList.add("boxes");
        newBox.textContent = boxes.length+1;
        Aboxes.appendChild(newBox);

        addevent(newBox)
        // newBox.addEventListener('click',(e)=>{
        //     console.log(e)
        //     console.log(e.target)
        //     console.log(e.target.textContent)
        // })
        // addTable();
        // boxes[boxes.length - 1].click();
        let stylist = JSON.parse(localStorage.styles);
        stylist.push("");
        localStorage.styles = JSON.stringify(stylist);
    }
    if(boxes.length >= 2){
        addBox.remove();
    }
    boxes = [...document.querySelectorAll('.Aboxes .boxes')]
});


// function addTable(){
//     boxes = [...document.querySelectorAll('.Aboxes .boxes')];
//     // boxes.forEach((elo,i)=>{
//     //     elo.removeEventListener('click',function(){cpevent(i)})
//     //     elo.addEventListener('click',function(){
//     //         cpevent(i)
//     //     })
//     // })
// }

function localStyleDom(){
    let styles = JSON.parse(localStorage.styles);
    for(let i=0;i<styles.length;i++){
        let newBox = document.createElement('div');
        newBox.classList.add("boxes");
        newBox.textContent = i+1
        Aboxes.appendChild(newBox);
        addevent(newBox)
    }
}


window.addEventListener('load',function(){
    // Defualt Style
    if(localStorage.style == undefined){
        let styles = [new Style("#111","#1d1d1d","#fff","#00ffcc","#ff0040")];
        localStorage.setItem("styles", JSON.stringify(styles));
        localStorage.style = 0;
        applyStyle(0);
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
    })
}