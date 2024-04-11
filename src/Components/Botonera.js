import React from "react";
import Botón from "./Botón";

const Botonera = ({ onClick }) => {
	const buttons = [
		"%",
		"CE",
		"C",
		"DEL",
		"1/x",
		"x²",
		"√x",
		"/",
		"7",
		"8",
		"9",
		"*",
		"4",
		"5",
		"6",
		"-",
		"1",
		"2",
		"3",
		"+",
		"+/-",
		"0",
		",",
		"=",
	];

	return (
		<div className="keypad">
			<div className="grid-container">
				{buttons.map((button, index) => (
					<Botón
						key={index}
						label={button}
						onClick={onClick ? () => onClick(button) : null}
						className={`div${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};
export default Botonera;
