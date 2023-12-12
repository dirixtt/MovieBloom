import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Loader from "../../Components/Loader";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Alert, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { Modal } from "antd";

function createData(
  IMAGE: string, // Здесь добавлена запятая
  name: string,
  CATEGORY: Object[],
  LANGUAGE: Object[],
  YEAR: number,
  HOURS: number,
  id: number
) {
  return { id, IMAGE, name, CATEGORY, LANGUAGE, YEAR, HOURS };
}

export default function Movies() {
  const token = localStorage.getItem("token");
  const [msg, setMsg] = useState<any>();

  const [data, setData] = useState<any>(null);
  const [errorr, setError] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [modalOpenIndex, setModalOpenIndex] = useState(-1);
  const handleModalToggle = (index: number) => {
    if (modalOpenIndex === index) {
      // Если модальное окно уже открыто для этой строки, закрыть его
      setModalOpenIndex(-1);
    } else {
      // В противном случае открыть модальное окно для выбранной строки
      setModalOpenIndex(index);
    }
  };

  const rows: any = data?.map((item: any) =>
    createData(
      item.image,
      item.name,
      item.category.map((i: any) => i.title),
      item.language.map((i: any) => i.name),
      item.year,
      item.time,
      item._id
    )
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setData(response.data.movies);
      console.log(response.data);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]); // Include 'id' as a dependency so that it fetches data when 'id' changes

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://film24-org-by-codevision.onrender.com/api/movies/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(response.data.message);
      fetchData();
    } catch (error) {
      setError(error);
    }finally{
      setIsModalOpen(false)
    }
  };
  const openModel = (id: any) => {
    setIsModalOpen(true);
    setDeleteId(id)
  };
  return (
    <div className="text-white relative">
      <h1 className="text-xl font-semibold">Movies List</h1>
      <div className="absolute top-0 right-0">
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
      <div className="mt-5 rounded overflow-hidden">
        {data || !loading ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>IMAGE</TableCell>
                  <TableCell align="left">NAME</TableCell>
                  <TableCell align="left">CATEGORY</TableCell>
                  <TableCell align="left">LANGUAGE</TableCell>
                  <TableCell align="left">YEAR</TableCell>
                  <TableCell align="left">HOURS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row: any, index: number) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img className="w-20 h-20 object-contain border" src={row.IMAGE.url} alt="" />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.CATEGORY}</TableCell>
                    <TableCell align="left">{row.LANGUAGE}</TableCell>
                    <TableCell align="left">{row.YEAR}</TableCell>
                    <TableCell align="left">{row.HOURS} </TableCell>
                    <TableCell align="center" className="relative">
                      <button
                        className="text-xl"
                        onClick={() => handleModalToggle(index)}
                      >
                        <BiDotsVerticalRounded />
                      </button>
                      {modalOpenIndex === index && (
                        <div className="absolute top-2 h-[80%] -left-[5px]">
                          <div className="flex h-full justify-around items-center flex-col">
                            <button
                              // onClick={() => handleDelete(row.id)}
                              onClick={() => openModel(row.id)}
                              className="bg-red-500 w-7 h-5 text-center rounded"

                            >
                              D
                            </button>
                            
                            <Link
                              to={`/profile/dashboard/edit/${row.id}`}
                              className="w-full h-1/2"
                              // className="bg-green-500 w-[80%] h-2/5"
                            >
                              <button
                                className="bg-green-500 w-7 h-5 text-center rounded"
                              >
                                E
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Modal
              open={isModalOpen}
              title="Do you Want to delete these items?"
              onOk={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
              footer={[
                <Button color="primary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>,
                <Button
                  key="back"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>,
              ]}
            ></Modal>
          </TableContainer>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
