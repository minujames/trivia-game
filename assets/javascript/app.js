
// The time out interval constants for question and answer. 
// The values are in seconds. 
const TIMEOUT_QUESTION = 3;
const TIMEOUT_ANSWER = 3;

$(document).ready(function(){
  
  function Question(question, options, answer, answerImage){
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.answerImage = answerImage;
  }

  var triviaGame = {
    
    timerTimeOut: null,
    timeOutCounter: TIMEOUT_QUESTION,
    
    questions : [],
    questionIndex : 0,
    currentQuestionObj: null,

    winsCount: 0,

    initialize: function(){
      var question1 = new Question("1-What is the color of the sky?", 
        ["red", "blue", "green", "yellow"], "blue", "");
      var question2 = new Question("2-What is the color of the sky?", 
        ["red", "blue", "green", "yellow"], "blue", "");
      var question3 = new Question("3-What is the color of the sky?", 
        ["red", "blue", "green", "yellow"], "blue", "");
      var question4 = new Question("4-What is the color of the sky?", 
        ["red", "blue", "green", "yellow"], "blue", "");
      var question5 = new Question("5-What is the color of the sky?", 
        ["red", "blue", "green", "yellow"], "blue", "");

      triviaGame.questions.push(question1, question2, question3, question4, question5);

      triviaGame.reset();
    },

    reset: function(){
      triviaGame.questionIndex = 0;
      winsCount = 0;
    },

    resetTimeOut: function(){
      triviaGame.timeOutCounter = TIMEOUT_QUESTION;
    },

    start: function(){
      console.log("inside start");
      $("#start-div").hide();
      $("#timer-div").show();
      $("#question-div").show();
      $("#options-div").show();

      triviaGame.nextQuestion();
    },

    nextQuestion: function(){
      if(triviaGame.questionIndex === triviaGame.questions.length){
        console.log("quiiz ended");
        triviaGame.stop();
      }
      else{
        console.log("next question");
        triviaGame.currentQuestionObj = triviaGame.questions[triviaGame.questionIndex];
        
        triviaGame.timerTimeOut = setInterval(triviaGame.updateTimer, 1000);
        triviaGame.displayTimeOut();
        triviaGame.displayQuestion();

        triviaGame.questionIndex++;
      }
    },

    displayQuestion: function(question){
      console.log("inside display question");
      $("#question-div").html(triviaGame.currentQuestionObj.question);

      var optionsDiv = $("#options-div");
      var optionsArray = triviaGame.currentQuestionObj.options;
      optionsArray.forEach(function(option){
        console.log(option);
        $('<p><input class="radio-btn" type="radio" name="option" value=' + option + '>' +
          option + '</input></p>').appendTo(optionsDiv);
      });
    },

    evaluateAnswer: function(selectedAnswer){
      triviaGame.clearTimer();
      if( selectedAnswer === triviaGame.currentQuestionObj.answer){
        triviaGame.winsCount++;
        triviaGame.displayAnswer(true);
      }
      else{
        triviaGame.displayAnswer(false);
      }
    },

    displayAnswer: function(isCorrectAnswer){
      if(isCorrectAnswer){
        $("#question-div").html("Correct Answer! Hooray!");
      }
      else{
        $("#question-div").html("Sorry! Wrong answer!");
      }

      $("#options-div").html("Image goes here!");

      setTimeout(triviaGame.nextQuestion, TIMEOUT_ANSWER * 1000);
    },

    displayTimeOut: function(){
      $("#timeout").text("Time Remaining: " + triviaGame.timeOutCounter + " sec");
    },

    updateTimer: function(){
      triviaGame.timeOutCounter--;
      triviaGame.displayTimeOut();
      
      if(triviaGame.timeOutCounter === 0){
        console.log("Timeout reached");
        //TODO: disable answer div and put delay to show the answer
        // setTimeout(triviaGame.dispalyAnswer, 100);

        triviaGame.clearTimer();
        triviaGame.displayAnswer(false);
      }
    },

    clearTimer: function(){
      clearInterval(triviaGame.timerTimeOut);
      triviaGame.resetTimeOut();
    },

    stop: function(){
      console.log("inside stop");
      $("#question-div").text("correct answers: " + triviaGame.winsCount);

      $("#start-div").hide();
      $("#timer-div").hide();
      // $("#question-div").hide();
      $("#options-div").hide();
    }
  }

  triviaGame.initialize();

  $("#start-btn").click(triviaGame.start);

  $('#options-div').on('change', 'input[name="option"]', function(){
    triviaGame.evaluateAnswer($(this).val());
  });

});




// for (i = 0; i < 4; i++) {
//     $('<input class="radio-button" type="radio" name="dynradio" value="hello click">hello</input>')
//     .appendTo('.options');
// }