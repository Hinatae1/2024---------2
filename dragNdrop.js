//=======================================================
//global variable zone
//-------------------------------------------------------
let draggingMenu = null;     //현재 드래깅 시작한 객체
let dragOverBox = null;      //드래깅 중인 객체가 올라간 객체


//=======================================================
//Menu event handler zone
//-------------------------------------------------------
function onDragStartMenu(event) {
    draggingMenu = this;                //자신이 드래깅 객체임을 공지
    this.classList.add("draggingMenu"); //드래깅 중인 객체의 시각적 강조
    document.querySelector("p").innerHTML += `Started ${$(this).attr("menuname")} Dragging<br>`;
}

//-------------------------------------------------------
function onDragEndMenu(event){
    draggingMenu = null;                    //더 이상 드래깅 중인 객체가 없음 으로 설정
    this.classList.remove("draggingMenu");  //드래깅 중인 객체의 시각적 강조 해제
    document.querySelector("p").innerHTML += `Ended ${$(this).attr("menuname")} Dragging<br>`;
}
//=======================================================
//Box event handler zone
//-------------------------------------------------------
function onDragOverBox(event) {
    event.preventDefault(); //시스템에서 사전에 설정해 놓은 처리 기능을 해제
    dragOverBox = this;
    this.classList.add("overBox");
}
//-------------------------------------------------------
function onDragLeaveBox(event){
    dragOverBox = null;
    this.classList.remove("overBox");
}



//======================================================
$(document).ready(function(){
    //Menu handler
    let menuArray = document.getElementsByClassName("menu");
    for(let menu of menuArray){
        menu.addEventListener("dragstart", onDragStartMenu);
        menu.addEventListener("dragend", onDragEndMenu);
    }
    //Box handler
    let boxArray = document.getElementsByClassName("box");
    for(let box of menuArray){
        box.addEventListener("dragover", onDragOverBox);
        box.addEventListener("dragleave", onDragLeaveBox);
    }

})


