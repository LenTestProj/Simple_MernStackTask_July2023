import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import classes from "./FormListSection.module.css";
import { faArrowsUpDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import CustomeToastMessage from "../../../../../customComponents/CustomToastMessage/CustomeToastMessage";
import { useNavigate } from "react-router-dom";
import PopupModal from "../../../../../customComponents/PopupModal/PopupModal";

const ListHeaderItems = [
  {
    title: "First Name",
    className: "sm:w-[14%] w-[19%] flex",
  },
  {
    title: "Last Name",
    className: "sm:w-[8.7%] w-[20%] flex",
  },
  {
    title: "Mobile No",
    className: "sm:w-[10%] w-[21%] flex",
  },
  {
    title: "Email Id",
    className: "sm:w-[20%] w-[25%] flex",
  },
  {
    title: "Gender",
    className: "w-[8.3%] hidden sm:flex",
  },
  {
    title: "Birth Date",
    className: "w-[11%] hidden sm:flex",
  },
  {
    title: "Country",
    className: "w-[10%] hidden sm:flex",
  },
  {
    title: "City",
    className: "w-[10%] hidden sm:flex",
  },
  {
    title: "Action",
    className: "sm:w-[8%] w-[18%] flex",
  },
];

// const ListItems=[
//     {
//         title:'First Name',
//         className:'w-[14%]'
//     },
//     {
//         title:'Last Name',
//         className:'w-[8.7%]'
//     },
//     {
//         title:'Mobile No',
//         className:'w-[10%]'
//     },
//     {
//         title:'Email Id',
//         className:'w-[20%]'
//     },
//     {
//         title:'Gender',
//         className:'w-[8.3%]'
//     },
//     {
//         title:'Birth Date',
//         className:'w-[11%]'
//     },
//     {
//         title:'Country',
//         className:'w-[10%]'
//     },
//     {
//         title:'City',
//         className:'w-[10%]'
//     },
//     {
//         title:'Action',
//         className:'w-[8%]'
//     },
// ]

const PopupHeader = "Delete Item";
const PopupBody = "Are you sure you want to delete this employee";
const PopupBtns = [
    { name: "Cancel", onClick: ()=>{},styles:{backgroundColor:'red',marginRight:'0.7rem',color:'white'} },
    { name: "Confirm", onClick: ()=>{}, styles:{backgroundColor:'green',color:'white'} },
  ];

const FormListSection = ({currentPage,lastPage,setLastPage,setCurrentPage,searchValue}) => {
  console.log(searchValue);
  const [ListHeaderValues, setListHeaderValues] = useState(ListHeaderItems);
  //   const [ListItemValues,setListItemValues]=useState(ListItems)
  const [PopupButtons,setPopupButtons]=useState(PopupBtns);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [chosenEmployeeId, setChosenEmployeeId] = useState(null);
  const [showPopupModal, setShowPopupModal] = useState(false);

  const confirmDeleteHandler = useCallback(() => {
    setShowPopupModal(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setIsLoading(true);
    axios
      .delete("http://localhost:5000/employee/"+chosenEmployeeId, config)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        CustomeToastMessage(
         'The Employee has been deleted successfully'
        );
        setEmployees(res.data.employees);
        setChosenEmployeeId(null);
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log("The error occured while deleting the employee is: ");
        console.log(err);
        CustomeToastMessage(
          err.response ? err.response.data.message : err.message,
          "error"
        );
        setIsLoading(false);
      });
  },[chosenEmployeeId,setCurrentPage]);

  const closeModal = useCallback(() => {
    setShowPopupModal(false);
  },[]);


  useEffect(()=>{
    setPopupButtons(prev=>prev.map((item,i)=>{
      if(i===0){
         item.onClick=closeModal;
      }
      else{
        item.onClick=confirmDeleteHandler;
      }
      return item;
    }))
  },[closeModal,confirmDeleteHandler])

  useEffect(() => {
    let url;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    setIsLoading(true);
    if(searchValue){
      url="http://localhost:5000/employee?page="+currentPage+'&searchValue='+searchValue;
    }
    else{
      url="http://localhost:5000/employee?page="+currentPage;
    }
    axios
      .get(url, config)
      .then((res) => {
        setIsLoading(false);
        setEmployees(res.data.employees);
        setLastPage(res.data.lastPage??1);
      })
      .catch((err) => {
        console.log("The error occured while fetching employees are: ");
        console.log(err);
        CustomeToastMessage(
          err.response ? err.response.data.message : err.message,
          "error"
        );
        setIsLoading(false);
      });
  }, [currentPage,setLastPage,lastPage,searchValue]);

  
  

  return (
    <div className={classes.main}>
      {isLoading && <LoadingSpinner />}
      {showPopupModal && (
        <PopupModal
          onClose={closeModal}
          header={PopupHeader}
          body={PopupBody}
          btns={PopupButtons}
        />
      )}
      {employees.length>0?<>
      <div className={classes.listHeaderSection + " w-[98%]"}>
        {ListHeaderValues.map((item, i) => {
          return (
            <div
              className={`${classes.listItem} font-bold ${item.className}`}
              key={i}
            >
              <p>{item.title}</p>
              {/* <FontAwesomeIcon icon={faArrowsUpDown} className={classes.lisItemHeaderSymbol}/> */}
            </div>
          );
        })}
      </div>
      {employees.map((item, i) => {
        return (
          <div key={i} className="w-[98%] flex flex-col">
            <div className={classes.listHeaderSection + " w-full"}>
              <div className={classes.listItem + " " + classes.firstName}>
                <p>{item.firstName}</p>
              </div>
              <div className={classes.listItem + " " + classes.lastName}>
                <p>{item.lastName}</p>
              </div>
              <div className={classes.listItem + " " + classes.mobileNumber}>
                <p>{item.mobileNumber}</p>
              </div>
              <div className={classes.listItem + " " + classes.email}>
                <p>{item.email}</p>
              </div>
              <div className={classes.listItem + " " + classes.gender}>
                <p>{item.gender ?? ""}</p>
              </div>
              <div className={classes.listItem + " " + classes.dob}>
                <p>{item.dob ?? ""}</p>
              </div>
              <div className={classes.listItem + " " + classes.country}>
                <p>{item.country ?? ""}</p>
              </div>
              <div className={classes.listItem + " " + classes.city}>
                <p>{item.city}</p>
              </div>
              <div className={classes.listItem + " " + classes.action}>
                <div className={classes.buttonSection}>
                  <button
                    className={classes.button + " bg-green-700 "}
                    onClick={() => navigate("/Employee/edit/" + item._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={classes.button + " bg-red-600 "}
                    onClick={() => {
                      setChosenEmployeeId(item._id);
                      setShowPopupModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </>:<p className={classes.noEmployeeFound}>No Employees Found</p>}
    </div>
  );
};

export default FormListSection;
