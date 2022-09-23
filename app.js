console.log('Hare Krishna');

const birthInput = document.querySelector('#date-input');
const numberInput = document.querySelector('#lucky-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');
const alertText = document.querySelector('.alert');
const luckyPara = document.querySelector('.lucky-msg');

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

function showLuckyNumsByAlert(dateSum) {
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
  const luckyElement = btnContainer.querySelector('[data-btn="show"]');
  if (!luckyElement) {
    return;
  }
  btnContainer.style.gridTemplateColumns = '1fr 1fr';
  btnContainer.style.justifyItems = 'center';
  luckyElement.remove();
  luckyPara.innerText = '';
}

function showLuckyBtn() {
  btnContainer.appendChild(luckyBtn);
  btnContainer.style.justifyItems = 'start';
  btnContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
  return;
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
    removeLuckyBtn();
    alertMsg('success', 'Cleared', 1000);
    return;
  }

  if (!(birthInput.value && numberInput.value)) {
    alertMsg('danger', 'Please fill both input fields 🙏', 1000);
    return;
  }
  if (numberVal < 0) {
    alertMsg('danger', 'Lucky number cant be negative ❌', 1000);
    return;
  }

  const sumOfDate = dateToSum(birthDate);

  if (
    btnContainer.querySelector('[data-btn="show"]') &&
    btnClicked === 'show'
  ) {
    showLuckyNumsByAlert(sumOfDate);
    return;
  }

  showLuckyBtn();

  if (sumOfDate % numberVal === 0) {
    output.innerText = `${numberVal} is a lucky number 🎉🎊`;
  } else {
    output.innerText = `${numberVal} is not that lucky 😕`;
  }

  alertMsg('success', 'Done ✅', 1000);
}

btnContainer.addEventListener('click', handleContainerClick);

document.querySelectorAll('input').forEach((singleInput) => {
  singleInput.addEventListener('click', () => {
    removeLuckyBtn();
  });
});
