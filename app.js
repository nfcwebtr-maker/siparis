document.addEventListener("DOMContentLoaded", function() {

  // ==========================================
  // 1. KONFIGURATION & WERTE
  // ==========================================
  const STEP = 5;
  const MIN_QTY = 20;      
  const FREE_SHIP = 30;    
  const SHIP_PRICE = 80;
  const CURRENCY = "TL";
  const WHATSAPP = "908503463240";
  const DEFAULT_PRICE = 40;

  // Deine aktualisierte Produktliste
  const PRODUCTS = [
    { id: "501", name: "NFC Instagram Pembe", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/14a8bceb-49ce-4b13-9585-089636c03fef/1080/akilli-instagram-takipci-artirma-nfc-anahtarlik.webp" },
    { id: "510", name: "NFC 0 Positif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/bda8c99b-a97d-41e6-a524-57ccfe727b03/1080/kan-damlasi-tasarimli-anahtarlik-seti.webp" },
    { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/868ef117-6ce2-4217-a0de-b9da13730b80/1080/sifir-negatif-kan-grubu-anahtarlik-modelleri.webp" },
    { id: "512", name: "NFC A Pozitif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/b143369d-6529-4c00-bb2a-f167b9d27a30/1080/a-pozitif-kan-grubu-acil-durum-anahtarligi.webp" },
    { id: "513", name: "NFC A Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/0f3aecd5-fef4-4ab2-845a-484f9a8ee458/1080/a-negatif-kan-grubu-anahtarlik-hediyelik.webp" },
    { id: "514", name: "NFC B Pozitif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/3cdea260-41c0-43ce-8fc8-7cb3cb7ad007/1080/b-pozitif-kan-grubu-kisiye-ozel-anahtarlik.webp" },
    { id: "515", name: "NFC B Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/df0be494-8d00-451a-867e-c418ac3d7e43/1080/b-negatif-kan-grubu-anahtarlik-satis.webp" },
    { id: "516", name: "NFC AB Positif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/6fa628ca-4395-4e3f-8e44-887e4fbc4794/1080/kan-grubu-anahtarlik-kirmizi-tasarim.webp" },
    { id: "517", name: "NFC AB Negatif Kan Grubu", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/dcdc7276-d3f1-4f96-98d8-598d9df8d6a4/1080/ab-negatif-kan-grubu-medikal-aksesuar.webp" }
  ];

  const grid = document.getElementById("grid");
  const qty = {};

  // ==========================================
  // 2. GRID RENDERING & INTERAKTION
  // ==========================================
  PRODUCTS.forEach(p => {
    qty[p.id] = 0;
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="overlay"></div>
      <div class="item-badge" style="display:none;">0 Adet</div>
      <div class="item-title">${p.id} - ${p.name}</div>
      <div class="controls">
        <button class="remove" style="visibility:hidden;">-</button>
        <span class="item-qty">0</span>
        <button class="add">+</button>
      </div>
    `;

    const overlay = item.querySelector(".overlay");
    const badge = item.querySelector(".item-badge");
    const removeBtn = item.querySelector(".remove");
    const qtySpan = item.querySelector(".item-qty");

    const updateItemUI = () => {
      qtySpan.innerText = qty[p.id];
      badge.innerText = qty[p.id] + " Adet";
      
      if (qty[p.id] > 0) {
        item.classList.add("active");
        overlay.style.display = "block";
        badge.style.display = "block";
        removeBtn.style.visibility = "visible";
      } else {
        item.classList.remove("active");
        overlay.style.display = "none";
        badge.style.display = "none";
        removeBtn.style.visibility = "hidden";
      }
      updateGlobalStatus();
    };

    // Klick auf das Bild/Item fügt +5 hinzu
    item.onclick = () => { qty[p.id] += STEP; updateItemUI(); };
    
    // Klick auf Minus-Button (verhindert Bild-Klick)
    removeBtn.onclick = (e) => { 
      e.stopPropagation(); 
      qty[p.id] -= STEP; 
      if(qty[p.id] < 0) qty[p.id] = 0; 
      updateItemUI(); 
    };

    grid.appendChild(item);
  });

  // ==========================================
  // 3. STATUS BAR GÜNCELLEME
  // ==========================================
  function updateGlobalStatus() {
    const total = Object.values(qty).reduce((a, b) => a + b, 0);
    const bar = document.getElementById("statusBar");
    
    if(!bar) return;

    if (total >= MIN_QTY) {
      bar.classList.add("success");
      if (total >= FREE_SHIP) {
          bar.innerHTML = `🚀 Sepetiniz: ${total} Adet - Kargo Ücretsiz!`;
      } else {
          bar.innerHTML = `✅ Sepetiniz: ${total} Adet (Kargo için ${FREE_SHIP - total} daha ekleyin)`;
      }
    } else {
      bar.classList.remove("success");
      bar.innerHTML = `Sepetiniz: ${total} Adet (Minimum için ${MIN_QTY - total} daha ekleyin)`;
    }
  }

  // ==========================================
  // 4. FORMULAR DATEN LADEN/SPEICHERN
  // ==========================================
  ["businessName", "address", "recipient", "phone"].forEach(f => {
    const el = document.getElementById(f);
    if(el && localStorage.getItem(f)) el.value = localStorage.getItem(f);
  });

  document.getElementById("saveFormBtn").onclick = () => {
    ["businessName", "address", "recipient", "phone"].forEach(f => {
      localStorage.setItem(f, document.getElementById(f).value);
    });
    alert("Bilgileriniz kaydedildi.");
  };

  // ==========================================
  // 5. SIPARIŞI OLUŞTURMA & WHATSAPP
  // ==========================================
  document.getElementById("createOrderBtn").onclick = () => {
    const total = Object.values(qty).reduce((a, b) => a + b, 0);
    if (total < MIN_QTY) {
      alert(`Minimum ${MIN_QTY} adet seçmelisiniz.`);
      return;
    }

    let subtotal = 0;
    let productLines = "";
    PRODUCTS.forEach(p => {
      if (qty[p.id] > 0) {
        subtotal += (qty[p.id] * p.price);
        productLines += `• ${p.id} - ${p.name}: ${qty[p.id]} adet\n`;
      }
    });

    const shipping = total >= FREE_SHIP ? 0 : SHIP_PRICE;
    const summaryText = `NFC.web.tr Yeni Sipariş!\n\nAlıcı: ${document.getElementById("recipient").value}\nTel: ${document.getElementById("phone").value}\n\nÜrünler:\n${productLines}\nToplam: ${subtotal + shipping} ${CURRENCY}`;

    document.getElementById("orderOutput").value = summaryText;
    const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summaryText)}`;

    document.getElementById("summary").innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:15px; margin-top:30px; padding:20px; background:#fff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); border:1px solid #eee;">
        <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0; text-align: center;">
          Sipariş listeniz oluşturuldu! ✅ <br>
          <span style="color: #4b5563; font-weight: 400; font-size: 14px;">Tamamlamak için lütfen aşağıdaki butona tıklayın:</span>
        </p>
        <a href="${waUrl}" target="_blank" style="transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" style="width:80px;">
        </a>
        <div style="background:#e8f5e9; padding:10px 15px; border-radius:8px; color:#2e7d32; font-size:13px; text-align:center;">
          Tıkladığınızda detaylar WhatsApp'a aktarılacaktır.
        </div>
      </div>
    `;

    document.getElementById("orderOutput").scrollIntoView({ behavior: "smooth", block: "center" });
  };
});
