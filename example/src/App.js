import React, {Component} from 'react'
import { AlgoButton, Field, Radio, AlgoSendButton, Pipeline} from 'pipeline-express-react'
import './index.css'
import logo from './pipeline-express.svg'

const myAlgoWallet = Pipeline.init();
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      main: true,
      myAddress: "",
      recipient: "2OWDII7AOVTNHA4YRFUGTUITOW62UAAQ7L7WJX7AXY34JZVBYFU65T7MV4",
      amount: 0,
      note: "",
      txID: ""
    }
  }

  inputRecipient = (event) => {
    this.setState({ recipient: event.target.value });
  }

  inputAmount = (event) => {
    this.setState({amount: event.target.value});
  }

  inputNote = (event) => {
    this.setState({note: event.target.value});
  }

  handleCheckChange = () => {
  this.setState({main: ! this.state.main}, () => Pipeline.main = this.state.main)

  }
}

	fetchBalance = () => {
		// Remove the current balance (so the UI doesn't display it while fetching)
		this.setState({ balance: "" });
		Pipeline.balance(this.state.myAddress).then(
			data => {
				this.setState({ balance: data });
			}
		);
	}
render() {
		let explorerBaseLink;
		explorerBaseLink = (
			Pipeline.main ? 
			'https://algoexplorer.io/tx/' : 
			'https://testnet.algoexplorer.io/tx/'
		);
		

  render() {
    return <div align="center" class="card">    
    <img alt="Pipeline Express" src={logo} width="300"></img><br></br>
    <div class="toggle-select">
    <h5>
    MainNet:
  </h5>
  <input
      className="form-check-input"
      name="testnet" 
      type="checkbox"
      checked={this.state.main}
      onChange={this.handleCheckChange} />
  </div>      
    
      <AlgoButton wallet={myAlgoWallet} context={this} returnTo={"myAddress"} />
      <h3>{"My Address: " + this.state.myAddress}</h3>
      <form >
        <label class= "form-label">
          Recipient Address:"2OWDII7AOVTNHA4YRFUGTUITOW62UAAQ7L7WJX7AXY34JZVBYFU65T7MV4";
    <SwitchNet />

				{/* Display the Form if connected */}
				{this.state.myAddress &&
					<Box>
						{/* Display the user's balance */}
						{this.state.balance !== "" && <Heading as={"h4"}>Balance: {this.state.balance}</Heading>}
						{/* Allow the user to update his balance via button click */}
						<Button icon="Check" mr={1} onClick={this.fetchBalance} size="small">
							Check Your Balance
						</Button>
						{/* Optional message field */}
						<Box>
							<Field label="Message" width={"100%"}>
								<Input
									type="text"
									required={false}
									onChange={this.handleMessageChange}
									value={this.state.msg}
									width={"100%"}
								/>
							</Field>
						</Box>

						{/* Amount selection */}
						<Box>
							<Field label="Amount" width={"100%"} >
								<Radio
									label="10 ALGO"
									value={"10"}
									checked={this.state.amount === "10"}
									onChange={this.handleAmountSelectionChange}
									required={true}
								/>
								<Radio
									label="20 ALGO"
									value={"20"}
									checked={this.state.amount === "20"}
									onChange={this.handleAmountSelectionChange}
								/>
								<Radio
									label="50 ALGO"
									value={"50"}
									checked={this.state.amount === "50"}
									onChange={this.handleAmountSelectionChange}
								/>
								<Radio
									label="100 ALGO"
									value={"100"}
									checked={this.state.amount === "100"}
									onChange={this.handleAmountSelectionChange}
								/>
								<Input
									type="number"
									required={true}
									placeholder="Specific Amount"
									value={this.state.amount}
									onChange={this.handleAmountSelectionChange}
									marginTop="10px"
								/>	
							</Field>
						</Box>
      <AlgoSendButton
      index={0} //If ASA, must be a numeric index value !== 0
      recipient={this.state.recipient} //string value
      amount={this.state.amount * 1000000} //integer value  Algos
      note={this.state.note} //string value
      myAddress={this.state.myAddress} //string value
      wallet={myAlgoWallet} //reference to an instance of Pipeline.init(); that is called once when the app is initialized
      context={this}
      returnTo={"txID"}// string value of state key to return the transaction id
      />
      <h3>{"Transaction ID: " + this.state.txID}</h3>
</div>
  }
}

export default App;
