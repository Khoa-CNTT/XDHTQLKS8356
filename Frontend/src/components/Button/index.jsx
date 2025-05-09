import * as React from "react";

const Button = ({
    id,
    handleClick,
    children,
    type = "button",
    color = "",
    className = "",
    size = "default",
    border = true,
    disabled = false,
    onClick,
    scale,
    textColor = "",
    ...restProps
}) => {
    const borderClass = border ? "border" : "";
    const scales = scale ? "hover:scale-103 transition-all" : "";

    const colorClasses = {
        blue: "outline-none bg-blue-600 hover:bg-blue-800 hover:ring-1 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        red: "bg-red-600 hover:bg-red-800 hover:ring-1 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
        green: "bg-green-600 hover:bg-green-800 hover:ring-1 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        yellow: "bg-yellow-400 hover:bg-yellow-500 hover:ring-1 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600",
        gray: "bg-gray-600 hover:bg-gray-800 hover:ring-1 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
        purple: "bg-purple-600 hover:bg-purple-800 hover:ring-1 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
        pink: "bg-pink-600 hover:bg-pink-800 hover:ring-1 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800",
        indigo: "bg-indigo-600 hover:bg-indigo-800 hover:ring-1 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800",
        teal: "bg-teal-600 hover:bg-teal-800 hover:ring-1 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
        cyan: "bg-cyan-600 hover:bg-cyan-800 hover:ring-1 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
        orange: "bg-orange-500 hover:bg-orange-600 hover:ring-1 focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800",
        lime: "bg-lime-500 hover:bg-lime-600 hover:ring-1 focus:ring-lime-300 dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800",
        amber: "bg-amber-500 hover:bg-amber-600 hover:ring-1 focus:ring-amber-300 dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:ring-amber-800",
        emerald: "bg-emerald-500 hover:bg-emerald-600 hover:ring-1 focus:ring-emerald-300 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-800",
        rose: "bg-rose-500 hover:bg-rose-600 hover:ring-1 focus:ring-rose-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-800",
        sky: "bg-sky-500 hover:bg-sky-600 hover:ring-1 focus:ring-sky-300 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-sky-800",
        violet: "bg-violet-500 hover:bg-violet-600 hover:ring-1 focus:ring-violet-300 dark:bg-violet-500 dark:hover:bg-violet-600 dark:focus:ring-violet-800",
    };

    const colorClass = colorClasses[color] || "";
    const textClass = textColor ? `text-${textColor}` : "";

    const sizeClass =
        size === "xs"
            ? "rounded-md p-2 text-xs font-medium"
            : size === "sm"
            ? "rounded-md px-4 py-2.5 text-sm font-medium"
            : size === "lg"
            ? "rounded-md px-5 py-3 text-base font-medium"
            : size === "xl"
            ? "rounded-lg px-6 py-4 text-lg font-medium"
            : size === "2xl"
            ? "rounded-lg px-10 py-8 text-xl font-medium"
            : size === "icon"
            ? "h-10 w-10"
            : size === "w-full"
            ? "h-10 w-full"
            : "h-10 px-4 py-2";

    return (
        <button
            type={type}
            className={`cursor-pointer outline-none inline-flex items-center justify-center ${borderClass} ${colorClass} ${textClass} ${sizeClass} ${scales} ${className} text-nowrap`}
            disabled={disabled}
            onClick={handleClick || onClick}
            {...restProps}
        >
            {children}
        </button>
    );
};

export default Button;
