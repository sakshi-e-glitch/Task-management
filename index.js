

      let myTasks = [];
  let taskContents = document.getElementById('taskContentsrow');

  const newTask = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        desc: document.getElementById('task-desc').value,
        deadline: document.getElementById('deadline').value,
    }
    
    taskContents.insertAdjacentHTML('beforeend',generateTask(newTaskDetails))

    myTasks.push(newTaskDetails);
    saveToLocalStorage()
}    

const generateTask = ({id,desc,deadline}) => {
  return(
    
    `<li class="list-group-item" id=${id} key=${id}>
    <input class="form-check-input me-1" type="checkbox"  value="" aria-label="...">
    <small>Deadline: </small>
    <input type="date" name="deadline" id="deadline" value= "${deadline}" contenteditable="false">
    
    <div  class="content">
    ${desc}
    </div>
    <br>
    <button type="button" class="btn btn-danger"  name=${id}  onclick="deleteTask(this)"><i class="fas fa-trash"  name=${id}  onclick="deleteTask(this)"></i></button>
    <button type="button" id="edit" class="btn btn-info" name=${id} onclick="editTask(this)"><i class="fas fa-edit" name=${id} onclick="editTask(this)"></i></button>
    <button type="button" id="save" class="btn btn-info disabled " aria-disabled="true"  name=${id} onclick="saveEditTask(this)">Save Changes</button>
    
  </li>`
          )

}


const saveToLocalStorage = () => {
  localStorage.setItem("taskList", JSON.stringify({tasks: myTasks}))
}

const reloadTaskCard = () => {
  const localStorageCopy = JSON.parse( localStorage.getItem("taskList"))
  console.log(localStorageCopy)
  if(localStorageCopy) {
      myTasks = localStorageCopy["tasks"]
  }
  myTasks.map((cardData) => {
      taskContents.insertAdjacentHTML('beforeend',generateTask(cardData))
  })
}


const deleteTask = (e) => {
  const targetID = e.getAttribute("name")
  myTasks = myTasks.filter((entryData) => entryData.id!=targetID)
  saveToLocalStorage();
  window.location.reload();
 }



const editTask = (e) => {
  console.log(e);
  // console.log(e.tagName);
  // const elementType = e.tagName;

  let parentElement;
  let newDeadline;
  let newDesc;
  let saveBtn;
 
  parentElement = e.parentNode;

  newDeadline = parentElement.childNodes[5];
  newDesc = parentElement.childNodes[7];
  saveBtn = parentElement.childNodes[15];
  

  newDeadline.setAttribute("contenteditable", "true");
  newDesc.setAttribute("contenteditable", "true");


  console.log(e.childNodes[1]);
  saveBtn.setAttribute("aria-disabled", "false")
  saveBtn.classList.remove('disabled')
  saveBtn.setAttribute("onclick", "saveEditedTask(this)");
};

const saveEditedTask = (e) => {
  console.log(e);
  const targetID = e.getAttribute("name");
  console.log(targetID);
  const elementType = e.tagName;
  // console.log(elementType);
  let parentElement;

  parentElement = e.parentNode;

  const newDeadline = parentElement.childNodes[5];
  const newDesc = parentElement.childNodes[7];
  const saveBtn = parentElement.childNodes[15];

  const updatedTaskData = {
    deadline: newDeadline.value,
    desc: newDesc.innerHTML,
  };

  console.log({ updatedTaskData, targetID });

  const updateGlobalTask = myTasks.map((task) => {
    if (task.id === targetID) {
      console.log({ ...task, ...updatedTaskData });
      return { ...task, ...updatedTaskData };
    }
    return task;
  });

  myTasks = updateGlobalTask;

  saveToLocalStorage();

  newDeadline.setAttribute("contenteditable", "false");
  newDesc.setAttribute("contenteditable", "false");

  console.log(e.childNodes[1].classList);
  saveBtn.setAttribute("aria-disabled", "true")
  saveBtn.classList.add('disabled')


  window.location.reload();
  reloadTaskCard()
};

