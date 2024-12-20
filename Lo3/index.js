// Products in memory
// Products in memory
const products = [
  { id: 1, name: 'Laptop', price: 999.99, image1: "https://www.digitaltrends.com/wp-content/uploads/2024/07/surface-laptop-7-02.jpg?p=1"},
  { id: 2, name: 'Smartphone', price: 499.99, image1: "https://cdn.thewirecutter.com/wp-content/media/2024/05/smartphone-2048px-1013.jpg?auto=webp&quality=75&width=1024" },
  { id: 3, name: 'Headphones', price: 49.99, image1: "https://appleman.pk/cdn/shop/products/Model-P9-Headphone-5.jpg?v=1667811930" },
  { id: 4, name: 'Keyboard', price: 29.99, image1: "https://media.wired.com/photos/6621af2c255c13bb362f5337/master/w_960,c_limit/logitech-pro-x-tkl-keyboard-Reviewer-Photo-SOURCE-Eric-Ravenscraft.jpg"},
  { id: 5, name: 'Mouse', price: 19.99, image1: "https://m.media-amazon.com/images/I/61GfAO31AJL._AC_UF1000,1000_QL80_.jpg"},
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products
if (document.getElementById('product-container')) {
  const productContainer = document.getElementById('product-container');

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';
    card.innerHTML = `
      <img src="${product.image1}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Price: $${product.price.toFixed(2)}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(card);
  });
}


// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Display cart
if (document.getElementById('cart-items')) {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // Function to update the cart display
  function updateCartDisplay() {
    cartItems.innerHTML = ''; // Clear the current display
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';

      // Add item name and price
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

      // Create a remove button
      const removeButton = document.createElement('button');
      removeButton.className = 'btn btn-danger btn-sm';
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => {
        removeFromCart(index);
      };

      li.appendChild(removeButton);

      cartItems.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2); // Update the total price
  }

  
  function removeFromCart(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the new cart
    updateCartDisplay();
  }

  // Initial display
  updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
  // Login Check
  const currentPage = window.location.pathname.split('/').pop();
  if (localStorage.getItem('isLoggedIn') !== 'true' && currentPage !== 'login.html') {
      alert('Please log in to access this page.');
      window.location.href = 'login.html'; // Redirect to login page
  }
  if (localStorage.getItem('isLoggedIn') === 'true' && currentPage === 'login.html') {
      window.location.href = 'index.html'; // Redirect to the homepage
  }

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === 'admin' && password === '12345') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
      } else {
        alert('Invalid username or password!');
      }
    });
  }

  // Logout
  window.logout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login flag
    alert('You have been logged out.');
    window.location.href = 'login.html'; // Redirect to login page
  };
});



// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  localStorage.removeItem('cart');
  cart = [];
  alert('Purchase successful!');
  window.location.href = 'checkout.html';
}