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
    return <div>Test render</div>;
  }
}

function ReactStandardFunction () {
  let title = "Test LOC";
  return <div>{title}</div>;
}

const ReactStandardFunctionAssignmentLOC = function () {
  let title = "Test LOC";
  return <div>{title}</div>;
};

const ReactArrowFunctionLOC = ({ name }) => {
  let description = "Test LOC desc";

  return <div>Name: {name}, Description: {description}</div>;
};

export const ReactStandardFunctionAssignmentExportLOC = function () {
  let title = "Test LOC";
  return <div>{title}</div>;
};

export const ReactArrowFunctionExportLOC = ({ name }) => {
  let description = "Test LOC desc";

  return <div>Name: {name}, Description: {description}</div>;
};

export default function ReactStandardFunctionExport () {
  let title = "Test LOC";
  return <div>{title}</div>;
};