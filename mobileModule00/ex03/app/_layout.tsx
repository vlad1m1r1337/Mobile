import {View, StyleSheet, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import {useState} from "react";
import {calculateErrors, opereators} from "@/app/constants";
import {cutOperators} from "@/app/cutOperators";

export default function RootLayout() {
  const { height: screenHeight, width } = useWindowDimensions();
  const [calc, setCalc] = useState('0');
  const [result, setResult] = useState('3+5');
  const isLandscape = width > screenHeight;
  console.log(calc);
  const styles = createStyles(screenHeight, isLandscape);
  const setNumber = (num: string) => {
    if(calc === '0' || calc === 'error') {
      setCalc(num);
    }
    else {
      setCalc(calc + num)
    }
  }
  const setOperator = (operator: string) => {
    if(calc === '0') {}
    if (operator === '=') { setCalc(calculate(calc)) }
    else if (opereators.includes(calc[calc.length - 1])) {
      setCalc(calc.slice(0, -1) + operator);
    }
    else {
      setCalc(calc + operator);
    }
  }
  const setDot = (dot: string) => {
    setCalc(calc + dot);
  }
  function calculate(calc: string) {
    try {
      if (calculateErrors.includes(eval(cutOperators(calc)))) {
        throw new Error();
      }
      else {
        return eval(cutOperators(calc))
      }
    }
    catch {
      return 'error'
    }
  }
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Calculator</Text>
        </View>
        <View style={styles.display}>
          <Text style={styles.resButtons}>{calc}</Text>
          <Text style={styles.resButtons}>{calculate(calc)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setNumber('7')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >7</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNumber('8')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >8</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNumber('9')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >9</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
              setCalc('0');
              setResult('0');
            }}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.clear]} >C</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
              setCalc('0');
              setResult('0');
            }}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.clear]} >AC</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity  onPress={() => setNumber('4')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >4</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setNumber('5')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setNumber('6')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >6</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setOperator('+')}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >+</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setOperator('-')}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >-</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity  onPress={() => setNumber('1')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setNumber('2')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setNumber('3')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setOperator('*')}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >*</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setOperator('/')}>
              <View style={styles.buttonBox}>
                <Text style={[styles.buttons, styles.operators]} >/</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity  onPress={() => setNumber('0')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >0</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setDot('.')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setNumber('00')}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttons} >00</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setOperator('=')}>
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
  resButtons: {
    fontSize: 20,
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
