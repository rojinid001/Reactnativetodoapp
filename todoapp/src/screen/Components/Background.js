import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Background = () => {
    return (
        <View style={{alignItems:'center'}}>
            <Image source={require("../../../assets/to-do-list-apps.png")} style={{height:300,width:300}}/>
            <Text>Start Adding Your Task</Text>
        </View>
    )
}

export default Background

const styles = StyleSheet.create({})