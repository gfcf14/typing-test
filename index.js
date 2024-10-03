/*eslint-disable */
import { sendMail } from 'utils/helpers';
import { showStatsBar } from './greendream';
import $ from 'jquery';

var testStarted = false;
var textmax = 4;
var randText = 0;
var texts = new Array("In his first appearance, Dick is a circus acrobat, and, with his parents, one of the 'Flying Graysons'. While preparing for a performance, Dick overhears two gangsters attempting to extort protection money from the circus owner. The owner refuses, so the gangsters sabotage the trapeze wires with acid. During the next performance, the trapeze from which Dick's parents are swinging snaps, sending them to their deaths. Before he can go to the police, Batman appears to him and warns him that the two gangsters work for Tony Zucco, a very powerful crime boss, and that revealing his knowledge could lead to his death. When Batman recounts the murder of his own parents, Dick asks to become his aide. After extensive training, Dick becomes Robin.",
					  "Each player begins the game with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. Each of the six piece types moves differently. Pieces are used to attack and capture the opponent's pieces, with the objective to 'checkmate' the opponent's king by placing it under an inescapable threat of capture. In addition to checkmate, the game can be won by the voluntary resignation of the opponent, which typically occurs when too much material is lost, or if checkmate appears unavoidable. A game may also result in a draw in several ways, where neither player wins. The course of the game is divided into three phases: opening, middlegame, and endgame.",
					  "Objects can be thought of as encapsulating their data within a set of functions designed to ensure that the data are used appropriately, and to assist in that use. The object's methods typically include checks and safeguards specific to the data types the object contains. An object can also offer simple-to-use, standardized methods for performing particular operations on its data, while concealing the specifics of how those tasks are accomplished. In this way alterations can be made to the internal structure or methods of an object without requiring that the rest of the program be modified. This approach can also be used to offer standardized methods across different types of objects.",
					  "Facebook generally has a lower clickthrough rate (CTR) for advertisements than most major Web sites. According to BusinessWeek.com, banner advertisements on Facebook have generally received one-fifth the number of clicks compared to those on the Web as a whole, although specific comparisons can reveal a much larger disparity. For example, while Google users click on the first advertisement for search results an average of 8% of the time (80,000 clicks for every one million searches), Facebook's users click on advertisements an average of 0.04% of the time (400 clicks for every one million pages)."
					  );

var time = 60;
var intervalcontroller;
var resultString = "";

$(window).on('load', function() {
	setInterval(function() {
		if (testStarted) $('#ttresult').hide();
	}, 500);
});

$(function() {
	$('#yourtext').bind("cut copy paste",function(e) {
      e.preventDefault();
   });

	 $('#youremail').on('change keyup', function(e) {
     if($('#youremail').val() != '' && resultString != '') $('#sendresbtn').prop('disabled', false);
		 else $('#sendresbtn').prop('disabled', true);
   });

	$('#sendresbtn').click(async function(e) {
		if (!testStarted && resultString != '') {
      $('#sendresbtn').prop('disabled', true);
      const sendResults = await sendMail('typingtest', $('#youremail').val(), resultString);
      $('#youremail').val('');

      if (sendResults === 'success') {
        showStatsBar('SUCCESS! RESULTS HAVE BEEN SENT', false);
      } else {
        showStatsBar('ERROR: COULD NOT SEND RESULTS', true);
        console.log(sendResults);
      }
		}
	});
});

export function startTypingTest() {
	if (!testStarted) {
		testStarted = true;
		resultString = '';
		$('#yourtext').val('');
		time = 60;
		chooseText();
		$('#yourtext').focus();
		timeDown();
	}
}

function chooseText() {
	randText = Math.floor(Math.random() * 10) % textmax;
	$('#sampletext').html(texts[randText]);
}

function timeDown() {
	intervalcontroller = setInterval(lowerTime, 1000);
}

function lowerTime() {
	if (time >= 0) 	{
		if (time > 30) $('#startttbtn').css('background', '#007146');
		if (time > 10 && time < 30) $('#startttbtn').css('background', '#cece0e');
		if (time > 0 && time <= 10) $('#startttbtn').css('background', '#ff0000');
		$('#startttbtn').html('Time Remaining: ' + time);
		time--;
	}
	else {
		testStarted = false;
		$('#startttbtn').html('TIME UP!!! Click here to Retake');
		$('#startttbtn').click(startTypingTest);
		$('#ttresult').show();
		getResults();
		clearInterval(intervalcontroller);
	}
}

function preventCheat() {
	document.getElementById("yourtext").focus();
}

function getResults() {
	var typed = $('#yourtext').val();
	var cpm = typed.length;
	var words = typed.split(" ");
	var wpm = words.length;
	var testtext = texts[randText].split(" ");
	var acccounter = 0;
	var errors = 0;

	for (var i = 0; i < wpm; i++) {
		if (words[i] === testtext[i]) acccounter++;
		else errors++;
	}
	var accper = (acccounter / wpm) * 100.00;
	resultString = "YOUR TEST RESULTS: \n\n WORDS PER MINUTE: " + wpm + " \n CHARACTERS PER MINUTE: " + cpm + " \n ACCURACY: " + accper.toFixed(2) + " % \n ERRORS: " + errors + " out of " + wpm + " words";
	alert(resultString);
	$('#yourtext').val(resultString);
}
/*eslint-enable */
