window.addEventListener("DOMContentLoaded", () => {
  changeTextOnHover();
  changeTextColorOnButtonClick();
  changeInputBoxBackgroundColorOnWrite();
  changeColorOfBackgroundWithColorChoose();
  countButton();
  liveCharacterCounter();
  createAgeAndNameForms();
});



// 1. 
function changeTextOnHover() {
    const text = document.getElementById("text1");
    text.addEventListener("mouseenter",() =>{
        text.textContent="1.Obrigado por passares!" ;
    });
    text.addEventListener("mouseout", () =>{
        text.textContent = "1.Passa por Aqui!"
    })
}

// 2.
function changeTextColorOnButtonClick() {
    const text2 = document.getElementById("text2");
    const purpleButton = document.getElementById("purpleBt");
    const blueButton = document.getElementById("blueBt");
    const orangeButton = document.getElementById("orangeBt");

    function changeToPurple() {
        text2.style.color = "purple";
    }

    function changeToBlue() {
        text2.style.color = "blue";
    }

    function changeToOrange() {
        text2.style.color = "orange";
    }

    purpleButton.addEventListener('click',changeToPurple);
    blueButton.addEventListener('click', changeToBlue);
    orangeButton.addEventListener('click' , changeToOrange);
}

// 3.
function changeInputBoxBackgroundColorOnWrite() {
    const inputBox1 = document.getElementById("inputBox1");
    let count = 0 ;
    inputBox1.addEventListener('keypress', () => {
        let colors = ["red","purple","orange","blue","green"];
        if(count > colors.length - 1){
            count = 0 ;
        }
        inputBox1.style.backgroundColor = colors[count]; 
        count ++ ;
    });
}

// 4.
function changeColorOfBackgroundWithColorChoose () {
    const submitButton = document.getElementById("subBt");
    const inputBox2 = document.getElementById("inputBox2");

    submitButton.addEventListener('click', () => {
        inputBox2.style.backgroundColor = inputBox2.value;
    });
}

// 5. 
function countButton () {
    const countButton = document.getElementById("countButton");
    const number = document.getElementById("number");
    let count = 0;
    countButton.addEventListener('click' , () => {
        number.textContent = count;
        count ++;
    });
}



// Live character counter
// Show the user the number of writen characters
function liveCharacterCounter() {
    const inputBox3 = document.getElementById("inputBox3");
    const number2 = document.getElementById("number2");
    let count = 0;
    inputBox3.addEventListener('input' , () =>{
        number2.textContent = count;
        count ++ ;
    });
}

// Key Detection Game
// Shows the user what key they pressed
function keyDetectionGame() {
    const text3 = document.getElementById("text3");
    text3.addEventListener("keydown" , () =>{
        text3.textContent = text3.key;
    });
}



// Lab 8 -> Age and Name forms
function createAgeAndNameForms() {
    const inputBox4 = document.getElementById("inputBox4");
    const inputBox5 = document.getElementById("inputBox5");
    const subBt2 = document.getElementById("subBt2");
    const text4 = document.getElementById("text4");
    
    subBt2.addEventListener("click" , () =>{
        text4.textContent = "Olá eu sou " +  inputBox4.value + "e a minha idade é " + inputBox5.value;
    });
}