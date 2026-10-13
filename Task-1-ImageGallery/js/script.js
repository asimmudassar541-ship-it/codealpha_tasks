/* =========================================
   VisionGallery - CodeAlpha Task 1
   Final Gallery JavaScript
========================================= */


/* ---------- Gallery Data ---------- */

const galleryItems = [
    {
        image: "assets/images/image-1.jpg",
        title: "Mountain Escape",
        category: "Nature"
    },
    {
        image: "assets/images/image-2.jpg",
        title: "Urban Lights",
        category: "City"
    },
    {
        image: "assets/images/image-3.jpg",
        title: "New Adventure",
        category: "Travel"
    },
    {
        image: "assets/images/image-4.jpg",
        title: "Modern Structure",
        category: "Architecture"
    },
    {
        image: "assets/images/image-5.jpg",
        title: "Into the Wild",
        category: "Nature"
    },
    {
        image: "assets/images/image-6.jpg",
        title: "Wander More",
        category: "Travel"
    }
];


/* ---------- Elements ---------- */

const galleryElements =
    [...document.querySelectorAll(".gallery-item")];

const filterButtons =
    [...document.querySelectorAll(".filter-btn")];

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const imageCounter =
    document.getElementById("imageCounter");

const closeButton =
    document.getElementById("closeLightbox");

const previousButton =
    document.getElementById("prevBtn");

const nextButton =
    document.getElementById("nextBtn");


/* ---------- State ---------- */

let currentIndex = 0;
let activeFilter = "all";
let visibleIndexes = galleryItems.map((_, index) => index);


/* =========================================
   Get Visible Images
========================================= */

function updateVisibleIndexes() {

    visibleIndexes = galleryItems
        .map((item, index) => {

            if (
                activeFilter === "all" ||
                item.category.toLowerCase() === activeFilter
            ) {
                return index;
            }

            return null;

        })
        .filter(index => index !== null);
}


/* =========================================
   Apply Filter
========================================= */

function applyFilter(category) {

    activeFilter = category;

    updateVisibleIndexes();

    galleryElements.forEach((element, index) => {

        const item = galleryItems[index];

        const shouldShow =
            category === "all" ||
            item.category.toLowerCase() === category;

        if (shouldShow) {

            element.classList.remove("hidden");

            requestAnimationFrame(() => {
                element.classList.add("show");
            });

        } else {

            element.classList.remove("show");
            element.classList.add("hidden");

        }

    });

}


/* =========================================
   Open Lightbox
========================================= */

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   Update Lightbox
========================================= */

function updateLightbox() {

    const item = galleryItems[currentIndex];

    const position =
        visibleIndexes.indexOf(currentIndex) + 1;

    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;

    lightboxTitle.textContent = item.title;

    lightboxCategory.textContent =
        item.category;

    imageCounter.textContent =
        `${position} / ${visibleIndexes.length}`;
}


/* =========================================
   Close Lightbox
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/* =========================================
   Next Image
========================================= */

function showNextImage() {

    if (visibleIndexes.length === 0) return;

    const currentPosition =
        visibleIndexes.indexOf(currentIndex);

    const nextPosition =
        (currentPosition + 1) % visibleIndexes.length;

    currentIndex =
        visibleIndexes[nextPosition];

    updateLightbox();
}


/* =========================================
   Previous Image
========================================= */

function showPreviousImage() {

    if (visibleIndexes.length === 0) return;

    const currentPosition =
        visibleIndexes.indexOf(currentIndex);

    const previousPosition =
        (currentPosition - 1 + visibleIndexes.length)
        % visibleIndexes.length;

    currentIndex =
        visibleIndexes[previousPosition];

    updateLightbox();
}


/* =========================================
   Gallery Click
========================================= */

galleryElements.forEach((element, index) => {

    element.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* =========================================
   Filter Buttons
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category =
            button.dataset.filter;

        applyFilter(category);

    });

});


/* =========================================
   Buttons
========================================= */

closeButton.addEventListener(
    "click",
    closeLightbox
);

nextButton.addEventListener(
    "click",
    showNextImage
);

previousButton.addEventListener(
    "click",
    showPreviousImage
);


/* =========================================
   Background Click
========================================= */

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================================
   Keyboard Controls
========================================= */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    switch (event.key) {

        case "Escape":
            closeLightbox();
            break;

        case "ArrowRight":
            showNextImage();
            break;

        case "ArrowLeft":
            showPreviousImage();
            break;

    }

});


/* =========================================
   Image Loading Error
========================================= */

galleryElements.forEach(element => {

    const image = element.querySelector("img");

    image.addEventListener("error", () => {

        element.classList.add("image-error");

    });

});


/* =========================================
   Initial State
========================================= */

applyFilter("all");