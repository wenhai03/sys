import React, { Fragment } from 'react';
import styles from './index.less';

function Index (props) {


  return (
    <Fragment>
      <a className={styles.textEffect} style={{width: 350, overflow: 'hidden'}}  href="#">
      {props.text}
            <span data-letters={props.text}/>
        <span data-letters={props.text}/>
      </a>
    </Fragment>
  )
}

export default Index
