console.log('Hare Krishna');

const birthInput = document.querySelector('#date-input');
const numberInput = document.querySelector('#lucky-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');
const alertText = document.querySelector('.alert');

// lucky-btn
const luckyBtn = document.createElement('button');
luckyBtn.classList.add('btn');
luckyBtn.setAttribute('data-btn', 'show');
luckyBtn.innerText = 'All Lucky Nums';

function alertMsg(type, msg, ms) {
  const tID = setInterval(() => {
    alertText.innerText = msg;
    alertText.classList.add(`alert-${type}`);
    alertText.classList.add('show-alert');
  }, 0);

  setTimeout(() => {
    clearInterval(tID);
    alertText.classList.remove(`alert-${type}`);
    alertText.classList.remove('show-alert');
  }, ms);
}
