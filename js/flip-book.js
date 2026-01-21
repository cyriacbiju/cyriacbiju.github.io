// Configuration - can be overridden by HTML
const config = {
    totalImages: window.flipBookConfig?.totalImages || 22,
    imagePath: window.flipBookConfig?.imagePath || 'portfolio/images/internship'
};

const book = document.getElementById('book');
const container = document.getElementById('container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const totalImages = config.totalImages;
const totalSheets = totalImages / 2;
let currentSheet = 1;

// Generate Pages Automatically
for (let i = 1; i <= totalSheets; i++) {
    const page = document.createElement('div');
    page.className = 'page';
    page.id = `p${i}`;
    page.style.zIndex = totalSheets - i + 1;

    const frontImg = (i * 2) - 1;
    const backImg = i * 2;

    const frontCover = (frontImg === 1) ? 'is-cover' : '';
    const backCover = (backImg === totalImages) ? 'is-cover' : '';

    page.innerHTML = `
        <div class="front ${frontCover}">
            <img src="${config.imagePath}/${frontImg}.jpg" alt="Image ${frontImg}">
        </div>
        <div class="back ${backCover}">
            <img src="${config.imagePath}/${backImg}.jpg" alt="Image ${backImg}">
        </div>
    `;
    book.appendChild(page);
}

function updateNav() {
    // Shift book position to keep it centered when open
    if (currentSheet === 1) {
        container.style.transform = "translateX(0%)";
    } else if (currentSheet > totalSheets) {
        container.style.transform = "translateX(100%)";
    } else {
        container.style.transform = "translateX(50%)";
    }

    prevBtn.disabled = (currentSheet === 1);
    nextBtn.disabled = (currentSheet > totalSheets);
}

function goNext() {
    if (currentSheet <= totalSheets) {
        const page = document.getElementById(`p${currentSheet}`);
        page.classList.add('flipped');
        page.style.zIndex = currentSheet;
        currentSheet++;
        updateNav();
    }
}

function goPrev() {
    if (currentSheet > 1) {
        currentSheet--;
        const page = document.getElementById(`p${currentSheet}`);
        page.classList.remove('flipped');
        page.style.zIndex = totalSheets - currentSheet + 1;
        updateNav();
    }
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
});
