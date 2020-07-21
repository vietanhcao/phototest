import React from "react";
import PropTypes from "prop-types";
import Banner from "components/Banner/Banner";
import PhotoForm from "components/PhotoForm/PhotoForm";
import Images from "constants/images";


function Main(props) {
	return (
		<div>
			<Banner title="Your banner 🤐 " backgroundUrl={Images.BANNER_BG} />
			<div className="photo-edit__form">
				<PhotoForm />
      </div>
		</div>
	);
}

Main.propTypes = {};

export default Main;
