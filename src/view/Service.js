import React, { Component } from 'react'
import '../style/Service.scss'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Error from '../component/Error';
import Loadding from '../component/Loadding';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: "",
            service: '',
            url: "",
            data: [],
            arrayaddress: [],
            currentPage: 1,
            itemsPerpage: 8,
            choicebv: "",
            loading: true
        }
    }


    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            let arrayaddress = await axios.get(`http://127.0.0.1:8000/api/main/address`);
            this.setState({
                arrayaddress: arrayaddress.data && arrayaddress.data.arrayaddress ? arrayaddress.data.arrayaddress : {},
            })
        }, 500);

        const { index } = this.props.match.params;
        var topic = '';
        if (index === "sv2") {
            this.setState({
                service: "Đặt khám theo bác sĩ",
                url: "Kham-Theo-Bac-Si",
                choice: "",
            })
            topic = 'Kham-Theo-Bac-Si';
        }
        if (index === "sv1") {
            this.setState({
                service: "Đặt khám tại cơ sở",
                url: "Kham-Theo-Bac-Si",
                choice: "",
            })
            topic = 'Kham-Theo-Bac-Si';
        }
        if (index === "sv3") {
            this.setState({
                service: "Tư vấn khám bệnh từ xa",
                url: "kham-benh-tu-xa",
                choice: "",
            })
            topic = 'kham-benh-tu-xa';
        }
        if (index === "sv4") {
            this.setState({
                service: "Đặt lịch xét nghiệm",
                url: "Xet-Nghiem",
                choice: "",
            })
            topic = 'Xet-Nghiem';
        }
        if (index === "sv5") {
            this.setState({
                service: "Đặt lịch tiêm chủng",
                url: "Tiem-Chung",
                choice: "",
            })
            topic = 'Tiem-Chung';
        }
        if (index === "sv6") {
            this.setState({
                service: "Y tế tại nhà",
                url: "y-te-tai-nha",
                choice: "",
            })
            topic = 'y-te-tai-nha';
        }
        if (index === "sv7") {
            this.setState({
                service: "Khám bệnh ngoài giờ",
                url: "Kham-Benh-Ngoai-Gio",
                choice: "",
            })
            topic = 'Kham-Benh-Ngoai-Gio';
        } if (!['sv1', 'sv2', 'sv3', 'sv4', 'sv5', 'sv6', 'sv7'].includes(index)) {
            window.location.href = '/404'
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/service/get/${topic}`)
            console.log(res)
            if (res.data.status === 200) {
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                    loading: false,
                })

            }
        }, 1000);


    }

    async componentDidUpdate(prevProps) {

        const { index } = this.props.match.params;

        if (index !== prevProps.match.params.index) {
            this.setState({
                loading: true
            })
            var topic = '';
            if (index === "sv2") {
                this.setState({
                    service: "Đặt khám theo bác sĩ",
                    url: "Kham-Theo-Bac-Si",
                    choice: "",
                })
                topic = 'Kham-Theo-Bac-Si';
            }
            if (index === "sv1") {
                this.setState({
                    service: "Đặt khám tại cơ sở",
                    url: "Kham-Theo-Bac-Si",
                    choice: "",
                })
                topic = 'Kham-Theo-Bac-Si';
            }
            if (index === "sv3") {
                this.setState({
                    service: "Tư vấn khám bệnh từ xa",
                    url: "kham-benh-tu-xa",
                    choice: "",
                })
                topic = 'kham-benh-tu-xa';
            }
            if (index === "sv4") {
                this.setState({
                    service: "Đặt lịch xét nghiệm",
                    url: "Xet-Nghiem",
                    choice: "",
                })
                topic = 'Xet-Nghiem';
            }
            if (index === "sv5") {
                this.setState({
                    service: "Đặt lịch tiêm chủng",
                    url: "Tiem-Chung",
                    choice: "",
                })
                topic = 'Tiem-Chung';
            }
            if (index === "sv6") {
                this.setState({
                    service: "Y tế tại nhà",
                    url: "y-te-tai-nha",
                    choice: "",
                })
                topic = 'y-te-tai-nha';
            }
            if (index === "sv7") {
                this.setState({
                    service: "Khám bệnh ngoài giờ",
                    url: "Kham-Benh-Ngoai-Gio",
                    choice: "",
                })
                topic = 'Kham-Benh-Ngoai-Gio';
            } if (!['sv1', 'sv2', 'sv3', 'sv4', 'sv5', 'sv6', 'sv7'].includes(index)) {
                window.location.href = '/404'
            }
            let res = await axios.get(`http://127.0.0.1:8000/api/service/get/${topic}`)
            console.log(res)
            if (res.data.status === 200) {
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                    loading: false
                })

            }
            this.filter(this.state.choice);

            this.setState({
                currentPage: 1
            })
            this.renderPaginationItems();


        }
    }
    handelclickbv = (bv) => {
        const index = this.props.match.params.index;
        if (index === "sv4") {
            this.props.history.push(`/specialist/xet-nghiem/${bv.id_hospital}`)
        }
        else if (index === "sv5") {
            this.props.history.push(`/specialist/tiem-chung/${bv.id_hospital}`)
        }
        else if (index === "sv7") {
            this.props.history.push(`/specialist/ngoai-gio/${bv.id_hospital}`)
        }
        else if (index === 'sv1') {
            this.props.history.push(`/specialist/kham-benh-tai-co-so/${bv.id_hospital}`)
        }
        else {
            this.props.history.push(`/specialist/kham-benh-theo-bac-si/${bv.id_hospital}`)
        }

    }

    filter = async (number) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        this.setState({
            choice: number
        })
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        const search = document.getElementById("search").value;
        const select = document.getElementById("select").value;
        var index = number;
        var url = this.state.url;

        this.timeoutId = setTimeout(async () => {
            if (search.trim() === "" && select === "" && index === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search/${url}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() !== "" && select === "" && index === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search1/${url}/${search.trim()}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() === "" && select !== "" && index === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search2/${url}/${select}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() === "" && select === "" && index !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search3/${url}/${index}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() !== "" && select !== "" && index === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search12/${url}/${search.trim()}/${select}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() !== "" && select === "" && index !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search13/${url}/${search.trim()}/${index}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() === "" && select !== "" && index !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search23/${url}/${select}/${index}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
            if (search.trim() !== "" && select !== "" && index !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/service/search123/${url}/${search.trim()}/${select}/${index}`)
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                })

            }
        }, 150);

        this.setState({
            currentPage: 1
        })
        this.renderPaginationItems();
    }
    handelClick = (item) => {
        this.setState({
            choicebv: item.id_hospital
        })
    }

    renderPaginationItems = () => {
        const { data, currentPage, itemsPerpage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerpage;
        const endIndex = startIndex + itemsPerpage;
        const currentData = data.slice(startIndex, endIndex);
        if (currentData.length > 0) {

            return currentData.map((item) => (
                <div className={this.state.choicebv === item.id_hospital ? "hospital_item choice" : "hospital_item"} onClick={() => this.handelClick(item)}>
                    <div className='logo'>
                        {item.logo_hospital ? (
                            <img src={require(`../assets/image/hopital/logo/${item.logo_hospital}`)} alt='' />
                        )
                            : (
                                <img src={require('../assets/image/hopital/logo/bv1.png')} alt='' />
                            )}
                    </div>
                    <div className='info'>
                        <div className='box_info'>
                            <p className='name'>{item.name_hospital}</p>
                            <p className='address'><i class="fa-solid fa-location-dot"></i>{item.address}</p>
                        </div>
                        <div className='link'><p key={item.id_hospital} onClick={() => this.handelclickbv(item)}>Đặt khám ngay</p></div>
                    </div>
                </div>
            ))
        }
    }
    handleError = (err) => {
        this.setState({
            error: err
        });
    }
    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };




    calculatePageNumbers = () => {
        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.data.length / this.state.itemsPerpage);

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

    render() {
        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.data.length / this.state.itemsPerpage);
        const isemtydata = this.state.data.length === 0;
        return (
            <>
                <Loadding hide=

                    {this.state.loading}
                />
                <section className='sec1_service'>
                    <div className='sec1_service_container'>
                        <div className='sec1_service_content'>
                            <p className='title'>Dịch vụ</p>
                            <p className='service'>{this.state.service}</p>
                            <p className='describer'>Đặt khám nhanh chóng, tiết kiệm thời gian, an toàn tiện lợi</p>
                        </div>
                    </div>
                </section>
                <section className='sec2_service'>
                    <div className='sec2_service_container'>
                        <div className='box_sort'>
                            <div className='box_sort_container'>
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type='text' placeholder='Tìm cơ sở y tế...' id='search' onChange={() => { this.filter(this.state.choice) }}></input>
                                <i class="fa-solid fa-location-dot"></i>
                                <select id='select' onChange={() => { this.filter(this.state.choice) }}>
                                    <option value={""}>-- Tất cả --</option>
                                    {this.state.arrayaddress.map((item) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='box_type_hospital'>
                            <p onClick={() => this.filter("")} className={this.state.choice === "" ? 'type choice' : 'type'}>Tất cả</p>
                            <p onClick={() => this.filter("benh-vien")} className={this.state.choice === "benh-vien" ? 'type choice' : 'type'}>Bệnh viện</p>
                            <p onClick={() => this.filter("phong")} className={this.state.choice === "phong" ? 'type choice' : 'type'}>Phòng khám/Phòng mạch</p>
                        </div>
                    </div>
                </section>
                <section className='sec3_service'>
                    {isemtydata && (
                        <div>
                            <Error index={1} />
                        </div>
                    )}
                    <div className="sec3_service_container">
                        <div className="list_hospital">
                            {this.renderPaginationItems()}
                        </div>

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
            </>
        )
    }
}
export default withRouter(Service);
