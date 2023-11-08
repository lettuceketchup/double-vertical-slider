/**
 * This script controls a double slider that switches between text and image slides.
 * It uses buttons with event listeners, and functions to render the slides and change the active slide.
 * The aspect ratio of the slider container determines whether the slides are rendered in portrait or landscape mode.
 * @summary Controls a double vertical slider that switches between text and image slides.
 */

// Constants
const CHANGE_ASPECT_RATIO = 1.25;
const MINIMUM_SCROLL = 30;

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
let orientationPortrait = aspectRatio < CHANGE_ASPECT_RATIO;

// Event listeners

/**
 * Event listener for resizing the window. Updates the aspect ratio and re-renders the slides.
 */
window.addEventListener('resize', () => {
    aspectRatio = sliderContainer.clientWidth / sliderContainer.clientHeight;
    orientationPortrait = aspectRatio < CHANGE_ASPECT_RATIO;
    renderSlides();
});

/**
 * Event listeners for buttons. Changes the active slide based on the button clicked and re-renders the slides.
 */
buttonNext.addEventListener('click', () => changeSlide(true));
buttonPrevious.addEventListener('click', () => changeSlide(false));

/**
 * Event listeners for touch events. Changes the active slide based on the direction of the swipe and re-renders the slides.
 * @param {boolean} orientationPortrait - Whether the slider is in portrait mode. Defaults to false.
 **/
let touchStartX, touchStartY, touchEndX, touchEndY;
sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    const differenceX = touchEndX - touchStartX;
    const differenceY = touchEndY - touchStartY;
    if (Math.abs(differenceX) > 50 || Math.abs(differenceY) > 50) {
        if ((orientationPortrait && differenceX > 0) 
            || ( !orientationPortrait && differenceX < 0)) {
            changeSlide(true);
        } else {
            changeSlide(false);
        }
    }
});

// Event listeners for scroll events. Changes the active slide based on the direction of the scroll and re-renders the slides.
// This logic is still a bit wonky and will likely take a long time to get right. 
// Left for the future me to figure out.
let scrollStart, scrollEnd;
sliderContainer.addEventListener('wheel', (e) => {
    scrollEnd = e.deltaY;
    if (scrollEnd - scrollStart > MINIMUM_SCROLL) {
        changeSlide(true);
    } else if (scrollEnd - scrollStart < -MINIMUM_SCROLL) {
        changeSlide(false);
    }
    scrollStart = scrollEnd;
});

// Event listeners for key events. Changes the active slide based on the key pressed and re-renders the slides.
// The keys are the right arrow, down arrow or Space for next, and the left arrow, up arrow and Shift + Space for previous.
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        changeSlide(true);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)) {
        changeSlide(false);
    }
});

// Functions

/**
 * Renders the slides based on the aspect ratio of the slider container.
 * If the aspect ratio is less than CHANGE_ASPECT_RATIO, it renders the slides in portrait mode.
 * Otherwise, it renders the slides in landscape mode.
 */
const renderSlides = () => {
    if (orientationPortrait) {
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
 * @param {boolean} next - The direction to change the slide. True for previous, false for next. Defaults to true.
 */
const changeSlide = (next = true) => {
    if(next) {
        activeSlideIndex--;
        if(activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    } else {
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    }
    renderSlides();
}

// Initial render
renderSlides();