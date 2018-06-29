import React from 'react';
import { Select } from 'antd';
import AceEditor from 'react-ace';

const Option = Select.Option;
const languages = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'markdown',
  'mysql',
  'json',
  'html',
  'golang',
  'csharp',
  'css'
]

const themes = [
  'monokai',
  'tomorrow',
  'terminal',
]

languages.forEach((lang) => {
  import (`brace/mode/${lang}`)
  import (`brace/snippets/${lang}`)
})

themes.forEach((theme) => {
  import (`brace/theme/${theme}`)
})

class Ide extends React.Component {
  constructor() {

    super();
    this.state = {
      mode: 'python',
      theme: 'monokai'
    }
  }

  changeMode = (value) => {
    this.setState({mode: value})
  }

  changeTheme = (value) => {
    this.setState({theme: value})
  }

  render() {
    return (
      <div style={{height: '100%', overflow: 'hidden'}}>
        <div style={{padding: '5px', background: '#fff'}}>
          <span style={{marginRight: '10px'}}>语言：<Select defaultValue="python" style={{ width: 120 }} onChange={this.changeMode}>
          {languages.map(lang => {
            return <Option key={lang} value={lang}>{lang}</Option>
          })}
        </Select>
            </span>
          样式：<Select defaultValue="monokai" style={{ width: 120 }} onChange={this.changeTheme}>
          {themes.map(lang => {
            return <Option key={lang} value={lang}>{lang}</Option>
          })}
        </Select>
        </div>
        <AceEditor
          mode={this.state.mode}
          theme={this.state.theme}
          fontSize={15}
          name={new Date().getTime() + ''}
          editorProps={{$blockScrolling: true}}
          style={{width: '100%', height: '90%'}}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          value={`def print_welcome(name):
    print("Welcome ", name)

  print_welcome("Kfcoding")
  `}
        />
      </div>
    );
  }
}

export default Ide;