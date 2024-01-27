import React, { Fragment } from "react";
import { NextPage } from "next";
import { PathConstant } from "const";

const Profile: NextPage = () => {
  return <Fragment />;
};

export default Profile;

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: PathConstant.PROFILE_MY_GAME_WALLET,
    },
  };
};
