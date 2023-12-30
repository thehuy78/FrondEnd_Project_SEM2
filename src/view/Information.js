import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/Information.scss'
import { withRouter } from 'react-router-dom';
import ListHistory from '../component/ListHistory';
import ListBill from '../component/ListBill';
import Setting from '../component/Setting';
import Payment from '../component/Payment';

import HistoryTransaction from '../component/HistoryTransaction';


class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: 2,
            history: 1,
            listbill: 1

        }
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const { index } = this.props.match.params;
        this.setState({
            choice: parseInt(index, 10)
        })
    }
    handelClick = (number) => {
        if (number === 7) {
            localStorage.removeItem("user")
            localStorage.removeItem("email")
            localStorage.removeItem("role")
            window.location.href = "/"

        }
        this.setState({
            choice: number
        })
    }
    componentDidUpdate(prevProps) {
        const { index } = this.props.match.params;
        if (index !== prevProps.match.params.index) {
            this.setState({
                choice: parseInt(index, 10)
            });
        }
    }
    choicehistory = (index) => {
        this.setState({
            history: index
        })
        console.log(index)
    }
    choicebill = (index) => {
        this.setState({
            listbill: index
        })
        console.log(index)
    }



    render() {
        return (
            <>

                <section className='sec1_information'>
                    <div className='sec1_information_container'>
                        <div className='back_link'><Link to='/' class='link'>Trang chủ</Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><p>Thông tin tài khoản</p></div>
                    </div>
                </section>
                <section className='sec2_information'>
                    <div className='sec2_information_container'>
                        <div className='left'>
                            <div className={this.state.choice === 1 ? "divchoice" : "div1"}><Link className='link' to='/information/1'><p onClick={() => this.handelClick(1)} className={this.state.choice === 1 ? "choice" : ""}><i class="fa-solid fa-user-plus"></i><span>Tài Khoản</span></p></Link></div>
                            <div className={this.state.choice === 2 ? "divchoice" : ""}><Link className='link' to='/information/2'> <p onClick={() => this.handelClick(2)} className={this.state.choice === 2 ? "choice" : ""}><i class="fa-solid fa-credit-card"></i><span>Thanh Toán</span></p></Link></div>
                            <div className={this.state.choice === 3 ? "divchoice" : ""}><Link className='link' to='/information/3'> <p onClick={() => this.handelClick(3)} className={this.state.choice === 3 ? "choice" : ""}><i class="fa-solid fa-clock-rotate-left"></i><span>Biến động số dư</span></p></Link></div>
                            <div className={this.state.choice === 4 ? "divchoice" : ""}><Link className='link' to='/information/4'><p onClick={() => this.handelClick(4)} className={this.state.choice === 4 ? "choice" : ""}><i class="fa-regular fa-file-lines"></i><span>Lịch sử khám bệnh</span></p></Link></div>
                            <div className={this.state.choice === 5 ? "divchoice" : ""}><Link className='link' to='/information/5'> <p onClick={() => this.handelClick(5)} className={this.state.choice === 5 ? "choice" : ""}><i class="fa-solid fa-file-invoice"></i><span>Phiếu khám bệnh</span></p></Link></div>
                            <div className={this.state.choice === 6 ? "divchoice" : ""}><Link className='link' to='/information/6'> <p onClick={() => this.handelClick(6)} className={this.state.choice === 6 ? "choice" : ""}><i class="fa-regular fa-bell"></i><span>Thông báo</span></p></Link></div>

                            <div className={this.state.choice === 7 ? "divchoice" : ""}><div className='logout' > <p onClick={() => this.handelClick(7)} className={this.state.choice === 7 ? "choice" : ""}><i class="fa-solid fa-right-from-bracket"></i><span>Đăng xuất</span></p></div></div>
                        </div>
                        <div className='right'>
                            <section className={this.state.choice === 1 ? "sec1" : "hide"}>

                                {this.props.match.params.index === '1' && (
                                    <Setting />
                                )}
                            </section>
                            <section className={this.state.choice === 2 ? "sec2" : "hide"}>
                                {this.props.match.params.index === '2' && (
                                    <Payment />
                                )}

                            </section>
                            <section className={this.state.choice === 3 ? "sec3" : "hide"}>
                                <p className='title'>Biến động số dư</p>
                                {this.props.match.params.index === '3' && (
                                    <HistoryTransaction />
                                )}

                            </section>
                            <section className={this.state.choice === 4 ? "sec4" : "hide"}>
                                <p className='title'>Danh sách lịch sử khám bệnh</p>
                                <div className='box_choice'>
                                    <button onClick={() => this.choicehistory(1)} className={this.state.history === 1 ? "button_active" : ""}>Khám bệnh</button>
                                    <button onClick={() => this.choicehistory(2)} className={this.state.history === 2 ? "button_active" : ""}>Xét nghiệm</button>
                                    <button onClick={() => this.choicehistory(3)} className={this.state.history === 3 ? "button_active" : ""}>Tiêm chủng</button>
                                    <button onClick={() => this.choicehistory(4)} className={this.state.history === 4 ? "button_active" : ""}>Gói dịch vụ</button>
                                </div>
                                {this.props.match.params.index === '4' && (
                                    <ListHistory index={this.state.history} />
                                )}

                            </section>
                            <section className={this.state.choice === 5 ? "sec5" : "hide"}>
                                <p className='title'>Danh sách phiếu khám bệnh</p>
                                <div className='box_choice'>
                                    <button onClick={() => this.choicebill(1)} className={this.state.listbill === 1 ? "button_active" : ""}>Khám bệnh</button>
                                    <button onClick={() => this.choicebill(2)} className={this.state.listbill === 2 ? "button_active" : ""}>Xét nghiệm</button>
                                    <button onClick={() => this.choicebill(3)} className={this.state.listbill === 3 ? "button_active" : ""}>Tiêm chủng</button>
                                    <button onClick={() => this.choicebill(4)} className={this.state.listbill === 4 ? "button_active" : ""}>Gói dịch vụ</button>
                                </div>
                                {this.props.match.params.index === '5' && (
                                    <ListBill index={this.state.listbill} />
                                )}


                            </section>
                            <section className={this.state.choice === 6 ? "sec6" : "hide"}>
                                <p className='title'>Danh sách thông báo</p>
                                <div className='box_btn'>
                                    <p><i class="fa-regular fa-eye"></i>Đánh dấu đã đọc</p>
                                    <p><i class="fa-solid fa-trash"></i>Xóa tất cả</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default withRouter(Information)
