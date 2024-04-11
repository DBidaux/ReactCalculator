import React, { useState } from "react";
import Pantalla from "./Pantalla";
import Botonera from "./Botonera";

const Calculadora = () => {
	const [num1, setNum1] = useState("");
	const [num2, setNum2] = useState("");
	const [result, setResult] = useState("");
	const [operator, setOperator] = useState("");
	const [history, setHistory] = useState([]);
	const [visibleHistory, setVisibleHistory] = useState(false);
	const [resultUse, setResultUse] = useState(false);

	const handleClick = (button) => {
		switch (button) {
			//Clear, estado a 0
			case "C":
				setNum1("");
				setNum2("");
				break;

			//Clear entry, ultimo estado, revisar lógica, implementar estados
			case "CE":
				setNum1("");
				setNum2("");
				setResult("");
				setOperator("");
				setHistory([]);
				break;

			//Delete, borra ultimo caracter del input, no del estado
			case "DEL":
				if (operator) {
					setNum2((prevNum2) => prevNum2.slice(0, -1));
				} else {
					setNum1((prevNum1) => prevNum1.slice(0, -1));
				}
				break;

			case "+/-":
				if (operator) {
					setNum2((prevNum2) => {
						if (prevNum2.startsWith("-")) {
							return prevNum2.slice(1);
						} else {
							return "-" + prevNum2;
						}
					});
				} else {
					setNum1((prevNum1) => {
						if (prevNum1.startsWith("-")) {
							return prevNum1.slice(1);
						} else {
							return "-" + prevNum1;
						}
					});
				}
				break;

			case ",":
				if (!operator) {
					if (!num1.includes(",")) {
						setNum1((prevNum1) => prevNum1 + ",");
					}
				} else {
					if (!num2.includes(".")) {
						setNum2((prevNum2) => prevNum2 + ",");
					}
				}
				break;

			case "%":
				if (num1 && num2) {
					const percentage =
						parseFloat(num1) * (parseFloat(num2) / 100);
					setResult(percentage);
					setNum1("");
					setNum2("");
					setOperator("");
					setHistory([...history, `${num1}%${num2}= ${percentage}`]);
				}
				break;

			case "=":
				// Evaluar la expresión y mostrar el resultado
				if (num1 && num2 && operator) {
					let result = 0;
					switch (operator) {
						case "/":
							if (parseFloat(num2) !== 0) {
								result = parseFloat(num1) / parseFloat(num2);
							} else {
								setResult("Error: División por 0");
								return;
							}
							break;
						case "*":
							result = parseFloat(num1) * parseFloat(num2);
							break;
						case "+":
							result = parseFloat(num1) + parseFloat(num2);
							break;
						case "-":
							result = parseFloat(num1) - parseFloat(num2);
							break;
						default:
							break;
					}
					if (!isNaN(result) && isFinite(result)) {
						setResult(result);
					} else {
						setResult("Error: Resultado indefinido");
					}
					setResult(result);
					setNum1(result.toString());
					setNum2("");
					setOperator("");
					setHistory([
						...history,
						`${num1}${operator}${num2}= ${result}`,
					]);
				}
				break;

			case "/":
			case "*":
			case "+":
			case "-":
				if (num1 && !num2 && !operator) {
					setOperator(button);
				} else if (result) {
					setNum1(result.toString());
					setOperator(button);
					setResult("");
				}
				break;

			case "1/x":
				if (resultUse && result) {
					const inversa = 1 / parseFloat(result);
					setResult(inversa);
					setNum1("");
					setNum2("");
					setOperator("");
					setHistory([...history, `1/${result}= ${inversa}`]);
				} else if (num1) {
					const inversa = 1 / parseFloat(result);
					setResult(inversa);
					setNum1("");
					setNum2("");
					setOperator("");
					setHistory([...history, `1/${num1}= ${inversa}`]);
				}
				break;

			case "x²":
				if (resultUse && result) {
					const squared = parseFloat(result) ** 2;
					result(squared);
					setNum1("");
					setNum2("");
					setOperator("");
					setHistory([...history, `${result}²=${squared}`]);
				} else if (num1) {
					const squared = parseFloat(num1) ** 2;
					setResult(squared);
					setNum1("");
					setNum2("");
					setOperator("");
					setHistory([...history, `${num1}= ${squared}`]);
				}
				break;

			case "√x":
				if (resultUse && result) {
					if (parseFloat(result) >= 0) {
						const sqrt = Math.sqrt(parseFloat(result));
						setResult(sqrt);
						setHistory([...history, `√${result}= ${sqrt}`]);
					} else {
						setResult("Error: Raíz cuadrada de número negativo");
					}
				} else if (num1) {
					if (parseFloat(num1) >= 0) {
						const sqrt = Math.sqrt(parseFloat(num1));
						setResult(sqrt);
						setHistory([...history, `√${num1}= ${sqrt}`]);
					} else {
						setResult("Error: Raíz cuadrada de número negativo");
					}

					setNum1("");
					setNum2("");
					setOperator("");
				}
				break;

			default:
				// Añadir el carácter al final de la expresión
				if (!isNaN(button)) {
					if (operator) {
						setNum2((prevNum2) => prevNum2 + button);
					} else {
						setNum1((prevNum1) => prevNum1 + button);
					}
				}
				break;
		}
	};
	const toggleHistory = () => {
		setVisibleHistory(!visibleHistory);
	};

	return (
		<div className="container mt-5">
			<div className="row calc-cont  ">
				<div className="col-md-6 p-0">
					<div className="calculadora card">
						<Pantalla
							value={
								result !== "" ? result : operator ? num2 : num1
							}
						></Pantalla>
						<Pantalla
							value={`${num1}${operator}${num2}`}
						></Pantalla>
						<div className="botonera">
							<button className="btn" onClick={toggleHistory}>
								{visibleHistory
									? "Ocultar historial"
									: "Mostrar historial"}
							</button>
						</div>
						<Botonera onClick={handleClick}></Botonera>
					</div>
				</div>
				<div className="col-md-6 history-right p-0">
					{visibleHistory && (
						<div className="history-container">
							<h4 className="p-3">Historial</h4>
							{history.map((item, index) => (
								<div key={index + 1}>{item}</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Calculadora;
