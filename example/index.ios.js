/**
 * React Native Select City
 * https://github.com/ryanyu104/react-native-city-select
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import CitySelect from "react-native-city-select"
import CITY from './cityData'

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cityStatus: false,
      cityText: '',
      cityId: '',
    }

    this.handleCityCancel = this.handleCityCancel.bind(this)
    this.handleCitySelect = this.handleCitySelect.bind(this)
    this.handleCityPress = this.handleCityPress.bind(this)
  }

  handleCityPress() {
    this.setState({
      cityStatus: true,
    })
  }

  handleCitySelect(cityObj) {
    this.setState({
      cityStatus: false,
      cityText: cityObj.cityName,
      cityId: cityObj.cityId,
    })
  }

  handleCityCancel() {
    this.setState({
      cityStatus: false,
    })
  }

  renderCitySelect() {
    if (this.state.cityStatus) {
      return (
        <CitySelect
        cancelCity={this.handleCityCancel}
        selectCity={this.handleCitySelect}
        cityData={CITY}
      />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleCityPress}
        >
          <Text style={styles.click}>
            click me!
          </Text>
          <Text style={styles.select}>
            已选择：{this.state.cityText} ID：{this.state.cityId}
          </Text>
        </TouchableOpacity>
        {this.renderCitySelect()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  click: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  select: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
