/**
 * Created by Alizée Wickenheiser on 6/25/18.
 * Les contes de fées sont faits pour être défaits...
 */

import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    root: {
        fontWeight: 200,
        fontFamily: 'Helvetica, Arial, sans-serif',
    },
    header: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: 'bold',
        padding: '28px 0 0 0',
        backgroundColor: '#1a487e',
    },
};

const NavigationTitlePanel = (props) => {
    const rootStyle = props.style ? {...styles.root, ...props.style} : styles.root;

    return (
        <div style={rootStyle}>
            <div style={styles.header}>{props.title}</div>
            {props.children}
        </div>
    );
};

NavigationTitlePanel.propTypes = {
    style: PropTypes.object,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    children: PropTypes.object,
};

export default NavigationTitlePanel;
