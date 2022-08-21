import Logo from '../../components/logo.js';
import BgShape from '../../components/bgshape';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Home.module.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'me@company.xyz' };
    this.emailChange = this.emailChange.bind(this);
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className={styles.container}>
        <BgShape />
        <Logo />
        <p className={styles.loginp}>
          Enter your work email to receive a magic sign-in link.
        </p>
        <form className={styles.loginform}>
          <input
            type='text'
            value={this.state.email}
            onChange={event => this.emailChange(event)}
          />
        </form>
        <Link href='/employee/dashboard'>
          <button className={styles.button}>CONTINUE</button>
        </Link>
      </div>
    );
  }
}
