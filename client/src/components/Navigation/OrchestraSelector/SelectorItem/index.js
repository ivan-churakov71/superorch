import React, { useContext } from "react";
import SelectionContext from "../../../../context/selection-context";
import { useHistory } from "react-router-dom";
import ItemIcon from "./ItemIcon";

function SelectorIcon({ orchestra }) {
  const { orchestra: selection } = useContext(SelectionContext);

  const history = useHistory();
  function handleClick() {
    selection.select(orchestra._id);

    history.push("/");
  }

  const letter = orchestra.name.charAt(0);

  return (
    <ItemIcon
      onClick={handleClick}
      letter={letter}
      active={orchestra._id === selection.id}
    />
  );
}

export default SelectorIcon;
