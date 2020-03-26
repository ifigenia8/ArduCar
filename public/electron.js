const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');

//Libraries for Wemos
const five = require('johnny-five'); //johnny-five library
const EtherPortClient = require('etherport-client').EtherPortClient; //etherport library to connect johnny-five to a wifi board

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1360,
		height: 768,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.on('closed', () => (mainWindow = null));

	mainWindow.setMenuBarVisibility(false); //Hide the menu bar
	isDev ? mainWindow.webContents.openDevTools() : null; //Toggle developer tool only in dev

	//Listener that caught the uncaught exceptions
	process.on('uncaughtException', (err) => {
		if (err.context) {
			mainWindow.webContents.send('unhandledError', [ err.context.class, err.context.message ]);
		} else {
			console.log(err);
		}
	});

	//Setup the Wemos D1 mini board
	ipcMain.on('connectBoard', (event, ip) => {
		mainWindow.webContents.send('connecting');
		board = null;
		board = new five.Board({
			port: new EtherPortClient({
				host: ip.toString(), // IP of Wemos inserted
				port: 3030
			}),
			timeout: 10000,
			repl: false
		});

		//Event fired when the Wemos D1 mini is ready
		board.on('ready', function() {
			console.log('board on ready');

			mainWindow.webContents.send('boardReady');

			//Initialize the pins
			leftMotorBackward = new five.Motor(15); //D8
			leftMotorForward = new five.Motor(13); //D7

			//Pins for left motor
			rightMotorForward = new five.Motor(12); //D6
			rightMotorBackward = new five.Motor(14); //D5

			//Pins for photo interrupter
			rightSensor = new five.Sensor.Digital(16); //D3
			leftSensor = new five.Sensor.Digital(4); //D2

			//Proximity sensor
			proximity = new five.Proximity({
				controller: 'GP2Y0A41SK0F',
				pin: 'A0'
			});

			//Set all the pins in 'low' state
			leftMotorForward.stop();
			leftMotorBackward.stop();
			rightMotorForward.stop();
			rightMotorBackward.stop();

			//Execute the code received from Blockly
			ipcMain.on('executeCode', (event, code) => {
				eval(code);
			});

			board.on('exit', function() {
				console.log('Board on exit');

				//Stop the car when close the app
				leftMotorForward.stop();
				leftMotorBackward.stop();
				rightMotorForward.stop();
				rightMotorBackward.stop();
			});

			board.on('message', function(event) {
				console.log(event, 'Board on message');
			});

			board.on('fail', function(event) {
				console.log(event, 'Board on fail');
			});

			board.on('warn', function(event) {
				console.log(event, 'Board on warn');
			});

			board.on('info', function(event) {
				console.log(event, 'Board on info');
			});

			board.on('close', function(error) {
				console.log(error, 'board on close');
			});

			board.on('exit', function() {
				console.log(error, 'board on exit');
			});
		});
	});

	/****************************************** */
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

//Function that pause the execution of the code to allow the movement
function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay * 1000);
}
