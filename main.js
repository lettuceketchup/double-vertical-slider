/**
 * This script controls a double slider that switches between text and image slides.
 * It uses buttons with event listeners, and functions to render the slides and change the active slide.
 * The aspect ratio of the slider container determines whether the slides are rendered in portrait or landscape mode.
 * @summary Controls a double vertical slider that switches between text and image slides.
 */

// Constants
const CHANGE_ASPECT_RATIO = 1.25;
const PREVIOUS = 'previous';
const NEXT = 'next';

// Selectors
const sliderContainer = document.querySelector('.slider-container');
const textSlide = document.querySelector('.text-slide');
const imageSlide = document.querySelector('.image-slide');
const buttonPrevious = document.querySelector('.button-previous');
const buttonNext = document.querySelector('.button-next');
const slidesLength = imageSlide.querySelectorAll('div').length;

// Variables
let activeSlideIndex = 0;
let aspectRatio = sliderContainer.clientWidth / sliderContainer.clientHeight;

// Event listeners

/**
 * Event listener for resizing the window. Updates the aspect ratio and re-renders the slides.
 */
window.addEventListener('resize', () => {
    aspectRatio = sliderContainer.clientWidth / sliderContainer.clientHeight;
    renderSlides();
});

/**
 * Event listeners for buttons. Changes the active slide based on the button clicked and re-renders the slides.
 */
buttonPrevious.addEventListener('click', () => changeSlide(PREVIOUS));
buttonNext.addEventListener('click', () => changeSlide(NEXT));


// Functions

/**
 * Renders the slides based on the aspect ratio of the slider container.
 * If the aspect ratio is less than CHANGE_ASPECT_RATIO, it renders the slides in portrait mode.
 * Otherwise, it renders the slides in landscape mode.
 */
const renderSlides = () => {
    if (aspectRatio < CHANGE_ASPECT_RATIO) {
        // Portrait mode
        const sliderWidth = sliderContainer.clientWidth;
        imageSlide.style.transform = `translateX(-${activeSlideIndex * sliderWidth}px)`;
        textSlide.style.transform = `translateX(-${(slidesLength - activeSlideIndex - 1) * sliderWidth}px)`;
    } else {
        // Landscape mode
        const sliderHeight = sliderContainer.clientHeight;
        imageSlide.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
        textSlide.style.transform = `translateY(-${(slidesLength - activeSlideIndex - 1) * sliderHeight}px)`;
    }
}

/**
 * Changes the active slide based on the given direction and re-renders the slides.
 * @param {string} direction - The direction to change the slide. Can be 'previous' or 'next'.
 */
const changeSlide = (direction) => {
    if(direction === PREVIOUS) {
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if(direction === NEXT) {
        activeSlideIndex--;
        if(activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }
    renderSlides();
}

// Initial render
renderSlides();