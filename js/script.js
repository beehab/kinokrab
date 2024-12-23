
// bottom-section__menu ----------------------
$(document).ready(function ($) {
    "use strict";
    const overlay = document.querySelector('.overlay');
    function openModal() {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    }

    function closeModal() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }
    const openNavBar = function (isOverlay, isContact) {
        if ($(".bottom-section__menu").hasClass("active")) {
            $(".bottom-section__menu").removeClass("active");
            let width = $(window).width();
            console.log(width);
            if (width <= 1899 && isContact === undefined) {
                closeModal();
            }
        } else if (isOverlay === undefined) {
            $(".bottom-section__menu").addClass("active");
            let width = $(window).width();
            console.log(width);
            if (width <= 1899) {
                openModal();
            }
        }
    }
    $(".section-top__nav-button").click(function () {
        openNavBar();
    })
    $(".menu__item.item-modal-contacts").click(function () {
        openNavBar(undefined, true);
    })
    $(".btn-close").click(function () {
        openNavBar();
    })
    overlay.addEventListener('click', function () { openNavBar(true) });
});

// Footer -----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.footer');
    const footerOverlay = document.querySelector('.footer-overlay');
    const openButton = document.querySelector('.footer-button-open');
    const closeButton = document.querySelector('.footer__button-close');

    openButton.addEventListener('click', function () {
        footer.style.bottom = '0';
        footerOverlay.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        footer.style.bottom = '-120%';
        footerOverlay.style.display = 'none';
    });

    footerOverlay.addEventListener('click', function () {
        footer.style.bottom = '-120%';
        footerOverlay.style.display = 'none';
    });
});

// .modal-----------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const openButton = document.querySelector('.bottom-section__button');
    const closeButtons = document.querySelectorAll('.form__button, .modal__close');

    function openModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
            overlay.style.opacity = '1';
            modal.style.top = '50%';
        }, 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        overlay.style.opacity = '0';
        modal.style.top = '-100%';
        setTimeout(() => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }, 500);
    }

    openButton.addEventListener('click', openModal);

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    overlay.addEventListener('click', closeModal);
});

// .service-modal-------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.service-modal');
    const overlay = document.querySelector('.overlay');
    const openButton = document.querySelector('.button-home-page');
    const closeButtons = document.querySelectorAll('.form__button, .modal__close');

    if (!modal || !overlay || !openButton || !closeButtons.length) {
        return;
    }

    function openModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
            overlay.style.opacity = '1';
            modal.style.top = '50%';
        }, 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        overlay.style.opacity = '0';
        modal.style.top = '-100%';
        setTimeout(() => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }, 500);
    }

    openButton.addEventListener('click', openModal);

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    overlay.addEventListener('click', closeModal);
});

// FAQ - droprown----------
document.querySelectorAll('.dropdown__question').forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const answer = item.nextElementSibling;

        if (item.classList.contains('active')) {
            // Відкриття з плавним ефектом
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            // Закриття з плавним ефектом
            answer.style.maxHeight = 0;
        }
    });
});

// technique slider------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item-tech');
    const mainSlideContainer = document.querySelector('.box-tech__slides');
    const mainSlideImage = mainSlideContainer?.querySelector('.img-tech');
    const mainSlideName = mainSlideContainer?.querySelector('.name-tech');
    const buttonPrev = document.querySelector('.button-prew');
    const buttonNext = document.querySelector('.button-next');
    let currentIndex = 0;

    if (!items.length || !mainSlideContainer || !mainSlideImage || !mainSlideName || !buttonPrev || !buttonNext) {
        return;
    }

    function updateMainSlide(index) {
        const imgSrc = items[index].querySelector('.img-tech').src;
        const nameText = items[index].querySelector('.name-tech').textContent;

        mainSlideImage.src = imgSrc;
        mainSlideName.textContent = nameText;
    }

    function changeSlide(newIndex) {
        mainSlideContainer.classList.add('fade-out');
        mainSlideContainer.addEventListener('animationend', function () {
            updateMainSlide(newIndex);
            mainSlideContainer.classList.remove('fade-out');
            mainSlideContainer.classList.add('fade-in');
            mainSlideContainer.addEventListener('animationend', function () {
                mainSlideContainer.classList.remove('fade-in');
            }, { once: true });
        }, { once: true });
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % items.length;
        changeSlide(newIndex);
        currentIndex = newIndex;
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        changeSlide(newIndex);
        currentIndex = newIndex;
    }

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            changeSlide(index);
            currentIndex = index;
        });
    });

    buttonPrev.addEventListener('click', prevSlide);
    buttonNext.addEventListener('click', nextSlide);

    updateMainSlide(0);
});



//  modal-review --------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('#modalreview');
    const overlay = document.querySelector('.overlay');
    const openButtons = document.querySelectorAll('.button-add-review, .button-review');
    const closeButtons = document.querySelectorAll('.form__button--color, .modal__close');

    function openModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
            overlay.style.opacity = '1';
            modal.style.top = '50%';
        }, 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        overlay.style.opacity = '0';
        modal.style.top = '-100%';
        setTimeout(() => {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }, 500);
    }

    openButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    overlay.addEventListener('click', closeModal);
});

// Modal Contacts----------------------
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal-contacts');
    const overlay = document.querySelector('.overlay');
    const openButton = document.querySelector('.item-modal-contacts');
    const closeButton = document.querySelector('.modal-contacts__close');
    const submitButton = document.querySelector('.form__button');
    const menu = document.querySelector('.bottom-section__menu');

    function openModal() {
        overlay.classList.add('active');
        modal.classList.add('active');
        if (menu) {
            menu.classList.add('hidden');
        }
    }

    function closeModal() {
        modal.classList.add('closing');
        overlay.classList.remove('active');
        setTimeout(() => {
            modal.classList.remove('active', 'closing');
        }, 300);
    }

    openButton.addEventListener('click', function (event) {
        event.preventDefault();
        openModal();
    });

    closeButton.addEventListener('click', closeModal);
    submitButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
});

//SERVICES PAGE SLIDER-----------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Перший слайдер
    const slider1 = document.querySelector('.slider-services');
    const slides1 = document.querySelectorAll('.items-slide');
    const prevButton1 = document.querySelector('.button-prew');
    const nextButton1 = document.querySelector('.button-next');
    let currentIndex1 = 0;

    // Перевірка, чи всі елементи першого слайдера присутні
    if (slider1 && slides1.length > 0 && prevButton1 && nextButton1) {
        function updateSlider1Position() {
            const offset = -currentIndex1 * 100;
            slides1.forEach(slide => {
                slide.style.transform = `translateX(${offset}%)`;
            });
        }

        nextButton1.addEventListener('click', () => {
            currentIndex1 = (currentIndex1 < slides1.length - 1) ? currentIndex1 + 1 : 0;
            updateSlider1Position();
        });

        prevButton1.addEventListener('click', () => {
            currentIndex1 = (currentIndex1 > 0) ? currentIndex1 - 1 : slides1.length - 1;
            updateSlider1Position();
        });

        updateSlider1Position();
    }

    // Review слайдер
    const slides2 = document.querySelectorAll('.review-slide');
    const sliderWrapper2 = document.querySelector('.review-slider-wrapper');
    const prevButton2 = document.querySelector('.button-prew');
    const nextButton2 = document.querySelector('.button-next');
    let currentIndex2 = 0;

    // Перевірка, чи всі елементи другого слайдера присутні
    if (sliderWrapper2 && slides2.length > 0 && prevButton2 && nextButton2) {
        function updateSlides2() {
            const slideWidth = slides2[0].getBoundingClientRect().width;
            const offset = -currentIndex2 * slideWidth;

            sliderWrapper2.style.transform = `translateX(${offset}px)`;

            slides2.forEach((slide, index) => {
                slide.classList.remove('current-slide', 'next-slide', 'prev-slide');
                if (index === currentIndex2) {
                    slide.classList.add('current-slide');
                } else if (index === (currentIndex2 + 1) % slides2.length) {
                    slide.classList.add('next-slide');
                } else if (index === (currentIndex2 - 1 + slides2.length) % slides2.length) {
                    slide.classList.add('prev-slide');
                }
            });
        }

        prevButton2.addEventListener('click', () => {
            currentIndex2 = (currentIndex2 === 0) ? slides2.length - 1 : currentIndex2 - 1;
            updateSlides2();
        });

        nextButton2.addEventListener('click', () => {
            currentIndex2 = (currentIndex2 === slides2.length - 1) ? 0 : currentIndex2 + 1;
            updateSlides2();
        });

        updateSlides2();
    }
});


// About Us ---------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Отримуємо елементи кнопок навігації
    const prevBtn = document.querySelector('.prew-btn-about');
    const nextBtn = document.querySelector('.next-btn-about');

    // Отримуємо всі слайди з фото та інформацією
    const photoSlides = document.querySelectorAll('.slide-photo-wrap .wrap-photo');
    const infoSlides = document.querySelectorAll('.wrap-card-slide .about-us-slide');

   // Перевірка наявності елементів на сторінці
   if (!prevBtn || !nextBtn || photoSlides.length === 0 || infoSlides.length === 0) {
    return;
}

    // Встановлюємо початковий індекс активного слайду
    let currentIndex = 0;

    // Функція для оновлення видимості слайдів
    function updateSlides(index) {
        // Переконуємося, що індекс в межах допустимого діапазону
        if (index < 0 || index >= photoSlides.length) {
            console.error('Індекс слайду виходить за межі');
            return;
        }

        // Оновлення стилів для фото слайдів
        photoSlides.forEach((slide, i) => {
            if (i === index) {
                slide.style.position = 'relative';
                slide.style.top = '0';
                slide.style.opacity = 1;
                slide.style.zIndex = 2;
            }
            else {
                slide.style.position = 'absolute';
                slide.style.top = '60%';
                slide.style.opacity = 0;
                slide.style.zIndex = 1;
            }

        });

        // Оновлення стилів для інформаційних слайдів
        infoSlides.forEach((slide, i) => {
            if (i === index) {
                slide.style.position = 'relative';
                slide.style.left = '0';
                slide.style.opacity = 1;
                slide.style.zIndex = 2;
            } else {
                slide.style.position = 'absolute';
                slide.style.left = '70%';
                slide.style.opacity = 0;
                slide.style.zIndex = 1;
            }
        });
    }

    // Оновлюємо слайди на початку
    updateSlides(currentIndex);

    // Додаємо обробники подій для кнопок
    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex === 0) ? photoSlides.length - 1 : currentIndex - 1;
        updateSlides(currentIndex);
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex === photoSlides.length - 1) ? 0 : currentIndex + 1;
        updateSlides(currentIndex);
    });
});

// Page Photo Category ------------------------------------
// Ваша існуюча функція loadImages
function loadImages(category) {
    const folderPath = `portfolio/photo/photo-${category}/`;
    let grids = document.querySelectorAll('.lists-card');

    // Перевіряємо, чи сітки існують на сторінці
    if (!grids || grids.length === 0) return;

    // Очищаємо кожну сітку перед завантаженням
    grids.forEach(grid => {
        grid.innerHTML = ''; // Очищаємо контент сіток
    });

    let imageIndex = 1;
    let gridIndex = 0;
    const loadedImages = []; // Масив для збереження завантажених зображень

    // Функція для перевірки існування зображення
    function checkImageExistence(imgSrc, callback) {
        const img = new Image();
        img.onload = function () {
            callback(true);  // Зображення існує
        };
        img.onerror = function () {
            callback(false); // Зображення не існує
        };
        img.src = imgSrc;
    }

    // Рекурсивно перевіряємо зображення
    function loadNextImage() {
        const imgSrc = `${folderPath}${imageIndex}.webp`;

        checkImageExistence(imgSrc, function (exists) {
            if (exists) {
                // Зберігаємо зображення у масив
                loadedImages.push(imgSrc);

                // Змінюємо індекс фото та сітки
                imageIndex++;
                gridIndex = (gridIndex + 1) % grids.length;  // Переходимо до наступної сітки циклічно

                // Завантажуємо наступне зображення
                loadNextImage();
            } else {
                // Якщо більше немає зображень, відображаємо завантажені в зворотному порядку
                displayImagesInReverseOrder();
            }
        });
    }

    // Функція для відображення зображень у зворотному порядку
    function displayImagesInReverseOrder() {
        for (let i = loadedImages.length - 1; i >= 0; i--) {
            const imgElement = document.createElement('img');
            imgElement.classList.add('item__img-card');
            imgElement.src = loadedImages[i];
            imgElement.alt = `Категорія ${category} фото ${loadedImages.length - i}`;

            // Додаємо обробник події для відкриття модального вікна
            imgElement.addEventListener('click', () => {
                openModal(i);
            });

            // Створюємо обгортку для фото
            const listItem = document.createElement('li');
            listItem.classList.add('item__card', 'item');
            listItem.appendChild(imgElement);

            // Додаємо фото в поточну сітку
            grids[gridIndex].appendChild(listItem);
            gridIndex = (gridIndex + 1) % grids.length;
        }
    }

    // Функція для відкриття модального вікна
    let currentImageIndex = 0;

    function openModal(index) {
        const photoModal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');

        // Перевіряємо, чи модальні елементи існують
        if (!photoModal || !modalImage) return;

        modalImage.src = loadedImages[index];
        currentImageIndex = index;
        photoModal.style.display = 'block';

        // Додаємо обробники подій для свайпа
        setupSwipeHandlers();
    }

    // Функції для навігації у модальному вікні
    const fullModalNext = document.getElementById('fullModalNext');
    const fullModalPrew = document.getElementById('fullModalPrew');

    if (fullModalNext && fullModalPrew) {
        fullModalNext.onclick = function () {
            currentImageIndex = (currentImageIndex - 1 + loadedImages.length) % loadedImages.length;
            document.getElementById('modalImage').src = loadedImages[currentImageIndex];
        };

        fullModalPrew.onclick = function () {
            currentImageIndex = (currentImageIndex + 1) % loadedImages.length;
            document.getElementById('modalImage').src = loadedImages[currentImageIndex];
        };
    }

    // Додаємо обробники подій для свайпа
    let startX, endX;

    function setupSwipeHandlers() {
        const photoModal = document.getElementById('photoModal');

        if (!photoModal) return;

        photoModal.addEventListener('touchstart', function (event) {
            startX = event.touches[0].clientX;
        });

        photoModal.addEventListener('touchmove', function (event) {
            endX = event.touches[0].clientX;
        });

        photoModal.addEventListener('touchend', function () {
            if (startX > endX + 50) {
                fullModalNext && fullModalNext.click();
            } else if (startX + 50 < endX) {
                fullModalPrew && fullModalPrew.click();
            }
        });
    }

    // Функція для закриття модального вікна
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    function closeModal() {
        const photoModal = document.getElementById('photoModal');
        if (photoModal) photoModal.style.display = 'none';
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Починаємо завантаження зображень
    loadNextImage();
}


// Функція для зміни сітки в залежності від розміру екрану
function adjustGridsForScreenSize() {
    const screenWidth = window.innerWidth;
    const allGrids = document.querySelectorAll('.lists-card');

    if (screenWidth < 1024 && allGrids.length === 3) {
        // Видаляємо третю сітку
        const thirdGrid = allGrids[2];
        thirdGrid.remove();

        // Перезавантажуємо фото з перерозподілом на дві сітки
        loadImages(currentCategory);
    } else if (screenWidth >= 1024 && allGrids.length < 3) {
        // Якщо екран ширший за 1024 і сіток менше 3, додаємо третю сітку і перезавантажуємо
        const wrapGrids = document.querySelector('.wrap-grids');
        const newGrid = document.createElement('ul');
        newGrid.classList.add('lists-card');
        wrapGrids.appendChild(newGrid);

        // Перезавантажуємо фото на три сітки
        loadImages(currentCategory);
    }
    if (screenWidth < 768 && allGrids.length === 2) {
        // Видаляємо третю сітку
        const thirdGrid = allGrids[1];
        thirdGrid.remove();

        // Перезавантажуємо фото з перерозподілом на дві сітки
        loadImages(currentCategory);
    } else if (screenWidth >= 768 && allGrids.length < 2) {
        // Якщо екран ширший за 768 і сіток менше 2, додаємо другу сітку і перезавантажуємо
        const wrapGrids = document.querySelector('.wrap-grids');
        const newGrid = document.createElement('ul');
        newGrid.classList.add('lists-card');
        wrapGrids.appendChild(newGrid);

        // Перезавантажуємо фото на дві сітки
        loadImages(currentCategory);
    }
}

// Отримуємо параметр категорії з URL
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get('category') || 'star'; // За замовчуванням 'star'

// Виклик функції для завантаження зображень при першому завантаженні сторінки
loadImages(currentCategory);

// Обробник події для зміни розміру вікна
window.addEventListener('resize', adjustGridsForScreenSize);

//  portfolio-video -----------------------------------------------
const videosByCategory = {
    'video-star': [
        'https://www.youtube.com/embed/GCKOoFiWHi4',
        'https://www.youtube.com/embed/eurU16W2quc',
        'https://www.youtube.com/embed/I84lyBkGr1w'
    ],
    'video-concerts': [
        'https://www.youtube.com/embed/I84lyBkGr1w',
        'https://www.youtube.com/embed/eurU16W2quc'
    ],
    'video-family': [
        'https://www.youtube.com/embed/GCKOoFiWHi4'
    ],
    'video-wedding': [
        'https://www.youtube.com/embed/mQT3jMUNbbk',
        'https://www.youtube.com/embed/Z4fyzmA96p0',
        'https://www.youtube.com/embed/jLyHTmR1sKg'
    ],
    'video-sessions': [
        'https://www.youtube.com/embed/GCKOoFiWHi4'
    ],
    'video-sport': [
        'https://www.youtube.com/embed/I84lyBkGr1w',
        'https://www.youtube.com/embed/eurU16W2quc'
    ],
    'video-activities': [
        'https://www.youtube.com/embed/GCKOoFiWHi4'
    ],
    'video-business': [
        'https://www.youtube.com/embed/GCKOoFiWHi4',
        'https://www.youtube.com/embed/a-8roivl1Rs',
        'https://www.youtube.com/embed/AhO-wsyjhlA',
        'https://www.youtube.com/embed/dKEAphAeyFk',
        'https://www.youtube.com/embed/8meE8TRoPL0'
    ]
};

// Функція для отримання параметра "category" з URL
function getCategoryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

// Функція для завантаження відео для відповідної категорії
function loadVideosForCategory(category) {
    const videoList = document.getElementById('video-list');
    
    // Перевірка, чи є елемент на сторінці
    if (!videoList) {
        return; // Якщо елемент не знайдений, функція не виконується
    }

    const videos = videosByCategory[category];

    if (videos) {
        // Очищаємо список перед завантаженням нових відео
        videoList.innerHTML = '';

        // Генеруємо відео елементи
        videos.forEach(videoUrl => {
            const listItem = document.createElement('li');
            listItem.classList.add('item-card--video');
            
            const iframe = document.createElement('iframe');
            iframe.src = videoUrl;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', true);

            listItem.appendChild(iframe);
            videoList.appendChild(listItem);
        });
    } else {
        // Якщо категорія не знайдена
        videoList.innerHTML = '<p>Відео для цієї категорії відсутні.</p>';
    }
}


// Отримуємо категорію з URL і завантажуємо відповідні відео
const category = getCategoryFromUrl();
loadVideosForCategory(category);




