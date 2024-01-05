import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";

import { Alert, Button, Input, TextField } from "@mui/material";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, SelectProps } from "antd";
export default function Edit() {
  const [Image, setImage] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [msg, setMsg] = useState<any>();
  const [category, setCategorys] = useState<any>();
  const [languages, setLanguages] = useState<any>();
  const [genres, setGanres] = useState<any>();
  const movieid = useParams().id;
  const [errorr, setError] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>({
    image: " ",
    name: " ",
    time: " ",
    description: " ",
    category: " ",
    genre: " ",
    language: " ",
    year: " ",
  });
  const [data, setData] = useState<any>();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/movies/${movieid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setLoading(false);
      console.log(response.data);
      setFormValues({
        ...formValues,
        image: response.data.image._id,
        name: response.data.name,
        time: response.data.time,
        description: response.data.desc,
        category: response.data.category.map((i: any) => i._id),
        genre: response.data.genre,
        language: response.data.language.map((i: any) => i._id),
        year: response.data.year,
      });
      setSelectedTags(response.data.category.map((i: any) => i.title));
      console.log(response.data.category.map((i: any) => i.title));
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
      setCategorys(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/genres`
      );
      setGanres(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://film24-org-by-codevision.onrender.com/api/languages`
      );
      setLanguages(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(data);
  }, [token]); // Include 'id' as a dependency so that it fetches data when 'id' changes

  const [selectedTags, setSelectedTags] = useState<any>([]);

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
  const navigate = useNavigate();
  const handleEdit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (handleValidation()) {
      try {
        setLoading(true);
        console.log(formValues);
        const response = await axios.put(
          `https://film24-org-by-codevision.onrender.com/api/movies/${movieid}`,
          formValues, // Send formValues as the request data
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Check for a successful response (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          console.log("first");
        } else {
          setError(response);
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
        setMsg("Your movie was successufulty updated");
        navigate("/profile");
      }
    } else {
      setMsg("validation");
    }
  };

  const uploadPhoto = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      setLoading(true);

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
      console.log(response.data.message);
      setImage(response.data.data);
      setFormValues({ ...formValues, image: response.data.data._id });
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const upload = async (e: any) => {
    setSelectedFile(e.target.files[0]);
    await uploadPhoto();
  };

  const [validation, setValidation] = useState({
    name: "",
    year: "",
    time: "",
  });

  const handleValidation = () => {
    let valid = true;
    const newErrors = { ...validation };

    // Name validation
    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Year validation
    const yearPattern = /^\d{4}$/;
    if (!formValues.year || !yearPattern.test(formValues.year)) {
      newErrors.year = "Enter a valid 4-digit year";
      valid = false;
    } else {
      newErrors.year = "";
    }

    // Time validation
    if (!formValues.time) {
      newErrors.time = "Enter a valid time in HH:mm format";
      valid = false;
    } else {
      newErrors.time = "";
    }

    setValidation(newErrors);
    console.log(validation);
    return valid;
  };
  const genresOpt: SelectProps["options"] = genres
    ? genres.map((i: any) => ({
        label: i.name, // Extract label from i.name
        value: i._id, // Extract value from i._id
      }))
    : [{ label: "no options", value: "no options" }];
  const defaultValue =
    data && genresOpt
      ? genresOpt.find((genre) => genre._id === data.genre._id)
      : undefined;

  <Select
    mode="multiple"
    allowClear
    placeholder="Please select language"
    size="large"
    className="w-[100%] bg-white rounded"
    onChange={(value: any) =>
      setFormValues((prevValue: any) => ({
        ...prevValue,
        genre: value,
      }))
    }
    options={genresOpt}
    value={defaultValue}
  />;
  const defaultV:any =
    data && genresOpt
      ? genresOpt.find((genre) => genre._id === data.genre._id)
      : undefined;
  return (
    <div>
      {movieid && category && languages && genres ? (
        <div
          className={`bg-[#ffffff]  flex flex-col items-center container py-5 w-full h-[80%] ${
            loading ? "cursor-progress" : ""
          }`}
        >
          <Link to="/profile/" className="w-full  text-end">
            <button>X</button>
          </Link>
          <form className="text-black flex mt-5 items-center justify-center  w-[70%] flex-col">
            <div className="flex w-full justify-between gap-y-6 flex-wrap ">
              <Button
                component="label"
                variant="contained"
                className="w-[48%]"
                onChange={(e: any) => upload(e)}
                // onClick={uploadPhoto}
                disabled={loading}
                startIcon={<BsFillCloudArrowUpFill />}
              >
                Upload file
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>

              <div className="w-[48%] min-h-16 max-h-20 object-fill overflow-hidden border">
                <img src={Image?.url || data?.image?.url} alt="" />
              </div>
              <TextField
                id="outlined-basic"
                className="text-white w-[48%]"
                required
                label="Name"
                variant="filled"
                defaultValue={data.name}
                onChange={(event) =>
                  setFormValues({ ...formValues, name: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                className="text-white w-[48%]"
                required
                label="year"
                type="number"
                variant="filled"
                defaultValue={data.year}
                onChange={(event) =>
                  setFormValues({ ...formValues, year: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                className="text-white  w-[48%]"
                required
                type="number"
                label="Time"
                variant="filled"
                defaultValue={data.time}
                onChange={(event) =>
                  setFormValues({ ...formValues, time: event.target.value })
                }
              />

              <Input
                aria-label="Demo input"
                multiline
                placeholder="Type something…"
                id="outlined-basic"
                className="text-white w-full"
                required
                defaultValue={data.desc}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    description: event.target.value,
                  })
                }
              />
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select genre"
                size="large"
                className="w-[100%] bg-white rounded"
                onChange={(value: any) =>
                  setFormValues((prevValue: any) => ({
                    ...prevValue,
                    genre: value,
                  }))
                }
                defaultValue={defaultV}
                options={genresOpt}
              />
            </div>
            <button
              className="mt-5 w-full h-14 rounded text-2xl text-white font-[600] bg-purple-600 shadow-lg"
              type="submit"
              onClick={(e) => handleEdit(e)}
            >
              {loading ? "loading.." : "submit"}
            </button>
          </form>
          <div>
            <p>{errorr?.response.data.message}</p>
          </div>
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
    </div>
  );
}
