const dragButton = document.querySelector('.drag-button');
const father = document.querySelector('.father');
const messages = document.querySelectorAll('.message');
const msg = document.querySelectorAll('.msg');
const msg1 = document.querySelectorAll('.msg1');
const popup = document.querySelector('.popup');
const model = document.getElementById('myModel')
const closeButton = document.querySelector('.close-button');
const lastMessage = messages[messages.length - 1];
let isDragging = false;
let offsetX = 0;
let preLen = 0;
const popupContent = document.getElementById('popupContent')
const popupImage = document.getElementById('popupImage');
// const bgContainer = document.getElementById('container')
let list = ["1111111111",
    "22222222222",
    "33333333"];

let images = ["/src/Cannal-creativity/image/R-C (5).jpg", "/src/Cannal-creativity/image/R-C (5).jpg", "/src/Cannal-creativity/image/R-C (5).jpg"]

father.addEventListener('wheel', (e)=>{
    e.preventDefault();
    father.scrollLeft += e.deltaY;
})

dragButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - dragButton.offsetLeft;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        // 获取窗口宽度
        const windowWidth = window.innerWidth;
        if (x >= 100 && x < windowWidth - 100) {
            father.scrollLeft = x;
            dragButton.style.left = x + 'px';
            father.style.left = -(x - preLen) + 'px';
            preLen = x;
        }
    }
});


document.addEventListener('mouseup', () => {
    isDragging = false;
});


msg.forEach(button => {
    button.addEventListener('click', msg_click);
});
msg1.forEach(button => {
    button.addEventListener('click', msg_click);
});


function msg_click() {

    const index = parseInt(this.dataset.index);
    popupContent.textContent = list[index];
    popupImage.src = images[index];
    model.style.display = 'block';

    // 动态调整图片大小以适应模态框
    function adjustImageSize() {
        const containerWidth = popup.clientWidth;
        const containerHeight = popup.clientHeight;
        popupImage.style.maxWidth = `${containerWidth}px - 10`;
        popupImage.style.maxHeight = `${containerHeight}px - 10`;
    }

    // 初始调整
    adjustImageSize();

    // 监听窗口大小变化
    window.addEventListener('resize', adjustImageSize);

    // 清理事件监听器
    return () => {
        window.removeEventListener('resize', adjustImageSize);
    };
}


closeButton.addEventListener('click', () => {
    model.style.display = 'none';
});


window.onclick = function (event) {
    if (event.target === model) {
        model.style.display = "none";
    }
}