// مدیریت منوی همبرگری
function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('active');
}

// مدیریت مودال
function openModal(title, desc, link) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('partLink').href = link;
    document.getElementById('partModal').classList.add('active');
}

function closeModal() {
    document.getElementById('partModal').classList.remove('active');
}

// سیستم آزمون
const quizData = [
    { question: "کدام قطعه مغز کامپیوتر محسوب می‌شود؟", options: ["رم", "پردازنده (CPU)", "مادربورد", "گرافیک"], correct: 1 },
    { question: "وظیفه اصلی RAM چیست؟", options: ["ذخیره دائمی فایل‌ها", "پردازش گرافیکی", "ذخیره موقت داده‌ها", "تأمین برق"], correct: 2 },
    { question: "کدام قطعه برای اجرای بازی‌های سنگین حیاتی است؟", options: ["کارت گرافیک", "آنتی‌ویروس", "سیستم عامل", "پاور"], correct: 0 },
    { question: "کدام مورد یک نرم‌افزار است؟", options: ["مادربورد", "ویندوز", "رم", "SSD"], correct: 1 },
    { question: "وظیفه اصلی PSU چیست؟", options: ["پردازش اطلاعات", "ذخیره عکس‌ها", "تأمین برق قطعات", "خنک کردن سیستم"], correct: 2 }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('questionContainer').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const currentQuestion = quizData[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, clickedButton) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const allButtons = document.querySelectorAll('.option-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        clickedButton.classList.add('correct');
        score++;
    } else {
        clickedButton.classList.add('wrong');
        allButtons[correctIndex].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('questionContainer').style.display = 'none';
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';
    
    let grade = score === quizData.length ? "عالی! تو یک استاد کامپیوتری! 🏆" : 
                score >= quizData.length / 2 ? "خوب بود! کمی بیشتر مطالعه کن. 🙂" : "باید بیشتر مطالعه کنی! 📚";

    resultContainer.innerHTML = `
        <h3>نتیجه آزمون شما</h3>
        <p style="font-size: 2rem; margin: 20px 0;">${score} از ${quizData.length}</p>
        <p>${grade}</p>
        <button class="fancy-link" onclick="startQuiz()">آزمون دوباره</button>
    `;
}
