import { useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { fetchCountries } from "../api/countries";

export default function CountrySelector({ onSelect }) {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch countries
  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .finally(() => setLoading(false));
  }, []);


  // re-format countries
  const filteredCountries =
    query === "" ? countries : countries.filter((country) => country.country.toLowerCase().includes(query.toLowerCase()) );

  // handle country selection
  const handleSelect = (country) => {
    setSelected(country);
    if (country && onSelect) { onSelect(country.code); }
  };

  return (
    <div className="w-full">
      {/* combobox */}
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-75 sm:text-sm">
            {/* input */}
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none placeholder-gray-500"
              placeholder={loading ? "Loading countries..." : "Search for a country..."}
              displayValue={(country) => country?.country || ""}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition as="div" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")} >
            {/* output */}
            <Combobox.Options className="absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-gray-200 focus:outline-none z-50">
              {loading ? (
                <div className="relative cursor-default select-none py-2 px-3 text-gray-600 text-sm">
                  Loading countries...
                </div>
              ) : filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-3 text-gray-600 text-sm">
                  No countries found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <Combobox.Option
                    key={country.code}
                    className={({ active }) => `relative cursor-default select-none py-2 pl-3 pr-9 ${ active ? "bg-gray-100 text-gray-900" : "text-gray-700" }` } value={country} >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${ selected ? "font-medium" : "font-normal" }`} >
                          {country.country} ({country.code})
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 right-0 flex items-center pr-3 ${ active ? "text-gray-700" : "text-gray-500" }`} >
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}