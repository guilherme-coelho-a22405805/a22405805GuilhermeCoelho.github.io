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
      option.value = cat;
      option.textContent = cat;
      filtroSelect.appendChild(option);
    });
  })
  .catch(error => console.error("Erro ao carregar categorias:", error));

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
      <p><b>Categoria:</b> ${produto.category.name}</p>
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
      p => p.category.name.toLowerCase() === categoriaSelecionada.toLowerCase()
    );
    mostrarProdutos(filtrados);
  }
});
