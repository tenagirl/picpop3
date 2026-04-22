const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('close');

function renderGallery(items) {
    gallery.innerHTML = ''; 

    if (items.length === 0) {
        gallery.innerHTML = '<p style="text-align:center; width:100%;">មិនមានរូបភាព ឬវីដេអូត្រូវបានរកឃើញទេ</p>';
        return;
    }

    items.forEach((item) => {
        const container = document.createElement('div');
        container.className = 'img-item';

        if (item.type === "video") {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            container.addEventListener('mouseenter', () => video.play());
            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
            container.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            // ប្រសិនបើរក File រូបភាពមិនឃើញលើ Server
            img.onerror = () => { container.style.display = 'none'; };
            container.appendChild(img);
        }

        container.addEventListener('click', () => openModal(item));
        gallery.appendChild(container);
    });
}

async function fetchMedia() {
    try {
        // បន្ថែមបន្ទាត់ការពារ Cache ដើម្បីឱ្យវា Update រូបភាពថ្មីៗរហូត
        const response = await fetch('get_media.php?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // បង្ហាញរូបភាពទាំងអស់ (ដក Shuffle ចេញសិនដើម្បីតេស្ត)
        renderGallery(data); 

    } catch (error) {
        console.error("Error:", error);
        gallery.innerHTML = '<p>មានបញ្ហាក្នុងការទាញទិន្នន័យ</p>';
    }
}

function openModal(item) {
    modalContent.innerHTML = '';
    const mediaTag = (item.type === "video") ? document.createElement('video') : document.createElement('img');
    mediaTag.src = item.src;
    if(item.type === "video") mediaTag.controls = true;
    modalContent.appendChild(mediaTag);
    modal.classList.add('active');
}

closeBtn.onclick = () => { modal.classList.remove('active'); modalContent.innerHTML = ''; };
window.onclick = (e) => { if (e.target == modal) { modal.classList.remove('active'); modalContent.innerHTML = ''; } };

fetchMedia();