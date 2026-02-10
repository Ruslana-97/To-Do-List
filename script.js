import {
  container,
  // Btn
  btnAdd,
  btnOption,
  btnCancel,

  // Input, data, textarea
  input,
  termin,
  textarea,
  memoryTermin,

  // empty text
  empteList,

  // box for Tasks
  boxOutput,

  // pop
  popBlock,

  // arrows for option
  arrowRight,
  arrowDown,

  // block for input text
  blockInputs,

  // block Option
  blockOption,

  // title for btn Option
  optionenText,

  // Block with Done task
  boxDone,
  doneTitle,
  boxDoneTasks,
  countDoneTasks,

  // inputs Pop
  inputPop,
  textAreaPop,
  terminPop,
  erinnernTerminPop,

  // Erinnerungen block
  erinnernData,

  // btn POP
  btnSpeichern,
  btnAbrechnen,
  btnErrinerungAdd,
  btnErrinerungRemove,

  // select
  select,
} from "./elements.js";




// const listDone = [];
let activeTask = null;


//Create new Todos
function addTasks() {

const [inputValue, infoTermin, memoryInfo, textArea] = [
  input.value,
  termin.value,
  memoryTermin.value,
  textarea.value
];

  // console.log(infoTermin);

  if (inputValue.trim() == '') return
    let str = `
        <div class="box-tasks">
              <div class="receivedTasks">
                <div class="box-text-receided">
                  <input type="checkbox" class="checkDone" />
                  <div class="block-iput-text">
                    <p class="textOfTask">${inputValue}</p>
                    <div class="addition-information">
                      <i class="fa-regular fa-calendar-days"></i>
                      <span class="addition_data">${infoTermin}</span>
                      <span><i class="fa-regular fa-alarm-clock"></i></span>
                    </div>
                    <div class="blockHiddenValue">
                      <p class="textOfTask2">${inputValue}</p>
                      <p class="textArea2">${textArea}</p>
                      <p class="infoTermin">${infoTermin}</p>
                      <p class="memoryInfo">${memoryInfo}</p>
                      <p class="memoryType">${select.value || ''}</p>
                    </div>
                  </div>
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <div class="addOption overflow">
                  <button class="btnEdit">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <p>To-do bearbeiten</p>
                  </button>
                  <button class="btnRemove">
                    <i class="fa-regular fa-trash-can"></i>
                    <p>To-do löschen</p>
                  </button>
                </div>
              </div>
            </div>
    `
boxOutput.insertAdjacentHTML("beforeend", str);
  
  updateEmptyText();
  
const lastTask = boxOutput.lastElementChild;
const addInfo = lastTask.querySelector('.addition-information');
const calendarIcon = addInfo.querySelector('.fa-calendar-days');
const alarmIcon = addInfo.querySelector('.fa-alarm-clock');
const dateText = addInfo.querySelector('.addition_data');

const hasDate = infoTermin !== '';
const hasAlarm = memoryInfo !== '';

const toggle = (el, show) => el.classList.toggle('overflow', !show);

toggle(addInfo, hasDate || hasAlarm);
toggle(calendarIcon, hasDate);
toggle(dateText, hasDate);
toggle(alarmIcon, hasAlarm);

  
//Додавання класу а саме червоний фон для календаря
const today = new Date().toISOString().split('T')[0];
const dateValue = infoTermin.trim(); // тут просто рядок
if (dateValue && dateValue < today) {
  addInfo.querySelector('.addition_data').classList.add('sofort');
}

  [input, termin, textarea, memoryTermin].forEach(el => el.value = '');
  // if (boxOutput.children.length > 0) empteList.classList.add('none');
   updateEmptyText();
  // boxOutput.children.length > 0
  //   ? empteList.classList.add('none')
  //   : empteList.classList.remove('none');
  const inputCheck = boxOutput.querySelectorAll(".checkDone");

  inputCheck.forEach(item => {
    item.addEventListener('input', function () {
        document.querySelectorAll('.addOption').forEach(el => el.classList.add('overflow'));
        const parentBox = this.closest(".box-tasks");
        const textTask = parentBox.querySelector(".textOfTask");
      if (this.checked) {
        setTimeout(() => {
          textTask.style.textDecoration = "line-through";
        }, 400);
        
        setTimeout(() => {
          boxDoneTasks.append(parentBox);
          updateDoneBlock();
          updateEmptyText();
        }, 600);
      } else {
        setTimeout(() => {
            textTask.style.textDecoration = "none";
        }, 400);
        
        setTimeout(() => {
          boxOutput.append(parentBox);
          updateDoneBlock();
          updateEmptyText();
        }, 600);
      }
    });
  });

  // Після додавання нового завдання оновлюємо блок "Done"
  updateDoneBlock();
}

function updateEmptyText() {
   const tasksCount = boxOutput.querySelectorAll(".box-tasks").length;

  tasksCount > 0
    ? empteList.classList.add("none")
    : empteList.classList.remove("none");
}

function updateDoneBlock() {
  countDoneTasks.textContent = boxDoneTasks.children.length;

  if (boxDoneTasks.children.length === 0) {
    boxDone.classList.add('none');
  } else {
    boxDone.classList.remove('none');
  }
}


function openEdit(task) {
  if (!task) return;

  activeTask = task;

  // Прибираємо клас active у всіх тасок
  document.querySelectorAll('.receivedTasks').forEach(el => el.classList.remove('active'));
  activeTask.classList.add('active');

  // Заповнюємо pop
  inputPop.value = activeTask.querySelector('.textOfTask2').textContent;
  textAreaPop.value = activeTask.querySelector('.textArea2').textContent;
  terminPop.value = activeTask.querySelector('.infoTermin').textContent;

  const memoryText = activeTask.querySelector('.memoryInfo').textContent.trim();
  const memoryType = activeTask.querySelector('.memoryType').textContent.trim();

  // Якщо є memoryInfo — показуємо блок
  if (memoryText !== "") {
    erinnernData.classList.remove('overflow');
    select.value = memoryType || "Datum";

    if (select.value === "Datum") {
      erinnernTerminPop.value = memoryText;
      erinnernTerminPop.classList.remove('overflow');
    } else {
      erinnernTerminPop.value = "";
      erinnernTerminPop.classList.add('overflow');
    }
  } else {
    // Якщо memoryInfo пустий — ховаємо блок
    erinnernData.classList.add('overflow');
    select.value = "Datum";
    erinnernTerminPop.value = "";
    erinnernTerminPop.classList.add('overflow');
  }

  // Відкриваємо попап
  popBlock.classList.add('open_2');

  // Закриваємо всі меню
  document.querySelectorAll('.addOption').forEach(o => o.classList.add('overflow'));
}

//Add new Todos
function editBocks(e) {

/* =========================
     MENU (три крапки)
  ========================= */
if (e.target.closest('.fa-ellipsis-vertical')) {
  const task = e.target.closest('.receivedTasks');
  if (!task) return;
  
  const option = task.querySelector('.addOption');
  const isOpen = !option.classList.contains('overflow');

  // закриваємо всі
  document
    .querySelectorAll('.addOption')
    .forEach(o => o.classList.add('overflow'));

  // відкриваємо потрібний
  if (!isOpen) {
    option.classList.remove('overflow');
  }

  // логіка Erinnerungen
  const erinnernValue = task.querySelector('.memoryInfo_2');
  if (!erinnernData || !erinnernValue) return;
      const value = (erinnernValue.value || '').trim();
      erinnernData.classList.toggle('overflow', value === '');
  }

   /* =========================
     DELETE
  ========================= */
  if (e.target.closest('.btnRemove')) {
    const box = e.target.closest('.box-tasks');
    if (!box) return;

    if (box.querySelector('.receivedTasks.active')) {
      popBlock.classList.add('overflow');
    }

     setTimeout(() => {
        box.remove();
        updateDoneBlock();
        updateEmptyText();
     }, 400);
    
    return;
    }

/* =========================
     EDIT через кнопку
  ========================= */
const btnEdit = e.target.closest('.btnEdit');
  if (btnEdit) {
    const task = btnEdit.closest('.receivedTasks');
    openEdit(task);
    return;
  }

  // --- EDIT по кліку на таску
  const clickedTask = e.target.closest('.receivedTasks');

  if (
    clickedTask &&
    !e.target.closest('.checkDone') &&
    !e.target.closest('.btnEdit') &&
    !e.target.closest('.btnRemove') &&
    !e.target.closest('.fa-ellipsis-vertical')
  ) {
    openEdit(clickedTask);
  }

}


//Save changes------------------------------------------------------------------!
btnSpeichern.addEventListener('click', () => {
  if (!activeTask) return;

  if (!inputPop.checkValidity()) {
    inputPop.reportValidity();
    return;
  }

  activeTask.querySelector('.textOfTask2').textContent = inputPop.value;
  activeTask.querySelector('.textOfTask').textContent = inputPop.value;
  activeTask.querySelector('.textArea2').textContent = textAreaPop.value;
  activeTask.querySelector('.infoTermin').textContent = terminPop.value;
  activeTask.querySelector('.addition_data').textContent = terminPop.value;


  // заміна document на activeTask
const addInfo = activeTask.querySelector('.addition-information');
const calendarIcon = addInfo.querySelector('.fa-calendar-days');
const alarmIcon = addInfo.querySelector('.fa-alarm-clock');
const dateText = addInfo.querySelector('.addition_data');

const selectValue = select.value.trim();
const remindValue = erinnernTerminPop.value.trim();


  let finalValue = "";

  if (selectValue === "Datum" && remindValue) {
    finalValue = remindValue;
  }
  else if (selectValue && selectValue !== "Datum") {
    finalValue = selectValue;
  }

  activeTask.querySelector('.memoryInfo').textContent = finalValue;
  activeTask.querySelector('.memoryType').textContent = selectValue;

// Видалення класу sofort якщо відбулися відповідні зміни в klendar
const newDate = terminPop.value.trim();
const today = new Date().toISOString().split('T')[0];
const additionData = activeTask.querySelector('.addition_data');

if (newDate && newDate < today) {
  additionData.classList.add('sofort');
} else {
  additionData.classList.remove('sofort');
}


const hasDate = terminPop.value !== '';
const isData = selectValue === "Datum";
const isInputFilled = erinnernTerminPop.value.trim() !== "";

const hasAlarm =
  (selectValue !== "" && (!isData || isInputFilled)) ||
  activeTask.querySelector('.memoryInfo').textContent.trim() !== "";

const toggle = (el, show) => el.classList.toggle('overflow', !show);

toggle(addInfo, hasDate || hasAlarm);
toggle(calendarIcon, hasDate);
toggle(dateText, hasDate);
toggle(alarmIcon, hasAlarm);

  
  
  popBlock.classList.remove('open_2');
  activeTask.classList.remove('active');
  activeTask = null;

});


  // Select
select.addEventListener('change', () => {
  if (select.value === "Datum") {
    erinnernTerminPop.classList.remove('overflow');
  } else {
    erinnernTerminPop.classList.add('overflow');
    erinnernTerminPop.value = ""; // очищаємо, якщо потрібно
  }
});


// Btn Abrechnen
btnAbrechnen.addEventListener('click', () => {
  popBlock.classList.remove('open_2');
  if (activeTask) activeTask.classList.remove('active');
  activeTask = null;
});

// btn Errinerung add und delete
btnErrinerungAdd.addEventListener('click', () => {
  erinnernData.classList.remove('overflow');
  select.value = "Datum";
  erinnernTerminPop.value = "";
  select.dispatchEvent(new Event('change'));
});
btnErrinerungRemove.addEventListener('click', () => {
  erinnernData.classList.add('overflow');

  // Ховаємо іконку
  // document.querySelector('.fa-alarm-clock').classList.add('overflow');

  // Очищаємо select та input при прихованні блоку
  select.value = "Datum";
  erinnernTerminPop.value = "";
});
 


//Check Validity
function check() {
  if (!input.checkValidity()) input.reportValidity(); 
}

//create Option
function setOptionState(isOpen) {
  arrowRight.classList.toggle('none', isOpen);
  arrowDown.classList.toggle('none', !isOpen);

  optionenText.textContent = isOpen ? 'Optionen ausblenden' : 'Optionen';
  btnOption.style.width = isOpen ? '17%' : 'auto';

  btnAdd.classList.toggle('overflow', isOpen);
  blockOption.classList.toggle('active_2', isOpen);

  if (isOpen) {
    input.style.width = '85%';
  }
}
//show Option
function showOption() {
  const isOpen = arrowRight.classList.contains('none') === false;
  setOptionState(isOpen);
}
//close Option
function closeBlock() {
  setOptionState(false);
}


//Erledigte Aufgabe accordion
function doneTasksAccordion() {
  boxDoneTasks.classList.toggle('open');
  boxDone.querySelector('.fa-angle-right')?.classList.toggle('none');
  boxDone.querySelector('.fa-chevron-down')?.classList.toggle('none');
}

doneTitle.addEventListener('click', doneTasksAccordion);

window.addEventListener('click', (e) => {
  if (!e.target.closest('.box-tasks') && !e.target.closest('.addOptional')) {
    document.querySelectorAll('.addOption').forEach(el => el.classList.add('overflow'));
  }
})


//Even btnAdd
blockInputs.addEventListener('click', (e) => {
  const btn = e.target.closest('.btnAdd');
  if (!btn) return;
  check();
  if (input.value.trim() == '') return
  // addTasks();
   setTimeout(() => {
     addTasks(); 
  }, 400);
  
  closeBlock();
});



//Event Enter
document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') addTasks();
});

btnOption.addEventListener('click', showOption);
btnCancel.addEventListener('click', closeBlock);
boxOutput.addEventListener('click', editBocks);
boxDoneTasks.addEventListener('click', editBocks);
