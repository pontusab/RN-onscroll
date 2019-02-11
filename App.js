import React from "react";
import { Animated, View, Text, Button, ScrollView } from "react-native";

export default class Example extends React.Component {
  state = {
    isActive: true
  };

  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);

    this.scrollY.addListener(e => console.log(e.value));
  }

  toggleHandler = () => {
    this.setState(prevState => ({ isActive: !prevState.isActive }));
  };

  render() {
    console.log(this.state.isActive ? "attached handler" : "detached handler");

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.ScrollView
          style={{ flex: 1, paddingTop: 100 }}
          scrollEventThrottle={1}
          onScroll={
            this.state.isActive
              ? Animated.event(
                  [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                  {
                    useNativeDriver: true
                  }
                )
              : null
          }
        >
          <Button
            title={this.state.isActive ? "detach handler" : "attach handler"}
            onPress={this.toggleHandler}
          />

          {Array.from({ length: 60 }).map((_, i) => (
            <View key={i} style={{ height: 50 }}>
              <Text>{i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}
