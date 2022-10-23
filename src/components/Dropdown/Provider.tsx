import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ContextType {
  targetId: number | null;
  cachedId: number | null;
  options: Option[];
  deleteOptionById: Function;
  getOptionById: Function;
  registerOption: Function;
  setCachedId: Function;
  setTargetId: Function;
  updateOptionProps: Function;
}

export const Context = createContext<ContextType>({
  targetId: null,
  cachedId: null,
  options: [],
  deleteOptionById: () => {},
  getOptionById: () => {},
  registerOption: () => {},
  setCachedId: () => {},
  setTargetId: () => {},
  updateOptionProps: () => {},
});

export interface Option {
  id: number;
  optionCenterX: number;
  optionDimensions: DOMRect;
  WrappedContent: Function;
  backgroundHeight: number;
  contentDimensions?: DOMRect;
}

export function DropdownProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<Option[]>([]);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [cachedId, setCachedId] = useState<number | null>(null);

  const registerOption = useCallback(
    (option: Option) => {
      const {
        id,
        optionDimensions,
        optionCenterX,
        WrappedContent,
        backgroundHeight,
      } = option;

      setOptions((items: Option[]) => [
        ...items,
        {
          id,
          optionDimensions,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]);
    },
    [setOptions]
  );

  const updateOptionProps = useCallback(
    (optionId: number, props: DOMRect) => {
      setOptions((items: Option[]) =>
        items.map((item: Option) => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }

          return item;
        })
      );
    },
    [setOptions]
  );

  const getOptionById = useCallback(
    (id: number) => options.find((item: Option) => item.id === id),
    [options]
  );

  const deleteOptionById = useCallback(
    (id: number) => {
      setOptions((items: Option[]) =>
        items.filter((item: Option) => item.id !== id)
      );
    },
    [setOptions]
  );

  useEffect(() => {
    if (targetId !== null) setCachedId(targetId);
  }, [targetId]);

  return (
    <Context.Provider
      value={{
        registerOption,
        updateOptionProps,
        getOptionById,
        deleteOptionById,
        options,
        targetId,
        setTargetId,
        cachedId,
        setCachedId,
      }}
    >
      {children}
    </Context.Provider>
  );
}
