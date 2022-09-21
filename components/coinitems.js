import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const CoinItems = ({coin}) => {
  return (
    <View style={styles.conteinerItem}>
        <View style={styles.cointName}>
            <Image
                style={styles.image}
                source={{uri: coin.image}}
            />
            <View style={styles.containerName}>
                <Text style={styles.text}>{coin.name}</Text>
                <Text style={styles.symbol}>{coin.symbol}</Text>
            </View>
        </View>
        <View>
            <Text style={styles.textPrice}>${coin.current_price}</Text>
            <Text
                style={[
                    styles.pricePercentage, 
                    coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
                ]}
            >{coin.price_change_percentage_24h}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    conteinerItem: {
        backgroundColor: '#121212',
        padding: 10,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    cointName: {
        flexDirection: 'row'
    },
    image: {
        width: 30,
        height: 30
    },
    text: {
        color: '#ffffff'
    },
    symbol:{
        color: '#434343',
        textTransform: 'uppercase'
    },
    containerName: {
        marginLeft: 10
    },
    textPrice:{
        textAlign: 'right',
        color: '#fff'
    },
    pricePercentage:{
        textAlign: 'right'
    },
    priceUp: {
        color: '#00B5B9'
    },
    priceDown: {
        color: '#FC4422'
    }
})

export default CoinItems