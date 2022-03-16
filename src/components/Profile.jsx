import React from "react";
import BarChart from "./BarChart";
import Modal from "./Modal";

const Profile = ({ profileClosed, setProfileClosed }) => {
  // Use graph to show distribution of what percentage of words
  // was found everyday --> localStorage.get("wordict-statistics")
  const statisticsData = JSON.parse(
    localStorage.getItem("wordict-statistics") ?? {}
  );

  return (
    <Modal
      name="Profile"
      modalClosed={profileClosed}
      setModalClosed={setProfileClosed}
    >
      <BarChart
        title={"Percentages of Daily Percentages"}
        statistics={statisticsData}
      />
    </Modal>
  );
};

export default Profile;
