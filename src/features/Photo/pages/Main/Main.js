import React from "react";
import PropTypes from "prop-types";
import Banner from "components/Banner/Banner";
import Images from "constants/global";


function Main(props) {
	return (
		<div>
			<Banner title="Your banner 🤐 " backgroundUrl={Images.BANNER_BG} />
			<div className="photo-edit__form">

      </div>
		</div>
	);
}

Main.propTypes = {};

export default Main;
