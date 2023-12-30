import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/Basis.scss'
import Slider from "react-slick";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import Error from '../component/Error';
import Loadding from '../component/Loadding';
import emailjs from 'emailjs-com';
import Map from '../component/Map';
import Noti from '../component/Noti';

class Basis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: "",
            topic: "benh-vien-cong",
            data: [],
            showdatabv: {},
            arrayaddress: [],
            currentPage: 1,
            itemsPerPage: 5,
            loading: true,
            noti: false


        }
        this.form = React.createRef();
    }

    async componentDidMount() {

        // console.log(this.props.match.params.index)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const { index } = this.props.match.params;

        if (index !== 'benh-vien-cong' && index !== 'benh-vien-tu' && index !== 'phong-kham' && index !== 'phong-mach') {
            window.location.href = '/404'
        }
        this.setState({ topic: index });

        setTimeout(async () => {
            let arrayaddress = await axios.get(`http://127.0.0.1:8000/api/main/address`);
            this.setState({
                arrayaddress: arrayaddress.data && arrayaddress.data.arrayaddress ? arrayaddress.data.arrayaddress : {},
            })
        }, 2000);

        setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/hospital/${index}`)
            if (res.data.status === 200) {
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                    showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                    choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    loading: false
                })
            }
        }, 1000);

    }
    async componentDidUpdate(prevProps) {

        const { index } = this.props.match.params;
        if (index !== prevProps.match.params.index) {
            this.setState({ topic: index })

            const quan = document.getElementById("quan").value;
            const search = document.getElementById("search").value;
            if (quan === "" && search.trim() === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/${index}`)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    })

                }
            }
            if (quan !== "" && search.trim() === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/select/${index}/${quan}`)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    })

                }
            }

            if (quan === "" && search.trim() !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/search/${index}/${search}`)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    })

                }
            }
            if (quan !== "" && search.trim() !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/selectsearch/${index}/${quan}/${search}`)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    })

                }
            }
            this.setState({
                currentPage: 1
            })
            this.renderHospitalItems();

        }
    }

    filter = async (event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            const { index } = this.props.match.params;
            this.setState({ topic: index });
            const quan = document.getElementById("quan").value;
            const search = document.getElementById("search").value;

            if (quan === "" && search.trim() === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/${index}`);
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    });

                }
            }
            if (quan !== "" && search.trim() === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/select/${index}/${quan}`);
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    });

                }
            }
            if (quan === "" && search.trim() !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/search/${index}/${search}`);
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",

                    });

                }
            }
            if (quan !== "" && search.trim() !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/hospital/selectsearch/${index}/${quan}/${search}`);
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                        choice: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_hospital : "",
                    });

                }
            }
        }, 150);
    };


    showdatabv = (item) => {
        this.setState({
            showdatabv: item,
            choice: item.id_hospital
        })

    }

    handelclick = (bv) => {
        this.props.history.push(`/formality/${bv.id_hospital}`)
    }
    openmap = (add)=>{
        const searchAddress = add;

        // Đường dẫn đến Google Maps với tham số tìm kiếm
        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(searchAddress)}`;
    
        // Mở trang Google Maps trong cửa sổ mới khi component được tạo
        window.open(googleMapsUrl, '_blank');
      }
    

    //PANIGATION
    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    renderHospitalItems = () => {
        const { data, currentPage, itemsPerPage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = data.slice(startIndex, endIndex);
        if (currentData.length > 0) {

            return currentData.map((item) => (
                <div className={this.state.choice === item.id_hospital ? "hospital_item choice" : "hospital_item"} key={item.id_hospital} onClick={() => this.showdatabv(item)}>
                    <div className='logo'>
                        {item.logo_hospital ? (
                            <img src={require(`../assets/image/hopital/logo/${item.logo_hospital}`)} alt='' />
                        )
                            : (
                                <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                            )}
                    </div>
                    <div className='info'>
                        <p className='name'>{item.name_hospital}</p>
                        <p className='address'>
                            <i className="fa-solid fa-location-dot"></i>
                            {item.address}
                        </p>
                        <div className='link'>
                            <p key={item.id_hospital} onClick={() => this.handelclick(item)}>
                                Đặt khám ngay
                            </p>
                        </div>
                    </div>
                </div>
            ));
        }

    };

    calculatePageNumbers = () => {
        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.data.length / this.state.itemsPerPage);

        const maxPagesToShow = 5;
        const pages = [];

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

            if (startPage > 2) {
                pages.push(1);
                pages.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages) {
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };




    sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_5l4i0be', 'template_g4nb4up', this.form.current, 'PPB36x1bm1gtVZqjk')
            .then((result) => {
                this.setState({
                    noti: true
                })
                setTimeout(() => {
                    this.setState({
                        noti: false
                    })
                }, 2000);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
                this.form.current.reset();
            }, (error) => {
                // console.log(error.text);
            });
    };

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            variableWidth: true,

            responsive: [

                {
                    breakpoint: 768,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: true
                    }
                }
            ]
        };




        let showdatabv = this.state.showdatabv;


        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.data.length / this.state.itemsPerPage);
        const isemtydata = this.state.data.length === 0;
        return (
            <>
                <Loadding hide={this.state.loading} />
                <Noti hide={this.state.noti} />
                <section className='sec1_basis'>
                    <div className='sec1_basis_container'>
                        <div className='back_link_block'><span><Link to='/' className='back_link'>Trang chủ</Link></span><i class="fa-solid fa-angle-up fa-rotate-90"></i><span className='location_link'>Cơ sở y tế</span></div>
                        <p className='title_sec1_basis'>Cơ sở y tế</p>
                        <p className='discriber_sec1_basis'>Với những cơ sở Y Tế hàng đầu sẽ giúp trải nghiệm khám, chữa bệnh của bạn tốt hơn</p>
                        <div className='box_sort'>
                            <div className='box_sort_container'>
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type='text' placeholder='Tìm cơ sở y tế...' id='search' onChange={this.filter}></input>
                                <i class="fa-solid fa-location-dot"></i>
                                <select id='quan' onChange={this.filter}>
                                    <option value={""}>-- Tất cả --</option>
                                    {this.state.arrayaddress.map((item) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='sec2_basis'>
                    <div className='sec2_basis_container'>
                        <Slider {...settings} className='slider_basis'>
                            <div><Link className='link_basis' to='/basis/benh-vien-cong'><p className={this.state.topic === "benh-vien-cong" ? 'topic_choice' : ''} >Bệnh viện công</p></Link></div>
                            <div><Link className='link_basis' to='/basis/benh-vien-tu'><p className={this.state.topic === "benh-vien-tu" ? 'topic_choice' : ''} >Bệnh viện tư</p></Link></div>
                            <div><Link className='link_basis' to='/basis/phong-kham'><p className={this.state.topic === "phong-kham" ? 'topic_choice' : ''} >Phòng khám</p></Link></div>
                            <div><Link className='link_basis' to='/basis/phong-mach'><p className={this.state.topic === "phong-mach" ? 'topic_choice' : ''} >Phòng mạch</p></Link></div>

                        </Slider>
                    </div>
                </section>

                <section className='sec3_basis'>


                    {isemtydata && (
                        <div>
                            <Error index={1} />
                        </div>
                    )}
                    <div className="sec3_basis_container">
                        <div className='list_hospital'>{this.renderHospitalItems()}

                        </div>
                        {showdatabv &&
                            <div className='information_hospital'>
                                {showdatabv.logo_hospital ? (
                                    <img src={require(`../assets/image/hopital/logo/${showdatabv.logo_hospital}`)} alt='' />
                                )
                                    : (
                                        <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                                    )}
                                <p className='name'>{showdatabv.name_hospital}</p>
                                <p className='address' onClick={()=>this.openmap(showdatabv.address)}><i class="fa-solid fa-location-dot"></i>{showdatabv.address}</p>
                                <p className='days'><i class="fa-solid fa-calendar"></i>Ngày HĐ: {['T2, T3, T4, T5, T6'].includes(showdatabv.day_work) ? "Thứ Hai - Thứ Sáu" : ['T2, T3, T4, T5, T6, T7'].includes(showdatabv.day_work) ? "Thứ Hai - Thứ Bảy" : ['T2, T3, T4, T5, T6, T7, CN'].includes(showdatabv.day_work) ? "Thứ Hai - Chủ Nhật" : showdatabv.day_work}</p>
                                <p className='time'><i class="fa-regular fa-clock"></i>Giờ HĐ: {showdatabv.open_time} - {showdatabv.close_time}</p>
                                <p className='discriber'>{showdatabv.description_hospital}</p>
                                <div>
                                    <p>Bản đồ</p>

                                    <Map map={showdatabv.map} />
                                </div>
                            </div>
                        }
                        {totalPages > 1 && (
                            <div className='pagination_controls'>
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => this.handlePageChange(currentPage - 1)}
                                >
                                    <i className="fa-solid fa-angles-left"></i>
                                </button>

                                {this.calculatePageNumbers().map((pageNumber, index) => (
                                    <span className={this.state.currentPage === pageNumber ? "perpage perpage_choice" : "perpage"} key={index} onClick={() => this.handlePageChange(pageNumber)}>
                                        {pageNumber === "..." ? "..." : pageNumber}
                                    </span>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => this.handlePageChange(currentPage + 1)}
                                >
                                    <i className="fa-solid fa-angles-right"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                <section className='sec4_basis'>
                    <div className='sec4_basis_container'>
                        <form ref={this.form} onSubmit={this.sendEmail}>
                            <p>Liên hệ hợp tác</p>
                            <input type='text' placeholder='Tên đơn vị/ Người liên hệ' required name="user_name" maxLength={30} />
                            <input type='email' placeholder='Email' required name="user_email" />
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
export default withRouter(Basis);
