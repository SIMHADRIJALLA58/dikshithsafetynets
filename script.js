AOS.init({
        duration: 900,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });




document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".bg-hero-slide");
    const progressItems = document.querySelectorAll(".bg-progress-item");

    const nextBtn = document.querySelector(".bg-next");
    const prevBtn = document.querySelector(".bg-prev");

    let currentSlide = 0;
    let autoSlide;

    const slideDuration = 3000;


    /* =========================
       SHOW SLIDE
    ========================= */

    function showSlide(index) {

        // Remove active from all slides
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        // Remove active from progress bars
        progressItems.forEach(function (item) {
            item.classList.remove("active");
        });


        // Add active to current slide
        slides[index].classList.add("active");

        // Add active to current progress
        if (progressItems[index]) {
            progressItems[index].classList.add("active");
        }

        currentSlide = index;
    }


    /* =========================
       NEXT SLIDE
    ========================= */

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }


    /* =========================
       PREVIOUS SLIDE
    ========================= */

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }


    /* =========================
       START AUTO SLIDER
    ========================= */

    function startAutoSlider() {

        clearInterval(autoSlide);

        autoSlide = setInterval(function () {
            nextSlide();
        }, slideDuration);
    }


    /* =========================
       NEXT BUTTON
    ========================= */

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {

            nextSlide();
            startAutoSlider();

        });

    }


    /* =========================
       PREVIOUS BUTTON
    ========================= */

    if (prevBtn) {

        prevBtn.addEventListener("click", function () {

            previousSlide();
            startAutoSlider();

        });

    }


    /* =========================
       INITIAL SLIDE
    ========================= */

    showSlide(0);

    startAutoSlider();


    /* =========================
       MOBILE SWIPE
    ========================= */

    const hero =
        document.querySelector(".premium-bg-hero");

    let touchStartX = 0;
    let touchEndX = 0;


    if (hero) {

        hero.addEventListener("touchstart", function (e) {

            touchStartX =
                e.changedTouches[0].screenX;

        }, { passive: true });


        hero.addEventListener("touchend", function (e) {

            touchEndX =
                e.changedTouches[0].screenX;

            const swipeDistance =
                touchStartX - touchEndX;


            if (swipeDistance > 50) {

                // Swipe left
                nextSlide();
                startAutoSlider();

            }
            else if (swipeDistance < -50) {

                // Swipe right
                previousSlide();
                startAutoSlider();

            }

        }, { passive: true });

    }

});






document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".pro-gallery");

    if (!gallery) return;

    const cards = [...gallery.querySelectorAll(".pro-gallery-card")];
    const filters = gallery.querySelectorAll(".pro-filter");

    const lightbox = document.getElementById("proLightbox");
    const previewImage = document.getElementById("proLightboxImage");
    const caption = document.getElementById("proLightboxCaption");
    const count = document.getElementById("proLightboxCount");

    const closeButton = gallery.querySelector(".pro-lightbox-close");
    const previousButton = gallery.querySelector(".prev-image");
    const nextButton = gallery.querySelector(".next-image");

    let currentIndex = 0;
    let visibleCards = [];
    let lastFocusedElement = null;

    // GET VISIBLE IMAGES

    function updateGallery() {

        visibleCards = cards.filter(card =>
            !card.classList.contains("hide-card")
        );

    }


    // FILTER GALLERY

    filters.forEach(button => {

        button.addEventListener("click", function () {

            const category = this.dataset.filter;

            filters.forEach(filter =>
                filter.classList.remove("active")
            );

            this.classList.add("active");

            cards.forEach(card => {

                const matches =
                    category === "all" ||
                    card.dataset.category === category;

                card.classList.toggle("hide-card", !matches);

            });

            updateGallery();

            if (window.AOS) {
                AOS.refreshHard();
            }

        });

    });


    // OPEN IMAGE PREVIEW

    function openPreview(index) {

        updateGallery();

        if (!visibleCards.length) return;

        currentIndex =
            (index + visibleCards.length) % visibleCards.length;

        const selectedCard = visibleCards[currentIndex];

        const image = selectedCard.querySelector("img");
        const title = selectedCard.querySelector("h3");

        previewImage.src = image.src;
        previewImage.alt = image.alt;

        caption.textContent = title
            ? title.textContent
            : image.alt;

        count.textContent =
            `${currentIndex + 1} / ${visibleCards.length}`;

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }


    // IMAGE CLICK

    cards.forEach(card => {

        card.addEventListener("click", function () {

            if (card.classList.contains("hide-card")) return;

            updateGallery();

            const index = visibleCards.indexOf(card);

            lastFocusedElement = card;

            openPreview(index);

        });

    });


    // NEXT IMAGE

    function showNext() {

        openPreview(currentIndex + 1);

    }


    // PREVIOUS IMAGE

    function showPrevious() {

        openPreview(currentIndex - 1);

    }

    nextButton.addEventListener("click", showNext);
    previousButton.addEventListener("click", showPrevious);


    // CLOSE PREVIEW

    function closePreview() {

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        previewImage.src = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }

    closeButton.addEventListener("click", closePreview);


    // CLICK OUTSIDE IMAGE

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closePreview();
        }

    });


    // KEYBOARD CONTROLS

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {
            closePreview();
        }

        if (event.key === "ArrowRight") {
            showNext();
        }

        if (event.key === "ArrowLeft") {
            showPrevious();
        }

    });


    // INITIALIZE

    updateGallery();

});




document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".lux-faq-item");

    faqItems.forEach(function (item) {

        const button = item.querySelector(".lux-faq-question");

        button.addEventListener("click", function () {

            const wasOpen = item.classList.contains("active");

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                otherItem.querySelector(".lux-faq-question")
                    .setAttribute("aria-expanded", "false");

            });

            if (!wasOpen) {

                item.classList.add("active");

                button.setAttribute("aria-expanded", "true");

            }

        });

    });

});




document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("lasyaWhatsAppForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        if (!form.reportValidity()) return;

        // Replace with your WhatsApp business number
        // Country code + number, without + or spaces
        const whatsappNumber = "919620704462";

        const name = document.getElementById("lasyaName").value.trim();
        const phone = document.getElementById("lasyaPhone").value.trim();
        const service = document.getElementById("lasyaService").value;
        const message = document.getElementById("lasyaMessage").value.trim();

        const whatsappMessage =
`Hello Lasya Invisible Grills,

I would like to enquire about your services.

Name: ${name}
Phone Number: ${phone}
Service Required: ${service}
Requirement: ${message || "Not specified"}

Please contact me with more details.

Thank you.`;

        const whatsappURL =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });

});










