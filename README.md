# react-ant-dropdown-menu
> Dropdown + menu based on antd.

## installation
```shell
npm install -S @feizheng/react-ant-dropdown-menu
```

## usage
1. import css
  ```scss
  @import "~react-ant-dropdown-menu/style.scss";

  // customize your styles:
  $react-ant-dropdown-menu-options: ()
  ```
2. import js
  ```js
  import ReactAntDropdownMenu from '../src/main';
  import ReactDOM from 'react-dom';
  import React from 'react';
  import { Menu, Switch, Button } from 'antd';
  import './assets/style.scss';

  class App extends React.Component {
    state = {
      attachable: false,
      highlighted: false,
      value: ['m1-1-2'],
      items: [
        {
          icon: 'm1-icon',
          label: 'Menu1',
          value: 'm1',
          children: [
            {
              icon: 'm1-1-icon',
              label: 'Menu1-1',
              value: 'm1-1',
              children: [
                {
                  icon: 'm1-1-1-icon',
                  label: 'Menu-1-1',
                  value: 'm1-1-1'
                },
                {
                  icon: 'm1-1-2-icon',
                  label: 'Menu-1-2',
                  value: 'm1-1-2'
                }
              ]
            },
            {
              icon: 'm1-2-icon',
              label: 'Menu1-2',
              value: 'm1-2'
            }
          ]
        },
        {
          icon: 'm2-icon',
          label: 'Menu2',
          value: 'm2'
        },
        {
          icon: 'm3-icon',
          label: 'Menu3',
          value: 'm3'
        }
      ]
    };

    template({ item, selected }, cb) {
      const { attachable } = this.props;
      const { value, label } = item;
      const _label =
        selected && attachable ? `${label}(${selected.label})` : label;
      if (cb) {
        return <Menu.SubMenu key={value} title={_label} children={cb()} />;
      } else {
        return <Menu.Item key={value}>{label}</Menu.Item>;
      }
    }

    onMenuChange = (inEvent) => {
      console.log('click', inEvent);
    };

    onChange = (inRole, inEvent) => {
      this.setState({
        [inRole]: inEvent
      });
    };

    render() {
      const { attachable, highlighted, items } = this.state;
      return (
        <div className="app-container">
          <p>
            <label>attachable:</label>
            <Switch
              checked={attachable}
              onChange={this.onChange.bind(this, 'attachable')}
            />
          </p>
          <p>
            <label>highlighted:</label>
            <Switch
              checked={highlighted}
              onChange={this.onChange.bind(this, 'highlighted')}
            />
          </p>
          <ReactAntDropdownMenu
            attachable={attachable}
            highlighted={highlighted}
            items={items}
            template={this.template}
            onChange={this.onMenuChange}
            >
            <Button>Test Dropdown</Button>
          </ReactAntDropdownMenu>
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));
  ```

## documentation
- https://afeiship.github.io/react-ant-dropdown-menu/
