import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import Cards from "./Cards";
import Search from "antd/es/input/Search";

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

const MainMovies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: null,
    category: null,
    genre: null,
    rate: null,
    time: null,
    year: null,
    language: null,
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);

  const updateQueryParams = () => {
    const nonEmptyFilters: any = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== null && value !== "all" && value !== undefined
      )
    );

    setSearchParams(nonEmptyFilters);
  };

  useEffect(() => {
    updateQueryParams();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {
        pageNumber: page,
        ...Object.fromEntries(searchParams.entries()), // Используем текущие параметры запроса
      };

      // Теперь params передаются напрямую в useSearchParams
      setSearchParams(params);

      // Проверяем каждый параметр и добавляем его к запросу только если он не "Выбрать все"
      Object.entries(params).forEach(([key, value]) => {
        if (value !== "all") {
          params[key] = value;
        }
      });

      const response = await axios.get(MOVIES_API_URL, { params });

      setMovies(response.data.movies);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      setGenres(genresResponse.data);
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
  };

  const handleGenreChange = (genreId: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: genreId === "all" ? null : genreId,
    }));
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
  useEffect(() => {
    fetchData();
  }, [searchParams, page]);

  useEffect(() => {
    getFilterParams();
  }, []);

  useEffect(() => {
    // При первоначальной загрузке страницы
    const filterFromQuery: any = getFilterFromQuery(searchParams.toString());

    // Set the filters and fetch data
    setFilters(filterFromQuery);
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading) {
      fetchData();
    }
  }, [page]);

  const onSearch: (value: string) => void = (value) => {
    if (value.length > 0) {
      setSearchParams((prevParams) => ({
        ...Object.fromEntries(prevParams.entries()),
        search: value,
      }));
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
    console.log(page)
  };

  return (
    <div className="container my-10">
      <button onClick={() => console.log(yearOptions)}>click</button>
      <div className="flex gap-2 h-10 items-center">
        <Search
          className="bg-[#d9d9d9] rounded-md"
          placeholder="Input search text"
          onSearch={onSearch}
          size="large"
        />
      </div>
      <div className="mt-4 gap-2 flex justify-between">
        <Select
          className="w-full"
          size="large"
          placeholder="Select category"
          allowClear
          onChange={handleCategoryChange}
          value={filters.category}
          options={[
            { label: "Выбрать все", value: "all" },
            ...categoryOptions.map((category: Category) => ({
              label: category.title,
              value: category._id,
            })),
          ]}
        />
        <Select
          className="w-full"
          size="large"
          placeholder="Select genre"
          allowClear
          onChange={handleGenreChange}
          value={filters.genre}
          options={[
            { label: "Выбрать все", value: "all" },
            ...genreOptions.map((genre: Genre) => ({
              label: genre.name,
              value: genre._id,
            })),
          ]}
        />
        <Select
          className="w-full"
          size="large"
          placeholder="Select rate"
          allowClear
          onChange={handleRateChange}
          value={filters.rate}
          options={[{ label: "Выбрать все", value: "all" }, ...rateOptions]}
        />
        <Select
          className="w-full"
          size="large"
          placeholder="Select time"
          allowClear
          onChange={handleTimeChange}
          value={filters.time}
          options={[{ label: "Выбрать все", value: "all" }, ...timeOptions]}
        />
        <Select
          className="w-full"
          size="large"
          placeholder="Select year"
          allowClear
          onChange={handleYearChange}
          value={filters.year}
          options={[
            { label: "Выбрать все", value: "all" },
            ...yearOptions.map((year: any) => ({
              label: year,
              value: year,
            })),
          ]}
        />
        <Select
          className="w-full"
          size="large"
          placeholder="Select language"
          allowClear
          onChange={handleLanguageChange}
          value={filters.language}
          options={[
            { label: "Выбрать все", value: "all" },
            ...languageOptions.map((language: any) => ({
              label: language.name,
              value: language._id,
            })),
          ]}
        />
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
