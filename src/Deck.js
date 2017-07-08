import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder
 } from 'react-native';

class Deck extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY();
    // Never updated with setState() could have:
    // this.panResponder = panResponder;
    // this.state = { panResponder };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {}
    });
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.position.getLayout()}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
