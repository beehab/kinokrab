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
    const openNavBar = function () {
        if ($(".bottom-section__menu").hasClass("active")) {
            $(".bottom-section__menu").removeClass("active");
            let width = $(window).width();
            if (width <= 1899) {
                closeModal();
            }
        } else {
            $(".bottom-section__menu").addClass("active");
            let width = $(window).width();
            if (width <= 1899) {
                openModal();
            }
        }
    }
    $(".section-top__nav-button").click(function () {
        openNavBar();
    })
    $(".btn-close").click(function () {
        openNavBar();
    })
    overlay.addEventListener('click', openNavBar);
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

// Єффект підбору тексту ----------------------
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
// Еффект слайду фото ----------------
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

// modal-contacts -----------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const modalContacts = document.getElementById('modalcontacts');
    const modalContactsLink = document.querySelector('.menu__link[href="modalcontacts"]');
    const modalContactsCloseBtn = modalContacts.querySelector('.modal-contacts__close');
    const overlay = document.querySelector('.overlay');
    const bottomSectionMenu = document.querySelector('.bottom-section__menu');

    // Функція для відкриття модального вікна
    function openModal() {
        modalContacts.classList.add('show');
        overlay.classList.add('show');
        bottomSectionMenu.classList.remove('active'); // Закриття меню навігації
        document.body.style.overflow = 'hidden'; // Вимкнення прокрутки сторінки під модальним вікном
    }

    // Функція для закриття модального вікна
    function closeModal() {
        modalContacts.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Відновлення прокрутки сторінки
    }

    // Обробник події на клік по посиланню для відкриття модального вікна
    modalContactsLink.addEventListener('click', function (event) {
        event.preventDefault(); // Відміна стандартної дії посилання
        openModal();
    });

    // Обробник події на клік по кнопці закриття модального вікна
    modalContactsCloseBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Відміна стандартної дії кнопки
        closeModal();
    });

    // Обробник події на клік на оверлей для закриття модального вікна
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closeModal();
        }
    });

    // Обробник події на клавішу Escape для закриття модального вікна
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
// FAQ - droprown----------
document.querySelectorAll('.dropdown__question').forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const answer = item.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});

// techmique slider------------------------------------------------
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

    // Ініціалізація з першого елементу
    updateMainSlide(0);
});
// modal-review --------------------------------------------
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
// slider -- reviews page--------------------









