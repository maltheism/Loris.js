/**
 * Created by Alizée Wickenheiser on 6/25/18.
 * Les contes de fées sont faits pour être défaits...
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultStyles = {
    root: {
        top: 0,
        bottom: 0,
        overflow: 'auto',
        display: 'table-cell'
    },
    sidebar: {
        top: 0,
        bottom: 0,
        zIndex: 2,
        overflowY: 'auto',
    },
    content: {
        top: 0,
        bottom: 0,
        overflowY: 'scroll',
    }
};

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // width of the sidebar in pixels
            sidebarWidth: props.defaultSidebarWidth,
        };

        this.saveSidebarRef = this.saveSidebarRef.bind(this);
    }

    componentDidMount() {
        this.setState({

        });
        this.saveSidebarWidth();
    }

    componentDidUpdate() {

    }

    saveSidebarRef(node) {
        this.sidebar = node;
    }


    saveSidebarWidth() {
        const width = this.sidebar.offsetWidth;

        if (width !== this.state.sidebarWidth) {
            this.setState({sidebarWidth: width});
        }
    }

    render() {
        const sidebarStyle = {...defaultStyles.sidebar, ...this.props.styles.sidebar};
        const contentStyle = {...defaultStyles.content, ...this.props.styles.content};
        const rootProps = {
            className: this.props.rootClassName,
            style: {...defaultStyles.root, ...this.props.styles.root},
            role: 'navigation',
        };

        // sidebarStyle right/left
        if (this.props.pullRight) {
            sidebarStyle.right = 0;
        } else {
            sidebarStyle.left = 0;
        }

        return (
            <div {...rootProps}>
                <div className={this.props.sidebarClassName} style={sidebarStyle} ref={this.saveSidebarRef}>
                    {this.props.sidebar}
                </div>
                <div className={this.props.contentClassName} style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

Sidebar.propTypes = {
    // main content to render
    children: PropTypes.node,

    // styles
    styles: PropTypes.shape({
        root: PropTypes.object,
        sidebar: PropTypes.object,
        content: PropTypes.object,
    }),

    // root component optional class
    rootClassName: PropTypes.string,

    // sidebar optional class
    sidebarClassName: PropTypes.string,

    // content optional class
    contentClassName: PropTypes.string,

    // sidebar content to render
    sidebar: PropTypes.node.isRequired,

    // Place the sidebar on the right
    pullRight: PropTypes.bool,

    // Initial sidebar width when page loads
    defaultSidebarWidth: PropTypes.number,
};

Sidebar.defaultProps = {
    styles: {},
    pullRight: false,
    defaultSidebarWidth: 0,
};

export default Sidebar;
