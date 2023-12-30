import React, { Component } from 'react'
import emailjs from 'emailjs-com';
import '../style/ForgotPassword.scss'
import axios from 'axios';
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mess: false
        }
        this.form = React.createRef();
    }
    sendEmail = async (e) => {
        e.preventDefault();
        if (await this.checkemail()) {
            const reset = {
                email: this.form.current.email.value,
                code: this.form.current.code.value
            }
            console.log(this.form.current.code.value)
            let res = await axios.post('http://127.0.0.1:8000/api/login/forgotpassword', { reset })
            if (res && res.data.status === 200) {

                emailjs.sendForm('service_5l4i0be', 'template_4poisbd', this.form.current, 'PPB36x1bm1gtVZqjk')
                    .then((result) => {
                        this.setState({
                            mess: true
                        })
                    }, (error) => {
                        console.log(error.text);
                    });
            } else {
                console.log(res)
            }

        }

    };


    checkemail = async () => {
        const email = document.getElementById('email');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (regex.test(email.value.trim())) {
            let res = await axios.post('http://127.0.0.1:8000/api/login/register/checkemail', { email: email.value.trim() })
            if (res && res.data && res.data.status === 200) {
                email.classList.add('error');

                return false
            } else {
                email.classList.remove('error');

                return true
            }
        } else {
            email.classList.add('error');
            return false
        }
    }



    customPassword = () => {
        const length = 8;
        const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }
        return password
    }

    messlogin = () => {
        this.setState(prevState => ({
            mess: !prevState.mess
        }));
        window.location.href = '/login';
    }

    render() {
        return (
            <>
                <div className={this.state.mess ? "login_message_verify" : "hide"}>
                    <div className='background' onClick={this.messlogin}></div>
                    <div className='content'>
                        <p>Mật khẩu của bạn đã được cập nhật</p>
                        <p>Kiểm tra email để nhận mật khẩu và thay đổi nó sau khi đăng nhập</p>
                    </div>
                </div>
                <section className='sec1_reset_pass'>
                    <div className='sec1_reset_pass_container'>
                        <form ref={this.form} onSubmit={this.sendEmail}>
                            <div className='box_image'>
                                <img src={require('../assets/image/logo/logo.png')} alt='' />
                            </div>
                            <p>Reset Password</p>
                            <div className='box_email'>
                                <label>Email:</label>
                                <input className='email' id='email' name='email' required placeholder='nhap email cua ban' />
                            </div>

                            <input type='hidden' name='code' className='code' value={this.customPassword()}></input>
                            <div className='box_btn'>
                                <input type='submit' value={'Gửi'} />
                            </div>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}
