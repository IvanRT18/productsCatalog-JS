const product = document.querySelector(".product");

const start = async () => {
  const item = await fetchProducts();
  displayProducts(item);
};

const fetchProducts = async () => {
  product.innerHTML = `<h4 class="product-loading">Loading...</h4>`;
  try {
    const apiUrl = "https://course-api.com/javascript-store-single-product";
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const croppedUrl = `${apiUrl}?id=${id}`;

    const data = await fetch(croppedUrl);
    const products = await data.json();
    return products;
    // console.log(products);
  } catch (error) {
    product.innerHTML = `<p class="error">There was an error. Try again later</p>`;
    console.log(error);
  }
};

const displayProducts = (item) => {
  const { company, colors, price, name, description } = item.fields;
  const formatedPrice = price / 100;
  const formatedColors = colors
    .map((color) => {
      return `<span class="product-color" style="background-color:${color}"></span>`;
    })
    .join("");
  //   console.log(formatedColors);
  const { url: imgProduct } = item.fields.image[0];
  document.title = name.toUpperCase();
  product.innerHTML = `<div class="product-wrapper">
            <img src="${imgProduct}" alt="${name}" class="img">
            <div class="product-info">
                <h3>${name}</h3>
                <h5>${company}</h5>
                <span>$${formatedPrice}</span>
                <div class="colors">
                    ${formatedColors}
                </div>
                <p>${description}</p>
                <button class="btn">Add to cart</button>
            </div>
        </div>`;
};

start();
