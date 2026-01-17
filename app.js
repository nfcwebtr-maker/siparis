// 1. VERİLERİNİZ: Buradaki örnek verileri silip kendi ürün listenizi yapıştırın
document.addEventListener("DOMContentLoaded", function() {

  const STEP = 5;
  const FREE_SHIP_THRESHOLD = 1500; 
  const SHIP_PRICE = 120;           
  const WHATSAPP = "908503463240";

  const CATEGORIES = [
    {
      name: "Başlangıç Setleri ve Standlar", // İsim güncellendi
      products: [
        { id: "599", name: "SOS ve Sosyal Medya Başlangıç Seti", price: 1600, image: "assets/599.png" },
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
      name: "İşletmelere Özel NFC Anahtarlıklar",
      products: [
        { id: "505", name: "Logolu Yuvarlak NFC Anahtarlık", price: 50, image: "assets/505.png" }
      ]
    },
    {
      name: "Veteriner ve PetShop Anahtarlıkları", // İsim güncellendi
      products: [
        { id: "531", name: "Pet Takip NFC", price: 40, image: "assets/531.png" }
      ]
    }
  ];

// 2. SEPET VE DURUM YÖNETİMİ
let cart = {}; 
const WHATSAPP_NUMBER = "908503463240";

// 3. ARAYÜZÜ OLUŞTURMA (RENDER)
function renderUI() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = ""; 

    categories.forEach(cat => {
        const block = document.createElement('div');
        block.className = 'category-block';
        
        // Kategori Başlığı ve Liste Başlangıcı
        let html = `<div class="category-title">${cat.name}</div>`;
        html += `<div class="product-list">`;
        
        cat.products.forEach(prod => {
            html += `
                <div class="product-item">
                    <img src="${prod.img}" class="product-img" alt="${prod.name}">
                    <div class="product-info">
                        <div class="product-name">${prod.name}</div>
                        <div class="product-price">${prod.price} TL</div>
                    </div>
                    <div class="product-controls">
                        <button onclick="updateCart(${prod.id}, -1, '${prod.name}', ${prod.price})">-</button>
                        <span id="qty-${prod.id}">${cart[prod.id]?.qty || 0}</span>
                        <button onclick="updateCart(${prod.id}, 1, '${prod.name}', ${prod.price})">+</button>
                    </div>
                </div>`;
        });
        
        html += `</div>`; // .product-list bitiş
        
        // Eğer 2'den fazla ürün varsa "Daha Fazla Gör" butonu ekle
        if(cat.products.length > 2) {
            html += `<button class="show-more-btn" onclick="toggleList(this)">Daha Fazla Gör...</button>`;
        }

        block.innerHTML = html;
        container.appendChild(block);
    });
}

// 4. SEPET GÜNCELLEME VE HESAPLAMA
window.updateCart = function(id, change, name, price) {
    if (!cart[id]) {
        cart[id] = { qty: 0, name: name, price: price };
    }
    
    cart[id].qty += change;
    if (cart[id].qty < 0) cart[id].qty = 0;

    // Arayüzdeki sayıyı güncelle
    document.getElementById(`qty-${id}`).innerText = cart[id].qty;
    calculateTotals();
};

function calculateTotals() {
    let totalQty = 0;
    let totalPrice = 0;

    for (let id in cart) {
        totalQty += cart[id].qty;
        totalPrice += (cart[id].qty * cart[id].price);
    }

    // Status Bar Güncelleme
    document.getElementById('globalCount').innerText = totalQty;
    document.getElementById('globalPrice').innerText = totalPrice;
}

// 5. AÇ-KAPAT (SHOW MORE) FONKSİYONU
window.toggleList = function(btn) {
    const list = btn.previousElementSibling;
    list.classList.toggle('expanded');
    btn.innerText = list.classList.contains('expanded') ? 'Daha Az Göster' : 'Daha Fazla Gör...';
};

// 6. WHATSAPP SİPARİŞ OLUŞTURMA
document.getElementById('createOrderBtn').addEventListener('click', () => {
    let orderText = "Merhaba, yeni bir siparişim var:%0A%0A";
    let hasItems = false;

    for (let id in cart) {
        if (cart[id].qty > 0) {
            orderText += `- ${cart[id].name} (${cart[id].qty} Adet)%0A`;
            hasItems = true;
        }
    }

    if (!hasItems) {
        alert("Lütfen önce sepetinize ürün ekleyin!");
        return;
    }

    const business = document.getElementById('businessName').value;
    const address = document.getElementById('address').value;
    const recipient = document.getElementById('recipient').value;
    
    orderText += `%0A*Müşteri Bilgileri:*%0AFirma: ${business}%0AAlıcı: ${recipient}%0AAdres: ${address}`;

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderText}`;
});

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', renderUI);
