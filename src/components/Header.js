import React from 'react';

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-md w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Mini Games</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    > <span className="navbar-toggler-icon"></span>
                    </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    >Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"
                    >Forca</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">FilmeQuiz</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
}

export default Header