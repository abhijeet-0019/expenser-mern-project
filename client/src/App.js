import {useState, useEffect} from 'react';
import Appbar from './components/Appbar';
import TransactionForm from './components/TransactionForm';
import DataTable from './components/DataTable';

function App() {
  const [transaction, setTransaction] = useState([])
  useEffect(()=>{
    fetchTransaction();
  }, [])
  async function fetchTransaction(){
    const res = await fetch("http://localhost:4000/api/v1/transaction");
    const {data} = await res.json();
    setTransaction(data);
    console.log(data);
  }
  return (
    <div>
    <Appbar />
    <TransactionForm fetchTransaction={fetchTransaction}/>
      <br/>
      <br/>
      <DataTable transaction={transaction}/>
    </div>
  );
}

export default App;