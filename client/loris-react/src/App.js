import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

const Page = styled.div`

    overflow: auto;
    margin-left: 85px;
    position: relative;
    width: calc(100vw - 85px);
    min-height: calc(100vh);
    z-index: -1;
    
    @media (min-width: 0px) {
        padding-top: 64px;      
    } 
    
    @media (min-width: 601px) {
        padding-top: 128px;      
    } 
    
    @media (min-width: 898px) {
        padding-top: 64px;
    }
    
`;

const Sidebar = styled.div`

    z-index: -1;
    width: 85px;
    display: flex;
    position: fixed;
    min-height: 100%;
    overflow: hidden;
    background: white;
    transition: width 1s;
    -webkit-transition: width 1s;
    box-shadow: 10px -10px 10px -10px rgba(66,66,66,0.3);
    flex-direction: column;
    flex-wrap: wrap;
    
    // &:hover {
    //     width: 400px;
    // }
    
`;

class App extends Component {
    state = {
        response: '',
        open: true,
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

    }

    sidebarHover() {
        console.log('okay');
        let element_first = document.getElementById('sidebar_element_first');
        let icon_first = document.getElementById('sidebar_element_icon_first');
        let element_second = document.getElementById('sidebar_element_second');
        let icon_second = document.getElementById('sidebar_element_icon_second');
        let element_third = document.getElementById('sidebar_element_third');
        let icon_third = document.getElementById('sidebar_element_icon_third');
        let element_fourth = document.getElementById('sidebar_element_fourth');
        let icon_fourth = document.getElementById('sidebar_element_icon_fourth');
        let element_fifth = document.getElementById('sidebar_element_fifth');
        let icon_fifth = document.getElementById('sidebar_element_icon_fifth');
        let sidebar = document.getElementById('app_sidebar');
        sidebar.style.transition = 'width 0.1s linear 0s';
        element_first.style.transition =
            element_second.style.transition =
                element_third.style.transition =
                    element_fourth.style.transition =
                        element_fifth.style.transition = 'width 0.1s linear 0s';
        sidebar.style.width = '200px';
        icon_first.style.width =
            icon_second.style.width =
                icon_third.style.width =
                    icon_fourth.style.width =
                        icon_fifth.style.width = '56px';
        icon_first.style.cssFloat =
            icon_second.style.cssFloat =
                icon_third.style.cssFloat =
                    icon_fourth.style.cssFloat =
                        icon_fifth.style.cssFloat = 'left';
        element_first.style.borderRadius =
            element_second.style.borderRadius =
                element_third.style.borderRadius =
                    element_fourth.style.borderRadius =
                        element_fifth.style.borderRadius = '15px 56px 56px 15px';
        element_first.style.width =
            element_fifth.style.width = '130px';
        element_second.style.width = '172px';
        element_third.style.width = '155px';
        element_fourth.style.width = '165px';

        element_first.innerHTML = icon_first.outerHTML + 'User';
        element_second.innerHTML = icon_second.outerHTML + 'Favorites';
        element_third.innerHTML = icon_third.outerHTML + 'History';
        element_fourth.innerHTML = icon_fourth.outerHTML + 'Feedback';
        element_fifth.innerHTML = icon_fifth.outerHTML + 'Guide';
    }

    sidebarHoverLeave() {
        console.log('omg');
        let element_first = document.getElementById('sidebar_element_first');
        let icon_first = document.getElementById('sidebar_element_icon_first');
        let element_second = document.getElementById('sidebar_element_second');
        let icon_second = document.getElementById('sidebar_element_icon_second');
        let element_third = document.getElementById('sidebar_element_third');
        let icon_third = document.getElementById('sidebar_element_icon_third');
        let element_fourth = document.getElementById('sidebar_element_fourth');
        let icon_fourth = document.getElementById('sidebar_element_icon_fourth');
        let element_fifth = document.getElementById('sidebar_element_fifth');
        let icon_fifth = document.getElementById('sidebar_element_icon_fifth');
        let sidebar = document.getElementById('app_sidebar');
        sidebar.style.transition = 'width 0.1s linear 0s';
        element_first.style.transition =
            element_second.style.transition =
                element_third.style.transition =
                    element_fourth.style.transition =
                        element_fifth.style.transition = 'width 0.1s linear 0s';
        sidebar.style.width = '85px';
        icon_first.style.width =
            icon_second.style.width =
                icon_third.style.width =
                    icon_fourth.style.width =
                        icon_fifth.style.width = '56px';
        icon_first.style.cssFloat =
            icon_second.style.cssFloat =
                icon_third.style.cssFloat =
                    icon_fourth.style.cssFloat =
                        icon_fifth.style.cssFloat = 'left';
        element_first.style.borderRadius =
            element_second.style.borderRadius =
                element_third.style.borderRadius =
                    element_fourth.style.borderRadius =
                        element_fifth.style.borderRadius = '5px';
        element_first.style.width =
            element_second.style.width =
                element_third.style.width =
                    element_fourth.style.width =
                        element_fifth.style.width = '56px';
        element_first.innerHTML = icon_first.outerHTML;
        element_second.innerHTML = icon_second.outerHTML;
        element_third.innerHTML = icon_third.outerHTML;
        element_fourth.innerHTML = icon_fourth.outerHTML;
        element_fifth.innerHTML = icon_fifth.outerHTML;
    }

    sidebar() {
        let page = document.getElementById('page');
        let sidebar = document.getElementById('app_sidebar');
        let icon = document.getElementById('sidebar_icon');
        this.setState({open: !this.state.open}, () => {
            if (this.state.open) {
                icon.innerHTML = 'remove';
                sidebar.style.display = 'flex';
                page.style.marginLeft = '85px';
                page.style.width = 'calc(100vw - 85px)';
            } else {
                icon.innerHTML = 'favorite';
                sidebar.style.display = 'none';
                page.style.marginLeft = '0';
                page.style.width = 'calc(100vw)';
            }
        });
    };

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200)
            throw Error(body.message);

        return body;
    };

    componentDidUpdate(prevProps, prevState) {
        let dropdowns = document.querySelectorAll('.dropdown-trigger');
        window.M.Dropdown.init(dropdowns, {hover: true, coverTrigger: false,});

        let sideNavs = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(sideNavs, {edge: 'right',});

        let tooltips = document.querySelectorAll('.tooltipped');
        window.M.Tooltip.init(tooltips, {});

        //collapsible-body
        let collapsible = document.querySelectorAll('.collapsible');
        window.M.Collapsible.init(collapsible, {});


    }

    render() {

        let style = {
            menu: {
                separator: {
                    left: {
                        display: 'flex'
                    },
                    right: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }
                },
                logo: {
                    container: {
                        height: '100%'
                    },
                    text: {
                        color: '#fff',
                        fontSize: '2.1rem',
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    }
                },
                navigation: {
                    main: {
                        container: {
                            margin: 0,
                            padding: 0,
                            textAlign: 'center',
                        },
                        text: {
                            outline: 'none',
                            padding: '0 8px',
                            fontSize: '0.9rem'
                        },
                        icon: {
                            margin: 0,
                            padding: 0,
                            fontSize: '0.9rem'
                        }
                    },
                    mobile: {
                        container: {
                            text: {
                                cursor: 'pointer'
                            }
                        },
                        text: {
                            margin: 0,
                            padding: 0,
                            color: '#fff'
                        },
                        tooltip: {
                            margin: 0,
                            padding: 0,
                            color: '#fff',
                            cursor: 'pointer'
                        },
                        icon: {
                            margin: 0,
                            padding: 0,
                            color: '#fff'
                        }
                    }
                },
                dropdown: {
                    text: {
                        color: '#fff'
                    }
                },
            },
            sidebar: {
                container: {
                    zIndex: -1,
                    width: '85px',
                    position: 'fixed',
                    minHeight: '100%',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '10px -10px 10px -10px rgba(66,66,66,0.3)'
                }
            }
        };

        return (
            <div className='App'>
                <div id='navbar-fixed' style={{position: 'fixed', top: 0, right: 0, left: 0}}>
                    <nav className='nav-extended'>
                        <div className='nav-wrapper' style={{background: '#042d54'}}>
                            <div className='left' style={style.menu.separator.left}>
                                <div style={{height: '100%', paddingLeft: '22px'}}>
                                    <a className='btn-floating btn-medium waves-effect waves-dark' style={{padding: 0, backgroundColor: '#6c8199'}} onClick={this.sidebar.bind(this)}>
                                        <i id='sidebar_icon' className='material-icons' style={{color: '#042d54', height: '40px', lineHeight: '40px'}}>remove</i>
                                    </a>
                                </div>
                                <div style={style.menu.logo.container}>
                                    <a style={style.menu.logo.text}>
                                        Loris
                                    </a>
                                </div>
                            </div>
                            <div id='sidenav' data-target='mobile_sidenav' className='sidenav-trigger hide-on-med-and-up right'>
                                <i className="material-icons" style={style.menu.navigation.mobile.container.text}>menu</i>
                            </div>
                            <div className='hide-on-small-only' style={style.menu.separator.right}>
                                <div>
                                    <ul id='nav-mobile' className='left hide-on-small'>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={style.menu.navigation.main.text} className='dropdown-trigger' data-target='candidate_dropdown'>
                                                Candidate<i style={style.menu.navigation.main.icon} className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={style.menu.navigation.main.text} className='dropdown-trigger' data-target='clinical_dropdown'>
                                                Clinical<i style={style.menu.navigation.main.icon} className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={style.menu.navigation.main.text} className='dropdown-trigger' data-target='imaging_dropdown'>
                                                Imaging<i style={style.menu.navigation.main.icon} className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={style.menu.navigation.main.text} className='dropdown-trigger' data-target='reports_dropdown'>
                                                Reports<i style={style.menu.navigation.main.icon} className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={style.menu.navigation.main.text} className='dropdown-trigger' data-target='tools_dropdown'>
                                                Tools<i style={style.menu.navigation.main.icon} className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={style.menu.navigation.main.text} className='dropdown-trigger' data-target='admin_dropdown'>
                                                Admin<i style={style.menu.navigation.main.icon} className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div style={{marginLeft: 'auto', flexGrow: 1}}>
                                    <ul id='nav-mobile' className='right hide-on-small'>
                                        <li style={style.menu.navigation.main.container}>
                                            <a style={{fontSize:'1.5rem'}}>
                                                ?
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a id='dropdown2' className='tooltipped' data-position='bottom' data-tooltip='Data Coordinating Center</br>Montreal</br>Ottawa</br>Rome'>
                                                Site Affiliations: 4
                                            </a>
                                        </li>
                                        <li style={style.menu.navigation.main.container}>
                                            <a id='dropdown' className='dropdown-trigger' style={{outline: 'none'}} data-target='account_dropdown'>
                                                Account<i className='material-icons right'>arrow_drop_down</i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <ul id='candidate_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '200px'}}>
                        <li><a style={style.menu.dropdown.text}>New Profile</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Access Profile</a></li>
                    </ul>
                    <ul id='clinical_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '200px'}}>
                        <li><a style={style.menu.dropdown.text}>Reliability</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Conflict Resolver</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Examiner</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Training</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Media</a></li>
                    </ul>
                    <ul id='imaging_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '200px'}}>
                        <li><a style={style.menu.dropdown.text}>DICOM Archive</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Imaging Browser</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>MRI Violated Scans</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Imaging Uploader</a></li>
                    </ul>
                    <ul id='reports_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '200px'}}>
                        <li><a style={style.menu.dropdown.text}>Statistics</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Data Query Tool</a></li>
                    </ul>
                    <ul id='tools_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '200px'}}>
                        <li><a style={style.menu.dropdown.text}>Data Dictionary</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Document Repository</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Data Integrity Flag</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Data Team Helper</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Instrument Builder</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Genomic Browser</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Data Release</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Acknowledgements</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Issue Tracker</a></li>
                    </ul>
                    <ul id='admin_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '200px'}}>
                        <li><a style={style.menu.dropdown.text}>User Accounts</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Survey Module</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Help Editor</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Instrument Manager</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Configuration</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Server Processes Manager</a></li>
                    </ul>
                    <ul id='account_dropdown' className='dropdown-content' style={{background: '#042d54', minWidth: '150px'}}>
                        <li><a style={style.menu.dropdown.text}>My Preferences</a></li>
                        <li className='divider'/>
                        <li><a style={style.menu.dropdown.text}>Log Out</a></li>
                    </ul>
                    <Sidebar id='app_sidebar' onMouseEnter={this.sidebarHover.bind(this)} onMouseLeave={this.sidebarHoverLeave.bind(this)}>
                        <div style={{paddingTop: '20px', paddingLeft: '14px'}}>
                            <a id='sidebar_element_first' className='btn-floating left btn-large waves-effect waves-dark' style={{padding: 0, backgroundColor: '#995768', borderRadius: '5px'}}>
                                <i id='sidebar_element_icon_first' className='material-icons' style={{color: '#540129', height: '56px', lineHeight: '56px', fontSize: '1.9rem'}}>person</i>
                            </a>
                        </div>
                        <div style={{paddingTop: '20px', paddingLeft: '14px'}}>
                            <a id='sidebar_element_second' className='btn-floating left btn-large waves-effect waves-dark' style={{padding: 0, backgroundColor: '#b394b9', borderRadius: '5px'}}>
                                <i id='sidebar_element_icon_second' className='material-icons' style={{color: '#694a91', height: '56px', lineHeight: '56px'}}>star</i>
                            </a>
                        </div>
                        <div style={{paddingTop: '20px', paddingLeft: '14px',}}>
                            <a id='sidebar_element_third' className='btn-floating left btn-large waves-effect waves-dark' style={{padding: 0, backgroundColor: '#5b9986', borderRadius: '5px'}}>
                                <i id='sidebar_element_icon_third' className='material-icons' style={{color: '#005454', height: '56px', lineHeight: '56px', fontSize: '1.9rem'}}>access_time</i>
                            </a>
                        </div>
                        <div style={{paddingTop: '20px', paddingLeft: '14px',}}>
                            <a id='sidebar_element_fourth' className='btn-floating left btn-large waves-effect waves-dark' style={{padding: 0, backgroundColor: '#99984c', borderRadius: '5px'}}>
                                <i id='sidebar_element_icon_fourth' className='material-icons' style={{color: '#544e00', height: '56px', lineHeight: '56px', fontSize: '1.9rem'}}>sentiment_very_satisfied</i>
                            </a>
                        </div>
                        <div style={{paddingTop: '20px', paddingLeft: '14px',}}>
                            <a id='sidebar_element_fifth' className='btn-floating left btn-large waves-effect waves-dark' style={{padding: 0, backgroundColor: '#697b99', borderRadius: '5px'}}>
                                <i id='sidebar_element_icon_fifth' className='material-icons' style={{color: '#003554', height: '56px', lineHeight: '56px', fontSize: '1.9rem'}}>school</i>
                            </a>
                        </div>
                    </Sidebar>
                </div>
                <div id='mobile_container'>
                    <ul id='mobile_sidenav' className='sidenav' style={{position: 'fixed', background: '#042d54', zIndex: 998}}>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Candidate<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>New Profile</a></li>
                                            <li><a>Access Profile</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Clinical<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>Reliability</a></li>
                                            <li><a>Conflict Resolver</a></li>
                                            <li><a>Examiner</a></li>
                                            <li><a>Training</a></li>
                                            <li><a>Media</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Imaging<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>DICOM Archive</a></li>
                                            <li><a>Imaging Browser</a></li>
                                            <li><a>MRI Violated Scans</a></li>
                                            <li><a>Imaging Uploader</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Reports<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>Statistics</a></li>
                                            <li><a>Data Query Tool</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Tools<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>Data Dictionary</a></li>
                                            <li><a>Document Repository</a></li>
                                            <li><a>Data Integrity Flag</a></li>
                                            <li><a>Data Team Helper</a></li>
                                            <li><a>Instrument Builder</a></li>
                                            <li><a>Genomic Browser</a></li>
                                            <li><a>Data Release</a></li>
                                            <li><a>Acknowledgements</a></li>
                                            <li><a>Issue Tracker</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Admin<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>User Accounts</a></li>
                                            <li><a>Survey Module</a></li>
                                            <li><a>Help Editor</a></li>
                                            <li><a>Instrument Manager</a></li>
                                            <li><a>Configuration</a></li>
                                            <li><a>Server Processes Manager</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='tooltipped' style={style.menu.navigation.mobile.tooltip} data-position='bottom' data-tooltip='Data Coordinating Center</br>Montreal</br>Ottawa</br>Rome'>
                                        Site Affiliations: 4
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className='no-padding'>
                            <ul className='collapsible collapsible-accordion'>
                                <li>
                                    <a className='collapsible-header' style={style.menu.navigation.mobile.text}>
                                        Admin account<i className='material-icons right' style={style.menu.navigation.mobile.icon}>arrow_drop_down</i>
                                    </a>
                                    <div className='collapsible-body'>
                                        <ul>
                                            <li><a>My Preferences</a></li>
                                            <li><a>Log Out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <Page id='page'>
                    <div>
                        <p className='App-intro'>
                            {this.state.response}
                        </p>

                        {/*<table className='centered highlight' style={{display: 'table', width: '100%'}}>*/}
                            {/*<thead>*/}
                            {/*<tr style={{background: '#042d54', color: '#fff'}}>*/}
                                {/*<th style={{borderRadius: 0}}>Name</th>*/}
                                {/*<th style={{borderRadius: 0}}>Item Name</th>*/}
                                {/*<th style={{borderRadius: 0}}>Item Price</th>*/}
                            {/*</tr>*/}
                            {/*</thead>*/}

                            {/*<tbody>*/}
                            {/*<tr>*/}
                                {/*<td>The base of the “fire tornado” was 1,000 feet wide — larger than three football fields — and was fueled by winds gusting to 165 mph, according to the Cal Fire report. It exploded 7.5 miles into the air, ripping roofs off homes and toppling power lines.</td>*/}
                                {/*<td>Eclair</td>*/}
                                {/*<td>$0.87</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                                {/*<td>Alan</td>*/}
                                {/*<td>Jellybean</td>*/}
                                {/*<td>$3.76</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                                {/*<td>Jonathan</td>*/}
                                {/*<td>Lollipop</td>*/}
                                {/*<td>$7.00</td>*/}
                            {/*</tr>*/}
                            {/*</tbody>*/}
                        {/*</table>*/}
                    </div>
                </Page>
            </div>
        );
    }
}

export default App;
