const INPUT_REGEX = /^[\S ]+[\S]$/;

const formulario = document.querySelector('#container-all');
const inputForm = document.querySelector('#input-form');
const btnForm = document.querySelector('#boton-form');
const listForm = document.querySelector('#list-container');
const totalTasks = document.querySelector('#counter1');
const completedTasks = document.querySelector('#counter2');
const uncompletedTasks = document.querySelector('#counter3');

//Validacion
let inputFormValidation = false;

//Funciones
const validateInput = (input, validation) =>{
    if (inputFormValidation) {
        btnForm.disabled = false;
      } else {
        btnForm.disabled = true;
      }
}

const renderTasks = () =>{
    listForm.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('texto');
    if(task.checked){
      li.classList.add('lista1');
      li.classList.add('boton2');
    }
    li.id = task.id;
    li.innerHTML = `
    <button class="x"><svg id="svg-x" xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24"
     stroke-width="1.5" 
     stroke="currentColor" 
     class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg></button>     
      <p>${task.task}</p>
      <button class="hecho"><svg id="svg-hecho" xmlns="http://www.w3.org/2000/svg" 
		fill="none" 
	   viewBox="0 0 24 24"
	   stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	   <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
	   </svg></button>
      
    `;
    listForm.append(li);
  
  });
  renderCounters();
}

//Data
let tasks = [];

inputForm.addEventListener('input', e =>{
    inputFormValidation = INPUT_REGEX.test(inputForm.value);
    validateInput(inputForm)
});

form.addEventListener('submit', e => {
    e.preventDefault();
  // Verificar si las validaciones son verdaderas
  if (!inputFormValidation) return;
  // Crear contacto
  const newTask = {
    id: crypto.randomUUID(),
    task: inputForm.value,
    checked: false,
  }
  // Agregar el contacto al array
  tasks = tasks.concat(newTask);
  // Guardar en el navegador
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks ();
  form.reset();
  renderCounters();
});

listForm.addEventListener('click', e => {
  const deleteBtn = e.target.closest('.x');
  const checkBtn = e.target.closest('.hecho');
  //Eliminar
  if (deleteBtn) {
    const id = deleteBtn.parentElement.id;
    tasks = tasks.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    renderCounters();
  }
  //Checked
  if(checkBtn) {
    const li = checkBtn.parentElement;
    console.log(li);
    textTask = li.children[2];
    li.classList.add('lista1');
    tasks = tasks.map(task =>{
      if (task.id === li.id) {
        return{... task, checked: !task.checked};
      } else {
        return task
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    console.log(checkBtn);
  } 
});

// Contadores

const renderCounters = () => {
  const total = tasks.length;
  totalTasks.innerHTML = `
  Total: ${total}
  `;

  const completadas = document.querySelectorAll('.lista1').length;
  console.log(completadas);
  completedTasks.innerHTML = `
  Completas: ${completadas}
  `;

  const incompletas = total - completadas;
  uncompletedTasks.innerHTML = `
  Incompletas: ${incompletas}
  `;

}

(() => {
    const tasksLocal = localStorage.getItem('tasks');
    if (tasksLocal) {
      const tasksArray = JSON.parse(tasksLocal);
      tasks = tasksArray;
      renderTasks();
    }
  })();