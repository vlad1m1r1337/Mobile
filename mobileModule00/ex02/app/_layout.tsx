import {View, StyleSheet, Text, TouchableOpacity, useWindowDimensions, Dimensions, ScaledSize} from "react-native";
import {useEffect, useState} from "react";

export default function RootLayout() {
  const { height: screenHeight, width } = useWindowDimensions();
  const [calc, setCalc] = useState(0);
  const [result, setResult] = useState(0);
  const isLandscape = width > screenHeight;
  const styles = createStyles(screenHeight, isLandscape);
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Calculator</Text>
        </View>
        <View style={styles.display}>
          <Text style={styles.buttons}>{calc}</Text>
          <Text style={styles.buttons}>{result}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() =>{console.log('7')}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >7</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{console.log('8')}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >8</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{console.log('9')}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >9</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{console.log('C')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.clear]} >C</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{console.log('AC')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.clear]} >AC</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity  onPress={() =>{console.log(4)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >4</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log(5)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log(6)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >6</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('+')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('-')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >-</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity  onPress={() =>{console.log(1)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log(2)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log(3)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('*')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >*</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('/')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >/</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity  onPress={() =>{console.log(0)}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >0</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('.')}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('00')}}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >00</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>{console.log('=')}}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >=</Text>
              </View>
            </TouchableOpacity>
            <View>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} ></Text>
              </View>
            </View>
          </View>
        </View>
      </View>
  );
};

const createStyles = (screenHeight: number, isLandscape: boolean) => StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2C3E50',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
  },
  display: {
    backgroundColor: '#34495E',
    display: 'flex',
    flexDirection: 'column',
    alignItems:'flex-end',
    paddingVertical:20,
    paddingHorizontal:20,
    flex: 2,

  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // minHeight: (screenHeight + 0) / 2,
    paddingHorizontal: 20,
    flex: 3,

  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  buttons: {
    fontSize: 15,
  },
  operators: {
    color: '#FFFFFF',
  },
  clear: {
    color: '#FF0000',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
