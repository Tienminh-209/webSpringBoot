import React, { Component } from 'react';
import ProductService from '../../Service/ProductService';
import { Carousel } from "react-bootstrap";
class slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slider: [],
        };
    }
    componentDidMount() {
        ProductService.getAllSlider().then((res) => {
            this.setState({ slider: res.data });
        });
    }
    render() {
        return (
            <div>
               
                    {this.state.slider.map((hotnew) => (


                       
                        <div>{hotnew.image1}</div>
                       
                        ))}
                   
                   

            </div>
        );
    }
}

export default slider;