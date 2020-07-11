import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import './Header.scss'

function Header(props) {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs={"auto"}>
              <a
                className="header__link header__title"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              > fa </a>
          </Col>

          <Col xs={"auto"}>
              <NavLink
                exact
                className="header__link"
                to="/photos"
                activeClassName="header__link--active"
              >
                Redux Project

              </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

Header.propTypes = {

}

export default Header

