import React, { Component } from 'react';

class Video extends Component {
    render() {
        return (
            <div>
               <iframe style={{marginLeft:"30px",marginTop:"20px"}} width="1300" height="600" src="https://www.youtube.com/embed/cKHc88PogxA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }
}

export default Video;