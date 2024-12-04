import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import UserAvatar from "./UserAvatar";
import Button from "./Button";

function Nav() {
  return (
    <nav className="bg-background flex items-center justify-between p-4">
      <div className="logo">
        <img className="size-12 rounded-full" src="./logo.png" alt="logo" />
      </div>
      <div className="md:hidden"><FontAwesomeIcon size="xl" className="text-textPrimary" icon={faBars} /></div>
      <div className="md:flex items-center justify-between gap-x-8 hidden ">
        <div className="search rounded-full py-1 px-3 border border-border flex justify-between items-center gap-x-10">
          <Input placeHolder="Search..." className="rounded-full font-poppins" />
          <FontAwesomeIcon className="text-textPrimary" icon={faMagnifyingGlass} />
        </div>
        <Button className="bg-primary font-poppins text-card"><FontAwesomeIcon icon={faPlus} className="text-card" /> Add New Role</Button>
        <UserAvatar size="2xl" />
      </div>
    </nav>
  );
}

export default Nav;
