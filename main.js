// تعيين اسم اللعبة في عنوان الصفحة وعنوان الصفحة الرئيسي وتذييل الصفحة
let gameName = "Guess The Word";
document.title = gameName;  // تعيين عنوان الصفحة
document.querySelector("h1").innerHTML = gameName;  // تعيين عنوان الصفحة الرئيسي
document.querySelector("footer").innerHTML = `${gameName} game created by Omar 2024`;  // تعيين تذييل الصفحة

// عدد التلميحات المتاحة وكلمة السر
let hints = 2
let word = "";
let words = [
  "elzero",
  "python",
  "mohamed",
  "osama",
  "omar",
  "guess",
  "word",
  "css",
  "html",
  "java",
  "php"
];

// اختيار كلمة عشوائية من القائمة وتحديد الطول
word = words[Math.floor(Math.random() * words.length)].toLowerCase();
let msg = document.querySelector(".msg");
// عدد الأحرف في كلمة السر وعدد المحاولات المتاحة والمحاولة الحالية
let numberOfLetter = word.length;
let numberOfTries = word.length;
let currentTry = 1;

// إنشاء حقول الإدخال لكل محاولة
function generateInput() {
  for (let i = 1; i <= numberOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.id = `try-${i}`;

    let tryName = document.createElement("span");
    tryName.innerHTML = `try ${i}`;
    tryDiv.appendChild(tryName);

    for (let j = 1; j <= numberOfLetter; j++) {
      let input = document.createElement("input");
      input.id = `guess-${i}-letter-${j}`;
      tryDiv.appendChild(input);
    }
    document.querySelector(".inputs").appendChild(tryDiv);
  }

  // تحديد التركيز على أول حقل إدخال
  document.querySelector(".inputs div input").focus();
  let disabledDivs = document.querySelectorAll(".inputs div");
  disabledDivs.forEach((div) => div.classList.add("disabled"));
  disabledDivs[0].classList.remove("disabled");

  // تحديد الطول الأقصى لحقول الإدخال والتركيز على الحقل التالي بعد إدخال حرف
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.maxLength = "1";

    if (input.parentElement.classList.contains("disabled")) {
      input.disabled = true;
    }

    input.oninput = function () {
      if (input.value.length === 1) {
        if (inputs[index + 1]) {
          inputs[index + 1].focus();
        }
      }
    };
  });
}

// إضافة مستمع للنقر على زر الإرشاد
let checkBtn = document.querySelector(".check");
checkBtn.addEventListener("click", handelGuess);

// تنفيذ التوجيه
function handelGuess() {
  let success = true;

  for (let i = 1; i <= numberOfLetter; i++) {
    let inputNotDisalbed = document.querySelectorAll(
      ".inputs div:not(.disabled) input"
    );

    // التحقق من صحة التخمين وتحديث تصميم الحقول والرسالة
    if (inputNotDisalbed[i - 1].value === word[i - 1]) {
      inputNotDisalbed[i - 1].classList.add("in-place");
    } else if (
      word.includes(inputNotDisalbed[i - 1].value) &&
      inputNotDisalbed[i - 1].value !== ""
    ) {
      inputNotDisalbed[i - 1].classList.add("not-in-place");
      success = false;
    } else {
      inputNotDisalbed[i - 1].classList.add("no");
      success = false;
    }
  }

  // التحقق من نجاح التخمين أو استنفاذ عدد المحاولات
  if (success == true) {
    let allDiv = document.querySelectorAll(".inputs div");
    allDiv.forEach((div) => div.classList.add("disabled"));
    checkBtn.disabled = true;
    hint.disabled = true;
    msg.innerHTML = `you win the word is <span>${word}</span>`;
  } else {
    currentTry++;
    for (let i = 1; i <= numberOfTries; i++) {
      let allDiv = document.querySelectorAll(".inputs div");
      if (allDiv[currentTry - 1]) {
        // إضافة تعطيل وإزالته من الحقول والإدخالات
        allDiv[i - 1].classList.add("disabled");
        allDiv[currentTry - 1].classList.remove("disabled");
        let input = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        if (input) {
          input.disabled = false;
        }

        // تركيز على أول إدخال
        let inputNotDisalbed = document.querySelectorAll(
          ".inputs div:not(.disabled) input"
        );
        inputNotDisalbed[0].focus();
      } else {
        msg.classList.add("lose");
        msg.innerHTML = `Game Over </br> You Lose  the word is <span>${word}</span>`;
        checkBtn.disabled = true;
        hint.disabled = true
      }
    }
  }
}

// إضافة مستمع للنقر على زر التحقق
const hint = document.querySelector(".hint");
const hintSpan = document.querySelector(".hint span");
hintSpan.textContent = hints;
hint.addEventListener("click", handelHint);

// تنفيذ التلميح
function handelHint() {
  if (hints > 0) {
    hints--
    hintSpan.textContent = hints

    let divNotDisabled = document.querySelector(".inputs div:not(.disabled)")
    let inputFiled = document.querySelectorAll(".inputs div:not(.disabled) input")
    let emptyInputFiled = []
    
    inputFiled.forEach((input) => {
      if (input.value == "") {
        emptyInputFiled.push(input)
      }
    })

    if (emptyInputFiled.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyInputFiled.length);
      const randomInput = emptyInputFiled[randomIndex];
      const indexToFill = Array.from(inputFiled).indexOf(randomInput)

      if (indexToFill !== -1) {
        randomInput.value = word[indexToFill];
      }
    }
  }

  if (hints == 0) {
    hint.disabled = true
  }
}

// تحديد تشغيل الدالة عند تحميل الصفحة
window.onload = function () {
  generateInput();
};

