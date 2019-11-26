import ReactAntDropdownMenu from '../src/main';
import ReactDOM from 'react-dom';
import React from 'react';
import { Menu } from 'antd';
import './assets/style.scss';

class App extends React.Component {
  state = {
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

  _onMenuClick = (inEvent) => {
    console.log('event:->', inEvent);
  };

  template = ({ item }, cb) => {
    const { value, icon, label } = item;
    if (cb) {
      return (
        <Menu.SubMenu
          data-icon={icon}
          key={value}
          title={`${icon} - ${label}`}
          children={cb()}
        />
      );
    } else {
      return (
        <Menu.Item itemIcon={<span>+</span>} data-icon={icon} key={value}>
          {label}
        </Menu.Item>
      );
    }
  };

  onMenuChange = (inEvent) => {
    console.log('click');
  };

  render() {
    const { items } = this.state;
    return (
      <div className="app-container">
        <ReactAntDropdownMenu
          items={items}
          template={this.template}>
          <button>Test Dropdown</button>
        </ReactAntDropdownMenu>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
