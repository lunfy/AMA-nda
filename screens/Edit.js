import { useNavigation, useTheme } from '@react-navigation/native';
import { TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Button, Text, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

const Edit = (props) => {

    const { colors } = useTheme();

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')
    const [langTool, setLangTool] = useState('')

    const [citeMode, setCiteMode] = useState(false)
    const [citeTitle, setCiteTitle] = useState('')
    const [citeAuthor, setCiteAuthor] = useState('')
    const [citeYear, setCiteYear] = useState('')

    const jwt = props.jwtToken    
    const uid = props.userId
    const reqURL = props.req

    let payload = {
        prompt: `${langTool} the text below:\n\n${userInput}`,
        max_tokens: 512,
        temperature: 0,
        n: 1,
        model: "text-davinci-002"
    }

    if (citeMode) {
        payload = {
            prompt: `Provide APA Citation for the content below:\n\nTitle: ${citeTitle}\n\nAuthor(s): ${citeAuthor}\n\nYear: ${citeYear}\n\nExcerpt: ${userInput}`,
            max_tokens: 512,
            temperature: 0,
            n: 1,
            model: "text-davinci-002"
    }}

    const getRes = () => {
        if (!langTool) {
            return alert('Please select an action!')
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

      const citationModeCheck = (item) => {
        if (item === 'APA Citation') {
            setCiteMode(true)
            setLangTool(item)
            return
        } else {
            setCiteMode(false)
        }
        setLangTool(item)
    }

    const styles = StyleSheet.create({
        reqContainer: {
            justifyContent: 'center', 
            marginTop: 20, 
            paddingHorizontal: 10, 
            borderRadius: 10, 
            backgroundColor: colors.card
        },
        apaContainer: {
            justifyContent: 'center', 
            marginTop: 20, 
            paddingHorizontal: 10, 
            borderRadius: 10, 
            backgroundColor: colors.card
        },
        modal: {
            backgroundColor: colors.primary, 
            paddingTop: 1, 
            paddingHorizontal: 3, 
            marginHorizontal: 5, 
            borderWidth: 1
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
        text: {
            color: colors.text
        },
        fieldTitle: {
            color: colors.text,
            marginVertical: 10,
            marginHorizontal: 5,
            marginBottom: 5
        }
    })
    
    return (
        <>
            { citeMode ? 
            (
            <ScrollView>
                <View style={styles.apaContainer}>
                    <View style={styles.inputSentence}>
                    <Text style={styles.text}>Provide</Text>
                        <View style={styles.modal}>
                            <ModalDropdown 
                            defaultValue='APA Citation'
                            options={[
                                'Proofread',
                                'Summarise',
                                'APA Citation',
                                'Reword'
                            ]}
                            onSelect={(ind, val) => citationModeCheck(val)}
                            />
                        </View>
                        <Text style={styles.text}>for the content below:</Text>
                    </View>
                    
                    <Text style={styles.fieldTitle}>Title:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => {
                            setCiteTitle(text)
                        }}
                        value={citeTitle}
                        label="Title"
                        />
                    
                    <Text style={styles.fieldTitle}>Author(s):</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => {
                            setCiteAuthor(text)
                        }}
                        value={citeAuthor}
                        label="Author(s) name, initials"
                        />
                    
                    <Text style={styles.fieldTitle}>Year:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setCiteYear(text)
                        }}
                        value={citeYear}
                        label="Year of publication"
                        />

                    <Text style={styles.fieldTitle}>Excerpt:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => {
                            setUserInput(text)
                        }}
                        value={userInput}
                        label="Input paragraphs/sentences here"
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
        
            </ScrollView>)
            : (<ScrollView>
                <View style={styles.reqContainer}>
                    <View style={styles.inputSentence}>
                    <Text style={styles.text}>Please</Text>
                        <View style={styles.modal}>
                            <ModalDropdown 
                            options={[
                                'Proofread',
                                'Summarise',
                                'APA Citation',
                                'Reword'
                            ]}
                            onSelect={(ind, val) => citationModeCheck(val)}
                            />
                        </View>
                        <Text style={styles.text}>the text below:</Text>
                    </View>
                    
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => {
                            setUserInput(text)
                        }}
                        value={userInput}
                        label="Input paragraphs/sentences here"
                        />
                    <Button title='Submit' onPress={getRes} />

                    <Divider style={styles.divider} bold='true' />
                    
                    { loading ? (
                    <>
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                        <View style={styles.loadContainer}>
                            <Text styles={styles.text}>Loading....</Text>
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
            </ScrollView>)}
        </>
    );
}

export default Edit