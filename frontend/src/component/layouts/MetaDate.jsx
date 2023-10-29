import React from "react";
import Helmet from "react-helmet";

const MetaDate = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaDate;
