/* NORI demo data and referral flow. localStorage is for this browser only. */
const STORAGE_KEY = "nori-demo-v1";
const PROMOTER_ID = "promoter-ada-demo";
const CATEGORIES = [
  "Fashion",
  "Shoes and accessories",
  "Beauty and skincare",
  "Gadgets and electronics",
  "Home and lifestyle",
  "Digital products",
];
const money = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
const safeText = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const productsSeed = [
  {
    id: "product-lagos-sneaker",
    name: "Lagos Run Club Sneaker",
    description:
      "A lightweight everyday sneaker with a breathable knit upper and cushioned sole. Designed for busy days, city walks and everything in between.",
    price: 48000,
    category: "Shoes and accessories",
    commission: 12,
    seller: "Sunday Supply Co.",
    sellerId: "seller-sunday",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 1,
  },
  {
    id: "product-aso-oke-tote",
    name: "Aso Oke Everyday Tote",
    description:
      "A roomy, lined tote made with locally woven Aso Oke panels. Carries your daily essentials and a little bit of home.",
    price: 28500,
    category: "Fashion",
    commission: 15,
    seller: "Ìró Studio",
    sellerId: "seller-iro",
    image: 
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 2,
  },
  {
    id: "product-glow-set",
    name: "Daily Glow Skincare Set",
    description:
      "A gentle three-step routine with cleanser, hydrating serum and moisturiser for a fresh, comfortable glow.",
    price: 32000,
    category: "Beauty and skincare",
    commission: 10,
    seller: "Olive & Shea",
    sellerId: "seller-olive",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 3,
  },
  {
    id: "product-soundpods",
    name: "SoundPods Air",
    description:
      "Compact wireless earbuds with clear calls, a pocket-size charging case and up to 20 hours of combined listening time.",
    price: 39500,
    category: "Gadgets and electronics",
    commission: 8,
    seller: "Orbit Mobile",
    sellerId: "seller-orbit",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 4,
  },
  {
    id: "product-cushion-pair",
    name: "Adire Cushion Pair",
    description:
      "Two soft cotton cushion covers printed in small batches with indigo Adire patterns. Inserts are included.",
    price: 22000,
    category: "Home and lifestyle",
    commission: 14,
    seller: "The Home Edit NG",
    sellerId: "seller-home",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 5,
  },
  {
    id: "product-phone-stand",
    name: "Foldaway Phone Stand",
    description:
      "A sturdy, adjustable aluminium stand that folds flat for travel and makes hands-free calls and video a little easier.",
    price: 12500,
    category: "Gadgets and electronics",
    commission: 12,
    seller: "Orbit Mobile",
    sellerId: "seller-orbit",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 6,
  },
  {
    id: "product-weeknight-cookbook",
    name: "The Weeknight Naija Table",
    description:
      "A downloadable recipe collection with 24 practical Nigerian dinners, shopping lists and prep notes for busy weeks.",
    price: 8500,
    category: "Digital products",
    commission: 20,
    seller: "Kitchen Notes by Tola",
    sellerId: "seller-tola",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 7,
  },
  {
    id: "product-leather-slides",
    name: "Oja Leather Slides",
    description:
      "Hand-finished leather slides with a cushioned footbed, made in small batches by a Lagos workshop.",
    price: 35000,
    category: "Shoes and accessories",
    commission: 11,
    seller: "Sunday Supply Co.",
    sellerId: "seller-sunday",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    active: true,
    createdAt: 8,
  },
];

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      saved &&
      Array.isArray(saved.products) &&
      Array.isArray(saved.orders) &&
      Array.isArray(saved.clicks)
    )
      return saved;
  } catch (error) {
    console.warn(
      "NORI demo data could not be read; starting with sample data.",
      error,
    );
  }
  const seeded = {
    products: productsSeed,
    orders: [
      {
        id: "order-demo-approved",
        productId: "product-glow-set",
        productName: "Daily Glow Skincare Set",
        sellerId: "seller-olive",
        sellerName: "Olive & Shea",
        customerName: "Amaka Eze",
        customerEmail: "demo@example.test",
        promoterId: PROMOTER_ID,
        total: 32000,
        commission: 3200,
        status: "Approved",
        createdAt: Date.now() - 86400000,
      },
      {
        id: "order-demo-pending",
        productId: "product-lagos-sneaker",
        productName: "Lagos Run Club Sneaker",
        sellerId: "seller-sunday",
        sellerName: "Sunday Supply Co.",
        customerName: "Tunde Bello",
        customerEmail: "demo@example.test",
        promoterId: PROMOTER_ID,
        total: 48000,
        commission: 5760,
        status: "Pending",
        createdAt: Date.now() - 3600000,
      },
    ],
    clicks: [
      {
        id: "click-demo-1",
        productId: "product-glow-set",
        promoterId: PROMOTER_ID,
        createdAt: Date.now() - 7200000,
      },
      {
        id: "click-demo-2",
        productId: "product-lagos-sneaker",
        promoterId: PROMOTER_ID,
        createdAt: Date.now() - 3600000,
      },
    ],
    promoted: [
      {
        productId: "product-glow-set",
        promoterId: PROMOTER_ID,
        createdAt: Date.now() - 86400000,
      },
      {
        productId: "product-lagos-sneaker",
        promoterId: PROMOTER_ID,
        createdAt: Date.now() - 3600000,
      },
    ],
  };
  saveData(seeded);
  return seeded;
}
function saveData(data = state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    showToast("Browser storage is unavailable. Changes may not persist.");
    console.error(error);
  }
}
let state = loadData();
let selectedCategory = "all";
let activeModalProductId = null;
let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
function setImageFallback(image) {
  image.onerror = () => {
    image.onerror = null;
    image.src =
      "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400"><rect width="500" height="400" fill="#edf2ec"/><circle cx="250" cy="175" r="62" fill="#dce9dc"/><path d="M220 188l23-26 17 18 14-13 27 34h-92z" fill="#8bb39a"/><text x="250" y="295" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#63806b">NORI product</text></svg>`,
      );
  };
}
function productById(id) {
  return state.products.find((product) => product.id === id);
}
function commissionFor(product) {
  return (
    Math.round(
      ((Number(product.price) * Number(product.commission)) / 100) * 100,
    ) / 100
  );
}
function categoryLabel(category) {
  return category === "Shoes and accessories"
    ? "Shoes & accessories"
    : category;
}

function renderCategories() {
  const select = document.getElementById("category-filter");
  select.innerHTML =
    '<option value="all">All categories</option>' +
    CATEGORIES.map(
      (category) =>
        `<option value="${safeText(category)}">${safeText(categoryLabel(category))}</option>`,
    ).join("");
  document.getElementById("category-chips").innerHTML = ["all", ...CATEGORIES]
    .map(
      (category) =>
        `<button class="category-chip ${selectedCategory === category ? "active" : ""}" data-category="${safeText(category)}">${category === "all" ? "All products" : safeText(categoryLabel(category))}</button>`,
    )
    .join("");
  select.value = selectedCategory;
}
function renderMarketplace() {
  const query = document
    .getElementById("product-search")
    .value.trim()
    .toLowerCase();
  const sort = document.getElementById("sort-filter").value;
  let products = state.products.filter(
    (product) =>
      product.active &&
      (selectedCategory === "all" || product.category === selectedCategory) &&
      `${product.name} ${product.seller} ${product.category}`
        .toLowerCase()
        .includes(query),
  );
  if (sort === "commission")
    products.sort((a, b) => b.commission - a.commission);
  if (sort === "price-low") products.sort((a, b) => a.price - b.price);
  if (sort === "price-high") products.sort((a, b) => b.price - a.price);
  const grid = document.getElementById("product-grid");
  grid.innerHTML = products
    .map(
      (product) => `<article class="product-card">
    <div class="product-image-wrap"><img class="product-image" src="${safeText(product.image)}" alt="${safeText(product.name)}"><span class="category-tag">${safeText(categoryLabel(product.category))}</span><span class="commission-tag">${safeText(product.commission)}% commission</span></div>
    <div class="product-info"><p class="seller-name">${safeText(product.seller)}</p><h3>${safeText(product.name)}</h3><p class="product-price">${money(product.price)}</p><div class="earn-row"><span>Earn per sale</span><strong>${money(commissionFor(product))}</strong></div><div class="product-card-actions"><button class="button button-card-detail" data-action="details" data-id="${safeText(product.id)}">View details</button><button class="button button-card-promote" data-action="promote" data-id="${safeText(product.id)}">Promote ↗</button></div></div>
  </article>`,
    )
    .join("");
  grid.querySelectorAll("img").forEach(setImageFallback);
  document
    .getElementById("empty-products")
    .classList.toggle("hidden", products.length > 0);
}
function renderSeller() {
  const activeProducts = state.products.filter(
    (product) => product.active,
  ).length;
  const totalClicks = state.clicks.length;
  const pending = state.orders.filter(
    (order) => order.status === "Pending",
  ).length;
  const totalCommission = state.orders
    .filter((order) => order.status === "Approved")
    .reduce((sum, order) => sum + order.commission, 0);
  document.getElementById("seller-stats").innerHTML = statMarkup([
    ["ACTIVE PRODUCTS", activeProducts, "Listings open to promoters"],
    ["REFERRAL CLICKS", totalClicks, "Tracked in this browser"],
    ["PENDING ORDERS", pending, "Need your review"],
    ["APPROVED COMMISSION", money(totalCommission), "Confirmed demo orders"],
  ]);
  document.getElementById("listing-count").textContent =
    `${state.products.length} product${state.products.length === 1 ? "" : "s"}`;
  const rows = state.products
    .map(
      (product) =>
        `<tr><td><div class="table-product"><img src="${safeText(product.image)}" alt=""><span>${safeText(product.name)}</span></div></td><td>${money(product.price)}</td><td>${product.commission}% <small>(${money(commissionFor(product))})</small></td><td><span class="status-pill ${product.active ? "status-active" : "status-paused"}">${product.active ? "Active" : "Paused"}</span></td><td><div class="row-actions"><button class="mini-action" data-action="edit" data-id="${safeText(product.id)}">Edit</button><button class="mini-action" data-action="toggle-product" data-id="${safeText(product.id)}">${product.active ? "Pause" : "Resume"}</button><button class="mini-action" data-action="delete-product" data-id="${safeText(product.id)}">Delete</button></div></td></tr>`,
    )
    .join("");
  document.getElementById("seller-products").innerHTML =
    rows || '<tr><td colspan="5">No listings yet.</td></tr>';
  const mobile = state.products
    .map(
      (product) =>
        `<div class="mobile-product"><img src="${safeText(product.image)}" alt=""><div><strong>${safeText(product.name)}</strong><small>${money(product.price)} · ${product.commission}% commission · ${product.active ? "Active" : "Paused"}</small></div><span class="status-pill ${product.active ? "status-active" : "status-paused"}">${product.active ? "Live" : "Paused"}</span><div class="row-actions"><button class="mini-action" data-action="edit" data-id="${safeText(product.id)}">Edit</button><button class="mini-action" data-action="toggle-product" data-id="${safeText(product.id)}">${product.active ? "Pause" : "Resume"}</button><button class="mini-action" data-action="delete-product" data-id="${safeText(product.id)}">Delete</button></div></div>`,
    )
    .join("");
  document.getElementById("seller-products-mobile").innerHTML =
    mobile || '<p class="no-activity">No listings yet.</p>';
  document
    .querySelectorAll("#seller-products img,#seller-products-mobile img")
    .forEach(setImageFallback);
  document.getElementById("order-count").textContent =
    `${state.orders.length} order${state.orders.length === 1 ? "" : "s"}`;
  const orders = [...state.orders].sort((a, b) => b.createdAt - a.createdAt);
  document.getElementById("seller-orders").innerHTML = orders.length
    ? orders
        .map(
          (order) =>
            `<div class="order-item"><div class="order-main"><strong>${safeText(order.productName)}</strong><small>${safeText(order.customerName)} · ${safeText(order.sellerName)} · ${new Date(order.createdAt).toLocaleDateString("en-NG")}</small><small>Ref: ${safeText(order.id.slice(-8).toUpperCase())} · ${order.promoterId ? `promoter ${safeText(order.promoterId)}` : "Direct order"}</small>${order.status === "Pending" ? `<div class="order-actions"><button class="mini-action" data-action="order-approved" data-id="${safeText(order.id)}">Confirm</button><button class="mini-action" data-action="order-rejected" data-id="${safeText(order.id)}">Reject</button></div>` : ""}</div><div class="order-side"><strong>${money(order.total)}</strong><small>${order.promoterId ? `${money(order.commission)} commission` : "No promoter commission"}</small><span class="status-pill ${statusClass(order.status)}">${safeText(order.status)}</span></div></div>`,
        )
        .join("")
    : '<p class="no-activity">Referral orders will appear here after a customer submits an order.</p>';
}
function statusClass(status) {
  return status === "Approved"
    ? "status-approved"
    : status === "Rejected"
      ? "status-rejected"
      : "status-pending";
}
function statMarkup(items) {
  return items
    .map(
      ([label, value, note]) =>
        `<div class="stat-card"><span>${safeText(label)}</span><strong>${safeText(value)}</strong><small>${safeText(note)}</small></div>`,
    )
    .join("");
}
function renderPromoter() {
  const clicks = state.clicks.filter(
    (click) => click.promoterId === PROMOTER_ID,
  ).length;
  const orders = state.orders.filter(
    (order) => order.promoterId === PROMOTER_ID,
  );
  const approved = orders
    .filter((order) => order.status === "Approved")
    .reduce((sum, order) => sum + order.commission, 0);
  const estimate = orders
    .filter(
      (order) => order.status === "Pending" || order.status === "Approved",
    )
    .reduce((sum, order) => sum + order.commission, 0);
  document.getElementById("promoter-stats").innerHTML = statMarkup([
    ["REFERRAL CLICKS", clicks, "Referral link opens"],
    [
      "SUCCESSFUL ORDERS",
      orders.filter((order) => order.status === "Approved").length,
      "Seller confirmed",
    ],
    ["ESTIMATED EARNINGS", money(estimate), "Pending + approved"],
    ["APPROVED", money(approved), "Confirmed commission"],
  ]);
  const promotedIds = [
    ...new Set([
      ...state.promoted
        .filter((link) => link.promoterId === PROMOTER_ID)
        .map((link) => link.productId),
      ...orders.map((order) => order.productId),
    ]),
  ];
  document.getElementById("promoted-count").textContent =
    `${promotedIds.length} link${promotedIds.length === 1 ? "" : "s"}`;
  document.getElementById("promoted-list").innerHTML = promotedIds.length
    ? promotedIds
        .map((id) => {
          const product = productById(id);
          if (!product) return "";
          const url = createReferralUrl(product.id, PROMOTER_ID);
          return `<div class="promoted-item"><img src="${safeText(product.image)}" alt=""><div><strong>${safeText(product.name)}</strong><small>${safeText(product.seller)} · ${product.commission}% · ${money(commissionFor(product))} per sale</small></div><button class="mini-action" data-action="share-link" data-id="${safeText(product.id)}">Share</button><div class="promoted-link"><input readonly value="${safeText(url)}" aria-label="Referral link for ${safeText(product.name)}"><button data-action="copy-link" data-id="${safeText(product.id)}">Copy link</button></div></div>`;
        })
        .join("")
    : '<p class="no-activity">Choose any marketplace product to create your first referral link.</p>';
  document
    .getElementById("promoted-list")
    .querySelectorAll("img")
    .forEach(setImageFallback);
  document.getElementById("promoter-orders").innerHTML = orders.length
    ? [...orders]
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(
          (order) =>
            `<div class="order-item"><div class="order-main"><strong>${safeText(order.productName)}</strong><small>${new Date(order.createdAt).toLocaleDateString("en-NG")} · Order ${safeText(order.id.slice(-7).toUpperCase())}</small></div><div class="order-side"><strong>${money(order.commission)}</strong><span class="status-pill ${statusClass(order.status)}">${safeText(order.status)}</span></div></div>`,
        )
        .join("")
    : '<p class="no-activity">Orders from your links will show up here with their commission status.</p>';
}
function renderAll() {
  renderCategories();
  renderMarketplace();
  renderSeller();
  renderPromoter();
}

// A referral URL encodes both the product and the demo promoter.
function createReferralUrl(productId, promoterId) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("product", productId);
  url.searchParams.set("ref", promoterId);
  url.hash = "marketplace";
  return url.href;
}
function rememberPromotion(productId) {
  if (
    !state.promoted.some(
      (link) => link.productId === productId && link.promoterId === PROMOTER_ID,
    )
  )
    state.promoted.push({
      productId,
      promoterId: PROMOTER_ID,
      createdAt: Date.now(),
    });
  saveData();
}
function recordReferralVisit(productId, promoterId) {
  if (!productById(productId) || !promoterId) return;
  // This function runs once at startup, so every newly opened referral URL is one click.
  state.clicks.push({
    id: `click-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    productId,
    promoterId,
    createdAt: Date.now(),
  });
  saveData();
}
function openModal(content) {
  document.getElementById("modal-content").innerHTML = content;
  document.getElementById("modal-backdrop").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
  document.body.style.overflow = "";
  activeModalProductId = null;
}
function productDetails(productId) {
  const product = productById(productId);
  if (!product) return;
  activeModalProductId = product.id;
  openModal(
    `<div class="modal-product"><img src="${safeText(product.image)}" alt="${safeText(product.name)}"><div><span class="small-label">${safeText(product.seller)} · ${safeText(categoryLabel(product.category))}</span><h2 id="modal-title">${safeText(product.name)}</h2><p>${safeText(product.description)}</p><p class="modal-price">${money(product.price)}</p><div class="modal-commission">Promoter commission · ${product.commission}%<strong>${money(commissionFor(product))} per confirmed sale</strong></div><div class="modal-product-actions"><button class="button button-primary" data-action="modal-order" data-id="${safeText(product.id)}">Place Demo Order</button><button class="button button-soft" data-action="modal-promote" data-id="${safeText(product.id)}">Get your referral link ↗</button></div></div></div>`,
  );
  setImageFallback(document.querySelector("#modal-content img"));
}
function validPromoterForProduct(productId, promoterId) {
  const params = new URLSearchParams(window.location.search);
  const linkedProductId = params.get("product") || params.get("id");
  return promoterId === PROMOTER_ID && linkedProductId === productId
    ? promoterId
    : "";
}
function promoteProduct(productId) {
  const product = productById(productId);
  if (!product) return;
  rememberPromotion(productId);
  renderPromoter();
  const url = createReferralUrl(product.id, PROMOTER_ID);
  openModal(
    `<div class="modal-form"><div class="success-mark">↗</div><p class="eyebrow">YOU’RE READY TO SHARE</p><h2 id="modal-title">Your link is ready.</h2><p>Anyone who opens this link is referred to <strong>${safeText(product.name)}</strong>. You can share it with your community. A commission is estimated when an order is submitted and approved by the seller.</p><div class="link-share-box"><strong>Your unique referral link</strong><p>${safeText(url)}</p><div class="share-actions"><button class="button button-primary" data-action="copy-current-link">Copy link</button><button class="button button-soft" data-action="share-current-link">Share link</button></div></div><button class="text-link" data-action="close-modal-and-hub">View your promoter hub →</button></div>`,
  );
  activeModalProductId = productId;
}
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext)
    return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy")
        ? resolve()
        : reject(new Error("Copy unavailable"));
    } catch (error) {
      reject(error);
    } finally {
      input.remove();
    }
  });
}
async function shareProduct(productId) {
  const product = productById(productId);
  if (!product) return;
  const url = createReferralUrl(productId, PROMOTER_ID);
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: `Take a look at ${product.name} on NORI.`,
        url,
      });
    } catch (error) {
      if (error.name !== "AbortError")
        showToast("Could not open sharing. Try copying your link.");
    }
  } else {
    try {
      await copyText(url);
      showToast("Sharing is unavailable here, so the link was copied.");
    } catch {
      showToast("Copy was unavailable in this browser.");
    }
  }
}
function openProductForm(productId = null) {
  const product = productId ? productById(productId) : null;
  const categories = CATEGORIES.map(
    (category) =>
      `<option ${product?.category === category ? "selected" : ""}>${safeText(category)}</option>`,
  ).join("");
  openModal(
    `<form class="modal-form" id="product-form"><p class="eyebrow">SELLER STUDIO · DEMO</p><h2 id="modal-title">${product ? "Edit your listing." : "List a product."}</h2><p>Promoters can discover any active public listing. Your commission is the amount they earn after an order is confirmed.</p><div class="field"><label for="form-name">Product name</label><input id="form-name" name="name" maxlength="70" required value="${safeText(product?.name || "")}" placeholder="e.g. Everyday leather tote"></div><div class="field"><label for="form-description">Description</label><textarea id="form-description" name="description" maxlength="500" required placeholder="What makes this product a good find?">${safeText(product?.description || "")}</textarea></div><div class="form-grid"><div class="field"><label for="form-price">Price (₦)</label><input id="form-price" name="price" type="number" min="100" step="1" required value="${product?.price ?? ""}" placeholder="25000"></div><div class="field"><label for="form-commission">Commission (%)</label><input id="form-commission" name="commission" type="number" min="1" max="80" step="0.5" required value="${product?.commission ?? ""}" placeholder="10"></div></div><div class="form-grid"><div class="field"><label for="form-category">Category</label><select id="form-category" name="category" required>${categories}</select></div><div class="field"><label for="form-image">Product image URL</label><input id="form-image" name="image" type="url" value="${safeText(product?.image || "")}" placeholder="https://…"><div class="hint">Use an image URL; a fallback is shown if it cannot load.</div></div></div><p id="product-form-error" class="form-error"></p><button class="button button-primary" type="submit">${product ? "Save changes" : "Add listing"} →</button></form>`,
  );
  document
    .getElementById("product-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const price = Number(form.get("price"));
      const commission = Number(form.get("commission"));
      const image =
        String(form.get("image")).trim() ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
      const error = document.getElementById("product-form-error");
      if (
        !Number.isFinite(price) ||
        price < 100 ||
        !Number.isFinite(commission) ||
        commission < 1 ||
        commission > 80
      ) {
        error.textContent =
          "Enter a price of at least ₦100 and a commission between 1% and 80%.";
        return;
      }
      const fields = {
        name: String(form.get("name")).trim(),
        description: String(form.get("description")).trim(),
        price,
        commission,
        category: String(form.get("category")),
        image,
        seller: "Your demo shop",
        sellerId: "seller-demo",
      };
      if (product) Object.assign(product, fields);
      else
        state.products.unshift({
          id: `product-${Date.now()}`,
          ...fields,
          active: true,
          createdAt: Date.now(),
        });
      saveData();
      renderAll();
      closeModal();
      showToast(
        product ? "Listing updated." : "Product added to the marketplace.",
      );
    });
}
function confirmDelete(productId) {
  const product = productById(productId);
  if (!product) return;
  openModal(
    `<div class="modal-form"><p class="eyebrow">SELLER STUDIO</p><h2 id="modal-title">Remove this listing?</h2><p><strong>${safeText(product.name)}</strong> will be removed from the public marketplace. Existing order history stays in the demo.</p><div class="share-actions"><button class="button button-soft" data-action="close-modal">Keep listing</button><button class="button button-primary" data-action="confirm-delete" data-id="${safeText(productId)}">Remove listing</button></div></div>`,
  );
}
function openOrderForm(productId, promoterId) {
  const product = productById(productId);
  if (!product) return;
  const attributedPromoterId = validPromoterForProduct(productId, promoterId);
  const orderCommission = attributedPromoterId
    ? commissionFor(product)
    : 0;
  activeModalProductId = productId;
  openModal(
    `<form class="modal-form" id="order-form"><p class="eyebrow">A NORI DEMO ORDER</p><h2 id="modal-title">Request ${safeText(product.name)}.</h2><p>This is a demonstration only: no payment is collected. The seller can review your order request${attributedPromoterId ? ", and the promoter earns a commission only if it is confirmed" : ". This direct order has no promoter commission"}.</p><div class="demo-warning">Product price: <strong>${money(product.price)}</strong>${attributedPromoterId ? ` · Promoter commission if confirmed: <strong>${money(orderCommission)}</strong>` : " · Direct order · no promoter commission"}</div><div class="field"><label for="customer-name">Your name</label><input id="customer-name" name="customer" required maxlength="60" placeholder="e.g. Tolu Adeyemi"></div><div class="field"><label for="customer-email">Email address</label><input id="customer-email" name="email" type="email" required maxlength="120" placeholder="you@example.com"></div><p id="order-form-error" class="form-error"></p><button class="button button-primary" type="submit">Submit demo order →</button><input type="hidden" name="productId" value="${safeText(productId)}"><input type="hidden" name="promoterId" value="${safeText(attributedPromoterId)}"></form>`,
  );
  document.getElementById("order-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("customer")).trim();
    const email = String(form.get("email")).trim();
    const currentProduct = productById(String(form.get("productId")));
    if (!currentProduct || !name || !email) {
      document.getElementById("order-form-error").textContent =
        "Check your details and try again.";
      return;
    }
    // Each successful submission creates one order; its generated ID prevents repeat actions from counting it again.
    const order = {
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: currentProduct.id,
      productName: currentProduct.name,
      sellerId: currentProduct.sellerId,
      sellerName: currentProduct.seller,
      customerName: name,
      customerEmail: email,
      promoterId: attributedPromoterId,
      total: Number(currentProduct.price),
      commission: orderCommission,
      status: "Pending",
      createdAt: Date.now(),
    };
    state.orders.push(order);
    saveData();
    renderAll();
    openModal(
      `<div class="modal-order"><div class="success-mark">✓</div><p class="eyebrow">DEMO ORDER RECORDED</p><h2 id="modal-title">Thanks, ${safeText(name)}.</h2><p>Your request for <strong>${safeText(currentProduct.name)}</strong> is now visible in the seller studio. The seller can confirm or reject it.${order.promoterId ? ` The referral commission is <strong>${money(order.commission)}</strong> and will only be approved if the order is confirmed.` : " This was a direct order, so no promoter commission is associated."}</p><div class="demo-warning">Order ${safeText(order.id.slice(-8).toUpperCase())} · No payment was taken.</div><button class="button button-primary" data-action="close-modal">Done</button></div>`,
    );
  });
}
function processSellerDecision(orderId, status) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order || order.status !== "Pending") return;
  order.status = status;
  order.reviewedAt = Date.now();
  saveData();
  renderAll();
  showToast(
    status === "Approved"
      ? "Order confirmed. Commission approved."
      : "Order rejected. Commission marked rejected.",
  );
}

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    selectedCategory = categoryButton.dataset.category;
    renderCategories();
    renderMarketplace();
    return;
  }
  const navButton = event.target.closest("[data-nav]");
  if (navButton) {
    document
      .getElementById(navButton.dataset.nav)
      ?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("main-nav").classList.remove("open");
    document
      .getElementById("menu-toggle")
      .setAttribute("aria-expanded", "false");
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const { action, id } = actionButton.dataset;
  if (action === "details") productDetails(id);
  if (action === "modal-order")
    openOrderForm(id, validPromoterForProduct(id, new URLSearchParams(window.location.search).get("ref")));
  if (action === "promote" || action === "modal-promote") promoteProduct(id);
  if (action === "copy-link") {
    copyText(createReferralUrl(id, PROMOTER_ID))
      .then(() => showToast("Referral link copied."))
      .catch(() => showToast("Could not copy. Select the link to copy it."));
  }
  if (action === "share-link") shareProduct(id);
  if (action === "copy-current-link" && activeModalProductId)
    copyText(createReferralUrl(activeModalProductId, PROMOTER_ID))
      .then(() => showToast("Referral link copied."))
      .catch(() => showToast("Could not copy."));
  if (action === "share-current-link" && activeModalProductId)
    shareProduct(activeModalProductId);
  if (action === "close-modal" || action === "close-modal-and-hub") {
    closeModal();
    if (action === "close-modal-and-hub")
      document
        .getElementById("promoter-dashboard")
        .scrollIntoView({ behavior: "smooth" });
  }
  if (action === "edit") openProductForm(id);
  if (action === "toggle-product") {
    const product = productById(id);
    if (product) {
      product.active = !product.active;
      saveData();
      renderAll();
      showToast(product.active ? "Listing reactivated." : "Listing paused.");
    }
  }
  if (action === "delete-product") confirmDelete(id);
  if (action === "confirm-delete") {
    state.products = state.products.filter((product) => product.id !== id);
    saveData();
    renderAll();
    closeModal();
    showToast("Listing removed.");
  }
  if (action === "order-approved") processSellerDecision(id, "Approved");
  if (action === "order-rejected") processSellerDecision(id, "Rejected");
});
document
  .getElementById("product-search")
  .addEventListener("input", renderMarketplace);
document
  .getElementById("category-filter")
  .addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    renderCategories();
    renderMarketplace();
  });
document
  .getElementById("sort-filter")
  .addEventListener("change", renderMarketplace);
document
  .getElementById("add-product-button")
  .addEventListener("click", () => openProductForm());
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-backdrop").addEventListener("click", (event) => {
  if (event.target.id === "modal-backdrop") closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
document.getElementById("menu-toggle").addEventListener("click", (event) => {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("open");
  event.currentTarget.setAttribute(
    "aria-expanded",
    nav.classList.contains("open") ? "true" : "false",
  );
});
document.querySelectorAll("#main-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    document.getElementById("main-nav").classList.remove("open");
    document
      .getElementById("menu-toggle")
      .setAttribute("aria-expanded", "false");
  }),
);

// URL query values are read once on load. Referrals are attributed before the order form is shown.
const referralParams = new URLSearchParams(window.location.search);
const referredProductId =
  referralParams.get("product") || referralParams.get("id");
const referredPromoterId = referralParams.get("ref");
if (referredProductId && referredPromoterId && productById(referredProductId)) {
  recordReferralVisit(referredProductId, referredPromoterId);
  window.addEventListener("load", () =>
    setTimeout(() => {
      const product = productById(referredProductId);
      if (!product) return;
      openModal(
        `<div class="modal-order"><p class="eyebrow">A PRODUCT FOUND ON NORI</p><h2 id="modal-title">${safeText(product.name)}</h2><p>${safeText(product.description)}</p><div class="demo-warning">Shared by a NORI promoter · ${safeText(product.seller)} · ${money(product.price)}</div><button class="button button-primary" data-action="place-referred-order" data-id="${safeText(product.id)}">Submit a demo order →</button></div>`,
      );
    }, 250),
  );
}
document.querySelectorAll(".hero-product").forEach(setImageFallback);
document.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="place-referred-order"]');
  if (button) openOrderForm(button.dataset.id, referredPromoterId || "");
});
renderAll();
