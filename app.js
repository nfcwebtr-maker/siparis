const WHATSAPP_NUMBER = "908503463240";
const FREE_SHIP_THRESHOLD = 1500;
const SHIP_PRICE = 120;

const CATEGORIES = [
  {
    name: "Başlangıç Setleri ve Standlar",
    products: [
      { id: "599", name: "SOS ve Sosyal Medya Başlangıç Seti", price: 1600, image: "assets/505.png", step: 1 },
      { id: "598", name: "Anahtarlık Teşhir Standı -Boş-", price: 200, image: "assets/598.png", step: 1 }
    ]
  },
  {
    name: "SOS ve Acil Durum Anahtarlıkları",
    products: [
      { id: "510", name: "NFC 0 Pozitif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "521", name: "SOS Acil Yardım", price: 40, image: "assets/505.png", step: 5 },
      { id: "522", name: "Medikal Bilgi Anahtarlık", price: 40, image: "assets/505.png", step: 5 },
      { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "512", name: "NFC A Pozitif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "513", name: "NFC A Negatif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "514", name: "NFC B Pozitif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "515", name: "NFC B Negatif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "516", name: "NFC AB Pozitif Kan Grubu", price: 40, image: "assets/505.png", step: 5 },
      { id: "517", name: "NFC AB Negatif Kan Grubu", price: 40, image: "assets/505.png", step: 5 }
    ]
  },
  {
    name: "Sosyal Medya Takip Anahtarlıkları",
    products: [
      { id: "501", name: "NFC Instagram Pembe", price: 40, image: "assets/505.png", step: 5 },
      { id: "502", name: "NFC Instagram Mavi", price: 40, image: "assets/505.png", step: 5 },
      { id: "503", name: "NFC TikTok Takip", price: 40, image: "assets/505.png", step: 5 },
      { id: "504", name: "NFC Google Yorum", price: 40, image: "assets/505.png", step: 5 }
    ]
  },
  {
    name: "İşletmelere Özel NFC Anahtarlıklar",
    products: [
      { id: "505", name: "Logolu Yuvarlak NFC Anahtarlık", price: 50, image: "assets/505.png", step: 5 }
    ]
  },
  {
    name: "Veteriner ve PetShop Anahtarlıkları",
    products: [
      { id: "531", name: "Pet Takip NFC", price: 40, image: "assets/505.png", step: 5 }
    ]
  }
];

let cart = {};

function renderUI() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = ""; 

    CATEGORIES.forEach(cat => {
        const block = document.createElement('div');
        block.className = 'category-block';
        let html = `<div class="category-title">${cat.name}</div>`;
        html += `<div class="product-list">`;
        cat.products.forEach(prod => {
            html += `
                <div class="product-item">
                    <img src="${prod.image}" class="product-img" alt="${prod.name}">
                    <div class="product-info">
                        <div class="product-name">${prod.name}</div>
                        <div class="product-price">${prod.price} TL ${prod.step > 1 ? '(5\'li Paket)' : ''}</div>
                    </div>
                    <div class="product-controls">
                        <button onclick="updateCart('${prod.id}', -1, '${prod.name}', ${prod.price}, ${prod.step})">-</button>
                        <span id="qty-${prod.id}">${cart[prod.id]?.qty || 0}</span>
                        <button onclick="updateCart('${prod.id}', 1, '${prod.name}', ${prod.price}, ${prod.step})">+</button>
                    </div>
                </div>`;
        });
        html += `</div>`;
        if(cat.products.length > 2) {
            html += `<button class="show-more-btn" onclick="toggleList(this)">Daha Fazla Gör...</button>`;
        }
        block.innerHTML = html;
        container.appendChild(block);
    });
}

window.updateCart = function(id, direction, name, price, step) {
    if (!cart[id]) cart[id] = { qty: 0, name: name, price: price };
    let change = direction * step;
    cart[id].qty += change;
    if (cart[id].qty < 0) cart[id].qty = 0;
    const label = document.getElementById(`qty-${id}`);
    if (label) label.innerText = cart[id].qty;
    calculateTotals();
};

function calculateTotals() {
    let tQty = 0, tPrice = 0;
    for (let id in cart) {
        tQty += cart[id].qty;
        tPrice += (cart[id].qty * cart[id].price);
    }
    document.getElementById('globalCount').innerText = tQty;
    document.getElementById('globalPrice').innerText = tPrice;
}

window.toggleList = function(btn) {
    const list = btn.previousElementSibling;
    list.classList.toggle('expanded');
    btn.innerText = list.classList.contains('expanded') ? 'Daha Az Göster' : 'Daha Fazla Gör...';
};

document.getElementById('createOrderBtn').addEventListener('click', () => {
    let tPrice = 0;
    let itemsHtml = "<strong>Sipariş Listesi:</strong><br>";
    let whatsappMsg = "*YENİ NFC SİPARİŞİ*%0A%0A";
    let hasItems = false;

    for (let id in cart) {
        if (cart[id].qty > 0) {
            let lineTotal = cart[id].qty * cart[id].price;
            tPrice += lineTotal;
            itemsHtml += `• ${cart[id].name} - ${cart[id].qty} Adet (${lineTotal} TL)<br>`;
            whatsappMsg += `• ${cart[id].name} (${cart[id].qty} Adet)%0A`;
            hasItems = true;
        }
    }

    if (!hasItems) return alert("Lütfen sepetinize ürün ekleyin!");

    // KARGO HESAPLAMA MANTIĞI
    const shipping = tPrice >= FREE_SHIP_THRESHOLD ? 0 : SHIP_PRICE;
    const finalTotal = tPrice + shipping;

    const biz = document.getElementById('businessName').value || "-";
    const adr = document.getElementById('address').value || "Eksik";
    const rec = document.getElementById('recipient').value || "Eksik";
    const phn = document.getElementById('phone').value || "Eksik";

    // EKRAN ÖZETİ
    document.getElementById('summary').innerHTML = `
        ${itemsHtml}
        <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">
        <strong>Ürün Toplamı:</strong> ${tPrice} TL<br>
        <strong>Kargo Ücreti:</strong> ${shipping === 0 ? "<span style='color:green'>Ücretsiz</span>" : shipping + " TL"}<br>
        <span style="font-size:1.1rem"><strong>Genel Toplam: ${finalTotal} TL</strong></span><br><br>
        <strong>Teslimat Bilgileri:</strong><br>
        ${rec} / ${phn}<br>
        ${biz}<br>
        ${adr}
    `;

    // WHATSAPP METNİ
    whatsappMsg += `%0A*Ürün Toplamı:* ${tPrice} TL`;
    whatsappMsg += `%0A*Kargo:* ${shipping === 0 ? "Ücretsiz" : shipping + " TL"}`;
    whatsappMsg += `%0A*GENEL TOPLAM:* ${finalTotal} TL`;
    whatsappMsg += `%0A%0A*Müşteri:* ${rec}%0A*Firma:* ${biz}%0A*Adres:* ${adr}%0A*Tel:* ${phn}`;
    
    document.getElementById('orderOutput').value = whatsappMsg;
    document.getElementById('summarySection').style.display = 'block';
    
    // Sayfayı özet kısmına kaydır
    document.getElementById('summarySection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('sendWhatsappBtn').addEventListener('click', () => {
    const msg = document.getElementById('orderOutput').value;
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
});

document.addEventListener('DOMContentLoaded', renderUI);
