import React from "react";
import PropTypes from "prop-types";
import { Switch, useRouteMatch, Redirect, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import AddEdit from "./pages/AddEdit/AddEdit";
import NotFound from "../../components/NotFound/NotFound";
import List from './pages/List/List';

function Photo(props) {
	const match = useRouteMatch();
	console.log("Photo -> match", match);

	return (
		<Switch>
			<Route exact path={match.url} component={Main} />
			<Route exact path={`${match.url}/list`} component={List} />
			{/* <Route exact path={`${match.url}/add`} component={AddEdit} /> */}
			<Route path={`${match.url}/:photoId`} component={AddEdit} />
			<Route component={NotFound} />
		</Switch>
	);
}

Photo.propTypes = {};

export default Photo;
