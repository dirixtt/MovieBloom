import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";
import moment from "moment";
import { Alert } from "@mui/material";
import { MdDelete } from "react-icons/md";
export default function Genre() {
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [errorr, setError] = useState<any>(null);
  const [users, setusers] = useState<any>(null);
  const [msg, setMsg] = useState<any>(null);

  const fetch = async () => {
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
      setusers(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };
  useEffect(() => {
    fetch();
  }, [token]);
  function createData(id: number, date: any, fullName: string, email: any) {
    return { id, date, fullName, email };
  }

  const rows: any = users?.map((i: any) =>
    createData(
      i._id,
      moment(i.createdAt).format("MMM. D. YYYY"),
      i.fullName,
      i.email
    )
  );
  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://film24-org-by-codevision.onrender.com/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response); // You may want to log the response if needed
      fetch()
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  console.log(users)
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
            <h1>usersoty </h1>
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
                  <TableCell align="left">NAME</TableCell>
                  <TableCell align="left">EMAIL</TableCell>
                  <TableCell align="left">ACTION</TableCell>
                </TableRow>
              </TableHead>
              {rows?.length > 0 ? (
                <TableBody>
                  {rows?.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.fullName}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell className="relative" align="center">
                        <button
                          className="bg-red-500 p-1 text-xl rounded"
                          onClick={() => handleDelete(row.id)}
                        >
                          <MdDelete />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <div className="flex justify-center py-5 min-w-full bg-white/70">
                  there is no usersoties
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
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
