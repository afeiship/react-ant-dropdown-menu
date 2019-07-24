import ReactAntDropdownMenu from '../src/main';
import ReactDOM from 'react-dom';
import React from 'react';
import './assets/style.scss';

class App extends React.Component {
  state = {
    items: ['Menu1', 'Menu2']
  };

  _onMenuClick = (inEvent) => {
    console.log('event:->', inEvent);
  };

  render() {
    const { items } = this.state;
    return (
      <div className="app-container">
        <ReactAntDropdownMenu items={items} onMenuClick={this._onMenuClick}>
          <button>Test Dropdown</button>
        </ReactAntDropdownMenu>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
