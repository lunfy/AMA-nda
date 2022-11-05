import * as React from 'react'
import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { Banner, BottomNavigation } from "react-native-paper";
import axios from 'axios'
import { useTheme } from '@react-navigation/native';

const Notifications = (props) => {

    const { colors } = useTheme()

    const notURL = props.not
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            padding: 10,
            backgroundColor: colors.background
        },
        view: {
            flex: 1, 
            paddingTop: 20,
            backgroundColor: colors.background
        },
        banner: {
            marginBottom: 10, 
            marginHorizontal: 10, 
            borderRadius: 20,
            backgroundColor: colors.card
        },
        text: {
            color: colors.text
        }
      })

    const NewRoute = () => 
    <ScrollView style={styles.view}>
        {noteBanners}
            { noteData ? (<></>) : 
                (
                    <Text style={styles.text}>You have no new notifications</Text>
                )
            }
    </ScrollView>;

    const ArchiveRoute = () => 
    <ScrollView style={styles.view}>
        {noteBanners2}
            { noteData ? (<></>) : 
                (
                    <Text style={styles.text}>You have no archived notifications</Text>
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
            url: `${notURL}?uid=${user}`,
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
            url: `${notURL}`,
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

    // const deleteNotification = (nid) => {
    //     axios({
    //         method: 'DELETE',
    //         url: `${REQ_NOTE}`,
    //         headers: {
    //             "Authorization":`${jwt}`
    //         },
    //         data: {
    //             nid: `${nid}`
    //         }
    //     })
    //     .then(response => {
    //         console.log("data: ", response.data)
    //         responseHandler(response)
    //     })
    //     .then(()=> {
    //         getNotifications()
    //     })
    //     .catch((e) => {
    //         alert(e.message, e)
    //     });
    // }

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
        <Banner style={styles.banner}
        key={req.notification_id} 
        visible={req.visible}
        actions={[{
                label: 'Clear',
                onPress: () => {setVisible(req.notification_id, 'False')},
                }
            ]}
            >
            <Text style={styles.text}>{req.message}</Text>
            </Banner>
        )
    }

    if (noteData) {
            noteBanners2 = noteData.map((req, ind) =>
            <Banner style={styles.banner}
            key={req.notification_id} 
            visible={req.visible ? '' : 'true'} 
            actions={[]}
                >
                <Text style={styles.text}>{req.message}</Text>
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
