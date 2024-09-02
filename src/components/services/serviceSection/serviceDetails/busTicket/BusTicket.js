import bus from '../../../../../asesets/service/bus-booking.svg'
function BusTicket() {
    return (
        <>
            <div id="BusBooking" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgba(196, 228, 238, 0.75)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={bus} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Bus Ticket Booking</h3>
                                <p>Bus Bookings made simple and easy</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Travel bookings being a basic requirement, a MasterPay retailer can provide Bus Booking services of the comprehensive range of Bus Operators in India to their customers without any hassles.</p>
                                <p>Customers can just walk in  and get their travel bookings done easily in a secure way using the services provided at MasterPay Retail store. While MasterPay retailers get to provide their customers with more services; they also earn an extra income by rendering these services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BusTicket