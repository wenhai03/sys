import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction
} from 'bizcharts';
import {connect} from "umi";

function CustomerEmailSend({customerEmailSend}: any) {

  const cols = {
    percent: {
      formatter: (val: any) => {
        return `${val}`;
      },
    },
  };


  return (
    <Chart height={400} data={customerEmailSend} scale={cols} autoFit onGetG2Instance={(c: any) => {
      c.geometries[0].elements.forEach((e: any, idx: any) => {
        e.setState('selected', idx === 0);
      })
    }}>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="count"
        adjust="stack"
        color="type"
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['count', {
          content: (data) => {
            return `${data.type}: ${data.percent}%`;
          },
        }]}
      />
      <Interaction type='element-single-selected' />
    </Chart>
  );
}

export default connect((state: any) => {
  const {data: {customerEmailSend}} = state
  return {
    customerEmailSend
  }
})(CustomerEmailSend)

