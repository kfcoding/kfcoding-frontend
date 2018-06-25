import React from 'react';
import explain from '../../assets/explain.png';

export default function Page2() {
  return (
    <div className="home-page-wrapper page2" id="page2">
      <div className="indexPage" >
        <h2>交互式界面设计</h2>
          <div className="img-wrapper" key="image">
            <div style={{marginLeft:'18%'}}>
              <img style={{width:'80%' , height:'80%'}} src={explain}/>
            </div>
          </div>
      </div>
    </div>
  );
}
