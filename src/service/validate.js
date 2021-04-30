import { cpf as cpfValidate } from "cpf-cnpj-validator";
import moment from "moment"

const cpf = async (cpf) => {
  let cpfValid = cpfValidate.isValid(cpf);
  console.log("cpf é: " + cpfValid)
  return cpfValid
}

const afterCurrentDate = async (date) => {
  let currentDate = moment(new Date(), "YYYY-MM-DD")
  let dateValid = moment(date, "YYYY-MM-DD").isBefore(currentDate) ? true : false;
  console.log("data hoje: " + currentDate, date)
  console.log("data é: " + dateValid)
  return dateValid
}
const customValidates = {cpf, afterCurrentDate}

export default customValidates;