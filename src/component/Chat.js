import React, { Component } from 'react'
import io from 'socket.io-client';
import '../style/Chat.scss'
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.chatRef = React.createRef();
        this.ChatInput = React.createRef();
        this.show_chat = React.createRef()

        this.state = {
            show: false,
            messages: [],
            old_messages: []
        }
    }
    showchat = () => {
        this.setState({
            show: true,
        });

    }
    close_chat_box = () => {
        this.setState(({
            show: false,
        }), () => {
            console.log(this.state.show);

        });
    }

    componentDidMount() {
        console.log(this.state.messages)
        this.handleKeyPress = this.handleKeyPress.bind(this);
        const socket = io('http://localhost:3000')
        console.log(socket);
        let stored_message = sessionStorage.getItem(localStorage.getItem('user'))
        if (stored_message) {
            stored_message = JSON.parse(stored_message);
            this.setState({
                messages: stored_message

            });
        }
        socket.on('sendChatToClient', (data) => {
            if (data.email === localStorage.getItem('email')) {
                const { messages } = this.state;
                const updatedMessages = [...messages, data];
                sessionStorage.setItem(localStorage.getItem('email'), JSON.stringify(updatedMessages));
                this.setState({ messages: updatedMessages }, () => {
                    this.scrollToBottom();
                });
            }
        });

        if (this.ChatInput.current) {
            this.ChatInput.current.addEventListener('keypress', this.handleKeyPress);
        }
    }
    scrollToBottom() {
        if (this.show_chat.current) {
            this.show_chat.current.scrollTop = this.show_chat.current.scrollHeight;
        }
    }

    componentWillUnmount() {

        if (this.ChatInput.current) {
            this.ChatInput.current.removeEventListener('keypress', this.handleKeyPress);
        }

    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const message = this.ChatInput.current.innerText.trim();
            if (message === '') {
                this.ChatInput.current.innerText = ''; // Clear input content

            }
            else {
                const Sendby = 'user';
                let email = localStorage.getItem('email');
                const socket = io('http://localhost:3000')

                const name = localStorage.getItem('user')
                socket.emit('sendChatToServer', { Sendby, message, name, email });
                this.ChatInput.current.innerText = ''; // Clear input content
            }



        }
    }

    focus = () => {
        const socket = io('http://localhost:3000')
        const role = 'user'
        socket.emit('sendStatusToServer', (role));
    }


    render() {
        const { messages } = this.state;
        console.log(this.state.old_messages)
        return (
            <>
                <section className='chatbox'>
                    <div className='chatbox_container'>
                        <div className={this.state.show ? "hide" : "chat_toggle"} onClick={this.showchat}>
                            <p><i class="fa-solid fa-comment"></i>TƯ VẤN ĐẶT KHÁM TRỰC TUYẾN</p>
                        </div>
                        <div className={this.state.show ? "form_chat_container" : "hide"}>
                            <div className='box_title' onClick={this.close_chat_box} ><p>Tư vấn trực tuyến</p><i class="fa-solid fa-minus"></i></div>
                            <div className='show_chat' ref={this.show_chat} id='chat'>

                                <ul>
                                    {messages.map((data, index) => (
                                        <div key={index} className={`chat-sended-${data.Sendby}`}>
                                            <li>{data.name}:</li>
                                            <li>{data.message}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <div className='form_input_chat'>
                                <label>Tin nhắn*</label>
                                <div type='text' className='input_chat' ref={this.ChatInput} contentEditable="true" >

                                </div>
                                {/* <input type='submit' value={'Send'} /> */}
                            </div>

                        </div>
                    </div>

                </section>
            </>
        )
    }
}
