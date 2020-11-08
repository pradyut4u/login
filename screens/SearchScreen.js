import React from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler'
import db from '../config.js'

export default class Searchscreen extends React.Component {
constructor(props){
super(props)
this.state={
    allTransactions : [],
    lastDocument : "",
    search : ""
}
}
componentDidMount=async()=>{
    const query = await db.collection("transaction").limit(10).get()
    query.docs.map(a=>{
        this.setState({
        allTransactions : [],
        lastDocument : a
        })
    })
}

fetchMoreTransactions=async()=>{
    const query = await db.collection("transaction").startAfter(this.state.lastDocument).limit(10).get()
    query.docs.map(a=>{
        this.setState({
        allTransactions : [...this.state.allTransactions,a.data()],
        lastDocument : a
        })
    })
}
searchTransaction=async(text)=>{
    var text = text.toLowerCase()
    var splitText = text.split("")
    console.log("st")
    console.log(text)
    if(splitText[0].toLowerCase()==="b"){
    const query = await db.collection("transaction").where("bookid","==",this.state.search).get()
    query.docs.map(a=>{
        this.setState({
        allTransactions : [...this.state.allTransactions,a.data()],
        lastDocument : a
        })
    })
    }
    if(splitText[0].toLowerCase()==="s"){
    const query = await db.collection("transaction").where("studentid","==",this.state.search).get()
    query.docs.map(a=>{
        this.setState({
        allTransactions : [...this.state.allTransactions,a.data()],
        lastDocument : a
        })
    })
    }
}

    render() {
      return (
      <View>
        <TextInput placeholder="Enter Book ID / Student ID"
        onChangeText = {i=>{this.setState({
        search : i
        })}}/>
        <TouchableOpacity onPress={()=>{this.searchTransaction(this.state.search)}}>
        <Text>Search</Text>
        </TouchableOpacity>
        <FlatList data={this.state.allTransactions}
        renderItem={
        ({item})=>(<View>
        <Text>{"bookid:"+item.bookid}</Text>
        <Text>{"studentid:"+item.studentid}</Text>
        <Text>{"transactionDate:"+item.transactionDate}</Text>
        <Text>{"transactionType:"+item.transactionType}</Text>
        </View>)}
        onEndReached={this.fetchMoreTransactions}
        onEndReachedThreshhold={0.7}
        >
        </FlatList>
        </View>
      );
    }
  }