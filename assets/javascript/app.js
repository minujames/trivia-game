
$(document).ready(function(){
  
  function Question(question, options, answer, answerImage){
    this.question = question;
    this.options = options;
    this.answer = answer;
    this.answerImage = answerImage;
  }

  var triviaGame = {

    timerQuestionInterval: null,
    questions : [],

    initialize: function(){
      this.reset();
    },

    reset: function(){
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

      this.questions.push(question1, question2, question3, question4, question5);
      // console.log(this.questions);

      // $("#start-div").hide();
      $("#timer-div").hide();
      $("#question-div").hide();

    },

    start: function(){
      $("#start-div").hide();
      $("#timer-div").show();
      $("#question-div").show();

    },

    displayQuestion: function(){

    },

    nextQuestion: function(){

    },

    dispalyAnswer: function(){

    },

    stop: function(){

    }

  }

  triviaGame.reset();

  $("#start").click(triviaGame.start);


});




// for (i = 0; i < 4; i++) {
//     $('<input class="radio-button" type="radio" name="dynradio" value="hello click">hello</input>')
//     .appendTo('.options');
// }