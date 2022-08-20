import Logo from "../../components/logo.js"
import Link from "next/Link"
import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "me@company.xyz"};
        this.emailChange = this.emailChange.bind(this);   
    }

    emailChange(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        return (
            <div>
                <Logo />
                <p>Enter your work email to receive a magic sign-in link.</p>
                <form>
                    <input type="text" value={this.state.email} onChange={event => this.emailChange(event)} />
                </form>
                <Link href="/employee/dashboard">
                    <button>CONTINUE</button>
                </Link>
            </div>
        );
    }
}