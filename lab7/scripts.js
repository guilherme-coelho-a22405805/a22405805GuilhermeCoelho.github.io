const url = "https://deisishop.pythonanywhere.com/products/";
const section = document.querySelector("#lista-produtos");

fetch(url)
  .then(response => response.json())
  .then(data =>{
     console.log(data)


     section.innerHTML = "<article>" + data.map(title => {
       return title + "<br> " + data[0].price + "<br> " + data[0].description + "<br> " + data[0].image + "</article>";
     }).join("") + "<article>" + data[1].title + "<br> " + data[1].price + "<br> " + data[1].description + "<br> " + data[1].image + "</article>";

  })
  .catch(error => console.error("Error:", error));
