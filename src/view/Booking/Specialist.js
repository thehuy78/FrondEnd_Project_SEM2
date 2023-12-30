import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../style/Specialist.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Error from '../../component/Error'
import LoadingChild from '../../component/LoadingChild';

class Specialist extends Component {
    state = {
        databv: [],
        datakhoa: [],
        datavaccine: [],
        datatests: [],
        type: "",
        loading: true
    }
    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        console.log(this.props.match.params)
        if (this.props.match && this.props.match.params) {
            let type = this.props.match.params.type;  // Store type in a variable
            switch (type) {
                case "kham-benh-tai-co-so":
                    this.setState({
                        type: "chuyên khoa"
                    });
                    break;
                case "kham-benh-theo-bac-si":
                    this.setState({
                        type: "chuyên khoa"
                    });
                    break;
                case "xet-nghiem":
                    this.setState({
                        type: "loại xét nghiệm"
                    });
                    break;
                case "tiem-chung":
                    this.setState({
                        type: "loại tiêm chủng"
                    });
                    break;

                case "ngoai-gio":
                    this.setState({
                        type: "Khám ngoài giờ"
                    });
                    break;
                default:
                    window.location.href = '/404'
                    break;
            }
            let idbv = this.props.match.params.idbv;
            console.log(idbv);
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/specialist/${this.props.match.params.type}/${idbv}`)
                console.log("<<<rs ", res)
                if (res.data.status === 200) {
                    this.setState({
                        databv: res.data && res.data.databv ? res.data.databv : {},
                        datakhoa: res.data && res.data.datakhoa ? res.data.datakhoa : {},
                        datavaccine: res.data && res.data.datavaccine ? res.data.datavaccine : {},
                        datatests: res.data && res.data.datatests ? res.data.datatests : {},
                        loading: false
                    })
                } if (res.data.status === 400) {
                    window.location.href = '/404'
                }
            }, 200);
        }
    }
    back = () => {
        window.history.back();
    }
    searchspecialist = async () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            const search = document.getElementById("search").value;
            let idbv = this.props.match.params.idbv;

            if (search.trim() !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/specialist/search/${this.props.match.params.type}/${idbv}/${search}`)
                if (res.data.status === 200) {
                    this.setState({
                        datakhoa: res.data && res.data.datakhoa ? res.data.datakhoa : {},
                        datavaccine: res.data && res.data.datavaccine ? res.data.datavaccine : {},
                        datatests: res.data && res.data.datatests ? res.data.datatests : {},
                    })
                }

            } else {
                let res = await axios.get(`http://127.0.0.1:8000/api/specialist/${this.props.match.params.type}/${idbv}`)
                console.log("<<<rs ", res)
                if (res.data.status === 200) {
                    this.setState({
                        datavaccine: res.data && res.data.datavaccine ? res.data.datavaccine : {},
                        datatests: res.data && res.data.datatests ? res.data.datatests : {},
                        datakhoa: res.data && res.data.datakhoa ? res.data.datakhoa : {}
                    })
                }

            }
        }, 150)
    }
    handelclick = (item) => {

        if (this.props.match.params.type === 'kham-benh-tai-co-so') {
            this.props.history.push(`/option/${item.id_department}`)
        }
        if (this.props.match.params.type === 'kham-benh-theo-bac-si') {
            this.props.history.push(`/doctor/kham-benh/${item.id_department}`)
        }
        if (this.props.match.params.type === 'ngoai-gio') {
            this.props.history.push(`/doctor/ngoai-gio/${item.id_department}`)
        }
        if (this.props.match.params.type === 'tiem-chung') {
            this.props.history.push(`/schedule/${this.props.match.params.type}/${item.id_vaccination}`)
        }
        if (this.props.match.params.type === 'xet-nghiem') {
            this.props.history.push(`/schedule/${this.props.match.params.type}/${item.id_tests}`)
        }

    }
    handeldisable = () => {
        console.log('hehe')
    }
    render() {

        return (
            <>

                <section className='sec1_specialist'>
                    <div className='sec1_specialist_container'>
                        <div className='back_link'><Link to='/' class='link'>Trang chủ</Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><span>Trung tâm y tế HCM</span><i class="fa-solid fa-angle-up fa-rotate-90"></i><p>Chọn chuyên khoa</p></div>
                    </div>
                </section>
                <section className='sec2_specialist'>
                    <div className='sec2_specialist_container'>
                        {this.state.databv.map((item) => (
                            <div className='left' key={item.id_hospital}>
                                <p className='title'>Thông tin cơ sở y tế</p>
                                <div className='info_hospital'>
                                    <i class="fa-regular fa-hospital"></i>
                                    <div>
                                        <p className='name_hospital'>{item.name_hospital}</p>
                                        <p className='address_hospital'>{item.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='right'>
                            <p className='title'>Vui lòng chọn {this.state.type}</p>
                            <div className='box_search'>
                                <input type='text' placeholder={"search theo " + this.state.type} id='search' onChange={this.searchspecialist} />
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className='list_specialist'>
                                <LoadingChild hide={this.state.loading}
                                    bg='white'
                                />
                                {["kham-benh-tai-co-so", "kham-benh-theo-bac-si", "ngoai-gio"].includes(this.props.match.params.type) &&
                                    (
                                        this.state.datakhoa.length > 0 ? (
                                            this.state.datakhoa.map((item) => (
                                                <div className='link_khoa' key={item.id_department}>
                                                    <p onClick={item.status === 'active' ? () => { this.handelclick(item) } : this.handeldisable}>{item.name_department}</p>
                                                    <span className={item.status === 'active' ? 'hide' : 'disabled'}>* Tạm ngừng nhận đặt lịch</span>
                                                </div>
                                            ))
                                        ) : (
                                            <Error index={2} />
                                        )
                                    )
                                }

                                {this.props.match.params.type === "xet-nghiem" &&
                                    (
                                        this.state.datatests.length > 0 ? (
                                            this.state.datatests.map((item) => (
                                                <div className='link' key={item.id_tests}>
                                                    <p onClick={item.status === 'active' ? () => { this.handelclick(item) } : this.handeldisable}><span>{item.name_tests} </span></p>
                                                    <span>Giá: <span>{item.fee.toLocaleString()} VNĐ</span></span>
                                                    <span className={item.status === 'active' ? 'hide' : 'disabled'}>* Tạm ngừng nhận đặt lịch</span>

                                                </div>
                                            ))
                                        ) : (
                                            <Error index={5} />
                                        )
                                    )
                                }

                                {this.props.match.params.type === "tiem-chung" &&
                                    (
                                        this.state.datavaccine.length > 0 ? (
                                            this.state.datavaccine.map((item) => (
                                                <div className='link' key={item.id_vaccination}>
                                                    <p onClick={item.status === 'active' ? () => { this.handelclick(item) } : this.handeldisable}><span>{item.name_vaccination}</span></p>
                                                    <span>Giá: <span>{item.fee.toLocaleString()} VNĐ</span></span>
                                                    <span className={item.status === 'active' ? 'hide' : 'disabled'}>* Tạm ngừng nhận đặt lịch</span>
                                                </div>
                                            ))
                                        ) : (
                                            <Error index={4} />
                                        )
                                    )
                                }

                            </div>
                        </div>
                        <div className='bottom'> <div onClick={this.back} className='link'><i class="fa-solid fa-rotate-left"></i>Quay lại</div></div>
                    </div>
                </section>
            </>
        )
    }
}
export default withRouter(Specialist)
