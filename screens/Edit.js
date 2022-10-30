import { useNavigation } from '@react-navigation/native';
import { useTheme, TextInput, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Button, Text } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'

const Proofread = (props) => {

    const navigation = useNavigation()

    const { colors } = useTheme();

    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')
    const [copiedText, setCopiedText] = useState('')
    const [langTool, setLangTool] = useState('')

    const [citeMode, setCiteMode] = useState(false)
    const [citeTitle, setCiteTitle] = useState('')
    const [citeAuthor, setCiteAuthor] = useState('')
    const [citeYear, setCiteYear] = useState('')

    let payload = {}

    if (citeMode) {
        payload = {
            prompt: `Provide APA Citation for the content below:\n\nTitle: ${citeTitle}\n\nAuthor(s): ${citeAuthor}\n\nYear: ${citeYear}\n\nExcerpt: ${userInput}`,
            max_tokens: 512,
            temperature: 0,
            n: 1,
            model: "text-davinci-002"
    }} else {
        payload = {
            prompt: `${langTool} the text below:\n\n${userInput}`,
            max_tokens: 512,
            temperature: 0,
            n: 1,
            model: "text-davinci-002"
        }
    }

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
                "Bearer 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"
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
    
    return (
        <>
        { citeMode ? 
        (<>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ justifyContent: 'center', paddingHorizontal: 10}}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
                        <Text>Provide</Text>
                            <View style={{ paddingTop: 1, paddingHorizontal: 3, marginHorizontal: 5, borderWidth: 1 }}>
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
                            <Text>for the content below:</Text>
                        </View>
                        
                        <Text>Title:</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => {
                                setCiteTitle(text)
                            }}
                            value={citeTitle}
                            label="Title"
                            />
                        
                        <Text>Author(s):</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => {
                                setCiteAuthor(text)
                            }}
                            value={citeAuthor}
                            label="Author(s) name, initials"
                            />
                        
                        <Text>Year:</Text>
                        <TextInput
                            onChangeText={(text) => {
                                setCiteYear(text)
                            }}
                            value={citeYear}
                            label="Year of publication"
                            />

                        <Text>Excerpt:</Text>
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
        </>)
        : (<><SafeAreaView>
            <ScrollView>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10}}>

                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingTop: 1, paddingHorizontal: 3, marginHorizontal: 5, borderWidth: 1 }}>
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
                        <Text>the text below:</Text>
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
        </>) }
        </>
    );
}

export default Proofread