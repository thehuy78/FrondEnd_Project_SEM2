import React, { Component } from 'react'

export default class LoadingChild extends Component {
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
            <div className={this.state.loading ? 'loading_child' : 'hide'} style={this.props.bg === 'white' ? { backgroundColor: 'white' } : { backgroundColor: 'var(--primary)' }}>
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }
}
