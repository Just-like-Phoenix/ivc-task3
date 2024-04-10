import ApplyEx from "../components/ApplyEx/ApplyEx";
import { HomePageDiv } from "../components/HomePage/StyledComponents";
import SearchComponent from "../components/Search/SearchComponent";
import TableComponent from "../components/Table/TableComponent";

const HomePage = () => {
  const arr = [1, 2, 3];

  return (
    <HomePageDiv>
      <TableComponent />
      {/* <ApplyEx dataForCheck={arr} /> */}
    </HomePageDiv>
  );
};

export default HomePage;
