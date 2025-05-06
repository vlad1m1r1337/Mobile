import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import {parseChartInotherInfo} from "@/app/utils/parseInfo";

const ChartScreen = ({data}) => {
    const lineData = [
        { value: 0, dataPointText: '0' },
        { value: 10, dataPointText: '10' },
        { value: 8, dataPointText: '8' },
        { value: 58, dataPointText: '58' },
        { value: 56, dataPointText: '56' },
    ];

    const lineData2 = [
        { value: 0, dataPointText: '0' },
        { value: 20, dataPointText: '20' },
        { value: 18, dataPointText: '18' },
        { value: 40, dataPointText: '40' },
        { value: 36, dataPointText: '36' },
    ];
    const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const {first, second, labels} = parseChartInotherInfo(data);
    console.log('first: ', first, 'second: ', second);
    return (
        <View style={{ paddingHorizontal: 20, paddingBottom: 20}}>
            <LineChart
                data={second}
                data2={first}
                height={250}
                // xAxisLabelTexts={labels}
                showVerticalLines
                hideDataPoints
                rulesType={'solid'}
                verticalLinesStyle={{ strokeDasharray: '' }}
                spacing={11}
                initialSpacing={20}
                color1="skyblue"
                color2="red"
                textColor1="green"
                dataPointsHeight={1}
                dataPointsWidth={1}
                dataPointsColor1="skyblue"
                dataPointsColor2="red"
                textShiftY={-2}
                textShiftX={-5}
                textFontSize={1}
            />
        </View>
    );
};

export default ChartScreen;
