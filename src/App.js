import React, { useState } from 'react';
import './App.css';
import { Input, TimePicker, DatePicker } from 'antd';

import RecordForm from './RecordForm';
import RecordTable from './RecordTable';

function App() {
	const [isAddNew, setIsAddNew] = useState(false);
	const [records, setRecords] = useState([]);

	const addRecord = (record) => {
		setRecords([...records, record]);
	};

	return (
		<div className="app">
			<div className="app_title">
				<h1>Income and Expenses Tracking</h1>
			</div>
			
			<RecordForm addRecord={addRecord} />
			<RecordTable records={records} />

			<div className="add_new">
				<Input placeholder="Activity" />
				<DatePicker />
				<TimePicker />
			</div>
			
		</div>
	);
}

export default App;