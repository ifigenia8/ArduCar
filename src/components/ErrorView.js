import React, { Component } from 'react';
import './ErrorView.css';

//Import images
import redDot from '../assets/redDot.png';
import greenDot from '../assets/greenDot.png';
import orangeDot from '../assets/orangeDot.png';

const { ipcRenderer } = window.require('electron');

export default class ErrorView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: {
				class: 'Για να ξεκινήσετε εισάγετε IP και πατήστε σύνδεση',
				message: ''
			},
			boardReady: redDot
		};
	}

	componentDidMount() {
		ipcRenderer.on('unhandledError', (event, [ error, message ]) => {
			this.setState({ error: { class: error, message: message }, boardReady: redDot });
		});

		ipcRenderer.on('connecting', (event, arg) => {
			this.setState({ error: { class: 'Σύνδεση...', message: '' }, boardReady: orangeDot });
		});

		ipcRenderer.on('boardReady', (event, arg) => {
			this.setState({ error: { class: 'Συνδεδεμένος', message: '' }, boardReady: greenDot });
		});
	}

	componentWillUnmount() {
		ipcRenderer.removeAllListeners('unhandledError');
		ipcRenderer.removeAllListeners('connecting');
		ipcRenderer.removeAllListeners('boardReady');
	}

	render() {
		return (
			<div className="errorContainer">
				<div className="titleContainer">
					<img src={this.state.boardReady} alt="dot" className="dot" />
					<p className="title">{this.state.error.class}</p>
				</div>
				<p className="description">{this.state.error.message}</p>
			</div>
		);
	}
}
