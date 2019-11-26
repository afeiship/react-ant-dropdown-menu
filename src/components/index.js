import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import { Dropdown, Menu } from 'antd';

const CLASS_NAME = 'react-ant-dropdown-menu';
const RETURN_TEMPLATE = function({ item, selected }, cb) {
  const { attachable } = this.props;
  const { value, label } = item;
  const _label = selected && attachable ? `${label}(${selected.label})` : label;
  console.log('selected:', selected);
  if (cb) {
    return <Menu.SubMenu key={value} title={_label} children={cb()} />;
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
    attachable: PropTypes.bool,
    highlighted: PropTypes.bool,
    stopPropagation: PropTypes.bool,
    items: PropTypes.array,
    template: PropTypes.func,
    menuOptions: PropTypes.object
  };

  static defaultProps = {
    highlighted: false,
    attachable: false,
    stopPropagation: false,
    items: [],
    value: [],
    defaultValue: [],
    template: RETURN_TEMPLATE,
    onChange: noop,
    menuOptions: {}
  };

  constructor(inProps) {
    super(inProps);
    const { value } = inProps;
    this.state = { value, valuePath: [] };
  }

  getSelected(inItem) {
    const { valuePath } = this.state;
    const { children } = inItem;
    if (children && children.length) {
      return children.find((item) => valuePath.includes(item.value));
    }
    return null;
  }

  get menuView() {
    const { items, highlighted, template, menuOptions } = this.props;
    const _value = this.state.value;
    const walk = (inItems) => {
      return inItems.map((item, index) => {
        const children = item.children;
        const hasChild = children && children.length;
        const selected = this.getSelected(item);
        const cb = () => walk(children);
        const target = { item, index, selected };
        const args = hasChild ? [target, cb] : [target];
        return template.apply(this, args);
      });
    };
    const value = highlighted ? _value : [];
    return (
      <Menu
        selectedKeys={value}
        onClick={this.onMenuClick}
        className={classNames(`${CLASS_NAME}__menu`)}
        {...menuOptions}>
        {walk(items)}
      </Menu>
    );
  }

  change(inEvent) {
    const { onChange } = this.props;
    const { key, keyPath } = inEvent;
    this.setState({ value: key, valuePath: keyPath }, () => {
      const event = Object.assign(inEvent, { target: { value: key } });
      onChange(event);
    });
  }

  onMenuClick = (inEvent) => {
    const { domEvent } = inEvent;
    const { stopPropagation } = this.props;
    stopPropagation && domEvent.stopProppagation();
    this.change(inEvent);
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
