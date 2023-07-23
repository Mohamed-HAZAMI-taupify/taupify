import React from "react";
import notfound3 from "../../../assets/notfound3.png";

export default function NotFoundBody() {
  return (
    <tbody>
      <tr className="not-found-row">
        <td>
          <img src={notfound3}></img>
        </td>
      </tr>
    </tbody>
  );
}
