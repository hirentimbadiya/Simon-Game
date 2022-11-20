// created array for colors
let buttonColours = ["red", "blue", "green", "yellow"];
// pattern for user clicked colors
let userClickedPattern = [];
// array for pattern
let gamePattern = [];
// initially level is 0 and game is not started so started = false
let level = 0;
let started = false;

// function when user clicks any key
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// when user clicks any color
$(".btn").click(function () {
    // add the user's clicked color in userpattern array
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // animate & play sound
    animatePress(userChosenColour);
    playSound(userChosenColour);

    // check the answer
    checkAnswer(userClickedPattern.length - 1);
});

// once the user clicks any number then checkAnswer
function checkAnswer(currentLevel) {
    // if currentLEvel if gamePattern and userPattern then it is success and length of both is 
    // equal then after 1000 ms call the nextSequence() function
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // if guess is incorrect then game is over and start over
        gameOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    // Once nextSequence() is triggered, reset the userClickedPattern to an 
    // empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    // generating a random numbers
    let x = Math.floor(Math.random() * 4);
    // choosing the color by randomly
    let randomChosenColour = buttonColours[x];
    //push this randomly chosen color in pattern array
    gamePattern.push(randomChosenColour);

    // some animation 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// function for playing the audio for each color
function playSound(audioName) {
    let audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

// this function animates color when it is triggered
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

/// this function gets implemented once game is over
function gameOver() {
    // play the incorrect sound
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

// once the game is over then restarting the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

