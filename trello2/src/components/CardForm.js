import React, { Component } from 'react';
import CardFrame from './CardFrame.js';

export default class CardForm extends Component {

	constructor(props){
		super(props);
		this.state={
			id: this.props.assignedId,
			title: '',
			description: '',
			columnNo: 1
		}
	}

	handleChange = (event) =>{
	const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}

	handleSubmit = () =>{
		this.props.toggleSave(this.state.id, this.state.title, this.state.description, this.state.columnNo);
		this.setState({id: this.props.assignedId,
			title: '',
			description: '',
			columnNo: 1});
	}
  render() {
  	if(this.props.show){
    return (	
      <div className='CardForm'>
      <form onSubmit={this.handleSubmit}>
      	<p>Enter Title</p>
        <input type='text' className='InputTitle' name='title' value={this.state.title} onChange={this.handleChange}></input>
        <p>Enter Description</p>
        <input type='text' className='InputDescription' name='description' value={this.state.description} onChange={this.handleChange}></input>
        <p>Enter Column Number</p>
        <input type='number' className='InputColumnNo' name='columnNo' value={this.state.columnNo} onChange={this.handleChange}></input>
        <button onClick={this.props.toggle}>Back</button>
        <button type='submit'>Save</button>
      </form>
      </div>
    );
    }else{
    	return null;
    }
  }
}