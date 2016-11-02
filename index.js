import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

class CitySelect extends Component {
  constructor(props) {
     super(props)
     this.state = {
       modalY: new Animated.Value(deviceHeight)
     }
  }

  componentDidMount() {
    Animated.timing(this.state.modalY, {
      duration: 500,
      toValue: 0
    }).start()
  }

  renderCityItem(cityData) {
    const cityItem = cityData.map((i, item) => (
      <TouchableOpacity
        style={styles.city}
        key={i.cityId}
        onPress={this.props.selectCity.bind(this,i)}
      >
        <Text style={styles.cityText}>
          {i.cityName}
        </Text>
      </TouchableOpacity>
    ))

    return cityItem
  }

  renderCitys() {
    const CITY=this.props.cityData
    const citys = Object.keys(CITY).map((index, ele) => (
      <View key={index}>
        <Text style={styles.title}>
          {index}
        </Text>
        <View style={styles.cityBox}>
          {this.renderCityItem(CITY[index])}
        </View>
      </View>
    ))

    return citys
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{
              translateY: this.state.modalY
            }]
          }
        ]}
      >
          <StatusBar hidden/>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={this.props.cancelCity}
            >
              <Text style={styles.cancelText}>
                {this.props.cancelText}
              </Text>
            </TouchableOpacity>
            <Text>
              {this.props.titleText}
            </Text>
          </View>
          <ScrollView>
            {this.renderCitys()}
          </ScrollView>
      </Animated.View>
    )
  }
}

CitySelect.defaultProps = {
  cancelText: '取消',
  titleText: '选择城市',
}

CitySelect.propTypes = {
  cancelText: React.PropTypes.string,
  titleText: React.PropTypes.string,
  cancelCity: React.PropTypes.func.isRequired,
  selectCity: React.PropTypes.func.isRequired,
  cityData: React.PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: '#F2F2F2',
    borderBottomWidth:1,
  },
  cancel: {
    position: 'absolute',
    left: 10,
  },
  cancelText: {
    color: '#51a8fb',
  },
  title: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    color: '#333',
    fontSize: 10,
  },
  cityBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  city: {
    width: deviceWidth*0.25,
    height: 40,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cityText: {
    color: '#333',
    fontSize: 12,
  }
})

export default CitySelect
