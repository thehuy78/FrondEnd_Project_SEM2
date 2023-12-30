import React, { Component } from 'react'
import '../style/HistoryTransaction.scss'
import axios from 'axios'
import LoadingChild from './LoadingChild';
import Error from './Error';
export default class HistoryTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: [],
            loading: true
        }
    }
    async componentDidMount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(async () => {
            let res = await axios.get(`http://127.0.0.1:8000/api/payment/gettransaction/${localStorage.getItem('email')}`)
            console.log(res)
            if (res && res.data && res.data.data) {
                this.setState({
                    transaction: res.data.data ? res.data.data : [],
                    loading: false
                })
            }
        }, 200);

    }
    render() {
        return (
            <>

                <section className='sec1_transaction'>
                    <LoadingChild hide=

                        {this.state.loading}
                    />
                    <div className='sec1_transaction_contaner'>
                        <div className='list_transaction'>
                            {this.state.transaction.length > 0 ? (
                                this.state.transaction.map((item) => (
                                    <div className='transaction_item'>
                                        <p className='des'>{item.description} - <span className='date'>ngày <span>{item.date_create}</span></span></p>
                                        <p className='price'>Số tiền: <span className={item.price > 0 ? "cong" : "tru"}>{item.price > 0 ? "+" : ""}{typeof (item.price) === 'number' ? item.price.toLocaleString() : item.price} VNĐ</span></p>
                                        <p className='balance'>Số dư: <span>{typeof (item.balance) === 'number' ? item.balance.toLocaleString() : item.balance} VNĐ</span></p>
                                    </div>
                                ))
                            ) :
                                (<Error index={8} />)}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
