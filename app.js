document.addEventListener("DOMContentLoaded", function() {

  // ==========================================
  // 1. KONFIGURASYON & DEĞERLER
  // ==========================================
  const STEP = 5;
  const FREE_SHIP_THRESHOLD = 1500; 
  const SHIP_PRICE = 120;           
  const CURRENCY = "TL";
  const WHATSAPP = "908503463240";

  const CATEGORIES = [
    {
      name: "Starter Packs ve Standlar",
      products: [
        { id: "599", name: "NFC Anahtarlık Starter Pack", price: 1600, image: "assets/599.png" },
        { id: "598", name: "Anahtarlık Teşhir Standı -Boş-", price: 200, image: "assets/598.png" }
      ]
    },
    {
      name: "SOS ve Acil Durum Anahtarlıkları",
      products: [
        { id: "510", name: "NFC 0 Pozitif Kan Grubu", price: 40, image: "assets/510.png" },
        { id: "521", name: "SOS Acil Yardım", price: 40, image: "assets/521.png" },
        { id: "522", name: "Medikal Bilgi Anahtarlık", price: 40, image: "assets/522.png" },
        { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 40, image: "assets/511.png" },
        { id: "512", name: "NFC A Pozitif Kan Grubu", price: 40, image: "assets/512.png" },
        { id: "513", name: "NFC A Negatif Kan Grubu", price: 40, image: "assets/513.png" },
        { id: "514", name: "NFC B Pozitif Kan Grubu", price: 40, image: "assets/514.png" },
        { id: "515", name: "NFC B Negatif Kan Grubu", price: 40, image: "assets/515.png" },
        { id: "516", name: "NFC AB Pozitif Kan Grubu", price: 40, image: "assets/516.png" },
        { id: "517", name: "NFC AB Negatif Kan Grubu", price: 40, image: "assets/517.png" }
      ]
    },
    {
      name: "Sosyal Medya Takip Anahtarlıkları",
      products: [
        { id: "501", name: "NFC Instagram Pembe", price: 40, image: "assets/501.png" },
        { id: "502", name: "NFC Instagram Mavi", price: 40, image: "assets/502.png" },
        { id: "503", name: "NFC TikTok Takip", price: 40, image: "assets/503.png" },
        { id: "504", name: "NFC Google Yorum", price: 40, image: "assets/504.png" }
      ]
    },
    {
      name: "İşletmeler Özel Anahtarlıklar",
      products: [
        { id: "505", name: "Logo Baskılı Özel", price: 50, image: "assets/505.png" }
      ]
    },
    {
      name: "Veteriner ve PetShop Anahtarlıklar",
      products: [
        { id: "531", name: "Pet Takip NFC", price: 40, image: "assets/531.png" }
      ]
    }
  ];

  const container = document.getElementById("categoriesContainer");
  const qty = {};

  // PRODUKTE RENDERN
  CATEGORIES.forEach(cat => {
    const section = document.createElement("div");
    section.className = "category-section";
    section.innerHTML = `<h2 class="category-title">${cat.name}</h2>`;
    const grid = document.createElement("div");
    grid.className = "grid";
    const currentStep = cat.name === "Starter Packs ve Standlar" ? 1 : STEP;

    cat.products.forEach((p, index) => {
      qty[p.id] = 0;
      const item = document.createElement("div");
      item.className = `item ${index >= 4 ? 'hidden' : ''}`;
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Resim+Yok'">
        <div class="item-badge" style="display:none;">0 Adet</div>
        <div class="item-title">${p.id} - ${p.name}</div>
        <div class="controls">
          <button class="remove" style="visibility:hidden;">-</button>
          <span class="item-qty">0</span>
          <button class="add">+</button>
        </div>
      `;

      const badge = item.querySelector(".item-badge");
      const removeBtn = item.querySelector(".remove");
      const qtySpan = item.querySelector(".item-qty");

      const updateItemUI = () => {
        qtySpan.innerText = qty[p.id];
        badge.innerText = qty[p.id] + " Adet";
        if (qty[p.id] > 0) {
          item.classList.add("active");
          badge.style.display = "block";
          removeBtn.style.visibility = "visible";
        } else {
          item.classList.remove("active");
          badge.style.display = "none";
          removeBtn.style.visibility = "hidden";
        }
        updateGlobalStatus();
      };

      item.onclick = () => { qty[p.id] += currentStep; updateItemUI(); };
      removeBtn.onclick = (e) => { 
        e.stopPropagation(); 
        qty[p.id] -= currentStep; 
        if(qty[p.id] < 0) qty[p.id] = 0; 
        updateItemUI(); 
      };
      grid.appendChild(item);
    });

    section.appendChild(grid);
    if (cat.products.length > 4) {
      const btn = document.createElement("button");
      btn.className = "show-more-btn";
      btn.innerText = "Daha Fazla Ürün Göster";
      btn.onclick = () => {
        grid.querySelectorAll(".item.hidden").forEach(el => el.classList.remove("hidden"));
        btn.style.display = "none";
      };
      section.appendChild(btn);
    }
    container.appendChild(section);
  });

  // STATUS BERECHNUNG
  function updateGlobalStatus() {
    let totalQty = 0;
    let totalPrice = 0;

    CATEGORIES.forEach(cat => {
      cat.products.forEach(p => {
        if (qty[p.id] > 0) {
          totalQty += qty[p.id];
          totalPrice += (qty[p.id] * p.price);
        }
      });
    });

    const bar = document.getElementById("statusBar");
    if(!bar) return;

    if (totalPrice >= FREE_SHIP_THRESHOLD) {
      bar.classList.add("success");
      bar.innerHTML = `🚀 ${totalQty} Adet | ${totalPrice} TL (Bedava Kargo!)`;
    } else {
      bar.classList.remove("success");
      const diff = FREE_SHIP_THRESHOLD - totalPrice;
      bar.innerHTML = `Sepetiniz: ${totalPrice} TL | Bedava kargo için ${diff} TL daha ekleyin`;
    }
  }

  // Auto-Save Form
  ["businessName", "address", "recipient", "phone"].forEach(f => {
    const el = document.getElementById(f);
    if(el) {
      el.value = localStorage.getItem(f) || "";
      el.addEventListener("input", () => localStorage.setItem(f, el.value));
    }
  });

  // SIPARIŞ OLUŞTURMA
  document.getElementById("createOrderBtn").onclick = () => {
    let totalQty = 0;
    let subtotal = 0;
    let productLines = "";

    CATEGORIES.forEach(cat => {
      cat.products.forEach(p => {
        if (qty[p.id] > 0) {
          const lineTotal = qty[p.id] * p.price;
          totalQty += qty[p.id];
          subtotal += lineTotal;
          productLines += `• ${p.id} - ${p.name}: ${qty[p.id]} adet x ${p.price} TL = ${lineTotal} TL\n`;
        }
      });
    });

    if (totalQty === 0) { alert(`Lütfen en az bir ürün seçiniz.`); return; }

    const shipping = subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_PRICE;
    const grandTotal = subtotal + shipping;

    const summaryText = `NFC.web.tr Yeni Sipariş!\n\n` +
      `Firma: ${document.getElementById("businessName").value}\n` +
      `Alıcı: ${document.getElementById("recipient").value}\n` +
      `Tel: ${document.getElementById("phone").value}\n` +
      `Adres: ${document.getElementById("address").value}\n\n` +
      `Ürünler:\n${productLines}\n` +
      `------------------------\n` +
      `Ara Toplam: ${subtotal} TL\n` +
      `Kargo: ${shipping === 0 ? 'Ücretsiz' : shipping + ' TL'}\n` +
      `Genel Toplam: ${grandTotal} TL`;

    document.getElementById("orderOutput").value = summaryText;
    const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summaryText)}`;

    document.getElementById("summary").innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:15px; margin-top:30px; padding:20px; background:#fff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid #eee;">
        <p style="color: #111827; font-size: 16px; font-weight: 600; text-align: center;">Sipariş listeniz hazır! ✅</p>
        <a href="${waUrl}" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" class="wa-pulse" style="width:80px;"></a>
      </div>
    `;
    document.getElementById("orderOutput").scrollIntoView({ behavior: "smooth", block: "center" });
  };
});

