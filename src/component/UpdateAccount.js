import React, { Component } from 'react'
import '../style/ForgotPassword.scss'
import axios from 'axios';
import Loadding from './Loadding';

export default class UpdateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passold: false,
            pass: false,
            passconfirm: false
        }

    }
    eyehandel = (item) => {
        if (item === 1) {
            this.setState(prevState => ({
                pass: !prevState.pass
            })
            )
        }
        if (item === 2) {
            this.setState(prevState => ({
                passconfirm: !prevState.passconfirm
            })
            )
        }
        if (item === 3) {
            this.setState(prevState => ({
                passold: !prevState.pass
            })
            )
        }
    }

    checkpassword = () => {
        const password = document.getElementById('password');
        const regex = /^[a-zA-Z0-9]{8,16}$/
        if (!regex.test(password.value.trim())) {
            password.classList.add('error');
            return false
        } else {
            password.classList.remove('error');
            return true
        }
    }
    checkpasswordconfirm = () => {
        const password = document.getElementById('password');
        const passwordconfirm = document.getElementById('passwordconfirm');
        if (password.value.trim() !== passwordconfirm.value.trim()) {
            passwordconfirm.classList.add('error');
            return false
        } else {
            passwordconfirm.classList.remove('error');
            return true
        }
    }


    checkform = async (e) => {
        e.preventDefault()
        const email = localStorage.getItem('email')
        const passwordold = document.getElementById('password_old').value.trim()
        const password = document.getElementById('password').value.trim()
        if (passwordold !== "" && this.checkpassword() && this.checkpasswordconfirm()) {
            var account = {
                email: email,
                passwordold: passwordold,
                password: password,

            }
            let res = await axios.post('http://127.0.0.1:8000/api/login/updatepassword', { account })
            console.log(res)
            if (res && res.data && res.data.status === 200) {
                alert('Password đã được cập nhật ')
                window.location.href = '/information/1'
            } if (res && res.data && res.data.status === 500) {
                alert(res.data.message)
            }

        }
    }




    render() {
        return (
            <>
                <Loadding />
                <section className='sec1_register'>
                    <div className='image'></div>
                    <div className='sec1_register_container'>
                        <form ref={this.form} className='form_register' onSubmit={this.checkform}>
                            <img src={require('../assets/image/logo/logo.png')} alt='' />
                            <p style={{ textAlign: 'center', fontWeight: 700, color: 'var(--second)', fontSize: '1.2rem' }}>Cập nhật tài khoản Medcare</p>
                            <div className='password_box'>
                                <p>Mật khẩu cũ:<span style={{ color: "red" }}>*</span></p>
                                <div className='box_input_password'>
                                    <input id='password_old' type={this.state.passold ? "text" : "password"} className='password'></input>
                                    <i class={this.state.passold ? "icon_eye fa-regular fa-eye" : "icon_eye fa-regular fa-eye-slash"} onClick={() => this.eyehandel(3)}></i>
                                </div>
                            </div>
                            <div className='password_box'>
                                <p>Mật khẩu mới:<span style={{ color: "red" }}>*</span></p>
                                <div className='box_input_password'>
                                    <input id='password' type={this.state.pass ? "text" : "password"} className='password'></input>
                                    <i class={this.state.pass ? "icon_eye fa-regular fa-eye" : "icon_eye fa-regular fa-eye-slash"} onClick={() => this.eyehandel(1)}></i>
                                </div>
                            </div>
                            <div className='passwordconfirm_box'>
                                <p>Nhập lại mật khẩu mới:<span style={{ color: "red" }}>*</span></p>
                                <div className='box_input_password'>
                                    <input id='passwordconfirm' type={this.state.passconfirm ? "text" : "password"} className='passwordconfirm'></input>
                                    <i class={this.state.passconfirm ? "icon_eye fa-regular fa-eye" : "icon_eye fa-regular fa-eye-slash"} onClick={() => this.eyehandel(2)}></i>
                                </div>
                            </div>
                            <div className='btn_box'>
                                <input type='submit' value={"Cập nhật"} />
                            </div>
                        </form>

                    </div>
                </section>
            </>
        )
    }
}
