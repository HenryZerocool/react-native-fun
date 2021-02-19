import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';
import SearchBar from './components/SearchBar';
import util from './util';

export default class App extends React.Component {
  state = {
    deals: [],
    searchedDeals: [],
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
  searchDeals = async (searchTerm) => {
    let searchedDeals = [];
    if (searchTerm) searchedDeals = await util.searchByTerm(searchTerm);
    this.setState({ searchedDeals });
  };
  render() {
    if (this.state.currentDealId) {
      return (
        <DealDetail
          initialDeal={this.currentDeal()}
          onBack={this.unSelectDeal}
        />
      );
    }
    const dealsToDisplay = this.state.searchedDeals.length > 0 ? this.state.searchedDeals : this.state.deals;
    if (dealsToDisplay)
      return (
        <View style={styles.container}>
          <SearchBar onSearch={this.searchDeals} />
          <DealList data={dealsToDisplay} onPress={this.selectDeal} />
        </View>
      );
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
    // justifyContent: 'center',
    // backgroundColor: '#eee',
    // alignItems: 'center',
    paddingTop: 20,
    // marginTop: 20,
  },
  header: {
    fontSize: 40,
  },
});
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';
import SearchBar from './components/SearchBar';
import util from './util';

export default class App extends React.Component {
  state = {
    deals: [],
    searchedDeals: [],
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
  searchDeals = async (searchTerm) => {
    let searchedDeals = [];
    if (searchTerm) searchedDeals = await util.searchByTerm(searchTerm);
    this.setState({ searchedDeals });
  };
  render() {
    if (this.state.currentDealId) {
      return (
        <DealDetail
          initialDeal={this.currentDeal()}
          onBack={this.unSelectDeal}
        />
      );
    }
    const dealsToDisplay = this.state.searchedDeals.length > 0 ? this.state.searchedDeals : this.state.deals;
    if (dealsToDisplay)
      return (
        <View style={styles.container}>
          <SearchBar onSearch={this.searchDeals} />
          <DealList data={dealsToDisplay} onPress={this.selectDeal} />
        </View>
      );
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
    // justifyContent: 'center',
    // backgroundColor: '#eee',
    // alignItems: 'center',
    paddingTop: 20,
    // marginTop: 20,
  },
  header: {
    fontSize: 40,
  },
});
