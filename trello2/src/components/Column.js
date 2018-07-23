import React, { Component } from 'react';
import Card from './Card.js';
import '../css/Column.css';

export default class Column extends Component {

	constructor(props){
		super(props);
		this.state={
			editMode: false
		}
	}

	toggleEditMode = () =>{
		this.setState({editMode: !this.state.editMode});
	}

	saveCard = (id, title, description, columnNo) =>{
		this.props.editCard(id, title, description, columnNo);
		this.toggleEditMode();
	}

	deleteCard=(id, title, description, columnNo)=>{
		this.props.deleteCard(id, title, description, columnNo);
		this.toggleEditMode();
	}

  render() {
    return (
      <div className='Column'>
        <Card title={this.props.data.title} 
        description={this.props.data.description} 
        id={this.props.data.id} 
        column={this.props.num} 
        editMode={this.state.editMode}
        toggleEditMode={this.toggleEditMode}
        saveCard={this.saveCard}
        deleteCard={this.deleteCard}/>
      </div>
    );
  }
}

