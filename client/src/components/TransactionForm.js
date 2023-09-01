import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';

const initialForm = {
    amount: 0,
    description: "",
    date: null, // Use null or a valid Date object
}

export default function TransactionForm({fetchTransaction}) {
    const [form, setForm] = React.useState(initialForm);

    function handleInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Convert the date string to a Date object
        const dateObject = new Date(form.date);

        const res = await fetch('http://localhost:4000/api/v1/transaction', {
            method: "POST",
            body: JSON.stringify({ ...form, date: dateObject }),
            headers: {
                "content-type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            fetchTransaction();
        }
        setForm(initialForm);
    }

    return (
        <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <CardContent>
                <Typography variant="h6" sx={{marginBottom: 2}}>
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
                            inputFormat="MM/DD/YYYY"
                            size="small"
                            value={form.date}
                            onChange={(newDate) => setForm({ ...form, date: newDate })}
                            sx={{
                                marginRight: 5,
                            }}
                            renderInput={(params) => (
                                <TextField size='small' {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
