import React from "react";

const DashboardWidget = ({
  title,
  value,
  subtitle,
  icon: Icon,
  className = "",
  trend,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-indigo-50 opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative flex justify-between items-center p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Content */}
      <div className="relative p-4">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.value > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-gray-400 ml-1">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardWidget ;