import React, { Component } from 'react'
import '../style/Aboutus.scss'
import Slider from "react-slick";
import Loadding from '../component/Loadding';
import emailjs from 'emailjs-com';
import Noti from '../component/Noti';
export default class Aboutus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            noti:false
        }
        this.form = React.createRef();
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000);
    }




    sendEmail = (e) => {
        e.preventDefault();
       
       
        emailjs.sendForm('service_5l4i0be', 'template_g4nb4up', this.form.current, 'PPB36x1bm1gtVZqjk')
            .then((result) => {
               
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
                this.setState({
                    noti:true
                })
                setTimeout(() => {
                    this.setState({
                        noti:false
                    }) 
                }, 2000);
                this.form.current.reset();

            }, (error) => {
                console.log(error.text);
            });

    };
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 6,
            slidesToScroll: 1,

            autoplay: true,
            autoplaySpeed: 1000,
            easing: 'linner',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,

                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                    }
                }
            ]
        };
        return (
            <>
                <Loadding hide={this.state.loading} />
                <Noti hide={this.state.noti} />
                <section className='sec1_aboutus'>
                    <div className='sec1_aboutus_container'>
                        <div className='box_img_sec1_aboutus'>
                            <img src={require('../assets/image/logo/application.png')} alt='' />
                        </div>
                        <div className='box_content_sec1_aboutus'>
                            <p>Chào mừng bạn đến với</p>
                            <p>CÔNG TY CỔ PHẦN ỨNG DỤNG PKH</p>
                        </div>
                    </div>
                </section>
                <section className='sec2_aboutus'>
                    <div className='sec2_aboutus_container'>
                        <div className='sec2_aboutus_box1'>
                            <p>Giới thiệu về PKH</p>
                            <p>Ứng dụng này giúp người bệnh và thân nhân người bệnh có thể thực hiện trực tuyến quá trình đăng ký khám bệnh tại bệnh viện ở mọi lúc mọi nơi mà không cần phải đến trực tiếp bệnh viện</p>
                        </div>
                        <div className='sec2_aboutus_box2'>
                            <div className='topic'>
                                <p className='topic_number'>1</p>
                                <div>
                                    <p>Đăng ký và chọn ngày</p>
                                    <p>giờ khám bệnh</p>
                                </div>
                            </div>
                            <div className='topic'>
                                <p className='topic_number'>2</p>
                                <div>
                                    <p>Thanh toán chi phí</p>
                                    <p>không dùng tiền mặt</p>
                                </div>
                            </div>
                            <div className='topic'>
                                <p className='topic_number'>3</p>
                                <div>
                                    <p>Quản lý cuộc hẹn</p>
                                    <p>khám bệnh và tái khám</p>
                                </div>
                            </div>
                            <div className='topic'>
                                <p className='topic_number'>4</p>
                                <div>
                                    <p>Quản lý thông tin</p>
                                    <p>dữ liệu của người bệnh</p>
                                </div>
                            </div>
                        </div>
                        <div className='sec2_aboutus_box3'>
                            <img src={require('../assets/image/contact/im1.png')} alt='' />
                        </div>
                    </div>
                </section>
                <section className='sec3_aboutus'>
                    <div className='sec3_aboutus_container'>
                        <img src={require('../assets/image/contact/im2.png')} alt='' />
                        <div className='sec3_aboutus_box'>
                            <div>
                                <p>Tầm Nhìn</p>
                                <p>PKH trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam và khu vực Đông Nam Á giúp kết nối các dịch vụ y tế đến rộng rãi người dân, mang lại hiệu quả đột phá cho đơn vị y tế, cũng như những trải nghiệm tiện nghi, hài lòng cho bệnh nhân trong khám chữa bệnh và chăm sóc sức khỏe cá nhân.</p>
                            </div>
                            <div>
                                <p>Sứ mệnh</p>
                                <p>PKH cung cấp nền tảng Medpro - giải pháp tiếp cận y tế thông minh mang đến cho người dùng những phương thức chăm sóc sức khỏe mới, ở bất cứ không gian - thời gian nào thông qua nền tảng trực tuyến tương tác cao, kết nối với các cơ sở y tế hàng đầu cùng đội ngũ chuyên gia y tế đông đảo, tận tình, giàu kinh nghiệm.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='sec4_aboutus'>
                    <div className='sec4_aboutus_container'>
                        <img className='sec4_aboutus_img1' src={require('../assets/image/contact/im2.png')} alt='' />
                        <p className='title'>Triết lý sản phẩm - dịch vụ</p>
                        <p className='discriber'>Với triết lý lấy người dùng làm trung tâm, giải pháp MedPro được thiết kế mang trải nghiệm tốt nhất cho người dùng thông qua việc sử dụng các tài nguyên và đặc điểm của nhiều công nghệ số</p>
                        <div className='sec4_aboutus_box'>
                            <img src={require('../assets/image/logo/application_c.png')} alt='' />
                            <div className='box_topic'>
                                <div className='topic'>
                                    <div className='topic_container'>
                                        <p className='topic_number'>1</p>
                                        <div>
                                            <p>Vì sức khỏe cộng đồng</p>
                                            <p>Mục đích chăm sóc sức khỏe là mang lại cho mỗi người lối sống lành mạnh, sức khỏe tốt</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='topic'>
                                    <div className='topic_container'>
                                        <p className='topic_number'>2</p>
                                        <div>
                                            <p>Rộng mở</p>
                                            <p>Mọi người đều có quyền bình đẳng về tiếp cận dịch vụ chăm sóc sức khoẻ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='topic'>
                                    <div className='topic_container'>
                                        <p className='topic_number'>3</p>
                                        <div>
                                            <p>Thực tiễn</p>
                                            <p>Người dùng được tiếp cận với các dịch vụ chăm sóc sức khoẻ phù hợp</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='topic'>
                                    <div className='topic_container'>
                                        <p className='topic_number'>4</p>
                                        <div>
                                            <p>Hợp tác</p>
                                            <p>Trong tiến trình chuyển đổi số hiện nay các CSYT cần hợp tác, mở rộng dịch vụ tiện ích phục vụ người dùng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='box_topic_mobile'>
                            <div className='topic_mobile'>

                                <p className='topic_number_mobile'>1</p>
                                <div>
                                    <p>Vì sức khỏe cộng đồng</p>
                                    <p>Mục đích chăm sóc sức khỏe là mang lại cho mỗi người lối sống lành mạnh, sức khỏe tốt</p>
                                </div>

                            </div>
                            <div className='topic_mobile'>

                                <p className='topic_number_mobile'>2</p>
                                <div>
                                    <p>Rộng mở</p>
                                    <p>Mọi người đều có quyền bình đẳng về tiếp cận dịch vụ chăm sóc sức khoẻ</p>
                                </div>

                            </div>
                            <div className='topic_mobile'>

                                <p className='topic_number_mobile'>3</p>
                                <div>
                                    <p>Thực tiễn</p>
                                    <p>Người dùng được tiếp cận với các dịch vụ chăm sóc sức khoẻ phù hợp</p>
                                </div>

                            </div>
                            <div className='topic_mobile'>

                                <p className='topic_number_mobile'>4</p>
                                <div>
                                    <p>Hợp tác</p>
                                    <p>Trong tiến trình chuyển đổi số hiện nay các CSYT cần hợp tác, mở rộng dịch vụ tiện ích phục vụ người dùng</p>

                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section className='sec5_aboutus'>
                    <div className='sec5_aboutus_container'>
                        <p>Các bệnh viện tiêu biểu</p>
                        <Slider {...settings} className='slider_aboutus'>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv2.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv4.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv5.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv6.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv7.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv8.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv9.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv10.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv11.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv12.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv13.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv14.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv15.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv16.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv17.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv18.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv19.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/hopital/logo/bv3.png')} alt='' />
                                <img src={require('../assets/image/hopital/logo/bv20.png')} alt='' />
                            </div>

                        </Slider>
                    </div>
                </section>


                <section className='sec4_basis'>
                    <div className='sec4_basis_container'>
                        <form ref={this.form} onSubmit={this.sendEmail}>
                            <p>Liên hệ hợp tác</p>
                            <input type='text' placeholder='Tên đơn vị/ Người liên hệ' required name="user_name" />
                            <input type='text' placeholder='Email' required name="user_email" />
                            <input type='number' placeholder='Số điện thoại' required name="user_phone" />
                            <textarea placeholder='Message' required name="message" />
                            <input type='submit' value='Gửi' />

                        </form>
                    </div>
                </section>
            </>
        )
    }
}
