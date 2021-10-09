function resetForm() {
    document.getElementById("form").reset();
  }

  let myDiary = [];
  let taskContents = document.getElementById('taskContentsrow');

  const newEntry = () => {
    const newEntryDetails = {
        id: `${Date.now()}`,
        entryDate: document.getElementById('diarydate').value,
        messageText: document.getElementById('message-text').value
    }
    
    taskContents.insertAdjacentHTML('afterbegin',generateEntry(newEntryDetails))

    myDiary.push(newEntryDetails);
    saveToLocalStorage()
}    

const generateEntry = ({id,entryDate,messageText}) => {
  return(
      `    <section  id=${id} key=${id}>
      <div class="card text-center text-light bg-dark ">
        <div class="card-header">
          <h7 class="card-title">${entryDate}</h7>
        </div>
        <div class="card-body">
          <p class="card-text">${messageText}</p>
          <button type="button" class="btn btn-primary" name=${id} onclick="deleteEntry(this)">Delete Memory</button>
        </div>
      </div>
    </div>
    </section>`
          )

}


const saveToLocalStorage = () => {
  localStorage.setItem("diary", JSON.stringify({entries: myDiary}))
}

const reloadTaskCard = () => {
  const localStorageCopy = JSON.parse( localStorage.getItem("diary"))
  console.log(localStorageCopy)
  if(localStorageCopy) {
      myDiary = localStorageCopy["entries"]
  }
  myDiary.map((cardData) => {
      taskContents.insertAdjacentHTML('afterbegin',generateEntry(cardData))
  })
}

const deleteEntry = (e) => {
  const targetID = e.getAttribute("name")
  myDiary = myDiary.filter((entryData) => entryData.id!=targetID)
  saveToLocalStorage();
  window.location.reload();
}
