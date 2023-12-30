import React, { Component } from 'react'
import Provinces from '../../data/Provinces.json'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../style/FormData.scss'
import Loadding from '../../component/Loadding'

class FormData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            provinces: Provinces,
            selectedProvince: '',
            selectedDistrict: '',
            selectedWard: '',
            data: [],
            type: "",
            form: [],
            history: [],
            user: [],
            gender: '',
            mess: false,
            temp_id_doctor: '',
            loading: true
        }
    };

    renderProvinceOptions() {
        return this.state.provinces.map((province) => (

            <option key={province.code} value={province.name}>
                {province.name}
            </option>

        ));
    }
    renderDistrictOptions() {
        const { selectedProvince, provinces } = this.state;

        if (!selectedProvince) {
            return null;
        }

        const selectedProvinceData = provinces.find((province) => province.name === selectedProvince);

        return selectedProvinceData.districts.map((district) => (

            <option key={district.code} value={district.name}>
                {district.name}
            </option>

        ));
    }
    renderWardOptions() {
        const { selectedProvince, selectedDistrict, provinces } = this.state;

        if (!selectedProvince || !selectedDistrict) {
            return null;
        }

        const selectedDistrictData = provinces
            .find((province) => province.name === selectedProvince)
            .districts.find((district) => district.name === selectedDistrict);

        return selectedDistrictData.wards.map((ward) => (

            <option key={ward.code} value={ward.name}>
                {ward.name}
            </option>

        ));
    }
    handleProvinceChange = (e) => {
        this.setState({
            selectedProvince: e.target.value,
            selectedDistrict: '',
            selectedWard: '',
        });
    };
    handleDistrictChange = (e) => {
        this.setState({
            selectedDistrict: e.target.value,
            selectedWard: '',
        });
    };

    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            const user = localStorage.getItem('email')
            let resp = await axios.post('http://127.0.0.1:8000/api/login/getaccount', { user })
            if (resp && resp.data) {
                this.setState({
                    user: resp.data.account[0]
                })
            }
        }, 200);
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/booking/getform/${localStorage.getItem('email')}`)
            if (res && res.data) {
                this.setState({
                    history: res.data.bookingform ? res.data.bookingform : {},
                    gender: res.data.bookingform && res.data.bookingform.gender ? res.data.bookingform.gender : '',

                })
            }
        }, 200);

        const type = this.props.match.params.type;
        if (type === "kham-benh-theo-bac-si") {
            if (this.timeoutkbs) {
                clearTimeout(this.timeoutkbs);
            }
            this.timeoutkbs = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/bs/${this.props.match.params.idbs}`);
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        temp_id_doctor: this.props.match.params.idbs,
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Khám Bệnh Theo Bác Sĩ",
                        loading: false
                    })
                } if (res && res.data && res.data.status === 400) {
                    window.location.href = '/404'
                }
            }, 200);


        }
        if (type === "kham-benh-ngoai-gio") {
            if (this.timeoutfree) {
                clearTimeout(this.timeoutfree);
            }
            this.timeoutfree = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/bs/${this.props.match.params.idbs}`);
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Khám Bệnh Ngoài Giờ",
                        loading: false
                    })
                }
                if (res && res.data && res.data.status === 400) { window.location.href = '/404' }
            }, 200);

        }
        if (type === "xet-nghiem") {
            if (this.timeouttest) {
                clearTimeout(this.timeouttest);
            }
            this.timeouttest = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/tests/${this.props.match.params.idbs}`);
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Xét Nghiệm",
                        loading: false
                    })
                }
                if (res && res.data && res.data.status === 400) { window.location.href = '/404' }
            }, 200);

        }
        if (type === "tiem-chung") {
            if (this.timeoutvac) {
                clearTimeout(this.timeoutvac);
            }
            this.timeoutvac = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/vaccination/${this.props.match.params.idbs}`);
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Tiêm chủng",
                        loading: false
                    })
                }
                if (res && res.data && res.data.status === 400) { window.location.href = '/404' }
            }, 200);

        }
        if (type === "goi-kham") {
            if (this.timeoutpack) {
                clearTimeout(this.timeoutpack);
            }
            this.timeoutpack = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/package/${this.props.match.params.idbs}`);
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Gói khám bệnh",
                        loading: false
                    })
                }
                if (res && res.data && res.data.status === 400) { window.location.href = '/404' }
            }, 200);

        }
        if (type === "kham-benh") {
            const arr = {
                idkhoa: this.props.match.params.idbs,
                date: sessionStorage.getItem('scheduledate'),
                time: sessionStorage.getItem('scheduletime')
            }
            if (this.timeoutBS) {
                clearTimeout(this.timeoutBS);
            }
            this.timeoutBS = setTimeout(async () => {
                let res = await axios.post('http://127.0.0.1:8000/api/formdata/custom/getdoctor', { arr })
                console.log(res)
                if (res && res.data && res.data.status === 200) {
                    let response = await axios.get(`http://127.0.0.1:8000/api/formdata/bs/${res.data.data}`);
                    this.setState({
                        data: response && response.data && response.data.data ? response.data.data : {},
                        type: "Khám Bệnh",
                        loading: false,
                        temp_id_doctor: response && response.data && response.data.data && response.data.data.length > 0 ? response.data.data[0].id_doctor : ''
                    })
                } if (res && res.data && res.data.status === 404) {
                    this.setState({
                        loading: false,
                        mess: true
                    })
                }
                if (res && res.data && res.data.status === 400) {
                    window.location.href = '/404'
                }

            }, 100);


        }
        // this.disabledPayment();

    }
    checkname = () => {
        const name = document.getElementById('name').value
        const err = document.getElementById('er_name')
        if (name.trim() !== "") {
            document.getElementById('name').classList.remove('error');
            err.classList.add('hide')
            return true
        } else {
            document.getElementById('name').classList.add('error');
            err.classList.remove('hide')
            return false
        }
    }


    checkdob = () => {
        const dob = document.getElementById('dob').value;
        const errdob = document.getElementById('er_dob');
        errdob.classList.add('hide')
        if (new Date(dob) > new Date()) {
            document.getElementById('dob').classList.add('error');
            errdob.innerHTML = 'Không tồn tại'
            errdob.classList.remove('hide')// Change the message as needed
            return false;
        }

        if (dob.trim() !== "") {
            errdob.classList.add('hide')
            document.getElementById('dob').classList.remove('error');
            return true;
        } else {
            errdob.classList.remove('hide')
            errdob.innerHTML = 'Not null'
            document.getElementById('dob').classList.add('error');
            return false;
        }
    }
    checksex = () => {
        const sex = document.getElementById('sex').value
        const err = document.getElementById('er_gender');
        if (sex.trim() !== "") {
            err.classList.add('hide')
            document.getElementById('sex').classList.remove('error');
            return true
        } else {
            err.classList.remove('hide')
            document.getElementById('sex').classList.add('error');
            return false
        }
    }


    checkphone = () => {
        const phone = document.getElementById('phone').value
        const err = document.getElementById('er_phone');
        const regex = /^[0-9]{10,12}$/
        if (phone.trim() === "") {
            err.innerHTML = 'Not null'
            err.classList.remove('hide')
            document.getElementById('phone').classList.add('error');
            return false
        }
        else if (regex.test(phone.trim())) {

            err.classList.add('hide')
            document.getElementById('phone').classList.remove('error');
            return true
        }

        else {
            err.innerHTML = 'Sai định dạng'
            err.classList.remove('hide')
            document.getElementById('phone').classList.add('error');
            return false
        }
    }
    checkaddress = () => {
        const province = document.getElementById('province').value
        const district = document.getElementById('district').value
        const ward = document.getElementById('ward').value
        const street = document.getElementById('street').value
        if (province.trim() !== "" && district.trim() !== "" && ward.trim() !== "" && street.trim() !== "") {
            document.getElementById('province').classList.remove('error');
            document.getElementById('district').classList.remove('error');
            document.getElementById('ward').classList.remove('error');
            document.getElementById('street').classList.remove('error');
            return true
        } else {
            document.getElementById('province').classList.add('error');
            document.getElementById('district').classList.add('error');
            document.getElementById('ward').classList.add('error');
            document.getElementById('street').classList.add('error');

            return false
        }
    }


    checkform = async (event) => {
        event.preventDefault()
        if (!this.checkname() || !this.checksex() || !this.checkdob() || !this.checkphone() || !this.checkaddress()) {
        }
        else {
            if (['kham-benh', 'kham-benh-theo-bac-si'].includes(this.props.match.params.type)) {
                const check = {
                    date: sessionStorage.getItem('scheduledate'),
                    time: sessionStorage.getItem('scheduletime'),
                    idbs: this.state.temp_id_doctor
                }
                let res = await axios.post('http://127.0.0.1:8000/api/schedule/checkdoctor', { check })
                if (res && res.data && res.data.status === 200) {
                    this.postform();
                } else {
                    this.setState({
                        mess: true
                    })
                }
            } else {
                this.postform();
            }

        }

    }

    //post form
    postform = async () => {
        if (window.confirm('Xác nhận đặt lịch (Lịch đã đặt không thể hủy trực tiếp trên hệ thống)')) {
            //lich kham
            var type = this.props.match.params.type
            if (type === 'kham-benh-theo-bac-si') {
                type = 'kham-benh'
            }
            const date = sessionStorage.getItem("scheduledate")
            const time = sessionStorage.getItem("scheduletime")
            //infor user
            const name = document.getElementById('name').value
            const cmnd = document.getElementById('cmnd').value
            const dob = document.getElementById('dob').value
            const sex = document.getElementById('sex').value
            const nation = document.getElementById('nation').value
            const job = document.getElementById('job').value
            const phone = document.getElementById('phone').value
            const province = document.getElementById('province').value
            const district = document.getElementById('district').value
            const ward = document.getElementById('ward').value
            const street = document.getElementById('street').value
            const description = document.getElementById('description').value
            const user = localStorage.getItem('email');

            const formData = {
                type: type,
                date: date,
                time: time,
                name: name,
                cmnd: cmnd,
                dob: dob,
                sex: sex,
                nation: nation,
                job: job,
                phone: phone,
                province: province,
                district: district,
                ward: ward,
                street: street,
                user: user,
                description: description
            };
            // console.log(formData)

            this.setState({
                form: formData,
                step: 2
            });
        }


    }
    payment = async () => {
        if (['kham-benh', 'kham-benh-theo-bac-si'].includes(this.props.match.params.type)) {
            const check = {
                date: sessionStorage.getItem('scheduledate'),
                time: sessionStorage.getItem('scheduletime'),
                idbs: this.state.temp_id_doctor
            }
            let res = await axios.post('http://127.0.0.1:8000/api/schedule/checkdoctor', { check })
            if (res && res.data && res.data.status === 200) {
                const pay_account = document.getElementById('pay_account');
                const pay_card = document.getElementById('pay_card');
                if (pay_account.checked) {
                    let res = await axios.post('http://127.0.0.1:8000/api/booking', {
                        form: this.state.form, data: this.state.data
                    });
                    if (res && res.data.status === 200) {
                        window.location.href = '/information/5'
                    }

                } if (pay_card.checked) {
                    let res = await axios.post('http://127.0.0.1:8000/api/payment/visa/', {
                        form: this.state.form, data: this.state.data

                    })
                    const email = localStorage.getItem('email')

                    window.location.href = `http://127.0.0.1:8000/payment_form/${email}`

                    console.log(res)
                }
            } else {
                this.setState({
                    mess: true
                })
            }
        } else {
            const pay_account = document.getElementById('pay_account');
            const pay_card = document.getElementById('pay_card');
            if (pay_account.checked) {
                let res = await axios.post('http://127.0.0.1:8000/api/booking', {
                    form: this.state.form, data: this.state.data
                });
                if (res && res.data.status === 200) {
                    window.location.href = '/information/5'
                }

            } if (pay_card.checked) {
                let res = await axios.post('http://127.0.0.1:8000/api/payment/visa/', {
                    form: this.state.form, data: this.state.data

                })
                const email = localStorage.getItem('email')

                window.location.href = `http://127.0.0.1:8000/payment_form/${email}`

                console.log(res)
            }
        }



    }

    disabledPayment = () => {
        const data = this.state.data[0];
        let total = 0;
        if (data) {
            total = parseInt(data.fee) + 1000;
        }
        const balance = this.state.user.balance;
        const btnpay = document.getElementById('pay');
        const pay_account = document.getElementById('pay_account');
        const pay_card = document.getElementById('pay_card');
        if (!pay_account.checked && !pay_card.checked) {
            btnpay.disabled = true;
        }
        else {
            btnpay.disabled = false;
            if (pay_account.checked) {
                if (balance - total < 0) {
                    btnpay.disabled = true;
                }
            } else {
                btnpay.disabled = false;
            }
        }

    }

    componentDidUpdate() {
        this.disabledPayment()
    }


    onGenderChange = (event) => {
        const selectedGender = event.target.value;
        this.setState({
            gender: selectedGender
        });
    }

    notDoctor = () => {
        this.setState(prevState => ({
            mess: !prevState.mess
        }));
        if (this.props.match.params.type === 'kham-benh-theo-bac-si') {
            this.props.history.push(`/schedule/kham-benh-theo-bac-si/${this.props.match.params.idbs}`)
        }
        if (this.props.match.params.type === 'kham-benh') {
            this.props.history.push(`/schedule/kham-benh/${this.props.match.params.idbs}`)
        }

    }


    render() {
        const datauser = this.state.form;
        const history = this.state.history;
        const data = this.state.data[0];
        let total = 0;
        if (data) {
            if (this.props.match.params.type === 'kham-benh-ngoai-gio') {
                total = parseInt(data.fee_after) + 1000;
            } else {
                total = parseInt(data.fee) + 1000;
            }


        }
        const user = this.state.user;
        var balance = user.balance;




        return (
            <>
                <Loadding hide={this.state.loading} />
                <div className={this.state.mess ? "login_message_verify" : "hide"}>
                    <div className='background' onClick={this.notDoctor}></div>
                    <div className='content'>
                        <p><i class="fa-solid fa-circle-exclamation"></i></p>
                        <p>Ngày bạn chọn tất cả các bác sĩ đã kín lịch</p>
                        <p>Vui lòng chọn ngày khám khác để được sắp xếp bác sĩ</p>

                    </div>
                </div>

                <section className={this.state.step === 1 ? "form_data_booking" : "hide"}>
                    <div className='form_data_booking_container'>
                        {this.state.data.map((item) => (
                            <div className='information_hospital'>
                                <p><span>Bệnh Viện: </span>{item.name_hospital}</p>
                                <p><span>Địa chỉ BV: </span>{item.address}</p>
                                {item.name_department && (<p><span>Khoa khám: </span>{item.name_department}</p>)}
                                {item.name && (<p><span>{item.academic_degree}: </span>{item.name}</p>)}
                                {item.pack_name && (<p><span>Tên gói: </span>{item.pack_name}</p>)}
                                {item.name_tests && (<p><span>Loại XN: </span>{item.name_tests}</p>)}
                                {item.name_vaccination && (<p><span>Gói Tiêm: </span>{item.name_vaccination}</p>)}
                                {item.fee && (<p><span>Giá gói: </span>{this.props.match.params.type === 'kham-benh-ngoai-gio' ? item.fee_after.toLocaleString() : item.fee.toLocaleString()} VNĐ</p>)}
                                <p><span>Ngày Khám:</span> {sessionStorage.getItem("scheduledate")}</p>
                                <p><span>Giờ khám:</span> {sessionStorage.getItem("scheduletime")}</p>
                                <p><span>Loại:</span>{this.state.type}</p>
                            </div>
                        ))}
                        <p className='title'>Thông tin bệnh nhân</p>
                        <p className='discriber'>Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại, việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.</p>
                        <p className='note'>(*) Thông tin bắt buộc nhập</p>



                        <form onSubmit={this.checkform}>
                            <div className='form_container'>
                                <div className='box_divided_2'>
                                    <div className='box_input'>
                                        <label>Họ Tên:<span>*</span><span className='hide err' id='er_name'>Not null</span></label>
                                        <input type='text' name='name' id='name'
                                            defaultValue={history.name_patient}
                                        ></input>
                                    </div>
                                    <div className='box_input'>
                                        <label>CMND:</label>
                                        <input type='text' name='cmnd' id='cmnd'
                                            defaultValue={history.cccd}
                                        ></input>
                                    </div>
                                </div>
                                <div className='box_input'>
                                    <label>Ngày Sinh:<span>*</span><span className='hide err' id='er_dob'></span></label>
                                    <input type='date' id='dob'
                                        defaultValue={history.dob}
                                    ></input>
                                </div>
                                <div className='box_divided_2'>
                                    <div className='box_input'>
                                        <label>Giới Tính:<span>*</span><span className='hide err' id='er_gender'>Not null</span></label>
                                        <select
                                            id='sex'
                                            value={this.state.gender}
                                            onChange={this.onGenderChange}
                                        >
                                            <option value={""}>--Giới Tính--</option>
                                            <option value={"Nam"}>Nam</option>
                                            <option value={"Nữ"}>Nữ</option>
                                        </select>
                                    </div>
                                    <div className='box_input'>
                                        <label>Dân Tộc:</label>
                                        <input type='text' id='nation'
                                            defaultValue={history.nation ? history.nation : "Kinh"}></input>
                                    </div>
                                </div>
                                <div className='box_input'>
                                    <label>Nghề Nghiệp:</label>
                                    <input type='text' id='job'
                                        defaultValue={history.job ? history.job : "Tự do"}></input>
                                </div>


                                <div className='box_divided_3'>
                                    <div className='box_input'> <label htmlFor="province">Tỉnh/Thành phố:<span>*</span></label>
                                        <select id="province"

                                            onChange={this.handleProvinceChange}>
                                            <option value={""}>
                                                --- Chọn ---
                                            </option>
                                            {this.renderProvinceOptions()}
                                        </select>
                                    </div>
                                    <div className='box_input'> <label htmlFor="district">Quận/Huyện:<span>*</span></label>
                                        <select id="district"

                                            onChange={this.handleDistrictChange}>
                                            <option value={""}>
                                                --- Chọn ---
                                            </option>
                                            {this.renderDistrictOptions()}
                                        </select>
                                    </div>
                                    <div className='box_input'><label htmlFor="ward">Xã/Phường:<span>*</span></label>
                                        <select id="ward"
                                        >
                                            <option value={""}>
                                                --- Chọn ---
                                            </option>
                                            {this.renderWardOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className='box_input'>
                                    <label>Số điện thoại:<span>*</span><span className='hide err' id='er_phone'>Not null</span></label>
                                    <input type='number' id='phone'
                                        defaultValue={history.phone_booking}
                                    ></input>
                                </div>
                                <div className='box_input'>
                                    <label>Mô tả bệnh tình:</label>
                                    <input type='text' id='description'></input>
                                </div>
                                <div className='box_input'>
                                    <label>Địa chỉ:<span>*</span></label>
                                    <input id='street'

                                    ></input>
                                </div>
                            </div>

                            <div className='box_btn'>
                                <input type='submit' value={"Đăng kí"} className='btn_submit' />
                            </div>
                        </form>

                    </div>
                </section>
                <section className={this.state.step === 2 ? "formdata_payment" : "hide"}>
                    <div className='formdata_payment_container'>
                        <div className='left'>
                            <div className='infor_user'>
                                <p className='title'>Thông tin bệnh nhân</p>
                                {datauser && (

                                    <>
                                        <p className='inf'><i class="fa-solid fa-user"></i>{datauser.name}</p>
                                        <p className='inf'><i class="fa-solid fa-phone"></i>{datauser.phone}</p>
                                        <p className='inf'><i class="fa-solid fa-address-book"></i>{datauser.street},{datauser.ward},{datauser.district},{datauser.province}</p>
                                    </>


                                )}
                            </div>
                            <div className='infor_hospital'>
                                <p className='title'>Thông tin cơ sở y tế</p>
                                {this.state.data.map((index) => (
                                    <>
                                        <p className='inf'><i class="fa-regular fa-hospital"></i>{index.name_hospital}</p>
                                        <p className='inf'><i class="fa-solid fa-location-dot"></i>{index.address}</p>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className='right'>
                            <p className='title'>Chọn Phương thức thanh toán</p>
                            <div className='right_content'>
                                <div className='choice_pay'>
                                    <div><input type='radio' id='pay_account' name='choicepay' onChange={this.disabledPayment} /><p>Tài khoản Medpro: <span>Số dư: {typeof (balance) === 'number' ? balance.toLocaleString() : balance} VNĐ</span></p></div>

                                    <div><input type='radio' id='pay_card' name='choicepay' onChange={this.disabledPayment} /> <p>Tài khoản Ngân Hàng</p></div>
                                </div>
                                <div className='bill_pay'>
                                    <p className='title_bill'>Thông tin thanh toán</p>

                                    <div className='bill'>
                                        <p>Dịch vụ:<span>

                                            {this.state.type}
                                        </span></p>


                                        <p>
                                            Giá:
                                            <span className='gia'>
                                                {this.state.data.map((index) => (
                                                    <span key={index.id}>
                                                        {this.props.match.params.type === 'kham-benh-ngoai-gio'
                                                            ? index.fee_after.toLocaleString()
                                                            : index.fee.toLocaleString()}
                                                    </span>
                                                ))}
                                                VNĐ
                                            </span>
                                        </p>

                                        <p>Phí VAT: <span>1.000 VNĐ</span> </p>
                                        <p>Tổng Cộng: <span>{total.toLocaleString()} VND</span> </p>
                                    </div>
                                    <div className='choice_pay'>
                                        <p>Tài khoản Medcare: <span>{typeof (balance) === 'number' ? balance.toLocaleString() : balance} VNĐ</span></p>
                                    </div>
                                    <div className='btn_pay_box'>
                                        <button className='btn_pay'
                                            id='pay'
                                            onClick={this.payment}
                                        >Thanh toán</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default withRouter(FormData)
