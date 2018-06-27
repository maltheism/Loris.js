/**
 * Created by Alizée Wickenheiser on 6/25/18.
 * Les contes de fées sont faits pour être défaits...
 */

import React from 'react';
import MaterialTitlePanel from './NavigationTitlePanel';
import PropTypes from 'prop-types';

const styles = {
    sidebar: {
        width: 256,
        height: '100%',
    },
    sidebarLink: {
        color: '#fff',
        fontSize: '16px',
        display: 'block',
        padding: '10px 0px',
        textDecoration: 'none',
    },
    divider: {
        height: 1,
        width: '60%',
        margin: '4px 0',
        display: 'inline-block',
        backgroundColor: '#123860',
    },
    content: {
        padding: '10px',
        textAlign: 'center',
        height: 'calc(100vh)',
        backgroundColor: '#1a487e',
    },
};

const SidebarContent = (props) => {
    const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

    const links = [];

    for (let i = 0; i<10; i++) {
        links.push(
            <a key={i} href='#' style={styles.sidebarLink}>Menu item {i}</a>
        );
    }

    return (
        <MaterialTitlePanel title='Navigation' style={style}>
            <div style={styles.content}>
                <a href='index.html' style={styles.sidebarLink}>&#171; Back to list</a>
                <a href='other.html' style={styles.sidebarLink}>Volume Viewer</a>
                <div style={styles.divider} />
                {links}
            </div>
        </MaterialTitlePanel>
    );
};

SidebarContent.propTypes = {
    style: PropTypes.object,
};

export default SidebarContent;
