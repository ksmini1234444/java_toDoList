// 유저가 input에 값을 입력한다 
// + 버튼을 클릭하면 할일이 추가된다 
// delete 버튼을 누르면 할일 삭제 
// check 누르면 할일이 끝나면서 밑줄이 간다 
// 1.check 버튼을 클릭하면 false를 true로 바꿔줌 
// 2. treu이면 끝난 것으로 간주하고 밑줄 
// 진행 중 끝남 탭을 누르면 언더바가 이동함 
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []

addButton.addEventListener("click",addTask);

function addTask () { 
    //let taskContent = taskInput.value;
    let task = {
        id : randomIdGenerate() ,
        taskContent : taskInput.value,
        isComplete : false , 

    } ;

    taskList.push(task);
    console.log(taskList) ;
    render ();
    
}

function render () {
    let resultHTML = `` ; 

    for ( let i = 0 ; i < taskList.length ; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
          <div class="underline"> ${taskList[i].taskContent} </div>
          <div>
            <button onclick=toggleComplete('${taskList[i].id}')><i class="fa-solid fa-arrow-rotate-left icon"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash icon"></i></button>
           </div>  
        </div>`
        } else { resultHTML += `<div class="task">
          <div> ${taskList[i].taskContent} </div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check icon"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash icon"></i></button>
           </div>  
        </div>` }
    }

    document.getElementById("task-board").innerHTML = resultHTML ;
}


function toggleComplete (id) {
   for ( let i=0 ; i<taskList.length ; i++){
    if (taskList[i].id == id ) {
        taskList[i].isComplete =!taskList[i].isComplete ;
        break;
    }
  }
   render ();
}

function deleteTask(id) {
    for (let i=0 ; i<taskList.length ; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1)
        }
        console.log(taskList)
    }
    render();
}

function randomIdGenerate () {
    return "_" + Math.random().toString(36).substr(2, 9);
}