"use client";

import { memo } from "react";

const CustomButton = ({ classname, children, ...props }) => {
  return (
    <button className={`btn btn-primary ${classname}`} {...props}>
      {children}
    </button>
  );
};

export default memo(CustomButton);
