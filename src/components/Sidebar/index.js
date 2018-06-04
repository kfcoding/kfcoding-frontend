import React from 'react';
import { Layout, Icon } from 'antd';

const { Sider } = Layout;


class Sidebar extends React.Component {
  render() {
    let {width, pages, addPage, title, readOnly} = this.props;
    return (
      <Sider width={width} style={{
        background: '#fff',
        borderRight: '1px solid #eee',
        overflow: 'auto',
        height: '100vh',
        left: 0
      }}
             breakpoint="lg"
             collapsedWidth="0"
             trigger="null"
             onCollapse={(collapsed, type) => {
               console.log(collapsed, type);
             }}
      >
        <h3 style={{padding: '20px 0 0px 20px', height: 40, whiteSpace: 'nowrap'}}>{title}</h3>
        <div style={{marginTop: '20px'}}>
          {pages}
          {readOnly?
            null:
            <a style={{margin: 20, display: 'block', whiteSpace: 'nowrap'}} onClick={addPage}><Icon type='plus'/> 添加章节</a>
          }
        </div>

      </Sider>
    )
  }
}

export default Sidebar;