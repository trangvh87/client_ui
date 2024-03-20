 const INFO = 'info'
 const SUCCESS = 'success'
 const WARNING = 'warning'
 const ERROR = 'error'

 const ERR_MSG = 'ERR_MSG'

export const SEC = 10000;
 export const REFRESH_TOKEN_TIME = 30 * SEC;

 const PAGINATION_PARAM = {
    page: 0,
    size: 20, /* Size mặc định*/
    pageTicket: 1
};

 export function isExternal(path) {
   return /^(https?:|mailto:|tel:|.\/|..\/)/.test(path)
 }
 export function formatNumberVn(num) {
   if (num === null || num === undefined) return ''
   return Intl.NumberFormat('vi-VN').format(num)
 }

 export function showConfirm(_this, content, onConfirm = () => {}, onCancel = () => {}) {
    return _this.$confirm(content || '', '', {
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        customClass: '',
        cancelButtonClass: 'el-icon-close',
        confirmButtonClass: 'el-icon-check',
        type: 'warning'
    }).then(onConfirm).catch(onCancel)
}

 export function showAlert($this, type, message, duration = 4000, customClass = '') {
    const err = sessionStorage.getItem(ERR_MSG)
      // ? md5(message) : undefined
    const newMsg = message
    if (newMsg && err !== newMsg) {
        sessionStorage.setItem(ERR_MSG, newMsg)
        setTimeout(() => {
            sessionStorage.removeItem(ERR_MSG)
        }, duration)
        message = message ? `${message}`.replaceAll(/(\r\n|\r|\n)/g, '<br/>') : ''
        return $this.$message({
            dangerouslyUseHTMLString: true,
            customClass: customClass,
            message: message,
            type: type,
            duration: duration,
            showClose: true
        })
    } else {
        sessionStorage.setItem(ERR_MSG, newMsg)
    }
}


