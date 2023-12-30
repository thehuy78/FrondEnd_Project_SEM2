import React, { Component } from "react";
import "../style/Navbar.scss";
import { Link } from "react-router-dom";


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showsearch: false,
            showmenu: false,

            choiceList: "",
            account: false,
            username: "Tài Khoản",
            scroll: true,
        };
    }
    handelsearch = (e) => {
        this.setState((prevState) => ({
            showsearch: !prevState.showsearch,
        }));
    };
    handelshowmenu = (e) => {
        this.setState((prevState) => ({
            showmenu: !prevState.showmenu,
        }));
        this.setState({
            showsearch: false,
        });
    };

    onclickmenu = (menuKey) => {
        if (menuKey === this.state.choiceList) {
            this.setState({
                choiceList: "",
            });
        } else {
            this.setState({
                choiceList: menuKey,
            });
        }
    };
    checkaccount = () => {
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === "user") {
                this.setState({
                    account: true,
                });
                const username = localStorage.getItem("user");
                this.setState({
                    username: username,
                });
            }
        }
    };
    async componentDidMount() {
        this.checkaccount();
        document.addEventListener("wheel", this.handleScroll);

        
    }

 
    componentWillUnmount() {
        document.removeEventListener("wheel", this.handleScroll);
      
    }

    handleScroll = (event) => {
        if (event.deltaY > 0) {
            this.setState({
                scroll: false,
            });
        } else if (event.deltaY < 0) {
            this.setState({
                scroll: true,
            });
        }
    };
    clickmenu = () => {
        this.setState({
            scroll: true,
        });
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    linkPosLogin = () => {
        if (localStorage.getItem("user")) {
            if (localStorage.getItem("role") === "admin") {
                return "/admin";
            } else {
                return "/information/1";
            }
        } else {
            return "/login";
        }
    };

    render() {
        return (
            <>
                <div
                    onClick={this.clickmenu}
                    className={this.state.scroll ? "navbar" : "navbar_scroll"}
                >
                    <div
                        className={
                            this.state.scroll ? "navbar_container" : "navbar_container_scroll"
                        }
                        onWheel={this.handleScroll}
                    >
                        <div className="navbar-logo">
                            <Link to="/">
                                <img
                                    src={require("../assets/image/logo/logo.png")}
                                    alt="logo"
                                />
                            </Link>
                        </div>

                        <div className="navbar-link">
                            <div className="navbar_link-top">
                                <div className="navbar_link-top-left">
                                    <Link className="link_navbar" to="/">
                                        <i class="icon_navbar_pr fa-brands fa-tiktok"></i>Tiktok
                                    </Link>
                                    <Link className="link_navbar link_navbar-facebook" to="/">
                                        <i class="icon_navbar_pr fa-brands fa-facebook-f"></i>
                                        Facebook
                                    </Link>
                                    <Link className="link_navbar" to="/">
                                        <i class="icon_navbar_pr fa-brands fa-youtube"></i>Youtube
                                    </Link>
                                </div>
                                <div className="navbar_link-top-right">
                                    <Link
                                        to="/information/6"
                                        className={
                                            this.state.account ? "link_navbar link_navbar-1" : ""
                                        }
                                    >
                                        <i
                                            class={this.state.account ? "fa-regular fa-bell" : ""}
                                        ></i>
                                    </Link>
                                    <a
                                        target="blank"
                                        href="https://play.google.com/store/apps/details?id=vn.com.medpro&pli=1"
                                        className="link_navbar link_navbar-1"
                                    >
                                        <i class="icon_navbar_pr fa-solid fa-mobile"></i>Tải ứng
                                        dụng
                                    </a>
                                    <Link
                                        to={this.linkPosLogin()}
                                        className="link_navbar link_navbar-2"
                                    >
                                        <i class="icon_navbar_pr fa-solid fa-user"></i>
                                        {this.state.username}
                                    </Link>
                                </div>
                            </div>
                            <div className="navbar_link-bottom">
                                <div className="navbar_link-bottom_left">
                                    <p>
                                        <i class="fa-solid fa-headphones"></i>
                                    </p>
                                    <div>
                                        <p className="navbar_title_phone">Hỗ trợ đặt khám</p>
                                        <p className="navbar_phone">1900 2115</p>
                                    </div>
                                </div>
                                <div className="navbar_link-bottom_right">
                                    <ul className="ul_p">
                                        <li className="li_p">
                                            <div className="box_link">
                                                <div className="link_p">
                                                    {" "}
                                                    <Link
                                                        to="/basis/benh-vien-cong"
                                                        className="link_navbar"
                                                    >
                                                        Cơ sở y tế
                                                        <i class="icon_navbar fa-solid fa-caret-down"></i>
                                                    </Link>
                                                </div>
                                                <div className="box_link_list">
                                                    <ul className="ul_c">
                                                        <Link
                                                            to="/basis/benh-vien-cong"
                                                            className="link_navbar"
                                                        >
                                                            {" "}
                                                            <li>Bệnh viện công</li>
                                                        </Link>
                                                        <Link
                                                            to="/basis/benh-vien-tu"
                                                            className="link_navbar"
                                                        >
                                                            {" "}
                                                            <li>Bệnh viện tư</li>
                                                        </Link>
                                                        <Link
                                                            to="/basis/phong-kham"
                                                            className="link_navbar"
                                                        >
                                                            {" "}
                                                            <li>Phòng khám</li>
                                                        </Link>
                                                        <Link
                                                            to="/basis/phong-mach"
                                                            className="link_navbar"
                                                        >
                                                            {" "}
                                                            <li>Phòng mạch</li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                                <Link></Link>
                                            </div>
                                        </li>
                                        <li className="li_p">
                                            <div className="box_link">
                                                <div className="link_p">
                                                    {" "}
                                                    <Link to="/service/sv1" className="link_navbar">
                                                        Dịch vụ y tế
                                                        <i class="icon_navbar fa-solid fa-caret-down"></i>
                                                    </Link>
                                                </div>
                                                <div className="box_link_list">
                                                    <ul className="ul_c">
                                                        <Link to="/service/sv1" className="link_navbar">
                                                            {" "}
                                                            <li>Đặt khám tại cơ sở</li>
                                                        </Link>
                                                        <Link to="/service/sv2" className="link_navbar">
                                                            {" "}
                                                            <li>Đặt khám theo bác sĩ</li>
                                                        </Link>
                                                        <Link to="/service/sv3" className="link_navbar">
                                                            {" "}
                                                            <li>Tư vấn khám bệnh từ xa</li>
                                                        </Link>
                                                        <Link to="/service/sv4" className="link_navbar">
                                                            {" "}
                                                            <li>Đặt lịch xét nghiệm</li>
                                                        </Link>
                                                        <Link to="/service/sv5" className="link_navbar">
                                                            {" "}
                                                            <li>Đặt lịch tiêm chủng</li>
                                                        </Link>

                                                        <Link to="/service/sv6" className="link_navbar">
                                                            {" "}
                                                            <li>Y tế tại nhà</li>
                                                        </Link>
                                                        <Link to="/service/sv7" className="link_navbar">
                                                            {" "}
                                                            <li>Khám bệnh ngoài giờ</li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="li_p">
                                            {" "}
                                            <Link to="/package" className="link_navbar">
                                                Gói Khám
                                            </Link>
                                        </li>
                                        <li className="li_p">
                                            <div className="box_link">
                                                <div className="link_p">
                                                    {" "}
                                                    <Link to="/instruct/1" className="link_navbar">
                                                        Hướng dẫn
                                                        <i class="icon_navbar fa-solid fa-caret-down"></i>
                                                    </Link>
                                                </div>
                                                <div className="box_link_list">
                                                    <ul className="ul_c">
                                                        <Link to="/instruct/1" className="link_navbar">
                                                            <li>Đặt lịch khám</li>
                                                        </Link>
                                                        <Link to="/instruct/2" className="link_navbar">
                                                            <li>Tư vấn khám bệnh từ xa</li>
                                                        </Link>
                                                        <Link to="/instruct/3" className="link_navbar">
                                                            {" "}
                                                            <li>Quy trình hoàn phí</li>
                                                        </Link>
                                                        <Link to="/instruct/4" className="link_navbar">
                                                            <li>Câu hỏi thường gặp</li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="li_p">
                                            <div className="box_link">
                                                <div className="link_p">
                                                    {" "}
                                                    <Link to="/news/tin-dich-vu" className="link_navbar">
                                                        Tin tức
                                                        <i class="icon_navbar fa-solid fa-caret-down"></i>
                                                    </Link>
                                                </div>
                                                <div className="box_link_list">
                                                    <ul className="ul_c">
                                                        <Link
                                                            to="/news/tin-dich-vu"
                                                            className="link_navbar"
                                                        >
                                                            {" "}
                                                            <li>Tin dịch vụ</li>
                                                        </Link>
                                                        <Link to="/news/tin-y-te" className="link_navbar">
                                                            <li>Tin y tế</li>
                                                        </Link>
                                                        <Link
                                                            to="/news/y-hoc-thuong-thuc"
                                                            className="link_navbar"
                                                        >
                                                            <li>Y học thường thức</li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="li_p">
                                            <Link className="link_navbar" to="/aboutus">
                                                Về chúng tôi
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* NAVBARMOBILE */}
                <div className="menubar_mobile_container">
                    <div className="menubar_mobile">
                        <div className="menubar_container">
                            <div className="menubar_mobile-logo">
                                <Link to="/">
                                    {" "}
                                    <img src={require("../assets/image/logo/logo.png")} alt="" />
                                </Link>
                            </div>
                            <div className="box_togle">
                                <div
                                    className="menubar_search_mobile"
                                    onClick={this.handelsearch}
                                >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <div
                                    className="menubar_togle_mobile"
                                    onClick={this.handelshowmenu}
                                >
                                    <i class="fa-solid fa-bars"></i>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                this.state.showsearch ? "menubar_mobile_show_search" : "hide"
                            }
                        >
                            <input type="text" placeholder="search"></input>
                        </div>
                        <div
                            className={
                                this.state.showmenu ? "showmenubar_mobile-container" : "hide"
                            }
                        >
                            <div className="menubar_mobile_show_menu">
                                <div className="menubar_mobile_show_menu_container">
                                    <div className="block1">
                                        <div className="box_logo">
                                            <img
                                                src={require("../assets/image/logo/logo.png")}
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="hide_menubar_mobile"
                                            onClick={this.handelshowmenu}
                                        >
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                    </div>
                                    <div className="block2">
                                        <Link
                                            onClick={this.handelshowmenu}
                                            className="link_menubar"
                                            to="/register"
                                        >
                                            <p className="link_block2 link_block2-signup">Đăng kí</p>
                                        </Link>
                                        <Link
                                            onClick={this.handelshowmenu}
                                            className="link_menubar"
                                            to={this.linkPosLogin()}
                                        >
                                            <p className="link_block2 link_block2-signin">
                                                {this.state.username}
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="block3">
                                        <ul>
                                            <li className="li_menubar_mobile">
                                                <div className="menubar_topic">
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/basis/benh-vien-cong"
                                                        className="menubar_topic_link"
                                                    >
                                                        <i class="fa-sharp fa-solid fa-hospital"></i>
                                                        <p>Cơ sở y tế</p>
                                                    </Link>
                                                    <i
                                                        class={
                                                            this.state.choiceList === "s1"
                                                                ? "fa-solid fa-caret-down icon_list"
                                                                : "fa-solid fa-caret-right icon_list"
                                                        }
                                                        onClick={() => this.onclickmenu("s1")}
                                                    ></i>
                                                </div>
                                                <ul
                                                    className={
                                                        this.state.choiceList === "s1"
                                                            ? "list_menubar_child"
                                                            : "hide"
                                                    }
                                                >
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/basis/benh-vien-cong"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Bệnh viện công</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/basis/benh-vien-tu"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Bệnh viện tư</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/basis/phong-kham"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Phòng khám</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/basis/phong-mach"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li className="hide_border">Phòng mạch</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="li_menubar_mobile">
                                                <div className="menubar_topic">
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv1"
                                                        className="menubar_topic_link"
                                                    >
                                                        <i class="fa-solid fa-house-medical-circle-check"></i>
                                                        <p>Dịch vụ y tế</p>
                                                    </Link>
                                                    <i
                                                        class={
                                                            this.state.choiceList === "s2"
                                                                ? "fa-solid fa-caret-down icon_list"
                                                                : "fa-solid fa-caret-right icon_list"
                                                        }
                                                        onClick={() => this.onclickmenu("s2")}
                                                    ></i>
                                                </div>
                                                <ul
                                                    className={
                                                        this.state.choiceList === "s2"
                                                            ? "list_menubar_child"
                                                            : "hide"
                                                    }
                                                >
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv1"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Đặt khám tại cơ sở</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv2"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Đặt khám theo bác sĩ</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv3"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Tư vấn khám bệnh từ xa</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv4"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Đặt lịch xét nghiệm</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv5"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Đặt lịch tiêm chủng</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv6"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Y tế tại nhà</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/service/sv7"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li className="hide_border">Khám bệnh ngoài giờ</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="li_menubar_mobile">
                                                <div className="menubar_topic">
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/package"
                                                        className="menubar_topic_link"
                                                    >
                                                        <i class="fa-solid fa-stethoscope"></i>
                                                        <p>Gói khám</p>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="li_menubar_mobile">
                                                <div className="menubar_topic">
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/instruct/1"
                                                        className="menubar_topic_link"
                                                    >
                                                        <i class="fa-brands fa-readme"></i>
                                                        <p>Hướng dẫn</p>
                                                    </Link>
                                                    <i
                                                        class={
                                                            this.state.choiceList === "s3"
                                                                ? "fa-solid fa-caret-down icon_list"
                                                                : "fa-solid fa-caret-right icon_list"
                                                        }
                                                        onClick={() => this.onclickmenu("s3")}
                                                    ></i>
                                                </div>
                                                <ul
                                                    className={
                                                        this.state.choiceList === "s3"
                                                            ? "list_menubar_child"
                                                            : "hide"
                                                    }
                                                >
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/instruct/1"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Đặt lịch khám</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/instruct/2"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Tư vấn khám bệnh từ xa</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/instruct/3"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Quy trình hoàn phí</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/instruct/4"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li className="hide_border">Câu hỏi thường gặp</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="li_menubar_mobile">
                                                <div className="menubar_topic">
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        className="menubar_topic_link"
                                                        to="/news/tin-dich-vu"
                                                    >
                                                        <i class="fa-regular fa-newspaper"></i>
                                                        <p>Tin tức</p>
                                                    </Link>
                                                    <i
                                                        class={
                                                            this.state.choiceList === "s4"
                                                                ? "fa-solid fa-caret-down icon_list"
                                                                : "fa-solid fa-caret-right icon_list"
                                                        }
                                                        onClick={() => this.onclickmenu("s4")}
                                                    ></i>
                                                </div>
                                                <ul
                                                    className={
                                                        this.state.choiceList === "s4"
                                                            ? "list_menubar_child"
                                                            : "hide"
                                                    }
                                                >
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/news/tin-dich-vu"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Tin dịch vụ</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/news/tin-y-te"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li>Tin y tế</li>
                                                    </Link>
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/news/y-hoc-thuong-thuc"
                                                        className="linkmenubar_mobile"
                                                    >
                                                        <li className="hide_border">Y học thường thức</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="li_menubar_mobile">
                                                <div className="menubar_topic">
                                                    <Link
                                                        onClick={this.handelshowmenu}
                                                        to="/aboutus"
                                                        className="menubar_topic_link"
                                                    >
                                                        <i class="fa-solid fa-earth-americas"></i>
                                                        <p>Về chúng tôi</p>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="block4">
                                        <div className="block4_support">
                                            <i class="fa-brands fa-twitter"></i>
                                            <p>Hỗ trợ Zalo</p>
                                        </div>
                                        <div className="block4_support">
                                            <i class="fa-brands fa-facebook"></i>
                                            <p>Hỗ trợ Facebook</p>
                                        </div>
                                        <div className="block4_support">
                                            <i class="fa-solid fa-phone"></i>
                                            <p>Hỗ trợ đặt khám: 1900-2115</p>
                                        </div>
                                        <div className="block4_support">
                                            <i class="fa-solid fa-envelope"></i>
                                            <p>Email: cskh@medpro.vn</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="background_menubar_mobile"
                                onClick={this.handelshowmenu}
                            ></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
