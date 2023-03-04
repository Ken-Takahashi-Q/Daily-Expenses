import React from 'react';
import './RecordTable.css';

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
                    <td>
                        {record.type === "income" ? (
                            <div>
                            <span style={{ color: "green" }}>Income / </span>
                            <span style={{ color: "gray" }}>payment</span>
                            </div>
                        ) : (
                            "payment"
                        )}
                    </td>
                    <td>{record.category}</td>
                    <td>{record.amount}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

export default RecordTable;