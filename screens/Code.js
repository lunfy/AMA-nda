import { TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { ScrollView, View, Button, Text, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

const Code = (props) => {

    const { colors } = useTheme();

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')
    const [codeLang, setCodeLang] = useState('')

    let payload = {
        prompt: `Write a function in ${codeLang} for the following question:\n\n${userInput}`,
        max_tokens: 512,
        temperature: 0.5,
        n: 1,
        model: "text-davinci-002"
    }

    const getRes = () => {
        if (!codeLang) {
            return alert('Please select a coding language!')
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
            const response = res.data.choices[0].text
            setObj(response);
            setLoading(false);
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
        }
    })

    return (
        <ScrollView>
            <View style={styles.reqContainer}>
                <View style={styles.inputSentence}>
                    <Text style={styles.text}>Write a function in</Text>
                    <View style={styles.modal}>
                        <ModalDropdown 
                        options={[
                            'JavaScript',
                            'Ruby',
                            'Java',
                            'Go',
                            'Python',
                            'C',
                            'C++',
                            'C#'
                        ]}
                        onSelect={(ind, val) => setCodeLang(val)}
                        />
                    </View>
                    <Text style={styles.text}>to solve below:</Text>
                </View>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => {
                        setUserInput(text)
                    }}
                    value={userInput}
                    label="Input coding problem or question"
                    />
                <Button title='Submit' onPress={getRes} />
                <Divider style={styles.divider} bold='true' />
                
                { loading ? 
                    (
                        <>
                            <ActivityIndicator animating={true} color={MD2Colors.red800} />
                            <View style={{ alignItems: 'center', marginVertical: 10}}>
                                <Text style={styles.text}>Loading....</Text>
                            </View>
                        </>
                    ) 
                    : <></>
                }   

                { obj ? 
                    (
                        <>
                            <Text style={styles.outputText}>Output</Text>
                            <View style={styles.outputContainer}>
                                <Text style={styles.text}>
                                    {obj ? obj : ''}
                                </Text>
                            </View>
                            <Button style={{ color: colors.text }} title="Click here to copy to Clipboard" onPress={copyToClipboard} />
                        </>
                    ) 
                    : <></>
                }
            </View>
        </ScrollView>
    );
}

export default Code