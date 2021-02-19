import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';
import util from './util';

export default class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };
  async componentDidMount() {
    const deals = await util.fetchInitial();
    // console.log('data', deals);
    this.setState((prevState) => {
      return { deals };
    });
  }
  selectDeal = (dealId) => {
    this.setState({
      currentDealId: dealId,
    });
  };
  unSelectDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };
  render() {
    if (this.state.currentDealId) {
      return <DealDetail initialDeal={this.currentDeal()} onBack={this.unSelectDeal}/>;
    }
    if (this.state.deals.length > 0)
      return <DealList data={this.state.deals} onPress={this.selectDeal} />;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sales</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 40,
  },
});
