import SmallLogo from "../../components/smallLogo.js"
import React from "react";
import styles from "../../styles/dashboard.module.css"
import Card from "../../components/card.js";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeName: "Satoshi Nakamoto",
            employeeEmail: "satoshi@gmail.com",
            streamBalance: "3,457.29",
            currency: "USD", stakePercent: "5.0%", stakeRewards: "25.23", debitBalance: "2,945.50"
        };
    }

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.navBar}>
                    <SmallLogo />
                    <p>{this.state.employeeName}</p>
                </div>

                <div className={styles.dashboard}>
                    <p className={styles.streamBalance}>${this.state.streamBalance}</p>
                    <div className={styles.dashboardDetails}>
                        <div className={styles.dashboardTile}>
                            <p>Staking rewards</p>
                            <span>{this.state.stakePercent}{' '}</span>
                            <span>${this.state.stakeRewards}</span>
                        </div>
                        <div className={styles.dashboardTile}>
                            <p>Debit balance available</p>
                            <span>${this.state.debitBalance}</span>
                        </div>
                    </div>
                    <div>
                        <button className={styles.button}>Send to wallet</button>
                        <button className={styles.button}>Send to bank</button>
                    </div>
                    {/* <div className={styles.cardContainer}>
                        <Card/>
                    </div> */}
                </div>  
            </div>
        );
    }
}