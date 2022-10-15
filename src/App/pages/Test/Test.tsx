import TestStore from "@store/TestStore";
import { observer } from "mobx-react-lite";

const Test = () => {
  const responsibilityStore = new TestStore();

  return <div></div>;
};

export default observer(Test);
