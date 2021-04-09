import React from 'react';
import {
  Chart,
  Interval,
  Axis,
  Geom,
} from 'bizcharts';
import {connect} from "umi";

function ShipColumnar({nationalType}: any) {

  const scales = {
    count: {
      alias: '数量', // 为属性定义别名
      min: 0, // 定义数值范围的最小值
      // max: 100, // 定义数值范围的最大值
      // tickInterval: 20, // 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
    },
    type: {
      alias: '名字'
    },
  };

  return (
    <Chart height={450} autoFit data={nationalType} scale={scales} appendPadding={[30, 5]}>
      <Axis name="船舶名字" title />
      <Axis name="数量" title />
      <Interval position="type*count"  />

      <Geom type="interval" position="type*count" size={12} />

      <Interval
        color={["type", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]]}

        position="type*count"
        label={[
          'count',
          (val) => {
            return {
              content: val,
              style: {
                fill: 'rgb(255, 85, 0)',
                fontSize: 12,
                fontWeight: 'bold',
              },
            };
          },
        ]}
      />
    </Chart>
  );
}

export default connect((state: any) => {
  const {data: {nationalType}} = state
  return {
    nationalType
  }
})(ShipColumnar)
