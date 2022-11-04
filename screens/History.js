import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Modal, Portal, Card, Paragraph, Title } from "react-native-paper";
import axios from 'axios'

const History = (props) => {

    const user = props.userId
    const jwt = props.jwtToken
    const reqURL = props.req

    let ReqCard = []

    const [reqData, setReqData] = useState('')
    const [modalData, setModalData] = useState('')
    const [visible, setVisible] = useState(false)

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const showModal = (item) => {
        setModalData(item)
        setVisible(true)
    }
    const hideModal = () => {
        setModalData('')
        setVisible(false)
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



    if (reqData) {
        ReqCard = reqData.map((req, ind) =>
        <View style={styles.item} key={req.request_id}>
            <Card>
                <Card.Content>
                    <TouchableOpacity onPress={() => showModal(req)} >
                    <Title>Request #{ind+1}</Title>
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
                <Modal style={{ paddingTop: 80, marginLeft: 40, width: '80%', height: '80%' }} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ScrollView>
                        <Title style={styles.boldText}>Request ID: {modalData.request_id}</Title>
                        <Paragraph>
                            <Text style={styles.boldText}>Date: </Text><Text>{modalData.req_date}</Text>
                        </Paragraph>
                        <Paragraph>
                            <Text style={styles.boldText}>Time: </Text><Text>{modalData.req_time}</Text>
                        </Paragraph>
                        <Text></Text>
                        <Paragraph>
                            <Text style={styles.boldText}>Your Request: </Text>
                        </Paragraph>
                        <Paragraph><Text>{modalData.user_request}</Text></Paragraph>
                        <Text></Text>
                        <Paragraph>
                            <Text style={styles.boldText}>AI Response: </Text>
                        </Paragraph>
                        <Paragraph><Text>{modalData.ai_response}</Text></Paragraph>
                    </ScrollView>
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
    },
    text: {
        fontSize: 10
    },
    boldText: {
        fontWeight: 'bold'
    }
  })