document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const addLessonBtn = document.getElementById('add-lesson-btn');
    const editLessonBtn = document.getElementById('edit-lesson-btn');
    const deleteLessonBtn = document.getElementById('delete-lesson-btn');
    const lessonGrid = document.querySelector('.lesson-grid');
    const lessonCards = document.querySelectorAll('.lesson-card');
  
    // Hamburger Menü Toggle
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
  
    // Ders Kartları Detay Gösterme
    lessonCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            showLessonDetails(card);
        });
    });
  
    // Ders Ekleme Formu
    addLessonBtn.addEventListener('click', () => {
        openModal('add');
    });
  
    // Ders Düzenleme Formu
    editLessonBtn.addEventListener('click', () => {
        openModal('edit');
    });
  
    // Ders Silme İşlemi
    deleteLessonBtn.addEventListener('click', () => {
        openModal('delete');
    });
  
    // Modal Açma Fonksiyonu
    function openModal(type) {
        const modalHtml = {
            'add': `
                <div class="modal" id="lesson-modal">
                    <div class="modal-content">
                        <h2>🧩 Yeni Ders Ekle</h2>
                        <form id="add-lesson-form">
                            <input type="text" name="code" placeholder="Ders Kodu" required>
                            <input type="text" name="lessonName" placeholder="Ders Adı" required>
                            <input type="text" name="instructor" placeholder="Öğretim Üyesinin Adı" required>
                            <input type="text" name="instructor" placeholder="Öğretim Üyesinin Soyadı" required>
                            <select name="semester" required>
                                <option value="">Dönem Seçin</option>
                                <option value="guz">Güz Dönemi</option>
                                <option value="bahar">Bahar Dönemi</option>
                                <option value="yaz">Yaz Dönemi</option>
                            </select>
                            <textarea name="description" placeholder="Ders Açıklaması" required></textarea>
                            <input type="number" name="credits" placeholder="AKTS Kredisi" required>
                            <button type="submit">Dersi Kaydet</button>
                            <button type="button" class="cancel-btn">İptal</button>
                        </form>
                    </div>
                </div>
            `,
            'edit': `
                <div class="modal" id="lesson-modal">
                    <div class="modal-content">
                        <h2>✏️ Dersi Düzenle</h2>
                        <form id="edit-lesson-form">
                            <select name="lessonSelect" required>
                                <option value="">Düzenlenecek Dersi Seçin</option>
                                <option value="1">Ders 1</option>
                                <option value="2">Ders 2</option>
                                <option value="3">Ders 3</option>
                            </select>
                            <input type="text" name="lessonName" placeholder="Yeni Ders Adı">
                            <input type="text" name="instructor" placeholder="Yeni Öğretim Üyesi">
                            <textarea name="description" placeholder="Ders Açıklaması"></textarea>
                            <button type="submit">Güncelle</button>
                            <button type="button" class="cancel-btn">İptal</button>
                        </form>
                    </div>
                </div>
            `,
            'delete': `
                <div class="modal" id="lesson-modal">
                    <div class="modal-content">
                        <h2>🗑️ Ders Silme</h2>
                        <form id="delete-lesson-form">
                            <select name="lessonSelect" required>
                                <option value="">Silinecek Dersi Seçin</option>
                                <option value="1">Ders 1</option>
                                <option value="2">Ders 2</option>
                                <option value="3">Ders 3</option>
                            </select>
                            <p>Bu dersi silmek istediğinizden emin misiniz?</p>
                            <button type="submit" class="delete-confirm">Dersi Sil</button>
                            <button type="button" class="cancel-btn">İptal</button>
                        </form>
                    </div>
                </div>
            `
        };
  
        // Önceki modalı kaldır
        const existingModal = document.getElementById('lesson-modal');
        if (existingModal) existingModal.remove();
  
        // Yeni modalı ekle
        document.body.insertAdjacentHTML('beforeend', modalHtml[type]);
  
        const modal = document.getElementById('lesson-modal');
        
        // Modal gösterim animasyonu
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
  
        const cancelButtons = modal.querySelectorAll('.cancel-btn');
  
        // Modal kapatma
        cancelButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        });
  
        // Form submit işlemleri (şimdilik konsola yazdırma)
        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            console.log(`${type.toUpperCase()} İşlemi:`, data);
            
            // Burada normalde veritabanı işlemleri yapılacak
            
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    }
  
    // Ders detaylarını gösterme
    function showLessonDetails(card) {
        const details = {
            'Ders 1': {
                description: 'Bilgisayar Mühendisliği Giriş Dersi',
                kredi: '3 AKTS',
                donem: 'Güz Dönemi'
            },
            'Ders 2': {
                description: 'Veri Yapıları ve Algoritmalar',
                kredi: '4 AKTS',
                donem: 'Bahar Dönemi'
            },
            'Ders 3': {
                description: 'Yazılım Mühendisliği Temelleri',
                kredi: '3 AKTS',
                donem: 'Güz Dönemi'
            }
        };
  
        const lessonName = card.querySelector('h4').textContent;
        const detailsContent = details[lessonName];
  
        if (card.classList.contains('active')) {
            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('lesson-details');
            detailsDiv.innerHTML = `
                <p><strong>Açıklama:</strong> ${detailsContent.description}</p>
                <p><strong>Kredi:</strong> ${detailsContent.kredi}</p>
                <p><strong>Dönem:</strong> ${detailsContent.donem}</p>
            `;
            card.appendChild(detailsDiv);
        } else {
            const existingDetails = card.querySelector('.lesson-details');
            if (existingDetails) existingDetails.remove();
        }
    }
  });