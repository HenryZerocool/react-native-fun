import * as React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import util from '../util'

export default class DealItem extends React.Component {
  componentDidMount() {
  }
  handlePress = () => {
    this.props.onPress(this.props.deal.key);
  }
  render() {
    const {deal} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Image style={styles.images} source={{uri: deal.media[0]}} />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.subtitle}>
            <Text>{deal.cause.name}</Text>
            <Text>{util.priceInDollar(deal.price)}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    padding: 10
  },
  images: {
    width: '100%',
    height: 150,
  },
  info: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderTop: 0
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  subtitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
