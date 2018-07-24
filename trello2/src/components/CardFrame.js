import React, { Component } from 'react';
import ColumnList from './ColumnList.js';

export default class CardFrame extends Component {

  constructor(props){
  	super(props);
  	this.state={data: [
  {
    "id": 1,
    "title": "Card 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "columnId": 1
  },
  {
    "id": 2,
    "title": "Card 2",
    "description": "Quisque et pellentesque sem.",
    "columnId": 1
  },
  {
    "id": 3,
    "title": "Card 3",
    "description": "Nulla porttitor erat a sollicitudin volutpat.",
    "columnId": 1
  },
  {
    "id": 4,
    "title": "Card 4",
    "description": "Quisque id scelerisque felis, sit amet scelerisque nunc.",
    "columnId": 2
  },
  {
    "id": 5,
    "title": "Card 5",
    "description": "Suspendisse posuere ipsum at dui lacinia, ut faucibus lectus mollis.",
    "columnId": 2
  }
]
}
 }

 columnCt = () => {
    var columnNo = 0;
    console.log(this.state.data +'from column ct');
    this.state.data.map((cards) => {
      if(cards.columnId>columnNo){
        columnNo=cards.columnId;
      }});
    return columnNo;
  }

getId=()=>{
    for(var i = 1; i< this.state.data.length+1;i++){
      if(this.state.data.filter((cards) => cards.id==i).length==0){
        return i;
      }
    }
    return this.state.data.length+1;
  }

 pushCard = (id, title, description, columnNo) => {
  var newData = this.state.data;
  newData.splice((this.getId-1),0,{"id": this.getId(), "title": title, "description": description, "columnId": columnNo});
  this.setState({data: newData});
 }

 pushColumn = () => {
 	var newData = this.state.data;
  newData.push({id: this.getId(), columnId: this.columnCt()+1})
  this.setState({data: newData});
 }

 deleteColumn=(num)=>{
  var newData=this.state.data;
  newData=newData.filter((card)=>this.cutColumn(card,num));
  this.setState({data: newData});
 }

 cutCard = (card, i) =>{
    return card.id!=i;
  }

  cutColumn = (card, num) =>{
    return card.columnId!=num;
  }

 editCard = (id, title, description, columnNo) => {
  var newCardData = this.state.data; 
  newCardData=newCardData.filter((card)=> this.cutCard(card,id));
  newCardData.push({
    "id": id,
    "title": title,
    "description": description,
    "columnId": columnNo
  });
  this.setState({data: newCardData});
 }

 deleteCard=(id, title, description, columnNo)=>{
  var newCardData = this.state.data; 
  newCardData=newCardData.filter((card)=> this.cutCard(card,id));
  this.setState({data: newCardData});
 }

  render() {
    return (
      <div className='CardFrame'>
        <ColumnList data={this.state.data} 
        addCard={this.pushCard} 
        modifyCard={this.editCard} 
        deleteCard={this.deleteCard} 
        addColumn={this.pushColumn}
        deleteColumn={this.deleteColumn}/>
      </div>
    );
  }
}

