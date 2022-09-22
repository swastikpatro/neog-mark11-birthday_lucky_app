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
