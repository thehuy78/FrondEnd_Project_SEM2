import React, { Component } from 'react'
import "../style/Register.scss"
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    checkname = () => {
        const name = document.getElementById('name');
        if (name.value.trim() === "") {
            alert('Name không được để trống')
            name.classList.add('error');
            return false
        } else {
            name.classList.remove('error');
            return true
        }
    }
    checkphone = () => {
        const phone = document.getElementById('phone');
        const rex = /^[0-9]{10,12}$/;
        if (!rex.test(phone.value.trim())) {
            alert('Phone phải từ 10-12 số')
            phone.classList.add('error');
            return false
        } else {
            phone.classList.remove('error');
            return true
        }
    }
    checkpassword = () => {
        const password = document.getElementById('password');
        const regex = /^[a-zA-Z0-9]{8,16}$/
        if (!regex.test(password.value.trim())) {
            alert('Password phải chứa 8-16 kí tự')
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
            alert('Password nhập lại không khớp')
            passwordconfirm.classList.add('error');
            return false
        } else {
            passwordconfirm.classList.remove('error');
            return true
        }
    }
    checkemail = async () => {
        const email = document.getElementById('email');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (regex.test(email.value.trim())) {
            let res = await axios.post('http://127.0.0.1:8000/api/login/register/checkemail', { email: email.value.trim() })
            if (res && res.data && res.data.status === 200) {
                email.classList.remove('error');
                return true
            } else {
                email.classList.add('error');
                alert(res.data.message)
                return false

            }

        } else {
            email.classList.add('error');
            alert('Email sai định dạng')
            return false
        }
    }
    checkform = async (event) => {
        event.preventDefault();
        if (this.checkname() && this.checkphone() && await this.checkemail() && this.checkpassword() && this.checkpasswordconfirm()) {

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const phone = document.getElementById('phone').value.trim();

            let data = {
                name: name,
                email: email,
                password: password,
                phone: phone
            };

            let res = await axios.post('http://127.0.0.1:8000/api/register', { data })
            if (res && res.data && res.data.status === 200) {
                alert('Vui long vào email để xác minh tài khoản trước khi login !')
                window.location.href = '/login'
            }

        } else {

        }
    }


    render() {
        return (
            <section className='sec1_register'>
                <div className='image'></div>
                <div className='sec1_register_container'>
                    <form ref={this.form} className='form_register' onSubmit={this.checkform}>
                        <img src={require('../assets/image/logo/logotext.png')} alt='' />
                        <div className='name_box'>
                            <div>
                                <p>Full Name:<span style={{ color: "red" }}>*</span></p>
                                <input id='name'></input>
                            </div>
                            <div>
                                <p>Phone:<span style={{ color: "red" }}>*</span></p>
                                <input type='number' id='phone'></input>
                            </div>
                        </div>
                        <div className='email_box'>
                            <p>Email:<span style={{ color: "red" }}>*</span></p>
                            <input id='email' placeholder='abc@gmail.com'></input>
                        </div>

                        <div className='password_box'>
                            <p>Password:<span style={{ color: "red" }}>*</span></p>
                            <div className='box_input_password'>
                                <input id='password' type={this.state.pass ? "text" : "password"} className='password'></input>
                                <i class={this.state.pass ? "icon_eye fa-regular fa-eye" : "icon_eye fa-regular fa-eye-slash"} onClick={() => this.eyehandel(1)}></i>
                            </div>
                        </div>
                        <div className='passwordconfirm_box'>
                            <p>Password Confirm:<span style={{ color: "red" }}>*</span></p>
                            <div className='box_input_password'>
                                <input id='passwordconfirm' type={this.state.passconfirm ? "text" : "password"} className='passwordconfirm'></input>
                                <i class={this.state.passconfirm ? "icon_eye fa-regular fa-eye" : "icon_eye fa-regular fa-eye-slash"} onClick={() => this.eyehandel(2)}></i>
                            </div>
                        </div>
                        <div className='btn_box'>
                            <input type='submit' value={"Register"} />
                        </div>
                    </form>
                    <form className='form_verification'>
                        <img src={require('../assets/image/logo/logo.png')} alt='' />
                        <p>Xác thực code từ email:</p>
                        <div>
                            <input></input> <input type='submit' value={"Verification"} />
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}
