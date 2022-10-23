import { DropdownProvider, DropdownOption, DropdownRoot } from "../Dropdown";
import { DropdownStyles } from "./styles";
import { DropdownOptionType } from "./Option";

function DropdownList({ itemsList }: { itemsList: DropdownOptionType[] }) {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <div>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {itemsList.map((item: DropdownOptionType) => {
              return (
                <li>
                  <DropdownOption
                    name={item.name}
                    content={item.content}
                    backgroundHeight={item.backgroundHeight}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <DropdownRoot />
      </DropdownStyles>
    </DropdownProvider>
  );
}

export default DropdownList;
