import React from "react";

const DropDown = ({data = []}) => (
    <div className="shadow h-auto w-56 absolute">
        <ul className="text-left">
            {data.map((item, i) => (
                <li key={i} className="listdown">
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default DropDown;