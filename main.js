const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
console.log(slideRight);
const slideLeft = document.querySelector('.left-slide');
const buttonUp = document.querySelector('.button-up');
const buttonDown = document.querySelector('.button-down');
const slidesLength = slideRight.querySelectorAll('div').length;

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

buttonUp.addEventListener('click', () => changeSlide('up'));
buttonDown.addEventListener('click', () => changeSlide('down'));

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight;
    if(direction === 'up') {
        activeSlideIndex++;
        if(activeSlideIndex > slidesLength - 1) activeSlideIndex = 0;
    } else if(direction === 'down') {
        activeSlideIndex--;
        if(activeSlideIndex < 0) activeSlideIndex = slidesLength - 1;
    }

    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
}