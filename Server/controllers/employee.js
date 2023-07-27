const Employee=require('../models/employee');
const User=require('../models/user');
const {validationResult}=require('express-validator');
const errorFunction=require('../utils/errorFunction');

exports.addEmployee=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    errorFunction('Validation Failed',422,errors.array());
  }
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;
  const mobileNumber=req.body.mobileNumber;
  const dob=req.body.dob ?? req.body.dob;
  const gender=req.body.gender ?? req.body.gender;
  const address = req.body.address ?? req.body.address; 
  const country=req.body.country??req.body.country;
  const city=req.body.city??req.body.city;
  const isOtherCity=req.body.isOtherCity??req.body.isOtherCity;
  const isAWS=req.body.isAWS??req.body.isAWS;
  const isDevOps=req.body.isDevOps??req.body.isDevOps;
  const isFullStackDeveloper
=req.body.isFullStackDeveloper
??req.body.isFullStackDeveloper
;
  const isMiddleware
=req.body.isMiddleware
??req.body.isMiddleware
;
  const isQAAutomation=req.body.isQAAutomation??req.body.isQAAutomation;
  const isWebServices
=req.body.isWebServices
??req.body.isWebServices
;

//add the employee
const employee=new Employee({
    firstName,
    lastName,
    email,
    mobileNumber,
    dob,
    gender,
    address,
    country,
    city,
    isOtherCity,
    isAWS,
    isDevOps,
    isFullStackDeveloper,
    isMiddleware,
    isQAAutomation,
    isWebServices,
    creator:req.userId
});
employee.save().then(result=>{
    return User.findById(req.userId);
}).then(user=>{
  user.employees.push(employee);
  return user.save();
}).then(()=>{
  res.status(201).json({result:employee});
}).catch(error=>{
  if(!error.statusCode){
    error.statusCode=500;
  }
  next(error);
})
}

exports.fetchEmployees=(req,res,next)=>{
  const currentPage=req.query.page||1;
  const searchValue=req.query.searchValue;
  const perPage=8;
  let totalItems;

  if(searchValue){
    let firstNameEmployees=[];
    let lastNameEmployees=[];
    let totalEmployees=[];

    Employee.find({firstName:{$regex:new RegExp(searchValue,'i')}}).then(employees=>{
      firstNameEmployees=employees;
      return Employee.find({lastName:{$regex:new RegExp(searchValue,'i')}})
    }).then(employees=>{
      lastNameEmployees=employees;
      totalEmployees=[...firstNameEmployees,...lastNameEmployees];
      if(totalEmployees.length===0){
        return Promise.resolve(totalEmployees);
      }
      else{
          totalItems=totalEmployees.length;
          totalEmployees=totalEmployees.slice((currentPage-1)*perPage);
          totalEmployees=totalEmployees.slice(0,perPage);
          return Promise.resolve(totalEmployees);
      }
    }).then(employees=>{
         res.status(200).json({employees:employees,totalItems:totalItems,lastPage:Math.ceil(totalItems/perPage)})
      }).catch(error=>{
      if(!error.statusCode){
        error.statusCode=500;
      }
      next(error);
    })
  }
  else{
    Employee.find().countDocuments().then(count=>{
      totalItems=count;
      return Employee.find().skip((currentPage-1)*perPage).limit(perPage)
     }).then(employees=>{
         res.status(200).json({employees:employees,totalItems:totalItems,lastPage:Math.ceil(totalItems/perPage)})
      }).catch(error=>{
        if(!error.statusCode){
          error.statusCode=500;
        }
        next(error);
      })
  }
}

exports.getEmployee=(req,res,next)=>{
  const empId=req.params.empId;
  Employee.findById(empId).then(employee=>{
    if(!employee){
      errorFunction('Could not find Employee',404);
    }
    res.status(200).json(employee)
  }).catch(error=>{
    if(!error.statusCode){
      error.statusCode=500;
    }
    next(error);
  })
}

exports.postEditEmployee=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    errorFunction('Validation Failed',422,errors.array());
  }
  const empId=req.params.empId;
Employee.replaceOne({_id:empId},req.body).then(employee=>{ 
  if(!employee){
    errorFunction('Could not find Employee',404);
  }
  res.status(200).json(employee);
}).catch(error=>{
  if(!error.statusCode){
    error.statusCode=500;
  }
  next(error);
})
}

exports.deleteEmployee=(req,res,next)=>{
  const empId=req.params.empId;
  Employee.findById(empId).then(employee=>{
    if(!employee){
      errorFunction('Could not find Employee',404);
    }
    return Employee.findByIdAndRemove(empId);
  }).then(()=>{
    return User.findById(req.userId)
  }).then(user=>{
    user.employees.pull(empId);
    return user.save();
  }).then(()=>{
    return Employee.find()
  }).then(employees=>{
    res.set('Location','/employee');
    res.status(303).send()
  }).catch(error=>{
    if(!error.statusCode){
    error.statusCode=500;
  }
  next(error);
  })
}