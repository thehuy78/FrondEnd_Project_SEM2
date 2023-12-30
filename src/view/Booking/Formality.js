import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../style/Formality.scss'
import axios from 'axios';
import LoadingChild from '../../component/LoadingChild';

class Formality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sv1: false,
            sv2: false,
            sv3: false,
            sv4: false,
            databv: [],
            loading: true
        }
    }
    back = () => {
        window.history.back();
    }

    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/specialist/getservice/${this.props.match.params.id}`)
            console.log(res)
            if (res && res.data && res.data.status === 200 && res.data.databv.length > 0) {
                this.setState({
                    databv: res.data.databv,
                    loading: false
                })
                const services = res.data.databv[0].services;
                console.log(services)
                if (!services.trim().includes(" ")) {
                    if (services.includes("Kham-Theo-Bac-Si")) {
                        this.props.history.push(`/specialist/${"kham-benh-tai-co-so"}/${this.props.match.params.id}`)
                    }
                    if (services.includes("Kham-Theo-Bac-Si")) {
                        this.props.history.push(`/specialist/${"kham-benh-theo-bac-si"}/${this.props.match.params.id}`)
                    }
                    if (services.includes("Tiem-Chung")) {
                        this.props.history.push(`/specialist/${"tiem-chung"}/${this.props.match.params.id}`)
                    }
                    if (services.includes("Xet-Nghiem")) {
                        this.props.history.push(`/specialist/${"xet-nghiem"}/${this.props.match.params.id}`)
                    }
                    if (services.includes("Kham-Benh-Ngoai-Gio")) {
                        this.props.history.push(`/specialist/${'ngoai-gio'}/${this.props.match.params.id}`)
                    }
                } else {
                    if (services.includes("Kham-Theo-Bac-Si")) {
                        this.setState({
                            sv1: true
                        })
                    }
                    if (services.includes("Kham-Theo-Bac-Si")) {
                        this.setState({
                            sv2: true
                        })
                    }
                    if (services.includes("Tiem-Chung")) {
                        this.setState({
                            sv3: true
                        })
                    }
                    if (services.includes("Xet-Nghiem")) {
                        this.setState({
                            sv4: true
                        })
                    }
                }
            }
        }, 100);




    }
    handelClick = (url) => {

        this.props.history.push(`/specialist/${url}/${this.props.match.params.id}`)
    }
    render() {
        return (
            <>

                <section className='sec1_formality'>
                    <div className='sec1_formality_container'>
                        <div className='back_link'><Link to='/' class='link'>Trang chủ</Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><span>{this.state.databv.length > 0 && (this.state.databv[0].name_hospital)}</span><i class="fa-solid fa-angle-up fa-rotate-90"></i><p>Dịch vụ đặt khám</p></div>
                    </div>
                </section>
                <section className='sec2_formality'>
                    <LoadingChild hide=

                        {this.state.loading}
                    />
                    <div className='sec2_formality_container'>
                        <div className='content'>
                            <p className='title'> Các hình thức đặt khám</p>
                            <p className='discriber'>Đặt khám nhanh chóng, không phải chờ đợi với nhiều cơ sở y tế trên khắp thành phố</p>
                            <div className='box_choice'>
                                <p className={this.state.sv1 ? "" : "hide"} onClick={() => this.handelClick("kham-benh-tai-co-so")}><i class="fa-regular fa-calendar-days"></i>Đặt khám tại cơ sở</p>
                                <p className={this.state.sv2 ? "" : "hide"} onClick={() => this.handelClick("kham-benh-theo-bac-si")}><i class="fa-solid fa-user-doctor"></i>Đặt khám theo bác sĩ</p>
                                <p className={this.state.sv4 ? "" : "hide"} onClick={() => this.handelClick("xet-nghiem")}><i class="fa-solid fa-vial"></i>Đặt lịch xét nghiệm</p>
                                <p className={this.state.sv3 ? "" : "hide"} onClick={() => this.handelClick("tiem-chung")}><i class="fa-solid fa-syringe"></i>Đặt lịch tiêm chủng</p>
                                <p className={this.state.sv3 ? "" : "hide"} onClick={() => this.handelClick("ngoai-gio")}><i class="fa-solid fa-clock"></i>Đặt lịch khám ngoài giờ</p>
                            </div>
                        </div>
                        <div className='bottom'> <div onClick={this.back} className='link'><i class="fa-solid fa-rotate-left"></i>Quay lại</div></div>

                    </div>
                </section >
            </>
        )
    }
}
export default withRouter(Formality)
