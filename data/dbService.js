const Company = require('./company');
const Employee= require('./employee');

console.log(Company)
console.log(Employee)

async function createCompany(company) {
  try {
    let companyModel = new Company(company);
    await companyModel.save()
    return {status:"success"};
  } catch (err) {
    console.error(`Error while creating company `, err.message);
    return {status:"failure"};
  }
}

async function createEmployee(employee) {
  try {
    let employeeModel = new Employee (employee);
    await employeeModel.save()
    return {status:"success"};
  } catch (err) {
    console.error(`Error while creating employee `, err.message);
    return {status:"failure"};
  }
}

async function getEmployees() {
  try {
    let result = await Employee.find({})
    return result
  } catch (err) {
    console.error(`Error while getting employees `, err.message);
    return [];
  }
}

async function getCompanies() {
  try {
    let result = await Company.find({})
    return result
  } catch (err) {
    console.error(`Error while getting companies `, err.message);
    return [];
  }
}

async function getCompanyById(id) {
  try {
    let result = await Company.find({id:id})
    if (result.length === 0) {
       return {}
    }
    return result[0]
  } catch (err) {
    console.error(`Error while getCompanyById`, err.message);
    return {};
  }
}

async function getEmployeeByCompany(companyId) {
  try {
    let result = await Employee.find({companyId:companyId})
    return result
  } catch (err) {
    console.error(`Error while getEmployeeByCompany `, err.message);
    return [];
  }
}

module.exports = {
  createCompany, 
  createEmployee,
  getEmployees,
  getCompanies,
  getCompanyById,
  getEmployeeByCompany
}