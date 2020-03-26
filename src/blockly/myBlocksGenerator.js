/* JavaScript file that implement the car's movements */
import Blockly from 'blockly';

const seconds = 0.5;
const delay = 1;
const minimumDistanceFromWall = 15;
const degreeConst = 90;
const motorSpeed = 255;

/* Instructions to move the car forward */
Blockly.JavaScript['move_forward'] = function(block) {
	var code =
		'console.log("forward");' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();' +
		'rightMotorForward.start(' +
		motorSpeed +
		');' +
		'leftMotorForward.start(' +
		motorSpeed +
		');' +
		'sleep(' +
		seconds +
		');' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();' +
		'sleep(' +
		delay +
		');';

	return code;
};

/* Instructions to turn the car to the left */
Blockly.JavaScript['turn_left'] = function(block) {
	var degree = Number(block.getFieldValue('DEGREES'));
	var seconds = degree / degreeConst;

	var code =
		'console.log("left");' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();' +
		'rightMotorForward.start(' +
		motorSpeed +
		');' +
		'leftMotorBackward.start(' +
		motorSpeed +
		');' +
		'sleep(' +
		seconds +
		');' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();' +
		'sleep(' +
		delay +
		');';

	return code;
};

/* Instructions to turn the car to the right */
Blockly.JavaScript['turn_right'] = function(block) {
	var degree = Number(block.getFieldValue('DEGREES'));
	var seconds = degree / degreeConst;

	var code =
		'console.log("right");' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();' +
		'rightMotorBackward.start(' +
		motorSpeed +
		');' +
		'leftMotorForward.start(' +
		motorSpeed +
		');' +
		'rightMotorForward.stop();' +
		'leftMotorBackward.stop();' +
		'sleep(' +
		seconds +
		');' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();' +
		'sleep(' +
		delay +
		');';

	return code;
};

/* Instructions to stop the car */
Blockly.JavaScript['stop'] = function(block) {
	var code =
		'console.log("stop");' +
		'rightMotorForward.stop();' +
		'leftMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorBackward.stop();';

	return code;
};

/* If_else object in front conditions code */
Blockly.JavaScript['if_else_wall'] = function(block) {
	//Statements inside the do
	var statements_wall = Blockly.JavaScript.statementToCode(block, 'wall');
	//Statements inside the else
	var statements_no_wall = Blockly.JavaScript.statementToCode(block, 'no_wall');

	var code =
		'console.log("if_else");' +
		'console.log(proximity.cm);' +
		'if(proximity.cm <= ' +
		minimumDistanceFromWall +
		'){' +
		statements_wall +
		'} else {' +
		statements_no_wall +
		'}';

	return code;
};

/* if object in front conditions code */
Blockly.JavaScript['if_wall'] = function(block) {
	//Statements inside the if
	var statements_wall = Blockly.JavaScript.statementToCode(block, 'wall');

	var code =
		'console.log("if"); console.log(proximity.cm); if(proximity.cm <= ' +
		minimumDistanceFromWall +
		'){' +
		statements_wall +
		'}';

	return code;
};

/* for n times conditions code */
Blockly.JavaScript['for'] = function(block) {
	//Times to repeat the cycle
	var times = Number(block.getFieldValue('TIMES'));
	//Statements inside the for
	var move_statement = Blockly.JavaScript.statementToCode(block, 'move_statement');

	var code = 'console.log("for"); var i = 0; for(i=0; i<' + times + '; i++){' + move_statement + '}';

	return code;
};

/* repeat until find an obstacle  conditions code*/
Blockly.JavaScript['until'] = function(block) {
	//Statements inside the until
	var statements_no_wall = Blockly.JavaScript.statementToCode(block, 'no_wall');

	var code =
		'console.log("until");' +
		"console.log((proximity.cm * 2), 'cm');" +
		'var intervalID = setInterval(function() {' +
		"console.log((proximity.cm * 2), 'cm');" +
		'if ((proximity.cm * 2) <= ' +
		minimumDistanceFromWall +
		') {' +
		'rightMotorForward.stop();' +
		'rightMotorBackward.stop();' +
		'leftMotorForward.stop();' +
		'leftMotorBackward.stop();' +
		'clearInterval(intervalID);' +
		'} else {' +
		statements_no_wall +
		'}' +
		'},' +
		(delay + seconds) * 1050 +
		');';

	return code;
};
