//
//数字操作
//
/**
 * 生成指定范围内的随机数
 * @param min
 * @param max
 * @returns
 */
export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 数字千分位分割
 * @param n
 * @returns
 */
export const formatNumber = (n: string | number) => {
  let num = n.toString();
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = "";
    let remainder = len % 3;
    if (remainder > 0) {
      // 不是3的整数倍
      const matched = num.slice(remainder, len).match(/\d{3}/g) || [];
      return num.slice(0, remainder) + "," + matched.join(",") + temp;
    } else {
      // 3的整数倍
      const matched = num.slice(0, len).match(/\d{3}/g) || [];
      return matched.join(",") + temp;
    }
  }
};
//
//数组操作
//
/**
 * 数组乱序
 * @param arr
 * @returns
 */
export const arrScrambling = (arr: []) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
};
/**
 * 数组扁平化
 * @param arr
 * @returns
 */
export const flatten = (arr: []) => {
  let result: any[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
};
/**
 * 数组随机取样
 * @param arr
 * @returns
 */
export const sample = (arr: []) => arr[Math.floor(Math.random() * arr.length)];
//
//字符串操作
//
/**
 * 生成随机字符串
 * @param len string长度
 * @returns
 */
export const randomString = (len: number) => {
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  let strLen = chars.length;
  let randomStr = "";
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};
/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns
 */
export function copyToClipboard(text: string) {
  // 创建一个隐藏的文本区域
  const textArea = document.createElement("textarea");
  textArea.value = text; // 将要复制的文本赋值给文本区域

  // 使文本区域不可见
  textArea.style.position = "fixed"; // Prevent scrolling to bottom of the page in MS Edge.
  textArea.style.opacity = "0"; // 使区域透明
  document.body.appendChild(textArea); // 将文本区域添加到文档中

  // 选中区域的文本
  textArea.select();
  textArea.setSelectionRange(0, 99999); // 对于手机

  // 执行复制命令
  const successful = document.execCommand("copy");

  // 移除文本区域
  document.body.removeChild(textArea);

  if (successful) {
    return true;
  } else {
    return false;
  }
}

/**
 * 首字母大写
 * @param str
 * @returns
 */
export const fistLetterUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * 手机号中间四位替换成****
 * @param tel
 * @returns
 */
export const telFormat = (tel: string) => {
  tel = String(tel);
  return tel.substr(0, 3) + "****" + tel.substr(7);
};
/**
 * 驼峰转下划线
 * @param str
 * @returns
 */
export const getKebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, (item) => "-" + item.toLowerCase());
};
/**
 * 下划线转驼峰
 * @param str
 * @returns
 */
export const getCamelCase = (str: string) => {
  //@ts-ignore
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase());
};
/**
 * 全角转半角
 * @param str
 * @returns
 */
export const toCDB = (str: string) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};
/**
 * 数字转汉字大写
 * @param n
 * @returns
 */
export const digitUppercase = (n: number) => {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  n = Math.abs(n);
  let s = "";
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return s
    .replace(/(零.)*零元/, "元")
    .replace(/(零.)+/g, "零")
    .replace(/^整$/, "零元整");
};
/**
 * 数字转中文数子
 * @param value
 * @returns
 */
export const intToChinese = (value: number) => {
  const str = String(value);
  const len = str.length - 1;
  const idxs = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
    "十",
    "百",
    "千",
    "万",
    "十",
    "百",
    "千",
    "亿",
  ];
  const num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  //@ts-ignore
  return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
    let pos = 0;
    if ($1[0] !== "0") {
      pos = len - idx;
      if (idx == 0 && $1[0] == 1 && idxs[len - idx] == "十") {
        return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - (left % 4);
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return "";
      } else {
        return num[$1[0]];
      }
    }
  });
};

//
//操作cookie
//
export const setCookie = (key: string, value: string, expire: number) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};
/**
 * 获取cookie
 * @param key
 * @returns
 */
export const getCookie = (key: string) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split("; ");
  let cookieValue = "";
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split("=");
    if (temp[0] === key) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
};
/**
 * 删除cookie
 * @param key
 */
export const delCookie = (key: string) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};

//
//身份校验
//
/**
 * 校验身份证号码是否正确
 * @param value 身份证号码
 * @returns
 */
export const checkCardNo = (value: string) => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(value);
};
/**
 * 判断是否包含中文
 * @param value 中文
 * @returns
 */
export const haveCNChars = (value: string) => {
  return /[\u4e00-\u9fa5]/.test(value);
};
/**
 * 判断是否为大陆的邮政编码
 * @param value 邮政编码
 * @returns
 */
export const isPostCode = (value: string) => {
  return /^[1-9][0-9]{5}$/.test(value.toString());
};
/**
 * 判断是否为ipv6地址
 * @param str
 * @returns
 */
export const isIPv6 = (str: string) => {
  const matches = str.match(/:/g);
  return Boolean(
    matches?.length === 7 // 使用可选链以避免访问 null 的 length
      ? false &&
          /^((?:[a-fA-F0-9]{1,4}::){1,6}[a-fA-F0-9]{1,4}|::1)$/i.test(str)
      : /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/.test(str)
  );
};
/**
 * 判断是否为邮箱
 * @param value
 * @returns
 */
export const isEmail = (value: string) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
};
/**
 * 验证是否为大陆手机号
 * @param value 手机号
 * @returns
 */
export const isTel = (value: string) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
};
/**
 * 校验URL是否有效
 * @param URL
 * @returns
 */
export const getUrlState = (URL: string) => {
  return new Promise<boolean>((resolve) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", URL, true);
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };
    xmlhttp.send();
  });
};
//
//设备判断
//
/**
 * 判断是移动还是pc端
 * @returns
 */
export const isMobile = () => {
  if (
    navigator.userAgent.match(
      /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
    )
  ) {
    return "mobile";
  }
  return "desktop";
};
/**
 * 检测是是苹果还是安卓设备
 * @returns
 */
export const isAppleMobileDevice = () => {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
};
/**
 * 判断是否是安卓设备
 * @returns
 */
export const isAndroidMobileDevice = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
};
/**
 * 判断是windows还是mac系统
 * @returns
 */
export const osType = () => {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  const isWindows =
    agent.indexOf("win64") >= 0 ||
    agent.indexOf("wow64") >= 0 ||
    agent.indexOf("win32") >= 0 ||
    agent.indexOf("wow32") >= 0;
  if (isWindows) {
    return "windows";
  }
  if (isMac) {
    return "mac";
  }
};
/**
 * 判断是否是微信/QQ内置浏览器
 * @returns
 */
export const browser = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/micromessenger/i)) {
    return "weixin";
  } else if (ua.match(/qq/i)) {
    return "QQ";
  }
  return false;
};
/**
 * 检测浏览器类型及版本
 * @returns
 */
export const getExplorerInfo = () => {
  const t = navigator.userAgent.toLowerCase();

  const matchBrowser = (regex: RegExp, name: string) => {
    const match = t.match(regex);
    return match ? { type: name, version: Number(match[1]) } : null;
  };

  return (
    matchBrowser(/msie ([\d]+)/, "IE") ||
    (t.match(/trident\/.+?rv:([\d]+)/) ? { type: "IE", version: 11 } : null) ||
    matchBrowser(/edge\/([\d]+)/, "Edge") ||
    matchBrowser(/firefox\/([\d]+)/, "Firefox") ||
    matchBrowser(/chrome\/([\d]+)/, "Chrome") ||
    matchBrowser(/opera.([\d]+)/, "Opera") ||
    matchBrowser(/version\/([\d]+)/, "Safari") || { type: t, version: -1 }
  );
};
/**
 * 获取当前页面的高度
 * @returns
 */
export const getClientHeight = () => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
};
/**
 * 获取当前页面的宽度
 * @returns
 */
export const getPageViewWidth = () => {
  return (
    document.compatMode == "BackCompat"
      ? document.body
      : document.documentElement
  ).clientWidth;
};
//
//时间操作
//
/**
 * 获取当前时间
 * @returns 'yyyy年MM月dd日 HH:mm:ss'
 */
export const nowTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
  const hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
  const miu =
    now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
  const sec =
    now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
  return (
    +year +
    "年" +
    (month + 1) +
    "月" +
    date +
    "日 " +
    hour +
    ":" +
    miu +
    ":" +
    sec
  );
};
/**
 * 格式化日期
 * @param formater 格式化字符串 'YYYY-MM-DD HH:mm:ss'
 * @param time 时间戳或Date对象
 * @returns
 */
export const dateFormater = (formater: string, time: string | number) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + "",
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? "0" : "") + M)
    .replace(/DD/g, (D < 10 ? "0" : "") + D)
    .replace(/HH|hh/g, (H < 10 ? "0" : "") + H)
    .replace(/mm/g, (m < 10 ? "0" : "") + m)
    .replace(/ss/g, (s < 10 ? "0" : "") + s);
};
/**
 * 防抖函数
 * @param fn 回调函数
 * @param wait 延迟时间 ms
 * @returns
 */
export const debounce = (fn: Function, wait: number) => {
  let timer: number | null = null; // timer 初始为 null，后续会被赋值为 number
  return function () {
    //@ts-ignore
    let context = this;
    let args = arguments;

    // 如果 timer 存在，则清除之前的定时器
    if (timer !== null) {
      clearTimeout(timer);
    }
    // 设置新的定时器
    timer = window.setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};
/**
 * 节流函数
 * @param fn 回调函数
 * @param delay 延迟时间 ms
 * @returns
 */
export const throttle = (fn: Function, delay: number) => {
  let curTime = Date.now();
  return function () {
    //@ts-ignore
    let context = this,
      args = arguments,
      nowTime = Date.now();

    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
};
/**
 * 对象深拷贝
 * @param obj 对象
 * @param hash 循环引用的 hash 表
 * @returns
 */
export const deepClone = (obj: any, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //正则对象直接返回一个新的正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};
