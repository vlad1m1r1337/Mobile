import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import {parseChartInotherInfo} from "@/app/utils/parseInfo";

const ChartScreen = ({data, spacing}) => {
    const {first, second, labels} = parseChartInotherInfo(data);
    return (
        <View>
            <LineChart
                data={second}
                data2={first}
                height={250}
                // xAxisLabelTexts={labels}
                showVerticalLines
                hideDataPoints
                rulesType={'solid'}
                verticalLinesStyle={{ strokeDasharray: '' }}
                spacing={spacing}
                initialSpacing={0}
                color1="skyblue"
                color2="red"
                textColor1="green"
                dataPointsHeight={1}
                dataPointsWidth={1}
                dataPointsColor1="skyblue"
                dataPointsColor2="red"
                // textShiftY={0}
                // textShiftX={0}
                // textFontSize={20}
            />
        </View>
    );
};

export default ChartScreen;
