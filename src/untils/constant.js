export const INFO = 'info'
export const SUCCESS = 'success'
export const WARNING = 'warning'
export const ERROR = 'error'

export const windowHeight = window.innerHeight
export const FORM_MODE = {
  DEFAULT: 0,
  CREATE: 1,
  EDIT: 2,
  VIEW: 3,
  APPROVE: 4,
  REJECT: 5
}

export const PATTERN = {
  VNACCS_ALLOW_CHAR: '^[!"#$%&\'()*+,-.\\/\\0-9:;<=>?@A-Z[\\]\\\\^_`a-z{|}~ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừửỬỮữỰựỲỳỴỵỶỷỸỹ“”\\\\s\\\\r\\\\n]+$',
  NAME_VIETNAMESE: '^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$',
  NAME_NON_LETTER: '^[0-9`~!@#$%^&*()_|+\\-=?;:\'"<>\\{\\}\\[\\]\\\\\\/.,\\s]+$',
  NAME_NON_VIETNAMESE_WITH_SPECIAL: '^[0-9a-zA-z`~!@#$%^&*()_|+\\-=?;:\'"<>\\{\\}\\[\\]\\\\\\/.,\\s]+$',
  NAME_NON_VI: '^[0-9a-zA-Z\\s]+$',
  SO_VAN_DON: '^[0-9a-zA-Z\\s\\-]+$',
  NAME_NON_VI_ALLOW_DOT: '^[0-9a-zA-Z.\\s]+$',
  DECIMAL_20_4: '^\\d{1,16}(\\.\\d{1,4})?$',
  REGEX_NOT_LOWER_CHAR_ALLOW_SPECIAL: /^[`A-Z0-9~!@#$%^&*()_|+\-=?;:'"ºÞÛ»½¾¿¼Ü<>{}\[\]\\\/., \n]+$/,
  REGEX_NOT_CHAR_ALLOW_SPECIAL: '/^[`\\d~!@#$%^&*()_|+\\-=?;:\'"ºÞÛ»½¾¿¼Ü<>{}\\[\\]\\\\\\/., ]+$/gi',
  REGEX_NOT_TV_SPECIAL_EXCEPT_DASH: '/^[\\da-z-]+$/gi',
  REGEX_NOT_TV_SPECIAL: '/^[\\da-z]+$/gi',
  REGEX_20_DECIMAL_4: '/^\\d{1,16}(\\.\\d{1,4})?$/'
}

export const LOAI_TO_KHAI_NHAP_XUAT = {
  NHAP_KHAU: '929',
  XUAT_KHAU: '930'
}

export const LIST_NHOM_LOAI_HINH = [
  {id: 0, value: 'Tất cả'},
  {id: 1, value: 'Kinh doanh'},
  {id: 2, value: 'Sản xuất, xuất khẩu'},
  {id: 3, value: 'Gia công'},
  {id: 4, value: 'Chế xuất'}
]


export const LIST_KENH_KHAI_BAO = [
  {id: '1', value: 'DN tự khai'},
  {id: '2', value: 'Khai qua đại lý'}
]

export const DATE_FORMAT = {
  YYYY_MM_DD_TIME: 'YYYY/MM/DD HH:mm:ss',
  YYYY_MM_DD_SLASH: 'YYYY/MM/DD',
  DD_MM_YYYY: 'DD-MM-YYYY',
  DD_MM_YYYY_SLASH: 'DD/MM/YYYY',
  DD_MM_YYYY_hh_MM_ss: 'DD/MM/YYYY HH:mm:ss',
  DD_MM_YYYY_TIME: 'DD-MM-YYYY HH:mm:ss',
  DD_MM_YYYY_HH_mm: 'DD-MM-YYYY HH:mm',
  YYYY: 'YYYY',
  DDMMYYYY: 'DDMMYYYY',
  YYYY_MM_DD: 'YYYY-MM-DD'
}

export const ACTION_CODE = {
  KY_SO: 'KY_SO', // Chuyển đổi msg JSON -> EDI để ký số
  LUU: 'LUU', // Lưu msg JSON vào DB NV
  LUU_MAU: 'LUU_MAU', // Lưu msg JSON vào DB MSG_MAU
  LUU_VA_TAO_MAU: 'LUU_VA_TAO_MAU', // Lưu msg JSON vào DB NV + MSG_MAU
  LUU_VA_GUI: 'LUU_VA_GUI' // Lưu msg JSON vào DB NV => gửi msg EDI vào kafka
}

