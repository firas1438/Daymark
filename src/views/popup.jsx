// ./src/views/popup.jsx
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Layout from "../components/layout";
import CountrySelector from "../components/country-selector";
import HolidayCard from "../components/holiday-card";
import { fetchHolidays } from "../api/holidays";

export default function Popup() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPastHolidays, setShowPastHolidays] = useState(false);

  // fetch holiday list
  async function handleCountrySelect(code) {
    setLoading(true);
    setSelectedCountry(code);
    try {
      const data = await fetchHolidays(code);
      setHolidays(data);
    } catch (error) {
      console.error("Failed to fetch holidays:", error);
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  }

  // re-format holiday names
  const filterHolidays = (holidays) => {
    const now = new Date();
    return holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return showPastHolidays ? true : holidayDate >= now;
    });
  };

  // sort holidays by date
  const sortedHolidays = filterHolidays(holidays).sort((a, b) => new Date(a.date) - new Date(b.date) );

  // upcoming holidays
  const upcomingCount = holidays.filter(h => new Date(h.date) >= new Date()).length;

  // total holidays of the year
  const totalCount = holidays.length;

  return (
    <Layout>
      <div className="space-y-4">
        {/* select country combobox */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2"> Select Country </label>
          <CountrySelector onSelect={handleCountrySelect} />
        </div>
        {/* display past holidays */}
        {selectedCountry && (
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <div>
              <span className="text-sm font-medium text-gray-700"> Show past holidays </span>
              <p className="text-xs font-medium text-[#59A845]"> {upcomingCount} upcoming • {totalCount} total </p>
            </div>
            <Switch
              checked={showPastHolidays} onChange={setShowPastHolidays}
              className={`${ showPastHolidays ? 'bg-[#59A845]' : 'bg-gray-200' } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#59A845] focus:ring-offset-2`}
            >
              <span className={`${ showPastHolidays ? 'translate-x-6' : 'translate-x-1' } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </Switch>
          </div>
        )}

        {/* loading */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59A845]"/>
          </div>
        )}

        {/* holiday list */}
        {!loading && selectedCountry && (
          <div>
            {/* header */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900"> Holidays </h2>
              {/* total holidays */}
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full"> {sortedHolidays.length} </span>
            </div>
            {/* holidays */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {sortedHolidays.length > 0 ? (
                sortedHolidays.map((holiday) => (
                  <HolidayCard key={`${holiday.date}-${holiday.name}`} holiday={holiday} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-700">
                  <p className="text-xs mt-1">No holidays found!<br/>Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* initial popup */}
        {!loading && !selectedCountry && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-3">
            <img src="./images/countries.png" className="mx-auto w-14 h-12" alt="Globe icon" />
          </div>
          <p className="text-sm font-medium text-gray-800">Select a country to view holidays</p>
          <p className="text-xs mt-1 text-gray-700">Choose from 200+ countries worldwide</p>
        </div>
        )}
      </div>
    </Layout>
  );
}