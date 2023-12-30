import React, { Component } from 'react'
import '../style/Login.scss'
import { withRouter, Link } from 'react-router-dom'

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exits: true,
            account: {},
            mess: false,
            password: false
        }
    }


    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"

        })
        window.handleCredentialResponse = this.handleCredentialResponse;
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        // script.async = true;
        // script.defer = true;
        document.body.appendChild(script);

    }
    componentWillUnmount() {
        delete window.handleCredentialResponse;
    }

    handleCredentialResponse = async (response) => {
        var resp = jwtDecode(response.credential);
        console.log(resp)
        if (resp) {
            const account = {
                name: resp.name,
                email: resp.email
            }
            this.setState({
                account: account
            });
            let res = await axios.post('http://127.0.0.1:8000/api/login/checklogin', { account });
            if (res && res.data.status === 200) {
                var acc = res.data.user
                console.log(acc)
                localStorage.setItem("user", acc.name)
                localStorage.setItem("email", acc.email_user)
                localStorage.setItem("role", "user")
                window.location.reload();

            } else if (res && res.data.status === 500) {
                const mess = document.getElementById('messlogin');
                mess.innerHTML = 'Tài khoản của bạn đã bị vô hiệu hóa';
                this.setState({
                    mess: true
                })
            }
            else {
                this.setState({
                    exits: false
                })
            }
        }

    };




    inputphone = async () => {
        const phone = document.getElementById("phone").value.trim();
        const account = this.state.account;
        let res = await axios.post('http://127.0.0.1:8000/api/login/postaccount', { account, phone })
        console.log(res)
        if (res && res.data.status === 200) {
            localStorage.setItem("user", res.data.name)
            localStorage.setItem("email", res.data.email)
            localStorage.setItem("role", "user")
            window.location.reload();
        }
    }



    handleSubmit = (event) => {
        event.preventDefault();
    };

    checkaccount = async () => {
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('password').value.trim();
        if (pass !== "" && email !== "") {
            const account = {
                email: email,
                password: pass
            }
            if (!email.includes('@gmail')) {
                let res = await axios.post('http://127.0.0.1:8000/api/login/checkadmin', { account });
                if (res && res.data.status === 200) {
                    localStorage.setItem("user", res.data.user.full_name)
                    localStorage.setItem("email", res.data.user.id)
                    localStorage.setItem("role", "admin")
                    window.location.reload();
                } if (res && res.data.status === "fail") {
                    document.querySelector('.error_email').classList.remove("hide")
                    document.getElementById('title_login1').classList.add("hide")
                    document.getElementById('title_login2').classList.remove("hide")
                    document.querySelector('.error_password').classList.add("hide")
                    document.getElementById('email').classList.add("error")
                    document.getElementById('password').classList.remove("error")
                }
                if (res && res.data.status === "password incorrect") {
                    document.querySelector('.error_password').classList.remove("hide")
                    document.getElementById('title_login2').classList.add("hide")
                    document.getElementById('title_login1').classList.remove("hide")
                    document.querySelector('.error_email').classList.add("hide")
                    document.getElementById('password').classList.add("error")
                    document.getElementById('email').classList.remove("error")

                }

            } else {
                let res = await axios.post('http://127.0.0.1:8000/api/login/checklogin', { account })
                console.log(res)
                if (res && res.data.status === 200) {
                    localStorage.setItem("user", res.data.user.name)
                    localStorage.setItem("email", res.data.user.email_user)
                    localStorage.setItem("role", "user")
                    window.location.reload();


                } if (res && res.data.status === "fail") {
                    document.querySelector('.error_email').classList.remove("hide")
                    document.getElementById('title_login1').classList.add("hide")
                    document.getElementById('title_login2').classList.remove("hide")
                    document.querySelector('.error_password').classList.add("hide")
                    document.getElementById('email').classList.add("error")
                    document.getElementById('password').classList.remove("error")
                }
                if (res && res.data.status === "password incorrect") {
                    document.querySelector('.error_password').classList.remove("hide")
                    document.getElementById('title_login2').classList.add("hide")
                    document.getElementById('title_login1').classList.remove("hide")
                    document.querySelector('.error_email').classList.add("hide")
                    document.getElementById('password').classList.add("error")
                    document.getElementById('email').classList.remove("error")

                }
                if (res && res.data.status === "verify") {
                    this.setState({
                        mess: true
                    })
                } if (res && res.data.status === 500) {
                    const mess = document.getElementById('messlogin');
                    mess.innerHTML = 'Tài khoản của bạn đã bị vô hiệu hóa';
                    this.setState({
                        mess: true
                    })

                }
            }

        }


    }

    messlogin = () => {
        this.setState(prevState => ({
            mess: !prevState.mess
        }));
    }
    eyehandel = () => {
        this.setState(prevState => ({
            password: !prevState.password
        }))
    }


    render() {
        return (
            <>
                <div className={this.state.mess ? "login_message_verify" : "hide"}>
                    <div className='background' onClick={this.messlogin}></div>
                    <div className='content' id='messlogin'>
                        <p>Tài khoản email của bạn chưa được xác thực.</p>
                        <p>Vui lòng đăng nhập vào email để xác thực tài khoản</p>
                    </div>
                </div>

                <section className='login'>
                    <div className='login_container'>
                        <form onSubmit={this.handleSubmit} className={this.state.exits ? "" : "hide"}>
                            <img src={require('../assets/image/logo/logo.png')} alt='' />
                            <div className="input_email">
                                <p id='title_login1'>Vui lòng điền email để tiếp tục  </p><span style={{ color: 'red', fontWeight: '600' }} className='error_email hide'> Email không tồn tại</span>
                                <input type='text' name='email' id='email' required placeholder='abc@gmail.com' />


                            </div>
                            <div className="input_password">
                                <p id='title_login2'>Xác thực mật khẩu </p><span style={{ color: 'red', fontWeight: '600' }} className='error_password hide'> Sai password</span>
                                <div className='box_input_eye'>
                                    <input type={this.state.password ? "text" : "password"} name='password' id='password' required placeholder='nhap password' />
                                    <i class={this.state.password ? "icon_eye fa-regular fa-eye" : "icon_eye fa-regular fa-eye-slash"} onClick={this.eyehandel}></i>
                                </div>
                            </div>
                            <input className='btn_submit' type='submit' onClick={this.checkaccount} value={"Tiếp Tục"} />
                            <p>Hoặc đăng nhập bằng tài khoản</p>
                            <div className='box_email'>
                                <div
                                    id="g_id_onload"
                                    data-client_id="678669696146-eavok6hpljl2uvig7vkgnai0o2n4pk7f.apps.googleusercontent.com"
                                    data-callback="handleCredentialResponse"
                                ></div>
                                <div
                                    className="g_id_signin custom"
                                    data-type="text"
                                    data-width="400"
                                    data-size="medium"
                                    data-theme="filled_black"
                                    data-text="sign_in_with"
                                    data-shape="rectangular"

                                    data-logo_alignment="center"
                                    style={{ padding: "3rem" }}>

                                </div>

                            </div>
                            <div className='box_faceid'>
                                <div>
                                    <img src={require('../assets/image/logo/faceid.png')} alt='' />
                                </div>
                                <p>Đăng nhập bằng FaceID</p>
                            </div>
                            <div className='link_login'>
                                <Link to="/register" className='link_navbar'><p>Đăng kí</p></Link>
                                <Link to="/forgotpassword" className='link_navbar'><p>Quên Mật Khẩu</p></Link>
                            </div>

                        </form>
                        <form onSubmit={this.handleSubmit} className={this.state.exits ? "hide" : ""}>
                            <p>Nhập số điện thoại</p>
                            <input type='number' id='phone'></input>
                            <input className='verified_phone' type='submit' value={"Verified"} onClick={this.inputphone} />
                        </form>
                    </div>
                    <div className='image'>
                    </div>
                </section>
            </>
        )
    }
}
export default withRouter(Login)
