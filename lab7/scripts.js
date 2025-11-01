const urlProdutos = "https://deisishop.pythonanywhere.com/products/";
const urlCategorias = "https://deisishop.pythonanywhere.com/categories/";
const section = document.querySelector("#lista-produtos");
const filtroSelect = document.querySelector("#filtro-categorias");
const carrinhoLista = document.querySelector("#carrinho-lista");
const totalElement = document.querySelector("#total");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let todosProdutos = [];
let total = 0;

// ---------- FETCH PRODUTOS ----------
fetch(urlProdutos)
  .then(response => response.json())
  .then(data => {
    todosProdutos = data;
    mostrarProdutos(data);
    atualizarCarrinhoVisual();
  })
  .catch(error => console.error("Erro ao carregar produtos:", error));

// ---------- FETCH CATEGORIAS ----------
fetch(urlCategorias)
  .then(response => response.json())
  .then(categorias => {
    categorias.forEach(cat => {
      const option = document.createElement("option");
      const nomeCategoria = typeof cat === "string" ? cat : cat.name;
      option.value = nomeCategoria;
      option.textContent = nomeCategoria;
      filtroSelect.appendChild(option);
    });
  });

// ---------- MOSTRAR PRODUTOS ----------
function mostrarProdutos(produtos) {
  section.innerHTML = "";
  produtos.forEach(produto => {
    const article = document.createElement("article");

    article.innerHTML = `
      <figure>
        <img src="${produto.image}" alt="${produto.title}">
      </figure>
      <h3>${produto.title}</h3>
      <p><b>Preço:</b> ${produto.price} €</p>
      <p><b>Categoria:</b> ${typeof produto.category === "string" ? produto.category : produto.category.name}</p>
      <p>${produto.description}</p>
      <p><b>⭐ ${produto.rating.rate}</b> (${produto.rating.count} avaliações)</p>
      <button class="add">Adicionar ao Carrinho</button>
    `;

    article.querySelector(".add").addEventListener("click", () => {
      adicionarAoCarrinho(produto);
    });

    section.appendChild(article);
  });
}

// ---------- FILTRAR ----------
filtroSelect.addEventListener("change", () => {
  const categoriaSelecionada = filtroSelect.value;
  if (categoriaSelecionada === "all") mostrarProdutos(todosProdutos);
  else {
    const filtrados = todosProdutos.filter(p => {
      const nomeCategoria = typeof p.category === "string" ? p.category : p.category.name;
      return nomeCategoria.toLowerCase() === categoriaSelecionada.toLowerCase();
    });
    mostrarProdutos(filtrados);
  }
});

// ---------- ORDENAR ----------
const ordenarSelect = document.querySelector("#ordenar-preco");
ordenarSelect.addEventListener("change", () => {
  let produtosOrdenados = [...todosProdutos];
  const opcao = ordenarSelect.value;
  if (opcao === "asc") produtosOrdenados.sort((a, b) => a.price - b.price);
  else if (opcao === "desc") produtosOrdenados.sort((a, b) => b.price - a.price);
  mostrarProdutos(produtosOrdenados);
});

// ---------- PESQUISAR ----------
const inputPesquisa = document.querySelector("#pesquisa-produto");
inputPesquisa.addEventListener("input", () => {
  const texto = inputPesquisa.value.toLowerCase();
  const filtrados = todosProdutos.filter(produto =>
    produto.title.toLowerCase().includes(texto)
  );
  mostrarProdutos(filtrados);
});

// ---------- CARRINHO ----------
function atualizarStorageCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarCarrinhoVisual() {
  carrinhoLista.innerHTML = "";
  total = 0;
  carrinho.forEach(produto => {
    const item = document.createElement("li");
    item.innerHTML = `${produto.title} - ${produto.price} € <button class="remove">Remover</button>`;
    carrinhoLista.appendChild(item);
    total += produto.price;

    item.querySelector(".remove").addEventListener("click", () => {
      carrinho = carrinho.filter(p => p.id !== produto.id);
      atualizarStorageCarrinho();
      atualizarCarrinhoVisual();
    });
  });
  atualizarTotal();
}

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarStorageCarrinho();
  atualizarCarrinhoVisual();
}

function atualizarTotal() {
  totalElement.textContent = `Total: ${total.toFixed(2)} €`;
}
