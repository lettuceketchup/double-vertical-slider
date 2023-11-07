
const sliderContainer = document.querySelector('.slider-container');
const textSlide = document.querySelector('.text-slide');
const imageSlide = document.querySelector('.image-slide');
const buttonPrevious = document.querySelector('.button-previous');
const buttonNext = document.querySelector('.button-next');
const slidesLength = imageSlide.querySelectorAll('div').length;

let activeSlideIndex = 0;

let aspectRatio = sliderContainer.clientWidth / sliderContainer.clientHeight;

if(aspectRatio < 1.25) {
    textSlide.style.left = `-${(slidesLength - 1) * 100}vw`
} else {
    textSlide.style.top = `-${(slidesLength - 1) * 100}vh`
}

buttonPrevious.addEventListener('click', () => changeSlide('previous'));
buttonNext.addEventListener('click', () => changeSlide('next'));

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight;
    const sliderWidth = sliderContainer.clientWidth;
    if(direction === 'previous') {
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if(direction === 'next') {
        activeSlideIndex--;
        if(activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }
    if(aspectRatio < 1.25) {
        imageSlide.style.transform = `translateX(-${activeSlideIndex * sliderWidth}px)`;
        textSlide.style.transform = `translateX(${activeSlideIndex * sliderWidth}px)`;
    } else {
        imageSlide.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
        textSlide.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }
}