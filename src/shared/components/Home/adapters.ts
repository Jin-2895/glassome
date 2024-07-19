import produce from "immer";

export const adaptReferencesVisibility = (
  index: number,
  data: boolean[],
  value: boolean
) =>
  produce(data, (draft) => {
    draft[index] = value;
  });
