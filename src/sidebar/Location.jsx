import React from 'react';
import InputField from '../components/InputField';
import { MapPin } from 'lucide-react';

const Location = ({ handleChange }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-400" />
        Location
      </h4>

      <div className="space-y-1 pl-1">
        <InputField handleChange={handleChange} value="" title="All Locations" name="location" />
        <InputField handleChange={handleChange} value="london" title="London" name="location" />
        <InputField handleChange={handleChange} value="seattle" title="Seattle" name="location" />
        <InputField handleChange={handleChange} value="madrid" title="Madrid" name="location" />
        <InputField handleChange={handleChange} value="boston" title="Boston" name="location" />
        <InputField handleChange={handleChange} value="new york" title="New York" name="location" />
      </div>
    </div>
  );
};

export default Location;
