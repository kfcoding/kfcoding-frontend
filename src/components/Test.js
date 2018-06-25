import React from 'react';
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

  componentWillReceiveProps(next) {
    console.log(next)
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
      </div>
    );
  }
}

export default Test;