import React from 'react';
import Kfeditor from 'kfeditor';
import { Value } from 'slate';

const initialValue = ({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{
              text: ''
            }],
          },
        ],
      },
    ],
  },
});
class Test extends React.Component {
  state = {
    value: Value.fromJSON(initialValue)
  }

  onChange = ({value}) => {
    this.setState({value})
  }

  render () {
    return (
      <div style={{
        width: '1000px',
        height: '800px',
        margin: '0 auto',
        background: '#fff',
        position: 'relative',
        zIndex: 0
      }}>
        <Kfeditor value={this.state.value} onChange={this.onChange}/>
      </div>
    );
  }
}

export default Test;