import React, { Component } from 'react';
import Column from './Column.js';
import '../css/ColumnList.css';
import CardForm from './CardForm.js';

export default class ColumnList extends Component {

  constructor(props){
    super(props);
    this.state={
      cardFormShow: false,
      data: this.props.data
    }
  }

  columnCt = () => {
  	var columnNo = 0;
  	this.props.data.map((cards) => {
  		if(cards.columnId>columnNo){
  			columnNo=cards.columnId;
  		}});
  	return columnNo;
  }

  renderColumns = (num) =>{
      var html= [];
    	for (var i = 1; i <= num; i++) {
  		  html.push(this.sortCardPerColumn(i)); 
  		}
      return html;
  	}

  checkCards = (card, i) =>{
  	return card.columnId==i;
  }

  toggleCardForm = () =>{
    this.setState({cardFormShow: !this.state.cardFormShow});
  }

  toggleSaveCardForm = (id, title, description, columnNo) =>{
    this.props.addCard(id, title, description, columnNo);
    this.setState({cardFormShow: !this.state.cardFormShow});
  }

  getId=()=>{
    for(var i = 1; i< this.state.data.length+1;i++){
      if(this.props.data.filter((cards) => cards.id==i).length==0){
        return i;
      }
    }
    return this.props.data.length+1;
  }

  displayCardForm = () =>{
    return (<CardForm show={this.state.cardFormShow}
     toggle={this.toggleCardForm} 
     toggleSave={this.toggleSaveCardForm} 
     assignedId={this.props.data.length+1}/>);
  }

  changeCard = (id, title, description, columnNo) =>{
    this.props.modifyCard(id, title, description, columnNo);
  }

  deleteCard=(id, title, description, columnNo)=>{
    this.props.deleteCard(id, title, description, columnNo);
  }

  cutCol=(col, i)=>{
    return col.columnId!=i;
  }

  deleteColumn=(i)=>{
  var newCardData = this.state.data; 
  newCardData=newCardData.filter((col)=> this.cutCol(col,i));
  this.setState({data: newCardData});
  this.props.deleteColumn(i)
}

  sortCardPerColumn = (j) => {
  	return (<div className='ColumnArea' key={j}>
              {this.props.data.filter((cards) => this.checkCards(cards,j)).map((cards, i)=>{
                  return (<div className='ColumnListSet'>
                    <Column key={i+j*10} data={cards} editCard={this.changeCard} num={j} deleteCard={this.deleteCard}/>
                    </div>);
                })}
              <button onClick={()=>this.deleteColumn(j)}>Delete Column</button>
            </div>
        );
  }

  render() {
    return (
      <div className='ColumnList'>
      	{this.renderColumns(this.columnCt())}
        {this.displayCardForm()}
        <button className ='AddCardButton' onClick={this.toggleCardForm}>Add Card</button>
        <button className ='AddColumnButton' onClick={this.props.addColumn}>Add Column</button>     
      </div>
    );
  }
}

