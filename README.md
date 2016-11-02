# react-native-city-select

![ui](./ui.png)

## Table of contents
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Response object](#the-response-object)

## Install

`npm install react-native-city-select@latest --save`

## Usage

```javascript

import CitySelect from "react-native-city-select"

const CITY = {
  A: [
    {
      cityId: '279',
      cityName: '阿坝',
      cityNameEn: 'Aba',
    },
    {
      cityId: '329',
      cityName: '安康',
      cityNameEn: 'Ankang',
    },
  ],
}

class Example extends Component {
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
      <View>
        <TouchableOpacity
          onPress={this.handleCityPress}
        >
          <Text>
            click me!
          </Text>
        </TouchableOpacity>
        {this.renderCitySelect()}
      </View>
    )
  }

}

```

### Options

Key | Type | Defalut
------ | ---- |  ----
cancelCity | function |
selectCity | function |
cityData | object |
cancelText | string | '取消'
titleText | string | '选择城市'


### The Response Object

key | Type
------  | ----------------------
cityObj | Object

