import { AddIcon } from "./svg-collection/add";

export const Icon = ({ config }) => {
  const svg_collection = {
    AddIcon,
  };

  const ImageConfig = {
    fill: config.fill ? config.fill : "white",
    size: config.size ? config.size : 20,
    stroke: config.stroke ? config.stroke : "none",
  };

  const Icon = svg_collection[config.icon];
  return (
    <span
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Icon
        fill={ImageConfig.fill}
        size={ImageConfig.size}
        stroke={ImageConfig.stroke}
      />
    </span>
  );
};
