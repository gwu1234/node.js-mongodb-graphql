const graphql = require('graphql');
const dbService = require('./data/dbService') 
const { GraphQLObjectType, GraphQLString, GraphQLID,GraphQLSchema, GraphQLList, GraphQLFloat } = graphql;

const EmployeeType = new GraphQLObjectType({ 
    name: "Employee",
    fields: ()=>({
        id: {type: GraphQLID}, 
        firstName: {type: GraphQLString}, 
        lastName:  {type: GraphQLString}, 
        companyId: {type: GraphQLID},
        company: {
            type: CompanyType,
            async resolve(parent, args){
                let company = await dbService.getCompanyById(parent.companyId)
                return company;
            }
        } 
    })
 })
 
const CompanyType = new GraphQLObjectType({ 
    name: "Company",
    fields: ()=>({
        id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        location:  {type: GraphQLString},
        rating: {type: GraphQLFloat},
        employee: {
            type: GraphQLList(EmployeeType),
            async resolve(parent, args){
                let employees = await dbService.getEmployeeByCompany(parent.id)
                return employees;
            }
        } 
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        companies: {
            type: new GraphQLList(CompanyType),
            async resolve(parent, args){
                let companies = await dbService.getCompanies()
                return companies;
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args){
                let employees = await dbService.getEmployees()
                return employees;
            }
        },
        employeesById: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                let employees = await dbService.getEmployees()
                let found = employees.find((employee => parseInt (employee.id) === parseInt (args.id)))
                return found
            }
         },
         employeesAtCompany: {
            type: new GraphQLList(EmployeeType),
            args: { companyId: { type: GraphQLID } },
            async resolve(parent, args) {
                let employees = await dbService.getEmployees()
                let found = employees.filter((employee=> parseInt(employee.companyId) === parseInt(args.companyId)))
                return found
            }
         }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCompany: {
            type: CompanyType,
            args: {
                id: { type: GraphQLID },  
                name: { type: GraphQLString },  
                location: { type: GraphQLString },  
                rating: { type: GraphQLFloat }
            },
            async resolve(parent, args){
                let company = {
                    id: args.id,
                    name: args.name,
                    location: args.location,
                    rating: args.rating
                };
                //console.log (company)
                let result = await dbService.createCompany(company);
                console.log (result) 
                if (result.status ==="success") {
                   return company;
                } else {
                    return {}
                }
            }
        },
        addEmployee: {
            type: EmployeeType,
            args: {
                id: { type: GraphQLID },  
                firstName: { type: GraphQLString }, 
                lastName: { type: GraphQLString }, 
                password: { type: GraphQLString },  
                companyId: { type: GraphQLID }
            },
            async resolve(parent, args){
                let employee = {
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    companyId: args.companyId
                };
                let result = await dbService.createEmployee(employee);
                console.log (result) 
                if (result.status ==="success") {
                   return employee;
                } else {
                    return {}
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});