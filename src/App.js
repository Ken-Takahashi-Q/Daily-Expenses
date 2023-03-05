import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import './App.css';
import { Form, Input, TimePicker, DatePicker, Radio, InputNumber, Button, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import moment from 'moment';

function App() {
	// Show input form when isAddNew
	const [wantToAdd, setWantToAdd] = useState(false);
	const [isAddNew, setIsAddNew] = useState(false);

	// Date & Time
	const [selectedDate, setSelectedDate] = useState("");
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleTimeChange = (time) => {
		setSelectedDate(moment(`${selectedDate.format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}`));
	};

	// For adding categories
	const [incomeCat, setIncomeCat] = useState(['salary', 'bonus', 'investment', 'sell', 'borrow', 'others']);
	const [addIncomeCat, setAddIncomeCat] = useState('');

	const [paymentCat, setPaymentCat] = useState(['food', 'travel', 'grocery', 'shopping', 'rental', 'bill', 'refund', 'others']);
	const [addPaymentCat, setAddPaymentCat] = useState('');

	const handleIncomeTyping = (e) => {
		setAddIncomeCat(e.target.value);
	};
	const handlePaymentTyping = (e) => {
		setAddPaymentCat(e.target.value);
	};
	const handleAddIncomeCat = () => {
		// If new input is already in income category, don't add new
		if (addIncomeCat !== '' && !incomeCat.includes(addIncomeCat)) {
		  setIncomeCat([...incomeCat, addIncomeCat]);
		}
		setAddIncomeCat('');
	};

	const handleAddPaymentCat = () => {
		// If new input is already in payment category, don't add new
		if (addPaymentCat !== '' && !paymentCat.includes(addPaymentCat)) {
			setPaymentCat([...paymentCat, addPaymentCat]);
		}
		setAddPaymentCat('');
	};
	  
	// Changing color depends on type
	const [selectedButton, setSelectedButton] = useState(null);
	const [selectedCat, setSelectedCat] = useState(null);

	const handleTypeChange = (e) => {
		setSelectedButton(e.target.value);
		console.log(catFilter);
	};

	const handleCatChange = (e) => {
		setSelectedCat(e.target.value);
	};

	// Formats of table
	const columns = [
		{
			title: 'Activity',
			dataIndex: 'activity',
			sorter: (a, b) => a.activity.localeCompare(b.name),
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
			render: (text, record) => {
				const isIncome = (record.type === 'income');
				return <span className={isIncome ? 'income_text_table' : 'payment_text_table'}>{text}</span>;
			}
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: (a, b) => a.type.localeCompare(b.type),
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount),
			render: (text, record) => {
				const amount = `${text} ฿`;
				const isIncome = record.type === 'income';
				return <span className={isIncome ? 'income_text_table' : 'payment_text_table'}>{amount}</span>;
			}
		},
	];
		
	// Submit, Add data into table, and clear data
	const [form] = Form.useForm();
	const [data, setData] = useLocalStorage('columns', [])

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			const newData = {
				key: data.length + 1,
				activity: values.activity,
				date: selectedDate.format("DD/MM/YYYY HH:mm"),
				type: selectedButton,
				category: selectedCat,
				amount: values.amount,
			};
			setData([...data, newData]);
			setIsAddNew(false);
			form.resetFields();
		});
	};

	// Get date and time to use as default
	const now = moment();

	// Menus and filter category
	const [toggleFind, setToggleFind] = useState(false);
	const [typeFilter, setTypeFilter] = useState(null);
	const [catFilter, setCatFilter] = useState(null);
	
	const handleFilter = (e) => {
		setCatFilter(e.target.value);
	};
	  
	  
	const handleFilterCancel = () => {
		setCatFilter(null);
		setToggleFind(false);
	}

	return (
		<div className="app">
			<div className="app_title">
				<h1>Expense Tracker</h1>
			</div>
					
			<Table
				dataSource={catFilter ? data.filter((item) => item.category === catFilter) : data}
				columns={columns}
				style={{ width: "100%", height: "400px", marginBottom: "2rem" }}
				pagination={{ defaultPageSize: 6 }}
			/>


			<div className="menus" style={{visibility: toggleFind ? 'visible': 'hidden', transition: "0s"}}>
				<>
				
				<Radio.Group buttonStyle="solid" onChange={handleFilter}>
					<Radio.Button value="income">Income</Radio.Button>
					{/* Render income buttons using incomeCat */}
					{incomeCat.map((category) => {
						return (
							<Radio.Button
							key={category}
							value={category}
							>
							{category}
							</Radio.Button>
						)
					})};

					<Radio.Button value="payment">Payment</Radio.Button>
					{paymentCat.map((category) => {
						return (
							<Radio.Button
							key={category}
							value={category}
							>
							{category}
							</Radio.Button>
						)
					})};
				</Radio.Group>
				</>

				<>
				<Button className="close_form" onClick={handleFilterCancel} style={{width: "5rem"}}>Cancel</Button>
				</>
			</div>


			<div className="buttons_container">
			<Button
				onClick={() => setToggleFind(!toggleFind)}
				style={{height: "80%", width:"8rem", fontSize: "18px", fontWeight: "700", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
				Find
			</Button>

			<Button onClick={() => setIsAddNew(true)} style={{height: "100%", width:"8rem", color: "white", backgroundColor: "var(--add-btn-color)", fontSize: "18px", fontWeight: "700", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
				Add new
			</Button>

			<Button style={{height: "80%", width:"8rem", fontSize: "18px", fontWeight: "700", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
				Edit category
			</Button>
			</div>

			{isAddNew && (
				<div className={`add_new ${isAddNew ? 'slide-up' : ''}`}>
				<Form form={form} onFinish={handleSubmit}>

				<Form.Item label="Activity" name="activity">
					<Input placeholder="Your activity" />
				</Form.Item>

				<Form.Item label="Date">
					<DatePicker value={selectedDate} onChange={handleDateChange} format={'DD/MM/YYYY'} />
					<TimePicker value={selectedDate} onChange={handleTimeChange} format={'HH:mm'} />
				</Form.Item>

				<Form.Item
					label="Type"
					name="type"
					rules={[{ required: true, message: 'Type is required' }]}
				>
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
						
						{/* Render income buttons using incomeCat */}
						{incomeCat.map((category) => {
							return (
								<Radio.Button
								key={category}
								value={category}
								className="custom_button"
								style={{ background: selectedCat === category ? 'var(--income-color)' : 'white' }}
								>
								{category}
								</Radio.Button>
							)
						})};

						{/* Add new incomeCat */}
						<div style={{display: "flex", marginTop: "1rem"}}>
							{ !wantToAdd && <Button type="dashed" onClick={() => setWantToAdd(true)}>Add new category</Button> }
							
							{ wantToAdd && (
								<div style={{ display: 'flex', alignItems: 'center' }}>
								<Input placeholder="Add new income category" value={addIncomeCat} onChange={handleIncomeTyping} />
								<Button type="primary" onClick={handleAddIncomeCat} style={{marginRight: "0.5rem"}}>Add</Button>
								<Button onClick={() => setWantToAdd(false)} icon={<CloseOutlined />} style={{width: "2.5rem"}}/>
								</div>
							)}
						</div>

						</Radio.Group>
					)}
					
					{selectedButton === 'payment' && (
						<Radio.Group buttonStyle="solid" onChange={handleCatChange}>
						{/* Render payment buttons using paymentCat */}
						{paymentCat.map((category) => {
							console.log("category:", category);
							return (
								<Radio.Button
								key={category}
								value={category}
								className="custom_button"
								style={{ background: selectedCat === category ? 'var(--payment-color)' : 'white' }}
								>
								{category}
								</Radio.Button>
							)
						})};

						{/* Add new paymentCat */}
						<div style={{display: "flex", marginTop: "1rem"}}>
							{ !wantToAdd && <Button type="dashed" onClick={() => setWantToAdd(true)}>Add new category</Button> }
							
							{ wantToAdd && (
								<div style={{ display: 'flex', alignItems: 'center' }}>
								<Input placeholder="Add new payment category" value={addPaymentCat} onChange={handlePaymentTyping} />
								<Button type="primary" onClick={handleAddPaymentCat} style={{marginRight: "0.5rem"}}>Add</Button>
								<Button onClick={() => setWantToAdd(false)} icon={<CloseOutlined />} style={{width: "2.5rem"}}/>
								</div>
							)}
						</div>
						</Radio.Group>
					)}
				</Form.Item>

				<Form.Item
					label="Amount"
					name="amount"
					rules={[
						{
						  required: true,
						  message: 'Price is required',
						},
					  ]}
				>
					<InputNumber
						placeholder="Amount"
						min={0}
						formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				</Form.Item>

				<div className="button_container">
					<Button type="primary" className="submit_button" onClick={handleSubmit} style={{width: "5rem"}}>Finish</Button>
					<Button className="close_form" onClick={() => setIsAddNew(false)} style={{width: "5rem"}}>Cancel</Button>
				</div>

				</Form>
				</div>
				)}

		</div>
	);
}

export default App;