import React from "react";

const Pantalla = ({ value }) => {
	return (
		<div className="pantalla ">
			<input
				type="text"
				value={value}
				className="form-control border-0"
				readOnly
			/>
		</div>
	);
};
export default Pantalla;
