import React from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import db from '../config.js'

export default class LoginScreen extends React.Component {
constructor(props){
super(props)
this.state={
    emailID : null,
    password : null
}
}

login=async(email,password)=>{
    if(email && password){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
                this.props.navigation.navigate("Transaction")
            }
        }
        catch(error){
            alert("Invalid login")
        }
    }
    else{
        alert("Enter email ID and password")
    }
}

render(){
	return(
	<View>
	<Text>LoginScreen</Text>
	<TextInput placeholder="Enter User ID"
        keyboardType = "email-address"
        onChangeText = {i=>{this.setState({
        emailID : i
        })}}/>
        <TextInput placeholder="Enter password"
        secureTextEntry = {true}
        onChangeText = {i=>{this.setState({
        password : i
        })}}/>
        <TouchableOpacity onPress={()=>{this.login(this.state.emailID,this.state.password)}}>
        <Text>Login</Text>
        </TouchableOpacity>
	</View>
	)
}
}