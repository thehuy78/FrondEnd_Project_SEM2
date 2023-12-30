import React, { Component } from 'react'
import '../style/Home.scss'
import Slider from "react-slick";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Baner from '../component/Baner';
import ReactQuill from 'react-quill';
import Loadding from '../component/Loadding'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            databv: [],
            datakhoa: [],
            datadoctor: [],
            news: [],
            loading: true

        }
    }
    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        this.setState({
            databv: [],
            datakhoa: [],
            datadoctor: [],

        })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/home/get`)
            this.setState({
                data: res.data.data,
                loading: false
            })
        }, 500);

        setTimeout(async () => {
            let news = await axios.get(`http://127.0.0.1:8000/api/news/getall/tin-dich-vu`)

            if (news && news.data && news.data.status === 200) {
                this.setState({
                    news: news.data.data ? news.data.data : []
                })
            }
        }, 2000);

        this.placeholderAnimation();

    }
    search = async () => {
        const search = document.getElementById('search_home').value
        const select = document.getElementById('select').value
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            if (search.trim() !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/home/search/${select}/${search}`)
                this.setState({
                    databv: res?.data?.databv && res.data.databv.length > 0 ? res.data.databv : [],
                    datakhoa: res?.data?.datakhoa && res.data.datakhoa.length > 0 ? res.data.datakhoa : [],
                    datadoctor: res?.data?.datadoctor && res.data.datadoctor.length > 0 ? res.data.datadoctor : []
                })
            }
            if (search.trim() === "") {
                this.setState({
                    databv: [],
                    datakhoa: [],
                    datadoctor: [],

                })
            }
        }, 200);


    }



    handelClickBs = (item) => {

        this.props.history.push(`/schedule/kham-benh-theo-bac-si/${item.id_doctor}`)
    }
    handelClickKhoa = (item) => {

        this.props.history.push(`/option/${item.id_department}`)
    }
    handelClickBv = (item) => {

        this.props.history.push(`/formality/${item.id_hospital}`)
    }

    placeholderAnimation = () => {
        const txt = 'Tìm kiếm cơ sở y tế ...';
        let i = 0;
        let increasing = true;
        this.intervalId = setInterval(() => {
            const searchInput = document.getElementById('search_home');
            if (searchInput) {
                let placeholder;
                if (increasing) {
                    placeholder = txt.substring(0, i + 1).padEnd(txt.length, '\u2002');
                    i = (i + 1) % txt.length;
                } else {
                    placeholder = txt.substring(0, i).padEnd(txt.length, '\u2002');
                    i = (i - 1 + txt.length) % txt.length;
                }
                searchInput.setAttribute("placeholder", placeholder);

                if (i === 0) {
                    increasing = true;
                } else if (i === txt.length - 1) {
                    increasing = false;
                }
            }
        }, 200);

    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    clickNews = (id) => {
        this.props.history.push(`/newsdetail/${id}`)
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 3000,
            cssEase: "linear",
            slidesToShow: 6,
            slidesToScroll: 1,
            initialSlide: 0,
            vertical: false,
            responsive: [
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        var settings1 = {
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 3000,
            cssEase: "linear",
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        centerMode: true,
                        centerPadding: '40px'

                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '40px',
                        infinite: true
                    }
                },

            ]
        };
        var settings2 = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 3000,
            cssEase: "linear",
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,


                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,


                        infinite: true
                    }
                },

            ]
        };
        const databv = this.state.databv;
        const datakhoa = this.state.datakhoa;
        const datadoctor = this.state.datadoctor;
        let isdatabv = databv.length === 0;
        let isdatakhoa = datakhoa.length === 0;
        let isdatadoctor = datadoctor.length === 0;
        return (
            <>
                <Loadding hide={this.state.loading} />
                <Baner />
                <section className='sec1_home'>
                    <div className='home_background'>
                        <div className='home_background-content'>
                            <p className='title_1'>Nền tảng công nghệ</p>
                            <p className='title_2'>Kết nối người dân với Cơ sở - Dịch vụ Y tế</p>
                            <div className='box_search_home'>
                                <div className='box'>
                                    <input type='text' placeholder='Tìm kiếm cơ sở y tế' id='search_home'
                                        onChange={this.search}
                                    />
                                    <select id='select' onChange={this.search}>
                                        <option value={"hospital"}>Bệnh Viện</option>
                                        <option value={"department"}>Khoa Khám Bệnh</option>
                                        <option value={"doctor"}>Bác sĩ</option>
                                    </select>
                                </div>

                                <div className='result_search' id='result_search' >
                                    {isdatabv ? ("") : (
                                        <div className='result_hospital'>
                                            <p className='title_result'>Bệnh viện</p>
                                            {this.state.databv.map((item) => (
                                                <>
                                                    <div className='item' key={item.id_hospital} onClick={() => { this.handelClickBv(item) }}>
                                                        {item.logo_hospital ? (
                                                            <img src={require(`../assets/image/hopital/logo/${item.logo_hospital}`)} alt='' />
                                                        )
                                                            : (
                                                                <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                                                            )}
                                                        <div>
                                                            <p className='namebv'>{item.name_hospital}</p>
                                                            <p className='address'>{item.address}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                    {isdatakhoa ? ("") : (
                                        <div className='result_specialist'>
                                            <p className='title_result'>Chuyên khoa</p>
                                            {this.state.datakhoa.map((item) => (
                                                <>
                                                    <div className='item' key={item.id_department} onClick={() => this.handelClickKhoa(item)}>
                                                        {item.logo_hospital ? (
                                                            <img src={require(`../assets/image/hopital/logo/${item.logo_hospital}`)} alt='' />
                                                        )
                                                            : (
                                                                <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                                                            )}
                                                        <div>
                                                            <p className='namebv'>{item.name_department}</p>
                                                            <p className='address'>{item.name_hospital}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                    {isdatadoctor ? ("") : (
                                        <div className='result_doctor'>
                                            <p className='title_result'>Các bác sĩ</p>
                                            {this.state.datadoctor.map((item) => (
                                                <>
                                                    <div className='item' key={item.id_doctor} onClick={() => { this.handelClickBs(item) }}>
                                                        {item.logo_hospital ? (
                                                            <img src={require(`../assets/image/hopital/logo/${item.logo_hospital}`)} alt='' />
                                                        )
                                                            : (
                                                                <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                                                            )}
                                                        <div>
                                                            <p className='namebv'>{item.academic_degree} {item.name}</p>
                                                            <p className='address'>{item.name_hospital}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className='title_3'>Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa</p>
                        </div>
                    </div >
                    <div className='slider_home'>
                        <Slider {...settings}>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/service/sv1'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image1.png')} alt=''></img>
                                        </div>
                                        <p>Đặt khám tại cơ sở</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/service/sv7'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image3.png')} alt=''></img>
                                        </div>
                                        <p>Khám  bệnh ngoài giờ</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/service/sv6'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image4.png')} alt=''></img>
                                        </div>
                                        <p>Y tế tại nhà</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/service/sv4'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image5.png')} alt=''></img>
                                        </div>
                                        <p>Đặt lịch xét nghiệm</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/service/sv2'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image2.png')} alt=''></img>
                                        </div>
                                        <p>Đặt khám theo bác sĩ</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/package'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image6.png')} alt=''></img>
                                        </div>
                                        <p>Gói khám sức khỏe</p>
                                    </div>
                                </Link>
                            </div>
                            <div className='slider_home_item'>
                                <Link className='slider_home_item' to='/service/sv3'>
                                    <div className='slider_item_box'>
                                        <div className='box_image'>
                                            <img src={require('../assets/image/home/image7.png')} alt=''></img>
                                        </div>
                                        <p>Tư vấn từ xa</p>
                                    </div>
                                </Link>
                            </div>
                        </Slider>
                    </div>

                </section >
                <section className='sec2_home'>
                    <div className='sec2_home_container'>
                        <div className='sec2_home_content'>
                            <div className='sec2_home_content-left'>
                                <p className='name_website'>MEDCARE</p>
                                <p>Đặt lịch khám bệnh</p>
                            </div>
                            <p className='sec2_home_content-right'>
                                <span>Medcare</span> cung cấp dịch vụ đặt khám nhanh, lấy số thứ tự trực tuyến và tư vấn sức khỏe từ xa tại các Cơ sở Y tế hàng đầu Việt Nam như Bệnh viện Đại học Y Dược TP.HCM, Bệnh viện Chợ Rẫy và Bệnh viện Nhi Đồng...
                            </p>
                        </div>
                        <div className='sec2_home_catalog'>
                            <Slider {...settings1} className='sec2_slider'>
                                <div className='catalog_item'>
                                    <div className='catalog_item_box_image'>
                                        <img src={require('../assets/image/home/img3.jpg')} alt='' />
                                    </div>
                                    <p className='title_catalog_item'>Đặt khám nhanh</p>
                                    <p className='discriber_catalog_item'>Đặt khám nhanh, thanh toán và lấy số thứ tự trực tuyến tiết kiệm thời gian công sức</p>
                                    <Link to='/service/sv1' className='link_navbar'><p className='link_catalog_item'>Xem thêm<i class="icon_catalog fa-solid fa-arrow-right"></i></p></Link>
                                </div>
                                <div className='catalog_item'>
                                    <div className='catalog_item_box_image'>
                                        <img src={require('../assets/image/home/img1.jpg')} alt='' />
                                    </div>
                                    <p className='title_catalog_item'>Cơ sở y tế rộng khắp</p>
                                    <p className='discriber_catalog_item'>Mạng lưới bệnh viện, phòng khám, phòng mạch phủ khắp toàn quốc</p>
                                    <Link to='/service/sv1' className='link_navbar'><p className='link_catalog_item'>Xem thêm<i class="icon_catalog fa-solid fa-arrow-right"></i></p></Link>
                                </div>
                                <div className='catalog_item'>
                                    <div className='catalog_item_box_image'>
                                        <img src={require('../assets/image/home/img2.jpg')} alt='' />
                                    </div>
                                    <p className='title_catalog_item'>Tư vấn sức khỏe từ xa</p>
                                    <p className='discriber_catalog_item'>Nhận tư vấn sức khỏe từ xa qua cuộc gọi Video với bác sĩ chuyên khoa</p>
                                    <Link to='/service/sv3' className='link_navbar'><p className='link_catalog_item'>Xem thêm<i class="icon_catalog fa-solid fa-arrow-right"></i></p></Link>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </section>
                <section className='sec3_home'>
                    <div className='sec3_home_container'>
                        <p className='title_sec3_home'>Số liệu thống kê</p>
                        <div className='sec3_home_catalog'>
                            <div className='sec3_home_catalog_item'>
                                <div>
                                    <i class="fa-solid fa-stethoscope"></i>
                                </div>
                                <p className='value_catalog_sec3_home'>2.2M+</p>
                                <p>Lượt khám</p>
                            </div>
                            <div className='sec3_home_catalog_item'>
                                <div>
                                    <i class="fa-solid fa-hospital"></i>
                                </div>
                                <p className='value_catalog_sec3_home'>10+</p>
                                <p>Bệnh viện</p>
                            </div>
                            <div className='sec3_home_catalog_item'>
                                <div>
                                    <i class="fa-solid fa-house-medical"></i>
                                </div>
                                <p className='value_catalog_sec3_home'>50+</p>
                                <p>Cơ sở y tế</p>
                            </div>
                            <div className='sec3_home_catalog_item'>
                                <div>
                                    <i class="fa-solid fa-user-doctor"></i>
                                </div>
                                <p className='value_catalog_sec3_home'>100+</p>
                                <p>Bác sĩ</p>
                            </div>
                            <div className='sec3_home_catalog_item'>
                                <div>
                                    <i class="fa-solid fa-location-arrow"></i>
                                </div>
                                <p className='value_catalog_sec3_home'>80.2K+</p>
                                <p>Lượt truy cập tháng</p>
                            </div>
                            <div className='sec3_home_catalog_item'>
                                <div>
                                    <i class="fa-solid fa-eye"></i>
                                </div>
                                <p className='value_catalog_sec3_home'>2.9K+</p>
                                <p>Lượt truy cập hằng ngày</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='sec9_home'>
                    <div className='sec9_home_container'>
                        <div className='box_slider'>
                            <p className='title'>Hệ thống bệnh viện triển khai</p>
                            <p className='discriber'>Đặt lịch khám với hơn 50 bệnh viện trên khắp cả nước</p>
                            <Slider {...settings2} className='sec9_slider'>
                                {this.state.data.map((item) => (
                                    <div className='box_catalog_item'>
                                        <div className='catalog_item'>
                                            <div className='catalog_item_box_image'>
                                                {item.logo_hospital ? (
                                                    <img src={require(`../assets/image/hopital/image/${item.image_hospital}`)} alt='' />
                                                )
                                                    : (
                                                        <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                                                    )}
                                            </div>
                                            <p className='title_catalog_item'>{item.name_hospital}</p>
                                            <p className='discriber_catalog_item'><i class="fa-solid fa-location-dot"></i>{item.district} - {item.province}</p>

                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </section>
                <section className='sec4_home'>
                    <div className='sec4_home_container'>
                        <div className='box_img_sec4_home'>
                            <img src={require('../assets/image/home/background2.png')} alt='' />
                        </div>
                        <div>
                            <p className='title_sec4_home'>Đặt khám nhanh - Lấy số thứ tự trực tuyến</p>
                            <p className='discriber_sec4_home'>Bệnh nhân chủ động chọn thông tin đặt khám nhanh (ngày khám, giờ khám và cơ sở y tế). Bệnh nhân sẽ nhận lấy số thứ tự trực tuyến ngay trên phần mềm</p>
                            <Link className='link_navbar' to='/basis/benh-vien-cong'> <p className='link_sec4_home'>Đặt khám ngay</p></Link>
                        </div>
                    </div>
                </section>
                <section>

                </section>
                <section className='sec6_home'>
                    <div className='sec6_home_container'>
                        <p className='title_sec6_home'>Ghi nhận từ Truyền thông</p>
                        <p>Sự lợi ích của Ứng dụng đặt khám nhanh Medcare đã được ghi nhận rộng rãi</p>
                        <div className='box_img_sec6_home'>
                            <div>
                                <img src={require('../assets/image/home/tv1.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv2.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv3.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv4.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv5.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv6.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv7.png')} alt='' />
                            </div>
                            <div>
                                <img src={require('../assets/image/home/tv8.png')} alt='' />
                            </div>
                        </div>
                        <div className='video_sec6_home'>
                            <iframe src="https://www.youtube.com/embed/zfmhCJgWx8Y" title="Ứng dụng Medcare - Đặt khám nhanh tại hơn 50 bệnh viện hàng đầu Việt Nam" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </div>

                </section>

                <section className='sec7_home'>
                    <div className='sec7_home_container'>
                        <p className='title'>Tin tức y tế</p>
                        <div className='show_item'>
                            {this.state.news.length > 0 && (
                                this.state.news.slice(0, 5).map((item) => (
                                    <div className='box_item' key={item.id_news}>
                                        <div className='item' onClick={() => this.clickNews(item.id_news)}>
                                            <ReactQuill
                                                readOnly
                                                value={item.image}
                                                theme="snow"
                                                modules={{ toolbar: false }}
                                                className='content_news_detail'
                                            />
                                            <div className='news_content'>
                                                <p className='title_item'>{item.title_news}</p>
                                                <p className='date'> {item.create_date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className='box_see_more'>
                            <Link className='link_navbar' to='/news/tin-y-te'> <p className='see_more'>Xem tiếp<i class="fa-solid fa-forward"></i></p></Link>
                        </div>
                    </div>
                </section>


                <section className='sec8_home'>
                    <div className='sec8_home_container'>
                        <div className='sec8_home_box'>
                            <div>
                                <p className='box_support_sec8_home'><i class="fa-solid fa-phone"></i></p>
                                <div className='box_content_sec8_home'>
                                    <p className='content_sec8_home_title'>CÁC HÌNH THỨC HỖ TRỢ</p>
                                    <p className='content_sec8_home_discriber'>1900-2115</p>
                                </div>
                            </div>
                            <div className='box_image box_image_zl'>
                                <img src={require('../assets/image/home/qr.jpeg')} alt='' />
                                <p>ZALO</p>
                            </div>
                            <div className='box_image box_image_fb'>
                                <img src={require('../assets/image/home/qr.jpeg')} alt='' />
                                <p>FACEBOOK</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default withRouter(Home);