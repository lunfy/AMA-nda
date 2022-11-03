import { useTheme, useNavigation } from '@react-navigation/native';
import { TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { ScrollView, View, Button, Text, StyleSheet } from 'react-native';


const Ama = (props) => {

    const { colors } = useTheme();
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')

    const jwt = props.jwtToken    
    const uid = props.userId
    const reqURL = props.req

    let payload = {
        prompt: `${userInput}`,
        max_tokens: 512,
        temperature: 0.5,
        n: 1,
        model: "text-davinci-002"
    }

    const getRes = () => {
        setLoading(true);
        axios({
            method: "POST",
            url: "https://api.openai.com/v1/completions",
            data: payload,
            headers: {
                "Content-Type": "application/json",
                Authorization:
                `Bearer ${props.openAiKey}`
            }
            })
            .then((res) => {
                responseHandler(res);
            })
            .catch((e) => {
                setLoading(false);
                alert(e.message, e)
            });
    }
    
    const responseHandler = (res) => {
    if (res.status === 200) {
        const response = res.data.choices[0].text.trim()
        setObj(response);
        setLoading(false);
        storeData(reqURL, uid, userInput, response, jwt)
    }
    };

    const storeData = (url, id, input, output, token) => {
    axios({
        method: 'POST',
        url: `${url}`,
        data: {
            uid: `${id}`,
            user_request: `${input}`,
            ai_response: `${output}`
        },
        headers: {
            "Authorization":`${token}`
        }
    })
    .then(response => {
        console.log("data: ", response.data)
    })
    .catch((e) => {
        alert(e.message, e)
    });
    }

    const copyToClipboard = async () => {
    await Clipboard.setStringAsync(obj)
    }

    const styles = StyleSheet.create({
        reqContainer: {
            justifyContent: 'center', 
            marginTop: 10, 
            paddingHorizontal: 10, 
            borderRadius: 10, 
            backgroundColor: colors.card
        },
        inputText: { 
            color: colors.text, 
            paddingHorizontal: 10, 
            marginTop: 20, 
            marginBottom: 5
        },
        outputText: {
            color: colors.text, 
            paddingHorizontal: 10, 
            marginBottom: 5
        },
        divider: {
            marginVertical: 20, 
            marginHorizontal: 5
        },
        loadContainer: {
            alignItems: 'center', 
            marginVertical: 10, 
            backgroundColor: colors.card
        },
        outputContainer: {
            flex: 1, backgroundColor: colors.border, 
            borderWidth: 1, 
            paddingHorizontal: 10, 
            paddingVertical: 20, 
            borderRadius: 10
        },
        text: {
            color: colors.text
        }
    })

    return (
            <ScrollView>
                <View style={styles.reqContainer}>
                <Text style={styles.inputText}>Input</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => {
                            setUserInput(text)
                        }}
                        value={userInput}
                        label="Ask Me Anything!"
                        />
                    <Button title='Submit' onPress={getRes} />

                    <Divider style={styles.divider} bold='true' />
                    
                    { loading ? (
                    <>
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                        <View style={styles.loadContainer}>
                            <Text style={styles.text}>Loading....</Text>
                        </View>
                    </>)
                        : <></> }   
                    
                    { obj ? (
                    <>
                        <Text style={styles.outputText}>Output</Text>
                        <View style={styles.outputContainer}>
                                <Text style={styles.text}>
                                    {obj ? obj : ''}
                                </Text>
                        </View>
                        <Button style={styles.text} title="Click here to copy to Clipboard" onPress={copyToClipboard} />
                    </>
                    ) : <></>
                }
                </View>
            </ScrollView>
    );
}

export default Ama