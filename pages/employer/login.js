import Logo from "../../components/logo.js"
import Link from "next/Link"
import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "admin@company.xyz", company: "Company Name" };
        this.emailChange = this.emailChange.bind(this);
    }

    emailChange(event) {
        this.setState({ email: event.target.value });
    }

    companyChange(event) {
        this.setState({ company: event.target.value });
    }

    render() {
        // console.log("Email is: " + this.state.email);
        // console.log("Company is: " + this.state.company);
        return (
            <div>
                <Logo />
                <p>Enter your company details to receive a magic sign-in link.</p>
                <form>
                    <input type="text" value={this.state.email} onChange={event => this.emailChange(event)} />
                    <input type="text" value={this.state.company} onChange={event => this.companyChange(event)} />
                </form>
                <Link href="/employer/manageStreams">
                    <button>CONTINUE</button>
                </Link>
            </div>
        );
    }
}