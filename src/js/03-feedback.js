import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formInput = document.querySelector('.feedback-form input');
const formTextarea = document.querySelector('.feedback-form textarea');
const formData = {};

outputForm();

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function outputForm() {
  const savedForm = localStorage.getItem('feedback-form-state');
  const parsedForm = JSON.parse(savedForm);

  if (parsedForm) {
    formInput.value = parsedForm.email || '';
    formTextarea.value = parsedForm.message || '';
    console.log(parsedForm);
  }
}
