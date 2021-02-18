import * as React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

export default class DealList extends React.Component {
  componentDidMount() {
    // console.log(this.props.data);
    // for (let abc of this.props.data){
    //   console.log('abc', abc.title);
    // }
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
  },
});
