"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineArrowBackIos } from "react-icons/md";

import useTeam from "@/hooks/useTeam";
import DynamicShapes from "@/components/RotationAnimation";

export default function TeamMemberDetail() {
  const router = useRouter();
  const params = useParams();

  // Narrow down params.id to a string
  const memberId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  // Optionally, handle if memberId is an empty string
  if (!memberId) {
    return <div className="mt-10 text-center">No member id provided.</div>;
  }

  // Use our custom hook to fetch team data and mappings
  const { member, team, titleMapping, locationMap, loading, error } =
    useTeam(memberId);

  // Local state for location name (for detail member)
  const [locationName, setLocationName] = useState<string>("");

  // State to toggle display of paralegals in mobile view
  const [showParalegals, setShowParalegals] = useState(false);

  // State to track if we are on a mobile view
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set up a listener to determine if the screen is mobile (<768px)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check initial width

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch location name for the detail member based on member.location_id
  useEffect(() => {
    async function fetchLocationName() {
      if (member && member.location_id) {
        try {
          const response = await fetch(
            "https://dev-be-cochrane-sinclair.rallythelocals.com/api/location",
          );
          const result = await response.json();

          if (result.success) {
            const foundLocation = result.data.find(
              (loc: any) => String(loc.id) === member.location_id,
            );

            if (foundLocation) {
              setLocationName(foundLocation.name);
            }
          }
        } catch (error) {
          console.error("Error fetching location name", error);
        }
      }
    }

    fetchLocationName();
  }, [member]);

  // Skeleton Loading UI
  if (loading)
    return (
      <div className="mx-auto mt-10 max-w-7xl p-8 py-20">
        <div className="animate-pulse">
          {/* Back Button Skeleton */}
          <div className="mb-4 h-6 w-24 rounded bg-gray-300"></div>

          <div className="flex flex-col gap-6 md:flex-row">
            {/* Left Column Skeleton */}
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

            {/* Right Column Skeleton */}
            <div className="flex max-w-[300px] flex-col items-center space-y-4 md:w-1/3">
              <div className="h-[400px] w-full rounded bg-gray-300"></div>
              <div className="w-full space-y-2">
                <div className="h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-full rounded bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Team Grid Skeleton */}
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

  if (error)
    return <div className="mt-10 text-center text-red-500">{error}</div>;

  if (!member)
    return <div className="mt-10 text-center">No member data available.</div>;

  return (
    <div className="mx-auto mt-10 max-w-7xl p-8 py-20">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center font-NeueHaasUnica text-[24px] font-medium leading-[25px] text-[#191919] hover:text-[rgba(25,25,25,1)]"
      >
        <MdOutlineArrowBackIos className="mr-2 h-4 w-4" />
        Back
      </button>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Left Column: Details */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="order-2 mt-4 md:order-1 md:w-2/3"
        >
          <h1 className="mb-2 font-TWKEverett text-3xl font-bold text-[#191919]">
            {member.name}
          </h1>

          <p className="mb-1 font-TWKEverett text-lg font-semibold text-[#474747]">
            {member.title.name}
          </p>

          <p className="mb-4 font-TWKEverett font-semibold text-[#474747]">
            {locationName || "N/A"}
          </p>

          {/* Practice Areas Tags */}
          <div className="flex flex-wrap gap-2 py-5">
            {member.practice_areas &&
              member.practice_areas.map((pa, index) => (
                <span
                  key={index}
                  className="rounded-md bg-[#F5F3F0] px-3 py-2 font-NeueHaasUnica text-sm font-medium text-[#474747]"
                >
                  {pa.name}
                </span>
              ))}
          </div>

          {/* Bio */}
          <div className="mt-5">
            <p className="whitespace-pre-line font-NeueHaasUnica text-[18px] leading-relaxed text-[#474747]">
              {member.bio}
            </p>
          </div>

          {/* Education */}
          {member.education &&
            member.education.filter((edu) => edu.trim() !== "").length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 flex items-center gap-3 font-TWKEverett text-2xl text-[30px] font-semibold text-[#474747]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-2 shadow-md">
                    <Image
                      src="/images/educ.svg"
                      alt="Education Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  Education
                </h2>
                <ul className="mt-6 pl-2 font-NeueHaasUnica text-[rgba(71,71,71,1)]">
                  {member.education
                    .filter((edu) => edu.trim() !== "")
                    .map((edu, index) => (
                      <li
                        key={index}
                        className="mb-4 flex items-center gap-4 text-[20px]"
                      >
                        <Image
                          src="/images/icons/vvector.svg"
                          alt="Bullet Point"
                          width={22}
                          height={22}
                        />
                        {edu}
                      </li>
                    ))}
                </ul>
              </div>
            )}

          {/* Leadership, Membership, and Achievements */}
          {member.achievement &&
            member.achievement.filter((ach) => ach.trim() !== "").length >
              0 && (
              <div className="mt-6">
                <h2 className="mb-4 flex items-center gap-3 font-TWKEverett text-2xl text-[30px] font-semibold text-[#474747]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                    <Image
                      src="/images/ma.svg"
                      alt="Achievements Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  Leadership, Membership, and Achievements
                </h2>
                <ul className="mt-6 pl-2 text-gray-800">
                  {member.achievement
                    .filter((ach) => ach.trim() !== "")
                    .map((ach, index) => (
                      <li
                        key={index}
                        className="mb-4 flex items-center gap-4 font-NeueHaasUnica text-[20px]"
                      >
                        <Image
                          src="/images/icons/vvector.svg"
                          alt="Bullet Point"
                          width={22}
                          height={22}
                        />
                        {ach}
                      </li>
                    ))}
                </ul>
              </div>
            )}
        </motion.div>

        {/* Right Column: Profile Image & Contact and Paralegals (stacked vertically) */}
        <div className="order-1 flex max-w-[400px] flex-col items-start rounded-lg md:order-2 md:w-1/3 md:max-w-[400px]">
          {/* Profile Image & Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full"
          >
            {/* On mobile, the container is full width; on desktop, we fix the width */}
            <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-t-lg">
              <Image
                src={member.image}
                alt={member.name}
                priority
                width={300}
                height={400}
                className="h-full w-full rounded-2xl object-cover object-top"
              />
            </div>

            {/* Contact Info */}
            <div className="mt-6 w-full space-y-5 text-center text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-2 shadow-md md:h-8 md:w-8">
                  <Image
                    src="/images/icons/mdi_email.svg"
                    alt="Email Icon"
                    width={30}
                    height={30}
                    className="h-6 w-6 object-contain md:h-6 md:w-6"
                  />
                </div>
                <a
                  href={`mailto:${member.email}`}
                  className="text-[18px] text-[#474747] underline underline-offset-4 hover:underline md:text-[20px]"
                >
                  {member.email}
                </a>
              </div>

              {member.phone && (
                <div className="mt-4 w-full space-y-2 text-center text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-2 shadow-md md:h-8 md:w-8">
                      <Image
                        src="/images/icons/phone2.svg"
                        alt="Phone Icon"
                        width={30}
                        height={30}
                        className="h-7 w-7 object-contain md:h-6 md:w-6"
                      />
                    </div>
                    <a
                      href={`tel:${member.phone}`}
                      className="text-[18px] text-[#474747] hover:underline md:text-[20px]"
                    >
                      {member.phone}
                    </a>
                  </div>
                </div>
              )}

              {member.location_id && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-2 shadow-md md:h-8 md:w-8">
                    <Image
                      src="/images/icons/location.svg"
                      alt="Location Icon"
                      width={30}
                      height={30}
                      className="h-7 w-7 object-contain md:h-6 md:w-6"
                    />
                  </div>
                  <p className="text-[#474747] text-[18x] md:text-[20px]">
                    {locationMap[member.location_id] || "N/A"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Paralegals Section */}
          {member.paralegals && member.paralegals.length > 0 && (
            <div className="mt-6 w-full">
              {isMobile ? (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="py-4"
                >
                  <button
                    onClick={() => setShowParalegals(!showParalegals)}
                    className="mb-4 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    {showParalegals ? "Hide Paralegals" : "View Paralegals"}
                  </button>

                  {showParalegals && (
                    <div className="flex flex-wrap gap-4">
                      {member.paralegals.map((para) => (
                        <div key={para.id} className="flex items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden bg-gray-100">
                            <Image
                              src={para.image}
                              alt={para.name}
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-xl object-top"
                            />
                          </div>
                          <div className="flex h-20 flex-col">
                            <p className="font-semibold text-[rgba(25,25,25,1)]">
                              {para.name}
                            </p>
                            <p className="text-sm text-[rgba(71,71,71,1)]">
                              {titleMapping[para.title_id] || ""}
                            </p>
                            <p className="mt-3 text-sm text-[rgba(71,71,71,1)] underline">
                              {para.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                // Desktop: Always show paralegals
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="py-4"
                >
                  <h3 className="mb-5 font-TWKEverett text-[24px] font-semibold text-[#191919]">
                    Paralegals
                  </h3>
                  <div className="ml-2 flex flex-col gap-4 p-2">
                    {member.paralegals.map((para) => (
                      <div key={para.id} className="flex items-center gap-4">
                        <div className="relative h-24 w-24 overflow-hidden">
                          <Image
                            src={para.image}
                            alt={para.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-xl object-top"
                          />
                        </div>
                        {/* Set the height to match the image and use justify-between */}
                        <div className="flex h-20 flex-col justify-between">
                          {/* This container holds the name and position at the top */}
                          <div>
                            <p className="font-NeueHaasUnica text-[18px] font-medium text-[#191919]">
                              {para.name}
                            </p>
                            <p className="text-[16px] text-sm text-[#474747]">
                              {titleMapping[para.title_id] || ""}
                            </p>
                          </div>
                          {/* Email will align at the bottom */}
                          <p className="text-[16px] text-[#191919] underline">
                            {para.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Rotation Animation in place of the decorative banner */}
      <div className="">
        <DynamicShapes />
      </div>

      <div className="mt-10 flex flex-col items-start justify-between md:mt-40 md:flex-row">
        {/* Left Side */}
        <div>
          <h2 className="font-TWKEverett text-2xl font-bold text-[rgba(25,25,25,1)] md:text-4xl">
            Our Dedicated Team
          </h2>
        </div>

        {/* Right Side */}
        <div className="max-w-lg sm:w-full md:text-right">
          <p className="font-NeueHaasUnica text-[20px] text-[rgba(71,71,71,1)]">
            At Cochrane Sinclair LLP, our dedicated team of legal professionals
            is committed to advancing justice and reconciliation.
          </p>
          <a
            href="/team"
            className="inline-block py-10 font-medium text-[rgba(25,25,25,1)] underline underline-offset-2"
          >
            Meet All Team Members
          </a>
        </div>
      </div>

      {/* Team Grid with new Framer Motion animation */}
      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {team.map((tm) => (
          <Link
            key={tm.id}
            href={`/team/${tm.id}`}
            className="group relative overflow-hidden rounded-xl bg-white shadow-md"
          >
            {/* Image Container */}
            <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-t-lg">
              <Image
                src={tm.image}
                alt={tm.name}
                priority
                width={300}
                height={320}
                className="h-full w-full rounded-2xl object-cover object-top"
              />
            </div>

            {/* Always Visible Overlay */}
            <div className="absolute bottom-2 left-0 w-full space-y-2 rounded-b-2xl bg-black bg-opacity-5 p-2 text-white">
              <h4 className="text-lg font-bold">{tm.name}</h4>
              <div className="space-y-1">
                <p className="text-sm">{tm.title.name}</p>
                <p className="text-sm">
                  {tm.location_id
                    ? locationMap[tm.location_id] || "N/A"
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Additional Hover Overlay */}
            <div className="absolute bottom-3 left-1/2 mx-auto hidden w-[90%] -translate-x-1/2 transform rounded-lg bg-black p-3 text-white shadow-lg transition-all duration-300 group-hover:block group-hover:opacity-100">
              <div className="flex h-32 flex-col">
                {/* Name aligned to the top */}
                <h5 className="text-left font-TWKEverett text-[25px] font-bold">
                  {tm.name}
                </h5>

                {/* Truncated Bio */}
                <p className="my-auto text-left font-NeueHaasUnica text-[14px]">
                  {tm.bio
                    ? tm.bio.length > 85
                      ? tm.bio.slice(0, 85) + "..."
                      : tm.bio
                    : "No bio available"}
                </p>

                {/* Spacer at the bottom */}
                <div className="h-2"></div>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
