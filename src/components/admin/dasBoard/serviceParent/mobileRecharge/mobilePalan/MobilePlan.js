
import { useEffect, useState } from 'react';
import '../mobilePalan/mobilePlan.css'
import PlanList from './planList/PlanList';
import { mobilePlanDetails, rechargeOperators } from '../../../../../../api/login/Login';
function MobilePlan({ allOperatorDat, selectAmount }) {
    // console.log(allOperatorDat);
    const [activeTab, setActiveTab] = useState(0);



    const tabs = ['FULLTT', 'TOPUP', 'DATA', 'SMS', 'Romaing', 'FRC', 'STV'];
    const content = [
        <PlanList data={allOperatorDat?.offerPlan?.FULLTT} selectAmount={selectAmount} />,
        <PlanList data={allOperatorDat?.offerPlan?.TOPUP} selectAmount={selectAmount} />,
        <PlanList data={allOperatorDat?.offerPlan?.DATA} selectAmount={selectAmount} />,
        <PlanList data={allOperatorDat?.offerPlan?.SMS} selectAmount={selectAmount} />,
        <PlanList data={allOperatorDat?.offerPlan?.Romaing} selectAmount={selectAmount} />,
        <PlanList data={allOperatorDat?.offerPlan?.FRC} selectAmount={selectAmount} />,
        <PlanList data={allOperatorDat?.offerPlan?.STV} selectAmount={selectAmount} />,
    ];


    return (
        <>
            {allOperatorDat &&
                <div className="tabs">
                    <div className="tab-buttons">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={index === activeTab ? 'active' : ''}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="tab-content">
                        {content[activeTab]}
                    </div>
                </div>
            }

        </>
    )
}
export default MobilePlan