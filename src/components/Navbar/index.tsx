import React from "react";

import { Company, Developers, Products } from "../Content";
import { DropdownOption } from "../Dropdown";
import { Container, DropdownStyles } from "./styles";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  return (
    <>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <DropdownOption name="Produtos" content={Products} />
            </li>
            <li>
              <DropdownOption name="Desenvolvedores" content={Developers} />
            </li>
            <li>
              <DropdownOption name="Empresa" content={Company} />
            </li>
          </ul>
        </Container>
      </DropdownStyles>
    </>
  );
};

export default Navbar;
