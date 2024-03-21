let totalScore = 0;
let currentQuestion = 0;
let questionAmmount = 0;
const answerContainer = document.getElementById("answerContainer");
const blurBox = document.getElementById("blurBox");


async function AnswerChoise(value) {
    if ((currentQuestion + 1) != questionAmmount) {
        totalScore += value;
        currentQuestion++;
        PlayBlur(blurBox);
        await delay(500);
        LoadQuestion(currentQuestion);
        await delay(500);
        blurBox.style.pointerEvents = "auto";
    }
    else {
        fetch("data.json")
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("question").innerHTML = "Gratulálok, sikeresen kitöltötted a tesztet!";
                if (totalScore <= 21) {
                    answerContainer.innerHTML = `
                        <div class="col-lg-8 col-md-12"><p>${data[0].Results[0]}</p></div>
                        <div class="col-lg-4 col-md-12"><img src="img/healthy.jpg" class="img-fluid"></div><br>
                        <button onclick='reload()' id='reloadButton'>Vissza a főoldalra</button>
                    `
                }
                else if (totalScore <= 30) {
                    answerContainer.innerHTML = `
                        <div class="col-lg-8 col-md-12"><p>${data[0].Results[1]}</p></div>
                        <div class="col-lg-4 col-md-12"><img src="img/partly-healthy.jpg" class="img-fluid"></div><br>
                        <button onclick='reload()' id='reloadButton'>Vissza a főoldalra</button>
                    `           
                }
                else {
                    answerContainer.innerHTML = `
                        <div class="col-lg-8 col-md-12"><p>${data[0].Results[2]}</p></div>
                        <div class="col-lg-4 col-md-12"><img src="img/unhealthy.jpg" class="img-fluid"></div><br>
                        <button onclick='reload()' id='reloadButton'>Vissza a főoldalra</button>
                    `
                }
                
                answerContainer.style.paddingLeft = '10%';
                answerContainer.style.paddingRight = '10%';
                answerContainer.style.fontSize = 'large';
                answerContainer.style.textAlign = "justify"
                answerContainer.style.fontWeight = 'bold';
            })
    }
}

function LoadQuestion(index) {
    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            questionAmmount = data[0].Questions.length;
            answerContainer.innerHTML = "";
            for (let i = 0; i < 3; i++) {
                const card = `
                <div class="col-lg-4 col-md-12 gentle-tilt-move-shake" onclick="AnswerChoise(${data[0].Questions[index].AnswerValues[i]})">
                    <div class="hexagon">
                        <div class="option-box inner-hexagon">
                            <div class="option text-center">
                                <img src="img/${(index * 3) + i + 1}.jpg" draggable="false" id="cardIMG">
                                <br><br>
                                <p>${data[0].Questions[index].Answers[i]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `
               
                answerContainer.innerHTML += card;
            }
            document.getElementById("question").innerHTML = data[0].Questions[index].Question;

            const options = document.getElementsByClassName('hexagon');
            let highest = 0;
            for (let i = 1; i < 3; i++) {
                if (options[highest].clientHeight < options[i].clientHeight) {
                    highest = i;
                }
            }
            for (let i = 0; i < 3; i++) {
                options[i].style.minHeight = options[highest].clientHeight + "px";
                options[i].children[0].style.minHeight = options[highest].clientHeight + "px";
            }
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
        document.getElementsByClassName("footer")[0].classList.add("bottom");
        LoadQuestion(currentQuestion);
        SetBoxPosition();

    } else {
        content.style.display = "none";
    }
});

function SetBoxPosition() {
    const innerContainer = document.getElementsByClassName("inner-container")[0];
    const content = document.getElementById("content");
    if (document.body.clientWidth > 992){
        const contentHeight = document.getElementById("content").clientHeight;
        let padding = (contentHeight - innerContainer.clientHeight) / 2;
        innerContainer.style.marginTop = padding + "px";
        content.style.height = "100%";
    }
    else{
        content.classList.add("my-5");
    }
}

function PlayBlur(element){
    element.style.pointerEvents = "none";
    element.classList.add("blur");
    element.addEventListener("animationend", function() {
    element.classList.remove("blur");
  });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function reload(){
    location.reload();
}
