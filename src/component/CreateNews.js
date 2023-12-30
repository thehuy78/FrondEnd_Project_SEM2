import axios from 'axios';
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            image: ""
        }
    }
    quillRef = React.createRef();
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    blogsvalue = (content, delta, source, editor) => {
        const htmlContent = editor.getHTML();
        this.setState({
            content: htmlContent
        })
    }
    handleChange = (content, delta, source, editor) => {
        // Remove <p> tags around <img> elements
        const updatedContent = content.replace(/<p>(<img[^>]+>)<\/p>/g, '$1');
        this.setState({
            image: updatedContent
        })

    }
    ValueNews = async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value.trim();
        const type = document.getElementById('type').value;
        const id = localStorage.getItem('email')
        const data = {
            title: title,
            type: type,
            content: this.state.content,
            image: this.state.image,
            id: id
        }
        let res = await axios.post('http://127.0.0.1:8000/api/news/postnews', { data })
        console.log(res)
        if (res.data.status === 200) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            window.location.reload();
        } if (res.data.status === 500) {
            alert('Lỗi đường dẫn!')
        }
    }

    render() {
        var toolbarOptions = [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],
            // Thêm tùy chọn điều chỉnh font size
            [{ 'size': ['small', false, 'large', 'huge'] }],
            // Thêm tùy chọn điều chỉnh kích thước ảnh
            ['image'],
            [
                {
                    'size': ['30%', '50%', '70%', '100%']
                }
            ],
        ];

        const formats = [
            'header',
            'image',
        ];
        return (

            <>

                <div className='create_news'>
                    <form className='create_news_form' onSubmit={this.ValueNews}>

                        <div className='box_title_news'>
                            <label>Tiêu đề:</label>
                            <input className='text' id='title' required></input>
                        </div>
                        <div className='box_type_news'>
                            <label>Loại Tin:</label>
                            <select id='type' required>
                                <option value={'Tin dịch vụ'}>Tin dịch vụ</option>
                                <option value={'Tin y tế'}>Tin y tế</option>
                                <option value={'Y học thường thức'}>Tin y học thường thức</option>
                            </select>
                        </div>
                        <div className='box_content_news'>
                            <label>Ảnh bìa:</label>
                            <ReactQuill
                                ref={this.quillRef}
                                modules={{
                                    toolbar: {
                                        container: [
                                            ['image'],
                                        ],

                                    },
                                }}
                                formats={formats}
                                onChange={this.handleChange}
                                // placeholder="Chèn ảnh vào đây"

                                style={{ width: '100%', maxWidth: '5rem', height: '5rem', marginBottom: '3rem' }}
                            />
                        </div>
                        <div className='box_content_news'>
                            <label>Nội dung:</label>
                            <ReactQuill
                                theme="snow"
                                modules={{
                                    toolbar: toolbarOptions
                                }}

                                className='content_input'
                                id='blog'
                                onChange={this.blogsvalue}
                            />
                        </div>
                        <div className='box_btn_news'>
                            <input type='submit' value={'Đăng'} />
                        </div>
                    </form>
                </div>
                <div className='text_news' id='hehe'></div>
            </>



        );
    }
}