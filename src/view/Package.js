import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Error from '../component/Error';
import '../style/Package.scss'
import { withRouter } from 'react-router-dom';
import Loadding from '../component/Loadding';
import Map from '../component/Map';
class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: "",
            data: [],
            showdatabv: {},
            arrayaddress: [],
            currentPage: 1,
            itemsPerPage: 4,
            loading: true
        }
    }


    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setTimeout(async () => {
            let arrayaddress = await axios.get(`http://127.0.0.1:8000/api/main/address`);
            this.setState({
                arrayaddress: arrayaddress.data && arrayaddress.data.arrayaddress ? arrayaddress.data.arrayaddress : {},
            })
        }, 2000);
        setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/package`)
            if (res.data.status === 200) {
                this.setState({
                    data: res.data && res.data.data ? res.data.data : {},
                    showdatabv: res.data && res.data.data ? res.data.data[0] : {},
                    index: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_pack : "",
                    loading: false
                })

            }
        }, 500);

    }

    showdatabv = (item) => {

        this.setState({
            showdatabv: item,
            index: item.id_pack
        })


    }
    handleClick = (item) => {
        this.props.history.push(`/schedule/goi-kham/${item.id_pack}`)
    }
    //PANIGATION
    handlePageChange = (newPage) => {
        this.setState({
            currentPage: newPage,
        });

    };
    renderHospitalItems = () => {
        const { data, currentPage, itemsPerPage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentData = data.slice(startIndex, endIndex);

        if (currentData.length > 0) {

            return currentData.map((item) => (
                <div className={this.state.index === item.id_pack ? "hospital_item hospital_item_choice" : "hospital_item"} onClick={() => this.showdatabv(item)}>
                    <div className='logo'>
                        <img src={require('../assets/image/logo/package.png')} alt='' />
                    </div>
                    <div className='info'>
                        <p className='name'>{item.pack_name}</p>
                        <p className='address'>
                            <i class="fa-regular fa-hospital"></i>
                            {item.address}
                        </p>
                        <p className='price'><span>Giá: </span>{item.fee.toLocaleString()} VNĐ</p>
                        <div className='link'>
                            <p key={item.id_pack} onClick={() => this.handleClick(item)}>
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



    filter = async () => {


        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            const search = document.getElementById('search').value;
            const select = document.getElementById('select').value;
            if (search.trim() === "" && select === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/package`)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0] : {},
                        index: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_pack : ""
                    })

                }
            }
            if (search.trim() !== "" && select === "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/package/search1/${search.trim()}`)
                console.log(res)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0] : {},
                        index: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_pack : ""
                    })

                }
            }
            if (search.trim() === "" && select !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/package/search2/${select}`)
                console.log(res)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0] : {},
                        index: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_pack : ""
                    })

                }
            }
            if (search.trim() !== "" && select !== "") {
                let res = await axios.get(`http://127.0.0.1:8000/api/package/search12/${search.trim()}/${select}`)
                if (res.data.status === 200) {
                    this.setState({
                        data: res.data && res.data.data ? res.data.data : {},
                        showdatabv: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0] : {},
                        index: res.data && res.data.data && res.data.data.length > 0 ? res.data.data[0].id_pack : ""
                    })

                }
            }
        }, 100);
    }

    render() {
        const isemtydata = this.state.data.length === 0;
        let showdatabv = this.state.showdatabv;
        let isshowdatabv = Object.keys(this.state.showdatabv).length === 0;
        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.data.length / this.state.itemsPerPage);
        return (
            <>
                <Loadding hide={this.state.loading} />
                <section className='sec1_package'>
                    <div className='sec1_package_container'>
                        <div className='back_link_block'><span><Link to='/' className='back_link'>Trang chủ</Link></span><i class="fa-solid fa-angle-up fa-rotate-90"></i><span className='location_link'>Gói khám</span></div>
                        <p className='title_sec1_package'>Danh sách gói khám</p>
                        <p className='discriber_sec1_package'>Gói khám sức khỏe đa dạng tại các Cơ sở Y tế uy tín đáp ứng mọi nhu cầu người dân</p>
                        <div className='box_sort'>
                            <div className='box_sort_container'>
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type='text' placeholder='Tìm gói khám...' id='search' onChange={this.filter} />
                                <i class="fa-solid fa-location-dot"></i>
                                <select id='select' onChange={this.filter}>
                                    <option value={""}>-- Tất Cả --</option>
                                    {this.state.arrayaddress.length > 0 && (this.state.arrayaddress.map((item) => (
                                        <>
                                            <option value={item}>{item}</option>
                                        </>
                                    ))

                                    )}

                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='sec3_package'>
                    {isemtydata && (
                        <div>
                            <Error index={1} />
                        </div>
                    )}
                    <div className="sec3_package_container">
                        <div className='list_hospital'>{this.renderHospitalItems()}

                        </div>
                        {!isshowdatabv &&
                            (
                                <div className='information_hospital'>
                                    {showdatabv.logo_hospital ? (
                                        <img src={require(`../assets/image/hopital/logo/${showdatabv.logo_hospital}`)} alt='' />
                                    )
                                        : (
                                            <img src={require('../assets/image/hopital/logo/bv2.png')} alt='' />
                                        )}
                                    <p className='name_pack'>{showdatabv.pack_name}</p>
                                    <div className='box_hospital'>
                                        <i class="fa-regular fa-hospital"></i>
                                        <div>
                                            <p className='name_hospital'>{showdatabv.name_hospital}</p>
                                            <p className='address'>{showdatabv.address}</p>
                                        </div>
                                    </div>
                                    <p className='discriber'>{showdatabv.description}</p>
                                    <div>
                                        <p >Bản đồ</p>
                                        <Map map={showdatabv.map} />
                                    </div>
                                </div>
                            )
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
            </>
        )
    }
}
export default withRouter(Package)