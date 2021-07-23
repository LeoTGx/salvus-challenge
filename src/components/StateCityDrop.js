import React from 'react';

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			states : [],
			cities : [],
			selectedState : '--Choose State--'
		};
		this.changeState = this.changeState.bind(this);
	}

	componentDidMount() {
		this.setState({
			states : [
				{ name: 'Pernambuco', cities: [ 'Recife','Jaboatão dos Guararapes', 'Olinda'] },
				{ name: 'Alagoas', cities: [ 'Maceió','Arapiraca', 'Rio Largo'] },
			]
		});
	}
  
	changeState(event) {
		this.setState({selectedState: event.target.value});
		this.setState({cities : this.state.states.find(cities => cities.name === event.target.value).cities});
	}
	
	render() {
		return (
			<div id="container">
				<div>
					<label>Estado   </label>
					<select background = "black" name="estado" placeholder="State" value={this.state.selectedState} onChange={this.changeState}>
						<option>---Selecionar Estado---</option>
						{this.state.states.map((e, key) => {
							return <option key={key}>{e.name}</option>;
						})}
					</select>
				</div>
				<br></br>
				<div>
					<label>Cidade   </label>
					<select name="cidade" placeholder="City">
						<option>---Selecionar Cidade---</option>
						{this.state.cities.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
					</select>
				</div>
			</div>
		)
	}
}

export default Dropdown;