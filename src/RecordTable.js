import React from 'react';
import './RecordTable';

function RecordTable(props) {
    const records = props.records;

    return (
        <table>
        <thead>
            <tr>
            <th>Date and Time</th>
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {records.map((record, index) => (
            <tr key={index}>
                <td>{record.dateTime}</td>
                <td>{record.name}</td>
                <td>{record.type}</td>
                <td>{record.category}</td>
                <td>{record.amount}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}

export default RecordTable;