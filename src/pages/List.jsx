import { useEffect, useState } from "react";
import axios from "axios";

import CustomizedTables from "../components/Table";
import { workflowListApi } from "../utils/apis";

import "../styles/listStyles.css";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(workflowListApi)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="list">
      <div className="listHeaderDiv">
        <h3>WorkFlow</h3>
      </div>
      <div className="listTableDiv">
        <CustomizedTables data={data} />
      </div>
    </div>
  );
};

export default List;
