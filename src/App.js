import "./App.css";
import SearchPanel from "./SearchPanel/SearchPanel";
import Card from "./Card/Card";
import styled from "styled-components";

const AppWrapper = styled.div`
  height: 100%;
  margin: 0;
`;

function App() {
  return (
    <AppWrapper className="App">
      <SearchPanel></SearchPanel>
      <Card></Card>
    </AppWrapper>
  );
}

export default App;
