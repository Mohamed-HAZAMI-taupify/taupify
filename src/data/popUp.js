export const defaultFormData = {
  title: "",
  subtitle: "",
  description: "",
  active: false,
  image: { _url: "", _delete_url: "" },
  button: {
    _link: "",
    _content: "",
    _backgroundColor: "",
    _color: "",
  },
  isLogo: true,
  backgroundColor: "",
};
export const defaultTextFieldElement = [
  { index: 1, type: "title", data: "", sizeLimit: 150, len: 0 },
  { index: 2, type: "subtitle", data: "", sizeLimit: 170, len: 0 },
  { index: 3, type: "description", data: "", sizeLimit: 500, len: 0 },
];
export const defaultCurrentField = {
  index: 1,
  type: "title",
  data: "",
  sizeLimit: 150,
  len: 0,
};
