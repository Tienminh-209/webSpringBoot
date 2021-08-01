import React, { Component } from "react";

class Services extends Component {
  render() {
    return (
    <div>
      <div style={{height:"70px"}}></div>
        <div style={{display:"flex",marginTop:"30px",marginBottom:"30px"}}>
        <div><img style={{width:"630px",height:"156px",marginLeft:"30px",borderRadius:"5px"}}  src={`${process.env.PUBLIC_URL}/home/images/banners/bannerBottom-1.jpg`} /></div>
       
        <div><img style={{width:"630px",height:"156px",marginLeft:"30px",borderRadius:"5px"}} src={`${process.env.PUBLIC_URL}/home/images/banners/bannerBottom-2.jpg`}/></div>
      </div>
    </div>
    );
  }
}

export default Services;
