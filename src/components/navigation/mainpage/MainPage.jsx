import React from 'react';
import ResponsiveDrawer from 'components/navbar/ResponsiveDrawer';
import { useSelector } from 'react-redux';
import { profileSelector } from 'redux/selectors';

const MainPage = (props) => {
    const profile = useSelector(profileSelector);
    return (
        profile.authenticated ? <div>
            <ResponsiveDrawer />
            {props.children}
        </div> :
            props.children
    );
};
export default MainPage;
