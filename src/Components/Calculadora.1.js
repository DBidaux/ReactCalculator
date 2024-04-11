import React, { useState } from "react";
import Pantalla from "./Pantalla";
import Botonera from "./Botonera";

export const Calculadora = () => {
	const [expression, setExpression] = useState("");
	const handleClick = (button) => {
		switch (button) {
			//Clear, estado a 0
			case "C":
				setExpression("");
				break;

			//Clear entry, ultimo estado, revisar lógica, implementar estados
			case "CE":
				setExpression((prevExpression) => {
					if (
						!isNaN(parseFloat(prevExpression)) ||
						isNaN(parseFloat(prevExpression))
					) {
						return "";
					} else {
						return prevExpression.slice(0, -1);
					}
				});
				break;

			//Delete, borra ultimo caracter del input, no del estado
			case "DEL":
				setExpression((prevExpression) => {
					if (
						!isNaN(parseFloat(prevExpression)) ||
						isNaN(parseFloat(prevExpression))
					) {
						return "";
					} else {
						return prevExpression.slice(0, -1);
					}
				});
				break;

			case "+/-":
				setExpression((prevExpression) => {
					if (!isNaN(parseFloat(prevExpression))) {
						return -parseFloat(prevExpression) + "";
					} else {
						if (prevExpression[0] === "-") {
							return prevExpression.slice(1);
						} else {
							return "-" + prevExpression;
						}
					}
				});
				break;

			case ",":
				setExpression((prevExpression) => prevExpression + ",");
				break;

			case "%":
				// Calcular el porcentaje del número actual
				setExpression((prevExpression) => {
					if (!isNaN(parseFloat(prevExpression))) {
						return parseFloat(prevExpression) / 100;
					} else {
						return "";
					}
				});
				break;

			case "=":
				// Evaluar la expresión y mostrar el resultado
				setExpression((prevExpression) => {
					try {
						const result = eval(prevExpression);
						if (!isNaN(result) && isFinite(result)) {
							return result;
						} else {
							return "Error";
						}
					} catch (error) {
						return "Error";
					}
				});
				break;

			case "/":
				setExpression((prevExpression) => {
					if (
						!isNaN(parseFloat(prevExpression)) &&
						parseFloat(prevExpression) !== 0
					) {
						return prevExpression + "/";
					} else {
						return "Error: División por 0";
					}
				});
				break;

			case "*":
			case "+":
			case "-":

			case "1/x":
				setExpression((prevExpression) => 1 / eval(prevExpression));
				break;
			case "x²":
				setExpression((prevExpression) => eval(prevExpression) ** 2);
				break;
			case "√x":
				setExpression((prevExpression) =>
					Math.sqrt(eval(prevExpression))
				);
				break;

			default:
				// Añadir el carácter al final de la expresión
				if (!isNaN(button)) {
					setExpression((prevExpression) => prevExpression + button);
				}
				break;
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="calculadora card">
						<Pantalla value={expression}></Pantalla>
						<Botonera onClick={handleClick}></Botonera>
					</div>
				</div>
			</div>
		</div>
	);
};
