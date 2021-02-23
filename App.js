import * as React from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';
import SearchBar from './components/SearchBar';
import util from './util';

export default class App extends React.Component {
  titlePos = new Animated.Value(0);
  state = {
    deals: [],
    searchedDeals: [],
    currentDealId: null,
  };
  animateLogo = (direction = 1) => {
    const width = Dimensions.get('window').width;
    Animated.timing(this.titlePos, {
      toValue: (width / 2 - 100) * direction,
      duration: 1000,
      easing: Easing.ease
    }).start(({ finished }) => {
      if (finished) this.animateLogo(direction * -1);
    });
  };
  async componentDidMount() {
    this.animateLogo();
    const deals = await util.fetchInitial();
    this.setState({ deals });
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
    const dealsToDisplay =
      this.state.searchedDeals.length > 0
        ? this.state.searchedDeals
        : this.state.deals;
    if (dealsToDisplay.length > 0)
      return (
        <View style={styles.container}>
          <SearchBar onSearch={this.searchDeals} />
          <DealList data={dealsToDisplay} onPress={this.selectDeal} />
        </View>
      );
    return (
      <Animated.View style={[{ left: this.titlePos }, styles.logo]}>
        <Text style={styles.header}>Sales</Text>
      </Animated.View>
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
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
