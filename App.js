import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'
import CoinItems from './components/coinitems.js'

const App = () => {

  const [coins, setCoins] = useState([])  
  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)

  const loadData = async () => {
    
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    
    const data = await res.json()
    
    setCoins(data)
    
  }

  useEffect(() => {
    loadData()
  },[]);

  return (
    <View style={styles.conteiner}>
      <StatusBar style={styles.statusbar}/>
      <View style={styles.header}>
        <Text style={styles.title}>App Coingecko</Text>
        <TextInput 
          style={styles.search}
          placeholder='Search a Coin'
          placeholderTextColor='#858585'
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search))
        }
        renderItem={({item}) => {          
          return <CoinItems coin={item}/>
        }} 
        showsVerticalScrollIndicator = {false}
        refreshing = {refresh}
        onRefresh = {async() => {
          setRefresh(true)
          await loadData();
          setRefresh(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },
  list:{
    width: '90%'
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'90%',
    marginBottom: 10
  },
  statusbar: {
    backgroundColor:'#141414'
  },
  search:{
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  }
})
export default App