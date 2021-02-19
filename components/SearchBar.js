import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import util from '../util';
import debounce from 'lodash.debounce';

export default class SearchBar extends Component {
  state = {
    searchTerm: '',
  };
  debouncedSearch = debounce(this.props.onSearch, 1000)
  handleSearch = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearch(this.state.searchTerm);
    });
  };
  render() {
    return (
      <View style={styles.search}>
        <TextInput
          placeholder="Search All Deals"
          style={styles.input}
          onChangeText={this.handleSearch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    margin: 5,
  },
  input: {
    height: 40,
    marginHorizontal: 10,
  },
});
