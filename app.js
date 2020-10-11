

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");



let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the functions into available questions array
function setAvailableQuestions(){
	 const totalQuestion = quiz.length;
	 for(let i=0; i<totalQuestion; i++){
	 	availableQuestions.push(quiz[i])
	 }
	 //console.log(availableQuestions)
}
//set question number and question and options
function getNewQuestion(){
	//set question number
	questionNumber.innerHTML = "Question " + (questionCounter + 1 )+ " of " + quiz.length;
	//set question text
	//get random questions
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	//console.log(questionIndex); 
	//get the position of 'questionindex' from theavailable question array
	const index1 = availableQuestions.indexOf(questionIndex);
	//remove the 'questionindex' from the available question array, so that the question does not repeat 
	availableQuestions.splice(index1,1);
	//set options
	//get the length of options
	const optionLen = currentQuestion.options.length;
	//push options into availableOptions array
	for(let i = 0; i<optionLen; i++){
       availableOptions.push(i);
	}
	optionContainer.innerHTML = '';
	 let animationDelay = 0.2;
	 //create options in html
	 for(let i=0; i<optionLen; i++){
	 	//random option
	 	const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
	 	//get the position of optionsindex from the available options
	 	const index2 = availableOptions.indexOf(optionIndex);
	 	//remove the optionIndex from the availabeOptions so that the option does not repeat
	 	availableOptions.splice(index2,1);
	 	//console.log(optionIndex)
	
	 	const option = document.createElement("div");
	 	option.innerHTML = currentQuestion.options[optionIndex];
	 	option.id = optionIndex;
	 	option.style.animationDelay = animationDelay + 's';
	 	animationDelay = animationDelay + 0.2;
	 	option.className = "option";
	 	optionContainer.appendChild(option)
	 	option.setAttribute("onclick", "getResult(this)")
	 }
	//console.log(questionIndex);
	//console.log(availableQuestions);
	questionCounter++


}
 //get the result of currentattempt question
 function getResult(element){
 	const id = parseInt(element.id);
 //get the answer by comparing the id of clicked option
 	if(id === currentQuestion.answer){
 		//set the green color to the correct
 		element.classList.add("correct");
 		//add the indicator to correct mark
 		updateAnswersIndicator("correct");
 		correctAnswers++;
 		//console.log("correct:" + correctAnswers);
 	}else{
 		//set the red color to the wrong
 		element.classList.add("wrong");
 		//add the indicators to wrong mark
 		updateAnswersIndicator("wrong");
 		//if the answer is correct then show the correct option by adding green color the correct option
 		const optionLen = optionContainer.children.length;
 		for(let i =0; i<optionLen; i++){
 			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
 				optionContainer.children[i].classList.add("correct");
 			}
 		}
 		
 	}
 	attempt++;
 	unclickableOptions();

 }
 //make all the options unclickable once the user select option(restrict the user to change)
 function unclickableOptions(){
 	const optionLen = optionContainer.children.length;
 	for(let i=0; i<optionLen; i++){
 		optionContainer.children[i].classList.add("already-answered");
 	}


 }
 function answersIndicator(){
 	answersIndicatorContainer.innerHTML ='';
 	const totalQuestion = quiz.length;
 	for(let i=0; i<totalQuestion; i++){
 		const indicator = document.createElement("div");
 		answersIndicatorContainer.appendChild(indicator);
 	}
 }
function updateAnswersIndicator(markType){
	 answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
    }

  function next(){
  	if(questionCounter === quiz.length){
  		//console.log("Quiz over");
  		quizOver();
  	}else{
  		getNewQuestion();
  	}
  }
  function quizOver(){
    //hide quiz quizbox
    quizBox.classList.add("hide");
    //show the results
    resultBox.classList.remove("hide");
    quizResult();
  }
  //get the quiz result
  function quizResult(){
     resultBox.querySelector(".total-question").innerHTML = quiz.length;
     resultBox.querySelector(".total-attempt").innerHTML = attempt;
     resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
     resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
     const percentage = (correctAnswers/quiz.length)*100;
     resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) + "%";
     resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
  
  }
  function resetQuiz(){

      questionCounter = 0;
      correctAnswers = 0;
      attempt = 0;


  }

  function tryAgainQuiz(){
  	//hide the result box
  	resultBox.classList.add("hide");
  	//show the quiz box
  	quizBox.classList.remove("hide");
  	resetQuiz();
  	startQuiz();
  }
  function goToHome(){
  	//hide result box
  	resultBox.classList.add("hide");
  	//show result box
  	homeBox.classList.remove("hide");
  	resetQuiz();
  }
  // starting point
function startQuiz(){
	//hide homebox
	homeBox.classList.add("hide");
	//show quiz box
	quizBox.classList.remove("hide");
    //first we will set all questions in availableQuestions array
	setAvailableQuestions();
	//second we will call getNewQuestion(); function
	getNewQuestion();
	//to create indicators of answer
	answersIndicator();
}
window.onload = function(){
	homeBox.querySelector(".total-question").innerHTML=quiz.length;
}











