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
  if (!grid) {
      console.error("HATA: HTML içinde id='grid' olan element bulunamadı!");
      return; 
  }

  const qty = {};

  PRODUCTS.forEach(p => {
    qty[p.id] = 0;
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="overlay"></div>
      <div class="item-title">${p.id} - ${p.name}</div>
      <div class="controls">
        <button class="add">+</button>
        <button class="remove" style="display:none;">-</button>
        <div class="qty-display">0</div>
      </div>
    `;

    const overlay = item.querySelector(".overlay");
    const addBtn = item.querySelector(".add");
    const removeBtn = item.querySelector(".remove");
    const display = item.querySelector(".qty-display");

    const updateQty = (change) => {
      qty[p.id] += change;
      if (qty[p.id] < 0) qty[p.id] = 0;
      
      display.innerText = qty[p.id];
      
      if (qty[p.id] > 0) {
        removeBtn.style.display = "inline-block";
        overlay.style.display = "block";
        item.classList.add("active");
      } else {
        removeBtn.style.display = "none";
        overlay.style.display = "none";
        item.classList.remove("active");
      }
    };

    // Klick auf das ganze Item (Bild + Overlay) fügt hinzu
    item.onclick = () => updateQty(STEP);

    // Klick auf den Minus-Button zieht ab (Stops propagation!)
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      updateQty(-STEP);
    };

    grid.appendChild(item);
  });

  // Formular Daten laden/speichern
  ["businessName","address","recipient","phone"].forEach(f => {
    const el = document.getElementById(f);
    if(el) {
      const saved = localStorage.getItem(f);
      if(saved) el.value = saved;
    }
  });

  const saveBtn = document.getElementById("saveFormBtn");
  if(saveBtn) {
    saveBtn.onclick = () => {
      ["businessName","address","recipient","phone"].forEach(f => {
        const el = document.getElementById(f);
        if(el) localStorage.setItem(f, el.value);
      });
      alert("Bilgiler kaydedildi.");
    };
  }

  // Sipariş Oluşturma
  const orderBtn = document.getElementById("createOrderBtn");
  if(orderBtn) {
    orderBtn.onclick = () => {
      const total = Object.values(qty).reduce((a, b) => a + b, 0);

      if (total < MIN_QTY) {
        alert(`Sepetinizde ${total} adet var. Minimum ${MIN_QTY} adet gereklidir.`);
        return;
      }

      if (total < FREE_SHIP) {
        if (!confirm(`${total} adet seçtiniz. 30 adette kargo ücretsiz! Devam edilsin mi?`)) return;
      }

      let subtotal = 0;
      let text = "";
      PRODUCTS.forEach(p => {
        if (qty[p.id] > 0) {
          const price = p.price || DEFAULT_PRICE;
          const line = qty[p.id] * price;
          subtotal += line;
          text += `${p.id} - ${p.name}: ${qty[p.id]} adet\n`;
        }
      });

      const shipping = total >= FREE_SHIP ? 0 : SHIP_PRICE;
      const grand = subtotal + shipping;

      const output = `NFC.web.tr Sipariş\n\nFirma: ${document.getElementById("businessName").value}\nAlıcı: ${document.getElementById("recipient").value}\n\n${text}\nToplam: ${grand} ${CURRENCY}`;
      
      const outEl = document.getElementById("orderOutput");
      if(outEl) {
          outEl.value = output;
          const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(output)}`;
          document.getElementById("summary").innerHTML = `
            <div style="text-align:center; margin-top:20px;">
              <a href="${wa}" target="_blank"><img src="https://izbirakan.com/wp-content/uploads/2025/08/whatsapp-ikon.png" style="width:80px;"></a>
              <p>Sipariş hazır! WhatsApp ile gönderin.</p>
            </div>`;
          outEl.scrollIntoView({ behavior: "smooth" });
      }
    };
  }
});
