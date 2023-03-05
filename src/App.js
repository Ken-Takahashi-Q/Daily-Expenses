import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import './App.css';
import { Form, Input, TimePicker, DatePicker, Radio, InputNumber, Button, Table } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment';

function App() {
	// Show input form when isAddNew
	const [wantToAdd, setWantToAdd] = useState(false);
	const [isAddNew, setIsAddNew] = useState(false);

	const handleAddNew = () => {
		setIsAddNew(true);
		setToggleFind(false);
		setToggleEdit(false);
	}

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
		setWantToAdd(false);
	};

	const handleAddPaymentCat = () => {
		// If new input is already in payment category, don't add new
		if (addPaymentCat !== '' && !paymentCat.includes(addPaymentCat)) {
			setPaymentCat([...paymentCat, addPaymentCat]);
		}
		setAddPaymentCat('');
		setWantToAdd(false);
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
			sorter: (a, b) => {
				if (a.activity === undefined || a.activity === null) {
				  return -1;
				}
				if (b.activity === undefined || b.activity === null) {
				  return 1;
				}
				return a.activity.localeCompare(b.activity);
			  }
			  
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
		setToggleEdit(false);
		setToggleFind(!toggleFind);
	};
	const handleFilterCancel = () => {
		setCatFilter(null);
		setToggleFind(false);
	};

	// Edit existing category
	const [toggleEdit, setToggleEdit] = useState(false);
	const [catToDel, setCatToDel] = useState(null)

	const handleEditCat = (e) => {
		setToggleEdit(!toggleEdit);
		setToggleFind(false);
	};
	const handleDelSelect = (e) => {
		setCatToDel(e.target.value);
		console.log(catToDel);
	};
	
	const handleCatDel = () => {
		if (catToDel) {
		  const updatedIncomeCat = incomeCat.filter(category => category !== catToDel);
		  const updatedPaymentCat = paymentCat.filter(category => category !== catToDel);
	  
		  if (updatedIncomeCat.length !== incomeCat.length) {
			setIncomeCat(updatedIncomeCat);
		  } else if (updatedPaymentCat.length !== paymentCat.length) {
			setPaymentCat(updatedPaymentCat);
		  }
	  
		  setCatToDel(null);
		}
	};

	return (
		<body>
			<div className="app_title">
				<h1>Expense Tracker</h1>
			</div>
					
			<Table
				dataSource={catFilter ? data.filter((item) => item.category === catFilter) : data}
				columns={columns}
				style={{ width: "100%", height: "400px", marginBottom: "2rem"}}
				pagination={{ defaultPageSize: 6 }}
			/>

			{/* For filtering type and category */}
			<div className="menus" style={{visibility: toggleFind||toggleEdit ? 'visible': 'hidden', marginBottom: "1rem", transition: "0s"}}>
			{/* Create unvisible box */}
			{!toggleEdit ? 
				<>
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

				<div style={{ display: "flex", justifyContent: "center" }}>
				<Button className="close_form" onClick={handleFilterCancel} style={{width: "5rem"}}>Cancel</Button>
				</div>
				</> :
				null
			}
			{toggleEdit ? 
				<>
				<>
				<Radio.Group buttonStyle="solid" onChange={handleDelSelect}>
					{incomeCat.map((category) => {
						return (
							<Radio.Button key={category} value={category}
							check={category===catToDel}>
								{category}
							</Radio.Button>
						)
					})};

					{paymentCat.map((category) => {
						return (
							<Radio.Button key={category} value={category} check={category===catToDel}>
								{category}
							</Radio.Button>
						)
					})};
				</Radio.Group>
				</>

				<div style={{display: "flex", justifyContent: "center", gap: "1rem"}}>
					<Button onClick={handleCatDel} icon={<DeleteOutlined />} style={{width: "5rem", backgroundColor: "#ff6947"}}/>
					<Button className="close_form" onClick={() => setToggleEdit(false)} style={{width: "5rem"}}>Cancel</Button>
				</div>
				</> :
				null
			}
			</div>

			{/* 3 buttons, Filter, Add new, Edit cat */}
			<div className="buttons_container" style={{visibility: isAddNew ? 'hidden' : 'visible'}}>
				<Button
					onClick={handleFilter}
					style={{height: "80%", width:"8rem", fontSize: "18px", fontWeight: "700", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
					Filter
				</Button>

				<Button onClick={handleAddNew} style={{height: "100%", width:"8rem", color: "white", backgroundColor: "var(--add-btn-color)", fontSize: "18px", fontWeight: "700", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
					Add new
				</Button>

				<Button
					onClick={handleEditCat}
					style={{height: "80%", width:"8rem", fontSize: "18px", fontWeight: "700", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
					Delete category
				</Button>
			</div>

			{/* When 'Add new' is clicked, show input fields */}
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
							// console.log("category:", category);
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

		</body>
	);
}

export default App;