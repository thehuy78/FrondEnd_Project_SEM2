import React, { Component } from 'react'
import '../style/Error.scss'

export default class Noti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noti: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hide !== prevProps.hide) {
      this.time();
    }
  }

  time = () => {
    this.setState({
      noti:true
    });
    setTimeout(() => {
      this.setState({
        noti:false
      });
    }, 2000);
  }
  render() {
    return (
      <div className={this.state.noti ? "noti" : "hide"}>
        <div className='noti_container'>
          <p>Gửi thành công <i class="fa-solid fa-circle-check"></i></p>
        </div>
      </div>
    )
  }
}
