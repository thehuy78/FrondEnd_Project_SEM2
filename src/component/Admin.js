import React, { Component } from 'react'
import '../style/Chat.scss'
import io from 'socket.io-client';
import { Link } from 'react-router-dom'
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.chatRef = React.createRef();
        this.ChatInput = React.createRef();
        this.show_chat = React.createRef()
        this.inbox_user = React.createRef();
        this.state = {
            messages: [],
            choice: '',
            chat: '',
            inbox_user_elements: JSON.parse(sessionStorage.getItem('inbox_user_elements')) || []
        }
    }

    componentDidMount() {
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.socket = io('http://localhost:3000');
        this.socket.on('sendChatToClient', this.handleChat);
        if (this.ChatInput.current) {
            this.ChatInput.current.addEventListener('keypress', this.handleKeyPress);
        }

    }

    componentWillUnmount() {
        this.socket.off('sendChatToClient', this.handleChat);
    }

    handleChat = (data) => {
        const storedMessages = JSON.parse(sessionStorage.getItem(data.email)) || [];
        const updatedMessages = [...storedMessages, data];

        sessionStorage.setItem(data.email, JSON.stringify(updatedMessages));

        if (data.Sendby === 'user') {
            if (!this.state.inbox_user_elements.some(info => info.key === data.email)) {
                const newInboxInfo = {
                    key: data.email,
                    name: data.name,
                    message: data.message
                };
                const updatedInboxInfos = [...this.state.inbox_user_elements, newInboxInfo];
                sessionStorage.setItem('inbox_user_elements', JSON.stringify(updatedInboxInfos));
                this.setState({ inbox_user_elements: updatedInboxInfos });
            }
        }
        this.setState({ messages: updatedMessages }, () => {
            this.scrollToBottom();
        });
    };
    handleInboxClick = (info) => {

        let storedMessage = sessionStorage.getItem(info.key);
        storedMessage = JSON.parse(storedMessage);

        this.setState({
            messages: storedMessage,
            choice: info.key,
            chat: info.name

        });
    }
    scrollToBottom() {
        if (this.show_chat.current) {

            this.show_chat.current.scrollTop = this.show_chat.current.scrollHeight;
        }
    }

    // componentWillUnmount() {

    //     if (this.ChatInput.current) {
    //         this.ChatInput.current.removeEventListener('keypress', this.handleKeyPress);
    //     }

    // }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = this.ChatInput.current.innerText.trim();
            const Sendby = 'adminMedCare';
            if (message === '') {
                this.ChatInput.current.innerText = '';
                return false;
            }
            console.log(message)
            const socket = io('http://localhost:3000')
            const name = 'Admin Viet'
            const email = this.state.choice
            socket.emit('sendChatToServer', { Sendby, message, name, email });
            this.ChatInput.current.innerText = '';
            return false;
        }
    }
    focus = () => {
        const socket = io('http://localhost:3000')
        const role = 'adminMedCare'
        socket.emit('sendStatusToServer', (role));
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        window.location.href = "/"
    }

    render() {
        const { messages } = this.state;
        return (
            <section className='sec1_admin'>
                <div className='sec1_admin_container'>
                    <div className='choice'>
                        <p>Tin nhắn</p>
                        <p onClick={this.logout}>Đăng xuất</p>
                        <Link to='/create-news' className='link_navbar'><p >Tạo bài viết</p></Link>
                    </div>
                    <div className='chat_admin'>
                        <div className='render'>
                            <div ref={this.inbox_user} className='left'>
                                <p className='title'>Tin nhắn</p>
                                {this.state.inbox_user_elements.map((info, index) => (
                                    <div key={info.key} className={this.state.choice === info.key ? "inbox_user inbox_user_choice" : "inbox_user"} onClick={() => this.handleInboxClick(info)} data-id={info.key}>
                                        {info.name}
                                    </div>
                                ))}
                            </div>
                            <div className='right'>
                                <p className='title'>{this.state.chat}</p>
                                <div className="show_mess" ref={this.show_chat}>
                                    <ul >
                                        {messages.map((data, index) => (
                                            <div key={index} className={`chat-sended-${data.Sendby}`}>
                                                <div>
                                                    <li>{data.name}:</li>
                                                    <li>{data.message}</li>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                                <div className={this.state.choice === "" ? "hide" : "box_input"}>
                                    <div ref={this.ChatInput} contentEditable={true}  >

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
