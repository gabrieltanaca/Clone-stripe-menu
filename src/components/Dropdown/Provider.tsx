import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

const Context = createContext({});

interface DropdownProps {
  children: ReactNode;
}

interface registerProps {
  id: string;
  optionDimensions: string;
  optionCenterX: string;
  wrapperContent: string;
  backgroundHeight: string;
}

export function DropdownProvider({ children }: DropdownProps) {
  const [options, setOptions] = useState<any[]>([]);
  const [targetId, setTargetId] = useState<any>(null);
  const [cachedId, setCachedId] = useState<any>(null);

  useEffect(() => {
    if (targetId != null) {
      setCachedId(targetId);
    }
  }, [targetId]);

  const registerOption = useCallback(
    (props: registerProps) => {
      const {
        id,
        optionDimensions,
        optionCenterX,
        wrapperContent,
        backgroundHeight,
      } = props;

      setOptions((items: any) => [
        ...items,
        {
          id,
          optionDimensions,
          optionCenterX,
          wrapperContent,
          backgroundHeight,
        },
      ]);
    },
    [setOptions]
  );

  const updateOptionProps = useCallback(
    (optionId: string, props: any) => {
      setOptions((items: any) =>
        items.map((item: any) => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }
        })
      );
    },
    [setOptions]
  );

  const getOptionById = useCallback(
    (id: string) => options.find((item: any) => item.id === id),
    [options]
  );

  const deleteOptionById = useCallback(
    (id: string) => {
      setOptions((items: any) => items.filter((item: any) => item.id !== id));
    },
    [options]
  );

  return (
    <>
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
    </>
  );
}
