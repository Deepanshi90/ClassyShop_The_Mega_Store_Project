import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
 
const CategoryCollapse = () => {
  // Multiple independent states for each Fashion section
  const [submenu, setSubmenu] = useState([false, false]);
  const [innerSubmenu, setInnerSubmenu] = useState([false, false]);

  const toggleSubmenu = (index) => {
    const updated = [...submenu];
    updated[index] = !updated[index];
    setSubmenu(updated);
  };

  const toggleInnerSubmenu = (index) => {
    const updated = [...innerSubmenu];
    updated[index] = !updated[index];
    setInnerSubmenu(updated);
  };

  // You can duplicate this as many times as needed
  const fashionCategories = ['Fashion 1', 'Fashion 2'];

  return (
    <div className="scroll">
      <ul className="w-full">
        {fashionCategories.map((category, i) => (
          <li key={i} className="list-none relative mb-3">
            <div className="flex items-center justify-between pr-3">
              <Link to="/" className="w-full">
                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                  {category}
                </Button>
              </Link>
              {submenu[i] ? (
                <FiMinusSquare
                  className="cursor-pointer"
                  onClick={() => toggleSubmenu(i)}
                />
              ) : (
                <FaRegSquarePlus
                  className="cursor-pointer"
                  onClick={() => toggleSubmenu(i)}
                />
              )}
            </div>

            {submenu[i] && (
              <ul className="submenu pl-6 pt-2 bg-white">
                <li className="list-none relative">
                  <div className="flex items-center justify-between pr-3">
                    <Link to="/" className="w-full">
                      <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                        Apparel
                      </Button>
                    </Link>
                    {innerSubmenu[i] ? (
                      <FiMinusSquare
                        className="cursor-pointer"
                        onClick={() => toggleInnerSubmenu(i)}
                      />
                    ) : (
                      <FaRegSquarePlus
                        className="cursor-pointer"
                        onClick={() => toggleInnerSubmenu(i)}
                      />
                    )}
                  </div>

                  {innerSubmenu[i] && (
                    <ul className="inner_submenu pl-6 pt-2">
                      <li className="mb-1">
                        <Link to="/" className="text-[14px] block link">Smart Tablet</Link>
                      </li>
                      <li className="mb-1">
                        <Link to="/" className="text-[14px] block link">Crepe T-Shirt</Link>
                      </li>
                      <li className="mb-1">
                        <Link to="/" className="text-[14px] block link">Leather Watch</Link>
                      </li>
                      <li className="mb-1">
                        <Link to="/" className="text-[14px] block link">Rolling Diamond</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCollapse;