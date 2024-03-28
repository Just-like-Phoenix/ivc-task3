const ApplyEx = ({ dataForCheck }: { dataForCheck: any }) => {
  console.log();
  return (
    <div style={{ color: "white" }}>
      <h1>{Array.isArray.apply(Array, [dataForCheck]) ? "true" : "false"}</h1>
    </div>
  );
};

export default ApplyEx;
