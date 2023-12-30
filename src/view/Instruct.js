import React, { Component } from 'react';
import '../style/Instruct.scss';
import { Link } from 'react-router-dom'
import InstructComponent from '../component/InstructComponent';
import { withRouter } from 'react-router-dom';
import Loadding from '../component/Loadding';
class Instruct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: 1,
            loading: true
        };
    }

    choicetopic = (number) => {
        this.setState({ topic: number });
    };
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const { index } = this.props.match.params;

        this.setState({ topic: parseInt(index, 10) });
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000);

    }

    componentDidUpdate(prevProps) {
        const { index } = this.props.match.params;
        if (index !== prevProps.match.params.index) {
            this.setState({ topic: parseInt(index, 10) });
        }

    }

    render() {
        return (
            <>
                <Loadding hide={this.state.loading} />
                <section className='sec1_instruct'>
                    <div className='sec1_instruct_container'>
                        <p className='title_sec1_instruct'>Medpro có thể giúp gì cho bạn?</p>
                        <p className='discriber_sec1_instruct'>Giải đáp các câu hỏi nhanh giúp quý khách hiểu rõ hơn về sản phẩm, dịch vụ của chúng tôi.</p>
                    </div>
                </section>
                <section className='sec2_instruct'>
                    <div className='sec2_instruct_container'>
                        <div><Link className='link_instruct' to='/instruct/1'> <p className={this.state.topic === 1 ? 'topic_choice' : ''}>Đặt lịch khám</p></Link></div>
                        <div><Link className='link_instruct' to='/instruct/2'><p className={this.state.topic === 2 ? 'topic_choice' : ''}>Tư vấn khám bệnh từ xa</p></Link></div>
                        <div><Link className='link_instruct' to='/instruct/3'> <p className={this.state.topic === 3 ? 'topic_choice' : ''}>Quy trình hoàn phí</p></Link></div>
                        <div><Link className='link_instruct' to='/instruct/4'> <p className={this.state.topic === 4 ? 'topic_choice' : ''}>Câu hỏi thường gặp</p></Link></div>
                    </div>
                </section>
                <section className='sec3_instruct'>
                    <InstructComponent
                        topic={this.state.topic}
                    />
                </section>
            </>
        );
    }
}

export default withRouter(Instruct);