import React from "react";
function PanelNavbar() {
  return (
    <div className="panel-nav-bg">
      <div className="panel-item">
        <span>
          <i class="fas fa-user" />
        </span>
        <p>PROFILE</p>
      </div>
      <div className="panel-item">
        <span>
          <i class="fas fa-clipboard-list" />
        </span>
        <p>ORDERS</p>
      </div>
      <div className="panel-item">
        <span>
          <i class="fas fa-map-marker" />
        </span>
        <p>ADDRESS</p>
      </div>
      <div className="panel-item">
        <span>
          <i class="far fa-comments" />
        </span>
        <p>REVIEWS</p>
      </div>
      <div className="panel-item">
        <span>
          <i class="fas fa-book" />
          &nbsp;
          <i class="fas fa-plus" />
        </span>
        <p> ADD NEW BOOK</p>
      </div>
    </div>
  );
}
export default PanelNavbar;
