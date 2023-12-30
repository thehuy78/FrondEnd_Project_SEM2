import React, { Component } from 'react'
import '../style/Setting.scss'
import axios from 'axios';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pay: 1,
            user: []
        }
    }

    componentDidMount() {
        const user = localStorage.getItem('email')
        this.setState({
            user: user
        })

    }

    clickpay = (number) => {
        this.setState({
            pay: number
        })
    }

    copyToClipboard = () => {
        var text = document.getElementById("pay_qr");
        var tempTextarea = document.createElement('textarea');
        tempTextarea.textContent = text.textContent;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
    }


    checkgiftcode = async (event) => {
        event.preventDefault();
        var code = document.getElementById("code").value;
        let res = await axios.post('http://127.0.0.1:8000/api/payment/giftcode', { code, id_user: this.state.user })
        if (res.data.status === 200) {
            alert("Bạn đã được cộng " + res.data.code.price.toLocaleString() + " VNĐ vào tài khoản !")
            window.location.href = '/information/1'
            document.getElementById("code").value = "";
            document.getElementById("code").classList.remove('error')
        }  if (res.data.status === 500)  {
            alert("Gift code không tồn tại !")
            document.getElementById("code").value = "";
            document.getElementById("code").classList.add('error')
        }
        if (res.data.status === 400)  {
            alert("Gift code đã được sử dụng !")
            document.getElementById("code").value = "";
            document.getElementById("code").classList.add('error')
        }
    }

    render() {

        return (
            <>
                <section className="sec3_setting_payment">
                    <div className='sec3_setting_payment_container'>
                        <div className='step_1'>
                            <p className={this.state.pay === 1 ? "choice" : ""} onClick={() => this.clickpay(1)}>Thanh Toán Thẻ Online</p>
                            <p className={this.state.pay === 2 ? "choice" : ""} onClick={() => this.clickpay(2)}>Thanh Toán QR</p>
                            <p className={this.state.pay === 3 ? "choice" : ""} onClick={() => this.clickpay(3)}>Nhập mã GiftCode</p>
                        </div>

                        <div className='step2'>
                            <div className={this.state.pay === 1 ? "visa" : "hide"}>

                                <form>
                                    <div> <p className='title'>Thanh Toán</p>
                                        <p className='dis'>Tất cả thông tin sẽ được bảo mật</p></div>
                                    <div>
                                        <p>Type</p>
                                        <p className='list_card'><i class="fa-solid fa-credit-card"></i><i class="fa-brands fa-cc-paypal"></i><i class="fa-brands fa-cc-amazon-pay"></i><i class="fa-brands fa-cc-visa"></i><i class="fa-brands fa-cc-mastercard"></i></p>
                                    </div>
                                    <div><input placeholder='Card Number' /></div>

                                    <div><input placeholder='Name on Card' /></div>
                                    <div>
                                        <input placeholder='Expriration date (MM/YY)' />
                                        <input placeholder='Security Code' />
                                    </div>
                                    <div>
                                        <p>100.000đ<input type='checkbox' /></p>
                                        <p>500.000đ<input type='checkbox' /></p>
                                        <p>1.000.000đ<input type='checkbox' /></p>
                                    </div>
                                    <div><input type='submit' value={"Thanh Toán"} /></div>
                                </form>
                            </div>
                            <div className={this.state.pay === 2 ? "qr" : "hide"} >

                                <div className='left'>
                                    <p>Quét mã QR</p>
                                    <img src={require('../assets/image/home/qr.jpeg')} alt='' />
                                </div>
                                <div className='right'>
                                    <p>NỘI DUNG CHUYỂN TIỀN</p>
                                    <p id='pay_qr'>Naptien {localStorage.getItem('email')} <i class="fa-solid fa-copy" title='sao chép' onClick={this.copyToClipboard}></i></p>
                                    <p className='dis'>Vui lòng nhập đúng nội dung chuyển khoản để được cộng tiền vào đúng tài khoản</p>
                                    <p className='sp'>Liên hệ trợ giúp: 0909-0909-09</p>
                                </div>
                            </div>
                            <div className={this.state.pay === 3 ? "giftcode" : "hide"} >
                                <form onSubmit={this.checkgiftcode}>
                                    <p>NHẬP GIFTCODE CỦA BẠN</p>
                                    <div>
                                        <input id='code'></input>
                                        <input type='submit' value={"Apply"} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
