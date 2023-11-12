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
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [msg, setMsg] = useState<any>();

  const [data, setData] = useState<any>(null);
  const [errorr, setError] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(false);

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
  const [totalCategories, setTotalCategories] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalMovies, setTotalMovies] = useState<number>(0);

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
      setTotalMovies(response?.data.totalMovies);
      console.log(response.data);
    } catch (error) {
      setError(error);
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setTotalCategories(response.data.length);
    } catch (error) {
      setError(error);
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      setTotalUsers(response.data.length);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]); // Include 'id' as a dependency so that it fetches data when 'id' changes

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://film24-org-by-codevision.onrender.com/api/movies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(response?.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="text-white ">
      <h1 className="text-xl font-semibold">Dash Board</h1>
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
      <ul className="flex justify-evenly mt-5">
        <li className="flex gap-2">
          <h1>Total Movies</h1>
          <p>{totalMovies}</p>
        </li>
        <li className="flex gap-2">
          <h1>Total Categories</h1>
          <p>{totalCategories}</p>
        </li>
        <li className="flex gap-2">
          <h1>Total Users</h1>
          <p>{totalUsers}</p>
        </li>
      </ul>
      <div className="mt-5 rounded overflow-hidden">
        {data || loading ? (
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
                      <img className="w-20" src={row.IMAGE.url} alt="" />
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
                        <div className="absolute top-2 w-8 h-[80%] -left-[5px] bg-white/70">
                          <div className="flex h-full justify-around items-center flex-col">
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="bg-red-500 h-2/5 w-[80%]"
                            >
                              D
                            </button>
                            <Link to={`./edit/${row.id}`} className="bg-green-500 w-[80%] h-2/5">
                              E
                            </Link>
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Loader />
        )}

        <button
          onClick={() => {
            console.log(data);
          }}
        >
          <div className="absolute">click</div>
        </button>
      </div>
    </div>
  );
}
