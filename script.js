// ===============================
// GLOBAL VARIABLES
// ===============================
let selectedProduct = "";
let selectedPrice = "";

// ===============================
// OPEN ORDER FORM (BUTTON / IMAGE / OVERLAY CLICK)
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
  console.log("JS LOADED");

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
  // PRODUCT CARD CLICK HANDLERS
  // ===============================
  document.querySelectorAll(".product-card").forEach(card => {
    const buyBtn = card.querySelector(".buy-btn");
    const overlay = card.querySelector(".quick-wa-overlay");
    const title = card.getAttribute("data-product") || card.querySelector("h3")?.innerText.trim() || "";
    const price = card.getAttribute("data-price") || card.querySelector(".new-price")?.innerText.replace("Rs", "").trim() || "";

    // IMAGE CLICK → OPEN FORM
    card.querySelectorAll(".gallery img").forEach(img => {
      img.addEventListener("click", () => openOrderForm(title, price));
    });

    // BUY BUTTON CLICK → OPEN FORM
    if (buyBtn) buyBtn.addEventListener("click", () => openOrderForm(title, price));

    // QUICK OVERLAY CLICK → OPEN FORM
    if (overlay) overlay.addEventListener("click", () => openOrderForm(title, price));
  });

  // ===============================
  // IMAGE SLIDER (ALL GALLERIES)
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

    // MANUAL SLIDE
    if (rightBtn) rightBtn.addEventListener("click", e => { e.stopPropagation(); index = (index + 1) % images.length; showImage(index); });
    if (leftBtn) leftBtn.addEventListener("click", e => { e.stopPropagation(); index = (index - 1 + images.length) % images.length; showImage(index); });

    // AUTO SLIDE
    setInterval(() => {
      index = (index + 1) % images.length;
      showImage(index);
    }, 2500);
  });

  // ===============================
  // REVIEWS SLIDER
  // ===============================
  const reviews = document.querySelectorAll(".review-card");
  if (reviews.length > 0) {
    let r = 0;
    setInterval(() => {
      reviews[r].classList.remove("active");
      r = (r + 1) % reviews.length;
      reviews[r].classList.add("active");
    }, 4000);
  }

  // ===============================
  // LIVE ORDER POPUP
  // ===============================
  const names = ["Ali","Ahmed","Sara","Bilal","Hina"];
  const cities = ["Karachi","Lahore","Islamabad","Multan","Hyderabad"];
  const popup = document.querySelector(".live-order");
  if (popup) {
    setInterval(() => {
      const n = names[Math.floor(Math.random()*names.length)];
      const c = cities[Math.floor(Math.random()*cities.length)];
      popup.innerText = `${n} from ${c} just ordered 🔥`;
      popup.style.display = "block";
      setTimeout(() => popup.style.display = "none", 3000);
    }, 7000);
  }

}); // DOMContentLoaded end

// ===============================
// DARK MODE TOGGLE
// ===============================
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ===== LIVE VIEWERS COUNTER =====
const viewerCountEl = document.getElementById("viewerCount");
const liveView = document.querySelector(".live-view");
let viewers = 15; // starting number

setInterval(() => {
    // Randomly increase or decrease viewers
    let change = Math.floor(Math.random() * 3); // 0,1,2
    viewers += Math.random() > 0.5 ? change : -change;
    if (viewers < 1) viewers = 1;
    viewerCountEl.innerText = viewers;

    // show briefly
    liveView.classList.add("show");
    setTimeout(() => liveView.classList.remove("show"), 3000);
}, 7000); // every 7 seconds

// ===== ORDER POPUP =====
const orderPopup = document.getElementById("orderPopup");
const names = ["Ali","Ahmed","Sara","Bilal","Hina"];
const cities = ["Karachi","Lahore","Islamabad","Multan","Hyderabad"];

setInterval(() => {
    const n = names[Math.floor(Math.random() * names.length)];
    const c = cities[Math.floor(Math.random() * cities.length)];

    orderPopup.innerText = `✅ ${n} from ${c} just ordered`;
    orderPopup.classList.add("show");

    setTimeout(() => orderPopup.classList.remove("show"), 4000); // popup visible for 4s
}, 10000); // every 10s

/* ===============================
   BONUS CONVERSION JS
=============================== */

// Fake Countdown
document.querySelectorAll(".countdown").forEach(timer => {
  let seconds = 3599;
  setInterval(() => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    timer.innerText = `Offer ends in ${h}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
    seconds--;
    if(seconds < 0) seconds = 3599;
  },1000);
});

// Auto Star Rating
document.querySelectorAll(".stars").forEach(star => {
  const ratings = ["⭐⭐⭐⭐⭐","⭐⭐⭐⭐☆"];
  let i=0;
  setInterval(()=>{
    star.innerText = ratings[i%2];
    i++;
  },3000);
});

// Order Success Popup
function showOrderSuccess(){
  const pop = document.getElementById("orderSuccess");
  if(!pop) return;
  pop.classList.add("show");
  setTimeout(()=>pop.classList.remove("show"),3000);
}

// Order Sound
const sound = new Audio("order.mp3");
document.addEventListener("click", e=>{
  if(e.target.closest(".buy-btn")){
    sound.play().catch(()=>{});
  }
});
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".product-card").forEach(card => {
    const waBtn = card.querySelector(".quick-wa");
    const productName = card.querySelector("h3")?.innerText || "";

    if (waBtn) {
      // Use setAttribute instead of href assignment
      waBtn.setAttribute(
        "href",
        `https://wa.me/923001007459?text=${encodeURIComponent(
          "Hello I want more photos of " + productName
        )}`
      );
    }

    // BUY BUTTON / IMAGE CLICK → OPEN ORDER FORM
    const buyBtn = card.querySelector(".buy-btn");
    const images = card.querySelectorAll(".gallery img");
    const price = card.querySelector(".new-price")?.innerText.replace("Rs", "").trim() || "";

    if (buyBtn) {
      buyBtn.addEventListener("click", () => openOrderForm(productName, price));
    }

    images.forEach(img => {
      img.addEventListener("click", () => openOrderForm(productName, price));
    });
  });
});

// ===============================
// COUNTDOWN TIMER (PER PRODUCT)
// ===============================
(function () {
    const countdownEl = document.querySelector(".countdown");
    if (!countdownEl) return;

    const DURATION = 30 * 60 * 1000; // 30 minutes
    const STORAGE_KEY = "silkpro_countdown_end";

    let endTime = localStorage.getItem(STORAGE_KEY);

    if (!endTime) {
        endTime = Date.now() + DURATION;
        localStorage.setItem(STORAGE_KEY, endTime);
    } else {
        endTime = parseInt(endTime);
    }

    function updateCountdown() {
        const now = Date.now();
        const remaining = endTime - now;

        if (remaining <= 0) {
            localStorage.removeItem(STORAGE_KEY);
            countdownEl.textContent = "⏰ Offer Ended";
            return;
        }

        const minutes = Math.floor((remaining / 1000 / 60) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);

        countdownEl.textContent =
            `⏳ Offer ends in ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
