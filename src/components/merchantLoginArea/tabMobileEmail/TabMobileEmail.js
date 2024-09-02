
function TabMobileEmail({ tabs, handleTabClick, count, setState }) {
    return (
        <>
            <div className="email-mobile-tab">
                {tabs && tabs?.map((item, i) => {
                    return <div className="mobileitab me-3">
                        <div className="form-check" onClick={() => handleTabClick(item.id, i)}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id={item.id} checked={i == count} />
                            <label className="form-check-label" htmlFor={item.id}>
                                {item.label}
                            </label>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}
export default TabMobileEmail