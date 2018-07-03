import React from 'react';
import { getAllKongfu } from "../../services/kongfu";
import { Link } from 'react-router-dom';
import Book from "../Book";
import styles from '../Library.css';
const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

export default class Page4 extends React.PureComponent {
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
        <div style={{ marginLeft: '100px'}}>
          <div style={{float: 'left', marginRight: '40px', marginBottom: '40px'}}>
            <a href='/library' style={{display: 'block', width: '240px', height: '320px'}}>
              <div className="container">
                <div className="book">
                  <div className='front'>
                    <div className='cover'>
                      <h2>
                        <span>SEE MORE</span>
                        <span>查看更多</span>
                      </h2>
                    </div>
                  </div>
                  <div className='left'>
                    <h2>
                      <span>SEE MORE</span>
                      <span>查看更多</span>
                    </h2>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
