import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useLocationCheck(routes = []) {
	let location = useLocation();

	return routes?.includes(location?.pathname);
}
