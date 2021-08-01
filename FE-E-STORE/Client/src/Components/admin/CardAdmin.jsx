import React, { Component } from 'react';

class CardAdmin extends Component {
    render() {
        return (
            <div>
            <h1 className="mt-4">Dashboard</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-top5 active">Dashboard</li>
            </ol>
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                  <div className="card-body">Primary Card</div>
                  <div className="card-footer d-flex align-top5s-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                  <div className="card-body">Warning Card</div>
                  <div className="card-footer d-flex align-top5s-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                  <div className="card-body">Success Card</div>
                  <div className="card-footer d-flex align-top5s-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                  <div className="card-body">Danger Card</div>
                  <div className="card-footer d-flex align-top5s-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
        );
    }
}

export default CardAdmin;