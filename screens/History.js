import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import { useEffect, useState } from "react";
import { Modal, Portal, Card, Paragraph, Title } from "react-native-paper";
import axios from 'axios'
import { useTheme } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard'

const History = (props) => {

    const user = props.userId
    const jwt = props.jwtToken
    const reqURL = props.req

    const { colors } = useTheme()

    const [reqData, setReqData] = useState('')
    const [modalData, setModalData] = useState('')
    const [visible, setVisible] = useState(false)

    let ReqCard = []

    const showModal = (item) => {
        setModalData(item)
        setVisible(true)
    }
    const hideModal = () => {
        setModalData('')
        setVisible(false)
    }

    const copyToClipboard = async (item) => {
        await Clipboard.setStringAsync(item)
        }

    const getHistory = () => {
        axios({
            method: 'GET',
            url: `${reqURL}?uid=${user}`,
            headers: {
                "Authorization":`${jwt}`
            }
        })
        .then(response => {
            setReqData(response.data)
        })
        .catch((e) => {
            alert(e.message, e)
        });
    }

    useEffect(() => {
        getHistory()
    }, [])

    const styles = StyleSheet.create({
        modalContainer: {
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
            padding: 20
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            backgroundColor: colors.background,
            borderColor: colors.border,
            padding: 10,
        },
        item: {
            width: '50%',
            padding: 10,
            backgroundColor: colors.background,
            borderColor: colors.border,
        },
        card: {
            borderRadius: 10,
            backgroundColor: colors.card,
            borderColor: colors.border
        },
        modal: {
            paddingTop: 80, 
            marginLeft: 40, 
            width: '80%', 
            height: '80%'
        },
        text: {
            fontSize: 10,
            color: colors.text
        },
        title: {
            color: colors.text
        },
        boldText: {
            fontWeight: 'bold',
            color: colors.text
        }
      })

    if (reqData) {
        ReqCard = reqData.map((req, ind) =>
        <View style={styles.item} key={req.request_id}>
            <Card style={styles.card}>
                <Card.Content>
                    <TouchableOpacity onPress={() => showModal(req)} >
                    <Title style={styles.title}>Request #{ind+1}</Title>
                    <Paragraph style={styles.text}>Date: {req.req_date}</Paragraph>
                    <Paragraph style={styles.text}>Time: {req.req_time}</Paragraph>
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            { modalData ?
            (<Portal>
                <Modal style={styles.modal} visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <ScrollView>
                        <Title style={styles.boldText}>Request ID: {modalData.request_id}</Title>
                        <Paragraph>
                            <Text style={styles.boldText}>Date: </Text><Text style={styles.title}>{modalData.req_date}</Text>
                        </Paragraph>
                        <Paragraph>
                            <Text style={styles.boldText}>Time: </Text><Text style={styles.title}>{modalData.req_time}</Text>
                        </Paragraph>
                        <Text></Text>
                        <Paragraph>
                            <Text style={styles.boldText}>Your Request: </Text>
                        </Paragraph>
                        <Paragraph><Text style={styles.title}>{modalData.user_request}</Text></Paragraph>
                        <Text></Text>
                        <Paragraph>
                            <Text style={styles.boldText}>AI Response: </Text>
                        </Paragraph>
                        <Paragraph><Text style={styles.title}>{modalData.ai_response}</Text></Paragraph>
                    </ScrollView>
                    <Button style={styles.text} title="Click here to copy response" onPress={() => copyToClipboard(modalData.ai_response)} />
                </Modal>
            </Portal>)

            : (<></>) }
            <View style={styles.container}>
                {ReqCard}
                { reqData ? (<></>) : 
                    (
                        <Text>You have not made any requsts!</Text>
                    )
                }
            </View>
        </ScrollView>
    );
  }

  export default History