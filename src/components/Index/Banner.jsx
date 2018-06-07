import React from 'react';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import BannerImage from './BannerImage';

const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

class Banner extends React.PureComponent {
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
              在浏览器中学习各种编程语言与开源技术，
              各种实训环境触手可及、 随时可用、 秒级启动、 用完即走，教程内嵌代码一键执行，
             打造新一代交互式开发者学习社区。
            </p>
            <div className="banner-btns" key="buttons">
              <a href = "/"></a>
            </div>
          </QueueAnim>
          {(
            <div className="img-wrapper" key="image">
              <ScrollParallax location="banner" component={BannerImage} animation={{ playScale: [1, 1.5], y: 80 }} />
            </div>
          )}
        </QueueAnim>
      </div>
    );
  }
}

export default Banner;
