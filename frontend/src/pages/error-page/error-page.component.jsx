import React from "react";
import { withRouter } from "react-router-dom";

import AlertBox from "../../components/alert-box/alert-box.component";

import "./error-page.styles.scss";

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: null,
      page: null
    };
  }

  componentDidMount() {
    const { history, location } = this.props;
    const { heading, page } = location.state;
    this.setState({ heading, page });

    setTimeout(() => {
      history.push(`/${page}`);
    }, 10000);
  }

  render() {
    const { heading, page } = this.state;

    return (
      <div className="error-page">
        <AlertBox
          color="danger"
          heading={heading}
          btnFunc="redirect"
          page={page}
        >
          {`To go back to the ${page} page, please click the button below. Otherwise, it will redirect you to the ${page} page after 10 seconds.`}
        </AlertBox>
      </div>
    );
  }
}

export default withRouter(ErrorPage);
