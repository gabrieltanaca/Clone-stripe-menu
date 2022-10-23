import { Products, Developers, Company } from "../Content";
import { Container } from "./styles";
import DropdownList from "../Dropdown/DropdownList";
const itemsList = [
  { name: "Produtos", content: Products, backgroundHeight: 286 },
  { name: "Desenvolvedores", content: Developers, backgroundHeight: 167 },
  { name: "Empresa", content: Company, backgroundHeight: 215 },
];
function Navbar() {
  return (
    <Container>
      <DropdownList itemsList={itemsList} />
    </Container>
  );
}

export default Navbar;
