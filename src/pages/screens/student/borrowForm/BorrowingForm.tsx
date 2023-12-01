import { useState, ChangeEvent, MouseEvent, useEffect, FormEvent } from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeaderLogo from "../../../../components/assets/headerlogo.png";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Link, useNavigate  } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface Borrower {
  id: number;
  studentId: string;
}

interface TableItem {
  id: string | number;
  name: string;
  action: string;
}

function BorrowingForm() {

  // temporary datas
  
  const tempdata: [string, string, string][] = [
    ["001", "Beaker", "Delete"],
    ["002", "Test Tube", "Delete"],
    ["003", "Glass", "Delete"],
    ["004", "Bowl", "Delete"],
  ];

  const tempcourse: [string][] = [
    ["BS Chemistry"],
    ["BS Science Education"],
    ["BS Environmental Science"],
    ["BS Food Technlogy"],
    ["BS Physics"],
  ];

  const tempteacher: [string][] = [
    ["Yare, Jerilyn M."],
    ["Alilin, Sofia Dara"],
    ["Pongot, Jophiel"],
    ["Dela Pena, Prince Kurt Lawrence"],
  ];

  const tempsubs: [string][] = [
    ["Chemistry"],
    ["Physical Chemistry"],
    ["Microbiology"],
    ["Analytical Chemistry"],
    ["Physics 1"],
  ];
  const tempsection: [string][] = [["CHEM-1H1"], ["CHEM-1H2"], ["ENVISCI-1N1"]];

  //removing and adding borrower functions

  const [borrowers, setBorrowers] = useState<Borrower[]>([
    { id: 1, studentId: "" },
  ]);

  const addBorrower = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newId = borrowers.length + 1;
    const newBorrower: Borrower = { id: newId, studentId: "" };
    setBorrowers([...borrowers, newBorrower]);
  };

  const removeBorrower = (e: MouseEvent<HTMLButtonElement>) => {
    if (borrowers.length > 1) {
      e.preventDefault();
      const updatedBorrowers: Borrower[] = [...borrowers];
      updatedBorrowers.pop();
      setBorrowers(updatedBorrowers);
    }
  };

  // For equipment search and adding to table functions

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    [string, string, string][]
  >([]);

  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term: string = e.target.value;
    setSearchTerm(term);

    // Check if the search term is not empty and show the suggestion box
    if (term.trim() !== "") {
      setShowSuggestionBox(true);
      const results = tempdata.filter((item) =>
        item[1].toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      // If the search term is empty, hide the suggestion box
      setShowSuggestionBox(false);

      setSearchResults([]); // You may want to clear the search results in this case
    }
  };

  const handleSelectItem = (item: [string, string, string]) => {
    const newItem: TableItem = {
      id: item[0],
      name: item[1],
      action: item[2], // Set the action according to your requirements
    };

    const existingIndex = tableData.findIndex(
      (tableItem) => tableItem.id === newItem.id
    );

    if (existingIndex !== -1) {
      const updatedTableData = [...tableData];
      updatedTableData[existingIndex] = newItem;
      setTableData(updatedTableData);
    } else {
      setTableData([...tableData, newItem]);
    }
  };

  // para ni ma remove ang item nga gi add sa table

  const handleRemoveItem = (index: number) => {
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      updatedTableData.splice(index, 1);
      return updatedTableData;
    });
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    // Define your custom validation logic here.
    // Check if all required fields are filled out and set isFormValid accordingly.

    // For example, you can check if the student ID field is not empty.
    const isStudentIdValid = borrowers.every(
      (borrower) => borrower.studentId.trim() !== ""
    );

    // Add more validation checks for other required fields as needed.

    setIsFormValid(isStudentIdValid /* && otherValidationChecks */);
  };

  // Call the validateForm function whenever the form data changes
  useEffect(() => {
    validateForm();
  }, [borrowers]); // You may want to include other form data in the dependency array if needed

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      if (tableData.length > 0) {
        // The form is valid, and the table is not empty, so you can proceed with form submission or other actions.
        // Handle the form submission logic here.
        console.log("Form submitted");
        navigate("/request-confirm");
      } else {
        // Display an error message because the table is empty.
        setFormSubmitted(true);
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };



  return (
    <div className="pageBody">
      {/* Header */}
      <div className="headerContainer">
        {/* Arrow in the Header */}
        <div className="arrowContainer">
          <Link to="/dashboard" className="customArrowLink">
            <ArrowBackIcon sx={{ width: 30, height: 30 }} />
          </Link>
        </div>
        <div className="logoContainer">
          <img src={HeaderLogo} alt="logo" />
        </div>
      </div>

      {/* Forms */}
      <div className="allFormContainer">
        <div>
          <h1>Fill-up Form</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit} action="/request-confirm">
            {/* First form container includes student id and course input fields */}
            <div className="firstFormContainer">
              {/* Student ID input, use material UI for the input fields */}
              <div>
                <label>Student ID (Leader)</label>
              </div>
              <div>
                <OutlinedInput
                  id="standard-adornment"
                  className="firstfield"
                  placeholder="Student ID"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <button className="qrButton"></button>
                    </InputAdornment>
                  }
                />
              </div>
              <div>
                <label>Course</label>
              </div>
              <div className="drop">
                  <FormControl variant="outlined" className="selectform secondfield" >
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      style={{  backgroundColor: "white",}}
                    >
                      <MenuItem
                        value={undefined}
                        disabled
                        style={{ color: "gray" }}
                      >
                        Course
                      </MenuItem>
                      {tempcourse.map((course, index) => (
                        <MenuItem key={index} value={course[0]}>
                          {course[0]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
            </div>
            <div className="secondFormContainer">
              <div className="labelContain">
                <label>Section</label>
              </div>
              <div className="drop">
                <FormControl variant="outlined" className="selectform">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="customSelect"
                  >
                    <MenuItem
                      value={undefined}
                      disabled
                      className="specialMenuItem"
                    >
                      Section
                    </MenuItem>
                    {tempsection.map((section, index) => (
                      <MenuItem
                        key={index}
                        value={section[0]}
                      >
                        {section[0]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <label>Lab Instructor</label>
              </div>
              <div>
                <div className="drop">
                  <FormControl variant="outlined" className="selectform">
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={undefined} disabled>
                        Lab Instructor
                      </MenuItem>
                      {tempteacher.map((teacher, index) => (
                        <MenuItem key={index} value={teacher[0]}>
                          {teacher[0]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="labelContain">
                  <label>Subject</label>
                </div>
                <div className="drop">
                  <FormControl variant="outlined" className="selectform">
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem
                        value={undefined}
                        disabled
                        style={{ color: "gray" }}
                      >
                        Subject
                      </MenuItem>
                      {tempsubs.map((subject, index) => (
                        <MenuItem key={index} value={subject[0]}>
                          {subject[0]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="thirdFormContainer">
                  <div>
                    <h1>Equipment Search</h1>
                  </div>
                  <div>
                    <OutlinedInput
                      className="inputField"
                      placeholder="Search here to add below"
                      value={searchTerm}
                      onChange={handleSearch}
                      onFocus={handleInputFocus} // Call this when the input is focused
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </div>
                  <div className="tableContainer">
                    {/* Conditionally render the suggestion box based on isInputFocused */}
                    {isInputFocused && (
                      <div
                        className="suggestionBox"
                        style={{
                          display: showSuggestionBox ? "block" : "none",
                        }}
                      >
                        <ul className="ulStyle">
                          {searchResults.map((item, index) => (
                            <div className="liContainer">
                              <li
                                className="liStyle"
                                key={index}
                                onClick={() => handleSelectItem(item)}
                              >
                                {item[1]}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="tableContainer1">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Item No.</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody className="bodytable">
                          {tableData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>
                                <button
                                  className="removeBtnLink"
                                  onClick={() => handleRemoveItem(index)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {formSubmitted && tableData.length === 0 && (
                        <p className="errorMessage">
                          Please select at least one item in the table.
                        </p>
                      )}
                      <p className="totalItem">
                        <span className="totalContain">
                          <b>Total Selected:</b>
                        </span>
                        {tableData.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fourthFormContainer">
                  <div>
                    <h1>Members</h1>
                  </div>
                  {borrowers.map((borrower, index) => (
                    <div key={index}>
                      <div className="labelButtonContainer">
                        <label>{`Borrower ${borrower.id}`}</label>
                        <button
                          className="removeButton"
                          onClick={removeBorrower}
                        >
                          <RemoveCircleIcon className="removeButtonIcon" />
                        </button>
                      </div>
                      <OutlinedInput
                        id="standard-adornment"
                        className="inputField"
                        value={borrower.studentId}
                        placeholder="Student ID"
                        required
                        onChange={(e) => {
                          const { value } = e.target;
                          setBorrowers((prevBorrowers) =>
                            prevBorrowers.map((prevBorrower) =>
                              prevBorrower.id === borrower.id
                                ? { ...prevBorrower, studentId: value }
                                : prevBorrower
                            )
                          );
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <button className="qrButton"></button>
                          </InputAdornment>
                        }
                      />
                    </div>
                  ))}
                  <div className="addButtonContainer">
                    <button className="addBButton" onClick={addBorrower}>
                      <AddIcon className="addBButton" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnsContainer1">
              <div>
                <button type="submit" className="reqBtn">
                  Request
                </button>
              </div>
              <div>
                <Link to="/dashboard">
                  <button className="cancelBtn">Cancel</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default BorrowingForm;
