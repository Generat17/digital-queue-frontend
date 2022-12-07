import React, { useState } from "react";

import { observer } from "mobx-react-lite";

const Test = () => {
  // Состояние списка
  const [checked, setChecked] = useState<string[]>(["Apple", "Banana"]);
  const checkList = ["Apple", "Banana", "Tea", "Coffee"];

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(...checked, event.target.value);
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  const isChecked = (item: string) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div>
      <div className="list-container">
        {checkList.map((item, index) => (
          <div key={index}>
            <input
              value={item}
              type="checkbox"
              onChange={handleCheck}
              checked={checked.includes(item)}
            />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
      </div>

      <div>{`Items checked are: ${checkedItems}`}</div>
    </div>
  );
};

export default observer(Test);
