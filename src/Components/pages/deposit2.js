import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   email: "",
   password: "",
   amount:"",
   balance: 100,
   records: [],
 });
 const [amount, setAmount] = useState('');
 const params = useParams();
 const history = useHistory();
 const newBalance = Number(form.balance);
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3001/account/findOne/${id}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       history.push("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, history]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     balance: Number(newBalance)+Number(amount)
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3001/deposit/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
   alert ("Success! Deposit made.")
   history.push("/alldata/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Make a deposit for {form.name}</h3>
     <form onSubmit={onSubmit}>
        <div className = "form-group">
          Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
        </div>
       <div className="form-group">
         <label htmlFor="balance">Balance: </label>
         <input
           type="number"
           className="form-control"
           id="balance"
           value={form.balance}
           onChange={(e) => updateForm({ balance: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}