import React from "react";
import { FaStar } from "react-icons/fa";

interface WeekItemProps {
  text: string;
  starColor?: string;
}

const WeekItem: React.FC<WeekItemProps> = ({ text, starColor }) => (
  <div className="flex items-start gap-2">
    <FaStar style={{ color: starColor || "#3B82F6" }} className={`min-w-4 h-4 mt-1`} />
    <p className="text-white">{text}</p>
  </div>
);

interface WeekCardProps {
  week: string;
  title: string;
  objective: string;
  items: string[];
  bg?: string;
  starColor?: string;
}

export const WeekCard: React.FC<WeekCardProps> = ({ week, title, objective, items, bg, starColor }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-700 overflow-hidden">
    <div className={`p-4 ${bg}`}>
      <h3 className="text-lg font-semibold">{week}: {title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Objective: {objective}
      </p>
    </div>
    <div className="p-4 bg-[#212121] space-y-3">
      {items.map((item, i) => (
        <WeekItem key={i} text={item} starColor={starColor} />
      ))}
    </div>
  </div>
);