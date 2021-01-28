import { cuisinesData } from './inputListsData.js';
import { dictionary } from './dictionary.js';

class CuisinesCarousel {
    constructor() {
        this.currentLanguage = localStorage.getItem('current-lang') || 'en';
    }
        
    moveCarousel(e) {
        const carouselWrap = document.querySelector('.carousel_wrapper-cuisines');
        const carouselCard = document.querySelector('.cuisine_card_wrapper');
        const carouselCardWidth = carouselCard.offsetWidth;
        const carouselMainContainer = document.querySelector('.carousel-cuisines');
        const carouselNavNext = document.querySelector('.carousel_nav-next-cuisines');
        const carouselNavPrev = document.querySelector('.carousel_nav-prev-cuisines');
        let carouselCurrentMarginLeft = parseInt(carouselWrap.style.marginLeft) || 0;
        const carouselHiddenWidth = carouselWrap.offsetWidth - carouselMainContainer.clientWidth;
        console.log(carouselHiddenWidth, carouselCurrentMarginLeft);
        let currentHiddenWidth = carouselHiddenWidth + parseInt(carouselCurrentMarginLeft);


        if(e.target.className.includes('carousel_nav-prev-cuisines')) {

            if(carouselMainContainer.clientWidth < Math.abs(carouselCurrentMarginLeft)) {
                carouselCurrentMarginLeft = parseInt(carouselCurrentMarginLeft) + carouselMainContainer.clientWidth;
                carouselWrap.style.marginLeft = (carouselCurrentMarginLeft) + 'px';
                
                console.log(carouselCurrentMarginLeft, carouselHiddenWidth, currentHiddenWidth);
            } else {
                carouselCurrentMarginLeft = 0;
                carouselWrap.style.marginLeft = '0px';

                console.log(carouselCurrentMarginLeft, carouselHiddenWidth, currentHiddenWidth);
            }
           
        }
        console.log(currentHiddenWidth, 'currentHiddenWidth');
        console.log(carouselCurrentMarginLeft, 'carouselCurrentMarginLeft');

        if(e.target.className.includes('carousel_nav-next-cuisines')) {
            console.log(carouselCurrentMarginLeft, carouselHiddenWidth, currentHiddenWidth);

            if(carouselMainContainer.clientWidth < currentHiddenWidth) {
                carouselCurrentMarginLeft = parseInt(carouselCurrentMarginLeft) - carouselMainContainer.clientWidth;
                carouselWrap.style.marginLeft = (carouselCurrentMarginLeft) + 'px';
                
                console.log(carouselCurrentMarginLeft, carouselHiddenWidth, currentHiddenWidth);
            } else {
                // carouselCurrentMarginLeft +=  (parseInt(carouselCurrentMarginLeft) - currentHiddenWidth);
                carouselCurrentMarginLeft = carouselWrap.offsetWidth - carouselMainContainer.clientWidth;
                carouselWrap.style.marginLeft = '-' + (carouselCurrentMarginLeft) + 'px';

                console.log(carouselCurrentMarginLeft, carouselHiddenWidth, currentHiddenWidth);
            }

        }

        if(Math.abs(carouselCurrentMarginLeft) === carouselWrap.offsetWidth - carouselMainContainer.clientWidth) {
            carouselNavNext.classList.add('disabled');
        } else {
            carouselNavNext.classList.remove('disabled');
        }

        if(carouselCurrentMarginLeft === 0) {
            carouselNavPrev.classList.add('disabled');
        } else {
            carouselNavPrev.classList.remove('disabled');
        }
    }

    renderCarousel() {

        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel_container');

        const carouselTitle = document.createElement('h3');
        carouselTitle.classList.add('carousel_title');
        carouselTitle.dataset.key = 'cuisine-carousel-title';
        carouselTitle.textContent = dictionary[this.currentLanguage]['cuisine-carousel-title'];
        carouselContainer.appendChild(carouselTitle);


        const carousel = document.createElement('div');
        carousel.classList.add('carousel', 'carousel-cuisines');

        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('carousel_wrapper', 'carousel_wrapper-cuisines' );

        const navArrows = document.createElement('div');
        navArrows.classList.add('carousel_nav', 'carousel_cuisines');

        const navArrowNext = document.createElement('div');
        navArrowNext.classList.add('carousel_nav-next', 'carousel_nav-next-cuisines');

        const navArrowPrev = document.createElement('div');
        navArrowPrev.classList.add('carousel_nav-prev', 'disabled', 'carousel_nav-prev-cuisines');

        navArrows.appendChild(navArrowPrev);
        navArrows.appendChild(navArrowNext);

        carousel.appendChild(navArrows);

        carouselContainer.appendChild(carousel);
        carousel.appendChild(carouselWrapper);

        let cuisineCardWrapper;
        const cuisineCardWidth = 200;
        const cuisineCardHeight = 200;

        cuisinesData.forEach(item => {
            cuisineCardWrapper = document.createElement('div');
            cuisineCardWrapper.classList.add('cuisine_card_wrapper', `cuisine_card_${item.imgSrc}`);

            cuisineCardWrapper.style.width = cuisineCardWidth + 'px';
            cuisineCardWrapper.style.height = cuisineCardHeight + 'px';

            cuisineCardWrapper.innerHTML = `
            <div class="cuisine_card_layout">
                <div class="cuisine_card_title">Best ${item.name} Restaurants</div>            
            </div>
            `;

            carouselWrapper.appendChild(cuisineCardWrapper);

            
        });

        navArrows.addEventListener('click', this.moveCarousel);

        carouselWrapper.style.width = ((cuisinesData.length * cuisineCardWidth) + (20 * cuisinesData.length)) + 'px';

        return carouselContainer;
    }

} 

export default CuisinesCarousel;