const products = [
  {
    id: 1,
    name: "Organic Honey (1kg)",
    image: "https://via.placeholder.com/300x200?text=Organic+Honey",
    originalPrice: 20,
    discountPrice: 15,
    buyersNeeded: 5,
  },
  {
    id: 2,
    name: "Eco-friendly Bamboo Toothbrush (Pack of 5)",
    image: "https://via.placeholder.com/300x200?text=Bamboo+Toothbrush",
    originalPrice: 25,
    discountPrice: 18,
    buyersNeeded: 3,
  },
  {
    id: 3,
    name: "Reusable Grocery Bags (Set of 4)",
    image: "https://via.placeholder.com/300x200?text=Reusable+Bags",
    originalPrice: 15,
    discountPrice: 10,
    buyersNeeded: 4,
  },
  {
    id: 4,  // make sure this ID is unique!
    name: "Organic Green Tea (250g)",
    image: "https://via.placeholder.com/300x200?text=Organic+Green+Tea",
    originalPrice: 12,
    discountPrice: 9,
    buyersNeeded: 6,
  },
];

const container = document.getElementById("products-container");
const modal = document.getElementById("order-modal");
const closeModalBtn = document.getElementById("close-modal");
const orderForm = document.getElementById("order-form");
const productIdInput = document.getElementById("product-id");

function renderProducts() {
  container.innerHTML = "";
  products.forEach((product) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>Need <span id="buyers-needed-${product.id}">${product.buyersNeeded}</span> more buyer${product.buyersNeeded > 1 ? "s" : ""} to unlock the deal!</p>
        <p><strong>Price:</strong> <del>$${product.originalPrice}</del> <span class="discount-price">$${product.discountPrice}</span></p>
        <button class="join-btn" onclick="openOrderForm(${product.id})">Join Group Buy</button>
      </div>
    `;
  });
}

function openOrderForm(productId) {
  productIdInput.value = productId;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  orderForm.reset();
}

closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = parseInt(productIdInput.value);
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone) {
    alert("Please fill in required fields.");
    return;
  }

  // Decrease buyersNeeded count
  const product = products.find((p) => p.id === id);
  if (product && product.buyersNeeded > 0) {
    product.buyersNeeded--;
    document.getElementById(`buyers-needed-${id}`).textContent = product.buyersNeeded;
  }

  alert(`Thanks, ${name}! You joined the group buy. We'll notify you via WhatsApp soon.`);

  // Optional: Generate a WhatsApp message link with pre-filled text
  const message = encodeURIComponent(
    `Hi! I want to join the group buy for "${product.name}". Here are my details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "N/A"}`
  );
  const waLink = `https://wa.me/1234567890?text=${message}`;
  window.open(waLink, "_blank");

  closeModal();
});

renderProducts();
