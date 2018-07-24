import React, { Component } from 'react';
import '../css/Card.css';

export default class Card extends Component {
  
  constructor(props){
  	super(props);
    this.state={
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      columnNo: this.props.column
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
    this.props.saveCard(this.props.id, this.state.title, this.state.description, this.state.columnNo);
    this.setState({
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      columnNo: this.props.column
    });
  }

  deleteCard = () =>{
    this.props.deleteCard(this.props.id, this.state.title, this.state.description, this.state.columnNo);
    this.setState({
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      columnNo: this.props.column
    });
  }

  cardRender = () =>{
    if(this.props.editMode){
      return (<div className='CardEdittor'>
        <form onSubmit={this.handleSubmit}> 
        <p>{this.props.id}</p>
        <p>Title</p>
        <input type='text' className='InputTitle' name='title' value={this.state.title} onChange={this.handleChange}></input>
        <p>Description</p>
        <input type='text' className='InputDescription' name='description' value={this.state.description} onChange={this.handleChange}></input>
        <button onClick={this.props.toggleEditMode}>Cancel</button>
        <button type='submit'>Save</button>
        <button onClick={this.deleteCard}>Delete</button>
        </form>
        </div>)
    }else{
      return(<div className='CardView'>
        <p>ID: {this.props.id}</p>
        <h3>{this.props.title}</h3>
        <p className='Description'>{this.props.description}</p>
        <button onClick={this.props.toggleEditMode}>Edit</button>
      </div>);
    }
  }

  render() {
    return (
      <div className='Card'>
      {this.cardRender()}
      </div>
    );
  }
}

