import React, { Component } from 'react';
import { connect } from 'react-redux';
import rest from './rest';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(rest.actions.availableSeats({ stationId: '0990' }));
  }
  render() {
    return (
      <div className="App">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>日期</th>
                <th>類別</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan="3" style={{ textAlign: 'center' }}>目前無紀錄</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    availableSeats: state.availableSeats,
  };
};

export default connect(mapStateToProps)(App);
