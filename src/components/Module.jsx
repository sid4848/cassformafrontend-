import React from "react";
import { memo } from "react";
import "../styles/module.css";
import { Handle, Position } from "reactflow";
import InputIcon from "../icons/enter.png";

const Module = ({ data }) => {
  const condition = data.name === "Input";
  return (
    <div>
      <div className="draggeble_ele">
        {condition ? (
          <p>
            <img src={InputIcon} alt="input" />
          </p>
        ) : (
          <p>{data.input_type}</p>
        )}

        <p>{data.name + " " + data.id}</p>
        <p>{condition ? data.input_type : data.output_type}</p>
      </div>
      {!condition && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ top: 9 }}
          id={data.id}
        />
      )}
      {condition && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ bottom: 9 }}
          id={data.id}
        />
      )}
    </div>
  );
};

export default memo(Module);
