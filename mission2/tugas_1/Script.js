// Add an event listener to the parent container to handle the button clicks
document.getElementById("card-container").addEventListener("click", function (event) {
    // Check if the clicked element is a "+" button
    if (event.target && event.target.id === "addBtn") {
        // Find the input element associated with the clicked button
        const inputElement = event.target.parentNode.querySelector("#numberInput");
        
        // Get the current value of the input element
        let currentValue = parseInt(inputElement.value);
        
        // Increase the value by 1 and update the input element
        currentValue++;
        inputElement.value = currentValue;
    }

     // Check if the clicked element is a "-" button
     if (event.target && event.target.id === "minBtn") {
        // Find the input element associated with the clicked button
        const inputElement = event.target.parentNode.querySelector("#numberInput");
        
        // Get the current value of the input element
        let currentValue = parseInt(inputElement.value);
        
        // Decrease the value by 1 if it's greater than 0, and update the input element
        if (currentValue > 0) {
            currentValue--;
            inputElement.value = currentValue;
        }
    }
});

// Function to create and display cards using innerHTML

function displayCards() {
    const cardContainer = document.getElementById("card-container");

    // Load the JSON data
    fetch('Products.json')
        .then(response => response.json())
        .then(data => {
            let cardHTML = "";

            data.forEach((item) => {
                cardHTML += `
                <div class="col-sm-6 col-md-4 justify-content-center align-items-center d-flex">
                    <div class="card mb-3" style="width:15rem;">
                        <img class="card-img-top" src="${item.imageUrl}" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Rp${item.price}</p>
                            <div class="d-flex justify-content-between align-items-center ml-4 mr-4">
                                <button id="minBtn" type="button" class="btn btn-primary">-</button>
                                <input id="numberInput" type="text" value="0" class="form-control mr-2 ml-2 text-center quantity-input" disabled>
                                <button id="addBtn" type="button" class="btn btn-primary">+</button>
                            </div>
                            <div class="text-center pt-4">
                                <a id="addToCart" href="#" class="btn btn-primary">Tambah Barang</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });

            cardContainer.innerHTML = cardHTML;
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

// Call the displayCards function to generate and display the cards
displayCards();

// Define an array to store cart items
const cart = [];

// Function to add a product to the cart
function addToCart(product, quantity) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        // If the product exists, update its quantity
        existingProduct.quantity = quantity;
        existingProduct.total = existingProduct.price * quantity;
    } else {
        // If the product doesn't exist, add it to the cart with the specified quantity
        product.quantity = quantity;
        cart.push(product);
    }

    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const cartHTML = generateCartHTML();
    const cartTotalHTML = generateCartTotalHTML();

    cartList.innerHTML = cartHTML;
    cartTotal.innerHTML = cartTotalHTML;
}

// Function to generate the HTML for the cart
function generateCartHTML() {
    let cartHTML = "";

    cart.forEach((product) => {
        cartHTML += `
            <li>
                <div class="row pt-2 pb-2  border-bottom">
                    <div class="col-md-6 d-flex">
                        <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: 100px;">
                        <div class="ml-2">
                            <span>${product.name}</span><br>
                            <span>Rp${(product.price)} x ${(product.quantity)}</span>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex flex-column align-items-end justify-content-end">
                        <h6>Rp${product.total}</h6>
                    </div>
                </div>    
            </li>
        `;
    });

    return cartHTML;
}


// Add an event listener to the "Tambah Barang" button
document.getElementById("card-container").addEventListener("click", function (event) {
    // Check if the clicked element is an "Tambah Barang" button
    if (event.target && event.target.id === "addToCart") {
        // Find the card associated with the clicked button
        const card = event.target.closest(".card");

        // Retrieve product information from the card
        const productName = card.querySelector(".card-title").textContent;
        const productImage = card.querySelector(".card-img-top").src;
        const productPrice = card.querySelector(".card-text").textContent.replace("Rp","");

        // Find the input element associated with the clicked button
        const quantityInput = card.querySelector(".quantity-input");

        // Retrieve the quantity from the input
        const quantity = parseInt(quantityInput.value) || 0;

        // Create a product object with name, image URL, and quantity
        const product = { name: productName, imageUrl: productImage, price: productPrice, quantity: quantity, total: productPrice * quantity };

        // Add the product to the cart with the specified quantity
        if (quantity > 0) {
            addToCart(product, quantity);
        }
    }
});

// Function to generate HTML for the total cart price and display it below the cart list
function generateCartTotalHTML() {
    let totalCartPrice = 0;

    cart.forEach((product) => {
        totalCartPrice += product.total;
    });

    const totalTax = calculateTotalTax(totalCartPrice);
    const totalPayment = calculateTotalWithTax(totalCartPrice, totalTax);

    // Create the HTML content for the total cart price
    const cartTotalHTML = `
    <div class="row">
        <div class="col-md-8 col-sm-6 d-flex flex-column align-items-end justify-content-end">
            <h6>Total Belanja</h6>
        </div>
        <div class="col-md-4 col-sm-6 d-flex flex-column align-items-end justify-content-end">
            <h6>Rp${totalCartPrice}</h6>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8 col-sm-6 d-flex flex-column align-items-end justify-content-end">
            <h6>Pajak 11%</h6>
        </div>
        <div class="col-md-4 col-sm-6 d-flex flex-column align-items-end justify-content-end">
            <h6>Rp${totalTax}</h6>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8 col-sm-6 d-flex flex-column align-items-end justify-content-end">
            <h6>Total Bayar</h6>
        </div>
        <div class="col-md-4 col-sm-6 d-flex flex-column align-items-end justify-content-end">
            <h6>Rp${totalPayment}</h6>
        </div>
    </div>
    `;

    return cartTotalHTML;
}

// Function to calculate 11% tax
function calculateTotalTax(totalPrice) {
    const taxRate = 0.11; // 11% tax rate
    const taxAmount = totalPrice * taxRate;
    return taxAmount;
}

// Function to calculate the total price with 11% tax
function calculateTotalWithTax(totalPrice, taxAmount) {
    const totalPriceWithTax = totalPrice + taxAmount;
    return totalPriceWithTax;
}