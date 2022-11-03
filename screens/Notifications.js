import * as React from 'react'
import { ScrollView, View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { Banner, BottomNavigation } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { DEV_NOTIFICATIONS } from '@env'
import axios from 'axios'

const Notifications = (props) => {

    const img0 = require('../assets/150.png')
    const REQ_NOTE = process.env.DEV_NOTIFICATIONS
    const user = props.userId
    const jwt = props.jwtToken

    let noteBanners = []
    let noteBanners2 = []

    const [noteData, setNoteData] = useState('')
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'new', title: 'New', focusedIcon: 'folder-open', unfocusedIcon: 'folder-outline'},
        { key: 'archived', title: 'Archived', focusedIcon: 'folder' }
    ]);

    const NewRoute = () => 
    <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        {noteBanners}
            { noteData ? (<></>) : 
                (
                    <Text>You have no new notifications</Text>
                )
            }
    </ScrollView>;

    const ArchiveRoute = () => 
    <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        {noteBanners2}
            { noteData ? (<></>) : 
                (
                    <Text>You have no archived notifications</Text>
                )
            }
    </ScrollView>;

    const renderScene = BottomNavigation.SceneMap({
        new: NewRoute,
        archived: ArchiveRoute
    });

    const getNotifications = () => {
        axios({
            method: 'GET',
            url: `${REQ_NOTE}?uid=${user}`,
            headers: {
                "Authorization":`${jwt}`
            }
        })
        .then(response => {
            console.log("data: ", response.data)
            responseHandler(response)
        })
        .catch((e) => {
            alert(e.message, e)
        });
    }

    const setVisible = (nid, vis) => {
        let visiblility = ''
        if (vis === false) {
            visiblility = true
        } else {
            visiblility = false
        }
        axios({
            method: 'PUT',
            url: `${REQ_NOTE}`,
            headers: {
                "Authorization":`${jwt}`
            },
            data: {
                nid: `${nid}`,
                visible: `${visiblility}`
            }
        })
        .then(response => {
            console.log("data: ", response.data)
            responseHandler(response)
        })
        .then(()=> {
            getNotifications()
        })
        .catch((e) => {
            alert(e.message, e)
        });
    } 

    const deleteNotification = (nid) => {
        axios({
            method: 'DELETE',
            url: `${REQ_NOTE}`,
            headers: {
                "Authorization":`${jwt}`
            },
            data: {
                nid: `${nid}`
            }
        })
        .then(response => {
            console.log("data: ", response.data)
            responseHandler(response)
        })
        .then(()=> {
            getNotifications()
        })
        .catch((e) => {
            alert(e.message, e)
        });
    }

    const responseHandler = (res) => {
        if (res.status === 200) {
            const response = res.data
            console.log('resp: ',response)
            setNoteData(response)
        } else if (res.status == 204) {
            return
        }
      }

    useEffect(() => {
        getNotifications()
    }, [])

    if (noteData) {
        noteBanners = noteData.map((req, ind) =>
        <Banner style={{ marginBottom: 10, marginHorizontal: 10, borderRadius: 20 }}
        key={req.notification_id} 
        visible={req.visible}
        actions={[{
                label: 'Clear',
                onPress: () => {setVisible(req.notification_id, 'False')},
                }
            ]}
            >
            {req.message}
            </Banner>
        )
    }

    if (noteData) {
            noteBanners2 = noteData.map((req, ind) =>
            <Banner style={{ marginBottom: 10, marginHorizontal: 10, borderRadius: 20 }}
            key={req.notification_id} 
            visible={req.visible ? '' : 'true'} 
            actions={[]}
                >
                {req.message}
                </Banner>
            )
    }

    return (
        <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        />
    );
  }

  export default Notifications

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