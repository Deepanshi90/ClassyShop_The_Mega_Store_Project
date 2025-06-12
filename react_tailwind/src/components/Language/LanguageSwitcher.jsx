import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};

export default LanguageSwitcher;
