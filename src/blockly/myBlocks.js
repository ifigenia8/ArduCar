/* JavaScript file that define custom blocks */

export const myBlocks = [
	//Create the customized block 'move_forward'
	{
		type: 'move_forward',
		message0: 'Προχώρα μπροστά',
		previousStatement: null,
		nextStatement: null,
		colour: 310
	},
	//Create the customized block 'turn_left'
	{
		type: 'turn_left',
		message0: 'Στρίψε αριστερά \u2b6f %1 μοίρες',
		args0: [
			{
				type: 'field_number',
				name: 'DEGREES',
				min: 0,
				max: 360,
				value: 45
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 310
	},
	//Create the customized block 'turn_right'
	{
		type: 'turn_right',
		message0: 'Στρίψε δεξιά \u2b6e %1 μοίρες',
		args0: [
			{
				type: 'field_number',
				name: 'DEGREES',
				min: 0,
				max: 360,
				value: 45
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 310
	},
	//Create the customized block 'stop'
	{
		type: 'stop',
		message0: 'Σταμάτα',
		previousStatement: null,
		nextStatement: null,
		colour: 310
	},
	//Create the customized block 'if_else'
	{
		type: 'if_else_wall',
		message0: 'Εάν εμπόδιο %1 τότε κάνε %2 αλλιώς %3',
		args0: [
			{
				type: 'input_dummy'
			},
			{
				type: 'input_statement',
				name: 'wall'
			},
			{
				type: 'input_statement',
				name: 'no_wall'
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 210,
		tooltip: '',
		helpUrl: ''
	},
	//Create the customized block 'if'
	{
		type: 'if_wall',
		message0: 'Εάν εμπόδιο %1 τότε κάνε %2',
		args0: [
			{
				type: 'input_dummy'
			},
			{
				type: 'input_statement',
				name: 'wall'
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 210,
		tooltip: '',
		helpUrl: ''
	},
	//Create the customized block 'for'
	{
		type: 'for',
		message0: 'Για %1 φορές %2 %3',
		args0: [
			{
				type: 'field_number',
				name: 'TIMES',
				value: 1,
				min: 1,
				max: 20
			},
			{
				type: 'input_dummy'
			},
			{
				type: 'input_statement',
				name: 'move_statement'
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 120,
		tooltip: '',
		helpUrl: ''
	},
	//Create the customized block 'repeat_until'
	{
		type: 'until',
		message0: 'Επανέλαβε μέχρι να βρείς εμπόδιο %1 κάνε %2',
		args0: [
			{
				type: 'input_dummy'
			},
			{
				type: 'input_statement',
				name: 'no_wall'
			}
		],
		previousStatement: null,
		colour: 120,
		tooltip: '',
		helpUrl: ''
	}
];
