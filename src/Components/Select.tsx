import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption } from "../reducers/Customselect";
export default function CustomSelect(props: any) {
  const { options, fetch } = props;
  const selectedOption = useSelector(
    (state: any) => state.CustomSelect.selectedOption
  );
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const handleOptionClick = (option: any) => {
    console.log("Dispatching action with option:", option);
    dispatch(setSelectedOption(option));
    fetch("");
    setIsDropdownOpen(false);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-white">
      <div className="relative">
        <div
          onClick={handleDropdownToggle}
          className="cursor-pointer px-5 rounded py-2 border bg-[#1f2020]"
        >
          {selectedOption?.name || "Select an Option"} &#x25bc;
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-20 rounded overflow-hidden bg-[#1f2020] top-[50px] w-full"
          >
            {options.map((option: any, index: number) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className="hover:bg-white/50 duration-200 flex px-3 py-2 items-center cursor-pointer"
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
