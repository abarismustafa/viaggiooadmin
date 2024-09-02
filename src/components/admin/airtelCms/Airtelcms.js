import { useEffect, useState } from "react"
import { cmsGeneral } from "../../../api/login/Login";
import Loader from "../../../common/loader/Loader";


function AirtelCms() {
    const [loading, setLoading] = useState(false);

    const [position, setPosition] = useState({ latitude: null, longitude: null });

    // console.log('position', position);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            alert('Geolocation is not available in your browser.')
        }

    }, []);

    useEffect(() => {
        if (position.latitude !== null && position.longitude !== null) {
            airtelCmss();
        }
    }, [position]);



    const airtelCmss = async () => {
        const clone = { long: position?.longitude, lat: position?.latitude, user_id: window.localStorage.getItem('userIdToken') }
        setLoading(true)

        try {
            const res = await cmsGeneral(clone)

            if (res?.data?.error == false) {

                console.log(res?.data?.data?.redirecturl);
                window.open(res?.data?.data?.redirecturl, '_blank')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>Airtel CMS</h1>
            </div>

            {/* <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Airtel CMS</span></div>
                    <div className="card-body">
                        <form action="# " method="post" name="frmCallAction" id="frmCallAction">

                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtNumId">Mobile Number</label>
                                    <input className="form-control" id="txtNumId" name="txtNumId" type="number" placeholder="Mobile No" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="ddldb">Data</label>
                                    <select id="ddldb" name="ddldb" className="form-control" >
                                        <option value="LIVE" selected>LIVE</option>
                                        <option value="ARCHIVE">ARCHIVE</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>&nbsp;</label>
                                    <input type="submit" id="btnSearch" name="btnSearch" defaultValue="Search" className="btn btn-primary" fdprocessedid="zyyh5n" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-secondary" onclick="startexoprt()" fdprocessedid="bywwad" />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success cusxel"
                            table="table-to-xlsx"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download Excel sheet" />
                        <div className="GridUi no-header-footer-grid mt-3" id="all_transaction">
                            <div id="rechargehistorytbl_wrapper" className="dataTables_wrapper">

                                <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers dataTable" style={{ width: 1250 }} role="grid" aria-describedby="rechargehistorytbl_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                                Sr No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                Recharge ID
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Txn Id: activate to sort column ascending">
                                                Txn Id
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge  DateTime: activate to sort column ascending">
                                                Recharge <br />
                                                DateTime</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Company Name: activate to sort column ascending">
                                                Company Name</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Mobile No: activate to sort column ascending">
                                                Mobile No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                Amount
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Debit Amount: activate to sort column ascending">
                                                Debit Amount
                                            </th>
                                            <th className="action_th sorting_disabled" rowSpan={1} colSpan={1} aria-label="Status">Status</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} aria-label="Complain">Complain</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd"><td valign="top" colSpan={10} className="dataTables_empty">No data available in table</td></tr></tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default AirtelCms