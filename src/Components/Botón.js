import React from "react";

const Botón = ({ onClick, label, className }) => {
	const buttonClass = `btn col-12 ${className} ${
		[
			"%",
			"CE",
			"C",
			"DEL",
			"1/x",
			"x²",
			"√x",
			"/",
			"*",
			"-",
			"+",
			"+/-",
			",",
			"=",
		].includes(label)
			? "orange-bg btn-custom-operator"
			: "lightgrey-bg btn-custom-number"
	}`;

	return (
		<>
			<button className={buttonClass} onClick={onClick}>
				{label}
			</button>
		</>
	);
};
export default Botón;
