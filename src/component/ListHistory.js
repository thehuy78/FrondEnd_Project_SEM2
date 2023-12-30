import React, { Component } from 'react'
import '../style/ListHistory.scss'
import '../style/Main.scss'
import axios from 'axios';
import BookingDetail from './BookingDetail';
import Error from '../component/Error'

import LoadingChild from './LoadingChild';


export default class ListHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tests: [],
            vaccination: [],
            pack: [],
            props_history: 1,
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
            let res = await axios.post('http://127.0.0.1:8000/api/booking/history', { user })

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
                props_history: this.props.index
            })

        }, 300);


    }


    componentDidUpdate(prevProps) {
        if (this.props.index !== prevProps.index) {
            this.setState({
                props_history: this.props.index
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
                        <BookingDetail type="history" hide={showbill} id_booking={selectedBill.id_booking} onClose={this.closeBookingDetail} />
                    </div>
                )}
                <section className='list_history'>
                    <LoadingChild hide=

                        {this.state.loading}
                    />
                    <div className={this.state.props_history === 1 ? "box" : "hide"}>
                        {this.state.data.length > 0 ? (
                            this.state.data.map((item) => (
                                <div className='list_history_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_history_item'>
                                        <p className='name_hospital_history'>{item.name_hospital}</p>
                                        <div className='location_history'>
                                            <p className='icon'><i class="fa-solid fa-stethoscope"></i></p>
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
                                                <p>Khoa: {item.name_department}</p>
                                                <p>Khu vực: {item.zone} - {item.floor}</p>
                                                <p>Phòng Khám: {item.room}</p>
                                            </div>
                                        </div>
                                        <div className='time_history'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>

                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Đã Khám</p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <Error index={7} />
                        )}

                    </div>

                    <div className={this.state.props_history === 2 ? "box" : "hide"}>


                        {this.state.tests.length > 0 ? (
                            this.state.tests.map((item) => (
                                <div className='list_history_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_history_item'>
                                        <p className='name_hospital_history'>{item.name_hospital}</p>
                                        <div className='location_history'>
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
                                                <p>Giá: {item.fee.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className='time_history'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>

                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Đã Khám</p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <Error index={7} />
                        )}

                    </div>
                    <div className={this.state.props_history === 3 ? "box" : "hide"}>
                        {this.state.vaccination.length > 0 ? (
                            this.state.vaccination.map((item) => (
                                <div className='list_history_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_history_item'>
                                        <p className='name_hospital_history'>{item.name_hospital}</p>
                                        <div className='location_history'>
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
                                                <p>Giá: {item.fee.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className='time_history'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>

                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Đã Khám</p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <Error index={7} />
                        )}

                    </div>
                    <div className={this.state.props_history === 4 ? "box" : "hide"}>
                        {this.state.pack.length > 0 ? (
                            this.state.pack.map((item) => (
                                <div className='list_history_item_box' key={item.id_booking} onClick={() => this.showBillDetails(item)}>
                                    <div className='list_history_item'>
                                        <p className='name_hospital_history'>{item.name_hospital}</p>
                                        <div className='location_history'>
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
                                                        case "goi-kham":
                                                            return "Gói dịch vụ";
                                                        default:
                                                            break;
                                                    }
                                                })()
                                                }</p>
                                                <p>Gói: {item.pack_name}</p>
                                                <p>Giá: {item.fee.toLocaleString()}</p>

                                            </div>
                                        </div>
                                        <div className='time_history'>
                                            <p className='icon'>  <i class="fa-regular fa-calendar-days"></i></p>
                                            <div>
                                                <p>Thời gian khám</p>
                                                <p>Ngày: {item.date_booking}</p>
                                                <p>Giờ dự kiến: {item.time_booking}</p>
                                            </div>
                                        </div>
                                        <p className='status'>Trạng Thái: Đã Khám</p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <Error index={7} />
                        )}

                    </div>




                </section>
            </>
        )
    }
}
