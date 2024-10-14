
function showpoetry() {
    document.getElementById("music").style.display = "none";
    document.getElementById("delicacy").style.display = "none";
    document.getElementById("poetry").style.display = "block";
}
function showmusic() {
    document.getElementById("music").style.display = "block";
    document.getElementById("delicacy").style.display = "none";
    document.getElementById("poetry").style.display = "none";
}
function showdelicacy() {
    document.getElementById("music").style.display = "none";
    document.getElementById("delicacy").style.display = "block";
    document.getElementById("poetry").style.display = "none";
}
//后添加
function flipCard(cardId) {
    const card = document.getElementById(cardId);
    const overlay = document.querySelector('.overlay');
    card.classList.add('flipped');
    overlay.style.display = 'block';
}

function openCard(cardId) {
    const card = document.getElementById(cardId);
    const overlay = document.querySelector('.overlay');
    card.classList.remove('flipped');
    overlay.style.display = 'none';
}

function openAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
/**
 * The function `openAllCards` removes the 'flipped' class from all cards and hides the overlay
 * element.
 */
}

// 添加点击事件监听器到每张卡片的前面  
document.querySelectorAll('.card-front').forEach(front => {
    front.addEventListener('click', (event) => {
        // 找到点击的卡片的前一个兄弟元素（即.card元素）并翻转它  
        const card = event.target.closest('.card');
        flipCard(card.id);
    });
});
// 灯笼
// script.js  
document.addEventListener('DOMContentLoaded', () => {
    const lanterns = document.querySelectorAll('.lantern');

    lanterns.forEach(lantern => {
        lantern.addEventListener('click', () => {
            // 切换active类以触发CSS中的样式变化  
            lantern.classList.toggle('active');

            // 如果已经处于active状态，则3秒后自动关闭消息  
            if (lantern.classList.contains('active')) {
                setTimeout(() => {
                    lantern.classList.remove('active');
                }, 3000); // 3秒后自动关闭  
            }
        });
    });
});

// 美食界面
document.addEventListener('DOMContentLoaded', function () {
    const imageBoxes = document.querySelectorAll('.image-box');
    const cards = document.querySelectorAll('.pic');

    imageBoxes.forEach(box => {
        box.addEventListener('click', function (event) {
            if (event.target.classList.contains('text')) {
                const card = box.querySelector('.pic');
                closeAllCardsExcept(card);
                card.style.display = 'block';
            }
        });
    });

    const closeAllCardsExcept = function (exceptCard) {
        cards.forEach(card => {
            if (card !== exceptCard) {
                card.style.display = 'none';
            }
        });
    };

    document.querySelectorAll('.close-button').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.pic');
            card.style.display = 'none';
        });
    });
});

