const WHATSAPP_NUMBER = "908503463240";
const FREE_SHIP_THRESHOLD = 1500;
const SHIP_PRICE = 120;

const CATEGORIES = [
  {
    name: "Başlangıç Setleri ve Standlar",
    products: [
      { id: "599", name: "SOS ve Sosyal Medya Seti", price: 1600, image: "assets/505.png" },
      { id: "598", name: "Teşhir Standı -Boş-", price: 200, image: "assets/598.png" }
    ]
  },
  {
    name: "SOS ve Acil Durum Anahtarlıkları",
    products: [
      { id: "510", name: "NFC 0 Pozitif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "521", name: "SOS Acil Yardım", price: 40, image: "assets/505.png" },
      { id: "522", name: "Medikal Bilgi Anahtarlık", price: 40, image: "assets/505.png" },
      { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 40, image: "assets/505.png" }
    ]
  },
  {
      name: "Sosyal Medya Takip Anahtarlıkları",
      products: [
        { id: "501", name: "NFC Instagram Pembe", price: 40, image: "assets/505.png" },
        { id: "502", name: "NFC Instagram Mavi", price: 40, image: "assets/505.png" },
        { id: "503", name: "NFC TikTok Takip", price: 40, image: "assets/505.png" },
        { id: "504", name: "NFC Google Yorum", price: 40, image: "assets/505.png" }
      ]
    },
    {
      name: "İşletmelere Özel NFC Anahtarlıklar",
      products: [
        { id: "505", name: "Logolu Yuvarlak NFC Anahtarlık", price: 50, image: "assets/505.png" }
      ]
    },
    {
      name: "Veteriner ve PetShop Anahtarlıkları", // İsim güncellendi
      products: [
        { id: "531", name: "Pet Takip NFC", price: 40, image: "assets/505.png" }
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
        let html = `<div style="font-weight:bold; margin-bottom:10px;">${cat.name}</div>`;
        html += `<div class="product-list">`;
        cat.products.forEach(prod => {
            html += `
                <div class="product-item">
                    <img src="${prod.image}" class="product-img">
                    <div class="product-info">
                        <div><strong>${prod.name}</strong></div>
                        <div>${prod.price} TL</div>
                    </div>
                    <div class="product-controls">
                        <button onclick="updateCart('${prod.id}', -1, '${prod.name}', ${prod.price})">-</button>
                        <span id="qty-${prod.id}">${cart[prod.id]?.qty || 0}</span>
                        <button onclick="updateCart('${prod.id}', 1, '${prod.name}', ${prod.price})">+</button>
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

window.updateCart = function(id, change, name, price) {
    if (!cart[id]) cart[id] = { qty: 0, name: name, price: price };
    cart[id].qty += change;
    if (cart[id].qty < 0) cart[id].qty = 0;
    document.getElementById(`qty-${id}`).innerText = cart[id].qty;
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

// SİPARİŞ ÖZETİNİ OLUŞTURMA
document.getElementById('createOrderBtn').addEventListener('click', () => {
    let tPrice = 0;
    let itemsHtml = "<strong>Ürünler:</strong><br>";
    let whatsappMsg = "*YENİ SİPARİŞ*%0A%0A";
    let hasItems = false;

    for (let id in cart) {
        if (cart[id].qty > 0) {
            let linePrice = cart[id].qty * cart[id].price;
            tPrice += linePrice;
            itemsHtml += `• ${cart[id].name} - ${cart[id].qty} Adet (${linePrice} TL)<br>`;
            whatsappMsg += `• ${cart[id].name} (${cart[id].qty} Adet)%0A`;
            hasItems = true;
        }
    }

    if (!hasItems) { return alert("Sepet boş!"); }

    const shipping = tPrice >= FREE_SHIP_THRESHOLD ? 0 : SHIP_PRICE;
    const finalTotal = tPrice + shipping;

    const biz = document.getElementById('businessName').value || "-";
    const adr = document.getElementById('address').value || "Belirtilmedi";
    const rec = document.getElementById('recipient').value || "Belirtilmedi";

    // Ekranda Görünecek HTML Özet
    document.getElementById('summary').innerHTML = `
        ${itemsHtml}
        <hr>
        Ara Toplam: ${tPrice} TL<br>
        Kargo: ${shipping === 0 ? "Ücretsiz" : shipping + " TL"}<br>
        <strong>Genel Toplam: ${finalTotal} TL</strong><br><br>
        <strong>Teslimat:</strong> ${rec} / ${biz}<br>
        <strong>Adres:</strong> ${adr}
    `;

    // WhatsApp'a Gidecek Metin
    whatsappMsg += `%0A*Toplam:* ${finalTotal} TL (Kargo: ${shipping === 0 ? "Bedava" : shipping + " TL"})`;
    whatsappMsg += `%0A%0A*Müşteri:* ${rec}%0A*Firma:* ${biz}%0A*Adres:* ${adr}`;
    
    document.getElementById('orderOutput').value = whatsappMsg.replace(/%0A/g, '\n');
    document.getElementById('summarySection').style.display = 'block';
    
    // Sayfayı özet alanına kaydır
    document.getElementById('summarySection').scrollIntoView({ behavior: 'smooth' });
});

// WHATSAPP'A GÖNDERME
document.getElementById('sendWhatsappBtn').addEventListener('click', () => {
    const msg = document.getElementById('orderOutput').value.replace(/\n/g, '%0A');
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
});

document.addEventListener('DOMContentLoaded', renderUI);
