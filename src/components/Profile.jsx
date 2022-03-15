import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import BarChart from "./BarChart";
import Modal from "./Modal";

const Profile = ({ profileClosed, setProfileClosed }) => {
  // Use graph to show distribution of what percentage of words
  // was found everyday --> localStorage.get("wordict-statistics")
  const [statisticsData, setStatisticsData] = useLocalStorage(
    "wordict-statistics",
    {}
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
