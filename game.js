var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

// event listener for button click
$(".btn").click(function (){
  if (!started) {
    gameOver();
  } else {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

//event listener for keyboard key press for checking starting of game

$(document).keypress(() => {
  if (!started) {
    setTimeout(() => {
        nextSequence();
    }, 500);
    started = true;
  }
});

//gameover effect
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart the Game");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  $("#level-title").text("Level " + level);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  var element = "#" + color;
  $(element).addClass("pressed");

  setTimeout(() => {
    $(element).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (userClickedPattern[index] !== gamePattern[index]) {
    gameOver();
  }
  else if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
        nextSequence();
    }, 1000);
  }
}
