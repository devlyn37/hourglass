import React from "react";
import Image from "next/image";
import styles from "../../styles/manageStreams.module.css"
import SmallLogo from "../../components/smallLogo";

export default class ManageStreams extends React.Component {
    constructor(props) {
        super(props);
        this.state = { company: "My company", lastBankSync: "July 27, 2022" };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload() {
        console.log("handleUpload");
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <SmallLogo />
                    <p>{this.state.company}</p>
                    <button className={styles.button}>Sync bank account</button>
                    <p>Last synced: {this.state.lastBankSync}</p>
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.uploadFileBar}>
                        <span>Upload a file with your employee salary information: </span>
                        <button className={styles.button} onClick={this.handleUpload}>Upload</button>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Company</th>
                                    <th>Contact</th>
                                    <th>Country</th>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}