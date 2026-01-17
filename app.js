document.addEventListener("DOMContentLoaded", function() {

  // ==========================================
  // 1. KONFIGURATION & WERTE
  // ==========================================
  const STEP = 5;
  const MIN_QTY = 20;      
  const FREE_SHIP = 30;    
  const SHIP_PRICE = 100;
  const CURRENCY = "TL";
  const WHATSAPP = "908503463240";

  const CATEGORIES = [
    {
      name: "Starter Packs ve Standlar",
      products: [
        { id: "599", name: "NFC Starter Pack", price: 599, image: "https://via.placeholder.com/300x200?text=Starter+Pack" },
        { id: "598", name: "NFC Masa Standı", price: 499, image: "https://via.placeholder.com/300x200?text=Masa+Standi" }
      ]
    },
    {
      name: "SOS ve Acil Durum Anahtarlıkları",
      products: [
        { id: "510", name: "NFC 0 Pozitif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/bda8c99b-a97d-41e6-a524-57ccfe727b03/1080/kan-damlasi-tasarimli-anahtarlik-seti.webp" },
        { id: "521", name: "SOS Acil Yardım", price: 40, image: "https://via.placeholder.com/300x200?text=SOS+521" },
        { id: "522", name: "Medikal Bilgi Anahtarlık", price: 40, image: "https://via.placeholder.com/300x200?text=Medikal+522" },
        { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/868ef117-6ce2-4217-a0de-b9da13730b80/1080/sifir-negatif-kan-grubu-anahtarlik-modelleri.webp" },
        { id: "512", name: "NFC A Pozitif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/b143369d-6529-4c00-bb2a-f167b9d27a30/1080/a-pozitif-kan-grubu-acil-durum-anahtarligi.webp" },
        { id: "513", name: "NFC A Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/0f3aecd5-fef4-4ab2-845a-484f9a8ee458/1080/a-negatif-kan-grubu-anahtarlik-hediyelik.webp" },
        { id: "514", name: "NFC B Pozitif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/3cdea260-41c0-43ce-8fc8-7cb3cb7ad007/1080/b-pozitif-kan-grubu-kisiye-ozel-anahtarlik.webp" },
        { id: "515", name: "NFC B Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/df0be494-8d00-451a-867e-c418ac3d7e43/1080/b-negatif-kan-grubu-anahtarlik-satis.webp" },
        { id: "516", name: "NFC AB Pozitif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/6fa628ca-4395-4e3f-8e44-887e4fbc4794/1080/kan-grubu-anahtarlik-kirmizi-tasarim.webp" },
        { id: "517", name: "NFC AB Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/dcdc7276-d3f1-4f96-98d8-598d9df8d6a4/1080/ab-negatif-kan-grubu-medikal-aksesuar.webp" }
      ]
    },
    {
      name: "Sosyal Medya Takip Anahtarlıkları",
      products: [
        { id: "501", name: "NFC Instagram Pembe", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/14a8bceb-49ce-4b13-9585-089636c03fef/1080/akilli-instagram-takipci-artirma-nfc-anahtarlik.webp" },
        { id: "502", name: "NFC Instagram Mavi", price: 40, image: "https://via.placeholder.com/300x200?text=Instagram+Mavi" },
        { id: "503", name: "NFC TikTok Takip", price: 40, image: "https://via.placeholder.com/300x200?text=TikTok" },
        { id: "504", name: "NFC Google Yorum", price: 40, image: "https://via.placeholder.com/300x200?text=Google+Yorum" }
      ]
    },
    {
      name: "İşletmeler Özel Anahtarlıklar",
      products: [
        { id: "505", name: "Logo Baskılı Özel", price: 50, image: "https://via.placeholder.com/300x200?text=Logo+Baskili" }
      ]
    },
    {
      name: "Veteriner ve PetShop Anahtarlıklar",
      products: [
        { id: "531", name: "Pet Takip NFC", price: 40, image: "https://via.placeholder.com/300x200?text=Pet+Takip" }
      ]
    }
  ];

  const container = document.getElementById("categoriesContainer");
  const qty = {};

  // ÜRÜNLERİ OLUŞTUR
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
        <img src="${p.image}" alt="${p.name}">
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
      removeBtn.onclick = (e) => { e.stopPropagation(); qty[p.id] -= currentStep; if(qty[p.id]<0) qty[p.id]=0; updateItemUI(); };
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

  // STATUS BARI GÜNCELLE
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

    if (totalQty >= MIN_QTY) {
      bar.classList.add("success");
      const shipping = totalQty >= FREE_SHIP ? 0 : SHIP_PRICE;
      bar.innerHTML = totalQty >= FREE_SHIP ? `🚀 ${totalQty} Adet | ${totalPrice} TL (Bedava Kargo!)` : `✅ ${totalQty} Adet | ${totalPrice} TL (+${SHIP_PRICE} TL Kargo)`;
    } else {
      bar.classList.remove("success");
      bar.innerHTML = `Sepetiniz: ${totalQty} Adet (Minimum için ${MIN_QTY - totalQty} daha) | ${totalPrice} TL`;
    }
  }

  // AUTO-SAVE FORM
  ["businessName", "address", "recipient", "phone"].forEach(f => {
    const el = document.getElementById(f);
    if(el) {
      el.value = localStorage.getItem(f) || "";
      el.addEventListener("input", () => localStorage.setItem(f, el.value));
    }
  });

  // SİPARİŞİ OLUŞTUR (DETAYLI FİYATLANDIRMA)
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
          // Her satıra adet x birim fiyat = satır toplamı ekliyoruz
          productLines += `• ${p.id} - ${p.name}: ${qty[p.id]} adet x ${p.price} TL = ${lineTotal} TL\n`;
        }
      });
    });

    if (totalQty < MIN_QTY) { alert(`En az ${MIN_QTY} adet seçmelisiniz.`); return; }

    const shipping = totalQty >= FREE_SHIP ? 0 : SHIP_PRICE;
    const grandTotal = subtotal + shipping;

    // Detaylı WhatsApp Mesajı
    const summaryText = `NFC.web.tr Yeni Sipariş!\n\n` +
      `Firma: ${document.getElementById("businessName").value}\n` +
      `Alıcı: ${document.getElementById("recipient").value}\n` +
      `Tel: ${document.getElementById("phone").value}\n` +
      `Adres: ${document.getElementById("address").value}\n\n` +
      `Ürünler:\n${productLines}\n` +
      `------------------------\n` +
      `Toplam Adet: ${totalQty}\n` +
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
