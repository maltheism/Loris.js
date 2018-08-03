/**
 * Created by Alizée Wickenheiser on 6/25/18.
 * Les contes de fées sont faits pour être défaits...
 */

import React from 'react';

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
    const links = [];

    for (let i = 0; i<10; i++) {
        links.push(
            <a key={i} href='' style={styles.sidebarLink}>Menu item {i}</a>
        );
    }

    return (
        <div style={{fontWeight: 200, fontFamily: 'Helvetica, Arial, sans-serif',width: 256, height: '100%',}}>
            <div style={{color: '#fff', fontSize: '20px', fontWeight: 'bold', padding: '28px 0 0 0', backgroundColor: '#1a487e'}}>
                Navigation
            </div>
            <div style={styles.content}>
                <a href='index.html' style={styles.sidebarLink}>&#171; Back to list</a>
                <a href='other.html' style={styles.sidebarLink}>Volume Viewer</a>
                <div style={styles.divider} />
                {links}
            </div>
        </div>
    );
};

SidebarContent.propTypes = {
};

export default SidebarContent;
