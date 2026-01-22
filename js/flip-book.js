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
    const isMobile = window.innerWidth <= 600;

    if (currentSheet === 1) {
        // First page (Top)
        container.style.transform = isMobile ? "translateY(0%)" : "translateX(0%)";
    } else if (currentSheet > totalSheets) {
        // Last page (Bottom)
        container.style.transform = isMobile ? "translateY(100%)" : "translateX(100%)";
    } else {
        // Open Book (Centered)
        container.style.transform = isMobile ? "translateY(50%)" : "translateX(50%)";
    }

    prevBtn.disabled = (currentSheet === 1);
    nextBtn.disabled = (currentSheet > totalSheets);
}

// Ensure the layout recalculates if the screen is resized
window.addEventListener('resize', updateNav);

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
