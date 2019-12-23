const xls = require("xlsx");
const workbook = xls.readFile("./fileName.xls");
const sheetNameList = workbook.SheetNames;
const data = xls.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

module.exports = {
  data
};
