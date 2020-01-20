import React from "react";

import "./list-container.styles.scss";

const ListContainer = ({ arr }) => (
  <div className="list-container">
    {arr.map((element, idx) => (
      <p key={idx}>{element}</p>
    ))}
  </div>
);

export default ListContainer;
