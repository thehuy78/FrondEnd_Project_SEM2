import React, { Component } from 'react'
import Question from '../component/Question'

export default class Instruct1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 1,
        }
    }
    componentDidMount() {
        this.setState({
            list: 1
        })
    }
    handellist = (number) => {
        this.setState({
            list: number
        })
    }
    render() {
        const { topic } = this.props;

        return (
            <>
                <section className={topic === 1 ? 'instruct_child_1' : 'hide'}>
                    <div className='instruct_child_1_component'>
                        <div className='block1'>
                            <div>
                                <p>Hướng dẫn đặt lịch khám</p>
                                <p>Để hỗ trợ Quý khách hàng thuận tiện khi đặt lịch khám online, <span>Medcare</span>  xin hướng dẫn Quy trình thực hiện các bước như sau:</p>
                            </div>
                        </div>
                        <div className='block2'>
                            <p className='title'>CHỌN THÔNG TIN ĐẶT KHÁM</p>
                            <p><i class="fa-solid fa-check"></i>Đăng nhập phần mềm trên web hoặc ứng dụng di động.</p>
                            <p><i class="fa-solid fa-check"></i>Chọn Đặt khám tại cơ sở hoặc Đặt khám theo bác sĩ</p>
                            <p><i class="fa-solid fa-check"></i>Chọn thông tin khám: Chuyên khoa, bác sĩ, ngày khám, giờ khám và có BHYT hay không.</p>
                            <p><i class="fa-solid fa-check"></i>Nhập thông tin bệnh nhân: Chọn hồ sơ sẵn có hoặc tạo mới hồ sơ</p>

                            <p className='title'>CHỌN/ TẠO MỚI HỒ SƠ BỆNH NHÂN (Bạn được phép tạo tối đa 10 hồ sơ)</p>
                            <p><i class="fa-solid fa-check"></i>Cách 1: Quét mã BHYT</p>
                            <p><i class="fa-solid fa-check"></i>Cách 2: Nếu đã từng khám ở bệnh viện, nhập số hồ sơ.</p>
                            <p><i class="fa-solid fa-check"></i>Cách 3: Chưa từng khám, đăng ký mới (nhập đầy đủ các thông tin: Họ và tên; Ngày sinh; Giới tính; Mã bảo hiểm y tế; CMND/Passport; Dân tộc; Nghề nghiệp; Số điện thoại; Email; Địa chỉ)</p>

                            <p className='title'>THANH TOÁN PHÍ KHÁM</p>
                            <p><i class="fa-solid fa-check"></i>Chọn phương thức thanh toán: Quét mã QR, Chuyển khoản 24/7, Thẻ khám bệnh, Thẻ thanh toán quốc tế hoặc thẻ ATM nội địa hoặc Ví điện tử.</p>
                            <p><i class="fa-solid fa-check"></i>Kiểm tra thông tin thanh toán (phí khám bệnh, phí tiện ích và tổng tiền) và Xác nhận thanh toán.</p>
                            <p><i class="fa-solid fa-check"></i>Thực hiện thanh toán trên Ví điện tử hoặc Ứng dụng Ngân hàng hoặc Cổng thanh toán.</p>

                            <p className='title'>NHẬN PHIẾU KHÁM ĐIỆN TỬ</p>
                            <p><i class="fa-solid fa-check"></i>Sau khi thanh toán thành công, bạn sẽ nhận được ngay phiếu khám bệnh điện tử trên ứng dụng (và qua email). Trường hợp đặt khám qua Tổng đài 19002115, vui lòng xem phiếu khám được gửi qua tin nhắn SMS.</p>

                        </div>
                        <div className='block3'>
                            <p>Khám và thực hiện cận lâm sàng</p>
                            <p>Đến ngày khám, người bệnh vui lòng đến trực tiếp phòng khám hoặc quầy tiếp nhận theo như hướng dẫn trên phiếu khám.</p>
                            <p>Người bệnh được khám lâm sàng theo quy trình của Bệnh viện.</p>
                            <p>Nếu có chỉ định cận lâm sàng của bác sĩ, người bệnh thanh toán phí trực tuyến hoặc tại quầy thu ngân của bệnh viện và vào phòng cận lâm sàng để được thực hiện.</p>
                            <p>Người bệnh quay lại phòng khám ban đầu, sau khi nhận đầy đủ kết quả cận lâm sàng, để được bác sĩ khám, tư vấn và trả kết quả khám (toa thuốc, giấy hẹn khám,...).</p>
                        </div>
                    </div>
                </section>
                <section className={topic === 2 ? 'instruct_child_1' : 'hide'}>
                    <div className='instruct_child_2_component'>
                        <p className='header'>Hướng Dẫn Sử Dụng Dịch Vụ Tư vấn Khám Bệnh Từ Xa trên Ứng Dụng Medcare</p>
                        <p >Ứng dụng Medcare đã mang đến một sự tiện lợi không giới hạn với dịch vụ Telemedicine - Tư Vấn Khám Bệnh Từ Xa, cho phép bạn được tư vấn khám bệnh với các chuyên gia y tế từ xa. Hãy cùng chúng tôi khám phá cách đăng ký và sử dụng dịch vụ Telemedicine - Tư Vấn Khám Bệnh Từ Xa thông qua Medcare.</p>
                        <p className='title'>1. Các phương thức sử dụng Tư vấn khám bệnh từ xa trên Medcare</p>
                        <p>Telemedicine chưa bao giờ dễ dàng hơn với ứng dụng Medcare. Tại đây, bạn có thể đặt lịch tư vấn khám bệnh từ xa thông qua 3 cách:</p>
                        <p>- Tính năng "Tư vấn khám bệnh từ xa"</p>
                        <p>- Banner "Tư vấn sức khỏe từ xa"</p>
                        <p>- Banner "Tư vấn khám sức khỏe cùng bác sĩ chuyên khoa".</p>
                        <div className='box_img1'>
                            <img src={require('../assets/image/instruct/im1.png')} alt='' />
                            <img src={require('../assets/image/instruct/im2.png')} alt='' />
                            <img src={require('../assets/image/instruct/im3.png')} alt='' />
                        </div>
                        <p >Để tham gia tư vấn khám bệnh từ xa với các chuyên gia y tế đang làm việc tại các bệnh viện danh tiếng như Nhi Đồng, Đại Học Y Dược, Trưng Vương...- đối tác của Medcare, bạn có thể tuân theo các bước sau đây:</p>
                        <p><b>Bước 1:</b> Lựa chọn Chuyên Khoa hoặc bác sĩ mà bạn muốn đặt lịch tư vấn khám bệnh từ xa</p>
                        <p><b>Bước 2:</b> Chọn dịch vụ tư vấn khám bệnh phù hợp với chuyên khoa mà bạn cần</p>
                        <p><b>Bước 3:</b> Xác định thời gian tư vấn khám bệnh phù hợp với lịch trình của bạn</p>
                        <p><b>Bước 4:</b> Xác nhận thông tin và lựa chọn hồ sơ bệnh nhân (nếu bạn đã từng đăng ký khám trước đây) hoặc tạo một hồ sơ bệnh nhân mới (nếu bạn là bệnh nhân mới)</p>
                        <p><b>Bước 5:</b> Hoàn tất đặt lịch khám và tiến hành thanh toán.</p>
                        <p >Sau khi thanh toán thành công, bạn sẽ nhận được phiếu khám bệnh trên ứng dụng Medcare. Vào ngày hẹn, bạn chỉ cần mở ứng dụng và kết nối vào thời gian đã đặt trước để có cuộc tư vấn với các bác sĩ chuyên ngành mà không cần phải đến bất kỳ cơ sở y tế nào.</p>
                        <p className='title'>Tư vấn khám bệnh từ xa an toàn với các tính năng cần cấp quyền cho ứng dụng Medcare</p>
                        <p >Để sử dụng tính năng Telemedicine - Tư Vấn Khám Bệnh Từ Xa một cách an toàn, bạn cần cấp quyền thông báo cũng như truy cập một số tiện ích cho ứng dụng Medcare. Hãy làm theo hướng dẫn dưới đây:</p>
                        <p className='title'>a: Cấp quyền thông báo</p>
                        <p >Để có thể nhận thông báo, tin nhắn và cuộc gọi từ Medcare, người dùng cần phải cho phép ứng dụng gửi thông báo. Khi bạn khởi động ứng dụng và chưa cấp quyền, bạn sẽ nhận được một yêu cầu cấp quyền gửi thông báo hoặc từ chối nó. Nếu bạn từ chối quyền gửi thông báo từ Medcare, bạn sẽ không thể nhận các cuộc gọi từ các bác sĩ trong dịch vụ tư vấn và khám bệnh từ xa của Medcare.</p>
                        <img src={require('../assets/image/instruct/im4.jpg')} alt='' />
                        <p className='title'>b: Cấp quyền cho phép hiển thị ưu tiên lên trên ứng dụng khác</p>
                        <p>Để cho phép các thông báo về tin nhắn và cuộc gọi từ Medcare hiển thị trên các ứng dụng khác, bạn có thể thực hiện theo hai cách:</p>
                        <p><b>Cách 1:</b> Cấp quyền truy cập trực tiếp từ ứng dụng Medcare</p>
                        <p>Mở tính năng Tư vấn khám bệnh từ xa trên ứng dụng Medcare</p>
                        <p>Chọn tùy chọn "Đặt lịch" trong phần "Đặt lịch hẹn"</p>
                        <p>Hoặc bạn có thể chọn banner có tiêu đề "Tư vấn sức khỏe từ xa".</p>
                        <p>Sau khi bạn đã thực hiện bước trên và chọn đồng ý trong hộp thoại xuất hiện, bạn sẽ được dẫn đến mục "Thông tin về ứng dụng." Tại đây, bạn có thể bật tùy chọn "Hiển thị trên các ứng dụng khác."</p>
                        <img src={require('../assets/image/instruct/im5.png')} alt='' />
                        <p>Lưu ý: Hệ điều hành iOS không cần cấp quyền này.</p>
                        <p><b>Cách 2:</b> Cấp quyền từ cài đặt thiết bị</p>
                        <p>Nhấn và giữ vào biểu tượng ứng dụng Medcare trên màn hình chính của thiết bị</p>
                        <p>Chọn "Thông tin về ứng dụng" hoặc "Cài đặt ứng dụng," sau đó tìm đến mục "Quyền" hoặc "Ứng dụng"</p>
                        <p>Tìm và chọn "Truy cập Bộ nhớ"</p>
                        <p>Cuối cùng, bật tùy chọn "Bật cho phép".</p>
                        <div className='box_img1'>
                            <img src={require('../assets/image/instruct/im6.png')} alt='' />
                            <img src={require('../assets/image/instruct/im7.jpg')} alt='' />
                            <img src={require('../assets/image/instruct/im8.png')} alt='' />
                        </div>
                        <p className='title'>c: Cấp quyền cho phép truy cập Kho lưu trữ</p>
                        <p>Để có thể chia sẻ ảnh, video hoặc tải tài liệu trong quá trình tư vấn, bạn cần cấp quyền truy cập vào kho lưu trữ cho Medcare bằng các bước sau:</p>
                        <p>Trên trang chủ của ứng dụng Medcare, chọn "Phiếu khám"</p>
                        <p>Tiếp theo, tại mục "Nhắn tin", chọn "Tải tệp tin"</p>
                        <p>Xuất hiện một hộp thoại yêu cầu quyền truy cập vào bộ nhớ</p>
                        <p>Bạn cần bật tùy chọn "Cho phép" để cấp quyền truy cập.</p>
                        <img src={require('../assets/image/instruct/im10.jpg')} alt='' />
                        <p className='title'>d: Cấp quyền cho phép truy cập Camera và Microphone</p>
                        <p>Để thực hiện cuộc gọi video và âm thanh trên Medcare, bạn cần cấp quyền truy cập cho ứng dụng đối với Camera và Microphone. Dưới đây là hai cách để cấp quyền truy cập:</p>
                        <p>Cách 1: Cấp quyền trực tiếp từ ứng dụng Medcare</p>
                        <p>Trên màn hình chính của ứng dụng, truy cập "Trang chủ"</p>
                        <p>Để tham gia vào cuộc gọi, bạn có thể bấm vào tùy chọn "Vào khám" hoặc đợi cho đến khi Bác sĩ gọi đến.</p>
                        <p>Khi bạn đã ở trong giao diện cuộc gọi, sẽ xuất hiện một hộp thoại yêu cầu quyền truy cập Camera và Microphone. Bạn cần bật tùy chọn "Cho phép" cho cả Camera và Microphone.</p>
                        <p>Cách 2: Cấp quyền từ cài đặt thiết bị</p>
                        <p>Mở "Cài đặt" trên thiết bị di động của bạn</p>
                        <p>Tìm và chọn "Thông tin về ứng dụng" hoặc "Cài đặt ứng dụng"</p>
                        <p>Chọn "Quyền" hoặc "Ứng dụng"</p>
                        <p>Tìm và chọn "Truy cập Camera" và "Truy cập Microphone"</p>
                        <p>Bật tùy chọn "Bật cho phép khi dùng ứng dụng" cho cả Camera và Microphone.</p>
                        <div className='box_img1'>

                            <img src={require('../assets/image/instruct/im11.png')} alt='' />
                            <img src={require('../assets/image/instruct/im12.jpg')} alt='' />
                        </div>
                        <p className='title'>Hướng dẫn vào phòng chờ và nhận cuộc gọi</p>
                        <p>Để tham gia vào cuộc tư vấn khám bệnh từ xa một cách chủ động hơn, người dùng có thể thực hiện các bước sau trên ứng dụng Medcare để tham gia phòng chờ và nhận cuộc gọi từ bác sĩ:</p>
                        <p>Mở ứng dụng Medcare: Khởi động ứng dụng Medcare trên thiết bị của bạn</p>
                        <p>Chọn Phiếu khám đã đặt: Trong giao diện chính, chọn phiếu khám mà bạn đã đặt trước đó</p>
                        <p>Nhấn "Vào khám": Sau khi chọn phiếu khám, nhấn tùy chọn "Vào khám." Đây là bước bạn chờ để bác sĩ kết nối với bạn.</p>
                        <p>Khi bác sĩ gọi đến, bạn sẽ nhận được thông báo trên ứng dụng và có thể chấp nhận cuộc gọi để bắt đầu cuộc tư vấn khám bệnh.</p>
                        <div className='box_img1'>
                            <img src={require('../assets/image/instruct/im13.png')} alt='' />
                            <img src={require('../assets/image/instruct/im14.jpg')} alt='' />
                            <img src={require('../assets/image/instruct/im15.png')} alt='' />
                        </div>
                        <p className='title'>Các thao tác khác trong cuộc gọi tư vấn khám bệnh từ xa</p>
                        <p>Trong cuộc gọi Telemedicine - Tư Vấn Khám Bệnh Từ Xa trên ứng dụng Medcare, bạn có thể tương tác một cách dễ dàng với các bác sĩ thông qua các tùy chọn trên màn hình ứng dụng, bao gồm:</p>
                        <p>Xoay và phóng to camera: Điều chỉnh góc máy và chất lượng hình ảnh để hiển thị một cách tốt nhất.</p>
                        <p>Tắt/Mở mic và camera: Quản lý âm thanh và hình ảnh trong cuộc gọi, cho phép bạn tắt hoặc bật micro và camera theo nhu cầu.</p>
                        <p>Gửi tin nhắn: Trong cuộc gọi, bạn có thể gửi tin nhắn hoặc chia sẻ hình ảnh và tài liệu với bác sĩ để trao đổi thông tin một cách thuận tiện.</p>
                        <p>Kết thúc cuộc gọi: Khi cuộc tư vấn hoặc khám bệnh đã hoàn thành, bạn có thể kết thúc cuộc gọi bằng cách chọn tùy chọn này.</p>
                        <img src={require('../assets/image/instruct/im16.jpg')} alt='' />
                        <p>Medcare đang tạo ra một sự kết nối mạnh mẽ giữa bạn và sức khỏe của mình thông qua Telemedicine - Dịch vụ tư vấn khám bệnh từ xa. Đăng ký và trải nghiệm ngay hôm nay để thấy sự tiện lợi và chất lượng của dịch vụ này.</p>
                    </div>


                </section>
                <section className={topic === 3 ? 'instruct_child_1' : 'hide'}>
                    <div className='instruct_child_1_component'>
                        <div className='block1'>
                            <div>
                                <p>Quy trình hoàn phí</p>
                                <p>Để hỗ trợ Quý khách hàng thuận tiện trong vấn đề chi phí, <span>Medcare</span>  xin hướng dẫn Quy trình hoàn phí như sau:</p>
                            </div>
                        </div>
                        <div className='block2'>
                            <p className='title'>ĐIỀU KIỆN ĐỂ ĐƯỢC HOÀN TIỀN</p>
                            <p><i class="fa-solid fa-check"></i> Bạn chỉ được hoàn tiền khi thực hiện thành công yêu cầu Hủy Phiếu Khám Bệnh trên phần mềm theo theo quy định</p>

                            <p className='title'>CÁC BƯỚC HOÀN TIỀN</p>
                            <p><i class="fa-solid fa-check"></i>Khi bạn thực hiện việc thanh toán bằng phương thức nào, thì phần mềm sẽ hoàn tiền lại cho bạn bằng đúng phương thức và số tài khoản đã dùng để thanh toán đó.</p>


                            <p className='title'>THỜI GIAN HOÀN TIỀN</p>
                            <p><i class="fa-solid fa-check"></i>Thẻ khám bệnh: 1 - 30 ngày làm việc</p>
                            <p><i class="fa-solid fa-check"></i>Thẻ ATM nội địa: 1 - 30 ngày làm việc</p>
                            <p><i class="fa-solid fa-check"></i>Thẻ tín dụng Visa, MasterCard: 1 - 45 ngày làm việc</p>
                            <p><i class="fa-solid fa-check"></i>Tính từ thời điểm bạn thực hiện Hủy Phiếu Khám Bệnh thành công, nếu quá thời gian trên bạn vẫn chưa nhận được tiền hoàn, vui lòng liên hệ tổng đài 1900 2115 chúng tôi sẽ hỗ trợ bạn.</p>

                        </div>

                    </div>
                </section>
                <section className={topic === 4 ? 'instruct_child_4' : 'hide'}>
                    <div className='instruct_child_4_component'>
                        <div className='box_topic'>
                            <ul>
                                <p>Danh sách câu hỏi</p>
                                <li onClick={() => this.handellist(1)} className={this.state.list === 1 ? "choice" : ''}><i class="fa-solid fa-caret-up fa-rotate-90"></i>Vấn đề chung</li>
                                <li onClick={() => this.handellist(2)} className={this.state.list === 2 ? "choice" : ''}><i class="fa-solid fa-caret-up fa-rotate-90"></i>Vấn đề tài khoản</li>
                                <li onClick={() => this.handellist(3)} className={this.state.list === 3 ? "choice" : ''}><i class="fa-solid fa-caret-up fa-rotate-90"></i>Vấn đề về quy trình đặt khám</li>
                                <li onClick={() => this.handellist(4)} className={this.state.list === 4 ? "choice" : ''}><i class="fa-solid fa-caret-up fa-rotate-90"></i>Vấn đề về thanh toán</li>
                            </ul>
                        </div>
                        <div className='list_question'>
                            <Question
                                list={this.state.list}
                            />
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
