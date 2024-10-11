const container = document.querySelector('.container');
const container1 = document.querySelector('.container1');
const imageWrapper = document.querySelector('.image-wrapper1');
const imageWrapper1 = document.querySelector('.image-wrapper2');
const dragButton = document.querySelector('.drag-button');
const Build = document.querySelectorAll(".building");
const History = document.querySelectorAll(".history");

const popup = document.querySelector('.popup');
const popupContent = document.getElementById('popupContent');
const popupImage = document.getElementById('popupImage');
const closeButton = document.querySelector('.close-button');

let isDragging = false;
let offsetX = 0;

let list = ["1111111111",
    "22222222222",
    "33333333"];

let images=["images/2.webp","images/c3.png","images/2.webp"]

let preLen = 0;


dragButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - dragButton.offsetLeft;
});

document.addEventListener('mousemove', (e) => {
    // 如果正在拖拽
    if (isDragging) {
        // 计算鼠标当前位置相对于鼠标按下时位置的横向距离
        const x = e.clientX - offsetX;
        // 如果横向距离在第一个容器范围内
        if (x >= 0 && x <= container.clientWidth - dragButton.clientWidth-420) {
            // 设置拖拽按钮的左位置为当前横向距离
            dragButton.style.left = x + 'px';
            imageWrapper.style.left = -x+'px';
            Build.forEach(build=>{
                const currentLeft = parseFloat(build.style.left) || 0;   
                build.style.left =currentLeft -(x-preLen) + 'px';
            })
            preLen = x;
        }
        // 如果横向距离在第二个容器范围内
        if (x >= 0 && x <= container1.clientWidth - dragButton.clientWidth-420) {
            // 设置拖拽按钮的左位置为当前横向距离
            dragButton.style.left = x + 'px';
            imageWrapper1.style.left = -x+'px';
        }
    }
});

Build.forEach(build=>{
    build.addEventListener('mousemove', (e) => {
        if (isDragging){
            // 计算鼠标当前位置相对于鼠标按下时位置的横向距离
            const x = e.clientX - offsetX;
            // 如果横向距离在第一个容器范围内
            if (x >= 0 && x <= container.clientWidth - dragButton.clientWidth) {
                // 设置拖拽按钮的左位置为当前横向距离
                dragButton.style.left = x + 'px';
                // 计算移动距离占第一个容器总可移动距离的比例
                const percentage = x / (container.clientWidth - dragButton.clientWidth);
                // 根据比例移动第一个图片包装容器
                build.style.left = -percentage * 290 + 'px';
            }

        }
    })
})

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
