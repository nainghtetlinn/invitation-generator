import dayjs from "dayjs";
import { DEPARTMENTS, YEARS } from "./constants";
import { type Invitation } from "./schema";

export const toDto = (data: Invitation) => {
  return {
    department: DEPARTMENTS.find((d) => d.short === data.department),
    year: YEARS.find((y) => y.text === data.year),
    academic: data.academic,
    date: dayjs(data.date).format("DD.MM.YYYY"),
    day: dayjs(data.date).format("dddd"),
    time: dayjs(`${dayjs().format("YYYY-MM-DD")}T${data.time}`).format(
      "hh:mm A"
    ),
    place: data.place,
    groups: data.groups.map((g, i) => ({
      title: g.title,
      members: g.members,
      no: i + 1,
    })),
  };
};
