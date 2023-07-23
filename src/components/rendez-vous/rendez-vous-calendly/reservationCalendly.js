import React from "react";
import CalendlyCalendar from "../../common-components/calendly-calendar";
import { useLocation } from 'react-router-dom';

export default function ReservationCalendly() {
    const location = useLocation();
    const { urlCendly } = location.state;
    console.log("Cendly" , urlCendly)
  return (
    <CalendlyCalendar url={urlCendly} />
  );
}
