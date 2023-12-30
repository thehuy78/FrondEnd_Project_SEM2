import axios from 'axios';
import React, { Component } from 'react'
import BookingDetail from './BookingDetail';
import Error from '../component/Error'

import LoadingChild from './LoadingChild';

export default class ListBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tests: [],
            vaccination: [],
            pack: [],
            index: 1,
            showbill: false,
            selectedBill: null,
            loading: true
        }
    }

    async componentDidMount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            const user = localStorage.getItem('email');
            let res = await axios.post('http://127.0.0.1:8000/api/booking/listbill', { user })
            console.log(res)
            if (res && res.status === 200) {
                this.setState({
                    data: res.data && res.data.data && res.data.data.length > 0 ? res.data.data : {},
                    tests: res.data && res.data.tests && res.data.tests.length > 0 ? res.data.tests : {},
                    vaccination: res.data && res.data.vaccination && res.data.vaccination.length > 0 ? res.data.vaccination : {},
                    pack: res.data && res.data.pack && res.data.pack.length > 0 ? res.data.pack : {},
                    loading: false
                })
            }
            this.setState({
                index: this.props.index
            })

        }, 300);


    }

    componentDidUpdate(prevProps) {
        if (this.props.index !== prevProps.index) {
            this.setState({
                index: this.props.index
            })
        }

    }
    showBillDetails = (item) => {
        this.setState({
            showbill: true,
            selectedBill: item,
        });
    };
    closeBookingDetail = () => {
        this.setState({
            showbill: false,
            selectedBill: null,
        });
    };


    render() {
        const { showbill, selectedBill } = this.state;
        return (
            <>

                {showbill && selectedBill && (
                    <div>
                        <BookingDetail type="bill" hide={showbill} id_booking={selectedBill.id_booking} onClose={this.closeBookingDetail} />
                    </div>
                )}
                <section className='list_bill'>
                    <div className={this.state.index === 1 ? "box" : "hide"}>
                        <LoadingChild hide={this.state.loading} />
                        {this.state.data.length > 0 ? (
                            this.state.data.map((item) => (
                                <div className='list_bill_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_bill_item'>
                                        <p className='name_hospital_bill'>Thông Tin Hồ Sơ</p>
                                        <div className='infor_user_bill'>

                                            <p><i class="fa-solid fa-hospital-user"></i>Tên: {item.name_patient}</p>
                                            <p><i class="fa-solid fa-phone"></i>SĐT: {item.phone_booking}</p>
                                            <p><i class="fa-solid fa-location-dot"></i>ĐC: {item.province_user}</p>

                                        </div>
                                        <p className='name_hospital_bill'>{item.name_hospital}</p>
                                        <div className='location_bill'>
                                            <p className='icon'><i class="fa-solid fa-stethoscope"></i></p>
                                            <div>
                                                <p>{(() => {
                                                    switch (item.type_booking) {
                                                        case "kham-benh-theo-bac-si":
                                                        case "kham-benh":
                                                            return "Khám dịch vụ";
                                                        case "kham-benh-ngoai-gio":
                                                            return "Khám ngoài giờ";


                                                        case "xet-nghiem":
                                                            return "Xét nghiệm";

                                                        case "tiem-chung":
                                                            return "Tiêm chủng";
                                                        default:
                                                            break;
                                                    }
                                                })()
                                                }</p>
                                                <p>Khoa: {item.name_department}</p>
                                                <p>Khu vực: {item.zone} - {item.floor}</p>
                                                <p>Phòng Khám: {item.room}</p>
                                            </div>
                                        </div>
                                        <div className='time_bill'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>
                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Chưa Khám</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Error index={6} />
                        )}
                    </div>
                    <div className={this.state.index === 2 ? "box" : "hide"}>
                        {this.state.tests.length > 0 ? (
                            this.state.tests.map((item) => (
                                <div className='list_bill_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_bill_item'>
                                        <p className='name_hospital_bill'>Thông Tin Hồ Sơ</p>
                                        <div className='infor_user_bill'>

                                            <p><i class="fa-solid fa-hospital-user"></i>Tên: {item.name_patient}</p>
                                            <p><i class="fa-solid fa-phone"></i>SĐT: {item.phone_booking}</p>
                                            <p><i class="fa-solid fa-location-dot"></i>ĐC: {item.province_user}</p>

                                        </div>
                                        <p className='name_hospital_bill'>{item.name_hospital}</p>
                                        <div className='location_bill'>
                                            <p className='icon'><i class="fa-solid fa-vial"></i></p>
                                            <div>
                                                <p>{(() => {
                                                    switch (item.type_booking) {
                                                        case "kham-benh":
                                                            return "Khám dịch vụ";

                                                        case "xet-nghiem":
                                                            return "Xét nghiệm";

                                                        case "tiem-chung":
                                                            return "Tiêm chủng";
                                                        default:
                                                            break;
                                                    }
                                                })()
                                                }</p>
                                                <p>Loại: {item.name_tests}</p>
                                                <p>Khu vực: {item.zone_tests} - {item.floor_tests}</p>

                                            </div>
                                        </div>
                                        <div className='time_bill'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>

                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Chưa Khám</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Error index={6} />
                        )}
                    </div>
                    <div className={this.state.index === 3 ? "box" : "hide"}>
                        {this.state.vaccination.length > 0 ? (
                            this.state.vaccination.map((item) => (
                                <div className='list_bill_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_bill_item'>
                                        <p className='name_hospital_bill'>Thông Tin Hồ Sơ</p>
                                        <div className='infor_user_bill'>

                                            <p><i class="fa-solid fa-hospital-user"></i>Tên: {item.name_patient}</p>
                                            <p><i class="fa-solid fa-phone"></i>SĐT: {item.phone_booking}</p>
                                            <p><i class="fa-solid fa-location-dot"></i>ĐC: {item.province_user}</p>

                                        </div>
                                        <p className='name_hospital_bill'>{item.name_hospital}</p>
                                        <div className='location_bill'>
                                            <p className='icon'><i class="fa-solid fa-syringe"></i></p>
                                            <div>
                                                <p>{(() => {
                                                    switch (item.type_booking) {
                                                        case "kham-benh":
                                                            return "Khám dịch vụ";

                                                        case "xet-nghiem":
                                                            return "Xét nghiệm";

                                                        case "tiem-chung":
                                                            return "Tiêm chủng";
                                                        default:
                                                            break;
                                                    }
                                                })()
                                                }</p>
                                                <p>Loại: {item.name_vaccination}</p>
                                                <p>Khu vực: {item.zone_vaccination} - {item.floor_vaccination}</p>
                                            </div>
                                        </div>
                                        <div className='time_bill'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>
                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Chưa Khám</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Error index={6} />
                        )}
                    </div>
                    <div className={this.state.index === 4 ? "box" : "hide"}>
                        {this.state.pack.length > 0 ? (
                            this.state.pack.map((item) => (
                                <div className='list_bill_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_bill_item'>
                                        <p className='name_hospital_bill'>Thông Tin Hồ Sơ</p>
                                        <div className='infor_user_bill'>

                                            <p><i class="fa-solid fa-hospital-user"></i>Tên: {item.name_patient}</p>
                                            <p><i class="fa-solid fa-phone"></i>SĐT: {item.phone_booking}</p>
                                            <p><i class="fa-solid fa-location-dot"></i>ĐC: {item.province_user}</p>

                                        </div>
                                        <p className='name_hospital_bill'>{item.name_hospital}</p>
                                        <div className='location_bill'>
                                            <p className='icon'><i class="fa-solid fa-hand-holding-heart"></i></p>
                                            <div>
                                                <p>{(() => {
                                                    switch (item.type_booking) {
                                                        case "kham-benh":
                                                            return "Khám dịch vụ";

                                                        case "xet-nghiem":
                                                            return "Xét nghiệm";

                                                        case "tiem-chung":
                                                            return "Tiêm chủng";
                                                        case "goi-khám":
                                                            return "Gói Khám";
                                                        default:
                                                            break;
                                                    }
                                                })()
                                                }</p>
                                                <p>Gói: {item.pack_name}</p>
                                                <p>Giá: {item.fee.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className='time_bill'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>
                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Chưa Khám</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Error index={6} />
                        )}
                    </div>

                </section>
            </>
        )
    }
}
