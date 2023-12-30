import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../style/Doctor.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Error from '../../component/Error'
// import Loadding from '../../component/Loadding'
import LoadingChild from '../../component/LoadingChild'

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idkhoa: "",
            datadoctor: [],
            databv: [],
            datakhoa: [],
            loading: true

        }
    }
    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (this.props.match && this.props.match.params) {
            let idkhoa = this.props.match.params.idkhoa;
            let type = this.props.match.params.type;

            if (type === 'kham-benh') {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                this.timeoutId = setTimeout(async () => {
                    let res = await axios.get(`http://127.0.0.1:8000/api/doctor/${idkhoa}`)
                    console.log(res)
                    if (res.data.status === 200) {
                        this.setState({
                            databv: res.data && res.data.databv ? res.data.databv : {},
                            datakhoa: res.data && res.data.datakhoa ? res.data.datakhoa : {},
                            datadoctor: res.data && res.data.datadoctor ? res.data.datadoctor : {},
                            loading: false
                        })
                    } if (res.data.status === 400) {
                        window.location.href = '/404'
                    }
                }, 200);

            } else {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                this.timeoutId = setTimeout(async () => {
                    let res = await axios.get(`http://127.0.0.1:8000/api/doctor/after/${idkhoa}`)
                    console.log(res)
                    if (res.data.status === 200) {
                        this.setState({
                            databv: res.data && res.data.databv ? res.data.databv : {},
                            datakhoa: res.data && res.data.datakhoa ? res.data.datakhoa : {},
                            datadoctor: res.data && res.data.datadoctor ? res.data.datadoctor : {},
                            loading: false
                        })
                    } if (res.data.status === 400) {
                        window.location.href = '/404'
                    }
                }, 200);

            }



        }

    }


    sortdoctor = async () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }
        let type = this.props.match.params.type
        this.timeoutId = setTimeout(async () => {
            let select1 = document.getElementById("select1").value;
            let select2 = document.getElementById("select2").value;
            let select3 = document.getElementById("select3").value;
            let search = document.getElementById("search").value;
            let idkhoa = this.props.match.params.idkhoa;
            if (type === 'kham-benh' && select1 === "" && select2 === "" && select3 === "" && search.trim() === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/doctor/${idkhoa}`)
                console.log(res)
                this.setState({
                    datadoctor: res.data && res.data.datadoctor ? res.data.datadoctor : []
                })
            } if (type === 'ngoai-gio' && select1 === "" && select2 === "" && select3 === "" && search.trim() === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/doctor/after/${idkhoa}`)
                this.setState({
                    datadoctor: res.data && res.data.datadoctor ? res.data.datadoctor : []
                })
            } if (select1 !== "" || select2 !== "" || select3 !== "" || search.trim() !== "") {
                if (select1 === "") {
                    select1 = 'notdata'
                }
                if (select2 === "") {
                    select2 = 'notdata'
                }
                if (select3 === "") {
                    select3 = 'notdata'
                }
                if (search.trim() === "") {
                    search = 'notdata'
                }
                let res = await axios.get(`http://127.0.0.1:8000/api/doctor/sort/${type}/${idkhoa}/${select1}/${select2}/${select3}/${search}`)
                console.log('fil' + res)
                this.setState({
                    datadoctor: res.data && res.data.datadoctor ? res.data.datadoctor : []
                })
            }

        }, 150)

    }






    back = () => {
        window.history.back();
    }
    handelclick = (idBs) => {
        if (this.props.match.params.type === 'ngoai-gio') {
            this.props.history.push(`/schedule/kham-benh-ngoai-gio/${idBs.id_doctor}`)
        } if (this.props.match.params.type === 'kham-benh') {
            this.props.history.push(`/schedule/kham-benh-theo-bac-si/${idBs.id_doctor}`)
        }

    }
    handelDisable = () => { }
    render() {
        const datadoctor = this.state.datadoctor;
        const isEmptyArray = datadoctor.length === 0;
        return (
            <>
                {/* <Loadding hide=

                    {this.state.loading}
                /> */}
                <section className='sec1_doctor'>
                    <div className='sec1_doctor_container'>
                        <div className='back_link'><Link to='/' class='link'>Trang chủ</Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><span>Trung tâm y tế HCM</span><i class="fa-solid fa-angle-up fa-rotate-90"></i><p>Chọn bác sĩ</p></div>
                    </div>
                </section>
                <section className='sec2_doctor'>
                    <div className='sec2_doctor_container'>
                        <div className='left'>
                            <p className='title'>Thông tin cơ sở y tế</p>
                            <div className='information'>
                                {this.state.databv.map((item) => (
                                    <div className='info_hospital'>
                                        <i class="fa-regular fa-hospital"></i>
                                        <div>
                                            <p className='name_hospital'>{item.name_hospital}</p>
                                            <p className='address_hospital'>{item.address}</p>
                                        </div>
                                    </div>
                                ))}
                                {this.state.datakhoa.map((item) => (
                                    <div className='info_specialist'>
                                        <i class="fa-regular fa-hospital"></i>

                                        <p className='name_specialist'>Chuyên khoa: {item.name_department}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='right'>
                            <p className='title'>Vui lòng chọn bác sĩ</p>
                            <div className='right_container'>
                                <div className='box_search'>
                                    <input type='text' placeholder='search theo bác sĩ' id='search' onChange={this.sortdoctor} />
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <div className='box_sort'>
                                    <div>
                                        <select id='select1' onChange={this.sortdoctor}>
                                            <option value={""}>Học hàm / Học vị</option>
                                            <option value={"BS Chuyên Khoa"}>Bác sĩ CK</option>
                                            <option value={"Bác sĩ"}>Bác sĩ</option>
                                            <option value={"Thạc sĩ"}>Thạc sĩ</option>
                                            <option value={"Giáo Sư"}>Giáo sư</option>
                                            <option value={"Tiến Sĩ"}>Tiến sĩ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select id='select2' onChange={this.sortdoctor}>
                                            <option value={""}>Giá Khám</option>
                                            <option value={"1"}>0 - 50.000đ</option>

                                            <option value={"2"}>50.000đ - 100.000đ</option>
                                            <option value={"3"}>100.000đ - 250.000đ</option>
                                            <option value={"4"}>Trên 250.000đ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select id='select3' onChange={this.sortdoctor}>
                                            <option value={""}>Giới tính</option>
                                            <option value={"Nam"}>Nam</option>
                                            <option value={"Nữ"}>Nữ</option>

                                        </select>
                                    </div>
                                </div>
                                <div className='list_doctor'>
                                    <LoadingChild
                                        bg='white'
                                        hide=
                                        {this.state.loading}
                                    />
                                    {!isEmptyArray ? (this.state.datadoctor.map((item) => (
                                        <div onClick={item.status === 'active' ? () => { this.handelclick(item) } : this.handelDisable} class='link' key={item.id_doctor}>
                                            {item.status !== 'active' && (
                                                <p className='disabled'>Bác sĩ ngừng nhận lịch</p>
                                            )}

                                            <div>
                                                <p><i class="fa-solid fa-user-doctor"></i>{item.academic_degree} {item.name}</p>
                                                <p><i class="fa-solid fa-mars-and-venus"></i>Giới tính: {item.gender}</p>
                                                <p><i class="fa-solid fa-stethoscope"></i>Chuyên khoa:
                                                    {this.state.datakhoa.map(index => index.name_department)}
                                                </p>
                                                <p><i class="fa-regular fa-calendar-days"></i>Lịch khám: {item.day_work_doctor}</p>
                                                <p>
                                                    <i className="fa-solid fa-dollar-sign"></i>
                                                    Giá khám: {typeof item.fee === 'number' ? (this.props.match.params.type === 'ngoai-gio' ? item.fee_after.toLocaleString() : item.fee.toLocaleString()) : item.fee}đ
                                                </p>

                                            </div>

                                        </div>
                                    ))) : (
                                        <Error index={3} />
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className='bottom'> <div onClick={this.back} className='link'><i class="fa-solid fa-rotate-left"></i>Quay lại</div></div>
                    </div >
                </section >
            </>
        )
    }
}
export default withRouter(Doctor)