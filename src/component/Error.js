import React, { Component } from 'react'
import '../style/Error.scss'

export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }
    componentDidMount() {
        this.setState({
            index: this.props.index
        })
    }
    render() {
        return (
            <section className='notdata'>
                <div className='notdata_container'>
                    <p className={this.state.index === 1 ? 'hospital_error' : 'hide'}>Danh sách sẽ cập nhật trong thời gian tới</p>
                    <div className={this.state.index === 1 ? '' : 'hide'}>
                        <img src={require("../assets/image/logo/notdata.png")} alt='' />
                    </div>
                    <p className={this.state.index === 3 ? 'doctor_error' : 'hide'}>Không tìm thấy bác sĩ</p>
                    <p className={this.state.index === 2 ? 'specialist_error' : 'hide'}>Không tìm thấy khoa</p>
                    <p className={this.state.index === 4 ? 'specialist_error' : 'hide'}>Không tìm thấy loại tiêm chủng</p>
                    <p className={this.state.index === 5 ? 'specialist_error' : 'hide'}>Không tìm thấy loại xét nghiệm</p>
                    <p className={this.state.index === 6 ? 'specialist_error' : 'hide'}>Chưa có lịch khám</p>
                    <p className={this.state.index === 7 ? 'specialist_error' : 'hide'}>Không có lịch sử khám bệnh</p>
                    <p className={this.state.index === 8 ? 'specialist_error' : 'hide'}>Chưa có giao dịch nào được thực hiện</p>
                </div>
            </section>
        )
    }
}
