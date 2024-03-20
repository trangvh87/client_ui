//data: dữ liệu truyền xuống,
//funID: thống nhất với BE để xử lý đúng sự kiện
//callback: hàm xử lý khi BE trả lại dữ liệu
function request(data, funID, callback) {
    let callbackId = null;

    if (callback) {
        let now = new Date();
        callbackId = 'callback_' + now.getTime();
        console.log(callbackId);
        window[callbackId] = function (responseData) {
            // Gọi callback với dữ liệu phản hồi
            callback(responseData);

            // Dọn dẹp: Xóa tham chiếu đến callback sau khi đã gọi
            delete window[callbackId];
        };
    }

    // Gửi dữ liệu cùng với ID của callback (nếu có) qua postMessage
    window.chrome.webview.postMessage({ data: JSON.stringify(data), funID: funID, callbackId: callbackId });
}