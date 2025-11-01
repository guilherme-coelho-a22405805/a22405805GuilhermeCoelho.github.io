// Seletores
const listaCheckout = document.querySelector("#checkout-lista");
const totalElement = document.querySelector("#checkout-total");
const form = document.querySelector("#form-compra");
const resultado = document.querySelector("#resultado-compra");
const msg = document.querySelector("#mensagem");
const ref = document.querySelector("#referencia");
const totalFinal = document.querySelector("#total-final");
const botaoVoltar = document.querySelector("#voltar");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


listaCheckout.innerHTML = "";
let total = 0;

if (carrinho.length === 0) {
    listaCheckout.innerHTML = "<li>O carrinho está vazio</li>";
} else {
    carrinho.forEach(produto => {
        const li = document.createElement("li");
        li.textContent = `${produto.title} - ${produto.price} €`;
        listaCheckout.appendChild(li);
        total += produto.price;
    });
}

totalElement.textContent = `Total: ${total.toFixed(2)} €`;


botaoVoltar.addEventListener("click", () => {
    window.location.href = "index.html"; 
});


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const estudante = document.querySelector("#estudante").checked;
    const cupao = document.querySelector("#cupao").value;

    const body = {
        products: carrinho.map(p => p.id),
        student: estudante,
        coupon: cupao,
        name: nome
    };

    fetch("https://deisishop.pythonanywhere.com/buy/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            msg.textContent = `Erro: ${data.error}`;
            resultado.style.display = "block";
            return;
        }

        msg.textContent = data.example;
        ref.textContent = `Referência: ${data.reference}`;
        totalFinal.textContent = `Total final a pagar: ${data.totalCost} €`;
        resultado.style.display = "block";


        localStorage.removeItem("carrinho");
        carrinho = [];
        listaCheckout.innerHTML = "<li>O carrinho está vazio</li>";
        totalElement.textContent = "Total: 0 €";
    })
    .catch(err => {
        msg.textContent = "Erro na ligação à API.";
        resultado.style.display = "block";
    });
});
