import React from "react";

import "./space.styles.scss";

class Space extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = event => {
    event.target.innerHTML = this.props.mark;
  };

  render() {
    return <div className="space" onClick={this.handleClick}></div>;
  }
}

export default Space;
