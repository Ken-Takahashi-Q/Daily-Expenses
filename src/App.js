import React, { useState } from 'react';
import './App.css';
import { Input, TimePicker, DatePicker, Radio } from 'antd';
import moment from 'moment';

import RecordForm from './RecordForm';
import RecordTable from './RecordTable';
import RadioSelector from './RadioSelector';

function App() {
	const [isAddNew, setIsAddNew] = useState(false);
	const [records, setRecords] = useState([]);
	

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

			<div className="add_new">
				<Input placeholder="Activity" />
				<div className="date_picker">
					<DatePicker defaultValue={now} />
					<TimePicker defaultValue={now} format={'HH:mm'} />
				</div>

				<RadioSelector />

				<>
				<Radio.Group buttonStyle="solid">
					<Radio.Button value="a">Hangzhou</Radio.Button>
					<Radio.Button value="b">Shanghai</Radio.Button>
					<Radio.Button value="c">Beijing</Radio.Button>
					<Radio.Button value="d">Chengdu</Radio.Button>
				</Radio.Group>
				</>
			</div>
			
		</div>
	);
}

export default App;