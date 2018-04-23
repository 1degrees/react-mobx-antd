import React, {Component} from 'react';
import Loading from 'components/Loading/Loading';
import Bundle from './Bundle'
//懒加载
const createComponent = component => props => (
    <Bundle load={component}>
        {
            Comp  => Comp  ? <Comp {...props}/> : <Loading/>
        }
    </Bundle>
);
export default createComponent