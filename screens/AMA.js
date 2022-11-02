import { useNavigation } from '@react-navigation/native';
import { useTheme, TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Button, Text } from 'react-native';

const Ama = (props) => {

    const img = require('../assets/150.png')
    const navigation = useNavigation()

    const { colors } = useTheme();
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')
    const [copiedText, setCopiedText] = useState('')

    console.log("uid: ", props.userId)

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
                <Text style={{ color: colors.text, paddingHorizontal: 10 }}>Input</Text>

                <View style={{ justifyContent: 'center', paddingHorizontal: 10}}>
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

export default Ama