import ReactAntDropdownMenu from '../src/main';
import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Switch, Button } from 'antd';
import './assets/style.scss';

class App extends React.Component {
  state = {
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
    const { value, label } = item;
    const _label = selected ? `${label}(${selected.label})` : label;
    if (cb) {
      return <Menu.SubMenu key={value} title={_label} children={cb()} />;
    } else {
      return <Menu.Item key={value}>{label}</Menu.Item>;
    }
  }

  onMenuChange = (inEvent) => {
    const { value } = inEvent.target;
    this.setState({ value });
  };

  onChange = (inRole, inEvent) => {
    this.setState({
      [inRole]: inEvent
    });
  };

  render() {
    const { highlighted, value, items } = this.state;
    console.log('render value:', value);
    return (
      <div className="app-container">
        <p>
          <label>highlighted:</label>
          <Switch
            checked={highlighted}
            onChange={this.onChange.bind(this, 'highlighted')}
          />
        </p>
        <ReactAntDropdownMenu
          menuOptions={{
            highlighted,
            value,
            items,
            template: this.template,
            onChange: this.onMenuChange
          }}>
          <Button>Test Dropdown</Button>
        </ReactAntDropdownMenu>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
