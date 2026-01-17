// ===============================
// GLOBAL VARIABLES
// ===============================
let selectedProduct = "";
let selectedPrice = "";

// ===============================
// OPEN ORDER FORM (Button OR Image Click)
// ===============================
function openOrderForm(product, price) {
  selectedProduct = product;
  selectedPrice = price;

  const select = document.getElementById("productName");
  if (select) {
    select.value = product;
    select.setAttribute("data-price", price);
  }

  updatePrice();

  const orderSection = document.getElementById("order");
  if (orderSection) {
    orderSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ===============================
// UPDATE PRICE FROM DROPDOWN
// ===============================
function updatePrice() {
  const select = document.getElementById("productName");
  if (!select) return;

  const option = select.options[select.selectedIndex];
  selectedProduct = option.value;
  selectedPrice = option.getAttribute("data-price");
}

// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // ORDER FORM SUBMIT → WHATSAPP
  // ===============================
  const form = document.getElementById("orderForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("input[name='name']").value.trim();
      const phone = form.querySelector("input[name='phone']").value.trim();
      const address = form.querySelector("textarea[name='address']").value.trim();

      if (!name || !phone || !address) {
        alert("Please fill all fields");
        return;
      }

      const message =
        "🛒 New Order - SilkPro\n\n" +
        "📦 Product: " + selectedProduct + "\n" +
        "💰 Price: Rs " + selectedPrice + "\n\n" +
        "👤 Name: " + name + "\n" +
        "📞 Phone: " + phone + "\n" +
        "🏠 Address: " + address + "\n\n" +
        "🚚 Cash on Delivery";

      const whatsappNumber = "923001007459";
      const url =
        "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

      window.open(url, "_blank");
      form.reset();
    });
  }

  // ===============================
  // PRODUCT IMAGE CLICK → ORDER FORM
  // ===============================
  document.querySelectorAll(".product-card").forEach(card => {
    const buyBtn = card.querySelector(".buy-btn");
    const title = card.querySelector("h3")?.innerText || "";
    const price = card.querySelector(".new-price")?.innerText.replace("Rs", "").trim() || "";

    // Image click
    card.querySelectorAll(".gallery img").forEach(img => {
      img.addEventListener("click", () => {
        openOrderForm(title, price);
      });
    });

    // Button safety
    if (buyBtn) {
      buyBtn.addEventListener("click", () => {
        openOrderForm(title, price);
      });
    }
  });

  // ===============================
  // IMAGE SLIDER (MULTIPLE PRODUCTS)
  // ===============================
  document.querySelectorAll(".product-card").forEach(card => {
    const images = card.querySelectorAll(".gallery img");
    const leftBtn = card.querySelector(".slider-arrow.left");
    const rightBtn = card.querySelector(".slider-arrow.right");

    if (images.length <= 1) return;

    let index = 0;
    images.forEach(img => img.classList.remove("active"));
    images[0].classList.add("active");

    function showImage(i) {
      images.forEach(img => img.classList.remove("active"));
      images[i].classList.add("active");
    }

    if (rightBtn) {
      rightBtn.addEventListener("click", e => {
        e.stopPropagation();
        index = (index + 1) % images.length;
        showImage(index);
      });
    }

    if (leftBtn) {
      leftBtn.addEventListener("click", e => {
        e.stopPropagation();
        index = (index - 1 + images.length) % images.length;
        showImage(index);
      });
    }
  });

});

function toggleDark(){
  document.body.classList.toggle("dark");
}

let reviews=document.querySelectorAll(".review-card");
let r=0;
setInterval(()=>{
  reviews[r].classList.remove("active");
  r=(r+1)%reviews.length;
  reviews[r].classList.add("active");
},4000);


let names=["Ali","Ahmed","Sara","Bilal","Hina"];
let cities=["Karachi","Lahore","Islamabad","Multan","Hyderabad"];
let popup=document.querySelector(".live-order");

setInterval(()=>{
  let n=names[Math.floor(Math.random()*names.length)];
  let c=cities[Math.floor(Math.random()*cities.length)];
  popup.innerText=n+" from "+c+" just ordered 🔥";
  popup.style.display="block";
  setTimeout(()=>popup.style.display="none",3000);
},7000);