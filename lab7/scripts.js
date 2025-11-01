const urlProdutos = "https://deisishop.pythonanywhere.com/products/";
const urlCategorias = "https://deisishop.pythonanywhere.com/categories/";
const section = document.querySelector("#lista-produtos");
const filtroSelect = document.querySelector("#filtro-categorias");

let todosProdutos = []; 

fetch(urlProdutos)
  .then(response => response.json())
  .then(data => {
    todosProdutos = data;
    mostrarProdutos(data);
  })
  .catch(error => {
    console.error("Erro ao carregar produtos:", error);
  });

  
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
  })

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
      <p><b>Categoria:</b> ${produto.category}</p>
      <p>${produto.description}</p>
      <p><b>⭐ ${produto.rating.rate}</b> (${produto.rating.count} avaliações)</p>
      <button class="add">Adicionar ao Carrinho</button>
    `;
    section.appendChild(article);
  });
}

filtroSelect.addEventListener("change", () => {
  const categoriaSelecionada = filtroSelect.value;

  if (categoriaSelecionada === "all") {
    mostrarProdutos(todosProdutos);
  } else {
    const filtrados = todosProdutos.filter(
      p => {
        const nomeCategoria = typeof p.category === "string" ? p.category : p.category.name;
        return nomeCategoria.toLowerCase() === categoriaSelecionada.toLowerCase();
      }
    );
    mostrarProdutos(filtrados);
  }
});


const ordenarSelect = document.querySelector("#ordenar-preco");

ordenarSelect.addEventListener("change", () => {
  let produtosOrdenados = [...todosProdutos]; // copia o array original
  const opcao = ordenarSelect.value;

  if (opcao === "asc") {
    // Preço crescente
    produtosOrdenados.sort((a, b) => a.price - b.price);
  } else if (opcao === "desc") {
    // Preço decrescente
    produtosOrdenados.sort((a, b) => b.price - a.price);
  }

  mostrarProdutos(produtosOrdenados);
});



const inputPesquisa = document.querySelector("#pesquisa-produto");

inputPesquisa.addEventListener("input", () => {
  const texto = inputPesquisa.value.toLowerCase();

  const filtrados = todosProdutos.filter(produto =>
    produto.title.toLowerCase().includes(texto)
  );

  mostrarProdutos(filtrados);
});
