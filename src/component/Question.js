import React, { Component } from "react";

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        }
    }


    componentDidMount() {
        this.setState({ answer: 0 })
    }
    onclickquestion = (number) => {
        this.setState({ answer: number })
        if (this.state.answer === number) {
            this.setState({ answer: 0 })
        }
    }
    render() {
        const { list } = this.props;
        return (
            <>
                <section className={list === 1 ? "instruct_question" : "hide"}>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(1)}>
                            <p>
                                Lợi ích khi sử dụng phần mềm đăng ký khám bệnh trực tuyến này là
                                gì?
                            </p>
                            <i class={this.state.answer === 1 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 1 ? 'answer' : 'hide'}>
                            <p>
                                Đặt lịch khám bệnh theo hẹn, mọi lúc mọi nơi, mà không cần đến
                                bệnh viện
                            </p>
                            <p>- Không xếp hàng chờ đợi để lấy số tiếp nhận khám bệnh</p>
                            <p>- Giảm thời gian chờ khám tại bệnh viện.</p>
                            <p>- Thanh toán trực tuyến từ xa, không sử dụng tiền mặt</p>
                            <p>- Nhận thông tin phiếu khám bệnh điện tử qua phần mềm</p>
                            <p>
                                - Chủ động chọn lịch khám ( ngày khám, khung giờ khám, bác sỹ
                                khám )
                            </p>
                            <p>- Nhắc lịch tái khám, đặt lịch tái khám tự động</p>
                            <p>- Tra cứu kết quả khám chữa bệnh trực tuyến qua phần mềm.</p>
                            <p>
                                - Thanh toán viện phí, chi phí khám chữa bệnh trực tuyến, mọi
                                lúc mọi nơi
                            </p>
                            <p>
                                - Dễ dàng tiếp cận và nhận các thông báo mới, thông tin từ bệnh
                                viện
                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(2)}>
                            <p>
                                Làm sao để sử dụng được phần mềm đăng ký khám bệnh trực tuyến?
                            </p>
                            <i class={this.state.answer === 2 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 2 ? 'answer' : 'hide'}>
                            <p>
                                Có thể truy cập và sử dụng phần mềm trên tất cả thiết bị có thể
                                truy cập mạng internet. ( 3G,4G,5G,Wifi, dây mạng…..)
                            </p>
                            <p>Máy tính bàn, laptop: truy cập website</p>
                            <p>
                                Hầu hết điện thoại thông minh: tải ứng dụng phần mềm tại kho tải
                                Gplay hoặc AppStore
                            </p>
                            <p>Máy tính bảng và các thiết bị khác ……</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(3)}>
                            <p>Đăng ký khám bệnh online có mất phí không?</p>
                            <i class={this.state.answer === 3 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 3 ? 'answer' : 'hide'}>
                            <p>
                                Có phí tiện ích, khi sử dụng dịch vụ đăng ký khám bệnh trực
                                tuyến qua phần mềm ( tương tự phí cước viễn thông qua tổng đài )
                            </p>
                            <p>
                                Hiện tại chỉ mất phí khi đăng ký khám bệnh thành công, ngoài ra
                                việc sử dụng ứng dụng và các tính năng khác là hoàn toàn miễn
                                phí.
                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(4)}>
                            <p>
                                Tôi có thể dùng phần mềm để đăng ký và lấy số thứ tự khám cho
                                bệnh nhân khác không?
                            </p>
                            <i class={this.state.answer === 4 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 4 ? 'answer' : 'hide'}>
                            <p>
                                Phần mềm khuyến cáo người dân, tự sử dụng phần mềm để đăng ký
                                khám bệnh cho bản thân. Để tự quản lý thông tin, hồ sơ bệnh,
                                lịch sử khám chữa bệnh, kết quả khám chữa bệnh…
                            </p>
                            <p>
                                Trường hợp nhờ người khác đăng ký qua phần mềm, hoặc chủ động
                                đăng ký giúp người khác ( như thân nhân, họ hàng, ông bà cha mẹ,
                                người thân, bạn bè , đồng nghiệp……) vẫn có thể được, nếu người
                                đó thực sự không có khả năng tiếp cận phần mềm. Nhưng những
                                trường hợp này là trái với quy định của phần mềm và an toàn bảo
                                mật thông tin của ngành y, các vấn đề phát sinh, người đặt khám
                                dùm người khác và người nhờ người khác đặt khám sẽ tự chịu trách
                                nhiệm trước pháp luật.
                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(5)}>
                            <p>Phần mềm có hỗ trợ đăng ký khám 24/7 không?</p>
                            <i class={this.state.answer === 5 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 5 ? 'answer' : 'hide'}>
                            <p>
                                Phần mềm cho phép bạn thực hiện việc đăng ký khám vào bất kỳ
                                thời điểm nào trong ngày và bất cứ ngày nào trong tuần, đảm bảo
                                bạn có thể sử dụng Phần mềm để đăng ký khám bệnh mọi lúc mọi
                                nơi, mà không cần phải đến trực tiếp bệnh viện để thực hiện.
                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(6)}>
                            <p>
                                Sau khi đăng ký khám thành công tôi nhận được phiếu khám bệnh
                                như thế nào?
                            </p>
                            <i class={this.state.answer === 6 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 6 ? 'answer' : 'hide'}>
                            <p>
                                Bạn sẽ nhận được phiếu khám bệnh điện tử trực tiếp trên phần
                                mềm. Mục quản lý “ phiếu khám bệnh”.
                            </p>
                            <p>
                                Đồng thời bạn có thể sử dụng tính năng gửi tin nhắn, để nhận
                                thông tin về phiếu khám bệnh được gửi qua tin nhắn điện thoại
                                SMS.
                            </p>
                            <p>
                                Nếu hồ sơ bệnh của bạn có khai báo thông tin email, hoặc sử dụng
                                email để đăng nhập phần mềm, bạn cũng sẽ nhận được phiếu khám
                                bệnh điện tử gửi qua email.
                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(7)}>
                            <p>Có thể thanh toán trực tuyến chi phí khám chữa bệnh bằng những phương thức nào?
                            </p>
                            <i class={this.state.answer === 7 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 7 ? 'answer' : 'hide'}>
                            <p>
                                Thẻ quốc tế Visa , Master ,JCB
                            </p>
                            <p>Thẻ ATM nội địa/ InternetBanking (thẻ phải được kích hoạt tính năng thanh toán trực tuyến)</p>
                            <p>
                                Ví điện tử MOMO,SMART PAY
                            </p>
                            <p>Quét QRCode/ Mobile Banking</p>
                            <p>Thanh toán đại lý (các cửa hàng tiện lợi)</p>
                            <p>Hỗ trợ thanh toán (chuyển khoản)</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(8)}>
                            <p>Làm sao tôi biết được là đã thanh toán thành công?</p>
                            <i class={this.state.answer === 8 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 8 ? 'answer' : 'hide'}>
                            <p>
                                Khi thanh toán thành công, tiền khám chữa bệnh sẽ được trừ thành công trên  tài khoản thanh toán của bạn qua phương thức thanh toán bạn đã chọn.
                            </p>
                            <p>
                                Đồng thời sẽ có thông tin xác nhận giao dịch thành công, biên lai thanh toán, mã giao dịch, mã thanh toán cho giao dịch thành công.
                            </p>
                            <p>Hệ thống cũng sẽ cấp ngay phiếu khám bệnh điện tử khi bạn đặt khám thành công.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(9)}>
                            <p>
                                Tôi có thể đặt khám cho người nhà tôi được không?
                            </p>
                            <i class={this.state.answer === 9 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 9 ? 'answer' : 'hide'}>
                            <p>
                                Quý khách có thể tạo tối đa 10 hồ sơ bệnh nhân. Quý khách đặt khám cho bệnh nhân nào thì chọn hồ sơ bệnh nhân đó.
                            </p>
                            <p>
                                Phần mềm và bệnh viện khuyến cáo, trừ trường hợp bất khả kháng, không nên đặt dùm cho người khác vì quy định an toàn bảo mật thông tin sức khỏe mỗi người.
                            </p>
                            <p>Mọi vấn đề phát sinh từ việc đặt khám cho người khác, cá nhân người đặt sẽ chịu hoàn toàn trách nhiệm trước pháp luật.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(10)}>
                            <p>Đối tượng bệnh nhân nào có thể sử dụng qua phần mềm?</p>
                            <i class={this.state.answer === 10 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 10 ? 'answer' : 'hide'}>
                            <p>
                                Tất cả người bệnh đều có thể sử dụng phần mềm để đăng ký khám bệnh trực tuyến,nếu đủ điều kiện tiếp cận và sử dụng phần mềm.
                            </p>
                            <p>Phần mềm phù hợp cho những người bệnh có kế hoạch khám chữa bệnh chủ động, hoặc tình trạng bệnh KHÔNG quá khẩn cấp.</p>
                            <p>Trong trường hợp CẤP CỨU, người nhà nên đưa người bệnh đến cơ sở y tế gần nhất hoặc gọi số cấp cứu 115 để được hỗ trợ.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(11)}>
                            <p>Sau khi đã đăng ký khám thành công qua phần mềm, có thể hủy phiếu khám không?</p>
                            <i class={this.state.answer === 11 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 11 ? 'answer' : 'hide'}>
                            <p>
                                Bạn có thể chủ động hủy phiếu khám đã đặt thành công, nếu kế hoạch khám chữa bệnh cá nhân có thay đổi.
                            </p>
                            <p>Hoặc trong 1 số trường hợp, bệnh viện có quyền từ chối phiếu khám nếu có sự sai lệch thông tin bệnh nhân, sai thông tin phiếu khám, hoặc có vấn đề bất khả kháng phát sinh từ phía bệnh viện.</p>
                            <p>Bạn đều sẽ được hoàn tiền lại nếu chưa thực sự đặt khám và khám thành công (nhưng phải tuân theo quy định của phần mềm và bệnh viện).</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(12)}>
                            <p>Tôi đến bệnh viện trễ hơn so với giờ khám đã đăng ký, vậy tôi có được khám hay không?</p>
                            <i class={this.state.answer === 12 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 12 ? 'answer' : 'hide'}>
                            <p>
                                Trường hợp bạn đến trễ so với giờ hẹn trên phiếu khám bệnh, bạn vẫn có thể đến bệnh viện để được thăm khám, nhưng mọi sự tiếp nhận và thời gian khám bệnh sẽ theo sự sắp xếp của bệnh viện, tùy vào tình hình thực tế tại bệnh viện và phòng khám lúc đó.
                            </p>

                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(13)}>
                            <p>Chức năng của tổng đài 1900-2115</p>
                            <i class={this.state.answer === 13 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 13 ? 'answer' : 'hide'}>
                            <p>
                                Tổng đài 1900-2115 là dịch vụ chăm sóc khách hàng của MedPro, được thiết kế để cung cấp thông tin và hỗ trợ về các dịch vụ y tế, đặc biệt là tư vấn hướng dẫn đặt khám nhanh trên Ứng dụng Medpro. Qua tổng đài này, quý khách có thể tìm hiểu thông tin về các bệnh viện, phòng khám, chuyên khoa, và các bác sĩ hoạt động trong hệ thống của MedPro.                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(14)}>
                            <p>Chi tiết cước phí của tổng đài 1900-2115</p>
                            <i class={this.state.answer === 14 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 14 ? 'answer' : 'hide'}>

                            <p>Bắt đầu tính phí sau 11 giây.</p>
                            <p>Cước phí 3,000đ/phút</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(15)}>
                            <p>Thời gian làm việc của tổng đài 1900-2115</p>
                            <i class={this.state.answer === 15 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 15 ? 'answer' : 'hide'}>
                            <p>
                                Dịch vụ tổng đài 1900-2115 hoạt động 7 ngày 1 tuần từ 6h đến 22h, giúp quý khách hàng có thể liên hệ và đặt lịch bất kỳ lúc nào phù hợp với lịch trình cá nhân.                            </p>

                        </div>
                    </div>
                </section>
                <section className={list === 2 ? "instruct_question" : "hide"}>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(16)}>
                            <p>Mã số bệnh nhân là gì ? Làm sao tôi có thể biết được mã số bệnh nhân của mình?</p>
                            <i class={this.state.answer === 16 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 16 ? 'answer' : 'hide'}>
                            <p>
                                Mã số bệnh nhân là số hồ sơ mà bệnh viện dùng để quản lý thông tin của bạn trên hệ thống dữ liệu của bệnh viện.
                            </p>
                            <p>Để biết được mã số bệnh nhân của mình, bạn có thể tham khảo gợi ý về cách tìm mã số bệnh nhân, và tìm thấy trong các loại giấy tờ như: toa thuốc, phiếu chỉ định cận lâm sàng, các biên lai thu tiền…</p>

                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(17)}>
                            <p>Tôi quên mã số bệnh nhân của mình thì phải làm sao?</p>
                            <i class={this.state.answer === 17 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 17 ? 'answer' : 'hide'}>
                            <p>
                                Để tìm lại mã số bệnh nhân, bạn có thể xem qua gợi ý về cách tìm lại mã số bệnh nhân, và tìm lại trong các loại giấy tờ khám chữa bệnh của mình.</p>
                            <p>Hoặc mở tính năng "Tôi quên mã số bệnh nhân" &gt; nhập chính xác các thông tin yêu cầu &gt; bấm "Xác nhận" &gt; và chọn hồ sơ của mình trong danh sách kết quả.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(18)}>
                            <p>Làm sao tôi biết bên mình đã có mã số bệnh nhân chưa?</p>
                            <i class={this.state.answer === 18 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 18 ? 'answer' : 'hide'}>
                            <p>
                                Nếu bạn đã từng thực hiện việc khám chữa bệnh tại bệnh viện, đồng nghĩa với việc bạn đã có “mã số bệnh nhân” trên hệ thống của bệnh viện.
                            </p>
                            <p>Khi đó, hãy tìm lại mã số bệnh nhân của bạn trong các loại giấy tờ khám chữa bệnh, hoặc bạn có thể sử dụng tính năng “Tôi quên mã số bệnh nhân” để tìm lại mã số bệnh nhân của mình ngay trên phần mềm.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(19)}>
                            <p>Tôi có thể chọn tùy ý một hồ sơ bệnh nhân của người khác để đăng ký khám bệnh cho mình không?</p>
                            <i class={this.state.answer === 19 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 19 ? 'answer' : 'hide'}>

                            <p>Trong trường hợp bạn cố tình hay nhầm lẫn dùng hồ sơ bệnh nhân của người khác hoặc khai báo sai thông tin để đăng ký khám bệnh, bạn đã vi phạm điều khoản sử dụng của phần mềm và quy định tại bệnh viện. </p>
                            <p>Bệnh viện sẽ từ chối khám chữa bệnh, bạn sẽ chịu hoàn toàn những thiệt hại và tùy mức độ có thể chịu trách nhiệm trước pháp luật.</p>
                            <p>Vì vậy, khi đăng ký khám bệnh bạn vui lòng chọn/nhập và kiểm tra chính xác hồ sơ bệnh nhân của mình!</p>
                        </div>
                    </div>
                </section>
                <section className={list === 3 ? "instruct_question" : "hide"}>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(20)}>
                            <p>Có thể đăng ký khám bệnh trong ngày bằng phần mềm không?</p>
                            <i class={this.state.answer === 20 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 20 ? 'answer' : 'hide'}>
                            <p>
                                Hiện tại bệnh viện hỗ trợ cả đặt khám đăng ký trong ngày, cho phép đặt khám trước 30 phút. Nhưng bạn không được huỷ phiếu khám trong ngày.
                            </p>

                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(21)}>
                            <p>Có thể đăng ký khám bệnh trong khoảng thời gian nào?</p>
                            <i class={this.state.answer === 21 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 21 ? 'answer' : 'hide'}>
                            <p>
                                Bạn có thể đăng ký khám bệnh qua phần mềm, mọi lúc mọi nơi. Có thể đặt lịch hẹn khám bệnh trước ngày khám đến 30 ngày.
                            </p>

                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(22)}>
                            <p>Khi đi khám bệnh, tôi có cần chuẩn bị gì không?</p>
                            <i class={this.state.answer === 22 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 22 ? 'answer' : 'hide'}>
                            <p>
                                <b>Đối với Người bệnh có thẻ Bảo hiểm y tế:</b>
                            </p>
                            <p>Vui lòng mang thẻ BHYT và giấy tờ tuỳ thân, và đến cửa tiếp nhận số 1trước hẹn 15 phút để được hướng dẫn vào phòng khám.</p>
                            <p>
                                <b>Đối với Người bệnh KHÔNG có thẻ Bảo hiểm y tế:</b>
                            </p>
                            <p>Bệnh nhân vui lòng đến trước giờ hẹn 15 phút, xuất trình phiếu khám bệnh điện tử và giấy tờ tùy thân để được hướng dẫn vào phòng khám bệnh.</p>                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(23)}>
                            <p>Tôi có việc đột xuất hoặc bận không đến khám được, tôi muốn huỷ phiếu khám có được không?</p>
                            <i class={this.state.answer === 23 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 23 ? 'answer' : 'hide'}>
                            <p>Quý khách chủ động thực hiện việc hủy phiếu trên phần mềm.</p>
                            <p>Tiền khám bệnh sẽ hoàn lại tài khoản của bệnh nhân đã sử dụng thanh toán. Phí tiện ích sẽ không được hoàn trả.</p>
                            <p>Thời gian nhận lại tiền khám trong tài khoản: từ 1 - 3 ngày (đối với ví điện tử MOMO).</p>
                            <p>Các loại thẻ ATM nội địa: từ 01 đến 05 ngày làm việc.</p>
                            <p>Thẻ thanh toán quốc tế (Visa/MasterCard…): từ 05 đến 45 ngày làm việc.</p>
                            <p>Trường hợp khách hàng thanh toán bằng các cửa hàng tiện lợi mà muốn huỷ phiếu khám bệnh,khách hàng vui lòng đến cửa hàng tiện lợi cung cấp đầy đủ thông tin và cửa hàng sẽ kiểm tra hoàn tiền lại (Tuỳ theo cửa hàng có thể nhanh hoặc chậm).</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(24)}>
                            <p>Tôi có thể thay đổi thông tin khám đã đặt qua phần mềm không?</p>
                            <i class={this.state.answer === 24 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 24 ? 'answer' : 'hide'}>
                            <p>Bạn không thể thay đổi thông tin khám trên phiếu khám bệnh đã đặt thành công.</p>

                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(25)}>
                            <p>Phần mềm có cho đăng ký khám bệnh với đối tượng bệnh nhân bhyt không?</p>
                            <i class={this.state.answer === 25 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 25 ? 'answer' : 'hide'}>
                            <p>Hiện tại bệnh viện chỉ hỗ trợ bệnh nhân đăng ký khám dịch vụ qua ứng dụng.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(26)}>
                            <p>Nếu bác sĩ thay đổi lịch khám, tôi phải làm sao?</p>
                            <i class={this.state.answer === 26 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 26 ? 'answer' : 'hide'}>
                            <p>Khi bác sĩ thay đổi lịch khám, phần mềm sẽ gửi thông báo cho bạn qua tin nhắn sms, email và trên ứng dụng.Khi nhận được thông báo về sự thay đổi. Bạn có thể:</p>
                            <p>Hủy Phiếu Khám Bệnh để nhận lại tiền khám theo quy định hoàn tiền.</p>
                            <p>Vẫn giữ nguyên thông tin trên Phiếu Khám Bệnh, và điều này đồng nghĩa với việc bạn chấp nhận khám với bác sĩ thay thế mà bệnh viện đã sắp xếp.</p>
                            <p>Thay đổi thông tin khám trên phiếu khám bệnh, bằng cách: Đăng nhập phần mềm &gt; Thông Tin Tài Khoản &gt; Quản lý phiếu khám bệnh &gt; chọn vào phiếu khám bệnh bị thay đổi lịch khám &gt; bấm "Chỉnh sửa".</p>
                            <p>Việc thay đổi thông tin trên phiếu khám bệnh phải được thực hiện theo Quy định chỉnh sửa thông tin trên phiếu khám bệnh.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(27)}>
                            <p>Làm sao có thể chọn đúng chuyên khoa để đăng ký khám qua phần mềm?</p>
                            <i class={this.state.answer === 27 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 27 ? 'answer' : 'hide'}>
                            <p>Trường hợp tái khám, bạn chỉ việc chọn đúng chuyên khoa của lần khám trước.</p>
                            <p>Trường hợp khám mới:</p>
                            <p>Nếu biết chắc chuyên khoa mình muốn đăng ký khám, bạn chỉ việc tìm chọn chuyên khoa đó trong danh sách.</p>
                            <p>Nếu chưa biết chuyên khoa nào phù hợp, bạn có thể gọi vào tổng đài tư vấn chăm sóc khách hàng của bệnh viện hoặc tổng đài medpro <b>19002115</b> hoặc liên hệ hỗ trợ tại kênh chat mạng xã hội facebook, zalo.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(28)}>
                            <p>Tôi sẽ được khám bệnh vào đúng thời gian đã chọn, sau khi đăng ký khám qua phần mềm đúng không?</p>
                            <i class={this.state.answer === 28 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 28 ? 'answer' : 'hide'}>
                            <p>Trả lời: Có thể.</p>
                            <p>Thời gian bạn chọn khi đăng ký khám, được xem là thời gian khám bệnh dự kiến. Do đặc thù của công tác khám chữa bệnh, sẽ không thể chính xác thời gian khám 100%.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(29)}>
                            <p>Tôi đăng ký đã bị trừ tiền nhưng sao không nhận được mã số khám bệnh?</p>
                            <i class={this.state.answer === 29 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 29 ? 'answer' : 'hide'}>
                            <p>Bạn vui lòng kiểm tra thông tin phiếu khám trong tài khoản trên phần mềm. Hoặc vui lòng gọi điện tổng đài 19002115 để được hỗ trợ.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(30)}>
                            <p>Tôi đã đăng ký thành công vậy khi đi khám tôi có phải xếp hàng gì không?</p>
                            <i class={this.state.answer === 30 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 30 ? 'answer' : 'hide'}>
                            <p>Không, bạn không còn phải xếp hàng chờ đợi để lấy số khám bệnh, làm thủ tục đóng tiền, bạn chỉ cần đến cửa tiếp nhận số 1 để được hướng dẫn vào phòng khám.</p>
                        </div>
                    </div>

                </section>

                <section className={list === 4 ? "instruct_question" : "hide"}>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(31)}>
                            <p>Điều kiện để được hoàn tiền là gì?</p>
                            <i class={this.state.answer === 31 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 31 ? 'answer' : 'hide'}>
                            <p>
                                Bạn chỉ được hoàn tiền khi thực hiện thành công yêu cầu Hủy Phiếu Khám Bệnh trên phần mềm theo theo quy định.                            </p>

                        </div>
                    </div>

                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(32)}>
                            <p>Hoàn tiền như thế nào? Bao lâu thì tôi nhận lại được tiền hoàn?</p>
                            <i class={this.state.answer === 32 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 32 ? 'answer' : 'hide'}>
                            <p>
                                Khi bạn thực hiện việc thanh toán bằng phương thức nào, thì phần mềm sẽ hoàn tiền lại cho bạn bằng đúng phương thức và số tài khoản đã dùng để thanh toán đó.                            </p>
                            <p>Thời gian bạn nhận được tiền hoàn thông thường được quy định như sau:</p>
                            <p><b>Thẻ khám bệnh:  </b>1 - 30 ngày làm việc.</p>
                            <p><b>Thẻ ATM nội địa:    </b>1 - 30 ngày làm việc.</p>
                            <p><b>Thẻ tín dụng Visa, MasterCard:   </b>1 - 45 ngày làm việc.</p>
                            <p>Tính từ thời điểm bạn thực hiện Hủy Phiếu Khám Bệnh thành công, nếu quá thời gian trên bạn vẫn chưa nhận được tiền hoàn, vui lòng liên hệ tổng đài 1900 2115 chúng tôi sẽ hỗ trợ bạn.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(33)}>
                            <p>Tôi không có bất kỳ một thẻ khám bệnh hoặc thẻ ngân hàng nào để thanh toán, vậy tôi phải làm sao?</p>
                            <i class={this.state.answer === 33 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 33 ? 'answer' : 'hide'}>
                            <p>
                                Bạn có thể liên hệ nhân viên bệnh viện tại các quầy hướng dẫn trong bệnh viện để được hỗ trợ làm thẻ khám bệnh miễn phí.
                            </p>
                            <p>Nhờ con,cháu hoặc người thân trong gia đình có sử dụng các phương thức thanh toán trực tuyến để đặt khám.</p>
                            <p>
                                Đăng ký mới một trong các phương thức thanh toán trực tuyến có hỗ trợ ngay, để tiếp tục sử dụng trong tương lai.
                            </p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(34)}>
                            <p>Thông tin thanh toán của tôi có bị lộ khi tôi tiến hành thanh toán trên phần mềm không?</p>
                            <i class={this.state.answer === 34 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 34 ? 'answer' : 'hide'}>
                            <p>Trả lời : Không!</p>
                            <p>Phần mềm và bệnh viện hoàn toàn không thể sao lưu lại bất kỳ thông tin thanh toán nào của bạn.</p>
                            <p>Các thông tin của bạn được bảo mật tại cổng thanh toán và ngân hàng nhà nước việt nam.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(35)}>
                            <p>Tôi đăng nhập đúng tên tài khoản nhưng không thanh toán được?</p>
                            <i class={this.state.answer === 35 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 35 ? 'answer' : 'hide'}>
                            <p>Đối với thẻ khám bệnh/ATM nội địa phải đảm bảo đã kích hoạt tính năng thanh toán trực tuyến thì mới có thể thanh toán được. Nếu thẻ của bạn chưa kích hoạt Thanh toán trực tuyến thì vui lòng liên hệ với ngân hàng phát hành thẻ của bạn để đăng ký.</p>
                            <p>Nếu thẻ của bạn đã đăng ký thanh toán trực tuyến và nhập chính xác thông tin thanh toán nhưng vẫn không thanh toán được, vui lòng liên hệ 19002115 chúng tôi sẽ hỗ trợ bạn.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(36)}>
                            <p>Tôi muốn đăng ký khám online nhưng đến trực tiếp bệnh viện để thanh toán được không?
                            </p>
                            <i class={this.state.answer === 36 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 36 ? 'answer' : 'hide'}>
                            <p>Trả lời : không Hiện tại khi đặt khám trên phần mềm bạn vui lòng hoàn tất quy trình thanh toán ngay trên phần mềm để được nhận phiếu khám bệnh.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(37)}>
                            <p>Tôi nhập tài khoản thẻ nhưng bấm xác thực hoài không được?</p>
                            <i class={this.state.answer === 37 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 37 ? 'answer' : 'hide'}>
                            <p>Vui lòng kiểm tra chính xác thông tin thẻ đã nhập. Trường hợp vẫn bị lỗi, hãy chụp ảnh màn hình báo lỗi và gửi qua các kênh hỗ trợ, chúng tôi sẽ hỗ trợ bạn.</p>                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(38)}>
                            <p>Phí tiện ích là gì?</p>
                            <i class={this.state.answer === 38 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 38 ? 'answer' : 'hide'}>
                            <p>Khi sử dụng các dịch vụ hỗ trợ do Medpro cung cấp, người dùng sẽ thanh toán phí sử dụng dịch vụ tiện ích của Medpro sau đây gọi là "Phí tiện ích Medpro", bên cạnh phí dịch vụ y tế được công bố bởi Bệnh viện/Cơ sở y tế và phí xử lý giao dịch thanh toán trực tuyến "Phí dịch vụ thanh toán" (nếu có). "Phí tiện ích" là loại phí phát sinh khi người dùng sử dụng dịch vụ hỗ trợ của Medpro để đem lại các lợi ích thiết thực cho người dùng so với việc không sử dụng.</p>
                        </div>
                    </div>
                    <div className="box_question">
                        <div className="question" onClick={() => this.onclickquestion(39)}>
                            <p>Cách tính phí tiện ích</p>
                            <i class={this.state.answer === 39 ? "fa-solid fa-chevron-up fa-rotate-180" : "fa-solid fa-chevron-up fa-rotate-90"}></i>
                        </div>
                        <div className={this.state.answer === 39 ? 'answer' : 'hide'}>
                            <p><b>Phí tiện ích</b> = Phí tiện ích Medpro (10,000 vnđ + VAT) + Phí dịch vụ thanh toán (tùy vào hình thức thanh toán trực tuyến mà người dùng chọn)</p>
                            <p>Lưu ý: Phí dịch vụ thanh toán có thể thay đổi tùy thuộc vào tổ chức cung cấp dịch vụ thanh toán và phương thức thanh toán mà người dùng chọn.</p>
                        </div>
                    </div>

                </section>

            </>
        );
    }
}
