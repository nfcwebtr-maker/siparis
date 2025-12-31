document.addEventListener("DOMContentLoaded", function() {

  const STEP = 5;
  const MIN_QTY = 20;      
  const FREE_SHIP = 30;    
  const SHIP_PRICE = 80;
  const CURRENCY = "TL";
  const WHATSAPP = "908503463240";
  const DEFAULT_PRICE = 40;

  const PRODUCTS = [
    { id: "501", name: "Instagram Takipçi Artırma NFC Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/14a8bceb-49ce-4b13-9585-089636c03fef/1080/akilli-instagram-takipci-artirma-nfc-anahtarlik.webp" },
    { id: "510", name: "Kan Damlası Tasarımlı Anahtarlık Seti", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/bda8c99b-a97d-41e6-a524-57ccfe727b03/1080/kan-damlasi-tasarimli-anahtarlik-seti.webp" },
    { id: "511", name: "0 Negatif Kan Grubu Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/868ef117-6ce2-4217-a0de-b9da13730b80/1080/sifir-negatif-kan-grubu-anahtarlik-modelleri.webp" },
    { id: "512", name: "A Pozitif Kan Grubu Anahtarlığı", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/b143369d-6529-4c00-bb2a-f167b9d27a30/1080/a-pozitif-kan-grubu-acil-durum-anahtarligi.webp" },
    { id: "513", name: "A Negatif Kan Grubu Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/0f3aecd5-fef4-4ab2-845a-484f9a8ee458/1080/a-negatif-kan-grubu-anahtarlik-hediyelik.webp" },
    { id: "514", name: "B Pozitif Kan Grubu Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/3cdea260-41c0-43ce-8fc8-7cb3cb7ad007/1080/b-pozitif-kan-grubu-kisiye-ozel-anahtarlik.webp" },
    { id: "515", name: "B Negatif Kan Grubu Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/df0be494-8d00-451a-867e-c418ac3d7e43/1080/b-negatif-kan-grubu-anahtarlik-satis.webp" },
    { id: "516", name: "Kırmızı Kan Grubu Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/6fa628ca-4395-4e3f-8e44-887e4fbc4794/1080/kan-grubu-anahtarlik-kirmizi-tasarim.webp" },
    { id: "517", name: "AB Negatif Kan Grubu Anahtarlık", price: 40, image: "https://cdn.myikas.com/images/f93197bd-a034-4081-b2aa-72d76eeab8f6/dcdc7276-d3f1-4f96-98d8-598d9df8d6a4/1080/ab-negatif-kan-grubu-medikal-aksesuar.webp" }
  ];

  const grid = document.getElementById("grid");
  const qty = {};

  // Produkte rendern
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

    const updateUI = () => {
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

    item.onclick = () => { qty[p.id] += STEP; updateUI(); };
    removeBtn.onclick = (e) => { e.stopPropagation(); qty[p.id] -= STEP; if(qty[p.id]<0) qty[p.id]=0; updateUI(); };

    grid.appendChild(item);
  });

  function updateGlobalStatus() {
    const total = Object.values(qty).reduce((a, b) => a + b, 0);
    const bar = document.getElementById("statusBar");
    const count = document.getElementById("globalCount");
    count.innerText = total;

    if (total >= MIN_QTY) {
      bar.classList.add("success");
      bar.innerHTML = `✅ Sepetiniz: ${total} Adet (Minimum Tamam!)`;
    } else {
      bar.classList.remove("success");
      bar.innerHTML = `Sepetiniz: ${total} Adet (Minimum için ${MIN_QTY - total} daha ekleyin)`;
    }
  }

  // Formular-Logik
  ["businessName","address","recipient","phone"].forEach(f => {
    const el = document.getElementById(f);
    const saved = localStorage.getItem(f);
    if(saved) el.value = saved;
  });

  document.getElementById("saveFormBtn").onclick = () => {
    ["businessName","address","recipient","phone"].forEach(f => {
      localStorage.setItem(f, document.getElementById(f).value);
    });
    alert("Bilgiler tarayıcıya kaydedildi.");
  };

  // Sipariş Oluşturma
  document.getElementById("createOrderBtn").onclick = () => {
    const total = Object.values(qty).reduce((a, b) => a + b, 0);

    if (total < MIN_QTY) {
      alert(`Sepetinizde sadece ${total} adet var. Devam etmek için en az ${MIN_QTY} adet seçmelisiniz.`);
      return;
    }

    let subtotal = 0;
    let text = "";
    PRODUCTS.forEach(p => {
      if (qty[p.id] > 0) {
        const line = qty[p.id] * p.price;
        subtotal += line;
        text += `• ${p.id} - ${p.name}: ${qty[p.id]} adet\n`;
      }
    });

    const shipping = total >= FREE_SHIP ? 0 : SHIP_PRICE;
    const grandTotal = subtotal + shipping;

    const summaryText = `NFC.web.tr Yeni Sipariş!\n\nFirma: ${document.getElementById("businessName").value}\nAlıcı: ${document.getElementById("recipient").value}\nAdres: ${document.getElementById("address").value}\nTel: ${document.getElementById("phone").value}\n\nÜrünler:\n${text}\nToplam Adet: ${total}\nKargo: ${shipping} ${CURRENCY}\nGenel Toplam: ${grandTotal} ${CURRENCY}`;

    document.getElementById("orderOutput").value = summaryText;
    const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summaryText)}`;

    document.getElementById("summary").innerHTML = `
      <div style="text-align:center; margin: 30px 0;">
        <a href="${waUrl}" target="_blank"><img src="https://izbirakan.com/wp-content/uploads/2025/08/whatsapp-ikon.png" style="width:100px;"></a>
        <p style="color: #059669; font-weight: bold;">Siparişiniz hazır! Yukarıdaki WhatsApp ikonuna tıklayarak bize iletin.</p>
      </div>
    `;

    document.getElementById("orderOutput").scrollIntoView({ behavior: "smooth" });
  };
});
