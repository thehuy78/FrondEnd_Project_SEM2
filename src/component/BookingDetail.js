import React, { Component } from 'react'
import '../style/BookingDetail.scss'
import axios from 'axios';
import QRCode from "react-qr-code";

export default class BookingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.hide,
            data: [],
            result: this.props.id_booking,
        }
    }
    async componentDidMount() {
        if (!this.props.id_booking) {
            window.location.href = '/404'
        }
        setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/booking/detail/${this.props.id_booking}`)
            console.log(res)
            this.setState({
                data: res && res.data && res.data.data ? res.data.data : {}
            })
        }, 200);

    }

    handleClickHide = () => {
        this.setState({
            show: false
        }, () => {

            this.props.onClose();
        });
    }
    cancel = async (idbooking) => {
        if (window.confirm("Lịch hủy sẽ không tể hoàn tác, bạn chắc chứ?")) {
            let res = await axios.get(`http://127.0.0.1:8000/api/booking/cancel/${idbooking}`)
            if (res && res.data && res.data.status === 200) {
                window.location.reload();
            }
        }
    }

    render() {
        return (
            <>
                {this.state.data.length > 0 && (
                    this.state.data.map((index) => (
                        <section className={this.state.show ? "sec1_booking_detail" : "hide"}>
                            <div className='background' onClick={this.handleClickHide}></div>
                            <div className='sec1_booking_detail_container'>
                                <div className='info_hos'>
                                    <p className='name_hospital'>{index.name_hospital}</p>
                                    <p className='address_hospital'>{index.address}</p>
                                    <p className='title'>{(() => {
                                        switch (index.type_booking) {
                                            case "kham-benh":
                                            case "kham-benh-theo-bac-si":
                                            case "kham-benh-ngoai-gio":
                                                return "PHIẾU KHÁM BÊNH";
                                            case "xet-nghiem":
                                                return "PHIẾU XÉT NGHIỆM";
                                            case "tiem-chung":
                                                return "PHIẾU TIÊM CHỦNG";
                                            case "goi-kham":
                                                return "GÓI KHÁM BỆNH";
                                            default:
                                                break;
                                        }
                                    })()}</p>
                                    <p className='code'>(Mã Phiếu: {index.id_booking})</p>
                                    <p className='floor'>{(() => {
                                        switch (index.type_booking) {
                                            case "kham-benh":
                                            case "kham-benh-theo-bac-si":
                                            case "kham-benh-ngoai-gio":
                                                return "Tầng " + index.floor + " -  Khu: " + index.zone;
                                            case "xet-nghiem":
                                                return "Tầng " + index.floor_tests + " -  Khu: " + index.zone_tests;
                                            case "tiem-chung":
                                                return "Tầng " + index.floor_vaccination + " -  Khu: " + index.zone_vaccination;
                                            case "goi-kham":
                                                break;
                                            default:
                                                break;
                                        }
                                    })()}</p>

                                    <p className='room'>{index.room ? "Phòng: " + index.room : ""}</p>
                                    <p className='department'>
                                        {(() => {
                                            switch (index.type_booking) {
                                                case "kham-benh":
                                                case "kham-benh-theo-bac-si":
                                                case "kham-benh-ngoai-gio":
                                                    return "Chuyên khoa: " + index.name_department;
                                                case "xet-nghiem":
                                                    return index.name_tests;
                                                case "tiem-chung":
                                                    return index.name_vaccination;
                                                case "goi-kham":
                                                    return index.pack_name;
                                                default:
                                                    break;
                                            }
                                        })()}</p>
                                    <p className='num_booking'>
                                        <p className='num_booking'>
                                            <QRCode
                                                style={{ marginTop: "1rem", height: "auto", maxWidth: "30%", width: "30%" }}
                                                value={index.id_booking + ""}
                                            />
                                        </p>
                                    </p>
                                </div>
                                <div className='info_patient'>
                                    <p>Ngày khám: <span>{index.date_booking}</span></p>
                                    <p>Giờ khám dự kiến: <span>{index.time_booking}</span></p>
                                    <p>Họ Tên: <span>{index.name_patient}</span></p>
                                    <p>Giới tính: <span>{index.gender}</span></p>
                                    <p>Ngày sinh: <span>{index.dob}</span></p>
                                    <p>Tỉnh/TP: <span>{index.province}</span></p>
                                    <p>Số điện thoại: <span>{index.phone_booking}</span></p>
                                    <p>Giá:<span>{index.fee.toLocaleString()} VNĐ</span></p>
                                </div>
                                <p className={this.props.type === 'history' ? "hide" : "note"}>Vui lòng đến vị trí khám trước giờ hẹn 15-30 phút để khám bệnh</p>
                                <div className={this.props.type === 'history' ? "hide" : "box_btn"}>
                                    <button className='print'>In phiếu</button>
                                    {/* <button className='delete' onClick={() => this.cancel(index.id_booking)}>Hủy lịch</button> */}
                                </div>
                                <button
                                    style={{ border: "none", marginTop: "1rem", outline: "none", width: "100%", padding: '1rem 0', backgroundColor: "green", color: "white", fontWeight: "700", fontSize: "1.2rem" }}
                                    className={this.props.type === 'history' ? "" : "hide"}>ĐÃ KHÁM</button>
                            </div>
                        </section>
                    ))
                )}
            </>
        )
    }
}
