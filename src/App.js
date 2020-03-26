import React, { Component } from 'react';
import Blockly from 'blockly';
import ErrorView from './components/ErrorView';
import { myBlocks } from './blockly/myBlocks';
import './blockly/myBlocksGenerator';
import './App.css';

const { ipcRenderer } = window.require('electron');

//Define the workspace
var workspace = null;

//Define the toolbox
const toolbox = `
<xml id="toolbox" style="display: none">
<category name="Κίνηση" colour='310'>
  <block type="move_forward"></block>
  <block type="turn_left"></block>
  <block type="turn_right"></block>
  <block type="stop"></block>
</category>
<category name="Επανάληψη" colour="210" expanded="true">
  <block type='if_wall'></block>
  <block type='if_else_wall'></block>
  <block type='for'></block>
  <block type='until'></block>
</category>
</xml>`;

//Define the blocks using the array in myBlocks.js
Blockly.defineBlocksWithJsonArray(myBlocks);

class App extends Component {
	componentDidMount = () => {
		//Inject a Blockly editor into the specified container element
		workspace = Blockly.inject(this.blocklyDiv, { toolbox: toolbox });
		Blockly.JavaScript.addReservedWords('code');
	};

	componentWillUnmount() {
		console.log('componentWillUnmount');
		workspace = Blockly.remove('blocklyDiv');
	}

	blocklyToCode = () => {
		var code = Blockly.JavaScript.workspaceToCode(workspace);
		console.log(code);
	};

	connectBoard() {
		var ip = document.getElementById('ip').value;
		ipcRenderer.send('connectBoard', ip);
	}

	render = () => {
		return (
			<div className="container">
				<div id="blocklyDiv" className="blocklyDiv" ref={(ref) => (this.blocklyDiv = ref)} />
				<div className="sideBar">
					<div className="buttonContainer">
						<input type="text" placeholder="IP του Wemos εδώ" id="ip" className="ipInput" />
						<button onClick={() => this.connectBoard()} className="buttonConnect">
							Σύνδεση
						</button>
					</div>
					<div className="buttonContainer">
						<button
							onClick={() => {
								this.blocklyToCode(workspace);
							}}
							className="buttonRun"
						>
							Εκτέλεση
						</button>
					</div>
					<ErrorView />
				</div>
			</div>
		);
	};
}

export default App;
