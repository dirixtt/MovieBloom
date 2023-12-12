import { InputNumber, Select } from "antd";
import { Alert, Button, IconButton, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import type { SelectProps } from "antd";
import axios from "axios";
import Loader from "../../Components/Loader";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import { IoMdAdd } from "react-icons/io";
import moment from "moment";
import { MdClose, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function CreateMovie() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<any>();
  const [error, setError] = useState(null);
  const [image, setImage] = useState<any>(null);
  const [titleImage, setTitleImage] = useState<any>(null);
  const [casts, setCasts] = useState<any>(null);
  const [genres, setGenres] = useState<any>(null);
  const [msg, setMsg] = useState<any>(null);
  const [categories, setCategories] = useState<any>([
    {
      label: " i.name", // Extract label from i.name
      value: " i._id",
    },
  ]);
  const { Option } = Select;
  const [castOpen, setCastOpen] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [loading3, setLoading3] = useState<boolean>(false);
  // const [selected, setSelected] = useState<any>([]);
  const API_BASE_URL = "https://film24-org-by-codevision.onrender.com/api";

  const categOptions = categories.map((i: any) => ({
    label: i.title, // Extract label from i.name
    value: i._id,
  }));
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
  interface val {
    name: string;
    desc: string;
    titleImage: any;
    image: any;
    category: string[];
    genre: string[];
    language: string[] | any;
    year: "";
    time: "";
    video: "";
    rate: number;
    casts: any;
    type: string;
  }
  const [value, setValue] = useState<val>({
    name: "",
    type: "movie",
    desc: "",
    titleImage: titleImage,
    image: {},
    category: [],
    genre: [],
    language: [],
    year: "",
    time: "",
    video: "",
    rate: 0,
    casts: [],
  });

  console.log(value);

  const [validation, setValidation] = useState<any>({
    name: "",
    desc: "",
    titleImage: "",
    image: "",
    category: "",
    genre: "",
    language: "",
    year: "",
    time: "",
    video: "",
    rate: "",
    type: "",
    casts: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newValidation: any = {};

    // Validation for the 'name' field
    if (!value.name.trim()) {
      newValidation.name = "Name is required";
      isValid = false;
    }

    // Validation for the 'desc' field
    if (!value.desc.trim()) {
      newValidation.desc = "Description is required";
      isValid = false;
    }

    // Validation for the 'year' field
    if (!value.year) {
      newValidation.year = "Year is required";
      isValid = false;
    } else if (value.year < 1900 || value.year > 2099) {
      newValidation.year = "Year must be between 1900 and 2099";
      isValid = false;
    }

    // Validation for the 'time' field
    if (!value.time) {
      newValidation.time = "Time is required";
      isValid = false;
    }

    // Validation for the 'video' field
    if (!value.video) {
      newValidation.video = "Video is required";
      isValid = false;
    }

    // Validation for the 'language' field
    if (!value.language || value.language.length === 0) {
      newValidation.language = "Please select at least one language";
      isValid = false;
    }

    // Validation for the 'category' field
    if (!value.category || value.category.length === 0) {
      newValidation.category = "Please select a category";
      isValid = false;
    }

    // Validation for the 'genre' field
    if (!value.genre || value.genre.length === 0) {
      newValidation.genre = "Please select at least one genre";
      isValid = false;
    }

    // Add validations for other fields...

    setValidation((prevValidation: any) => ({
      ...prevValidation,
      ...newValidation,
    }));

    return isValid;
  };
const navigate = useNavigate()
  const handleFormSubmit = async () => {
    try {
      setLoading3(true)
      if (validateForm()) {
        // Proceed with form submission

        const response = await axios.post(
          `https://film24-org-by-codevision.onrender.com/api/movies`,
          value,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200 || 201) {
          setMsg("Your movie uploaded")
          navigate("/")
        }
        // setMsg(response?.data.message);
        console.log(response);
      } else {
        console.log("Form validation failed. Please check errors.");
      }
    } catch (error) {
      // Handle request or validation errors
      console.error("Error submitting form:", error);
      // You may want to set an error state or display an error message to the user
    }finally{
      setLoading3(false)

    }
  };

  const fetch = async () => {
    try {
      setLoading(true);

      const fetchAPI = async (endpoint: any) => {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      };

      const [languages, genres, categories, casts] = await Promise.all([
        fetchAPI("languages"),
        fetchAPI("genres"),
        fetchAPI("categories"),
        fetchAPI("casts"),
      ]);

      setLanguage(languages);
      setGenres(genres);
      setCategories(categories);
      setCasts(casts);

      setLoading(false);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    fetch();
    console.log(token);
  }, [token]);
  const options: SelectProps["options"] = language
    ? language.map((i: any) => ({
        label: i.name, // Extract label from i.name
        value: i._id, // Extract value from i._id
      }))
    : [{ label: "no options", value: "no options" }];
  const genreOptions: SelectProps["options"] = genres
    ? genres.map((i: any) => ({
        label: i.name, // Extract label from i.name
        value: i._id, // Extract value from i._id
      }))
    : [{ label: "no options", value: "no options" }];

  const upload = async (e: any) => {
    const selectedFile = e.target.files[0];
    try {
      setLoading1(true);
      const foto = await uploadPhoto(selectedFile);
      console.log(foto);

      setImage(foto);
      setValue({
        ...value,
        image: foto._id,
      });
      setLoading1(false);
    } catch (error: any) {
      setError(error);
    }
  };

  const uploadTitleImg = async (e: any) => {
    const selectedFile = e.target.files[0];
    try {
      setLoading2(true);

      // Upload the selected file using the uploadPhoto function
      const foto = await uploadPhoto(selectedFile);
      console.log(foto);

      setTitleImage(foto);
      setValue({
        ...value,
        titleImage: foto._id,
      });
      setLoading2(false);
    } catch (error: any) {
      setError(error);
    }
  };

  const uploadPhoto = async (selectedFile: any) => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }
      const image = new FormData();
      image.append("image", selectedFile);

      // Use Axios to make a POST request to the image upload API
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

      return response.data.data;
    } catch (error: any) {
      setError(error);
    }
  };

  const [selectedCast, setSelectedCast] = useState(null);
  const [filteredCasts, setFilteredCasts] = useState(casts);
  const [selectedCastsInfo, setSelectedCastsInfo] = useState([]);

  const handleSelectChange = (value: any) => {
    setSelectedCast(value);
    filterCasts(value);
    setSelectedCastsInfo(
      value === "ALL"
        ? casts
        : casts.filter((cast: any) =>
            cast.name.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const filterCasts = (value: any) => {
    if (value === "ALL") {
      setFilteredCasts(casts);
    } else {
      const filtered = casts.filter((cast: any) =>
        cast.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCasts(filtered);
    }
  };
  const handleDeleteCast = (id: number) => {
    const updatedCasts = value.casts.filter((castId: number) => castId !== id);
    setValue({ ...value, casts: updatedCasts });
    setSelectedCastsInfo(
      selectedCastsInfo.filter((cast: any) => cast?._id !== id)
    );
  };
  // Assuming 'casts' is the array of all actors and each actor has a unique '_id' property

  const actorsToDisplay = () => {
    return casts?.filter((actor: any) => value.casts.includes(actor._id));
  };

  async function imageDelete(id: number, setFunc: any) {
    console.log(id);
    try {
      // Use Axios to make a POST request to the image upload API
      const response = await axios.delete(
        `https://film24-org-by-codevision.onrender.com/api/images/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await setFunc(null);
      setMsg(response.data.message);
    } catch (error: any) {
      setError(error);
    }
  }
  return (
    <div className="text-white">
      <h1>Create Movie</h1>
      <div className="absolute z-50 top-3 right-6">
        {error && (
          <Alert
            severity="info"
            onClose={() => {
              setError(null);
            }}
          >
            {error}
          </Alert>
        )}
      </div>
      {!loading ? (
        <div className="flex-wrap my-5 gap-y-4 w-full flex justify-between">
          <div className="w-[48%]">
            <TextField
              hiddenLabel
              name="name"
              id="filled-hidden-label-small"
              variant="filled"
              placeholder="Name"
              size="small"
              className="w-full bg-white rounded"
              value={value.name}
              onChange={(e: any) =>
                setValue({ ...value, name: e.target.value })
              }
            />
            {validation.name && <p>{validation.name}</p>}
          </div>
          <div className="w-[48%]">
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              placeholder="Enter time in minutes"
              type="number"
              name="time"
              size="small"
              className="w-full bg-white rounded"
              value={value.time}
              onChange={(e: any) =>
                setValue({ ...value, time: e.target.value })
              }
            />
            {validation.time && <p>{validation.time}</p>}
          </div>
          <div className="w-[48%]">
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select language"
              size="large"
              className="w-full bg-white rounded"
              onChange={(value: any) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  language: value,
                }))
              }
              options={options}
            />
            {validation.language && <p>{validation.language}</p>}
          </div>
          <div className="w-[48%]">
            <InputNumber
              pattern="[0-9]{4}"
              min={1900}
              max={2099}
              placeholder="Enter year (e.g., 1999)"
              size="large"
              className="w-full bg-white rounded"
              onChange={(value: any) => {
                const numericValue = parseInt(value, 10);
                if (!isNaN(numericValue)) {
                  setValue((prevValue: any) => ({
                    ...prevValue,
                    year: numericValue,
                  }));
                }
              }}
            />

            {validation.year && <p>{validation.year}</p>}
          </div>

          <div className="w-[48%] h-full items-center flex flex-col gap-4">
            <Button
              component="label"
              variant="contained"
              className="w-full "
              onChange={(e: any) => upload(e)}
              // onClick={uploadPhoto}
              disabled={loading1}
              startIcon={<BsFillCloudArrowUpFill />}
            >
              Upload image
              <VisuallyHiddenInput type="file" accept="image/*" />
            </Button>
            {loading1 ? (
              <Loader />
            ) : (
              image?.url && (
                <div className="w-full relative border h-[200px] object-contain">
                  <img
                    className="object-cover h-full"
                    src={image?.url || value?.image?.url}
                    alt=""
                  />
                  <button
                    className="absolute top-1 left-1"
                    onClick={() => imageDelete(image?._id, setImage)}
                  >
                    <MdClose />
                  </button>
                </div>
              )
            )}
          </div>
          <div className="w-[48%] h-full items-center flex flex-col gap-4">
            <Button
              component="label"
              variant="contained"
              className="w-full "
              onChange={(e: any) => uploadTitleImg(e)}
              // onClick={uploadPhoto}
              disabled={loading2}
              startIcon={<BsFillCloudArrowUpFill />}
            >
              Upload Title Image
              <VisuallyHiddenInput type="file" accept="image/*" />
            </Button>
            {loading2 ? (
              <Loader />
            ) : (
              titleImage?.url && (
                <div className="w-full border h-[200px] object-contain">
                  <img
                    className="object-cover h-full"
                    src={titleImage?.url || value?.titleImage?.url}
                    alt=""
                  />
                  <button
                    className="absolute top-1 left-1"
                    onClick={() => imageDelete(titleImage?._id, setTitleImage)}
                  >
                    <MdClose />
                  </button>
                </div>
              )
            )}
          </div>
          <div className="w-full">
            <TextArea
              showCount
              maxLength={250}
              name="desc"
              onChange={(e: any) =>
                setValue({ ...value, desc: e.target.value })
              }
              placeholder="can resize"
            />
            {validation.desc && <p>{validation.desc}</p>}
          </div>

          <div className="w-full flex items-center justify-between  ">
            <div className="w-[48%]">
              <Select
                placeholder="select category"
                allowClear
                className="w-full "
                size="large"
                onChange={(selectedCategory) => {
                  setValue((prevValue) => ({
                    ...prevValue,
                    category: selectedCategory,
                  }));
                }}
                options={categOptions}
                value={value.category} // Make sure to set the value prop
              />
              {validation.category && <p>{validation.category}</p>}
            </div>
            <div className="w-[48%]">
              <TextField
                hiddenLabel
                name="video"
                id="filled-hidden-label-small"
                variant="filled"
                type="number"
                placeholder="Video"
                size="small"
                className="w-[100%] bg-white rounded"
                value={value.video}
                onChange={(e: any) =>
                  setValue({ ...value, video: e.target.value })
                }
              />
              {validation.video && <p>{validation.video}</p>}
            </div>
          </div>
          <div className="w-full">
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select language"
              size="large"
              className="w-[100%] bg-white rounded"
              onChange={(value: any) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  genre: value,
                }))
              }
              options={genreOptions}
            />
            {validation.language && <p>{validation.language}</p>}
          </div>

          <div className="flex gap-5 w-full">
            <Button
              className="w-[146px] h-[194px]"
              variant="contained"
              onClick={() => setCastOpen(true)}
            >
              <IoMdAdd />
            </Button>
            {actorsToDisplay()?.map((actor: any) => (
              <div
                key={actor._id}
                className="border group relative p-2 rounded flex flex-col justify-center items-center"
              >
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={actor?.image.url}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <p>{actor.surname}</p>
                <div className="absolute backdrop-blur-sm duration-200 top-0 left-0 h-full w-full inset-0 items-center justify-center hidden group-hover:flex bg-black/50">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteCast(actor._id)}
                  >
                    <MdDelete className="text-white" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-5 active:scale-95 duration-200 bg-gray-600 rounded h-10"
            onClick={handleFormSubmit}
          >
            {loading3 ? "loading..." : "Submit"}
          </button>

          {castOpen && (
            <div
              onClick={() => setCastOpen(false)}
              className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-md flex justify-center items-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded shadow-md w-1/2 h-[70%] p-6 overflow-y-auto"
              >
                <div className="flex justify-between">
                  <Select
                    showSearch
                    style={{ width: "95%" }}
                    placeholder="Search casts"
                    optionFilterProp="children"
                    onChange={handleSelectChange}
                    filterOption={false}
                    value={selectedCast}
                  >
                    <Option value="ALL">ALL</Option>
                    {casts?.map((i: any) => (
                      <Option key={i.id} value={i.name}>
                        {i.name}
                      </Option>
                    ))}
                  </Select>
                  <button
                    className="text-black"
                    onClick={() => setCastOpen(false)}
                  >
                    <MdClose />
                  </button>
                </div>

                <div className="mt-5">
                  {filteredCasts
                    ? filteredCasts?.map((i: any) => (
                        <div
                          key={i._id}
                          className={`
                    ${
                      value.casts.find((cast: any) => cast._id === i._id)
                        ? "bg-slate-200"
                        : "bg-slate-500"
                    }
                    mb-5 flex items-center justify-between rounded shadow-md
                  `}
                        >
                          <div className="flex items-center">
                            <img
                              className="h-32 w-32 rounded-full object-cover"
                              src={i?.image.url}
                              alt={i.name}
                            />

                            <div className="ml-4">
                              <h3 className="font-medium">{i.name}</h3>
                              <p className="text-sm">{i.surname}</p>
                              <p className="text-sm">
                                Birthday:{" "}
                                {moment(i.birthday).format("YYYY MM DD")}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              size="large"
                              className="h-full p-1 min-w-[15px]"
                              onClick={() => {
                                if (
                                  !value.casts.some(
                                    (cast: any) => cast._id === i._id
                                  )
                                ) {
                                  setValue((prevState) => ({
                                    ...prevState,
                                    casts: [...prevState.casts, i._id], // Add clicked cast member to 'casts' array
                                  }));
                                }
                              }}
                            >
                              <IoMdAdd />
                            </Button>
                          </div>
                        </div>
                      ))
                    : casts.map((i: any) => (
                        <div
                          key={i._id}
                          className={`
                        ${
                          value.casts.find((cast: any) => cast._id === i._id)
                            ? "bg-slate-200"
                            : "bg-slate-500"
                        }
                        mb-5 flex items-center justify-between rounded shadow-md
                      `}
                        >
                          <div className="flex items-center">
                            <img
                              className="h-32 w-32 rounded-full object-cover"
                              src={i?.image.url}
                              alt={i.name}
                            />

                            <div className="ml-4">
                              <h3 className="font-medium">{i.name}</h3>
                              <p className="text-sm">{i.surname}</p>
                              <p className="text-sm">
                                Birthday:{" "}
                                {moment(i.birthday).format("YYYY MM DD")}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              size="large"
                              className="h-full p-1 min-w-[15px]"
                              onClick={() => {
                                if (
                                  !value.casts.some(
                                    (cast: any) => cast._id === i._id
                                  )
                                ) {
                                  setValue((prevState) => ({
                                    ...prevState,
                                    casts: [...prevState.casts, i._id], // Add clicked cast member to 'casts' array
                                  }));
                                }
                              }}
                            >
                              <IoMdAdd />
                            </Button>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
