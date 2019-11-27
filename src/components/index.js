import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import ReactAntMenu from '@feizheng/react-ant-menu';
import { Dropdown, Menu } from 'antd';

const CLASS_NAME = 'react-ant-dropdown-menu';

export default class extends React.Component {
  static displayName = CLASS_NAME;
  static propTypes = {
    className: PropTypes.string,
    menuOptions: PropTypes.shape({
      value: PropTypes.array,
      onChange: PropTypes.func,
      highlighted: PropTypes.bool,
      stopPropagation: PropTypes.bool,
      items: PropTypes.array,
      template: PropTypes.func
    })
  };

  static defaultProps = {
    menuOptions: {
      highlighted: false,
      stopPropagation: false,
      items: [],
      value: [],
      onChange: noop
    }
  };

  get menuView() {
    const { menuOptions } = this.props;
    console.log('menuOptions props:', menuOptions);
    return <ReactAntMenu {...menuOptions} />;
  }

  render() {
    const { className, menuOptions, ...props } = this.props;
    return (
      <Dropdown
        overlay={this.menuView}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
