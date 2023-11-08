
const sliderContainer = document.querySelector('.slider-container');
const textSlide = document.querySelector('.text-slide');
const imageSlide = document.querySelector('.image-slide');
const buttonPrevious = document.querySelector('.button-previous');
const buttonNext = document.querySelector('.button-next');
const slidesLength = imageSlide.querySelectorAll('div').length;

let activeSlideIndex = 0;

// Determine the aspect ratio
let aspectRatio = sliderContainer.clientWidth / sliderContainer.clientHeight;

// Event listeners

// Event listener for resizing the window
window.addEventListener('resize', () => {
    aspectRatio = sliderContainer.clientWidth / sliderContainer.clientHeight;
    renderSlides();
});

// Event listeners for buttons
buttonPrevious.addEventListener('click', () => changeSlide('previous'));
buttonNext.addEventListener('click', () => changeSlide('next'));


// Set the position of the slides
const renderSlides = () => {
    if (aspectRatio < 1.25) {
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

// Function to change slide in the chosen direction
const changeSlide = (direction) => {
    if(direction === 'previous') {
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if(direction === 'next') {
        activeSlideIndex--;
        if(activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }
    renderSlides();
}


renderSlides();