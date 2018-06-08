import React from 'react';
import { Button } from 'antd';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import BannerImage from './BannerImage';
import { currentUser } from "../../services/users";
import { openWindow } from "../../utils/openWindow";
import pic from '../../assets/pic.png';

const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

class Banner extends React.PureComponent {
  login = () => {
  openWindow(
    'https://github.com/login/oauth/authorize?client_id=1eb243e826a117b3e138&',
    '登录',
    600,
    600
  );
  window.addEventListener('message', (m) => {
    localStorage.setItem('token', m.data.token);
    currentUser().then(res => {
      console.log(res)
      localStorage.setItem('uid', res.data.result.user.id);
      localStorage.setItem('user', JSON.stringify(res.data.result.user));
      window.location.replace('/home');

    });
  })
}
  render() {
    const isZhCN = 'zh-CN';
    return (
      <div className="home-page-wrapper banner-wrapper" id="banner">
        <div className="banner-bg-wrapper">
          <svg width="400px" height="576px" viewBox="0 0 400 576" fill="none">
            <TweenOne component="g" animation={[{ opacity: 0, type: 'from' }, { ...loop, y: 15 }]}>
              <ellipse id="Oval-9-Copy-4" cx="100" cy="100" rx="6" ry="6" stroke="#2F54EB" strokeWidth="1.6" />
            </TweenOne>
            <TweenOne component="g" animation={[{ opacity: 0, type: 'from' }, { ...loop, y: -15 }]}>
              <g transform="translate(200 450)">
                <g style={{ transformOrigin: '50% 50%', transform: 'rotate(-340deg)' }}>
                  <rect stroke="#FADB14" strokeWidth="1.6" width="9" height="9" />
                </g>
              </g>
            </TweenOne>
          </svg>
          <ScrollParallax location="banner" className="banner-bg" animation={{ playScale: [1, 1.5], rotate: 0 }} />
        </div>
        <QueueAnim className="banner indexPage" type="alpha" delay={150}>
          <QueueAnim
            className="text-wrapper"
            key="text"
            type="bottom"
          >
            <h1 key="h1">
            KFCoding · 功夫编程
          </h1>
            <p key="p">
             新一代交互式开发者学习社区
            </p>
            <div className="banner-btns" key="buttons">
              <Button type='primary' icon='github' size='large' onClick={this.login}>立即体验</Button>
            </div>
          </QueueAnim>
          {(
            <div className="img-wrapper" key="image">
              <img style={{width:'100%' , height:'100%'}} src={pic}/>
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}

export default Banner;
