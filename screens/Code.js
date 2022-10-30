import { useTheme, TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Button, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

const Code = (props) => {

    const { colors } = useTheme();

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')
    const [copiedText, setCopiedText] = useState('')
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

      const fetchCopiedText = async () => {
        const test = await Clipboard.getStringAsync();
        setCopiedText(test)
      };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ paddingBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Button title='btn' onPress={()=>props.theme('dark')} />
                    <Button title='btn2' onPress={()=>props.theme('light')} /> */}
                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: 10}}>

                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
                        <Text>Write a function in</Text>
                        <View style={{ paddingTop: 1, paddingHorizontal: 3, marginHorizontal: 5, borderWidth: 1 }}>
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
                        <Text>to solve below:</Text>
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

                    <Divider style={{ marginVertical: 20, marginHorizontal: 5 }} bold='true' />
                    
                    { loading ? (
                    <>
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                        <View style={{ alignItems: 'center', marginVertical: 10}}>
                            <Text>Loading....</Text>
                        </View>
                    </>)
                        : <></> }   

                    { obj ? (
                    <>
                        <Text>Output</Text>
                        <View style={{ flex: 1, backgroundColor: colors.card, borderWidth: 1, paddingHorizontal: 10, paddingBottom: 30 }}>
                                <Text style={{ color: colors.text }}>
                                    {obj ? obj : ''}
                                </Text>
                        </View>
                        <Button style={{ color: colors.text }} title="Click here to copy to Clipboard" onPress={copyToClipboard} />
                    </>
                    ) : <></>
                }
                </View>
        
            </ScrollView>
        </SafeAreaView>
    );
}

export default Code