const container = document.querySelector('.container');
const imageWrapper = document.querySelector('.image-wrapper1');
const dragButton = document.querySelector('.drag-button');
const Build = document.querySelectorAll(".building");
const History = document.querySelectorAll(".history");
const popup = document.querySelector('.popup');
const popupContent = document.getElementById('popupContent');
const popupImage = document.getElementById('popupImage');
const closeButton = document.querySelector('.close-button');
const model = document.getElementById('myModel')

let isDragging = false;
let startX = null;
let startOpacityLeft = 1;
let startOpacityRight = 0;
let startButtonLeft;

let list = ["1111111111", "22222222222", "33333333"];

let images = ["image/flower.gif", "image/river.jpg", "image/sky.jpg"];

dragButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    startButtonLeft = dragButton.offsetLeft;
    if (startX === null) {
        startX = e.clientX;
    }
    console.log('鼠标按下在 dragButton 上');
});

document.addEventListener('mousemove', (e) => {
    const windowWidth = window.innerWidth;
    // 如果正在拖拽
    if (isDragging) {
        const diffx = e.clientX - startX;
        const totalWidth = imageWrapper.offsetWidth;
        const progress = diffx / totalWidth;
        if (diffx >= -50 && diffx <= windowWidth - dragButton.offsetWidth / 2) {
            if (totalWidth) {
                imageWrapper.style.clipPath = `inset(0 0 0 ${progress * 100}%)`;
                startOpacityLeft = 1 - progress;
                startOpacityRight = progress;
            } else {
                imageWrapper.style.clipPath = `inset(0 0 ${Math.abs(progress) * 100}% 0)`;
                startOpacityLeft = progress;
                startOpacityRight = 1 - progress;
            }

            imageWrapper.style.opacity = `linear-gradient(to right, rgba(255, 255, 255, ${startOpacityLeft}) 0%, rgba(255, 255, 255, ${startOpacityRight}) 100%)`;
            dragButton.style.left = `${e.clientX}px`;
        }
        console.log('正在拖拽 dragButton');
    }
});

// History.forEach(button => {
//     button.addEventListener('click', function () {
//         const index = parseInt(this.dataset.index);
//         popupContent.textContent = list[index];
//         popupImage.src = images[index];
//         model.style.display = 'block';
//
//         // 动态调整图片大小
//         const containerWidth = popup.offsetWidth - 20;
//         const containerHeight = popup.offsetHeight - 40;
//         if (popupImage.offsetWidth > containerWidth || popupImage.offsetHeight > containerHeight) {
//             if (popupImage.offsetWidth > popupImage.offsetHeight) {
//                 popupImage.style.width = containerWidth + 'px';
//                 popupImage.style.height = 'auto';
//             } else {
//                 popupImage.style.height = containerHeight + 'px';
//                 popupImage.style.width = 'auto';
//             }
//         }
//     });
// });

History.forEach(button => {
    button.addEventListener('click', function () {
        const index = parseInt(this.dataset.index);
        popupContent.textContent = list[index];
        popupImage.src = images[index];
        popupImage.onload = function() { // 确保在图片加载完毕后再调整大小
            adjustImageSize(popupImage, popup);
        };
        model.style.display = 'block';
    });
});

function adjustImageSize(image, container) {
    const containerWidth = container.offsetWidth - 20;
    const containerHeight = container.offsetHeight - 40;
    if (image.offsetWidth > containerWidth || image.offsetHeight > containerHeight) {
        if (image.offsetWidth > image.offsetHeight) {
            image.style.width = containerWidth + 'px';
            image.style.height = 'auto';
        } else {
            image.style.height = containerHeight + 'px';
            image.style.width = 'auto';
        }
    }
}

closeButton.addEventListener('click', () => {
    model.style.display = 'none';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    console.log('鼠标松开');
});
window.onclick = function (event) {
    if (event.target === model) {
        model.style.display = "none";
    }
}