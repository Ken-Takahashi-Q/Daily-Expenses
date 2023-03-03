import React, { useState } from 'react';
import './RecordForm.css';

function RecordForm(props) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const record = {
        name: name,
        type: type,
        category: category,
        amount: amount
        };

        props.addRecord(record);

        setName('');
        setType('');
        setCategory('');
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
            Type:
            <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="income">Income</option>
            <option value="payment">Payment</option>
            </select>
        </label>
        <label>
            Category:
            <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
        </label>
        <label>
            Amount:
            <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
        </label>
        <button type="submit">Add Record</button>
        </form>
    );
}

export default RecordForm;
