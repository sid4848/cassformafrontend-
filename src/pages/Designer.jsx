import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import Sidebar from "../components/Sidebar";
import Module from "../components/Module";
import { moduleListApi } from "../utils/apis";

import "reactflow/dist/style.css";
import "../styles/designer.css";
import "../styles/listStyles.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const Designer = () => {
  const { username, inputType, id } = useParams();
  const initialNodes = [
    {
      id: "1",
      type: "custom",
      data: {
        input_type: inputType,
        name: "Input",
        output_type: " ",
        id: " ",
      },
      position: { x: 100, y: 100 },
    },
  ];

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(moduleListApi)
      .then((response) => {
        setData(response.data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event, node) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeId = event.dataTransfer.getData("application/reactflow");

      const node = data.filter((d) => d.id === nodeId);
      console.log(node);
      const input_type = node[0].input_type;
      const name = node[0].name;
      const output_type = node[0].output_type;
      const id = node[0].id;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        position,
        type: "custom",
        data: {
          input_type,
          name,
          output_type,
          id,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, data]
  );

  const nodeTypes = {
    custom: Module,
  };

  return (
    <div className="designer">
      <div className="listHeaderDiv">
        <h4>Workflow name: {username} </h4>
      </div>
      <div className="designer_canva">
        <ReactFlowProvider>
          <div className="designer_canve-sidebar">
            <p className="designer_canve-sidebar_title">Modules</p>
            <Sidebar data={data} />
          </div>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
            ></ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Designer;
