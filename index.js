import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalY: new Animated.Value(deviceHeight),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.modalY, {
      duration: 500,
      toValue: 0,
    }).start();
  }

  getExtendStyle(item) {
    const cityWidth = { width: deviceWidth / this.props.cityGrid };
    const selectedBg = { backgroundColor: this.props.selectedBg };
    const cityTextCenter = this.props.cityGrid === 1 ? {} : { alignItems: 'center' };
    const selectedStyle = this.props.selectedId === item.cityId ? selectedBg : {};

    const extendStyle = {
      ...cityWidth,
      ...cityTextCenter,
      ...selectedStyle,
    };
    return extendStyle;
  }

  renderCityItem(cityData) {
    return (
      <FlatList
        numColumns={this.props.cityGrid}
        removeClippedSubviews
        initialListSize={20}
        keyExtractor={(item, index) => `cityItem${index}`}
        data={cityData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.city, this.getExtendStyle(item)]}
            key={item.cityId}
            onPress={this.props.selectCity.bind(this, item)}
          >
            <Text style={styles.cityText}>
              {item.cityName}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  renderHeader() {
    const cancelText = {
      color: this.props.cancelColor,
      fontSize: this.props.cancelSize,
    };
    if (this.props.hasHeader) {
      return (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={this.props.cancelCity}
          >
            <Text style={cancelText}>
              {this.props.cancelText}
            </Text>
          </TouchableOpacity>
          <View style={styles.titleText}>
            <Text>
              {this.props.titleText}
            </Text>
          </View>
        </View>
      );
    }
  }

  renderCitys() {
    const CITY = this.props.cityData;
    return (
      <FlatList
        removeClippedSubviews
        initialListSize={10}
        keyExtractor={(item, index) => `letter${index}`}
        data={Object.keys(CITY)}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.title}>
              {item}
            </Text>
            <View style={styles.cityBox}>
              {this.renderCityItem(CITY[item])}
            </View>
          </View>
        )}
      />
    );
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{
              translateY: this.state.modalY,
            }],
          },
        ]}
      >
        <StatusBar hidden />
        {this.renderHeader()}
        <ScrollView>
          {this.renderCitys()}
        </ScrollView>
      </Animated.View>
    );
  }
}

CitySelect.defaultProps = {
  selectedId: '',
  cancelText: '取消',
  titleText: '选择城市',
  hasHeader: true,
  cancelColor: '#51a8fb',
  cancelSize: 14,
  selectedBg: '#26A1FD',
  cityGrid: 1,
};

CitySelect.propTypes = {
  hasHeader: PropTypes.bool,
  cancelText: PropTypes.string,
  cancelColor: PropTypes.string,
  cancelSize: PropTypes.number,
  titleText: PropTypes.string,
  selectedId: PropTypes.string,
  selectedBg: PropTypes.string,
  cityGrid: PropTypes.number,
  cancelCity: PropTypes.func.isRequired,
  selectCity: PropTypes.func.isRequired,
  cityData: PropTypes.object.isRequired,
};

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
    borderBottomWidth: 1,
  },
  cancel: {
    position: 'absolute',
    left: 10,
    top: 15,
  },
  title: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    color: '#333',
    fontSize: 12,
  },
  cityBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  city: {
    height: 40,
    padding: 15,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
    justifyContent: 'center',
  },
  cityText: {
    color: '#333',
    fontSize: 12,
  },
});

export default CitySelect;
