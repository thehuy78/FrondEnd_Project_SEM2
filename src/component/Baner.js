import React, { Component } from 'react'
import '../style/Loading.scss'

export default class Baner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baner: true,
        }
    }
    componentDidMount() {

        this.disableBodyScroll();
        if (sessionStorage.getItem('baner')) {
            this.enableBodyScroll()
        }
        if (sessionStorage.getItem('baner')) {
            this.setState(
                {
                    baner: false
                }
            )
        }
    }

    disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    enableBodyScroll = () => {
        document.body.style.overflow = 'auto';
    };
    handleClick = () => {
        sessionStorage.setItem('baner', true)
        this.setState(prevState => ({
            baner: !prevState.baner
        }))
        this.enableBodyScroll();

    }
    render() {
        return (
            <div className={this.state.baner ? "baner_component" : "hide"} onClick={this.handleClick}>
                <div className='baner_component_container'>
                    <div className='baner_box'>
                        <img src={require('../assets/image/home/baner.png')} alt='' />
                        <div className='content'>
                            <p>TRẢI NGHIỆM DỊCH VỤ</p>
                            <p>TƯ VẤN SỨC KHỎE TỪ XA</p>
                            <p>Medpro Mang lại sự tiện lợi và nhan chóng cho người dùng</p>
                            <p>Đặt lịch ngay</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
