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


function ShipType({shipType}:any) {

  const cols = {
    count: {
      formatter: (val: any) => {
        return `${val}艘`;
      },
    },
  };


  return (
    <Chart height={400} data={shipType} scale={cols} autoFit onGetG2Instance={(c: any) => {
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
  const {data: {shipType}} = state
  return {
    shipType
  }
})(ShipType)
