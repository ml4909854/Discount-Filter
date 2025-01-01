let checkboxes = document.querySelectorAll(".checkbox");
let filterBtn = document.getElementById("filterBtn");
let productlist = document.getElementById("productlist");

let getData = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    showdata(data.products); // Display all products initially
    filterbyDiscount(data.products); // Add filtering functionality
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function showdata(productData) {
  productlist.innerHTML = ""; // Clear existing content
  productData.forEach((product) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.src = product.images[0];
    image.style.width = "100px";

    let title = document.createElement("p");
    title.innerHTML = `Title: ${product.title}`;

    let price = document.createElement("p");
    price.innerHTML = `Price: $${product.price}`;

    let discount = document.createElement("p");
    discount.innerHTML = `Discount: ${product.discountPercentage.toFixed()}%`;

    div.append(image, title, price, discount);
    productlist.append(div);
  });
}

function filterbyDiscount(products) {
  filterBtn.addEventListener("click", function () {
    let filterProducts = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) { // Only process checked checkboxes
        let value = parseFloat(checkbox.value); // Parse discount value
        let filtered = products.filter(
          (product) => product.discountPercentage <= value
        );
        filterProducts = [...filterProducts, ...filtered]; // Add filtered products
      }
    });

    // Ensure unique products by ID
    let uniqueProducts = [...new Map(filterProducts.map((product) => [product.id, product])).values()];


    showdata(uniqueProducts); // Show filtered products
  });
}

// Fetch and display data
getData();
