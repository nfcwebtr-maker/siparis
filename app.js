// 1. VERİLERİNİZ VE AYARLAR
const WHATSAPP_NUMBER = "908503463240";
const FREE_SHIP_THRESHOLD = 1500;
const SHIP_PRICE = 120;

const CATEGORIES = [
  {
    name: "Başlangıç Setleri ve Standlar",
    products: [
      { id: "599", name: "SOS ve Sosyal Medya Başlangıç Seti", price: 1600, image: "assets/505.png" },
      { id: "598", name: "Anahtarlık Teşhir Standı -Boş-", price: 200, image: "assets/598.png" }
    ]
  },
  {
    name: "SOS ve Acil Durum Anahtarlıkları",
    products: [
      { id: "510", name: "NFC 0 Pozitif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "521", name: "SOS Acil Yardım", price: 40, image: "assets/505.png" },
      { id: "522", name: "Medikal Bilgi Anahtarlık", price: 40, image: "assets/505.png" },
      { id: "511", name: "NFC 0 Negatif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "512", name: "NFC A Pozitif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "513", name: "NFC A Negatif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "514", name: "NFC B Pozitif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "515", name: "NFC B Negatif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "516", name: "NFC AB Pozitif Kan Grubu", price: 40, image: "assets/505.png" },
      { id: "517", name: "NFC AB Negatif Kan Grubu", price: 40, image: "assets/505.png" }
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
    name: "Veteriner ve PetShop Anahtarlıkları",
    products: [
      { id: "531", name: "Pet Takip NFC", price: 40, image: "assets/505.png" }
    ]
  }
];

// 2. SEPET DURUMU
let cart = {};

// 3. ARAYÜZÜ OLUŞTURMA (RENDER)
function renderUI() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
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
                        <div class="product-price">${prod.price} TL</div>
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

// 4. SEPET GÜNCELLEME
window.updateCart = function(id, change, name, price) {
    if (!cart[id]) {
        cart[id] = { qty: 0, name: name, price: price };
    }
    
    cart[id].qty += change;
    if (cart[id].qty < 0) cart[id].qty = 0;

    const qtyLabel = document.getElementById(`qty-${id}`);
    if (qtyLabel) qtyLabel.innerText = cart[id].qty;
    
    calculateTotals();
};

function calculateTotals() {
    let totalQty = 0;
    let totalPrice = 0;

    for (let id in cart) {
        totalQty += cart[id].qty;
        totalPrice += (cart[id].qty * cart[id].price);
    }

    const shipText = totalPrice >= FREE_SHIP_THRESHOLD ? "Ücretsiz!" : `${SHIP_PRICE} TL`;
    
    document.getElementById('globalCount').innerText = totalQty;
    document.getElementById('globalPrice').innerText = totalPrice;
}

// 5. AÇ-KAPAT FONKSİYONU
window.toggleList = function(btn) {
    const list = btn.previousElementSibling;
    list.classList.toggle('expanded');
    btn.innerText = list.classList.contains('expanded') ? 'Daha Az Göster' : 'Daha Fazla Gör...';
};

// 6. SİPARİŞ OLUŞTURMA
document.getElementById('createOrderBtn').addEventListener('click', () => {
    let orderText = "*Yeni NFC Siparişi*%0A%0A";
    let hasItems = false;

    for (let id in cart) {
        if (cart[id].qty > 0) {
            orderText += `• ${cart[id].name} (${cart[id].qty} Adet)%0A`;
            hasItems = true;
        }
    }

    if (!hasItems) {
        alert("Lütfen sepetinize ürün ekleyin!");
        return;
    }

    const biz = document.getElementById('businessName').value || "Belirtilmedi";
    const adr = document.getElementById('address').value;
    const rec = document.getElementById('recipient').value;
    const phn = document.getElementById('phone').value;

    orderText += `%0A*Teslimat Bilgileri:*%0Aİşletme: ${biz}%0AAlıcı: ${rec}%0AAdres: ${adr}%0ATel: ${phn}`;

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderText}`;
});

// Başlat
document.addEventListener('DOMContentLoaded', renderUI);
