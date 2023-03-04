import React, { useState } from 'react';
import './App.css';
import { Input, TimePicker, DatePicker, InputNumber  } from 'antd';
import moment from 'moment';

import RecordForm from './RecordForm';
import RecordTable from './RecordTable';
import RadioSelector from './RadioSelector';

function App() {
	const [isAddNew, setIsAddNew] = useState(false);

	const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

	const [records, setRecords] = useState([]);

	// Add data
	const handleSubmit = (event) => {
        event.preventDefault();

        const record = {
        name: name,
        type: type,
        category: category,
        amount: amount
        };

        // props.addRecord(record);

        setName('');
        setType('');
        setCategory('');
        setAmount('');
    };

	// Add data into table
	const addRecord = (record) => {
		setRecords([...records, record]);
	};

	// Get date and time
	const now = moment();

	return (
		<div className="app">
			<div className="app_title">
				<h1>Expense Tracker</h1>
			</div>

			<div className="records">
				<RecordTable records={records} />
			</div>
			
			
			<RecordTable records={records} />
			<RecordForm addRecord={addRecord} />

			<form className="add_new" onSubmit={handleSubmit}>
				<div className='label-inputs'>
					<label htmlFor="activity-input">Name</label>
					<Input id="activity-input" placeholder="Activity" />
				</div>
				
				<div className="label-inputs date_picker">
					<label htmlFor="date-input">Date</label>
					<DatePicker id="date-input" defaultValue={now} />
					<TimePicker defaultValue={now} format={'HH:mm'} />
				</div>

				<div className="label-inputs type-cat">
					<label htmlFor="type-input">Type</label>
					<RadioSelector id="type-input" />
				</div>
				
				<div className="label-inputs">
					<label htmlFor="amount-input">Amount</label>
					<InputNumber
						id="amount-input"
						placeholder="Amount"
						min={0}
						formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				</div>
				
			</form>
			
		</div>
	);
}

export default App;