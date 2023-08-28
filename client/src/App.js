import {useState, useEffect} from 'react';

function App() {
  const [form, setform] = useState({
    amount: 0,
    description: "",
    date: ""
  });
  const [transaction, setTransaction] = useState([])
  useEffect(()=>{
    fetchTransaction();
  }, [])
  async function fetchTransaction(){
    const res = await fetch("http://localhost:4000/api/v1/g_transaction");
    const {data} = await res.json();
    setTransaction(data);
    console.log(data);
  }
  function handleInput(e){
    console.log(e.target.value);
    setform({...form, [e.target.name]: e.target.value})
  }
  async function handleSubmit(e){
    // console.log(form);
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/v1/p_transaction', {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data)
    if(res.ok){
      fetchTransaction();
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name='amount' value={form.amount} onChange={handleInput} placeholder="Enter transaction amount" />
        <input type="text" name='description' value={form.description} onChange={handleInput} placeholder="Enter transaction details" />
        <input type="date" name='date' value={form.date} onChange={handleInput} />
        <button type="submit">SUBMIT</button>
      </form>
      <br/>
      <br/>
      <section>
        <table>
        <thead>
        <th>Amount</th>
        <th>Description</th>
        <th>Date</th>
        </thead>
        <tbody>
          {transaction.map((trx)=>(
            <tr key={trx._id}>
              <td>{trx.amount}</td>
              <td>{trx.description}</td>
              <td>{trx.date}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </section>

    </div>
  );
}

export default App;