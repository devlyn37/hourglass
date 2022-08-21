import Logo from '../../components/logo.js';
import BgShape from '../../components/bgshape';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'admin@company.xyz', company: 'Company Name' };
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
      <div className={styles.container}>
        <BgShape />
        <Logo />
        <p className={styles.loginp}>
          Enter your company details to receive a magic sign-in link.
        </p>
        <form className={styles.loginform}>
          <input
            type='text'
            value={this.state.email}
            onChange={event => this.emailChange(event)}
          />
          <input
            type='text'
            value={this.state.company}
            onChange={event => this.companyChange(event)}
          />
        </form>
        <Link href='/employer/manageStreams'>
          <button className={styles.button}>CONTINUE</button>
        </Link>
      </div>
    );
  }
}
