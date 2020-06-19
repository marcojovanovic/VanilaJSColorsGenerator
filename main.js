// napravi random generator boja   +
// dinamicki printaj div sa tim generisanim bojama +
// sredi css da se sve lepo prikaze na ekranu +
// klikom na dugme genersi boje, dobijas uvek nove boje +
// klikom bilo gde na card boja se kopira to clipboard +
// custom poruka nakon copy to clipboard da je boja kopirana

// variables

const boxContainer = document.querySelector('.box-container');
const btn = document.querySelector('.btn');
const message = document.querySelector('.message');

// event listener

btn.addEventListener('click', displayColorsOnScren);
document.addEventListener('DOMContentLoaded', () => {
  displayColorsOnScren();
});

// generate random color

const randomColor = () => {
  return Math.floor(Math.random() * 16).toString(16);
};

function generateColors() {
  return '#' + Array.from({ length: 6 }).map(randomColor).join('');
}

// prikazi na ekranu random boju

function displayColorsOnScren() {
  boxContainer.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    let color = generateColors();
    let div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `

        <div class='inner-color' style="background-color:${color}"></div>
        <p>${generateColors()}</p>

    
    `;
    div.addEventListener('click', copyToClipboard);

    boxContainer.appendChild(div);
  }
}

function copyToClipboard(e) {
  // naravoucenije za color, varijabla cija se vrednost menja da
  // bi se vise toga selektovalo

  let color = '';

  if (e.target.classList.contains('inner-color')) {
    color = e.target.style.backgroundColor;
  }

  if (e.target.classList.contains('card')) {
    color = e.target.children[0].style.backgroundColor;
  } else {
    color = e.target.innerText;
  }

  console.log(color);

  const textarea = document.createElement('textarea');
  textarea.value = color;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  displayMessage('dodato u klipboard');
  setTimeout(() => {
    message.style.display = 'none';
  }, 2000);
}

function displayMessage(msg) {
  message.innerText = msg;
  message.style.display = 'block';
}
