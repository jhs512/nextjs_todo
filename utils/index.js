import moment from "moment";

export function momentToFormat2(dateMomentObj) {
  if (dateMomentObj === null) return "";
  if (typeof dateMomentObj === "string") return dateMomentObj;

  const dateFormat1 = "YYYY-MM-DD";
  return dateMomentObj.format(dateFormat1);
}

export function dateObjToFormat2(dateObj) {
  if (dateObj === null) return "";
  if (typeof dateObj === "string") return dateObj;

  const dateFormat1 = "YYYY-MM-DD";

  return moment(dateObj).format(dateFormat1);
}

export function momentToFormat1(dateMomentObj) {
  if (dateMomentObj === null) return "";
  if (typeof dateMomentObj == "string") return dateMomentObj;

  const dateFormat1 = "YYYY-MM-DD HH:mm:ss";
  return dateMomentObj.format(dateFormat1);
}

export function dateObjToFormat1(dateObj) {
  if (dateObj === null) return "";
  if (typeof dateObj == "string") return dateObj;

  const dateFormat1 = "YYYY-MM-DD HH:mm:ss";

  return moment(dateObj).format(dateFormat1);
}
