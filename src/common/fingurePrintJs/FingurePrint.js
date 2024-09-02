
import $ from "jquery";

const capture_url = 'http://127.0.0.1:11100/rd/capture'

export function capturefingerprint(capture_url, callbackFunction) {
    var doc = document.implementation.createDocument("", "", null);
    var pidOptionsElem = doc.createElement("PidOptions");
    var optsElem = doc.createElement("Opts");

    optsElem.setAttribute("fCount", 1);
    optsElem.setAttribute("fType", 2);
    optsElem.setAttribute("iCount", 0);
    optsElem.setAttribute("pCount", 0);
    optsElem.setAttribute("format", 0);
    optsElem.setAttribute("pidVer", "2.0");
    optsElem.setAttribute("timeout", 10000);
    optsElem.setAttribute("posh", "UNKNOWN");
    optsElem.setAttribute("env", "P");
    optsElem.setAttribute("wadh", "");
    console.log(optsElem);

    pidOptionsElem.appendChild(optsElem);
    doc.appendChild(pidOptionsElem);

    $.ajax({
        url: capture_url,
        type: "CAPTURE",
        data: doc,
        processData: false,
        success: function (response) {
            var doc2;
            var result = {
                httpSuccess: true,
            };

            if (typeof response === "string") {
                doc2 = new DOMParser().parseFromString(response, "text/xml");
                result.pid_data = response;
            } else {
                doc2 = response;
                result.pid_data = new XMLSerializer().serializeToString(response);
            }

            var errCode

            var resp = doc2.getElementsByTagName("Resp");
            result.errCode = resp[0].getAttribute("errCode");

            if (errCode != 0) {
                result.captureSuccess = false;
                result.errInfo = resp[0].getAttribute("errInfo");
            } else {
                result.captureSuccess = true;
                result.captureQuality = parseInt(resp[0].getAttribute("qScore"));
            }

            callbackFunction(result);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            callbackFunction({
                httpSuccess: false,
                captureSuccess: false,
                textStatus: textStatus,
                errorThrown: errorThrown,
            });
        },
    });
}

// const result = (data) => {
//     console.log(data);
// };
// capturefingerprint("http://127.0.0.1:11100/rd/capture", result);