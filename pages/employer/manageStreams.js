import React from 'react';
import Image from 'next/image';
import styles from '../../styles/manageStreams.module.css';
import SmallLogo from '../../components/smallLogo';
import editBtn from '../../public/edit-button.svg';
import deleteBtn from '../../public/delete-button.svg';

export default class ManageStreams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { company: 'My company', lastBankSync: 'July 27, 2022' };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload() {
    console.log('handleUpload');
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <SmallLogo />
          <p className={styles.company}>{this.state.company}</p>
          <button className={styles.bankbutton}>Sync bank account</button>
          <p className={styles.sync}>Last synced: {this.state.lastBankSync}</p>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.uploadFileBar}>
            <span>Upload a file with your employee salary information: </span>
            <button className={styles.button} onClick={this.handleUpload}>
              Upload
            </button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
                <th>Earnings</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>alfreds.f@company.xyz</td>
                <td>Germany</td>
                <td>3,485.04 €</td>
                <td
                  style={{ backgroundImage: `url(${editBtn.src})` }}
                  className={styles.action}
                ></td>
                <td
                  style={{ backgroundImage: `url(${deleteBtn.src})` }}
                  className={styles.action}
                ></td>
              </tr>
              <tr>
                <td>Maria Anders</td>
                <td>maria.a@company.xyz</td>
                <td>USA</td>
                <td>1,532.95 $</td>
                <td
                  style={{ backgroundImage: `url(${editBtn.src})` }}
                  className={styles.action}
                ></td>
                <td
                  style={{ backgroundImage: `url(${deleteBtn.src})` }}
                  className={styles.action}
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
