import { useState, useCallback, useEffect } from "react";
import { getLimit } from "@/api/limits/getLimit";
import { updateLimit } from "@/api/limits/updateLimit";
import { GetLimitResult } from "@/types/limits/getLimitTypes";

type FormData = Required<Omit<GetLimitResult, "location" | "timeRange">> & {
  startTime: string;
  endTime: string;
};

export function useLimitForm() {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    category: [],
    amountLimit: 0,
    dailyLimit: 0,
    startTime: "",
    endTime: "",
  });
  const [editData, setEditData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLimit = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getLimit();
      if (response.isSuccess && response.result) {
        const timeRange = response.result.timeRange || ["", ""];
        const newData = {
          category: response.result.category || [],
          amountLimit: response.result.amountLimit || 0,
          dailyLimit: response.result.dailyLimit || 0,
          startTime: timeRange[0],
          endTime: timeRange[1],
        };
        setFormData(newData);
        setEditData(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching limit:", error);
      setError("데이터를 불러오는데 실패했습니다.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLimit();
  }, [fetchLimit]);

  const toggleCategory = useCallback(
    (categoryKey: string) => {
      if (isReadOnly) return;
      const currentData = editData || formData;
      setEditData({
        ...currentData,
        category: currentData.category.includes(categoryKey)
          ? currentData.category.filter((c) => c !== categoryKey)
          : [...currentData.category, categoryKey],
      });
    },
    [isReadOnly, formData, editData]
  );

  const updateFormData = useCallback(
    (field: keyof FormData, value: string | number) => {
      if (isReadOnly) return;
      const currentData = editData || formData;
      setEditData({
        ...currentData,
        [field]: value,
      });
    },
    [isReadOnly, formData, editData]
  );

  const handleEdit = useCallback(() => {
    setEditData(formData);
    setIsReadOnly(false);
  }, [formData]);

  const handleCancel = useCallback(async () => {
    setEditData(null);
    setIsReadOnly(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!editData) return false;

    try {
      const response = await updateLimit({
        category: editData.category,
        amountLimit: editData.amountLimit,
        timeRange: [editData.startTime, editData.endTime],
        dailyLimit: editData.dailyLimit,
      });

      if (response.isSuccess) {
        await fetchLimit();
        setIsReadOnly(true);
        setError(null);
        return true;
      } else {
        setError(response.message || "저장에 실패했습니다.");
        return false;
      }
    } catch (error) {
      console.error("Error saving limit:", error);
      setError("저장 중 오류가 발생했습니다.");
      return false;
    }
  }, [editData, fetchLimit]);

  const displayData = editData || formData;

  return {
    formData: displayData,
    isReadOnly,
    error,
    isLoading,
    toggleCategory,
    updateFormData,
    handleEdit,
    handleCancel,
    handleSave,
    clearError: () => setError(null),
  };
}
