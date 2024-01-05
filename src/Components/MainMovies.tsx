import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "qs";
import Cards from "./Cards";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { updateParams } from "../reducers/Params";
import { Categories } from "../reducers/categories";
import { genre } from "../reducers/genre";

const API_BASE_URL = "https://film24-org-by-codevision.onrender.com/api";
const MOVIES_API_URL = `${API_BASE_URL}/movies`;
const CATEGORIES_API_URL = `${API_BASE_URL}/categories`;
const GENRES_API_URL = `${API_BASE_URL}/genres`;
const LANGUAGES_API_URL = `${API_BASE_URL}/languages`;

interface Category {
  _id: number;
  title: string;
}

interface Genre {
  _id: number;
  name: string;
}

interface Language {
  _id: number;
  name: string;
}

interface Movie {
  name: string;
  original_title: string;
  _id: number;
  release_date: string;
  image: any;
}

const getFilterFromQuery = (query: string): any => {
  const params = qs.parse(query, { ignoreQueryPrefix: true });
  return {
    search: params.search || null,
    category: params.category || null,
    genre: params.genre || null,
    rate: params.rate || null,
    time: params.time || null,
    year: params.year || null,
    language: params.language || null,
  };
};

interface Params {
  search: string | null;
  category: string | null;
  genre: string | null;
  rate: string | null;
  time: string | null;
  year: string | null;
  language: string | null;
}

const MainMovies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query } = useSelector((state: any) => state.params);
  console.log(query);
  const [filters, setFilters] = useState<Params>(query);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);

  const updateQueryParams = () => {
    if (filters !== null) {
      const nonEmptyFilters: any = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) =>
            value !== null && value !== "all" && value !== undefined
        )
      );

      setSearchParams(nonEmptyFilters);
    }
  };

  useEffect(() => {
    updateQueryParams();
  }, [filters]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateParams(filters));
  }, [dispatch, filters]);

  const cancelTokenSource = axios.CancelToken.source();

  const fetchData = async (pageNumber: number) => {
    try {
      setLoading(true);

      const params = {
        pageNumber,
        ...Object.fromEntries(searchParams.entries()),
        ...query, // Use queryParams instead of query from Redux state
      };

      console.log("Request Parameters:", params);

      const response = await axios.get(MOVIES_API_URL, {
        params,
        cancelToken: cancelTokenSource.token, // Use cancellation token
      });

      setMovies(response.data.movies);
      setTotalPages(response.data.pages);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was cancelled
        console.log("Request cancelled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getFilterParams = async () => {
    try {
      setLoading(true);
      const [categoriesResponse, genresResponse, languageResponse] =
        await Promise.all([
          axios.get(CATEGORIES_API_URL),
          axios.get(GENRES_API_URL),
          axios.get(LANGUAGES_API_URL),
        ]);

      setCategories(categoriesResponse.data);
      dispatch(Categories(categoriesResponse.data))
      setGenres(genresResponse.data);
      dispatch(genre(genresResponse.data))
      setLanguages(languageResponse.data);
    } catch (error) {
      console.error("Error fetching categories, genres, or languages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: categoryId === "all" ? null : categoryId,
    }));
  
    updateUrl(categoryId, "category");
  };

  useEffect(() => {
    return () => {
      // Cleanup function to cancel ongoing requests when the component is unmounted
      cancelTokenSource.cancel("Component unmounted");
    };
  }, []);

  const handleGenreChange = (genreId: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: genreId === "all" ? null : genreId,
    }));
  
    updateUrl(genreId, "genre");
  };

  const handleRateChange = (rateId: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rate: rateId === "all" ? null : rateId,
    }));
  };

  const handleTimeChange = (timeId: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      time: timeId === "all" ? null : timeId,
    }));
  };

  const handleYearChange = (date: any, dateString: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: dateString === "all" ? null : dateString,
    }));
  };

  const handleLanguageChange = (languageId: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      language: languageId === "all" ? null : languageId,
    }));
  };
  const navigate = useNavigate();

  const updateUrl = (value: any, filterName: string) => {
    const currentSearch = new URLSearchParams(searchParams);
    if (value === "all") {
      currentSearch.delete(filterName);
    } else {
      currentSearch.set(filterName, value);
    }

    navigate(`/?${currentSearch.toString()}`);
  };

  useEffect(() => {
    fetchData(page);
  }, [searchParams, page, query]);

  useEffect(() => {
    getFilterParams();
  }, []);

  useEffect(() => {
    const filterFromQuery: any = getFilterFromQuery(searchParams.toString());
    setFilters(filterFromQuery);
    fetchData(page);
  }, [searchParams, page]);

  const onSearch: (value: string) => void = (value) => {
    if (value.length > 0) {
      setSearchParams((prevParams) => ({
        ...Object.fromEntries(prevParams.entries()),
        search: value,
      }));
    } else {
      setSearchParams((prevParams) => {
        const newParams = { ...Object.fromEntries(prevParams.entries()) };
        delete newParams.search; // Remove the 'search' parameter if the value is empty
        return newParams;
      });
    }
  };

  const categoryOptions: any = categories || [];
  const genreOptions: any = genres || [];
  const rateOptions: any = Array.from({ length: 5 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));
  const timeOptions: any = [{ label: "All Times", value: null }];
  const languageOptions = languages || [];
  const yearOptions = Array.from(
    new Set(movies?.map((movie: any) => movie?.year) || [])
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    fetchData(value);
  };

  return (
    <div className="container my-10">
      <div className="flex h-10 items-center">
        <Search
          id="search"
          className="bg-[#d9d9d9] rounded-md"
          placeholder="Input search text"
          onSearch={onSearch}
          size="large"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="text-white">
            Kategoriyalar:
          </label>
          <Select
            id="category"
            className="w-full"
            size="large"
            placeholder="Kategoriya tanlang"
            allowClear
            onChange={handleCategoryChange}
            value={filters?.category !== null ? filters?.category : undefined}
            options={[
              { label: "Выбрать все", value: "all" },
              ...categoryOptions.map((category: Category) => ({
                label: category.title,
                value: category._id,
              })),
            ]}
          />
        </div>
        <div>
          <label htmlFor="genre" className="text-white">
            Genre:
          </label>
          <Select
            id="genre"
            className="w-full"
            size="large"
            placeholder="Select genre"
            allowClear
            onChange={handleGenreChange}
            value={filters?.genre || undefined}
            options={[
              { label: "Выбрать все", value: "all" },
              ...genreOptions.map((genre: Genre) => ({
                label: genre.name,
                value: genre._id,
              })),
            ]}
          />
        </div>
        <div>
          <label htmlFor="rate" className="text-white">
            Rate:
          </label>
          <Select
            id="rate"
            className="w-full"
            size="large"
            placeholder="Select rate"
            allowClear
            onChange={handleRateChange}
            value={filters?.rate || undefined}
            options={[{ label: "Выбрать все", value: "all" }, ...rateOptions]}
          />
        </div>
        <div>
          <label htmlFor="time" className="text-white">
            Time:
          </label>
          <Select
            id="time"
            className="w-full"
            size="large"
            placeholder="Select time"
            allowClear
            onChange={handleTimeChange}
            value={filters?.time || undefined}
            options={[{ label: "Выбрать все", value: "all" }, ...timeOptions]}
          />
        </div>
        <div>
          <label htmlFor="year" className="text-white">
            Year:
          </label>
          <Select
            id="year"
            className="w-full"
            size="large"
            placeholder="Select year"
            allowClear
            onChange={handleYearChange}
            value={filters?.year || undefined}
            options={[
              { label: "Выбрать все", value: "all" },
              ...yearOptions.map((year: any) => ({
                label: year,
                value: year,
              })),
            ]}
          />
        </div>
        <div>
          <label htmlFor="language" className="text-white">
            Language:
          </label>
          <Select
            id="language"
            className="w-full"
            size="large"
            placeholder="Select language"
            allowClear
            onChange={handleLanguageChange}
            value={filters?.language || undefined}
            options={[
              { label: "Выбрать все", value: "all" },
              ...languageOptions.map((language: any) => ({
                label: language.name,
                value: language._id,
              })),
            ]}
          />
        </div>
      </div>

      <Cards movies={movies} loading={loading} />
      <div className="w-full flex justify-center mt-5 text-white">
        <Pagination
          color="secondary"
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MainMovies;
