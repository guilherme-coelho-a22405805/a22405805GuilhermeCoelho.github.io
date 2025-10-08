document.addEventListener("DOMContentLoaded", function() {
    // 1. Clica no botão 
    const btn1 = document.getElementById("btn1");
    const text1 = document.getElementById("text1");
    btn1.addEventListener("click", () => {
        text1.textContent = "Boa! Funcionou!";
    });

    // 2. Pinta-me! 
    const paintButtons = document.querySelectorAll(".paint");
    const text2 = document.getElementById("text2");
    paintButtons.forEach(button => {
        button.addEventListener("click", () => {
            const color = button.getAttribute("data-color");
            text2.style.color = color;
        });
    });

    // 3. Experimenta escrever! 
    const inputText = document.getElementById("inputText");
    const text3 = document.getElementById("text3");
    inputText.addEventListener("input", () => {
        text3.textContent = "3. " + inputText.value;
    });

    // 4. Escolhe uma cor 
    const btnColor = document.getElementById("btnColor");
    const colorInput = document.getElementById("colorInput");
    btnColor.addEventListener("click", () => {
        const color = colorInput.value.toLowerCase().trim();
        document.body.style.backgroundColor = color;
    });

    // 5. Conta! 
    let count = 20;
    const btnCount = document.getElementById("btnCount");
    const countValue = document.getElementById("countValue");
    btnCount.addEventListener("click", () => {
        count++;
        countValue.textContent = count;
    });
});
