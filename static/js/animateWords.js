document.getElementById('wordForm').onsubmit = async function(e) {
    e.preventDefault();
    const wordCount = document.getElementById('wordCount').value;

    // Fetch APIを使用してサーバーから単語を取得
    const response = await fetch('/get-words', {
        method: 'POST',
        body: new URLSearchParams({'wordCount': wordCount}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const randomWords = await response.json();

    // 単語リストをクリア
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';

    // 取得した単語をリストに追加
    randomWords.forEach((word, index) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${word}`; // 単語の前に番号を追加
            li.style.opacity = 0;
            li.style.transition = 'opacity 0.5s';
            wordList.appendChild(li);
            // アニメーションで表示
            requestAnimationFrame(() => {
                li.style.opacity = 1;
            });
        }, index * 500); // 各単語の表示間隔を500msに設定
    });
    const button = document.querySelector('button[type="submit"]');

button.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

button.addEventListener('mouseout', () => {
    button.style.transform = 'translate(0, 0)';
});

};
