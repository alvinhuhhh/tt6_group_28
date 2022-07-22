import Exr from "./Exchange-rate.json";
import Wallet from "./Wallet.json";
import userConfirm from "./wallet-display"

export default function Dashboard() {
  return (
    <div classexchange_currency="App" 
    style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        gridGap: 20, 
        height:'50vh',
        backgroundImage:"url('https://www.hardwarezone.com.sg/thumbs/689398/a.jpg')" }}>
    <div style={{color:'white'}}>  

      <table > 
{/* replace 0 with id variable  */}
        <th>Hello! Welcome to your {Wallet[0].user_id} </th>
        <tr>
          <th>Account: {Wallet[0].name}</th>
          <th></th>
        </tr>
        <tr>
            <th>Currency</th>
            <th>Amount</th>
        </tr>
        <tr>
          <td>{Exr[0].base_currency}</td>
          <td>{Exr[0].exchange_currency}</td>
          <td>{Exr[0].rate}</td>
        </tr>
      </table>
    </div>
    <div style={{color:'white', backgroundColor:'gray', opacity:"85%"}}>  
      <table>
        <th>Exchange Rates</th>
        <tr>
          <th>Base Currency</th>
          <th>Exchange Currency</th>
          <th>Rate</th>

        </tr>
        <tr>
          <td>{Exr[0].base_currency}</td>
          <td>{Exr[0].exchange_currency}</td>
          <td>{Exr[0].rate}</td>
        </tr>
        <tr>
          <td>{Exr[1].base_currency}</td>
          <td>{Exr[1].exchange_currency}</td>
          <td>{Exr[1].rate}</td>

        </tr>
        <tr>
          <td>{Exr[2].base_currency}</td>
          <td>{Exr[2].exchange_currency}</td>
          <td>{Exr[2].rate}</td>
        </tr>
        <tr>
          <td>{Exr[3].base_currency}</td>
          <td>{Exr[3].exchange_currency}</td>
          <td>{Exr[3].rate}</td>
        </tr>
        <tr>
          <td>{Exr[4].base_currency}</td>
          <td>{Exr[4].exchange_currency}</td>
          <td>{Exr[4].rate}</td>
        </tr>
        <tr>
          <td>{Exr[5].base_currency}</td>
          <td>{Exr[5].exchange_currency}</td>
          <td>{Exr[5].rate}</td>
        </tr>
        <tr>
          <td>{Exr[6].base_currency}</td>
          <td>{Exr[6].exchange_currency}</td>
          <td>{Exr[6].rate}</td>
        </tr>
        <tr>
          <td>{Exr[7].base_currency}</td>
          <td>{Exr[7].exchange_currency}</td>
          <td>{Exr[7].rate}</td>
        </tr>
        <tr>
          <td>{Exr[8].base_currency}</td>
          <td>{Exr[8].exchange_currency}</td>
          <td>{Exr[8].rate}</td>
        </tr>
        <tr>
          <td>{Exr[9].base_currency}</td>
          <td>{Exr[9].exchange_currency}</td>
          <td>{Exr[9].rate}</td>
        </tr>
        <tr>
          <td>{Exr[10].base_currency}</td>
          <td>{Exr[10].exchange_currency}</td>
          <td>{Exr[10].rate}</td>
        </tr>
      </table>
    </div>
    </div>
  );
}