import React from 'react';


class Message extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage() {
        document.querySelector('.message').classList.remove('message_visible')
    }

    render(){
        return (
            <div className="message">
                <div className="message__wrapper">
                    <header className="message__header">
                        <h2 className="message__title">Error</h2>
                    </header>
                    <section className="message__description">
                        <p>This country has been entered or doesn`t exist</p>
                    </section>
                    <footer>
                        <button className="button" onClick={this.hideMessage}>Close</button>
                    </footer>
                </div>
            </div>
        )
    }
};

export default Message;