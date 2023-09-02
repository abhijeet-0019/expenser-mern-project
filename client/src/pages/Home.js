import React from 'react'
import TransactionForm from '../components/TransactionForm';
import DataTable from '../components/DataTable';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

export const Home = () => {
    const [transaction, setTransaction] = useState([])
    const [editTransaction, setEditTransaction] = useState({});
    useEffect(() => {
        fetchTransaction();
    }, [])
    async function fetchTransaction() {
        const token = Cookies.get('token');
        console.log("--->", token);
        const res = await fetch("http://localhost:4000/api/v1/transaction", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await res.json();
        console.log("-->",data);
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