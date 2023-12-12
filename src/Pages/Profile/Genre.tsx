import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { genre, genreFail } from "../../reducers/genre";

import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Button, TextField } from "@mui/material";
export default function Users() {
  const [loading, setLoading] = useState<boolean>(false);
  const [creat, setCreat] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [errorr, setError] = useState<any>(null);
  const [categ, setCateg] = useState<any>(null);
  const [msg, setMsg] = useState<any>(null);
  const [modalOpenIndex, setModalOpenIndex] = useState(-1);
  const [name, setName] = useState("");
  const [id, setId] = useState<number>(0);
  const [nameValid, setNameValid] = useState("");
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
  const all = useSelector((state: any) => state.Ganre);
  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/genres`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCateg(response.data);
      dispatch(genre(response.data));
      setLoading(false);
    } catch (error: any) {
      dispatch(genreFail(error.data));
      setError(error);
    }
  };
  useEffect(() => {
    fetch();
  }, [token]);
  function createData(id: number, date: any, updated: any, name: string) {
    return { id, date, name, updated };
  }

  const rows: any = categ?.map((i: any) =>
    createData(
      i._id,
      moment(i.createdAt).format("MMM. D. YYYY"),
      moment(i.updatedAt).format("MMM. D. YYYY"),
      i.name
    )
  );
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://film24-org-by-codevision.onrender.com/api/genres/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(response?.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleCreat = async () => {
    try {
      // Reset any previous validation messages
      setNameValid("");

      // Validate the name
      if (name.trim().length === 0) {
        return setNameValid("Name is required");
      }

      setLoading(true);

      // Make the API request
      const response = await axios.request({
        method: "post",
        maxBodyLength: Infinity,
        url: "https://film24-org-by-codevision.onrender.com/api/genres",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          name: name.trim(),
        },
      });
      if (response.status === 200 || 201) {
        setCreat(false);
      }
      console.log(response);
      fetch();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = async () => {
    try {
      setNameValid("");

      if (name.trim().length === 0) {
        return setNameValid("Name is required");
      }

      setLoading(true);

      // Make the API request
      const response = await axios.request({
        method: "put",
        maxBodyLength: Infinity,
        url: `https://film24-org-by-codevision.onrender.com/api/genres/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          name: name.trim(),
        },
      });
      if (response.status === 200 || 201) {
        setEdit(false);
      }
      console.log(response);
      fetch();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  let filtered: any = "";
  const openModal = async (id: number) => {
    setEdit(!edit);
    setId(id);
    filtered = all.categ.find((i: any) => i._id === id);
    console.log(filtered._id);
    setName(filtered.name);
  };
  return (
    <>
      {!loading ? (
        <div className="w-full">
          <div className="absolute top-3 right-6">
            {errorr && (
              // <Alert
              //   severity="info"
              //   onClose={() => {
              //     setError(null);
              //   }}
              // >
              //   {errorr}
              // </Alert>
              <>error</>
            )}
          </div>
          <div className="flex mb-5 justify-between text-white">
            <h1>Categoty </h1>
            <button
              onClick={() => setCreat(true)}
              className="bg-red-600 px-2 rounded"
            >
              Create genre
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
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">DATE</TableCell>
                  <TableCell align="left">UPDATED</TableCell>
                  <TableCell align="left">NAME</TableCell>
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
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.updated}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
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
                  there is no categoties
                </div>
              )}
            </Table>
          </TableContainer>
          <div className="absolute top-3 right-6">
            {msg && (
              // <Alert
              //   severity="info"
              //   onClose={() => {
              //     setMsg(null);
              //   }}
              // >
              //   {msg}
              // </Alert>
              <>error</>
            )}
          </div>
          {creat && (
            <div
              className="fixed bg-black/60  flex justify-center items-center w-screen h-screen top-0 left-0"
              onClick={() => setCreat(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[30%] px-8 shadow-xl rounded py-6 h-[30%]"
              >
                <h1>Create</h1>
                <div className="h-1/2 flex items-center mt-2">
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="filled"
                    placeholder="name"
                    size="small"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                  {nameValid && <p>{nameValid}</p>}
                </div>
                <Button onClick={handleCreat} variant="contained">
                  Submit
                </Button>
              </div>
            </div>
          )}
          {edit && (
            <div
              className="fixed bg-black/60  flex justify-center items-center w-screen h-screen top-0 left-0"
              onClick={() => setEdit(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[30%] px-8 shadow-xl rounded py-6 h-[30%]"
              >
                <h1>Edit</h1>
                <div className="h-1/2 flex items-center mt-2">
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="filled"
                    placeholder={filtered}
                    size="small"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                  {nameValid && <p>{nameValid}</p>}
                </div>
                <Button onClick={handleEdit} variant="contained">
                  Submit
                </Button>
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
