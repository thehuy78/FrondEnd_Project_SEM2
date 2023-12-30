import React, { Component } from 'react'
import '../../style/Formality.scss'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';


class OptionBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            databv: [],
            datakhoa: [],
            loading: true
        }
    }

    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        const id_khoa = this.props.match.params.id_khoa
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/doctor/${id_khoa}`)
            if (res && res.data) {
                this.setState({
                    databv: res.data.databv && res.data.databv.length > 0 ? res.data.databv : [],
                    datakhoa: res.data.datakhoa && res.data.datakhoa.length > 0 ? res.data.datakhoa : [],
                    loading: false
                })
            }
        }, 100);


    }
    back = () => {
        window.history.back();
    }


    handelclick = async (item) => {

        if (item === 1) {
            this.props.history.push(`/doctor/kham-benh/${this.props.match.params.id_khoa}`)
        }
        if (item === 2) {

            this.props.history.push(`/schedule/kham-benh/${this.state.datakhoa.length > 0 && (this.state.datakhoa[0].id_department)}`)
        }


    }
    render() {

        return (
            <>

                <section className='sec1_formality'>
                    <div className='sec1_formality_container'>
                        <div className='back_link'><Link to='/' class='link'>Trang chủ</Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><span>{this.state.databv.length > 0 && (this.state.databv[0].name_hospital)}</span><i class="fa-solid fa-angle-up fa-rotate-90"></i><Link className='link_navbar' to={`/specialist/kham-benh/${this.state.databv.length > 0 && this.state.databv[0].id_hospital}`}><span>Khoa {this.state.datakhoa.length > 0 && (this.state.datakhoa[0].name_department)}</span></Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><p>Hình thức đặt khám</p></div>
                    </div>
                </section >
                <section className='sec2_formality'>
                    <div className='sec2_formality_container'>
                        <div className='content'>
                            <p className='title'> Các hình thức đặt khám</p>
                            <p className='discriber'>Đặt khám nhanh chóng, không phải chờ đợi với nhiều cơ sở y tế trên khắp thành phố</p>
                            <div className='box_choice'>
                                <p onClick={() => this.handelclick(2)}><i class="fa-regular fa-calendar-days"></i>Đặt khám theo ngày</p>
                                <p onClick={() => this.handelclick(1)}><i class="fa-solid fa-user-doctor"></i>Chọn bác sĩ đặt lịch</p>
                            </div>
                        </div>
                        <div className='bottom'> <div onClick={this.back} className='link'><i class="fa-solid fa-rotate-left"></i>Quay lại</div></div>

                    </div>
                </section >
            </>
        )
    }
}

export default withRouter(OptionBooking)
