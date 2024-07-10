import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "../App.css"

function Header({ title, searchBar, onSearch, onReload }) {
  const handleSearch = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const handleReload = () => {
    if (onReload) {
      onReload();
    }
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" >
        <div className="container-fluid">
          <Link to="/StudentRecord" className="navbar-brand">{title}</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active"></span>
              </li>
              <li className="nav-item">
                <span className="nav-link"></span>
              </li>
            </ul>
            {searchBar ? (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
                <button className="btn btn-outline-light" type="button" onClick={handleReload}>
                  Reload
                </button>
              </form>
            ) : (
              ''
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.defaultProps = {
  searchBar: true,
};

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired,
  onSearch: PropTypes.func,
  onReload: PropTypes.func,
};

export default Header;
