import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  Linking,
} from 'react-native';
import util from '../util';

export default class DealItem extends React.Component {
  width = Dimensions.get('window').width;
  imageXPos = new Animated.Value(0);
  state = {
    deal: this.props.initialDeal,
    imageIndex: 0,
  };
  swipeResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      // 0.4 : if image swiped by 40% of screen dimension
      // gs.dx : position of pan being dragged
      if (Math.abs(gs.dx / this.width) > 0.4) {
        // dx < 0 means swipe left, and reverse
        const direction = Math.sign(gs.dx);
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(direction * -1));
      } else {
        this.animationCancel();
      }
    },
  });
  handleSwipe = (indexDirection) => {
    // swipe left means direction < 0, but image will be incremented, so index is direction reversed
    if (this.state.deal.media[this.state.imageIndex + indexDirection]) {
      this.setState(
        (prevState) => {
          return { imageIndex: prevState.imageIndex + indexDirection };
        },
        () => {
          // next image animation - reset this position of new image
          this.imageXPos.setValue(indexDirection * this.width);
          Animated.spring(this.imageXPos, {
            toValue: 0,
          }).start();
        }
      );
      console.log('relase');
    } else {
      this.animationCancel();
    }
  };
  animationCancel = () => {
    Animated.spring(this.imageXPos, {
      toValue: 0,
    }).start();
  };
  async componentDidMount() {
    const dealDetail = await util.fetchDealDetails(this.state.deal.key);
    this.setState({
      deal: dealDetail,
    });
  }
  openExLink = () => {
    Linking.openURL(this.state.deal.url);
  };
  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.goBack}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.swipeResponder.panHandlers}
          style={[{ left: this.imageXPos }, styles.images]}
          source={{ uri: deal.media[this.state.imageIndex] }}
        />
        <Text style={styles.title}>{deal.title}</Text>
        <ScrollView>
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
        </ScrollView>
        <Button title="Buy it from provider" onPress={this.openExLink} />
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
