import React from 'react'
import TransactionForm from '../components/TransactionForm';
import DataTable from '../components/DataTable';
import {useState, useEffect} from 'react';

export const Home = () => {
    const [transaction, setTransaction] = useState([])
    const [editTransaction, setEditTransaction] = useState({});
    useEffect(() => {
        fetchTransaction();
    }, [])
    async function fetchTransaction() {
        const res = await fetch("http://localhost:4000/api/v1/transaction");
        const { data } = await res.json();
        setTransaction(data);
        // console.log(data);
    }
    return (
        <div>
            <TransactionForm fetchTransaction={fetchTransaction} editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
            <br />
            <br />
            <DataTable transaction={transaction} fetchTransaction={fetchTransaction} setEditTransaction={setEditTransaction} />
        </div>
    )
}