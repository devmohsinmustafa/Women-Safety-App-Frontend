import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import Header from '../../components/header/Header'
import axios from 'axios';

import ratios from '../../styles/ratios'
let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const ChatGpt = () => {

    const [data, setData] = useState([]);
   
    const apiUrl = "http://api.openai.com/v1/engines/text-davinci-002/completions" //api request
    const apiKey = "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"
    console.log("API key:", apiKey); // Check the API key

    const [textInput, setTextInput] = useState("");


    const handleSend = async () => {
        const prompt = textInput
        console.log("Prompt:", prompt); // Check the prompt before making the API request

        try {
            const response = await axios.post(apiUrl, {
                // request for api endpoints
                prompt: prompt,
                // this 2  property is used by api to generate a response 
                max_tokens: 1024,
                temperature: 0.5,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
            });
            const text = response.data.choices[0].text;
            setData([...data, { type: "user", "text": textInput }, { type: "bot", "text": text }]);
            // this updates the application state and show response from the api 
            setTextInput("");
        }
        catch (error) {
            // Handle API errors
            if (error.response && error.response.status === 429) {
                // Rate limit exceeded, show an error message
                alert('Too many requests. Please wait and try again.');
            } else {
                // Other API errors, show a generic error message
                alert('An error occurred. Please try again later.');
            }
        }

    }




    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1, marginTop: heightPixel(43) }}>
                <Header title="   Women Help AI 🚺"
                    image1={require("../../assets/images/arrow-left.png")}
                    image2={[]}
                />
            </View>

            <View style={styles.container1}>
                <Text style={styles.title}>AI ChatBot</Text>


                <FlatList
                    // pass data prop to the flatlist component
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.body}
                    // the render item props is a function this is used to render each item in the list 
                    renderItem={({ item }) => (
                        // it takes an object 
                        // destructure it and render the View component with some styles and nested text component
                        <View style={{ flexDirection: 'row', marginHorizontal: widthPixel(10), }}>
                            <Text style={{ fontWeight: 'bold', color: item.type === "user" ? "green" : "red" }}>
                                {item.type === "user" ? "Mohsin: " : "Umer:  "}</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.bot}>{item.text}</Text>
                            </View>
                        </View>
                    )}
                />

                {/* <TextInput
                    style={styles.input}
                    value={textInput}
                    onChangeText={text => setTextInput(text)}
                    placeholder="Ask me Anything"
                    placeholderTextColor={"#372329"}
                />
                <TouchableOpacity style={styles.button}
                    onPress={handleSend}
                >
                    <Text style={styles.buttonText}>Let's Go</Text>
                </TouchableOpacity> */}


                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input2}
                        value={textInput}
                        onChangeText={text => setTextInput(text)}
                        placeholder="Ask me Anything"
                        placeholderTextColor={"#372329"}
                    />

                    <TouchableOpacity onPress={handleSend}
                    >
                        <Image source={require("../../assets/images/chat.png")} style={styles.image} />

                    </TouchableOpacity>

                </View>



            </View>




        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    container1: {
        flex: 1,
        // backgroundColor: "#fffcc9",
        alignItems: 'center',
    },
    title: {
        color: "#372329",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(28),
    },
    body: {
        backgroundColor: "fffcc9",
        width: "102%",
        margin: 10,
    },
    bot: {
        // fontSize: 16,
        color: "#372329",
        fontFamily: "Nunito-Regular",
        fontSize: fontPixel(16),
        // backgroundColor:"gray"
        // marginHorizontal: widthPixel(20)

    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        width: "90%",
        height: 60,
        marginBottom: 10,
        borderRadius: 20,
        color: "red",
        paddingLeft: 16
    },
    button: {
        borderColor: "black",
        backgroundColor: "pink",
        // flex:0.2,
        width: "90%",
        height: heightPixel(60),
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "blue"
    },


    inputContainer: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#FFFFFF",
        flexDirection: 'row',
        // backgroundColor: 'red',
        borderRadius: 20,
        marginBottom: 26,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: widthPixel(20)
    },

    input2: {
        flex: 1,
        height: heightPixel(60),
        color: '#372329',
    },
    image: {
        width: 30,
        height: 30,
        // marginRight: 10,
    },
})
export default ChatGpt;