import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import { Dropdown, Menu } from 'antd';

const CLASS_NAME = 'react-ant-dropdown-menu';

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.object,
    items: PropTypes.array,
    valueKey: PropTypes.string,
    onMenuClick: PropTypes.func
  };

  static defaultProps = {
    items: [],
    valueKey: 'value',
    onMenuClick: noop
  };
  /*===properties end===*/

  get menuView() {
    const { items, valueKey } = this.props;
    return (
      <Menu onClick={this._onMenuClick}>
        {items.map((item, index) => {
          const key = item[valueKey] || index;
          return <Menu.Item key={key}>{item.label || item}</Menu.Item>;
        })}
      </Menu>
    );
  }

  _onMenuClick = (inEvent) => {
    const { onMenuClick } = this.props;
    onMenuClick(inEvent);
  };

  render() {
    const { className, items, valueKey, ...props } = this.props;
    return (
      <Dropdown
        overlay={this.menuView}
        className={classNames(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
