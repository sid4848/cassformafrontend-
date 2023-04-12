import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Module from "./Module";

export default ({ data }) => {
  const [page, setPage] = useState(0);

  const onDragStart = (event, id) => {
    event.dataTransfer.setData("application/reactflow", id);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const nodesPerPage = 5;
  const count = Math.ceil(data.length / nodesPerPage);

  return (
    <aside>
      <div>
        {data
          .slice(page * nodesPerPage, page * nodesPerPage + nodesPerPage)
          .map((node, index) => (
            <div onDragStart={(event) => onDragStart(event, node.id)} draggable>
              <Module data={node} key={node.id} />
            </div>
          ))}
      </div>
      <Stack
        spacing={1}
        sx={{
          "& button": { minWidth: "auto", padding: "6px 8px", margin: "0" },
        }}
      >
        <Pagination
          count={count}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": { fontSize: "0.7rem" },
          }}
          onChange={handleChangePage}
        />
      </Stack>
    </aside>
  );
};
