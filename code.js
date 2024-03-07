let totalScore = 0;
let currentQuestion = 0;
let questionAmmount = 0;
const answerContainer = document.getElementById("answerContainer");

LoadQuestion(currentQuestion);

function AnswerChoise(value) {
    if ((currentQuestion + 1) != questionAmmount) {
        totalScore += value;
        currentQuestion++;
        LoadQuestion(currentQuestion);
    }
    else {
        fetch("data.json")
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("question").innerHTML = "Végeztél, pontszámod: " + totalScore;
                if (totalScore <= 21) {
                    answerContainer.innerHTML = data[0].Results[0];
                }
                else if (totalScore <= 30){
                    answerContainer.innerHTML = data[0].Results[1];
                }
                else{
                    answerContainer.innerHTML = data[0].Results[2];
                }
            })
    }
}

function LoadQuestion(index) {
    answerContainer.innerHTML = "";

    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            questionAmmount = data[0].Questions.length;
            for (let i = 0; i < 3; i++) {
                const card = `
                <div class="col-lg-4 col-md-6 col-sm-12 gentle-tilt-move-shake" onclick="AnswerChoise(${data[0].Questions[index].AnswerValues[i]})">
                    <div class="option-box">
                        <div class="option text-center">
                            <img src="img/${(index * 3) + i}.jpg" draggable="false">
                            <br><br>
                            <p>${data[0].Questions[index].Answers[i]}</p>
                        </div>
                    </div>
                </div>
                `
                answerContainer.innerHTML += card;
            }
            document.getElementById("question").innerHTML = data[0].Questions[index].Question;
        })
}

document.getElementById("toggleButton").addEventListener("click", function () {
    var content = document.getElementById("content");
    var button = document.getElementById("toggleButton");
    var text = document.getElementById("shuu");

    if (content.style.display === "none") {
        content.style.display = "block";
        button.style.display = "none";
        text.style.display = "none";

    } else {
        content.style.display = "none";
    }
});