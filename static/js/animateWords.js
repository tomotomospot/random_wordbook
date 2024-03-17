document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button[type="submit"]');
    
    button.addEventListener('mouseover', () => {
        // 既存のランダム移動機能を保持
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        const randomX = Math.floor(Math.random() * (maxX - 100));
        const randomY = Math.floor(Math.random() * (maxY - 100));
        button.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // 新しい「バラバラになって下に落ちる」エフェクトを追加
        button.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        button.style.opacity = '0'; // 透明度を0にすることで徐々に消える効果を追加

        // ボタンが完全に透明になった後、非表示にする
        setTimeout(() => {
            button.style.display = 'none';
        }, 500); // 透明になるアニメーションと同じ時間を設定
    });

    // mouseout イベントリスナーは削除または無効化
    // button.addEventListener('mouseout', () => {
    //     button.style.transform = 'translate(0, 0)';
    // });

    document.getElementById('wordForm').onsubmit = async function(e) {
        e.preventDefault();
        const wordCount = document.getElementById('wordCount').value;

        const response = await fetch('/get-words', {
            method: 'POST',
            body: new URLSearchParams({'wordCount': wordCount}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const randomWords = await response.json();

        const wordList = document.getElementById('wordList');
        wordList.innerHTML = '';

        randomWords.forEach((word, index) => {
            setTimeout(() => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${word}`;
                li.style.opacity = 0;
                li.style.transition = 'opacity 0.5s';
                wordList.appendChild(li);
                requestAnimationFrame(() => {
                    li.style.opacity = 1;
                });
            }, index * 500);
        });
    };
});
