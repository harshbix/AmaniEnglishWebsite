import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children, className = "", hoverable = false, onClick, }) => {
    return (_jsx("div", { className: `bg-white rounded-lg shadow-md p-6 ${hoverable ? "hover:shadow-lg transition-shadow cursor-pointer" : ""} ${className}`, onClick: onClick, children: children }));
};
export default Card;
