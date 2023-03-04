import React, { useState } from 'react';
import { Form, Input, TimePicker, DatePicker, Radio, InputNumber, Button, Table } from 'antd';
import './AddRecord.css';
import moment from 'moment';

export default function AddRecord() {
	// Record data
	// Record data
	const [nameInput, setNameInput] = useState('');
	const [dateInput, setDateInput] = useState('');
	const [timeInput, setTimeInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

	// Submit and clear data
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	

	// const handleSubmit = (values) => {
	// 	const newData = [...data, values];
	// 	setData(newData);
	// 	form.resetFields();
	// };

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			const newData = {
				key: data.length + 1,
				name: values.activity,
				date: `${moment(values.date).format('DD/MM/YYYY')} ${moment(values.time).format('HH:mm')}`,
				type: selectedButton,
				category: selectedCat,
				amount: values.amount,
			};
			setData([...data, newData]);
			form.resetFields();
		});
	};

	const columns = [
		{
		  title: 'Name',
		  dataIndex: 'Name',
		  sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
		  title: 'Date-time',
		  dataIndex: 'date',
		  sorter: (a, b) => new Date(a.date) - new Date(b.date),
		},
		{
		  title: 'Type',
		  dataIndex: 'type',
		  sorter: (a, b) => a.type.localeCompare(b.type),
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: (a, b) => a.type.localeCompare(b.type),
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			sorter: (a, b) => a.type.localeCompare(b.type),
		},
	];

	// Changing color depends on type
	const [selectedButton, setSelectedButton] = useState(null);
	const [selectedCat, setSelectedCat] = useState(null);

	const handleTypeChange = (e) => {
		setSelectedButton(e.target.value);
	};

	const handleCatChange = (e) => {
		setSelectedCat(e.target.value);
	};

	// Get date and time as default
	const now = moment();

	return (
		<Form form={form} onFinish={handleSubmit}>

			<Form.Item label="Name" name="activity">
				<Input placeholder="Activity" name="activity" />
			</Form.Item>

			<Form.Item label="Date">
				<DatePicker defaultValue={now} />
				<TimePicker defaultValue={now} format={'HH:mm'}  />
			</Form.Item>

			<Form.Item label="Type">
				<Radio.Group buttonStyle="solid" onChange={handleTypeChange}>
					<Radio.Button
						value="income"
						className="custom_button"
						style={{ background: selectedButton === 'income' ? 'var(--income-color)' : 'white' }}
					>
						Income
					</Radio.Button>

					<Radio.Button
						value="payment"
						className="custom_button"
						style={{ background: selectedButton === 'payment' ? 'var(--payment-color)' : 'white' }}
					>
						Payment
					</Radio.Button>
				</Radio.Group>
			</Form.Item>

			<Form.Item label="Category">
				{selectedButton === 'income' && (
					<Radio.Group buttonStyle="solid" onChange={handleCatChange}>
					<Radio.Button
						value="salary"
						className="custom_button"
						style={{ background: selectedCat === 'salary' ? 'var(--income-color)' : 'white' }}
					>
						Salary
					</Radio.Button>

					<Radio.Button
						value="bonus"
						className="custom_button"
						style={{ background: selectedCat === 'bonus' ? 'var(--income-color)' : 'white' }}
					>
						Bonus
					</Radio.Button>

					<Radio.Button
						value="investment"
						className="custom_button"
						style={{ background: selectedCat === 'investment' ? 'var(--income-color)' : 'white' }}
					>
						Investment
					</Radio.Button>

					<Radio.Button
						value="sell"
						className="custom_button"
						style={{ background: selectedCat === 'sell' ? 'var(--income-color)' : 'white' }}
					>
						Sell
					</Radio.Button>

					<Radio.Button
						value="borrow"
						className="custom_button"
						style={{ background: selectedCat === 'borrow' ? 'var(--income-color)' : 'white' }}
					>
						Borrow
					</Radio.Button>

					<Radio.Button
						value="others"
						className="custom_button"
						style={{ background: selectedCat === 'others' ? 'var(--income-color)' : 'white' }}
					>
						Others
					</Radio.Button>
					</Radio.Group>
				)}
				
				{selectedButton === 'payment' && (
					<Radio.Group buttonStyle="solid" onChange={handleCatChange}>
					<Radio.Button
						value="food"
						className="custom_button"
						style={{ background: selectedCat === 'food' ? 'var(--payment-color)' : 'white' }}
					>
						Food
					</Radio.Button>

					<Radio.Button
						value="travel"
						className="custom_button"
						style={{ background: selectedCat === 'travel' ? 'var(--payment-color)' : 'white' }}
					>
						Travel
					</Radio.Button>

					<Radio.Button
						value="grocery"
						className="custom_button"
						style={{ background: selectedCat === 'grocery' ? 'var(--payment-color)' : 'white' }}
					>
						Grocery
					</Radio.Button>

					<Radio.Button
						value="shopping"
						className="custom_button"
						style={{ background: selectedCat === 'shopping' ? 'var(--payment-color)' : 'white' }}
					>
						Shopping
					</Radio.Button>

					<Radio.Button
						value="rental"
						className="custom_button"
						style={{ background: selectedCat === 'rental' ? 'var(--payment-color)' : 'white' }}
					>
						Rental
					</Radio.Button>

					<Radio.Button
						value="bill"
						className="custom_button"
						style={{ background: selectedCat === 'bill' ? 'var(--payment-color)' : 'white' }}
					>
						Bill
					</Radio.Button>

					<Radio.Button
						value="payback"
						className="custom_button"
						style={{ background: selectedCat === 'payback' ? 'var(--payment-color)' : 'white' }}
					>
						Refund
					</Radio.Button>

					<Radio.Button
						value="others"
						className="custom_button"
						style={{ background: selectedCat === 'others' ? 'var(--payment-color)' : 'white' }}
					>
						Others
					</Radio.Button>
				</Radio.Group>
				)}
			</Form.Item>

			<Form.Item label="Amount" name="amount">
				<InputNumber
					placeholder="Amount"
					min={0}
					formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				/>
			</Form.Item>
			
			<div className="button_container">
				<Button type="primary" className="submit_button" onClick={handleSubmit}>Add</Button>
			</div>

			<Table dataSource={data} columns={columns} />
		</Form>
	);
}
