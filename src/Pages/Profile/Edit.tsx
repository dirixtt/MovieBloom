import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";

import {
  Alert,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
export default function Edit() {
  const [Image, setImage] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const [msg, setMsg] = useState<any>();
  const [category, setCategorys] = useState<any>();
  const [languages, setLanguages] = useState<any>();
  const [ganres, setGanres] = useState<any>();
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
  }, [token]); // Include 'id' as a dependency so that it fetches data when 'id' changes

  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [selectedGanres, setSelectedGanres] = useState(
    Array.isArray(data?.category) ? data?.category.map((i: any) => i._id) : []
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    Array.isArray(data?.language) ? data?.language.map((i: any) => i._id) : []
  );

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
      }
    }else{
      setMsg("Error")
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
  const handleChange = (event: any) => {
    const { value } = event.target;
    setSelectedTags(value);
    setFormValues({
      ...formValues,
      category: value,
    });
  };
  const handleChangeGanre = (event: any) => {
    const { value } = event.target;
    setSelectedGanres(value);
    setFormValues({
      ...formValues,
      genre: value,
    });
  };
  const handleChangeLanguage = (event: any) => {
    const { value } = event.target;
    setSelectedLanguages(value);

    setFormValues({
      ...formValues,
      language: value,
    });
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
    if (!formValues.year.trim() || !yearPattern.test(formValues.year)) {
      newErrors.year = "Enter a valid 4-digit year";
      valid = false;
    } else {
      newErrors.year = "";
    }

    // Time validation
    const timePattern = /^\d{2}:\d{2}$/;
    if (!formValues.time.trim() || !timePattern.test(formValues.time)) {
      newErrors.time = "Enter a valid time in HH:mm format";
      valid = false;
    } else {
      newErrors.time = "";
    }

    setValidation(newErrors);
    return valid;
  };

  return (
    <div>
      {movieid && category && languages && ganres ? (
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

              <FormControl sx={{ width: "48%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  required
                  value={selectedTags}
                  onChange={handleChange}
                  input={<OutlinedInput label="Category" />}
                  renderValue={(selected) => {
                    const selectedCategoryTitles = category
                      .filter((c: any) => selected.includes(c._id))
                      .map((c: any) => c.title);
                    return selectedCategoryTitles.join(", ");
                  }}
                >
                  {category.map((c: any) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "48%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Ganre</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  required
                  value={selectedGanres}
                  onChange={handleChangeGanre}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => {
                    const selectGanreTitle: any = ganres
                      .filter((c: any) => selected.includes(c._id))
                      .map((c: any) => c.name);
                    return selectGanreTitle.join(", ");
                  }}
                >
                  {ganres.map((c: any) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "48%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Language
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  required
                  value={selectedLanguages}
                  onChange={handleChangeLanguage}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => {
                    const selectLanguageTitle: any = languages
                      .filter((c: any) => selected.includes(c._id))
                      .map((c: any) => c.name);
                    return selectLanguageTitle.join(", ");
                  }}
                >
                  {languages.map((c: any) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            {/* <p>{errorr?.response.data.message}</p> */}
            <button onClick={() => console.log(selectedTags)}>click</button>
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
