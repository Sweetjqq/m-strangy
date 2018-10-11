export const getShareUrlConfig = () => {
  if (HOST == "http://10.21.10.192:80") {
    return 'http://10.21.10.171:8085/#/sharepageto?shareId='
  } else if (HOST == "http://192.168.10.91:80") {
    return 'http://192.168.10.90:84//#/sharepageto?shareId='
  } else if (HOST == "https://api.fw-fintech.com") {
    return 'http://strategy.fw-fintech.com/#/sharepageto?shareId='
  }
}
export const pic = (item) => {
  if (HOST == "http://10.21.10.192:80") {
    return item = "http://10.21.10.170:19001/";
  } else if (HOST == "http://192.168.10.91:80") {
    return item = "http://192.168.10.94:8090/";
  } else if (HOST == "https://api.fw-fintech.com") {
    return item = "https://imgs.fw-fintech.com/";
  }
}
