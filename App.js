import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DealList from './components/DealList';
import fetch from './fetch';

export default class App extends React.Component {
  state = {
    deals: [],
  };
  async componentDidMount() {
    const deals = await fetch.fetchInitial();
    // console.log('data', deals);
    this.setState((prevState) => {
      return { deals };
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.deals.length > 0 ? (
          <DealList data={this.state.deals}/>
        ) : (
          <Text style={styles.header}>Sales</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});
