import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export const Context = createContext<any | null>(null);

interface DropdownProps {
  children: ReactNode;
}

interface registerProps {
  id: any;
  optionDimensions: any;
  optionCenterX: any;
  WrappedContent: any;
  backgroundHeight: any;
}

export function DropdownProvider({ children }: DropdownProps) {
  const [options, setOptions] = useState<any[]>([]);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [cachedId, setCachedId] = useState<string | null>(null);

  const registerOption = useCallback(
    ({
      id,
      optionDimensions,
      optionCenterX,
      WrappedContent,
      backgroundHeight,
    }: registerProps) => {
      setOptions((items: any) => [
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
    (optionId: string, props: any) => {
      setOptions((items: any) =>
        items.map((item: any) => {
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
    (id: any) => options.find((item: any) => item.id === id),
    [options]
  );

  const deleteOptionById = useCallback(
    (id: any) => {
      setOptions((items: any) => items.filter((item: any) => item.id !== id));
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
