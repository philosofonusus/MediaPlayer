import React, {useState, useCallback, useRef} from 'react';
import { StyleSheet, Text, FlatList, Image, View, Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {songs} from './temp_songs'

const {width} = Dimensions.get('window')

export default function App() {
  const flatList = useRef()
  const [current, setCurrent] = useState([{item: {...songs[0]}}])

  const setCurrentFromLayout = useRef(useCallback(({viewableItems}) => {
    console.log(viewableItems)
    return setCurrent(viewableItems)
  }, []))

  const  viewableSettings = useRef({itemVisiblePercentThreshold: 50})
  const renderItem = el => {
    return (
        <View style={styles.artwork}>
          <Image source={el.item.artwork} style={{width: 320, height: 320, borderRadius: 5}}/>
        </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        horizontal
        ref={flatList}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{height: 200}}
        onViewableItemsChanged={setCurrentFromLayout.current}
        viewabilityConfig={viewableSettings.current}
      />
      <View style={{paddingTop: 20, paddingBottom: 20}}>
        <Text style={styles.title}>
          {current[0].item.title}
        </Text>
        <Text style={styles.artist}>
          {current[0].item.artist}
        </Text>
      </View>
      <View style={styles.controller}>
        <TouchableOpacity onPress={() => flatList.current.scrollToIndex({index: +current[0].item.id === 0 ? current[0].item.id : +current[0].item.id - 1})}>
          <Ionicons name="play-skip-back" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('play')}>
          <Ionicons name="play" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => flatList.current.scrollToIndex({index: +current[0].item.id === +songs[songs.length - 1].id ? current[0].item.id : +current[0].item.id + 1})}>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'black',
    alignContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#fff',
  },
  artist: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  controller: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  artwork: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
