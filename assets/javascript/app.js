
// The time out interval constants for question and answer. 
// The values are in seconds. 
const TIMEOUT_QUESTION = 10;
const TIMEOUT_ANSWER = 5;

$(document).ready(function(){
  
  function Question(question, options, answer, imageUrl){
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.imageUrl = imageUrl;
  }

  var triviaGame = {
    
    timerTimeOut: null,
    timeOutCounter: TIMEOUT_QUESTION,
    
    questions : [],
    questionIndex : 0,
    currentQuestionObj: null,

    winsCount: 0,

    initialize: function(){

      var question1 = new Question("1. What was the first national park in America?", 
        ["Death Valley National Park", "Yosemite National Park", "Acadia National Park", 
        "Yellowstone National Park"], "Yellowstone National Park", "yellow-stone-np.jpg");
      
      var question2 = new Question("2. What national park is home to the world's largest tree by volume?", 
        ["Redwood National Park", "Sequoia National Park", "Everglades National Park", 
        "Joshua Tree National Park"], "Sequoia National Park", "sequoia-np.jpg");

      var question3 = new Question("3. Which state contains the most national parks?", 
        ["Colorado", "Utah", "Alaska", "California"], "California", "yosemite-np.jpg");

      var question4 = new Question("4. Which is the most visited national park?", 
        ["Yosemite National Park", "Grand Canyon National Park", "Great Smoky Mountains National Park", 
        "Rocky Mountain National Park"], "Great Smoky Mountains National Park", "great-smoky-mountains-np.jpg");
     
      var question5 = new Question("5. Who is considered as The Father of the National Parks?",
        ["John Muir", "Theodore Roosevelt", "Joseph Le Conte", "Ralph Waldo Emerson"], 
        "John Muir", "john_muir.jpg");

      var question6 = new Question("6. Which national park is home to the deepest lake in the U.S?", 
        ["Lake Clark National Park", "Kenai Fjords National Park", "Crater Lake National Park", 
        "Great Basin National Park"], "Crater Lake National Park", "crater-lake-np.jpg");

      var question7 = new Question("7. Which National Park contains the highest peak in North America?", 
        ["Grand Teton National Park", "Hawaii Volcanoes National Park", "Mount Rainier National Park", 
        "Denali National Park"], "Denali National Park", "denali-np.jpg");

      triviaGame.questions.push(question1, question2, question3, question4, question5, question6, question7);
    },

    reset: function(){
      triviaGame.questionIndex = 0;
      triviaGame.winsCount = 0;
    },

    resetTimeOut: function(){
      triviaGame.timeOutCounter = TIMEOUT_QUESTION;
    },

    start: function(){
      triviaGame.reset();

      $("#start-div").hide();
      $("#final-div").hide();

      $("#timer-div").show();
      $("#trivia-div").show();

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
      $("#trivia-div").show();
      $("#answer-div").hide();

      $("#question-div").text(triviaGame.currentQuestionObj.question);

      var newDiv = $('<div>');
      var optionsArray = triviaGame.currentQuestionObj.options;

      optionsArray.forEach(function(option){
        newDiv.append( $('<p><input type="radio" name="option" value="' + option + 
          '"></input><label class="option-label">' + option + '</label></p>'));
      });

      $("#options-div").html(newDiv);
    },

    evaluateAnswer: function(){
      triviaGame.clearTimer();
      var selectedAnswer = $(this).val();
      if( selectedAnswer === triviaGame.currentQuestionObj.answer){
        triviaGame.winsCount++;
        triviaGame.displayAnswer(true, "Correct Answer! Hooray!");
      }
      else{
        triviaGame.displayAnswer(false, "Oops! Wrong answer!");
      }
    },

    displayAnswer: function(isCorrectAnswer, message){
      $("#trivia-div").hide();
      $("#answer-div").show();

      $("#result-div").html(message);

      var pAnswer = $('<p>');
      if(!isCorrectAnswer){
        pAnswer.html("Correct answer was: " + triviaGame.currentQuestionObj.answer);
      }
      else{
        pAnswer.html( triviaGame.currentQuestionObj.answer);
      }
      $("#answer-img-div").html(pAnswer);
      
      var answerImage = $("<img>");
      var url = "assets/images/" + triviaGame.currentQuestionObj.imageUrl; 
      answerImage.attr("src", url);
      answerImage.addClass("answer-image");
      $("#answer-img-div").append(answerImage);

      setTimeout(triviaGame.nextQuestion, TIMEOUT_ANSWER * 1000);
    },

    displayTimeOut: function(){
      $("#timeout").text("Time Remaining: " + triviaGame.timeOutCounter + " seconds");
    },

    updateTimer: function(){
      triviaGame.timeOutCounter--;
      triviaGame.displayTimeOut();
      
      if(triviaGame.timeOutCounter === 0){
        console.log("Timeout");

        triviaGame.clearTimer();
        triviaGame.displayAnswer(false, "Out of Time!");
      }
    },

    clearTimer: function(){
      clearInterval(triviaGame.timerTimeOut);
      triviaGame.resetTimeOut();
    },

    stop: function(){  
      $("#final-result-div").text("Correct answers: " + triviaGame.winsCount);

      $("#timer-div").hide();
      $("#answer-div").hide();

      $("#final-div").show();
    }
  }

  triviaGame.initialize();

  $("#start-btn").click(triviaGame.start);

  $("#restart-btn").click(triviaGame.start);

  $('#options-div').on('change', 'input[name="option"]', triviaGame.evaluateAnswer);

});
