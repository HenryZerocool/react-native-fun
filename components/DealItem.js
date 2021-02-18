import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import util from '../util'

export default class DealItem extends React.Component {
  componentDidMount() {
  }
  render() {
    const {deal} = this.props;
    return (
      <View>
        <Image style={styles.images} source={{uri: deal.media[0]}} />
        <Text>{deal.title}</Text>
        <Text>{util.priceInDollar(deal.price)}</Text>
        <Text>{deal.cause.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: 150,
  },
});
