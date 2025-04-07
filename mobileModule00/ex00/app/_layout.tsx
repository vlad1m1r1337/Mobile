import {View, StyleSheet, Text, TouchableOpacity, useWindowDimensions, Dimensions, ScaledSize} from "react-native";

export default function RootLayout() {
    return (
    <View style={styles.container}>
      <Text style={styles.text} >A simple text</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
        <Text style={styles.buttonText} >Click me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
    text: {
      fontSize: 20,
      backgroundColor:'yellow',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 5,
    },
    button: {
      backgroundColor: 'lightgray',
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    buttonText: {
      fontSize: 20,
      color: 'yellow',
    }

})