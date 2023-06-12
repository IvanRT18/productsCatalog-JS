const url = "https://course-api.com/javascript-store-products";
const productsDom = document.querySelector(".products-center");

const start = async () => {
  const list = await fetchProducts();
  displayProducts(list);
};

const fetchProducts = async () => {
  productsDom.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    productsDom.innerHTML = `<p class="error">There was an error</p>`;
    console.log(error);
  }
};

const displayProducts = (list) => {
  const productsList = list
    .map((item) => {
      const { id } = item;
      const { price, name: title } = item.fields;
      const { url: image } = item.fields.image[0];
      const formatedPrice = price / 100;
      return `<a href="product.html?id=${id}" class="single-product">
          <img src="${image}" alt="${title}" class="single-product-img img">
          <footer>
            <h5 class="name">${title}</h5>
            <span class="price">$${formatedPrice}</span>
          </footer>
        </a>`;
    })
    .join("");

  productsDom.innerHTML = `
  <div class="products-container">
        ${productsList}
    </div>`;
  // console.log(productsList);
};

start();
