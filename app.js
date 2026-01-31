const WHATSAPP_NUMBER = "908503463240";
const FREE_SHIP_THRESHOLD = 1500;
const SHIP_PRICE = 120;

// TÜM KATEGORİLER VE ÜRÜNLER (Eksiksiz Liste)
const CATEGORIES = [
  {
    name: "Başlangıç Setleri ve Standlar",
    products: [
      { id: "599", name: "Acil Durum ve Sosyal Medya Başlangıç Seti", price: 1800, image: "assets/000.png", step: 1 },
      { id: "598", name: "Anahtarlık Teşhir Standı -Boş-", price: 200, image: "assets/598.png", step: 1 }
    ]
  },
  {
    name: "SOS ve Acil Durum Anahtarlıkları",
    products: [
      { id: "510", name: "NFC 0 Pozitif Kan Grubu", price: 45, image: "assets/510.png", step: 5 },
      { id: "521", name: "NFC Çocuk Acil Yardım Mavi - Beyaz", price: 45, image: "assets/521.png", step: 5 },
      { id: "522", name: "NFC Çocuk Acil Yardım Pembe - Beyaz", price: 45, image: "assets/522.png", step: 5 },
      { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 45, image: "assets/511.png", step: 5 },
      { id: "512", name: "NFC A Pozitif Kan Grubu", price: 45, image: "assets/512.png", step: 5 },
      { id: "513", name: "NFC A Negatif Kan Grubu", price: 45, image: "assets/513.png", step: 5 },
      { id: "514", name: "NFC B Pozitif Kan Grubu", price: 45, image: "assets/514.png", step: 5 },
      { id: "515", name: "NFC B Negatif Kan Grubu", price: 45, image: "assets/515.png", step: 5 },
      { id: "516", name: "NFC AB Pozitif Kan Grubu", price: 45, image: "assets/516.png", step: 5 },
      { id: "517", name: "NFC AB Negatif Kan Grubu", price: 45, image: "assets/517.png", step: 5 }
    ]
  },
  {
    name: "Sosyal Medya Takip Anahtarlıkları",
    products: [
      { id: "501", name: "NFC Instagram Takip Pembe", price: 45, image: "assets/501.png", step: 5 },
      { id: "502", name: "NFC WhatsApp Yeşil", price: 45, image: "assets/502.png", step: 5 },
      { id: "503", name: "NFC TikTok Takip", price: 45, image: "assets/503.png", step: 5 },
      { id: "504", name: "NFC Facebook Takip", price: 45, image: "assets/504.png", step: 5 }
    ]
  },
  {
    name: "İşletmelere Özel NFC Anahtarlıklar",
    products: [
      { id: "505", name: "Logolu Yuvarlak NFC Anahtarlık", price: 55, image: "assets/505.png", step: 5 }
    ]
  },
  {
    name: "Çocuk ve Kırtasiye Anahtarlıkları",
    products: [
      { id: "518", name: "NFC Pickachu Karakter", price: 45, image: "assets/518.png", step: 5 },
      { id: "519", name: "NFC Labubu Karakter", price: 45, image: "assets/519.png", step: 5 },
      { id: "520", name: "NFC Minecraft Karakter", price: 45, image: "assets/520.png", step: 5 },
      { id: "521", name: "NFC Çanta Mavi Beyaz", price: 45, image: "assets/521.png", step: 5 },
      { id: "522", name: "NFC Çanta Pembe Beyaz", price: 45, image: "assets/522.png", step: 5 },
      { id: "523", name: "NFC Çanta Beyaz Mavi", price: 45, image: "assets/523.png", step: 5 },
      { id: "524", name: "NFC Çanta Beyaz Pembe", price: 45, image: "assets/524.png", step: 5 },
      { id: "525", name: "NFC Çanta Siyah Pembe", price: 45, image: "assets/525.png", step: 5 },
      { id: "526", name: "NFC Çanta Siyah Yeşil", price: 45, image: "assets/526.png", step: 5 },
      { id: "527", name: "NFC Spider-man Karakter", price: 45, image: "assets/527.png", step: 5 }
    ]
  }, // <--- Buradaki virgül ve parantez hatası düzeltildi
  {
    name: "Veteriner ve PetShop Anahtarlıkları",
    products: [
      { id: "531", name: "NFC Pati Beyaz Pembe", price: 45, image: "assets/531.png", step: 5 },
      { id: "529", name: "NFC Pati Kahverengi", price: 45, image: "assets/529.png", step: 5 },
      { id: "530", name: "NFC Pati Ten Rengi", price: 45, image: "assets/530.png", step: 5 },    
      { id: "532", name: "NFC Pati Siyah Pembe", price: 45, image: "assets/532.png", step: 5 }
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
                <div class="product-item" id="product-${prod.id}">
                    <img src="${prod.image}" class="product-img">
                    <div class="product-id">ID: ${prod.id}</div>
                    <div class="product-name">${prod.name}</div>
                    <div class="product-price">${prod.price} TL / Adet</div>
                    <div class="product-controls">
                        <button onclick="updateCart('${prod.id}', -1, '${prod.name}', ${prod.price}, ${prod.step})">-</button>
                        <span class="product-qty" id="qty-${prod.id}">0</span>
                        <button onclick="updateCart('${prod.id}', 1, '${prod.name}', ${prod.price}, ${prod.step})">+</button>
                    </div>
                </div>`;
        });
        
        html += `</div>`;
        if(cat.products.length > 2) {
            html += `<button class="show-more-btn" onclick="toggleList(this)">Tümünü Göster (${cat.products.length})</button>`;
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

    document.getElementById(`qty-${id}`).innerText = cart[id].qty;
    const card = document.getElementById(`product-${id}`);
    
    if (cart[id].qty > 0) card.classList.add('selected');
    else card.classList.remove('selected');

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

    // Ücretsiz Kargo Bilgisi Güncelleme
    const alertBox = document.getElementById('shippingAlert');
    if (tPrice === 0) {
        alertBox.innerText = "1500 TL üzeri kargo BEDAVA!";
    } else if (tPrice < FREE_SHIP_THRESHOLD) {
        let remaining = FREE_SHIP_THRESHOLD - tPrice;
        alertBox.innerHTML = `Ücretsiz kargo için <strong style="color:white">${remaining} TL</strong> daha ürün ekleyin!`;
    } else {
        alertBox.innerHTML = `<strong style="color:#22c55e">Kargonuz Ücretsiz!</strong>`;
    }
}

window.toggleList = function(btn) {
    const list = btn.previousElementSibling;
    list.classList.toggle('expanded');
    btn.innerText = list.classList.contains('expanded') ? 'Daha Az Göster' : 'Tümünü Göster';
};

document.getElementById('createOrderBtn').addEventListener('click', () => {
    let tPrice = 0, itemsHtml = "<strong>Sipariş Listesi:</strong><br>", whatsappMsg = "*YENİ SİPARİŞ*%0A%0A";
    let hasItems = false;

    for (let id in cart) {
        if (cart[id].qty > 0) {
            let lineTotal = cart[id].qty * cart[id].price;
            tPrice += lineTotal;
            itemsHtml += `• [ID:${id}] ${cart[id].name} - ${cart[id].qty} Adet<br>`;
            whatsappMsg += `• [ID:${id}] ${cart[id].name} (${cart[id].qty} Adet)%0A`;
            hasItems = true;
        }
    }
    if (!hasItems) return alert("Sepetiniz boş!");

    const shipping = tPrice >= FREE_SHIP_THRESHOLD ? 0 : SHIP_PRICE;
    const finalTotal = tPrice + shipping;

    document.getElementById('summary').innerHTML = `
        ${itemsHtml}
        <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">
        Ürün Toplamı: ${tPrice} TL<br>
        Kargo: ${shipping === 0 ? "Bedava" : shipping + " TL"}<br>
        <strong>Toplam: ${finalTotal} TL</strong>
    `;
    
    whatsappMsg += `%0A*Kargo:* ${shipping === 0 ? "Bedava" : shipping + " TL"}%0A*Toplam:* ${finalTotal} TL%0A%0A*Müşteri:* ${document.getElementById('recipient').value}%0A*Adres:* ${document.getElementById('address').value}`;
    document.getElementById('orderOutput').value = whatsappMsg;
    document.getElementById('summarySection').style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

document.getElementById('sendWhatsappBtn').addEventListener('click', () => {
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${document.getElementById('orderOutput').value}`;
});

document.addEventListener('DOMContentLoaded', renderUI);













