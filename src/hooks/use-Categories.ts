import {
  actGetCategories,
  categoriesRecordsCleanUp,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      dispatch(categoriesRecordsCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );
  return { records, loading, error };
};
export default useCategories;
