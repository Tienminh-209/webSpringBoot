import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router-dom';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      redirect: false
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // mỗi khi nhấn nút thì cập nhật lại keyword
  handleSearchChange(e) {

    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({keyword: lowerCaseName});
      
  }

  // khi enter thì sẽ chạy đến thằng này
  handleSubmit(e) {
     e.preventDefault();
    this.setState({redirect: true});
  }

  render() {

    const { redirect, keyword } = this.state;

     if (redirect) {
       return <Redirect to={`/search/${keyword}`} />;
     }

    return (
      <div >
        <div className="header_search">
          <div className="header_search_content">
            <div className="header_search_form_container" style={{width:"181px",height:"41px"}}>
              <form
                action="#"
             
                className="header_search_form clearfix"
                onSubmit={this.handleSubmit}
              >
                <input
                  type="search"
                 
                  required="required"
                  className="header_search_input"
                  onChange={this.handleSearchChange}
                  placeholder="Tìm kiếm ..."
                />
                <a
                  href={`/search/${keyword}`}
                  type="submit "
                  className="header_search_button trans_300"
                  value="Submit"
                >
                <p style={{marginTop:"10px",marginLeft:"16px"}}><i class="fas fa-search"></i></p>
                </a>
              </form>

            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Search;