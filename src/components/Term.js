import React from 'react';
import { Terminal } from 'xterm';
import SockJS from 'sockjs-client';

class Term extends React.Component {

  constructor(props) {
    super(props);
console.log(this.props.ws)
    this.state = {
      terminal: new Terminal(),
      wsaddr: this.props.ws,
      ws: null
    }

    this.termDom = React.createRef();
  }

  componentDidMount() {
    let { terminal } = this.state;
    terminal.open(this.termDom.current);
    //terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    this.ws = new SockJS(this.state.wsaddr);
    var ws = this.ws;
    var token = this.state.wsaddr.split('?')[1];
    this.ws.onopen = function () {
      ws.send(JSON.stringify({Op: 'bind', SessionID: token}));
      //ws.send(JSON.stringify({Op: 'resize', Cols: 154, Rows: 39}));
    }
    this.ws.onmessage = (evt) => {
      //let msg = JSON.parse(evt.data.substr(1));
      terminal.write(evt.data);return;
      // switch (msg['Op']) {
      //   case 'stdout':
      //     terminal.write(msg['Data']);
      // }
    }

    terminal.on('key', (key, ev) => {
      this.ws.send(JSON.stringify({Op: 'stdin', Data: key}))
    })

    terminal.on('paste', (data, ev) => {
      this.ws.send(JSON.stringify({Op: 'stdin', Data: data}))
    })
  }

  render() {
    return (
      <div ref={this.termDom}></div>
    );
  }
}

export default Term;