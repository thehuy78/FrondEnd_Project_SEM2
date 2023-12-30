import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class FileNotFound extends Component {
    render() {
        return (
            <>
                <section style={{ paddingTop: '9rem', width: '100%', backgroundColor: 'var(--primary)', height: '100vh', maxHeight: '50rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ margin: 'auto', width: '100%', maxWidth: '1180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={require('../assets/image/logo/404.JPG')} alt='' style={{ width: '40%', marginBottom: '2rem' }} />
                        <p style={{ fontWeight: '600', fontSize: '1.2rem' }}>Trang bạn tìm kiếm không đúng hoặc không tồn tại !.</p>
                        <Link to='/' className='link_navbar'><p
                            style={{
                                display: 'flex', borderRadius: '0.5rem',
                                boxShadow: '0 0 0.5rem var(--shadow)', padding: '0.2rem 2rem', margin: '0.5rem 0',
                                color: 'var(--second)', alignItems: 'center'
                            }}>
                            <i class="fa-solid fa-house" style={{ marginRight: '1rem' }}></i>Trở về trang chủ</p></Link>
                    </div>
                </section>
            </>
        )
    }
}
