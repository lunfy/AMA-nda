import { useTheme } from '@react-navigation/native';
import { TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { ScrollView, View, Button, Text, StyleSheet } from 'react-native';

const Translate = (props) => {

    const { colors } = useTheme();
    const [langInput, setLangInput] = useState('')
    const [reqOutput, setReqOutput] = useState('')
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')

    const jwt = props.jwtToken    
    const uid = props.userId
    const reqURL = props.req

    let payload = {
        prompt: `Translate the text provided from ${langInput} to ${reqOutput}: \n\n${userInput}`,
        max_tokens: 512,
        temperature: 0.5,
        n: 1,
        model: "text-davinci-002"
    }

    const getRes = () => {
        if (!langInput || !reqOutput) {
            return alert('Please specify input/output languages!')
        }
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
    
    const responseHandler = (res) => {
    if (res.status === 200) {
        const response = res.data.choices[0].text.trim()
        setObj(response);
        setLoading(false);
        storeData(reqURL, uid, userInput, response, jwt)
    }
    };

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
        input: {
            marginHorizontal: 5, 
            width: '30%'
        },
        inputSentence: {
            flex: 1, 
            flexDirection: 'row', 
            paddingHorizontal: 10,
            marginBottom: 20,
            marginTop: 20
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
        inputText: {
            paddingTop: 15
        },
        text: {
            color: colors.text
        }
    })

    return (
        <ScrollView>
            <View style={styles.reqContainer}>
                <View style={styles.inputSentence}>
                    <View style={styles.inputText}>
                        <Text style={styles.text}>Translate from</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput
                        placeholder='Language'
                        mode='outlined'
                        value={langInput}
                        style={{ height: 25}}
                        onChangeText={(text) => {
                            setLangInput(text)
                        }}
                        />
                    </View>
                    <View style={styles.inputText}>
                        <Text style={styles.text}>to</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput
                        placeholder='Language'
                        mode='outlined'
                        value={reqOutput}
                        style={{ height: 25}}
                        onChangeText={(text) => {
                            setReqOutput(text)
                        }}
                        />
                    </View>
                    <View style={styles.inputText}>
                        <Text style={styles.text}>:</Text>
                    </View>
                </View>

                <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => {
                    setUserInput(text)
                }}
                value={userInput}
                label="Input text here to translate"
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
                    <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
                </>
                ) : <></>
            }
            </View>
    
        </ScrollView>
    );
}

export default Translate