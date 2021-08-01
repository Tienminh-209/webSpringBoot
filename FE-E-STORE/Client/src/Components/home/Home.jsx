import React, { Component } from 'react';
import Bannerbottom from './Bannerbottom';
import Blog from './Blog';
import ProductHot from './ProductHot';
import ProductNew from './ProductNew';
import Video from './Video';
import Slider from './Slider';
import Services from './Services';
import AllProduct from './AllProduct';
import AoNamProduct from './AoNamProduct';
import QuanNamProduct from './QuanNamProduct';
class Home extends Component {
  render() {
    return (

      <div>
        <Slider />
        <Bannerbottom />
        <ProductNew />
        <Services/>
        <ProductHot />
    
        <AoNamProduct/>
        <QuanNamProduct/>
        <Blog />
        <Video />
           {/* <AllProduct /> */}
      </div>


    );
  }
}

export default Home;