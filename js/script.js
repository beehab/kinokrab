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

// Єффект підбору тексту Home Page ----------------------
document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".text p");
    const alphabet = " абвгґдеєжзиіїйклмнопрстуфхцчшщьюя"; // українська абетка + пробіл
    const interval = 30; // мілісекунди між кожною зміною букви (збільшили для плавності)
    const delay = 600; // затримка перед початком ефекту у мілісекундах

    const textSequences = [
        ["Професіоналізм", "Позитивні\nвідгуки", "Сучасне\nобладнання"],
        ["Креативність", "Орієнтація\nна клієнта", "Комплексний\nпідхід"],
        ["Досвід", "Постійний\nрозвиток", "Персональні\nконсультації"]
    ];

    function getRandomChar() {
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function animateText(element, textIndex, callback) {
        const targetString = textSequences[textIndex][1]; // Починаємо з другої фрази
        let lines = targetString.split("\n");
        let currentString = lines.map(line => Array(line.length).fill(""));

        let index = 0;

        const intervalId = setInterval(() => {
            currentString = currentString.map((line, lineIndex) => {
                return line.map((char, charIndex) => {
                    if (charIndex < index) {
                        return lines[lineIndex][charIndex];
                    } else {
                        return getRandomChar();
                    }
                });
            });

            element.innerHTML = currentString.map(line => line.join("")).join("<br>");

            if (index >= Math.max(...lines.map(line => line.length))) {
                clearInterval(intervalId);
                setTimeout(() => {
                    textSequences[textIndex].push(textSequences[textIndex].shift());
                    if (callback) callback();
                }, delay);
            } else {
                index++;
            }
        }, interval);
    }

    function startSequentialAnimation(index = 0) {
        if (index >= texts.length) {
            setTimeout(() => startSequentialAnimation(0), delay); // повторюємо анімацію для всіх елементів після завершення
            return;
        }

        // Змінюємо першу фразу одразу на другу
        texts[index].innerHTML = textSequences[index][0].replace('\n', '<br>');
        setTimeout(() => {
            animateText(texts[index], index, () => startSequentialAnimation(index + 1));
        }, delay);
    }

    setTimeout(() => startSequentialAnimation(), delay);
});

// Еффект слайду фото Home Page ----------------
document.addEventListener("DOMContentLoaded", () => {
    const imgContainers = document.querySelectorAll("[class*='anime-box-2__img']");
    const imgPath = "/img/sample/";
    const imgCount = 11; // кількість доступних зображень у папці
    const delay = 5000; // затримка показу фото у мілісекундах
    const transitionDuration = 0.5; // тривалість анімації у секундах

    // Індекси зображень
    let availableIndices = Array.from({ length: imgCount }, (_, i) => i + 1);

    function getRandomUniqueImageIndex(usedIndices) {
        let remainingIndices = availableIndices.filter(index => !usedIndices.includes(index));
        if (remainingIndices.length === 0) {
            remainingIndices = Array.from({ length: imgCount }, (_, i) => i + 1);
        }
        const randomIndex = Math.floor(Math.random() * remainingIndices.length);
        return remainingIndices[randomIndex];
    }

    function createImageElement(src) {
        const img = document.createElement("img");
        img.src = src;
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "contain";
        img.style.position = "absolute";
        img.style.transform = "translateY(100%)"; // Початкове розташування зображення знизу
        img.style.transition = `transform ${transitionDuration}s ease-in-out`;
        return img;
    }

    function changeImages() {
        const usedIndices = [];
        imgContainers.forEach(container => {
            const oldImg = container.querySelector("img");
            const newIndex = getRandomUniqueImageIndex(usedIndices);
            usedIndices.push(newIndex);
            const newSrc = `${imgPath}${newIndex}.png`;
            const newImg = createImageElement(newSrc);

            // Додаємо нове зображення до контейнера
            container.appendChild(newImg);

            // Починаємо анімацію
            setTimeout(() => {
                newImg.style.transform = "translateY(0)";
                oldImg.style.transform = "translateY(-100%)";
            }, 50); // Невелика затримка для плавного показу

            // Видаляємо старе зображення після завершення анімації
            setTimeout(() => {
                container.removeChild(oldImg);
            }, transitionDuration * 1000);
        });

        // Запускаємо наступну зміну зображень через delay
        setTimeout(changeImages, delay + transitionDuration * 1000);
    }

    // Завантаження початкових зображень
    imgContainers.forEach(container => {
        const randomIndex = getRandomUniqueImageIndex([]);
        const src = `${imgPath}${randomIndex}.png`;
        const img = createImageElement(src);
        img.style.transform = "translateY(0)";
        container.appendChild(img);
    });

    // Запуск анімації після початкової затримки
    setTimeout(changeImages, delay);
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
    const mainSlideImage = mainSlideContainer.querySelector('.img-tech');
    const mainSlideName = mainSlideContainer.querySelector('.name-tech');
    const buttonPrev = document.querySelector('.button-prew');
    const buttonNext = document.querySelector('.button-next');
    let currentIndex = 0;

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

    // Другий слайдер
    const slides2 = document.querySelectorAll('.review-slide');
    const sliderWrapper2 = document.querySelector('.review-slider-wrapper');
    const prevButton2 = document.querySelector('.button-prew');
    const nextButton2 = document.querySelector('.button-next');
    let currentIndex2 = 0;

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
});

// About Us ---------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Отримуємо елементи кнопок навігації
    const prevBtn = document.querySelector('.prew-btn-about');
    const nextBtn = document.querySelector('.next-btn-about');

    // Отримуємо всі слайди з фото та інформацією
    const photoSlides = document.querySelectorAll('.slide-photo-wrap .wrap-photo');
    const infoSlides = document.querySelectorAll('.wrap-card-slide .about-us-slide');

    // Перевірка, чи є слайди в DOM
    if (photoSlides.length === 0 || infoSlides.length === 0) {
        console.error('Слайди не знайдені');
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

// Portfolio foto page (slider) -------------------------------
$(document).ready(function () {
    const $carousel = $('.carusel-section');
    const $items = $('.carusel-item');
    const itemCount = $items.length;
    let currentIndex = 0;

    // Функція для оновлення позиції слайдів
    function updateCarousel(index) {
        // Обчислення відступу для активного елементу
        const offset = -index * 100;
        $carousel.css('transform', `translateX(${offset}%)`);
    }

    // Функція для оновлення індексу та забезпечення циклічності
    function updateIndex(newIndex) {
        currentIndex = (newIndex + itemCount) % itemCount;
        updateCarousel(currentIndex);
    }

    // Обробка події кліку на кнопку "Наступний"
    $('.slider-next').on('click', function () {
        updateIndex(currentIndex + 1);
    });

    // Обробка події кліку на кнопку "Попередній"
    $('.slider-prew').on('click', function () {
        updateIndex(currentIndex - 1);
    });

    // Обробка свайпів для перемикання слайдів
    let startX = 0;
    $carousel.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $carousel.on('touchmove', function (e) {
        const moveX = e.originalEvent.touches[0].clientX;
        const diffX = startX - moveX;

        if (diffX > 50) { // свайп вліво
            updateIndex(currentIndex + 1);
        } else if (diffX < -50) { // свайп вправо
            updateIndex(currentIndex - 1);
        }
    });
});
