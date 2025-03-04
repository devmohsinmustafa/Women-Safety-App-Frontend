
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, ActivityIndicator, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ratios from '../../../styles/ratios';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import { errormessage } from '../../../styles/CommonError';

let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios


const Description = ({ navigation }) => {


  const [description, setdescription] = useState('')
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState(null);


  const sendToBackend = () => {

    if (description == '') {
      setErrormsg("Please enter your description/feedback");
      Alert.alert('Please enter description/feedback')
    }
    else {
      setLoading(true)
      AsyncStorage.getItem('user').then(
        data => {
          fetch('https://women-safety-app-backend-production.up.railway.app/setdescription', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              description: description
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.message === "Description Updated Successfully") {
                setLoading(false)
                Alert.alert('Description has been set successfully')
                navigation.navigate('Settings1')
              }
              else if (data.error === "Invalid Credentials") {
                Alert.alert('Invalid Credentials')
                setLoading(false)
                navigation.navigate('Login')
              }
              else {
                setLoading(false)
                Alert.alert("Please Try Again");
              }
            })
            .catch(err => {
              Alert.alert('Something went wrong')
              setLoading(false)
            })
        }
      )
        .catch(err => {
          Alert.alert('Something went wrong')
          setLoading(false)
        })
    }

    // navigation.navigate('Signup_ChoosePassword')
  }




  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }




  return (
    <View style={styles.container}>

      <View style={{ flex: 0.2, marginTop: heightPixel(43) }}>
        <Header title="Description" marginLeft={31} marginLeft1={27}
          image1={require("../../../assets/images/arrow-left.png")}
          image2={[]}
        />
      </View>





      <View style={styles.container2}>
        <Text style={styles.message}>Description Message</Text>
      </View>

      {
        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
      }

      <View style={styles.container5}>
        <TextInput
          placeholder='Please enter your new description'
          placeholderTextColor="#372329"
          onChangeText={(text) => setdescription(text)}
          onPressIn={() => setErrormsg(null)}
          multiline={true}
          // numberOfLines={20}
        style={styles.input}
        />
      </View>







      <TouchableOpacity style={styles.button} onPress={() => sendToBackend()}>
        <Button title="Save Description !" />
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECD0",
    borderRadius: 30,

  },
  container1: {
    // flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: widthPixel(22),
    height: 46
  },
  text: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(18),
  },

  container2: {
    flex: 0.2,
    // backgroundColor: "red",
    marginTop: 10,
    justifyContent: 'center',
    marginHorizontal: widthPixel(20),
  },
  message: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(20),
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthPixel(24),
  },
  container4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthPixel(24),
  },
  container5: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    marginHorizontal: widthPixel(20),
    flex: 1,
    width:"90%",
        height:345,
  },
  input: {
    borderRadius: 10,
    width: "100%",
    color:"#372329",
    fontFamily: "Nunito-Bold",
paddingTop:heightPixel(33),
paddingHorizontal:widthPixel(19)
  },
  button: {
    flex: 0.3,
    marginVertical: 19,
  }


})

export default Description;