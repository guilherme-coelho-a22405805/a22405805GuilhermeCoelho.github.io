// --- Seletores ---
const container = document.getElementById('lista-produtos');
const carrinhoLista = document.getElementById('carrinho-lista');
const totalElement = document.getElementById('total');

let total = 0;

// --- Criação dos produtos ---
produtos.forEach(produto => {
  const artigo = document.createElement('article');
  artigo.innerHTML = `
    <figure>
      <img src="${produto.image}" alt="${produto.title}">
      <figcaption><h3>${produto.title}</h3></figcaption>
    </figure>
    <p><strong>Preço:</strong> ${produto.price.toFixed(2)} €</p>
    <p style="background-color: lightgray; border-radius:10px; padding:5px;">${produto.description}</p>
    <button class="add">+ Adicionar ao Cesto</button>
  `;

  // Evento do botão de adicionar
  const botao = artigo.querySelector('.add');
  botao.addEventListener('click', () => {
    adicionarAoCesto(produto);
  });

  container.appendChild(artigo);
});

// --- Função para adicionar ao carrinho ---
function adicionarAoCesto(produto) {
  const item = document.createElement('li');
  item.innerHTML = `
    ${produto.title} - ${produto.price.toFixed(2)} €
    <button class="remove">Remover</button>
  `;

  carrinhoLista.appendChild(item);
  total += produto.price;
  atualizarTotal();

  const botaoRemover = item.querySelector('.remove');
  botaoRemover.addEventListener('click', () => {
    removerDoCesto(item, produto.price);
  });
}

// --- Função para remover ---
function removerDoCesto(item, preco) {
  item.remove();
  total -= preco;
  atualizarTotal();
}

// --- Atualizar total ---
function atualizarTotal() {
  totalElement.textContent = ` Total: ${total.toFixed(2)} €`;
}