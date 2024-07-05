// 유저가 input에 값을 입력한다 
// + 버튼을 클릭하면 할일이 추가된다 
// delete 버튼을 누르면 할일 삭제 
// check 누르면 할일이 끝나면서 밑줄이 간다 

// 마지막 강의
// 커서를 변경하기 
// 크

// 진행 중 끝남 탭을 누르면 언더바가 이동함 
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [] ; 
let tabs = document.querySelectorAll(".task-tabs>div") ;
let mode = "all" ;
let filterList = [] ;
let underLine = document.getElementById("tab-underline");

for (let i=1 ; i<tabs.length ; i++) {
    tabs[i].addEventListener("click",function(event){filter(event)});
}

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });

function addTask () { 
    let taskValue = taskInput.value;
    if (taskValue === "") return alert("할일을 입력해주세요");

    let task = {
        taskContent : taskInput.value,
        id : randomIdGenerate () ,
        isComplete : false ,
    }
    taskList.push(task);
    taskInput.value = "" ;
    console.log(taskList) ;
    render ();
    
}


function render () {
    let list = [] ;

    if (mode==="all") {
        list = taskList ;
    } else {
        list = filterList ;
    }

    let resultHTML = `` ;
    for ( let i = 0 ; i < list.length ; i++) {
        if (list[i].isComplete==true) {
            resultHTML += `<div class="task">
          <div class="underline"> ${list[i].taskContent} </div>
          <div>
            <button onclick=toggleComplete('${list[i].id}')><i class="fa-solid fa-arrow-rotate-left icon"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash icon"></i></button>
           </div>  
        </div>`
        } else {
            resultHTML += `<div class="task">
            <div> ${list[i].taskContent} </div>
            <div>
            <button onclick=toggleComplete('${list[i].id}')><i class="fa-solid fa-check icon"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash icon"></i></button>
             </div>  
          </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML ;
}


function toggleComplete(id) {
    for (let i=0 ; i<taskList.length ; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete ;
            break ; 
        }
    }
    filter () ;
}

function deleteTask (id) {
    for ( let i=0 ; i<taskList.length ; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1);
            break ;
        }
    }

    filter () ;
}

function filter (e) {
    if (e) {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
          e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
      }

    mode = event.target.id;
    filterList = [] ;

    console.log(mode) ;
    if  (mode==="ongoing") {
        //isComplete : false 인값만 보여주기
        for(let i=0 ; i<taskList.length ; i++) {
            if (taskList[i].isComplete===false) {
                filterList.push(taskList[i]) ;
            }
        } 
    } else if (mode==="done") {
        for ( let i=0 ; i<taskList.length ; i++) {
            if(taskList[i].isComplete===true) {
                filterList.push(taskList[i]) ;
            }
        }
        
    }
    render () ;
}

function randomIdGenerate () {
    return "_" + Math.random().toString(36).substr(2, 9);
}