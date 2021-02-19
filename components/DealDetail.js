import * as React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import util from '../util';

export default class DealItem extends React.Component {
  state = {
    deal: this.props.initialDeal,
  };
  async componentDidMount() {
    const dealDetail = await util.fetchDealDetails(this.state.deal.key);
    this.setState({
      deal: dealDetail,
    });
  }

  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.goBack}>Back</Text>
        </TouchableOpacity>
        <Image style={styles.images} source={{ uri: deal.media[0] }} />
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.info}>
          <View style={styles.subtitle}>
            <Text>{deal.cause.name}</Text>
            <Text>{util.priceInDollar(deal.price)}</Text>
          </View>
          {deal.user && (
            <View style={styles.users}>
              <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
          )}
        </View>
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    backgroundColor: '#eee',
    padding: 10,
  },
  images: {
    width: '100%',
    height: 150,
  },
  avatar: {
    width: 75,
    height: 75,
  },
  info: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderTop: 0,
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#e7a377',
    paddingHorizontal: 5,
  },
  subtitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  users: {
    flex: 1,
    alignItems: 'center',
  },
  description: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderTop: 0,
  },
  goBack: {
    color: '#22f',
    marginVertical: 5,
  },
});
