import axios from 'axios';
import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill component
import 'react-quill/dist/quill.snow.css';
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash';
import diacritic from 'diacritic';
import Loadding from '../component/Loadding'
class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }

    async componentDidMount() {
        console.log(this.props.match.params.id)
        setTimeout(async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/news/getdetail/${this.props.match.params.id}`);
            console.log(res)
            if (res && res.data) {
                this.setState({
                    data: res.data.data ? res.data.data : [],
                    loading: false
                });
            }
        }, 500);


    }
    convertToSlug = (text) => {
        const withoutDiacritic = diacritic.clean(text);
        return _.kebabCase(withoutDiacritic);
    };

    render() {
        return (
            <>
                <Loadding hide={this.state.loading} />
                <div className='news_detail'>
                    {this.state.data.map((index) => (
                        <div className='news_detail_container'>
                            <div className='link_news_detail'><Link to='/' className='link_navbar'>Trang chủ</Link> &gt;
                                <Link to={`/news/${this.convertToSlug(index.type_news)}`} className='link_navbar'>{index.type_news}</Link>
                                &gt; <span className='title_link'>{index.title_news}</span></div>
                            <div className='news_detail_box'>
                                <div key={index.id_news} className='content'>
                                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>{index.title_news}</div>
                                    <div style={{ fontSize: '1.3rem', padding: '0.2rem 0 1rem ', color: 'var(--gray)' }}>{index.create_date}</div>
                                    <ReactQuill
                                        readOnly
                                        value={index.content_news}
                                        theme="snow"
                                        modules={{ toolbar: false }}
                                        className='content_news_detail'
                                    />
                                </div>
                                <div className='box_image'>
                                    <img src={require('../assets/image/news/baner_news.png')} alt='' />
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </>
        );
    }
}
export default withRouter(NewsDetail)