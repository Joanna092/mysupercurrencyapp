import React from "react"

function Navbar () {

return (
    <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">THE BANKER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="#">Currency Conventer<span class="sr-only">(current)</span></a>
      <a className="nav-item nav-link" href="#">Exchange Rates</a>
      <a className="nav-item nav-link" href="#">Historical Exchange</a>
    </div>
  </div>
</nav>
             
        </div>
)

}

export default Navbar