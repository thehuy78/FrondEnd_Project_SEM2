import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../style/New.scss'
import Loadding from '../component/Loadding';
import axios from 'axios';
import ReactQuill from 'react-quill'; // Import ReactQuill component
import 'react-quill/dist/quill.snow.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: "",
            data: [],
            currentPage: 1,
            itemsPerpage: 12,
            loading: true
        }
        this.handleResize = this.handleResize.bind(this);
    }
    async componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        window.addEventListener('resize', this.handleResize);
        const choice = this.props.match.params.id;
        this.setState({
            choice: choice
        })
        setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/news/getall/${choice}`)
            if (res && res.data && res.data.status === 200) {
                this.setState({
                    data: res.data.data ? res.data.data : [],
                    loading: false
                })
            }
        }, 1000);


        this.renderPaginationItems()
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props.match.params;
        if (id !== prevProps.match.params.id) {
            const choice = this.props.match.params.id;
            this.setState({
                choice: choice
            })

            let res = await axios.get(`http://127.0.0.1:8000/api/news/getall/${choice}`)
            if (res && res.data && res.data.status === 200) {
                this.setState({
                    data: res.data.data ? res.data.data : [],
                })
            }
            this.setState({
                currentPage: 1
            })
            this.renderPaginationItems();
        }
    }
    componentWillUnmount() {
        // Hủy đăng ký sự kiện resize khi component bị unmount để tránh memory leak
        window.removeEventListener('resize', this.handleResize);
    }

    clickTopic = (topic) => {
        this.setState({
            choice: topic
        })
    }
    handleClickNews = (item) => {
        this.props.history.push(`/newsdetail/${item.id_news}`)
    }

    handleResize() {
        const screenWidth = window.innerWidth;

        // Kiểm tra kích thước màn hình và cập nhật trạng thái
        if (screenWidth > 1023) {
            this.setState({
                itemsPerpage: 12,
            });
        }
        if (screenWidth <= 1023 && screenWidth > 678) {
            this.setState({
                itemsPerpage: 6,
            });
        }
        if (screenWidth <= 678) {

            this.setState({ itemsPerpage: 4 });

        }
    }

    renderPaginationItems = () => {
        const { data, currentPage, itemsPerpage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerpage;
        const endIndex = startIndex + itemsPerpage;
        const currentData = data.slice(startIndex, endIndex);
        if (currentData.length > 0) {

            return currentData.map((item) => (
                <div className='news_item_container' key={item.id_news} onClick={() => this.handleClickNews(item)}>
                    <div className='news_item'>

                        <ReactQuill
                            readOnly
                            value={item.image}
                            theme="snow"
                            modules={{ toolbar: false }}
                            className='content_news_detail'
                        />
                        <div className='news_content'>
                            <p className='title'>{item.title_news}</p>
                            <p className='discriber' dangerouslySetInnerHTML={{ __html: item.content_news }} ></p>
                            <p className='date'><i class="fa-solid fa-calendar-days"></i> {item.create_date}</p>
                            <p className='link'>Xem thêm</p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

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
    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    changeTopic = () => {
        const topic = document.getElementById('select_list_link').value;
        if (topic === 'dv') {
            this.props.history.push('/news/tin-dich-vu');
        }
        if (topic === 'yte') {
            this.props.history.push('/news/tin-y-te');
        }
        if (topic === 'yhtt') {
            this.props.history.push('/news/y-hoc-thuong-thuc');
        }
    }

    render() {
        const { currentPage } = this.state;
        const totalPages = Math.ceil(this.state.data.length / this.state.itemsPerpage);
        return (
            <>
                <Loadding hide={this.state.loading} />
                <section className='sec1_news'>
                    <div className='sec1_news_container'>
                        <p className='title'>Tin tức y khoa</p>
                        <div className='list_link'>
                            <Link to='/news/tin-dich-vu' className='link_navbar'><p className={this.state.choice === "tin-dich-vu" ? "choice" : ""}>Tin dịch vụ</p></Link>
                            <Link to='/news/tin-y-te' className='link_navbar'><p className={this.state.choice === "tin-y-te" ? "choice" : ""}>Tin y tế</p></Link>
                            <Link to='/news/y-hoc-thuong-thuc' className='link_navbar'><p className={this.state.choice === "y-hoc-thuong-thuc" ? "choice" : ""}>Y học thường thức</p></Link>
                        </div>
                        <div className='list_link_mobile'>
                            <i class="fa-solid fa-sliders"></i>
                            <select id='select_list_link' onChange={this.changeTopic}>
                                <option value={'dv'}>Tin dịch vụ</option>
                                <option value={'yte'}>Tin y tế</option>
                                <option value={'yhtt'}>Y học thường thức</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section className='sec2_news'>
                    <div className='sec2_news_container'>
                        <div className='list_news'>
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


                <section className='sec2_news_mobile'>
                    <div className='sec2_news_container_mobile'>
                        <div className='list_news'>
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
export default withRouter(News)
