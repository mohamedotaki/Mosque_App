import Dropdown from "react-bootstrap/Dropdown";
import "./DropDown.css";
import React from "react";

function DropDown(props) {
  const [name, setName] = React.useState(props.name);

  return (
    <Dropdown className="Main">
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        {name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.data.map((item, index) => (
          <Dropdown.Item
            onClick={() => {
              props.results(item.value);
              setName(item.name);
            }}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
