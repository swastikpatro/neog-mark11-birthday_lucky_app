// console.log('Hare Krishna');

const birthInput = document.querySelector('#date-input');
const numberInput = document.querySelector('#lucky-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');
const luckyPara = document.querySelector('.lucky-msg');

// lucky-btn
const luckyBtn = document.createElement('button');
luckyBtn.classList.add('btn');
luckyBtn.setAttribute('data-btn', 'show');
luckyBtn.innerText = 'All Lucky Nums';

const dateToSum = (aDate) => {
  const myDateArr = [
    ...`${aDate.getDate()}${aDate.getMonth() + 1}${aDate.getFullYear()}`,
  ].map((item) => Number(item));

  const mySum = myDateArr.reduce((acc, curr) => {
    acc = curr + acc;
    return acc;
  }, 0);

  return mySum;
};

function showLuckyNums(dateSum) {
  const arrOfLuckyNumbers = [];
  for (let i = 1; i <= dateSum; i++) {
    if (dateSum % i === 0) {
      arrOfLuckyNumbers.push(i);
    }
  }

  const luckyMsg = `Your lucky nums are ${arrOfLuckyNumbers.join(', ')} 😉`;

  luckyPara.innerText = luckyMsg;
}

function removeLuckyBtn() {
  let luckyElement = btnContainer.querySelector('[data-btn="show"]');
  if (!luckyElement) {
    return;
  }
  btnContainer.style.gridTemplateColumns = '1fr 1fr';
  btnContainer.style.justifyItems = 'center';
  luckyElement.remove();
  luckyElement = null;
  console.log(luckyElement);
  luckyPara.innerText = '';
}

function showLuckyBtn() {
  btnContainer.appendChild(luckyBtn);
  btnContainer.style.justifyItems = 'start';
  btnContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
  return;
}

function displayOutput(numberValue, cond) {
  output.innerHTML = ` 
  <span class='output-num' style="color:${cond ? 'green' : 'red'}">
    Your birthday is ${cond ? 'a lucky number 🎉🎊' : 'not that lucky 😕'} 
  </span> 
    `;
}

function displayErrorMsgs(text) {
  luckyPara.innerText = text;
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!('btn' in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const birthDate = birthInput.valueAsDate;
  const numberVal = numberInput.valueAsNumber;

  if (btnClicked === 'clear') {
    birthInput.value = '';
    numberInput.value = '';
    output.innerText = '';
    luckyPara.innerText = '';
    removeLuckyBtn();
    return;
  }

  if (!(birthInput.value && numberInput.value)) {
    displayErrorMsgs('Please fill both input fields 🙏');
    return;
  }
  if (numberVal < 0) {
    displayErrorMsgs("Lucky number can't be negative ❌");
    return;
  }

  const sumOfDate = dateToSum(birthDate);

  if (
    btnContainer.querySelector('[data-btn="show"]') &&
    btnClicked === 'show'
  ) {
    showLuckyNums(sumOfDate);
    return;
  }

  showLuckyBtn();

  if (sumOfDate % numberVal === 0) {
    displayOutput(numberVal, true);
  } else {
    displayOutput(numberVal, false);
  }
}

btnContainer.addEventListener('click', handleContainerClick);

[...document.querySelectorAll('input')].forEach((singleInput) => {
  singleInput.addEventListener('click', () => {
    removeLuckyBtn();
    output.innerText = '';
    luckyPara.innerText = '';
  });
});
