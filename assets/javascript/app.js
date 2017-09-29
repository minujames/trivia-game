
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
      $("#question-div").text(triviaGame.currentQuestionObj.question);

      var optionsDiv = $("#options-div");
      var newDiv = $('<div>');

      var optionsArray = triviaGame.currentQuestionObj.options;

      optionsArray.forEach(function(option){
        newDiv.append( $('<p><input type="radio" name="option" value="' + option + 
          '"></input><label class="option-label">' + option + '</label></p>'));
      });

      optionsDiv.html(newDiv);
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
