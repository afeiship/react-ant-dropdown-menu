import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import objectAssign from 'object-assign';
import { Dropdown, Menu } from 'antd';

const CLASS_NAME = 'react-ant-dropdown-menu';
const RETURN_VALUE = ({ item }) => item;
const RETURN_TEMPLATE = ({ item }, cb) => {
  const { value, label } = item;
  if (cb) {
    return <Menu.SubMenu key={value} title={label} children={cb()} />;
  } else {
    return <Menu.Item key={value}>{label}</Menu.Item>;
  }
};

export default class extends Component {
  static displayName = CLASS_NAME;
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    stop: PropTypes.bool,
    multiple: PropTypes.bool,
    items: PropTypes.array,
    template: PropTypes.func,
    tranform: PropTypes.func,
    menuOptions: PropTypes.object
  };

  static defaultProps = {
    stop: false,
    multiple: false,
    items: [],
    value: [],
    defaultValue: [],
    template: RETURN_TEMPLATE,
    transform: RETURN_VALUE,
    onChange: noop,
    menuOptions: {}
  };

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    this.state = { value };
  }

  get menuView() {
    const { items, transform, template, menuOptions } = this.props;
    const _value = this.state.value;
    const walk = (inItems) => {
      return inItems.map((menu, index) => {
        const item = transform({ item: menu, index });
        const children = item.children;
        const hasChild = children && children.length;
        const cb = () => walk(children);
        const args = hasChild ? [{ item, index }, cb] : [{ item, index }];
        console.log('item::', item);
        return template.apply(this, args);
      });
    };

    return (
      <Menu selectedKeys={_value} onClick={this.onMenuClick} {...menuOptions}>
        {walk(items)}
      </Menu>
    );
  }

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    console.log('should update!');
    return true;
  }

  change(inValue) {
    const target = { value: [inValue] };
    const { onChange } = this.props;
    this.setState(target, () => {
      onChange({ target });
    });
  }

  onMenuClick = (inEvent) => {
    const { domEvent, key, keyPath } = inEvent;
    const { stop, onChange } = this.props;
    stop && domEvent.stopProppagation();
    console.log('key path:', keyPath, inEvent);
    this.change(key);
  };

  render() {
    const { className, items, template, value, ...props } = this.props;
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
