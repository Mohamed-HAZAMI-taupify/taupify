import React, { useState } from "react";
import DayPicker from "react-day-picker";

export default function Calendrest(props) {
  const [plannedForDate, setPlannedForDate] = useState(null);

  const currentYear = new Date().getFullYear();
  const fromMonth = new Date(currentYear, 0);
  const toMonth = new Date(currentYear, 0);
  
  const sixrdvss = props.rendezVousReducer.rendezVousList.filter(
    (el) =>
      new Date(el.plannedForDate).toISOString().substr(0, 10) ===
      new Date(day).toISOString().substr(0, 10)
  );
  
  const handlePlannedForDateChange = (day, { selected }) => {
    setPlannedForDate(selected ? undefined : day);

    setrdvsCount(sixrdvss.length);
    setsixrdvs(sixrdvss);

    setcalc0800(sixrdvss.filter((el) => el.temps === "08:00").length);

    setcalc0830(sixrdvss.filter((el) => el.temps === "08:30").length);

    setcalc(sixrdvss.filter((el) => el.temps === "09:00").length);

    setcalc930(sixrdvss.filter((el) => el.temps === "09:30").length);

    setcalc1000(sixrdvss.filter((el) => el.temps === "10:00").length);

    setcalc1030(sixrdvss.filter((el) => el.temps === "10:30").length);

    setcalc1100(sixrdvss.filter((el) => el.temps === "11:00").length);

    setcalc1130(sixrdvss.filter((el) => el.temps === "11:30").length);

    setcalc1200(sixrdvss.filter((el) => el.temps === "12:00").length);

    setcalc1230(sixrdvss.filter((el) => el.temps === "12:30").length);

    setcalc1300(sixrdvss.filter((el) => el.temps === "13:00").length);

    setcalc1330(sixrdvss.filter((el) => el.temps === "13:30").length);

    setcalc1400(sixrdvss.filter((el) => el.temps === "14:00").length);

    setcalc1430(sixrdvss.filter((el) => el.temps === "14:30").length);

    setcalc1500(sixrdvss.filter((el) => el.temps === "15:00").length);

    setcalc1530(sixrdvss.filter((el) => el.temps === "15:30").length);

    setcalc1600(sixrdvss.filter((el) => el.temps === "16:00").length);

    setcalc1630(sixrdvss.filter((el) => el.temps === "16:30").length);

    setcalc1700(sixrdvss.filter((el) => el.temps === "17:00").length);

    setcalc1730(sixrdvss.filter((el) => el.temps === "17:30").length);

    setcalc1800(sixrdvss.filter((el) => el.temps === "18:00").length);

    setcalc1830(sixrdvss.filter((el) => el.temps === "18:30").length);

    setcalc1900(sixrdvss.filter((el) => el.temps === "19:00").length);

    setcalc1930(sixrdvss.filter((el) => el.temps === "19:30").length);
  };
  return (
    <div>
      <DayPicker
        className="DayPicker-Month"
        selectedDays={plannedForDate}
        onDayClick={handlePlannedForDateChange}
        disabledDays={[
          { daysOfWeek: [0] },
          (day) => day < new Date(),
        ]}
        fromMonth={fromMonth}
        toMonth={toMonth}
        initialMonth={new Date(2021, 0)}
        weekdaysShort={["D", "L", "M", "M", "J", "V", "S"]}
        months={MONTHS}
      />
    </div>
  );
}
