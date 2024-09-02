import React from 'react';


import LoanBox from './LoanBox';
import './LoanBox.css';
import home from '../../asesets/loanimage/homeloan.png';
// import home from '../../asesets/loanimage/persnal.png';
// const homeLoanImage = 'https://www.ltfs.com/images/default-source/home-page/housing_loan.svg';
const propertyLoanImage = 'https://www.ltfs.com/assets/images/lap.svg';
const homeLoanImage = 'https://www.ltfs.com/images/default-source/home-page/housing_loan.svg';
const twoWheelerLoanImage = 'https://www.ltfs.com/assets/images/lap.svg';
const farmLoanImage = 'https://www.ltfs.com/images/default-source/home-page/housing_loan.svg';
const smeLoanImage = 'https://www.ltfs.com/assets/images/lap.svg';
const microLoanImage = 'https://www.ltfs.com/images/default-source/home-page/housing_loan.svg';


function Loan() {

    const bgcolor1 = '#4CAF50';  // Green
    const hoverColor1 = '#45a049';
    const bgcolor2 = '#2196F3';  // Blue
    const hoverColor2 = '#1e88e5';
    const bgcolor3 = '#FF9800';  // Orange
    const hoverColor3 = '#f57c00';

    const loans = [
        { imgSrc: home, title: 'Home Loan', description: 'With a home loan, you can move into the house of your dreams.' ,bgColor: bgcolor1,
            hoverColor: hoverColor1 },
        { imgSrc: home, title: 'home Loan', description: 'With our flexible home loans, you can quickly get funds for your home needs!',bgColor: bgcolor2,
            hoverColor: hoverColor2 },
        { imgSrc: home, title: 'Load Against Property', description: 'Take advantage of our loan against property offers to unlock the value of your property.' ,bgColor: bgcolor3,
            hoverColor: hoverColor3 },
        { imgSrc: home, title: 'Business Loan', description: "Lead your company's expansion with our specially designed business loans.",bgColor: bgcolor1,
            hoverColor: hoverColor1 },
        { imgSrc: home, title: 'Education Loan', description: 'The Education Loan stands for "Invest in your future with our supportive education loans."',bgColor: bgcolor2,
            hoverColor: hoverColor2  },
        { imgSrc: home, title: 'Load Against Property', description: "Take advantage of our loan against property offers to unlock the value of your property.",bgColor: bgcolor3,
            hoverColor: hoverColor3 },
            { imgSrc: home, title: 'Working Capital OD Limit', description: "Use our working capital OD limit to ensure smooth operations." ,bgColor: bgcolor1,
                hoverColor: hoverColor1 },
            { imgSrc: home, title: 'Gold Loan', description: "Acquire fast cash with little hassle – apply for our gold loan right now!",bgColor: bgcolor2,
                hoverColor: hoverColor2 },
            { imgSrc: home, title: 'New Car Loan', description: "With our simple and fast new car loans, you can drive the car of your dreams." ,bgColor: bgcolor3,
                hoverColor: hoverColor3 },
            { imgSrc: home, title: 'Used automobile Loan', description: "With our used car loans, get into a pre-owned car.",bgColor: bgcolor1,
                hoverColor: hoverColor1 },
            { imgSrc: home, title: 'Medical Equipment Loan', description: "With our health equipment loans, you can improve your medical facilities.",bgColor: bgcolor2,
                hoverColor: hoverColor2  },
                
            
    ];

    return (
        <>
          <div className="PageHeading">
                <h1>Your goals are within reach. Our loans can help you pave the way.</h1>
            </div>
        <div className="App container">
            {/* <h3 class="h3 display-4 display-sm-3 display-md-2 display-lg-1 text-center my-4">Your goals are within reach. Our loans can help you pave the way.</h3> */}
          
            <div className="row loanmain-box">
                {loans.map((loan, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                        <LoanBox {...loan} />
                      
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default Loan;
