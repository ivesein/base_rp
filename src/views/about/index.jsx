import React, { Component } from 'react'
// import './index.scss';
import styles from './index.module.scss';
export default class About extends Component {
    render() {
        return (
            <div className={styles["about-page"]}>
                about...
                <span>测试</span>
            </div>
        )
    }
}
