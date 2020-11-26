import React from "react";
import ProfileBar from "./ProfileBar.js";

const InternalPageWithProfileBar = ({
  childComponent: Component,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  ...rest
}) => (
  <div>
    <ProfileBar
      onEditProfile={onEditProfile}
      onAddPlace={onAddPlace}
      onEditAvatar={onEditAvatar}
    />
    <Component {...rest} />
  </div>
);

export default InternalPageWithProfileBar;
