const container = document.querySelector('.container');
const imageWrapper = document.querySelector('.image-wrapper1');
const dragButton = document.querySelector('.drag-button');
const Build = document.querySelectorAll(".building");
const History = document.querySelectorAll(".history");
const popup = document.querySelector('.popup');
const popupContent = document.getElementById('popupContent');
const popupImage = document.getElementById('popupImage');
const closeButton = document.querySelector('.close-button');

let isDragging = false;
let startX=null; // 定义变量 startX，表示鼠标按下时的横坐标位置
let startOpacityLeft = 1; // 定义变量 startOpacityLeft 表示左边的初始不透明度为 1
let startOpacityRight = 0; // 定义变量 startOpacityRight 表示右边的初始不透明度为 0
let startButtonLeft;

let list = ["1111111111",
    "22222222222",
    "33333333"];

let images=["images/2.webp","images/c3.png","images/2.webp"]



dragButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    startButtonLeft = dragButton.offsetLeft;
    if(startX==null){
        startX = e.clientX;
    }

});

document.addEventListener('mousemove', (e) => {
    const windowWidth = window.innerWidth;
    // 如果正在拖拽
    if (isDragging) {
      const diffx =e.clientX-startX;
      const totalWidth=imageWrapper.offsetWidth;
      const progress=diffx/totalWidth;
      if(diffx>=0 && diffx <= windowWidth - dragButton.offsetWidth/3){
              if(totalWidth){
                  imageWrapper.style.clipPath=`inset(0 0 0 ${progress * 100}%)`;
                  startOpacityLeft = 1 - progress;
                  startOpacityRight = progress;
              }else {
                  imageWrapper.style.clipPath = `inset(0 0 ${Math.abs(progress) * 100}% 0)`;
                  startOpacityLeft = progress;
                  startOpacityRight = 1 - progress;
              }

          imageWrapper.style.opacity = `linear-gradient(to right, rgba(255, 255, 255, ${startOpacityLeft}) 0%, rgba(255, 255, 255, ${startOpacityRight}) 100%)`;
          dragButton.style.left = `${e.clientX}px`;
      }

    }
});

History.forEach(button => {
    button.addEventListener('click', function () {

        const index = parseInt(this.dataset.index);
        popupContent.textContent = list[index];
        popupImage.src = images[index];
        popup.style.display = 'block';



        // 动态调整图片大小
        const containerWidth = popup.offsetWidth - 20; // 减去一些边距
        const containerHeight = popup.offsetHeight - 40; // 减去一些边距和文字高度
        if (popupImage.offsetWidth > containerWidth || popupImage.offsetHeight > containerHeight) {
            if (popupImage.offsetWidth > popupImage.offsetHeight) {
                popupImage.style.width = containerWidth + 'px';
                popupImage.style.height = 'auto';
            } else {
                popupImage.style.height = containerHeight + 'px';
                popupImage.style.width = 'auto';
            }
        }

    });
});


closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
