import React, { Component } from 'react'
import '../style/Footer.scss'

export default class Footer extends Component {
    render() {
        return (
            <>
                <div className='footer'>

                    <div className='footer_container'>
                        <div className='footer_left'>
                            <div className='footer_logo_box'>
                                <img src={require('../assets/image/logo/logotext.png')} alt='' />
                            </div>
                            <p><span className='title_footer'>Địa chỉ:</span>590 Cách Mạng Tháng 8, Phường 11, Quận 3, Tp. Hồ Chí Minh.</p>
                            <p><span className='title_footer'>Website:</span>https://medcarefpt.vn</p>
                            <p><span className='title_footer'>Email:</span>T2302E1@medcare.vn</p>
                            <p><span className='title_footer'>Điện thoại:</span>(012) 345 6789</p>
                        </div>
                        <div className='footer_right'>
                            <div>
                                <p className='title_footer'>Dịch vụ Y tế</p>
                                <p>Đặt khám tại cơ sở</p>
                                <p>Đặt khám theo bác sĩ</p>
                                <p>Tư vấn khám bệnh từ xa</p>
                                <p>Đặt lịch xét nghiệm</p>
                                <p>Đặt lịch tiêm chủng</p>
                                <p>Y tế tại nhà</p>
                                <p>Khám bệnh ngoài giờ</p>
                            </div>
                            <div>
                                <p className='title_footer'>Cơ sở y tế</p>
                                <p>Bệnh viện công</p>
                                <p>Bệnh viện tư</p>
                                <p>Phòng khám</p>
                                <p>Phòng mạch</p>
                            </div>
                            <div>
                                <p className='title_footer'>Hướng dẫn</p>
                                <p>Cài đặt ứng dụng</p>
                                <p>Khám bệnh từ xa</p>
                                <p>Quy trình hoàn phí</p>
                                <p>Câu hỏi thường gặp</p>

                            </div>
                            <div>
                                <p className='title_footer'>Tin tức</p>
                                <p>Tin dịch vụ</p>
                                <p>Tin Y Tế</p>
                                <p>Y Học thường thức</p>

                            </div>
                            <div>
                                <p className='title_footer'>Về chúng tôi</p>
                                <p>Giới thiệu</p>
                                <p>Điều khoản dịch vụ</p>
                                <p>Chính sách bảo mật</p>
                                <p>Quy định sử dụng</p>
                            </div>
                            <div>
                                <div className='box_image_footer'>
                                    <img src={require('../assets/image/footer/footer1.png')} alt='' />
                                </div>
                                <div className='box_image_footer'>
                                    <img src={require('../assets/image/footer/footer2.png')} alt='' />
                                </div>
                            </div>



                        </div>
                        <div className='footer_mobile'>
                            <p>Điều khoản dịch vụ</p>
                            <p>Chính sách bảo mật</p>
                            <p>Quy định sử dụng</p>
                        </div>
                    </div>

                </div>
                <div className='footer_coppyright'>
                    <p>© 2023 - Bản quyền thuộc Medcare FPT Aptech TP.HCM</p><div><img src={require('../assets/image/footer/coppyright.png')} alt='' /></div>
                </div>
            </>
        )
    }
}
