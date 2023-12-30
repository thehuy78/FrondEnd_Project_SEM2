import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../../style/Schedule.scss'

import ReactCalendar from 'react-calendar'; // Rename the import
import 'react-calendar/dist/Calendar.css';
import "../../style/Calendar.scss"
import axios from 'axios';

import { format } from 'date-fns';



class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dated: [],
            data: [],
            timework: "Sáng, Chiều",
            choicetime: false,
            type: "",
            date_full: [],
            time_full: [],
            time_high: [],
            time_medium: [],
            date_high: [],
            date_medium: [],
            hospital_off: [],
            doctor_off: []

        }
    }
    back = () => {
        window.history.back();
    }
    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })


        if (this.props.match.params.type === "kham-benh-theo-bac-si") {
            if (this.timeoutkbs) {
                clearTimeout(this.timeoutkbs)
            }
            this.timeoutkbs = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/bs/${this.props.match.params.id}`)
                if (res && res.data && res.data.status === 200) {
                    console.log(res)
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Khám bệnh",
                        timework: res.data.data[0].time_work_doctor,
                        date_full: res && res.data && res.data.date ? res.data.date : [],
                        date_high: res && res.data && res.data.high ? res.data.high : [],
                        date_medium: res && res.data && res.data.medium ? res.data.medium : [],
                        hospital_off: res.data.dateoff ? res.data.dateoff : [],
                        doctor_off: res.data.bsoff ? res.data.bsoff : [],
                    })
                    var dated = res.data.data[0].day_work_doctor;
                    console.log(dated)
                    var arraydate = [];
                    if (dated.includes("T2")) {
                        arraydate.push(1)
                    }
                    if (dated.includes("T3")) {
                        arraydate.push(2)
                    }
                    if (dated.includes("T4")) {
                        arraydate.push(3)
                    }
                    if (dated.includes("T5")) {
                        arraydate.push(4)
                    }
                    if (dated.includes("T6")) {
                        arraydate.push(5)
                    }
                    if (dated.includes("T7")) {
                        arraydate.push(6)
                    }
                    if (dated.includes("CN")) {
                        arraydate.push(0)
                    }
                    console.log(arraydate)
                    this.setState({
                        dated: arraydate
                    })
                }
                if (res && res.data && res.data.status === 400) {
                    window.location.href = '/404';

                }
            }, 200);

        }
        if (this.props.match.params.type === "goi-kham") {
            if (this.timeoutpack) {
                clearTimeout(this.timeoutpack)
            }
            this.timeoutpack = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/package/${this.props.match.params.id}`)
                console.log(res)
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res.data.data && res.data.data ? res.data.data : [],
                        hospital_off: res.data.dateoff ? res.data.dateoff : [],
                        type: "Gói khám bệnh"
                    })
                    var datepack = res.data.data && res.data.data.length > 0 ? res.data.data[0].day_work : [];

                    var arraydatepack = [];
                    if (datepack.includes("T2")) {
                        arraydatepack.push(1)
                    }
                    if (datepack.includes("T3")) {
                        arraydatepack.push(2)
                    }
                    if (datepack.includes("T4")) {
                        arraydatepack.push(3)
                    }
                    if (datepack.includes("T5")) {
                        arraydatepack.push(4)
                    }
                    if (datepack.includes("T6")) {
                        arraydatepack.push(5)
                    }
                    if (datepack.includes("T7")) {
                        arraydatepack.push(6)
                    }
                    if (datepack.includes("CN")) {
                        arraydatepack.push(0)
                    }
                    console.log(arraydatepack)
                    this.setState({
                        dated: arraydatepack
                    })
                }
                else {
                    window.location.href = '/404'
                    arraydatepack = []
                    this.setState({
                        dated: arraydatepack
                    })
                }
            }, 200);



        }
        if (this.props.match.params.type === "xet-nghiem") {
            if (this.timeouttest) {
                clearTimeout(this.timeouttest)
            }
            this.timeouttest = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/tests/${this.props.match.params.id}`)
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res.data.data && res.data.data ? res.data.data : [],
                        type: "Gói khám bệnh",
                        hospital_off: res.data.dateoff ? res.data.dateoff : [],
                    })
                    var datetest = res.data.data && res.data.data.length > 0 ? res.data.data[0].day_work : [];

                    var arraydatetest = [];
                    if (datetest.includes("T2")) {
                        arraydatetest.push(1)
                    }
                    if (datetest.includes("T3")) {
                        arraydatetest.push(2)
                    }
                    if (datetest.includes("T4")) {
                        arraydatetest.push(3)
                    }
                    if (datetest.includes("T5")) {
                        arraydatetest.push(4)
                    }
                    if (datetest.includes("T6")) {
                        arraydatetest.push(5)
                    }
                    if (datetest.includes("T7")) {
                        arraydatetest.push(6)
                    }
                    if (datetest.includes("CN")) {
                        arraydatetest.push(0)
                    }
                    console.log(arraydatetest)
                    this.setState({
                        dated: arraydatetest
                    })
                }
                else {
                    window.location.href = '/404';
                    arraydatetest = []
                    this.setState({
                        dated: arraydatetest
                    })
                }
            }, 200);



        }
        if (this.props.match.params.type === "tiem-chung") {
            if (this.timeouttest) {
                clearTimeout(this.timeouttest)
            }
            this.timeouttest = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/vaccination/${this.props.match.params.id}`)
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res.data.data && res.data.data ? res.data.data : [],
                        hospital_off: res.data.dateoff ? res.data.dateoff : [],
                        type: "Gói khám bệnh"
                    })
                    var datevaccin = res.data.data && res.data.data.length > 0 ? res.data.data[0].day_work : [];

                    var arraydatevaccin = [];
                    if (datevaccin.includes("T2")) {
                        arraydatevaccin.push(1)
                    }
                    if (datevaccin.includes("T3")) {
                        arraydatevaccin.push(2)
                    }
                    if (datevaccin.includes("T4")) {
                        arraydatevaccin.push(3)
                    }
                    if (datevaccin.includes("T5")) {
                        arraydatevaccin.push(4)
                    }
                    if (datevaccin.includes("T6")) {
                        arraydatevaccin.push(5)
                    }
                    if (datevaccin.includes("T7")) {
                        arraydatevaccin.push(6)
                    }
                    if (datevaccin.includes("CN")) {
                        arraydatevaccin.push(0)
                    }
                    console.log(arraydatevaccin)
                    this.setState({
                        dated: arraydatevaccin
                    })
                }
                else {
                    window.location.href = '/404';
                    arraydatevaccin = []
                    this.setState({
                        dated: arraydatevaccin
                    })
                }
            }, 200);

        }
        if (this.props.match.params.type === 'kham-benh') {
            if (this.timeouttest) {
                clearTimeout(this.timeouttest)
            }
            this.timeouttest = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/custom/${this.props.match.params.id}`)
                console.log(res)
                if (res && res.data && res.data.status === 200) {
                    console.log(res)
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        hospital_off: res.data.dateoff ? res.data.dateoff : [],
                        type: "Khám bệnh",

                    })
                    var work_hospital = res.data.data && res.data.data.length > 0 ? res.data.data[0].day_work : [];
                    var schedule_hospital = []

                    if (work_hospital.includes("T2")) {
                        schedule_hospital.push(1)
                    }
                    if (work_hospital.includes("T3")) {
                        schedule_hospital.push(2)
                    }
                    if (work_hospital.includes("T4")) {
                        schedule_hospital.push(3)
                    }
                    if (work_hospital.includes("T5")) {
                        schedule_hospital.push(4)
                    }
                    if (work_hospital.includes("T6")) {
                        schedule_hospital.push(5)
                    }
                    if (work_hospital.includes("T7")) {
                        schedule_hospital.push(6)
                    }
                    if (work_hospital.includes("CN")) {
                        schedule_hospital.push(0)
                    }
                    console.log(schedule_hospital)
                    this.setState({
                        dated: schedule_hospital
                    })
                } if (res && res.data && res.data.status === 400) {
                    window.location.href = '/404'
                }
            }, 200);

        }

        if (this.props.match.params.type === "kham-benh-ngoai-gio") {
            if (this.timeouttest) {
                clearTimeout(this.timeouttest)
            }
            this.timeouttest = setTimeout(async () => {
                let res = await axios.get(`http://127.0.0.1:8000/api/formdata/bs/${this.props.match.params.id}`)
                if (res && res.data && res.data.status === 200) {
                    this.setState({
                        data: res && res.data && res.data.data ? res.data.data : {},
                        type: "Khám ngoài giờ",
                        timework: res.data.data[0].time_work_doctor,
                        hospital_off: res.data.dateoff ? res.data.dateoff : [],
                        doctor_off: res.data.bsoff ? res.data.bsoff : [],

                    })
                    var date = res.data.data[0].day_work_doctor;

                    var array = [];
                    if (date.includes("T2")) {
                        array.push(1)
                    }
                    if (date.includes("T3")) {
                        array.push(2)
                    }
                    if (date.includes("T4")) {
                        array.push(3)
                    }
                    if (date.includes("T5")) {
                        array.push(4)
                    }
                    if (date.includes("T6")) {
                        array.push(5)
                    }
                    if (date.includes("T7")) {
                        array.push(6)
                    }
                    if (date.includes("CN")) {
                        array.push(0)
                    }
                    console.log(array)
                    this.setState({
                        dated: array
                    })
                }
                console.log(res)
                if (res && res.data && res.data.status === 400) {
                    window.location.href = '/404';
                }
            }, 200);

        }


        this.disableNavigationButton();
    }

    disableNavigationButton() {
        const navigationButtons = document.querySelectorAll('.react-calendar__navigation button');
        if (navigationButtons.length >= 3) {
            navigationButtons[2].disabled = true;
        }
    }

    isDisabledDay = (date) => {
        let isDisabledBasedOnList = true;
        for (let i = 0; i < this.state.dated.length; i++) {
            if (date.getDay() === this.state.dated[i]) {
                isDisabledBasedOnList = false;
                break;
            }
        }
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        let isRed = false;
        for (let i = 0; i < this.state.date_full.length; i++) {
            var stringdate = this.state.date_full[i].date_booking.split("-");
            if (date.getDate() === parseInt(stringdate[2], 10) &&
                date.getMonth() === parseInt(stringdate[1], 10) - 1 &&
                date.getFullYear() === parseInt(stringdate[0], 10)) {
                isRed = true
                break;
            }

        }


        let hospital_off = false;
        for (let i = 0; i < this.state.hospital_off.length; i++) {
            var str = this.state.hospital_off[i].day_off.split("-");
            if (
                date.getDate() === parseInt(str[2], 10) &&
                date.getMonth() === parseInt(str[1], 10) - 1 && // Subtract 1 from the month
                date.getFullYear() === parseInt(str[0], 10)
            ) {
                hospital_off = true;
                break;
            }
        }

        let doctor_off = false;
        for (let i = 0; i < this.state.doctor_off.length; i++) {
            var day_off_doctor = this.state.doctor_off[i].day_off.split("-");
            if (
                date.getDate() === parseInt(day_off_doctor[2], 10) &&
                date.getMonth() === parseInt(day_off_doctor[1], 10) - 1 && // Subtract 1 from the month
                date.getFullYear() === parseInt(day_off_doctor[0], 10)
            ) {
                doctor_off = true;
                break;
            }
        }
        return isDisabledBasedOnList || date < currentDate || isRed || hospital_off || doctor_off;
    };




    handleDateChange = async (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        if (formattedDate !== "") {
            sessionStorage.setItem('scheduledate', formattedDate)
            this.setState({
                choicetime: true,

            })
        }
        const htmldate = document.getElementById('date_date');
        htmldate.innerHTML = format(date, 'dd/MM/yyyy');
        let res = await axios.get(`http://127.0.0.1:8000/api/formdata/bs/${this.props.match.params.id}/${formattedDate}`)
        console.log(res)
        if (res && res.data && res.data.status === 200) {
            let full = res.data.time && res.data.time.length > 0 ? res.data.time : []
            var time_full = [];
            for (let i = 0; i < full.length; i++) {
                time_full.push(full[i].time_booking)
            }
            let high = res.data.high && res.data.high.length > 0 ? res.data.high : []
            var time_high = [];
            for (let i = 0; i < high.length; i++) {
                time_high.push(high[i].time_booking)
            }
            let medium = res.data.medium && res.data.medium.length > 0 ? res.data.medium : []
            var time_medium = [];
            for (let i = 0; i < medium.length; i++) {
                time_medium.push(medium[i].time_booking)
            }
            this.setState({
                time_full: time_full,
                time_high: time_high,
                time_medium: time_medium
            })
        }
    };


    statusBookingDate = (date) => {
        let date_high = ""
        for (let i = 0; i < this.state.date_high.length; i++) {
            var stringdate = this.state.date_high[i].date_booking.split("-");
            if (date.getDate() === parseInt(stringdate[2], 10) &&
                date.getMonth() === parseInt(stringdate[1], 10) - 1 &&
                date.getFullYear() === parseInt(stringdate[0], 10)) {
                date_high = 'high_button';
                break;
            }
        }
        for (let i = 0; i < this.state.date_medium.length; i++) {
            var string = this.state.date_medium[i].date_booking.split("-");
            if (date.getDate() === parseInt(string[2], 10) &&
                date.getMonth() === parseInt(string[1], 10) - 1 &&
                date.getFullYear() === parseInt(string[0], 10)) {
                date_high = 'medium_button';
                break;
            }
        }
        return date_high
    }

    closetime = () => {
        this.setState({
            choicetime: false
        })
    }

    handleTimeChange = (value) => {
        console.log('hehe');
        sessionStorage.setItem('scheduletime', value)
        this.props.history.push(`/formdata/${this.props.match.params.type}/${this.props.match.params.id}`)
    }




    render() {

        const today = new Date();
        const twoMonthsLater = new Date(today);
        twoMonthsLater.setMonth(today.getMonth() + 1);
        const { data } = this.state
        console.log("dataa bs >>>" + data)
        return (
            <>
                <section className='sec1_schedule'>
                    <div className='sec1_schedule_container'>
                        <div className='back_link'><Link to='/' class='link'>Trang chủ</Link><i class="fa-solid fa-angle-up fa-rotate-90"></i><span>Trung tâm y tế HCM</span><i class="fa-solid fa-angle-up fa-rotate-90"></i><p>Chọn ngày khám</p></div>
                    </div>
                </section>
                <section className='sec2_schedule'>
                    <div className='sec2_schedule_container'>
                        <div className='left'>
                            <p className='title'>Thông tin cơ sở y tế</p>
                            {this.state.data.length > 0 && (this.state.data.map((data) => (
                                <div className='information'>
                                    <div className='info_hospital'>
                                        <i class="fa-regular fa-hospital"></i>
                                        <div>
                                            <p className='name_hospital'>{data.name_hospital}</p>
                                            <p className='address_hospital'>{data.address}</p>

                                        </div>
                                    </div>
                                    {data.name_department && (
                                        <div className='info_specialist'>
                                            <i class="fa-solid fa-stethoscope"></i>
                                            <p className='name_specialist'>Chuyên khoa: <span>{data.name_department}</span></p>
                                        </div>
                                    )}
                                    {data.name && (
                                        <div className='info_doctor'>
                                            <i class="fa-solid fa-user-doctor"></i>
                                            <p className='name_doctor'>{data.academic_degree}: <span>{data.name}</span></p>
                                        </div>
                                    )}
                                    {data.pack_name && (
                                        <div className='info_package'>
                                            <i class="fa-solid fa-hand-holding-heart"></i>
                                            <p className='name_package'>Gói: <span>{data.pack_name}</span></p>
                                        </div>
                                    )}

                                    {data.name_tests && (
                                        <div className='info_package'>
                                            <i class="fa-solid fa-hand-holding-heart"></i>
                                            <p className='name_package'>Loại XN: <span>{data.name_tests}</span></p>
                                        </div>
                                    )}


                                    {data.name_vaccination && (
                                        <div className='info_package'>
                                            <i class="fa-solid fa-hand-holding-heart"></i>
                                            <p className='name_package'>Loại Vaccine: <span>{data.name_vaccination}</span></p>
                                        </div>
                                    )}
                                    <div className='info_type'>
                                        <i class="fa-solid fa-book"></i>
                                        <p className='type'>Type: <span>{this.state.type}</span></p>
                                    </div>
                                    <div className='info_date'>
                                        <i class="fa-regular fa-calendar"></i>
                                        <p className='date'>Ngày khám: <span id='date_date'></span></p>
                                    </div>

                                </div>
                            )))}
                        </div>
                        <div className='right'>
                            <p className='title'>Vui lòng chọn ngày khám</p>
                            <div className={this.state.choicetime ? "hide" : "right_container"}>

                                <ReactCalendar
                                    minDate={today}
                                    tileDisabled={({ date }) => this.isDisabledDay(date)}

                                    maxDate={twoMonthsLater}
                                    onChange={this.handleDateChange} value={this.state.selectedDate}
                                    className="lich"
                                    tileClassName={({ date }) => this.statusBookingDate(date)}
                                />

                                <div className='status_container'>
                                    <p className='title_status'>Trạng thái đặt lịch</p>
                                    <div className='box_status'>
                                        <div>
                                            <p><span className='low'></span>Bình thường</p>
                                        </div>
                                        <div>
                                            <p><span className='medium'></span>Trung bình</p>
                                        </div>
                                        <div>
                                            <p><span className='high'></span>Đông</p>
                                        </div>
                                        <div>
                                            <p><span className='full'></span>Không thể đặt</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.choicetime ? "time_container" : "hide"}>
                                <p className='close' onClick={this.closetime}>Đóng</p>
                                <div className={this.state.timework.includes("Sáng") && this.props.match.params.type !== 'kham-benh-ngoai-gio' ? "box_time morning" : "hide"}>
                                    <p className='title_time'>Buổi sáng</p>
                                    <button
                                        disabled={this.state.time_full.includes("07:00 - 08:30") ? true : false}
                                        onClick={() => this.handleTimeChange("07:00 - 08:30")}
                                        className={
                                            this.state.time_high.includes("07:00 - 08:30") ? "red_button" :
                                                this.state.time_medium.includes("07:00 - 08:30") ? 'orange_button' :
                                                    ''
                                        }>07:00 - 08:30</button>
                                    <button
                                        disabled={this.state.time_full.includes("08:30 - 10:00") ? true : false}
                                        onClick={() => this.handleTimeChange("08:30 - 10:00")}
                                        className={
                                            this.state.time_high.includes("08:30 - 10:00") ? "red_button" :
                                                this.state.time_medium.includes("08:30 - 10:00") ? 'orange_button' :
                                                    ''
                                        }>08:30 - 10:00</button>
                                    <button
                                        disabled={this.state.time_full.includes("10:00 - 11:30") ? true : false}
                                        onClick={() => this.handleTimeChange("10:00 - 11:30")}
                                        className={
                                            this.state.time_high.includes("10:00 - 11:30") ? "red_button" :
                                                this.state.time_medium.includes("10:00 - 11:30") ? 'orange_button' :
                                                    ''
                                        }>10:00 - 11:30</button>
                                </div>
                                <div className={this.state.timework.includes("Chiều") && this.props.match.params.type !== 'kham-benh-ngoai-gio' ? "box_time" : "hide"}>
                                    <p className='title_time'>Buổi chiều</p>
                                    <button disabled={this.state.time_full.includes("13:00 - 14:30") ? true : false}
                                        onClick={() => this.handleTimeChange("13:00 - 14:30")}
                                        className={
                                            this.state.time_high.includes("13:00 - 14:30") ? "red_button" :
                                                this.state.time_medium.includes("13:00 - 14:30") ? 'orange_button' :
                                                    ''
                                        }>13:00 - 14:30</button>
                                    <button disabled={this.state.time_full.includes("14:30 - 16:00") ? true : false}
                                        onClick={() => this.handleTimeChange("14:30 - 16:00")}
                                        className={
                                            this.state.time_high.includes("14:30 - 16:00") ? "red_button" :
                                                this.state.time_medium.includes("14:30 - 16:00") ? 'orange_button' :
                                                    ''
                                        }>14:30 - 16:00</button>
                                    <button disabled={this.state.time_full.includes("16:00 - 17:30") ? true : false}
                                        onClick={() => this.handleTimeChange("16:00 - 17:30")}
                                        className={
                                            this.state.time_high.includes("16:00 - 17:30") ? "red_button" :
                                                this.state.time_medium.includes("16:00 - 17:30") ? 'orange_button' :
                                                    ''
                                        }>16:00 - 17:30</button>
                                </div>
                                <div className={this.state.timework.includes("Ngoài giờ") && this.props.match.params.type === 'kham-benh-ngoai-gio' ? "box_time" : "hide"}>
                                    <p className='title_time'>Ngoài giờ</p>
                                    <button
                                        onClick={() => this.handleTimeChange("18:00 - 19:30")}
                                    >18:00 - 19:30</button>
                                    <button
                                        onClick={() => this.handleTimeChange("19:30 - 21:00")}
                                    >19:30 - 21:00</button>

                                </div>


                                <p style={{ color: 'var(--orange' }}>Tất cả thời gian theo múi giờ Việt Nam GMT +7</p>
                            </div>
                        </div>
                        <div className='bottom'> <div onClick={this.back} className='link'><i class="fa-solid fa-rotate-left"></i>Quay lại</div></div>
                    </div >
                </section >
            </>
        )
    }
}
export default withRouter(Schedule)