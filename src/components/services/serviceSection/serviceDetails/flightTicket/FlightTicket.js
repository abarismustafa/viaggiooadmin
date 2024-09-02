import flight from '../../../../../asesets/service/flight-booking.svg'
function FlightTicket() {
    return (
        <>
            <div id="FlightBooking" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgba(201, 232, 219, 0.7)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={flight} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Flight Ticket Booking</h3>
                                <p>Flight Bookings made simple and easy</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">MasterPay retailer can provide Flight Booking services to their customers at competitive rates and great commissions without any hassles.</p>
                                <p>Customers can just walk in  and get their travel bookings done easily in a secure way using the services provided at MasterPay Retail store. While MasterPay retailers get to provide their customers with more services; they also earn an extra income by rendering these services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default FlightTicket