import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import DealItem from './DealItem'

export default class DealList extends React.Component {
  componentDidMount() {
    console.log(this.props.data);
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => <DealItem style={styles.list} deal={item}></DealItem>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    fontSize: 20,
  },
});
