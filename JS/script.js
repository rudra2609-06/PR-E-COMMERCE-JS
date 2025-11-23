document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");
  const navigateToProductSection = document.getElementById("navigateToProductBtn");
  const displayProductsSection = document.getElementById("displayProducts");
  const displayCartProducts = document.querySelector(".displayCartDetails");
  const cartTable = document.querySelector("#productsCartTable tbody");
  
  const rupee = "\u20B9";
  
  let productDetails = {};
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  function generateRandomID() {
    return Math.floor(Math.random() * 9440);
  }

  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  function saveCart() {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  if (displayCartProducts) {
    const displayTotalItems = document.getElementById("displayTotalItems");
    const orderSummaryItemsPlaceholder = document.getElementById("orderSummaryItemsPlaceholder");
    const orderSummaryItemsTotal = document.getElementById("orderSummaryItemsTotal");
    const orderSummaryGrandTotal = document.getElementById("orderSummaryGrandtotalPlaceholder");
    const placeOrderBtn = document.getElementById("placeOrderBtn");

    function renderCart() {
      cartTable.innerHTML = "";
      
      cartProducts.forEach((cProduct) => {
      const cartRow = document.createElement("tr");
      cartRow.className =
      "border-b border-gray-200";
      
      cartRow.innerHTML = `
          <td class="py-4 px-3 bg-white">
            <img 
              src="${cProduct.pUrl}" 
              alt="${cProduct.pName}" 
              class="w-16 h-16 rounded-lg shadow-sm object-cover mx-auto"
            />
          </td>

          <td class="py-4 px-3 bg-white font-semibold text-gray-800 text-sm">
            ${cProduct.pName}
          </td>

          <td class="py-4 px-3 bg-white">
            <div class="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1 w-fit">
              <button 
                class="quantity-minus w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition rounded-full text-lg font-semibold"
                minus-id="${cProduct.id}"
              >-</button>

              <span class="font-medium text-gray-700 min-w-[20px] text-center">
                ${cProduct.quantity || 1}
              </span>

              <button 
                class="quantity-plus w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition rounded-full text-lg font-semibold"
                plus-id="${cProduct.id}"
              >+</button>
            </div>
          </td>

          <td class="py-4 px-3 bg-white font-medium text-gray-700 text-center">
            ${rupee}${cProduct.pPrice}
          </td>

          <td class="py-4 px-3 bg-white font-semibold text-green-700 text-center">
            ${rupee}${cProduct.pPrice * (cProduct.quantity || 1)}
          </td>
        `;

        cartTable.appendChild(cartRow);
        
        let quantity = 0;
        let totalPrice = 0;
        
        cartProducts.forEach((cP) => {
          quantity += cP.quantity;
          totalPrice += cP.pPrice * cP.quantity;
        });
        
        displayTotalItems.innerText = `${quantity} items`;
        orderSummaryItemsPlaceholder.innerText = `(${quantity})`;
        orderSummaryItemsTotal.innerText = `${rupee}${totalPrice}`;
        orderSummaryGrandTotal.innerText = `${rupee}${totalPrice}`;
      });
    }

    cartTable.addEventListener("click", (e) => {
      if (e.target.classList.contains("quantity-minus")) {
        const minusID = parseInt(e.target.getAttribute("minus-id"));
        console.log("clicked");
        
        let mClickedItemIndex = cartProducts.findIndex((p) => p.id === minusID);
        
        if (cartProducts[mClickedItemIndex].quantity > 1) {
          cartProducts[mClickedItemIndex].quantity = cartProducts[mClickedItemIndex].quantity - 1;
          console.log(cartProducts[mClickedItemIndex].quantity);
          saveCart();
          renderCart();
        } else {
          alert("Cart Items cannot be negative");
        }
      } else if (e.target.classList.contains("quantity-plus")) {
        console.log("plus");
        const plusID = parseInt(e.target.getAttribute("plus-id"));
        let pClickedItemIndex = cartProducts.findIndex((cP) => cP.id === plusID);
        console.log("Found index:", pClickedItemIndex);
        
        cartProducts[pClickedItemIndex].quantity = cartProducts[pClickedItemIndex].quantity + 1;
        saveCart();
        renderCart();
      }
    });

    placeOrderBtn.addEventListener("click", () => {
      alert("This functionality will be added soon");
    });

    renderCart();
  }

  if (addProductForm) {
    const inputProductDetailsFields = addProductForm.querySelectorAll("input");
    const addProductBtn = document.getElementById("addProductBtn");
    let isEditMode = false;
    let editingProductID = null;

    if (!isEditMode) {
      addProductBtn.innerHTML = `Add Product`;
    }

    const receivedID = localStorage.getItem("editProductID");
    
    if (receivedID) {
      const clickedProduct = products.find((p) => p.id === parseInt(receivedID));
      
      if (clickedProduct) {
        document.querySelector('input[name="pName"]').value = clickedProduct.pName;
        document.querySelector('input[name="pCategory"]').value = clickedProduct.pCategory;
        document.querySelector('input[name="pPrice"]').value = clickedProduct.pPrice;
        document.querySelector('textarea[name="pDescription"]').value = clickedProduct.pDescription;
        document.querySelector('input[name="pUrl"]').value = clickedProduct.pUrl;
        console.log(clickedProduct);
        
        isEditMode = true;
        addProductBtn.innerHTML = `Save Changes`;
        editingProductID = clickedProduct.id;
        productDetails = { ...clickedProduct };
        localStorage.removeItem("editProductID");
      }
    }

    inputProductDetailsFields.forEach((inputField) => {
      inputField.addEventListener("input", (e) => {
        const { value, name } = e.target;
        productDetails = { ...productDetails, [name]: value };
      });
    });

    const descriptionBlock = addProductForm.querySelector("textarea");
    
    descriptionBlock.addEventListener("input", (e) => {
      const { value, name } = e.target;
      productDetails = { ...productDetails, [name]: value };
    });

    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (isEditMode) {
        let index = products.findIndex((p) => p.id === editingProductID);
        products[index] = productDetails;
        alert("Product Updated Successfully");
        isEditMode = false;
        editingProductID = null;
      } else if (Object.keys(productDetails).length === 5) {
        let generatedId = generateRandomID();
        productDetails.id = generatedId;
        products.push(productDetails);
        alert("Product Added");
      } else {
        alert("Please Add All Required Details");
      }
      
      saveProducts();
      productDetails = {};
      addProductForm.reset();
    });

    navigateToProductSection.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  function renderProduct(data) {
    const productCard = document.createElement("div");
    productCard.className = "card w-full max-w-xs border border-[#e6e9ee] rounded-md p-3";
    
    const cardContent = document.createElement("div");
    cardContent.innerHTML = `
      <div>
        <img src="${data.pUrl}" alt="${data.pName}" class="w-full h-48 object-cover rounded-md mb-3" />
        <h3 class="text-lg font-semibold mb-2">${data.pName}</h3>
        <p class="text-gray-600 text-sm mb-2">${data.pDescription}</p>
        <p class="text-xl font-bold text-blue-600 mb-4">${rupee}${data.pPrice}</p>
        <div class="flex gap-2 mb-2">
          <button class="edit-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1" edit-id="${data.id}">Edit</button>
          <button class="delete-btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1" delete-id="${data.id}">Delete</button>
        </div>
        <button class="add-to-cart bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full" cart-id="${data.id}">Add To Cart</button>
      </div>
    `;
    
    productCard.appendChild(cardContent);
    displayProductsSection.appendChild(productCard);
  }

  if (displayProductsSection) {
    const searchProductField = document.getElementById("searchText");
    
    searchProductField.addEventListener("input", (e) => {
      let searchedProduct = products.filter((p) => {
        return p.pName.toLowerCase().includes(e.target.value.toLowerCase());
      });
      
      displayProductsSection.innerHTML = "";
      searchedProduct.forEach((p) => renderProduct(p));
    });

    displayProductsSection.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const pid = parseInt(e.target.getAttribute("delete-id"));
        products = products.filter((product) => product.id !== pid);
        saveProducts();
        e.target.closest(".card").remove();
      } else if (e.target.classList.contains("edit-btn")) {
        const clickedProductID = parseInt(e.target.getAttribute("edit-id"));
        localStorage.setItem("editProductID", clickedProductID);
        window.location.href = "./products.html";
      } else if (e.target.classList.contains("add-to-cart")) {
        const cartID = parseInt(e.target.getAttribute("cart-id"));
        console.log(cartID);
        
        const clickedCard = products.find((p) => p.id === cartID);
        
        if (clickedCard) {
          const isExisting = cartProducts.find((product) => product.id === cartID);
          
          if (isExisting) {
            isExisting.quantity = isExisting.quantity + 1;
          } else {
            cartProducts.push({ ...clickedCard, quantity: 1 });
          }
        }
        
        saveCart();
        alert("Product Added To Cart");
      }
    });

    if (products.length > 0) {
      products.forEach((p) => renderProduct(p));
    } else {
      const noProductPlaceholder = document.createElement("h4");
      noProductPlaceholder.className = "text-red-500 font-medium text-[18px]";
      noProductPlaceholder.innerText = "No Products Added Yet";
      displayProductsSection.className = "text-center";
      displayProductsSection.appendChild(noProductPlaceholder);
    }
  }
});