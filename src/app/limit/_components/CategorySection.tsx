import Image from "next/image";
import { Ban } from "lucide-react";
import { LIMIT_CATEGORIES } from "@/constants/limitCategory";

interface CategorySectionProps {
  selectedCategories: string[];
  isReadOnly: boolean;
  onToggle: (key: string) => void;
}

export function CategorySection({
  selectedCategories,
  isReadOnly,
  onToggle,
}: CategorySectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">결제 업종 제한</h2>
      <div className="grid grid-cols-4 gap-4">
        {LIMIT_CATEGORIES.map((category) => (
          <button
            key={category.key}
            onClick={() => onToggle(category.key)}
            className={`flex flex-col items-center ${
              selectedCategories.includes(category.key)
                ? "text-red-500"
                : "text-gray-600"
            } ${isReadOnly ? "cursor-default" : "cursor-pointer"}`}
            disabled={isReadOnly}
          >
            <div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedCategories.includes(category.key)
                  ? "bg-red-50 border-1 border-red-500"
                  : "bg-gray-100 border border-gray-200"
              }`}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={40}
                height={40}
                className={
                  selectedCategories.includes(category.key) ? "opacity-50" : ""
                }
              />
              {selectedCategories.includes(category.key) && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl text-red-500">
                      <Ban size={40} />
                    </div>
                  </div>
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="w-[200%] h-[1px] bg-red-500 absolute top-1/2 left-0 -translate-x-full transform -rotate-12 animate-strike" />
                  </div>
                </>
              )}
            </div>
            <span className="mt-2 text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
