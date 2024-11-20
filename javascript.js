document.addEventListener("DOMContentLoaded", () => {
    const names = [
        "Pedro Henrique Fabiano de Almeida",
        "Sahmuel Hidalgo",
        "Pedro Henrique Oliveira Sena",
        "Vitor Rafael de Almeida",
        "Renan Augusto"
    ];
    let currentIndex = 0;
    let currentQuestion = 0;
    let answeredQuestions = 0;
    let rightAnswers = 0;

    const answerButtons = document.querySelectorAll(".retangulos");
    const arrowBack = document.getElementById("voltar");
    const forwardArrow = document.getElementById("avancar");
    const final = document.getElementById("final");

    const questions = [
        {
            question: "Como privacidade e segurança digital se distinguem em suas funções no ambiente online?",
            answers: {
                a: "Privacidade trata do controle de dados pessoais, enquanto segurança foca na proteção contra ameaças externas.",
                b: "Privacidade é irrelevante no cenário atual, sendo a segurança essencial para evitar vazamentos.",
                c: "Privacidade restringe-se a credenciais, enquanto segurança aborda ferramentas técnicas.",
                d: "Não há diferença prática, ambas visam proteger dados pessoais de forma integrada."
            },
            correct: "a",
            answered: false
        },
        // Adicione outras perguntas aqui...
    ];

    function changeName() {
        currentIndex = (currentIndex + 1) % names.length;
        document.querySelector('footer h1').textContent = Por: ${names[currentIndex]};
    }
    setInterval(changeName, 3000);

    function updateProgress() {
        const progress = document.querySelector("#progresso div");
        const progressPercentage = Math.round((answeredQuestions / questions.length) * 100);
        progress.style.width = progressPercentage + "%";
        progress.style.setProperty('--afterContent', "${progressPercentage}%");
    }

    function updateTexts() {
        const questionHTML = document.getElementById("pergunta");
        const current = questions[currentQuestion];

        questionHTML.innerHTML = current.question;
        answerButtons.forEach((button, index) => {
            button.innerHTML = Object.values(current.answers)[index];
            button.style.border = "solid 1px rgb(107, 107, 107)";
        });
    }

    function checkAnswer(selectedIndex) {
        const current = questions[currentQuestion];
        if (!current.answered) {
            const correctIndex = ["a", "b", "c", "d"].indexOf(current.correct);
            answerButtons.forEach((button, index) => {
                button.style.border = index === correctIndex ? "solid 2px green" : "solid 2px red";
            });
            if (selectedIndex === correctIndex) rightAnswers++;
            current.answered = true;
            answeredQuestions++;
            updateProgress();
        }
    }

    function navigateQuestion(direction) {
        let attempts = 0;
        do {
            currentQuestion = (currentQuestion + direction + questions.length) % questions.length;
            attempts++;
        } while (questions[currentQuestion].answered && attempts < questions.length);

        if (attempts >= questions.length) {
            console.log("Todas as perguntas foram respondidas.");
            return;
        }
        updateTexts();
    }

    // Configura eventos nos botões
    answerButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            checkAnswer(index);
            setTimeout(() => navigateQuestion(1), 3000);
        });
    });

    forwardArrow.addEventListener("click", () => navigateQuestion(1));
    arrowBack.addEventListener("click", () => navigateQuestion(-1));

    // Inicializa o quiz
    updateTexts();
    updateProgress();
});
