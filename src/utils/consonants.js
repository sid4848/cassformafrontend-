export const columns = [
  { id: "name", label: "Name", minWidth: 170, align: "left" },
  { id: "code", label: "inputType", minWidth: 100, align: "center" },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
