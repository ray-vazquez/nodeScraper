const excel = require("./excelToJSON");
const data = excel.data;

/**
 * Creates a JSON object from a URLs query string
 * 
 * ie:
 * 
 *  queryStringToJSON("https://www.google.com/search?q=hello+world&oq=hello+world&aqs=chrome..69i57.1890j0j4&sourceid=chrome&ie=UTF-8")

    returns 
    [
      {
        q: 'hello+world',
        oq: 'hello+world',
        aqs: 'chrome..69i57.1890j0j4',    
        sourceid: 'chrome',
        ie: 'UTF-8'
      }
    ]
 *
 * @param {*} string - URL
 * @returns JSON
 */

const queryStringToJSON = url => {
  let parseable = url.slice(url.indexOf("?"));
  let pairs = parseable.slice(1).split("&");
  let obj = {};
  pairs.map(pair => {
    pair = pair.split("=");
    obj[pair[0]] = decodeURIComponent(pair[1] || "");
  });
  return obj;
};

/**
 *Constructs the URLs nesscesary to navagate directly to the product page of the sellers Amazon store using JSON data from queryStringToJSON()
 *
 * @param {*} array
 * @returns array
 */
const createURLFromData = arr => {
  return arr.map(item => {
    const obj = queryStringToJSON(item["Seller"]);
    return "http://www.amazon.com/dp/".concat(
      obj.asin,
      "/ref=ox_sc_act_title_1?smid=",
      obj.seller,
      "&psc=1"
    );
  });
};

module.exports = {
  createURLFromData,
  queryStringToJSON,
  data
};
