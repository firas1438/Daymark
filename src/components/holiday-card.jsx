import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, CalendarIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function HolidayCard({ holiday }) {

  return (
    <Disclosure as="div" className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow duration-200">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-[#59A845] focus-visible:ring-opacity-50 rounded-lg">
            {/* card */}
            <div className="flex flex-col items-start">
              {/* holiday name */}
              <span className="font-semibold text-gray-800">{holiday.name}</span>
              {/* holiday local name */}
              {holiday.localName && holiday.localName !== holiday.name && (
                <span className="text-xs text-gray-500 mt-1">{holiday.localName}</span>
              )}
            </div>
            {/* date */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-center bg-[#FFF1D9] text-amber-800 px-2 py-1 rounded-full">
                {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} >
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </motion.div>
            </div>
          </Disclosure.Button>

          <AnimatePresence initial={false}>
            {/* complementary info */}
            {open && (
              <Disclosure.Panel
                static as={motion.div} initial="collapsed" animate="open" exit="collapsed" className="overflow-hidden"
                variants={{ open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }, collapsed: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } } }}
              >
                <div className="px-4 pb-3 pt-1 text-sm text-gray-500 border-t border-gray-100">
                  <div className="space-y-2 mt-2">
                    {/* holiday full date */}
                    <div className="flex items-center text-xs text-gray-600">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      <span>{new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    {/* holiday local name */}
                    {holiday.localName && holiday.localName !== holiday.name && (
                      <div className="flex items-center text-xs text-gray-600">
                        <GlobeAltIcon className="h-3 w-3 mr-1" />
                        <span>Local name: {holiday.localName}</span>
                      </div>
                    )}
                    {/* holiday type */}
                    {holiday.types && holiday.types.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {holiday.types.map((type, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}