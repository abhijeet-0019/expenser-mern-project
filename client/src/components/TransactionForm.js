import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import dayjs from 'dayjs';

const initialForm = {
    amount: 0,
    description: "",
    date: new Date(),
}

export default function TransactionForm({ fetchTransaction, editTransaction, setEditTransaction }) {
    const [form, setForm] = React.useState(initialForm);

    React.useEffect(() => {
        if (!editTransaction.amount) {
            console.log("empty");
        } else {
            console.log("filled");
            setForm({
                ...form,
                amount: editTransaction.amount,
                description: editTransaction.description,
                date: editTransaction.date,
            });
        }
    }, [editTransaction])

    function handleInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleDate(newValue) {
        setForm({ ...form, date: newValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = (editTransaction.amount)? update(): create();
    }

    function reload(res){
        if (res.ok) {
            fetchTransaction();
        }
        setForm(initialForm);
        setEditTransaction({})
    }

    async function create(){
        // Convert the date string to a Date object
        const res = await fetch('http://localhost:4000/api/v1/transaction', {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json"
            }
        });
        reload(res);
    }
    async function update(){
        const dateObject = new Date(form.date);
        const res = await fetch(`http://localhost:4000/api/v1/transaction/${editTransaction._id}`, {
            method: "PATCH",
            body: JSON.stringify({...form, date: dateObject}),
            headers: {
                "content-type": "application/json"
            }
        })
        reload(res);
    }

    return (
        <Container>
            <Card sx={{ minWidth: 275, marginTop: 10 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Add new Transaction
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            value={form.amount}
                            onChange={handleInput}
                            sx={{ marginRight: 5 }}
                            size="small"
                            id="outlined-basic-amount"
                            label="Amount"
                            variant="outlined"
                            name="amount"
                        />
                        <TextField
                            value={form.description}
                            onChange={handleInput}
                            sx={{ marginRight: 5 }}
                            size="small"
                            id="outlined-basic-description"
                            label="Transaction Details"
                            variant="outlined"
                            name="description"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Transaction Date"
                                inputFormat="DD/MM/YYYY"
                                size="small"
                                value={dayjs(form.date)}
                                onChange={handleDate}
                                renderInput={(params) => (
                                    <TextField sx={{ marginRight: 5, marginTop: '10px' }} size='small' {...params} />
                                )}
                            />
                        </LocalizationProvider>
                        {
                            (editTransaction.amount) ? (
                                <Button type="submit" variant="secondary">
                                    Update
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" sx={{marginLeft: 5}}>
                                    Submit
                                </Button>
                            )
                        }
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}
