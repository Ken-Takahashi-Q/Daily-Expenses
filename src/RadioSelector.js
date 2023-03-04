import React, { useState } from 'react';
import { Radio } from 'antd';
import './RadioSelector.css';

function RadioSelector() {
	const [selectedButton, setSelectedButton] = useState(null);
	const [selectedCat, setSelectedCat] = useState(null);

	const handleTypeChange = (e) => {
		setSelectedButton(e.target.value);
	};

	const handleCatChange = (e) => {
		setSelectedCat(e.target.value);
	};

	return (
		<div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>

		<>
		<Radio.Group buttonStyle="solid" onChange={handleTypeChange}>
			<Radio.Button
				value="income"
				className="custom_button_type"
				style={{ background: selectedButton === 'income' ? 'var(--income-color)' : 'white' }}
			>
				Income
			</Radio.Button>

			<Radio.Button
				value="payment"
				className="custom_button_type"
				style={{ background: selectedButton === 'payment' ? 'var(--payment-color)' : 'white' }}
			>
				Payment
			</Radio.Button>
		</Radio.Group>
		</>

		<>
		{selectedButton === 'income' && (
			<Radio.Group buttonStyle="solid" onChange={handleCatChange} buttonClass="custom_button_cat green">
			<Radio.Button
				value="salary"
				style={{ background: selectedCat === 'salary' ? 'var(--income-color)' : 'white' }}
			>
				Salary
			</Radio.Button>

			<Radio.Button
				value="bonus"
				style={{ background: selectedCat === 'bonus' ? 'var(--income-color)' : 'white' }}
			>
				Bonus
			</Radio.Button>

			<Radio.Button
				value="investment"
				style={{ background: selectedCat === 'investment' ? 'var(--income-color)' : 'white' }}
			>
				Investment
			</Radio.Button>

			<Radio.Button
				value="sell"
				style={{ background: selectedCat === 'sell' ? 'var(--income-color)' : 'white' }}
			>
				Sell
			</Radio.Button>

			<Radio.Button
				value="borrow"
				style={{ background: selectedCat === 'borrow' ? 'var(--income-color)' : 'white' }}
			>
				Borrow
			</Radio.Button>

			<Radio.Button
				value="others"
				style={{ background: selectedCat === 'others' ? 'var(--income-color)' : 'white' }}
			>
				Others
			</Radio.Button>
		</Radio.Group>
		)}
		
		{selectedButton === 'payment' && (
			<Radio.Group buttonStyle="solid" onChange={handleCatChange} buttonClass="custom_button_cat green">
			<Radio.Button
				value="food"
				style={{ background: selectedCat === 'food' ? 'var(--payment-color)' : 'white' }}
			>
				Food
			</Radio.Button>

			<Radio.Button
				value="travel"
				style={{ background: selectedCat === 'travel' ? 'var(--payment-color)' : 'white' }}
			>
				Travel
			</Radio.Button>

			<Radio.Button
				value="grocery"
				style={{ background: selectedCat === 'grocery' ? 'var(--payment-color)' : 'white' }}
			>
				Grocery
			</Radio.Button>

			<Radio.Button
				value="shopping"
				style={{ background: selectedCat === 'shopping' ? 'var(--payment-color)' : 'white' }}
			>
				Shopping
			</Radio.Button>

			<Radio.Button
				value="rental"
				style={{ background: selectedCat === 'rental' ? 'var(--payment-color)' : 'white' }}
			>
				Rental
			</Radio.Button>

			<Radio.Button
				value="bill"
				style={{ background: selectedCat === 'bill' ? 'var(--payment-color)' : 'white' }}
			>
				Bill
			</Radio.Button>

			<Radio.Button
				value="payback"
				style={{ background: selectedCat === 'payback' ? 'var(--payment-color)' : 'white' }}
			>
				Pay back
			</Radio.Button>

			<Radio.Button
				value="others"
				style={{ background: selectedCat === 'others' ? 'var(--payment-color)' : 'white' }}
			>
				Others
			</Radio.Button>
		</Radio.Group>
		)}
		</>

		</div>
	);
}

export default RadioSelector;
