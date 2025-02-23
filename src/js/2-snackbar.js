import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів

const form = document.querySelector('.form');
const rbFilled = document.querySelector('input[value="fulfilled"]');
const rbRejected = document.querySelector('input[value="rejected"]');

const resetForm = () => {
  form.reset();
};

const submitPromise = e => {
  e.preventDefault();

  const formData = new FormData(form);
  const delayData = formData.get('delay');

  const makePromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (rbFilled.checked) {
          resolve(`✅ Fulfilled promise in ${delayData}ms`);
        } else if (rbRejected.checked) {
          reject(`❌ Rejected promise in ${delayData}ms`);
        }
      }, delayData);
    });
  };

  makePromise()
    .then(message => {
      iziToast.show({
        message,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: '#59a10d',
      });
    })
    .catch(message => {
      iziToast.show({
        message,
        messageColor: 'white',
        position: 'topRight',
        backgroundColor: '#ef4040',
      });
    })
    .finally(() => {
      resetForm();
    });
};

form.addEventListener('submit', submitPromise);
