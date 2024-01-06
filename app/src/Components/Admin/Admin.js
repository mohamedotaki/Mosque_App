import "./Admin.css";
import { PencilSquare, PlusSquare, Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
export default function Admin(props) {
  return (
    <div>
      <Button variant="primary" onClick={props.onNew}>
        <PlusSquare />
      </Button>
      <Button variant="primary" onClick={props.onEdit}>
        <PencilSquare />
      </Button>
      <Button variant="danger" onClick={() => ""}>
        <Trash />
      </Button>
    </div>
  );
}
