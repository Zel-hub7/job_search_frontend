"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { GrSearch } from "react-icons/gr";

const API_URL = "https://dev-be-cochrane-sinclair.rallythelocals.com/api/team";
const LOCATION_API_URL =
  "https://dev-be-cochrane-sinclair.rallythelocals.com/api/location";
const IMAGE_BASE_URL = "";

// Updated slugify function to remove periods and unwanted characters.
function slugify(first: string, last: string): string {
  const processedFirst = first
    .trim()
    .toLowerCase()
    .replace(/\./g, "")          // Remove periods
    .replace(/[^\w\s-]/g, "")     // Remove any remaining punctuation except word characters, whitespace, or dashes
    .replace(/\s+/g, "-");        // Replace spaces with dashes.
  const processedLast = last
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  return `${processedFirst}-${processedLast}`;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  location?: string;
  image: string;
  bio: string;
  category: string;
  practiceAreas: string[]; // Array of practice area names
  // Added fields for sorting functionality
  first_name?: string;
  last_name?: string;
  sequence?: number | null;
}

interface FilterGroup {
  label: string;
  items: string[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  collapsible: boolean;
  isOpen: boolean;
  toggle: () => void;
}

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [locationsMap, setLocationsMap] = useState<{ [key: string]: string }>(
    {},
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state now as arrays for multi-select
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string[]>(
    [],
  );
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // For collapsing each filter group independently
  const [isPracticeAreaOpen, setIsPracticeAreaOpen] = useState(true);
  const [isPositionOpen, setIsPositionOpen] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(true);

  // Fetch locations first
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(LOCATION_API_URL);
        const result = await response.json();

        if (result.success) {
          // Create a mapping of location_id -> location_name
          const locationMap = result.data.reduce(
            (acc: { [key: string]: string }, location: any) => {
              acc[location.id] = location.name;
              return acc;
            },
            {},
          );
          setLocationsMap(locationMap);
        } else {
          throw new Error("Failed to fetch locations");
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    }
    fetchLocations();
  }, []);

  // Fetch team members once locationsMap is available
  useEffect(() => {
    async function fetchTeam() {
      try {
        if (Object.keys(locationsMap).length === 0) return; // Ensure locations are loaded

        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
          const practiceAreaSet = new Set<string>();

          const fetchedMembers: TeamMember[] = result.data.flatMap(
            (category: any) =>
              category.team.flatMap((member: any) => {
                if (member.end_date && new Date(member.end_date) < new Date()) {
                  return [];
                }

                const memberPracticeAreas = member.practice_areas.map(
                  (area: any) => {
                    practiceAreaSet.add(area.name);
                    return area.name;
                  },
                );

                return [{
                  id: member.id,
                  name: `${member.last_name}, ${member.first_name}`,
                  position: member.title ? member.title.name : "Team Member",
                  location:
                    locationsMap[member.location_id] || "Unknown Location",
                  image: `${IMAGE_BASE_URL}${member.image.replace(/^team\//, "")}`,
                  bio: member.bio,
                  category: category.name,
                  practiceAreas: memberPracticeAreas,
                  first_name: member.first_name,
                  last_name: member.last_name,
                  sequence: member.sequence,
                }];
              }),
          );

          const membersWithSequence = fetchedMembers.filter(
            (m) => m.sequence !== null && m.sequence !== undefined,
          );
          const membersWithoutSequence = fetchedMembers.filter(
            (m) => m.sequence === null || m.sequence === undefined,
          );

          membersWithSequence.sort(
            (a, b) => (a.sequence as number) - (b.sequence as number),
          );
          membersWithoutSequence.sort((a, b) => {
            const nameA = (a.last_name || a.name).toLowerCase();
            const nameB = (b.last_name || b.name).toLowerCase();
            return nameA.localeCompare(nameB);
          });

          const sortedMembers = [
            ...membersWithSequence,
            ...membersWithoutSequence,
          ];

          setTeamMembers(sortedMembers);
          setFilteredMembers(sortedMembers);
          setPracticeAreas(Array.from(practiceAreaSet));
          setPositions(
            Array.from(new Set(sortedMembers.map((m) => m.position))),
          );
          setLocations(
            Array.from(new Set(sortedMembers.map((m) => m.location || ""))).filter(Boolean),
          );
        } else {
          throw new Error("Failed to fetch team members");
        }
      } catch (err) {
        setError("Could not load team members. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [locationsMap]);

  // Filtering logic using multi-select filtering for each category.
  useEffect(() => {
    let results = teamMembers.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (selectedPracticeArea.length > 0) {
      results = results.filter((member) =>
        selectedPracticeArea.some((area) =>
          member.practiceAreas.includes(area),
        ),
      );
    }

    if (selectedPosition.length > 0) {
      results = results.filter((member) =>
        selectedPosition.includes(member.position),
      );
    }

    if (selectedLocations.length > 0) {
      results = results.filter(
        (member) =>
          member.location !== undefined &&
          selectedLocations.includes(member.location),
      );
    }

    setFilteredMembers(results);
  }, [
    searchQuery,
    selectedPracticeArea,
    selectedPosition,
    selectedLocations,
    teamMembers,
  ]);

  const filterGroups: FilterGroup[] = [
    {
      label: "Practice Area",
      items: practiceAreas,
      selected: selectedPracticeArea,
      onChange: setSelectedPracticeArea,
      collapsible: true,
      isOpen: isPracticeAreaOpen,
      toggle: () => setIsPracticeAreaOpen((prev) => !prev),
    },
    {
      label: "Position",
      items: positions,
      selected: selectedPosition,
      onChange: setSelectedPosition,
      collapsible: true,
      isOpen: isPositionOpen,
      toggle: () => setIsPositionOpen((prev) => !prev),
    },
    {
      label: "Location",
      items: locations,
      selected: selectedLocations,
      onChange: setSelectedLocations,
      collapsible: true,
      isOpen: isLocationOpen,
      toggle: () => setIsLocationOpen((prev) => !prev),
    },
  ];

  if (loading)
    return (
      <div className="max-w-8xl mx-auto mt-10 p-8 py-20">
        <div className="animate-pulse">
          {/* Skeleton UI */}
          <div className="mb-4 h-6 w-24 rounded bg-gray-300"></div>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="mt-4 space-y-4 md:w-2/3">
              <div className="h-10 w-3/4 rounded bg-gray-300"></div>
              <div className="h-6 w-1/2 rounded bg-gray-300"></div>
              <div className="h-6 w-1/3 rounded bg-gray-300"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 rounded bg-gray-300"></div>
                <div className="h-6 w-20 rounded bg-gray-300"></div>
                <div className="h-6 w-12 rounded bg-gray-300"></div>
              </div>
              <div className="h-32 w-full rounded bg-gray-300"></div>
              <div className="h-24 w-full rounded bg-gray-300"></div>
            </div>
            <div className="flex max-w-[300px] flex-col items-center space-y-4 md:w-1/3">
              <div className="h-[400px] w-full rounded bg-gray-300"></div>
              <div className="w-full space-y-2">
                <div className="h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-full rounded bg-gray-300"></div>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-[400px] overflow-hidden rounded-lg bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <div className="mt-10 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-8xl mx-auto mt-20 px-6 py-5 lg:px-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        {/* Sidebar Filters */}
        <div className="w-full space-y-6 md:w-1/4">
          <h4 className="text-md mb-2 font-NeueHaasUnica font-semibold text-[#36454F]">
            Filter by:
          </h4>
          {filterGroups.map((group, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-[#F2EFEB] p-4 shadow-sm"
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={group.collapsible ? group.toggle : undefined}
              >
                <h3 className="text-[#191919] font-NeueHaasUnica text-lg">
                  {group.label}
                </h3>
                {group.collapsible && (
                  <span
                    className={`transition-transform duration-300 ${
                      group.isOpen ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <MdKeyboardArrowUp className="text-2xl" />
                  </span>
                )}
              </div>
              <AnimatePresence>
                {group.isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 mt-2 border-b border-gray-300"></div>
                    <motion.ul className="no-scrollbar mt-2 space-y-5">
                      {group.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center space-x-3 pl-2 font-NeueHaasUnica text-[#36454F]"
                        >
                          <div className="relative flex-shrink-0">
                            <input
                              id={`checkbox-${group.label}-${idx}`}
                              type="checkbox"
                              name={`${group.label}-${item}`}
                              className="h-4 w-4 cursor-pointer appearance-none rounded-sm border border-black bg-white checked:border-transparent checked:bg-red-600"
                              checked={group.selected.includes(item)}
                              onChange={() => {
                                if (group.selected.includes(item)) {
                                  group.onChange(
                                    group.selected.filter(
                                      (i: string) => i !== item,
                                    ),
                                  );
                                } else {
                                  group.onChange([...group.selected, item]);
                                }
                              }}
                            />
                          </div>
                          <label
                            htmlFor={`checkbox-${group.label}-${idx}`}
                            className="cursor-pointer text-[#36454F]"
                          >
                            {item}
                          </label>
                        </li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-6">
            <img
              src="/images/team/search.svg"
              alt="Search Icon"
              className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search by name"
              className="w-full rounded-xl border-2 border-[#A3A3A3] py-2 pl-12 pr-4 focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                className="group relative flex flex-col items-center rounded-xl transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Profile Image */}
                <div className="relative w-full overflow-hidden rounded-t-lg pt-[120%]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority
                    className="rounded-2xl object-cover object-top"
                  />
                </div>

                {/* Name & Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full space-y-2 rounded-b-2xl bg-black bg-opacity-10 p-4 text-[#FCFBFA]">
                  <h4 className="font-TWKEverett text-[18px] font-bold text-[#FCFBFA] custom:text-[20px]">
                    {member.name}
                  </h4>
                  <div className="space-y-1">
                    <p className="text-[14px] custom:text-[16px]">
                      {member.position}
                    </p>
                    <p className="text-[14px] custom:text-[16px]">
                      {member.location}
                    </p>
                  </div>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-2 left-1/2 mx-auto hidden max-h-[200px] w-[90%] -translate-x-1/2 transform rounded-lg bg-black px-3  shadow-lg transition-all duration-300 group-hover:block group-hover:opacity-100">
                  <div className="flex h-32 flex-col">
                    <h5 className="text-left mt-3 text-[#FCFBFA] font-TWKEverett text-[18px] font-bold">
                      {member.name}
                    </h5>
                    {/* For smaller screens */}
                    <p className="block text-left mt-3 text-[#D1D1D1] font-NeueHaasUnica text-[14px] custom:hidden">
                      {member.bio ? (
                        member.bio.length > 60 ? (
                          <>
                            {member.bio.slice(0, 60)}
                            <Link
                              href={`/team/${slugify(
                                member.first_name || "",
                                member.last_name || "",
                              )}`}
                            >
                              <span className="font-TWKEverett font-bold underline pl-1">
                                Read more...
                              </span>
                            </Link>
                          </>
                        ) : (
                          member.bio
                        )
                      ) : (
                        "No bio available"
                      )}
                    </p>
                    {/* For larger screens */}
                    <p className="hidden text-left mt-3 text-[#D1D1D1] font-NeueHaasUnica text-[14px] custom:block">
                      {member.bio ? (
                        member.bio.length > 90 ? (
                          <>
                            {member.bio.slice(0, 90)}
                            <Link
                              href={`/team/${slugify(
                                member.first_name || "",
                                member.last_name || "",
                              )}`}
                            >
                              <span className="font-bold underline pl-1">
                                Read more...
                              </span>
                            </Link>
                          </>
                        ) : (
                          member.bio
                        )
                      ) : (
                        "No bio available"
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
