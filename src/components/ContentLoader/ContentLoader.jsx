import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './ContentLoader.scss';

const ContentLoader = ({ visible }) => (
    <CSSTransition in={visible} timeout={500} classNames="loader-appearing-animation" unmountOnExit>
        <div className="loader-box">
            <div className="circle-border">
                <div className="circle-core" />
            </div>
        </div>
    </CSSTransition>
);

ContentLoader.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default ContentLoader;