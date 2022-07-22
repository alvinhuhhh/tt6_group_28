import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Transaction.css";

export default function Transaction({ ...props }) {
  const navigate = useNavigate();
  const params = useParams();

  const [transaction, setTransaction] = useState({
    id: undefined,
    wallet_id: parseInt(params.wallet_id),
    debit_id: undefined,
    debit_currency: "SGD",
    debit_amount: 0,
    credit_id: undefined,
    credit_currency: "SGD",
    credit_amount: 0,
    description: "",
    created_at: undefined,
    created_by: undefined,
    updated_at: undefined,
    updated_by: undefined,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCurrency = (event) => {
    const { name, value } = event.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = (event) => {
    navigate("/dashboard");
  };

  const handleSubmit = async (event) => {
    try {
      let transactionClone = { ...transaction };
      transactionClone.created_at = new Date();
      transactionClone.created_by = window.sessionStorage.getItem("username");
      let response = await axios.post("url", transactionClone);
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    console.log(transaction);
  }, []);

  return (
    <div>
      <div>
        <h1>Make a Transaction</h1>
      </div>
      <div>
        <h1>Wallet: </h1>
      </div>

      <div>
        <h1>Credit</h1>
        <div>
          <label htmlFor="credit_currency">Currency</label>
          <select
            name="credit_currency"
            value={transaction.credit_currency}
            onChange={handleChangeCurrency}
          >
            <option value="SGD">Singapore Dollars</option>
            <option value="CNH">Chinese RMB</option>
            <option value="EUR">Euros</option>
            <option value="HKD">Hong Kong Dollars</option>
            <option value="JPY">Japanese Yen</option>
            <option value="NZD">New Zealand Dollars</option>
            <option value="NOK">Singapore Dollars</option>
            <option value="GBP">British Pounds</option>
            <option value="SEK">Swedish Krona</option>
            <option value="THB">Thai Baht</option>
            <option value="USD">US Dollars</option>
          </select>
          <br />
          <label htmlFor="credit_amount">Amount: </label>
          <input
            name="credit_amount"
            type="number"
            value={transaction.credit_amount}
            onChange={handleInputChange}
          ></input>
        </div>
        <h1>Debit</h1>
        <div>
          <label htmlFor="debit_currency">Currency</label>
          <select
            name="debit_currency"
            value={transaction.debit_currency}
            onChange={handleChangeCurrency}
          >
            <option value="SGD">Singapore Dollars</option>
            <option value="CNH">Chinese RMB</option>
            <option value="EUR">Euros</option>
            <option value="HKD">Hong Kong Dollars</option>
            <option value="JPY">Japanese Yen</option>
            <option value="NZD">New Zealand Dollars</option>
            <option value="NOK">Singapore Dollars</option>
            <option value="GBP">British Pounds</option>
            <option value="SEK">Swedish Krona</option>
            <option value="THB">Thai Baht</option>
            <option value="USD">US Dollars</option>
          </select>
          <br />
          <label htmlFor="debit_amount">Amount: </label>
          <input
            name="debit_amount"
            type="number"
            value={transaction.debit_amount}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <br />
      <div>
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          rows="4"
          value={transaction.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <br />
      <div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
