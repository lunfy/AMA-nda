import { ScrollView, View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { Card, Paragraph, Title } from "react-native-paper";
import axios from 'axios'

const History = (props) => {

    const user = props.userId
    const jwt = props.jwtToken
    const reqURL = props.req

    let ReqCard = []

    const [reqData, setReqData] = useState('')

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
                    <Title>Request #{ind+1}</Title>
                    <Paragraph style={styles.text}>Date: {req.req_date}</Paragraph>
                    <Paragraph style={styles.text}>Time: {req.req_time}</Paragraph>
                </Card.Content>
            </Card>
        </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
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
    }
  })