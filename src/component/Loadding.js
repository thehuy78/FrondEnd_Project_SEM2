import React, { Component } from 'react'
import '../style/Loading.scss'

export default class Loadding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {

        this.updateLoadingState();
    }

    componentDidUpdate(prevProps) {

        if (this.props.hide !== prevProps.hide) {
            this.updateLoadingState();
        }
    }

    updateLoadingState = () => {
        this.setState({
            loading: this.props.hide,
        });
        this.enableBodyScroll();
    };

    disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    enableBodyScroll = () => {
        document.body.style.overflow = 'auto';
    };
    render() {
        return (
            <div className={this.state.loading ? "loading_container" : "hide"}>

                <div class="container">
                    <div class="top">
                        <div class="square">
                            <div class="square">
                                <div class="square">
                                    <div class="square">
                                        <div class="square"><div class="square">
                                        </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="square">
                            <div class="square">
                                <div class="square">
                                    <div class="square">
                                        <div class="square"><div class="square">
                                        </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left">
                        <div class="square">
                            <div class="square">
                                <div class="square">
                                    <div class="square">
                                        <div class="square"><div class="square">
                                        </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="square">
                            <div class="square">
                                <div class="square">
                                    <div class="square">
                                        <div class="square"><div class="square">
                                        </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
