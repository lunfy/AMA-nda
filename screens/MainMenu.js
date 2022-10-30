import { useNavigation, useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { Avatar, Card, TextInput, Title, Paragraph, Button } from "react-native-paper";
import axios from 'axios'
import { SafeAreaView } from "react-native-safe-area-context";

const MainMenu = (props) => {

    const img = require('../assets/150.png')
    const img0 = require('../assets/ama.png')
    const img2 = require('../assets/cw.jpeg')
    const navigation = useNavigation()

    const { colors } = useTheme();
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [obj, setObj] = useState('')
    const [copiedText, setCopiedText] = useState('')

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

    return (
        <View style={[styles.container]}>
            <View style={styles.item}>
                <Card>
                    <Card.Content>
                        <TouchableOpacity onPress={() => navigation.navigate('Ask Me Anything!')}>
                            <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={img0} />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>

            <View style={styles.item}>
                <Card>
                    <Card.Content>
                        <TouchableOpacity onPress={() => navigation.navigate('Code Wizard')}>
                            <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={img2} />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>

            <View style={styles.item}>
                <Card>
                    <Card.Content>
                        <TouchableOpacity onPress={() => navigation.navigate('About')}>
                            <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={img} />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>

            <View style={styles.item}>
                <Card>
                    <Card.Content>
                        <TouchableOpacity onPress={() => navigation.navigate('About')}>
                            <Image style={{ width: 130, height: 130, borderRadius: 100 }} source={img} />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>
        </View>

        
        // <SafeAreaView>
        //     <ScrollView>
        //         <View style={{ paddingBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
        //             <Text style={{ color: colors.text }}>Ask Me Anything!</Text>
        //             {/* <Button title='btn' onPress={()=>props.theme('dark')} />
        //             <Button title='btn2' onPress={()=>props.theme('light')} /> */}
        //         </View>

        //         <View style={{ justifyContent: 'center', paddingHorizontal: 10}}>
        //             <TextInput
        //                 multiline={true}
        //                 numberOfLines={4}
        //                 onChangeText={(text) => {
        //                     setUserInput(text)
        //                 }}
        //                 value={userInput}
        //                 label="Ask Me Anything!"
        //                 />
        //             <Button title='Submit' onPress={getRes} />

        //             { obj ? (
        //                 <>
        //             <View style={{ flex: 1, backgroundColor: colors.card, borderWidth: 1, paddingHorizontal: 10, paddingBottom: 30 }}>
        //                     <Text style={{ color: colors.text }}>
        //                         {obj ? obj : ''}
        //                     </Text>
        //             </View>
        //             <Button style={{ color: colors.text }} title="Click here to copy to Clipboard" onPress={copyToClipboard} />
        //             </>
        //             ) : <></>
        //         }
        //         </View>
        
        //     </ScrollView>
        // </SafeAreaView>
    );
}

export default MainMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding: 10,
    },
    item: {
        width: '50%',
        padding: 10
    }
  })