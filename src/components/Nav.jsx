import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import UserAvatar from "./UserAvatar";
import Button from "./Button";
import Form from "./Form";
import { useSearch } from "../store/searchSlice";

function Nav() {
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarBio, setAvatarBio] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openForm = () => {
    setShowForm(true);
    setMenuOpen(false); // Close menu when form is opened
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const { setSearchQuery } = useSearch();
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAvatarBio = () => {
    setAvatarBio((prev) => !prev);
  };

  return (
    <nav className="bg-background flex items-center justify-between p-4 relative">
      {/* Logo */}
      <div className="logo">
        <img
          className="w-12 h-12 rounded-full hover:cursor-pointer"
          src="./logo.png"
          alt="logo"
        />
      </div>

      {/* Mobile Menu Button */}
      <Button className="md:hidden" onClick={toggleMenu}>
        <FontAwesomeIcon size="xl" className="text-textPrimary" icon={faBars} />
      </Button>

      {/* Menu */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex md:flex-row flex-col-reverse items-center justify-between gap-x-8 gap-y-2 absolute md:static top-0 left-0 w-full md:w-auto bg-background md:bg-transparent shadow-md md:shadow-none p-3 md:p-0 z-10`}
      >
        <Button
          className="block md:hidden absolute right-0 top-2"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon
            size="xl"
            className="text-textPrimary"
            icon={faClose}
          />
        </Button>
        {/* Search */}
        <div className="search rounded-full py-1 px-3 border border-border flex items-center gap-x-2 w-[3/4] md:w-auto">
          <Input
            className="rounded-full font-poppins flex-1"
            onChange={handleSearch} // Update query on change
            placeholder="Search..."
          />
          <FontAwesomeIcon
            className="text-textPrimary"
            icon={faMagnifyingGlass}
          />
        </div>

        <div className="flex items-center justify-between gap-x-5">
          {/* Add New Role Button */}
          <Button
            onClick={openForm}
            className="bg-primary font-poppins text-card md:py-1 px-4 rounded-full"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Role
          </Button>

          {/* User Avatar */}
          <Button className="relative" onClick={handleAvatarBio}>
            <UserAvatar size="xl" />
          </Button>
          {avatarBio && (
            <div className="w-fit p-1 rounded-md flex flex-col items-center gap-y-2 absolute top-14 md:right-1 right-16 border border-primary bg-card">
              <p>You</p>
              <hr className="bg-background h-[2px] w-full" />
              <Button className="bg-error text-card">Logout</Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Role Form */}
      {showForm && <Form closeFormWindow={closeForm} mode="add" />}
    </nav>
  );
}

export default Nav;
