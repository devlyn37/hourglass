import React from "react";
import styles from "../../styles/manageStreams.module.css"
import SmallLogo from "../../components/smallLogo";
import editBtn from '../../public/edit-button.svg';
import deleteBtn from '../../public/delete-button.svg';

function csvToJSON(csv) {
    var rows = csv.split('\n').slice(1);
    var payrollItems = [];
    for (var i = 0; i < rows.length; i++) {
        var fields = rows[i].split(',');
        // Remove new line & carriage return from the last field
        var payroll = { name: fields[0], email: fields[1], monthlySalary: fields[2], taxLocation: fields[3].replace(/(\r\n|\n|\r)/gm, "") };
        payrollItems.push(payroll);
    }

    return payrollItems;
}

export default class ManageStreams extends React.Component {
    constructor(props) {
        super(props);
        this.state = { company: "My company", lastBankSync: "July 27, 2022", employeeData: [], tableRows: [] };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    updateEmployeeData(employees) {
        this.state.employeeData = employees;
        console.log("New employee data: " + this.state.employeeData);
    }

    handleFileChange(event) {
        var reader = new FileReader();
        // Pass reader.result to a separate handler because, otherwise,
        // the inline definition does not have closure, access to state, etc.
        reader.onloadend = () => { this.readerOnLoadEnd(reader.result) };
        reader.readAsText(event.target.files[0]);
    }

    readerOnLoadEnd(result) {
        this.state.employeeData = csvToJSON(result);
        // console.log(this.state.employeeData[1].name);
    }

    // Upon user confirmation of the upload, render the employee data
    // stored in state, on the screen, and send it to the backend
    handleUpload(event) {
        event.preventDefault(); // stop DOM from making POST request

        // Different state variable to allow user to render only upon upload confirmation
        this.state.tableRows = this.state.employeeData;
        this.forceUpdate();
    }

    // Call API to pass employee information to backend & initiate streams
    handleSubmit(event) {
        console.log("submit button");
    }

    renderTableRows() {
        if (this.state.tableRows.length < 1)
            return <></>;
        else {
            return (this.state.tableRows.map(row => {
                return (
                    <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.monthlySalary}</td>
                        <td>{row.taxLocation}</td>
                        <td
                            style={{ backgroundImage: `url(${editBtn.src})` }}
                            className={styles.action}>
                        </td>
                        <td
                            style={{ backgroundImage: `url(${deleteBtn.src})` }}
                            className={styles.action}>
                        </td>
                    </tr>
                )
            }));
        }
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
                        <input className={styles.button} type="file" accept=".csv" onChange={this.handleFileChange} />
                        <button className={styles.button} onClick={this.handleUpload}>Upload file</button>
                    </div>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Monthly salary (USD)</th>
                                    <th>Tax jurisdiction</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                {this.renderTableRows()}
                            </tbody>
                        </table>
                    <div className={styles.bottomButtonBar}>
                        <button onClick={this.handleSubmit} className={styles.button}>Start streaming payments!</button>
                    </div>
                </div>
            </div>
        );
    }
}