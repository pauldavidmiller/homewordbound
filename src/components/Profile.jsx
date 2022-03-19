import React from "react";
import BarChart from "./BarChart";
import Modal from "./Modal";

const Profile = ({ profileOpen, setProfileOpen }) => {
  // Use graph to show distribution of what percentage of words
  // was found everyday --> localStorage.get("wordict-statistics")
  const statisticsData = JSON.parse(
    localStorage.getItem("wordict-statistics") ?? "{}"
  );

  return (
    <Modal name="Profile" modalOpen={profileOpen} setModalOpen={setProfileOpen}>
      <BarChart
        title={"Percentages and Count of Daily Percentages"}
        statistics={statisticsData}
      />
    </Modal>
  );
};

export default Profile;
