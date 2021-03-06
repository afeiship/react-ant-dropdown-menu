import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@jswork/noop';
import ReactAntMenu from '@jswork/react-ant-menu';
import { Dropdown } from 'antd';

const CLASS_NAME = 'react-ant-dropdown-menu';

export default class ReactAntDropdownMenu extends React.Component {
  static displayName = CLASS_NAME;
  static propTypes = {
    className: PropTypes.string,
    menuOptions: PropTypes.shape({
      value: PropTypes.array,
      onChange: PropTypes.func,
      highlighted: PropTypes.bool,
      stop: PropTypes.bool,
      items: PropTypes.array,
      template: PropTypes.func
    })
  };

  static defaultProps = {
    menuOptions: {
      highlighted: false,
      stop: false,
      items: [],
      value: [],
      onChange: noop
    }
  };

  get menuView() {
    const { menuOptions } = this.props;
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

