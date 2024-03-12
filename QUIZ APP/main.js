const questions = [
    {
        question: "Apa yang dimaksud dengan blockchain?",
        answer: [
            {text: "Sebuah perangkat keras untuk menyimpan kriptokurensi", correct: false},
            {text: "Sebuah teknologi yang digunakan untuk mengamankan dan mencatat transaksi secara terdesentralisasi", correct: true},
            {text: "Sebuah jenis kriptokurensi yang populer", correct: false},
            {text: " Sebuah aplikasi untuk berbagi file secara aman", correct: false},
        ]
    },
    {
        question: " Siapakah pencipta Bitcoin?",
        answer: [
            {text: "Satoshi Nakamoto", correct: true},
            {text: " Vitalik Buterin", correct: false},
            {text: "Charlie Lee", correct: false},
            {text: "Hal Finney", correct: false},
        ]
    },
    {
        question: "Apa yang dimaksud dengan mining dalam konteks kriptokurensi?",
        answer: [
            {text: "Proses menambang logam mulia untuk menciptakan kriptokurensi", correct: false},
            {text: " Proses memvalidasi transaksi dan menambahkannya ke blockchain", correct: true},
            {text: "Proses membeli kriptokurensi dari bursa", correct: false},
            {text: "Proses menyimpan kriptokurensi di dompet digital", correct: false},
        ]
    },
    {
        question: "apa itu Etherium?",
        answer: [
            {text: " Sebuah kriptokurensi yang bersifat anonim", correct: false},
            {text: "Sebuah aplikasi perbankan terdesentralisasi", correct: false},
            {text: " Sebuah platform blockchain yang memungkinkan untuk pembuatan kontrak pintar (smart contracts)", correct: true},
            {text: "Sebuah protokol komunikasi untuk perangkat IoT", correct: false},
        ]
    },
    {
        question: "Apa fungsi utama dari kunci pribadi dalam kriptokurensi?",
        answer: [
            {text: "Mengamankan identitas pengguna", correct: false},
            {text: "Menunjukkan saldo akun", correct: false},
            {text: "Mengakses blockchain", correct: false},
            {text: " Mengamankan akses ke kriptokurensi yang disimpan", correct: true},
        ]
    },
    {
        question: ": Apa yang dimaksud dengan ICO (Initial Coin Offering)?",
        answer: [
            {text: " Sebuah proses di mana sebuah proyek kriptokurensi baru menjual sejumlah koin kriptonya untuk membiayai pengembangan", correct: true},
            {text: "Sebuah protokol keamanan untuk blockchain", correct: false},
            {text: "Sebuah bursa kriptokurensi terkemuka", correct: false},
            {text: "Sebuah alat untuk menyimpan kriptokurensi", correct: false},
        ]
    },
    {
        question: "Pertanyaan: Apa yang dimaksud dengan fork dalam konteks blockchain?",
        answer: [
            {text: "Sebuah alat untuk menyimpan kriptokurensi", correct: false},
            {text: "Sebuah kecelakaan sistem pada jaringan blockchain", correct: false},
            {text: "Sebuah proses di mana sebuah blockchain dibagi menjadi dua versi terpisah", correct: true},
            {text: "Sebuah algoritma konsensus pada jaringan blockchain", correct: false},
        ]
    },
    {
        question: " Apa yang dimaksud dengan wallet dalam konteks kriptokurensi?",
        answer: [
            {text: "Sebuah alat untuk menyimpan uang kertas", correct: false},
            {text: "Sebuah aplikasi perbankan terdesentralisasi", correct: false},
            {text: " Sebuah jaringan komputer yang mendukung blockchain", correct: false},
            {text: "Sebuah tempat untuk menyimpan koin kriptokurensi", correct: true},
        ]
    },
    {
        question: " Apa yang dimaksud dengan double spending dalam konteks kriptokurensi?",
        answer: [
            {text: "Proses menghabiskan uang dua kali lipat", correct: false},
            {text: "Proses menduplikasi koin kriptokurensi", correct: false},
            {text: "Proses mengirim koin kriptokurensi yang sama ke dua alamat yang berbeda secara bersamaan", correct: true},
            {text: "Proses membagi transaksi kriptokurensi menjadi dua", correct: false},
        ]
    },
    {
        question: "Apa yang dimaksud dengan smart contract dalam konteks blockchain?",
        answer: [
            {text: "Sebuah program komputer yang mengeksekusi kontrak secara otomatis ketika kondisi tertentu terpenuhi", correct: true},
            {text: "Sebuah kontrak yang sangat cerdas", correct: false},
            {text: "Sebuah kontrak tradisional yang ditulis dalam bahasa pemrograman khusus", correct: false},
            {text: "Sebuah kontrak yang hanya dapat ditegakkan secara manual", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = 'none';
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";

}

function showScore() {
    resetState();
    questionElement.innerHTML = `Kamu Benar ${score} dari ${questions.length}.`;
    nextBtn.innerHTML = "Mulai Lagi"
    nextBtn.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz()
    }
});

startQuiz();