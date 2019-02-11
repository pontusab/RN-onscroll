import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import Animated from "react-native-reanimated";

const { set, block, event, call, Value } = Animated;

export default class Example extends React.Component {
  state = {
    isActive: true
  };

  scrollY = new Value(0);

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
              ? event(
                  [
                    {
                      nativeEvent: ({ contentOffset }) =>
                        block([
                          set(this.scrollY, contentOffset.y),
                          call([this.scrollY], r =>
                            console.log("offsetY:", r[0])
                          ),
                          this.scrollY
                        ])
                    }
                  ],
                  { useNativeDriver: true }
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
