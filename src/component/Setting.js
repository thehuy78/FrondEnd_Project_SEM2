import React, { Component } from 'react'
import '../style/Setting.scss'
import axios from 'axios';
import { Link } from 'react-router-dom'
import LoadingChild from './LoadingChild';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            loading: true
        }
    }

    async componentDidMount() {
        const user = localStorage.getItem('email')
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }

        this.timeoutId = setTimeout(async () => {
            let res = await axios.post('http://127.0.0.1:8000/api/login/getaccount', { user })
            if (res && res.data) {
                this.setState({
                    user: res.data.account[0],
                    loading: false
                })
            }
        }, 300);

    }

    render() {
        const user = this.state.user


        return (
            <>

                <section className="sec2_setting_account">
                    <LoadingChild hide={this.state.loading} />
                    <div className='sec2_setting_account_container'>
                        <div className='infor_user'>
                            <img src={require('../assets/image/logo/notdata.png')} alt='' />
                            <div className='box_infor'>
                                <p>{user.name}</p>
                                <p>Cập nhật ngày: 19/12/2023</p>
                            </div>
                            <div className='wallet_box'>
                                <p className='wallet'><i class="fa-solid fa-wallet"></i> Số dư ví: <span>{typeof (user.balance) === 'number' ? user.balance.toLocaleString() : user.balance} VNĐ</span></p>
                            </div>
                        </div>

                        <div className='infor_account'>
                            <div className='div_1'>
                                <p className='title'>Quản lý tài khoản</p>
                                <p><i class="fa-solid fa-envelope"></i><span>{user.email_user}</span></p>
                                <p><i class="fa-solid fa-phone"></i><span>{user.phone}</span></p>
                                <Link to='/update-account' className='link_navbar'><p><i class="fa-solid fa-key"></i>Thay đổi mật khẩu</p></Link>

                            </div>
                            <div className='div_2'>
                                <p className='title'>Hỗ trợ và Chính sách</p>
                                <p><i class="fa-solid fa-headphones"></i>Trung tâm hỗ trợ</p>
                                <p><i class="fa-solid fa-shield-halved"></i>Bảo mật tài khoản</p>
                                <p><i class="fa-brands fa-slack"></i>Chính sách quyền riêng tư</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
