import React from 'react';
import { Row, Col } from 'antd';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { getAllKongfu } from "../../services/kongfu";
import { Link } from 'react-router-dom';
import Book from "../Book";

const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

export default class Page1 extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      kongfus: []
    }
  }
  componentDidMount() {
    getAllKongfu().then(res => {
      this.setState({kongfus: res.data.result.kongfus})
    })
  }
  render() {
    let kongfus = this.state.kongfus.map((kf) => {
      let viewhref = '/reader/' + kf.id;
      let edithref = '/editor/' + kf.id;
      return (
        <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}} key={kf.id}>
          <a href={viewhref} style={{display: 'block', width: '240px', height: '320px'}}>
            <Book key={kf.id} book={kf}/>
          </a>
        </div>
      )
    });
    return (
      <div className="home-page-wrapper page3">
        <div className="indexPage" >
          <h2><Link to='/library'>功夫秘籍</Link></h2>
        </div>
        <div style={{ marginLeft: '100px'}}>
            {kongfus}
        </div>
      </div>
    );
  }
}
