import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { casts, castsFail } from "../../reducers/casts";
import { DatePicker } from "antd";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loader from "../../Components/Loader";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import type { DatePickerProps } from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Alert, Button, TextField, styled } from "@mui/material";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import dayjs from "dayjs";
export default function Casts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [creat, setCreat] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [errorr, setError] = useState<any>(null);
  const [cast, setcast] = useState<any>(null);
  const [msg, setMsg] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [modalOpenIndex, setModalOpenIndex] = useState(-1);
  const [value, setValue] = useState<any>({
    image: "65311c6a5e4c30cda0a2f1fc",
    name: "",
    surname: "",
    birthday: moment().format("YYYY-MM-DD"),
  });
  const [id, setId] = useState<number>(0);
  const [Valid, setValid] = useState({
    image: "",
    name: "",
    surname: "",
    birthday: "",
  });
  const handleModalToggle = (index: number) => {
    if (modalOpenIndex === index) {
      // Если модальное окно уже открыто для этой строки, закрыть его
      setModalOpenIndex(-1);
    } else {
      // В противном случае открыть модальное окно для выбранной строки
      setModalOpenIndex(index);
    }
  };
  const dispatch = useDispatch();
  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/casts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setcast(response.data);
      dispatch(casts(response.data));
      setLoading(false);
    } catch (error: any) {
      dispatch(castsFail(error.data));
      setError(error);
    }
  };
  useEffect(() => {
    fetch();
    console.log(value.birthday);
  }, [token]);
  const upload = async (e: any) => {
    const selectedFile = e.target.files[0];
    try {
      // Вторая функция будет выполнена только если первая завершится успешно
      await uploadPhoto(selectedFile);
    } catch (error) {
      // Обработка ошибки
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  function createData(
    id: number,
    date: any,
    surname: string,
    name: string,
    image: any
  ) {
    return { id, date, name, surname, image };
  }

  const rows: any = cast?.map((i: any) =>
    createData(
      i._id,
      moment(i.birthday).format("MMM. D. YYYY"),
      i.surname,
      i.name,
      i.image.url
    )
  );

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://film24-org-by-codevision.onrender.com/api/casts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        setEdit(false);
        fetch();
        setMsg(`Cast member with ID ${id} deleted successfully.`);
      } else {
        setMsg(`Failed to delete cast member with ID ${id}.`);
      }

      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      console.log(value.birthday);
      setValid({
        ...Valid,
        image: "",
        name: "",
        surname: "",
        birthday: "",
      });

      // Validate name
      if (!value || !value.name || value.name.trim().length === 0) {
        setValid({
          ...Valid,
          name: "Name is required",
        });
        console.log(value?.name);
        return;
      }

      // Validate surname
      if (!value || !value.surname || value.surname.trim().length === 0) {
        setValid({
          ...Valid,
          surname: "Surname is required",
        });
        console.log(value?.surname);
        return;
      }

      // Validate birthday
      if (!value || !value.birthday || value.birthday.trim().length === 0) {
        setValid({
          ...Valid,
          birthday: "Birthday is required",
        });
        console.log(value?.birthday);
        return;
      }

      const response = await axios.post(
        "https://film24-org-by-codevision.onrender.com/api/casts",
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setCreat(false);
        fetch();
      }

      console.log(response);
    } catch (error: any) {
      setError(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  dayjs.extend(customParseFormat);
  const handleEdit = async () => {
    try {
      setLoading(true);
      setValid({
        ...Valid,
        image: "",
        name: "",
        surname: "",
        birthday: "",
      });

      // Validate name
      if (!value || !value.name || value.name.trim().length === 0) {
        setValid({
          ...Valid,
          name: "Name is required",
        });
        return;
      }

      // Validate surname
      if (!value || !value.surname || value.surname.trim().length === 0) {
        setValid({
          ...Valid,
          surname: "Surname is required",
        });
        return;
      }

      // Validate birthday
      if (!value || !value.birthday || value.birthday.trim().length === 0) {
        setValid({
          ...Valid,
          birthday: "Birthday is required",
        });
        return;
      }

      // Make the API request using PUT method for editing
      const response = await axios.put(
        `https://film24-org-by-codevision.onrender.com/api/casts/${id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setEdit(false);
      }

      console.log(response);
      fetch(); // Assuming fetch is a function to refetch data
    } catch (error) {
      console.error("Error during edit:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (id: number) => {
    setEdit(!edit);
    setId(id);
    const filtered = cast.find((i: any) => i._id === id);
    console.log(filtered);
    setImage(filtered.image);
    setValue({
      ...value,
      image: filtered.image._id,
      name: filtered.name,
      birthday: moment(filtered.birthday).format("YYYY-MM-DD"),
      surname: filtered.surname,
    });
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setValue({
      ...value,
      birthday: dateString,
    });
    console.log(value.birthday)
  };
  const uploadPhoto = async (selectedFile: any) => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      setLoading1(true);

      const image = new FormData();
      image.append("image", selectedFile);

      const response = await axios.post(
        `https://film24-org-by-codevision.onrender.com/api/images/upload`,
        image,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg(response.data.message);
      console.log(response.data.data._id);
      setImage(response.data.data);
      setValue({
        ...value,
        image: response.data.data._id,
      });
      setLoading1(false);
    } catch (error) {
      setError(error);
    }
  };
  const openCreat = () => {
    setValid({
      ...Valid,
      image: " ",
      name: " ",
      surname: " ",
      birthday: " ",
    });
    setCreat(true);
  };
  return (
    <>
      {!loading ? (
        <div className="w-full">
          <div className="absolute z-50 top-3 right-6">
            {errorr && (
              <Alert
                severity="info"
                onClose={() => {
                  setError(null);
                }}
              >
                {errorr}
              </Alert>
            )}
          </div>
          <div className="flex mb-5 justify-between text-white">
            <h1>castsoty </h1>
            <button onClick={openCreat} className="bg-red-600 px-2 rounded">
              Create casts
            </button>
          </div>
          <TableContainer className="w-full" component={Paper}>
            <Table
              className="w-full"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">IMAGE</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">DATE</TableCell>
                  <TableCell align="left">NAME</TableCell>
                  <TableCell align="left">SURNAME</TableCell>
                  <TableCell align="left">ACTION</TableCell>
                </TableRow>
              </TableHead>
              {rows?.length > 0 ? (
                <TableBody>
                  {rows?.map((row: any, index: number) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <img className="object-cover w-10 h-10 border" src={row.image} alt="" />
                      </TableCell>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.surname}</TableCell>
                      <TableCell className="relative" align="center">
                        <button
                          className="text-xl"
                          onClick={() => handleModalToggle(index)}
                        >
                          <BiDotsVerticalRounded />
                        </button>
                        {modalOpenIndex === index && (
                          <div className="absolute top-2 w-8 h-[80%] -left-[5px] bg-white/70">
                            <div className="flex h-full justify-around items-center flex-col">
                              <button
                                onClick={() => handleDelete(row.id)}
                                className="bg-red-500 h-2/5 w-[80%]"
                              >
                                D
                              </button>
                              <div
                                onClick={() => openModal(row.id)}
                                className="bg-green-500 w-[80%] cursor-pointer h-2/5"
                              >
                                E
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <div className="flex justify-center py-5 min-w-full bg-white/70">
                  there is no cast
                </div>
              )}
            </Table>
          </TableContainer>
          <div className="absolute top-3 right-6">
            {msg && (
              <Alert
                severity="info"
                onClose={() => {
                  setMsg(null);
                }}
              >
                {msg}
              </Alert>
            )}
          </div>

          {edit && (
            <div
              className="fixed bg-black/60  flex justify-center items-center w-screen h-screen top-0 left-0"
              onClick={() => setEdit(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-1/2 px-8 shadow-xl flex flex-col justify-between rounded py-6 min-h-[35%]"
              >
                <h1>Edit</h1>
                <div className="h-full  flex w-full justify-between gap-3 my-2">
                  <div className="w-1/2 h-full items-center flex flex-col gap-4">
                    <Button
                      component="label"
                      variant="contained"
                      className="w-[100%] "
                      onChange={(e: any) => upload(e)}
                      // onClick={uploadPhoto}
                      disabled={loading}
                      startIcon={<BsFillCloudArrowUpFill />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" accept="image/*" />
                    </Button>
                    {loading1 ? (
                      " loading..."
                    ) : (
                      <img
                        className="w-4/5 max-h-[60%] object-contain"
                        src={image?.url || value?.image?.url}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="w-1/2 flex flex-col justify-between items-center">
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      variant="filled"
                      placeholder="name"
                      className="w-[100%]"
                      size="small"
                      value={value.name} // Access the name property from the state
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue({
                          ...value,
                          name: e.target.value,
                        })
                      }
                    />
                    {Valid && <p>{Valid?.name}</p>}
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      variant="filled"
                      placeholder="surName"
                      className="w-[100%]"
                      size="small"
                      value={value.surname} // Access the name property from the state
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue({
                          ...value,
                          surname: e.target.value,
                        })
                      }
                    />
                    {Valid && <p>{Valid?.surname}</p>}
                    <DatePicker
                      className="w-full"
                      defaultValue={dayjs(value.birthday, "YYYY-MM-DD")}
                      onChange={onChange}
                    />


                    {Valid && <p>{Valid?.birthday}</p>}

                    <Button
                      onClick={handleEdit}
                      className="mt-4 w-full"
                      variant="contained"
                    >
                      {loading ? "loading..." : "Submit"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {creat && (
            <div
              className="fixed bg-black/60  flex justify-center items-center w-screen h-screen top-0 left-0"
              onClick={() => setCreat(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-1/2 px-8 shadow-xl flex flex-col justify-between rounded py-6 min-h-[35%]"
              >
                <h1>Creat</h1>
                <div className="h-full  flex w-full justify-between gap-3 my-2">
                  <div className="w-1/2 h-full items-center flex flex-col gap-4">
                    <Button
                      component="label"
                      variant="contained"
                      className="w-[100%] "
                      onChange={(e: any) => upload(e)}
                      // onClick={uploadPhoto}
                      disabled={loading}
                      startIcon={<BsFillCloudArrowUpFill />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" accept="image/*" />
                    </Button>
                    {loading1 ? (
                      " loading..."
                    ) : (
                      <img
                        className="w-4/5 h-52 object-cover max-h-[60%]"
                        src={image?.url || value?.image?.url}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="w-1/2 flex flex-col justify-between items-center">
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      variant="filled"
                      placeholder="name"
                      className="w-[100%]"
                      size="small"
                      value={value.name} // Access the name property from the state
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue({
                          ...value,
                          name: e.target.value,
                        })
                      }
                    />
                    {Valid && <p>{Valid?.name}</p>}
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      variant="filled"
                      placeholder="surName"
                      className="w-[100%]"
                      size="small"
                      value={value.surname} // Access the name property from the state
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue({
                          ...value,
                          surname: e.target.value,
                        })
                      }
                    />
                    {Valid && <p>{Valid?.surname}</p>}
                    <DatePicker
                      className="w-full"
                      defaultValue={dayjs(value.birthday, "YYYY-MM-DD")}
                      onChange={onChange}
                    />

                    {Valid && <p>{Valid?.birthday}</p>}

                    <Button
                      onClick={handleCreate}
                      className="mt-4 w-full"
                      variant="contained"
                    >
                      {loading ? "loading..." : "Submit"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
