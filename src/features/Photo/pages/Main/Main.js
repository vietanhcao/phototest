import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Banner from "components/Banner/Banner";
import Images from "constants/images";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from 'moment';
import PhotoForm from '../../components/PhotoForm/PhotoForm';


function Main(props) {
	const { photoId } = useParams();
  console.log("Main -> photoId", photoId)

	const photo = useSelector(state => state.photos.find(x => x._id === + photoId))

	const isAddMode = !photoId;

	const initialValues = isAddMode 
	? {
		title: '',
    categoryId: null,
    photo: '',
    datePicker: null,
    titleAntd: '',
    password: '',
    confirmPassword: '',
	} : {...photo, datePicker: moment(photo.datePicker),}
  useEffect(() => {
    
    return () => {
      
    }
  }, [])
	return (
		<div>
			<Banner title="Your banner 🤐1 " backgroundUrl={Images.BANNER_BG} />
			<div className="photo-edit__form" >
				<PhotoForm initialValues={initialValues} isAddMode={isAddMode} />
      </div>
		</div>
	);
}

Main.propTypes = {};

export default Main;
