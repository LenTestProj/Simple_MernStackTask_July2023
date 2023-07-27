import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import CustomeToastMessage from '../../../../customComponents/CustomToastMessage/CustomeToastMessage';
import PopupModal from '../../../../customComponents/PopupModal/PopupModal';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import classes from './ImagesForm.module.css';

const PopupHeader = "Delete Image";
const PopupBody = "Are you sure you want to delete this Image";
const PopupBtns = [
  { name: "Cancel", onClick: ()=>{},styles:{backgroundColor:'red',marginRight:'0.7rem',color:'white'} },
  { name: "Confirm", onClick: ()=>{}, styles:{backgroundColor:'green',color:'white'} },
];

const UploadImage=()=>{
  const [Image,setImage]=useState('');
   const [fileName,setFileName]=useState('');
   const [isfileNameInputTouched,setIsFileNameInputTouched]=useState(false);
   const [isLoading,setIsLoading]=useState(false);
   const [Images,setImages]=useState([]);
   const [chosenImageId, setChosenImageId] = useState(null);
  const [showPopupModal, setShowPopupModal] = useState(false);
  const [PopupButtons,setPopupButtons]=useState(PopupBtns);


  const confirmDeleteHandler=useCallback(()=>{
    setShowPopupModal(false);
    setIsLoading(true);
    axios({
      url:'http://localhost:5000/user/deleteImage/'+chosenImageId,
      method:'DELETE',
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(res=>{
      setIsLoading(false);
      setChosenImageId(null);
      setImages(res.data); 
      CustomeToastMessage(
        'Image deleted successfully'
       );

    }).catch(err=>{
      console.log("The error occured while deleting the image is: ");
        console.log(err);
        CustomeToastMessage(
          err.response ? err.response.data.message : err.message,
          "error"
        );
        setIsLoading(false);
    })
  },[chosenImageId]);

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


    useEffect(()=>{
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      setIsLoading(true);
      axios.get('http://localhost:5000/user/getImages',config).then(res=>{
        setImages(res.data);
        setIsLoading(false);
      }).catch(err=>{
        console.log("The error occured while fetching the images is: ");
        console.log(err);
        CustomeToastMessage(
          err.response ? err.response.data.message : err.message,
          "error"
        );
        setIsLoading(false);
      })
    },[])

    const nameChangeHandler=(event)=>{
      setFileName(prev=>event.target.value);
    }

    const fileNameInputBlurHandler=()=>{
      setIsFileNameInputTouched(true);
    }

    const submitFilehandler=()=>{
      if(Image && fileName.length>0){
        console.log('success');
        console.log(Image);
        console.log(fileName);
        const formData=new FormData();
        formData.append('image',Image);
        formData.append('fileName',fileName);
        setIsLoading(true);
        console.log(formData);
        axios({
          url:'http://localhost:5000/user/uploadImage',
          method:'POST',
          headers:{
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data:formData
        }).then(res=>{
          setImages(res.data);
          setIsLoading(false);
          CustomeToastMessage('The image has been added successfully',
            "success"
          );
        }).catch(err=>{
          console.log("The error occured while adding a new Image is: ");
        console.log(err);
        CustomeToastMessage(
          err.response ? err.response.data.message : err.message,
          "error"
        );
        setIsLoading(false);
        })

      }
      else{
        alert('Please enter the requried input fields');
      }
    }


    return <div className={classes.content}>
      {isLoading && <LoadingSpinner />}
      {showPopupModal && (
        <PopupModal
          onClose={closeModal}
          header={PopupHeader}
          body={PopupBody}
          btns={PopupButtons}
        />
      )}
        <div className={classes.firstHalf}>
          <div className={classes.inputSection}>
            <p>Select File:</p>
            <input type='file' className={classes.input} onChange={(event)=>setImage(event.target.files[0])}/>
          </div>
          <div className={classes.inputSection+' pt-2 sm:pt-0'}>
            <p>File Name:</p>
            <input type='text' className={classes.input+' sm:pr-9 '+classes.textInput} value={fileName} onChange={nameChangeHandler} onBlur={fileNameInputBlurHandler}/>
            {fileName.length===0 && isfileNameInputTouched && <p className={classes.error}>Please enter a valid input</p>}
          </div>
          <div className={classes.inputSection+' '+classes.buttonSection}>
          <button className={classes.button}type='button' onClick={submitFilehandler}>Upload</button>
          </div>
        </div>
        <div className={classes.secondHalf}>
            <div className={classes.list}>
              {Images.map((image,i)=>{
                return <div className={classes.listItem} key={i}>
                  <img src={'http://localhost:5000/'+image.imageUrl} alt='Not Found' className={classes.image}/>
                  <p className={classes.imageText}>{image.fileName}</p>
                  <div>
                    <button className={classes.deleteButton} type='button' onClick={()=>{
                      setChosenImageId(image._id);
                      setShowPopupModal(true);
                    }}>Delete Image</button>
                  </div>
                </div>
              })}
            </div>
        </div>
    </div>
}

const ImagesForm = () => {
  return (
    <div className={classes.main}>
      <form className={classes.form}>
     <UploadImage />
    </form>
    </div>
  )
}

export default ImagesForm
