import * as reactProf from "babel-plugin-react-prof";

class ReactTestBase {
  constructor(props) {
    console.log(props);
  }
}

class ReactTestComponent extends ReactTestBase {
  constructor(props) {
    super(props);
  }

  render() {
    reactProf.incrementRenderCount("ReactTestComponent");
    return <div>Test render</div>;
  }
}

function ReactStandardFunction() {
  let title = "Test LOC";
  reactProf.incrementRenderCount("ReactStandardFunction");
  return <div>{title}</div>;
}

const ReactStandardFunctionAssignmentLOC = function () {
  let title = "Test LOC";
  reactProf.incrementRenderCount("ReactStandardFunctionAssignmentLOC");
  return <div>{title}</div>;
};

const ReactArrowFunctionLOC = ({ name }) => {
  let description = "Test LOC desc";
  reactProf.incrementRenderCount("ReactArrowFunctionLOC");
  return (
    <div>
      Name: {name}, Description: {description}
    </div>
  );
};

export const ReactStandardFunctionAssignmentExportLOC = function () {
  let title = "Test LOC";
  reactProf.incrementRenderCount("ReactStandardFunctionAssignmentExportLOC");
  return <div>{title}</div>;
};
export const ReactArrowFunctionExportLOC = ({ name }) => {
  let description = "Test LOC desc";
  reactProf.incrementRenderCount("ReactArrowFunctionExportLOC");
  return (
    <div>
      Name: {name}, Description: {description}
    </div>
  );
};
export default function ReactStandardFunctionExport() {
  let title = "Test LOC";
  reactProf.incrementRenderCount("ReactStandardFunctionExport");
  return <div>{title}</div>;
}