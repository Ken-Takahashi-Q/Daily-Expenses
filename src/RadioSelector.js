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
		<>
		<Radio.Group buttonStyle="solid" onChange={handleTypeChange}>
			<Radio.Button
				value="income"
				className="custom_button_type"
				id="income"
				style={{ background: selectedButton === 'income' ? '#60d160' : 'white' }}
			>
				Income
			</Radio.Button>

			<Radio.Button
				value="payment"
				className="custom_button_type"
				id="payment"
				style={{ background: selectedButton === 'payment' ? '#e06648' : 'white' }}
			>
				Payment
			</Radio.Button>
		</Radio.Group>

		{selectedButton === 'income' && (
			<Radio.Group buttonStyle="solid" onChange={handleCatChange} buttonClass="custom_button_cat green">
			<Radio.Button
				value="income"
				className="custom_button_cat green"
			>
				Salary
			</Radio.Button>

			<Radio.Button
				value="dividend"
				className="custom_button_cat green"
			>
				Bonus
			</Radio.Button>

			<Radio.Button
				value="investment"
				className="custom_button_cat green"
			>
				Investment
			</Radio.Button>

			<Radio.Button
				value="sell"
				className="custom_button_cat green"
			>
				Sell
			</Radio.Button>

			<Radio.Button
				value="business"
				className="custom_button_cat green"
			>
				Business
			</Radio.Button>

			<Radio.Button
				value="borrow"
				className="custom_button_cat green"
			>
				Borrow
			</Radio.Button>

			<Radio.Button
				value="others"
				className="custom_button_cat green"
			>
				Others
			</Radio.Button>
		</Radio.Group>
		)}

		</>
	);
}

export default RadioSelector;
