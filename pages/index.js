import { useState, useEffect } from "react";
import Contact from "./components/contact";
import Avatar from "./components/avatar";
import SidePanel from "./components/sidepanel";
import Education from "./components/education";
import data from "./data";
import { v4 as uuidv4 } from "uuid";
import EditLogo from "./components/logo/editLogo";
import SaveLogo from "./components/logo/saveLogo";
import Work from "./components/work";
import Skills from "./components/skills";

export default function Home() {
  const [isEditable, setIsEditable] = useState(false);
  const [person, setPerson] = useState(data[0]);
  useEffect(() => {
    const examplePerson = data[0];
    const personExists = window.localStorage.getItem("person");

    if (personExists) {
      const personLocal = JSON.parse(localStorage.getItem("person"));
      return setPerson(personLocal);
    } else {
      setPerson(examplePerson);
    }
  }, []);

  // ===== General Handlers =====

  function handleEditBtn() {
    setIsEditable(!isEditable);
    window.localStorage.setItem("person", JSON.stringify(person));
  }

  // ===== Add Handlers =====

  function handleAddEduFIeld() {
    setPerson({
      ...person,
      education: [
        ...person.education,
        {
          id: uuidv4(),
          degreeTitle: { type: "text", value: "Degree Title" },
          instituteName: { type: "text", value: "University/College Name" },
          startPeriod: { type: "date", value: "" },
          endPeriod: { type: "date", value: "" },
        },
      ],
    });
  }

  function handleAddWorkFIeld() {
    setPerson({
      ...person,
      work: [
        ...person.work,
        {
          id: uuidv4(),
          jobTitle: { type: "text", value: "Job Title" },
          companyName: { type: "text", value: "Company Name" },
          description: {
            type: "textarea",
            value:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, reiciendis nobis eligendi dignissimos adipisci debitis alias voluptatibus, provident culpa quas corrupti soluta minus aperiam fugit, quidem fugiat assumenda deserunt aliquid.",
          },
          startPeriod: { type: "date", value: "" },
          endPeriod: { type: "date", value: "" },
        },
      ],
    });
  }

  function handleAddSkill(value) {
    value !== "" &&
      setPerson({
        ...person,
        skills: [...person.skills, { id: uuidv4(), value: value }],
      });
  }

  // ===== On Change Handlers =====

  function handleContactChange(e) {
    setPerson({
      ...person,
      contact: {
        ...person.contact,
        [e.target.name]: {
          ...person.contact[e.target.name],
          value: e.target.value,
        },
      },
    });
  }

  function handleEduInputChange(e, index) {
    setPerson({
      ...person,
      education: person.education.map((edu, i) =>
        i === index
          ? {
              ...edu,
              [e.target.name]: {
                ...edu[e.target.name],
                value: e.target.value,
              },
            }
          : edu
      ),
    });
  }

  function handleWorkInputChange(e, index) {
    setPerson({
      ...person,
      work: person.work.map((workInputField, i) =>
        i === index
          ? {
              ...workInputField,
              [e.target.name]: {
                ...workInputField[e.target.name],
                value: e.target.value,
              },
            }
          : workInputField
      ),
    });
  }

  // ===== Delete Handlers =====

  function handleDeleteEduField(e) {
    setPerson({
      ...person,
      education: person.education.filter((field) => field.id !== e.target.id),
    });
  }

  function handleDeleteWorkField(e) {
    setPerson({
      ...person,
      work: person.work.filter((field) => field.id !== e.target.id),
    });
  }

  function handleDeleteSkill(arr) {
    setPerson({
      ...person,
      skills: person.skills.filter(
        (skill) => !arr.find((skillToDelete) => skill.id === skillToDelete.id)
      ),
    });
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newPerson = { ...person, image: imageUrl };
      setPerson(newPerson);
      window.localStorage.setItem("person", JSON.stringify(newPerson));
    }
  };

  const handleDeleteBtn = () => {
    setPerson({ ...person, image: null });
  };
  return (
    <>
      <button className='editBtn' type='submit' onClick={handleEditBtn}>
        {isEditable ? <SaveLogo /> : <EditLogo />}
      </button>
      <SidePanel>
        <Avatar
          person={person}
          isEditable={isEditable}
          onUpload={handleImageUpload}
          onClick={handleDeleteBtn}
        />
        <Contact
          data={person.contact}
          isEditable={isEditable}
          onClick={handleEditBtn}
          onChange={handleContactChange}
        />
        <Education
          data={person.education}
          isEditable={isEditable}
          onChange={handleEduInputChange}
          onAdd={handleAddEduFIeld}
          onDelete={handleDeleteEduField}
        />
        <Skills
          data={person.skills}
          isEditable={isEditable}
          onAdd={handleAddSkill}
          onDelete={handleDeleteSkill}
        />
      </SidePanel>
      <h1 className='name'>{person.contact.name.value}</h1>
      <Work
        data={person.work}
        isEditable={isEditable}
        onChange={handleWorkInputChange}
        onAdd={handleAddWorkFIeld}
        onDelete={handleDeleteWorkField}
      />
    </>
  );
}
