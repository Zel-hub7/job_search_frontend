"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MapComponent from "@/components/MapComponent";

interface DetailedImage {
  id: number;
  location_id: number;
  image: string;
  alt_text: string | null;
  is_cover: boolean;
  created_at: string;
  updated_at: string;
}

interface DesktopDetailsProps {
  selectedLocation: number | null;
  locations: {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    lat: number | null;
    lng: number | null;
    created_at: string;
    updated_at: string;
    description: string | null;
    image: string; // fallback/cover image (always a valid URL)
    fax: string | null;
    phone: string | null;
    opening_hours: string | null;
    note: string | null;
    images?: DetailedImage[]; // additional detailed images
  }[];
  desktopDetailRef: React.RefObject<HTMLDivElement>;
  closeDetailAndScroll: () => void;
}

export default function DesktopDetails({
  selectedLocation,
  locations,
  desktopDetailRef,
  closeDetailAndScroll,
}: DesktopDetailsProps) {
  if (selectedLocation === null) return null;

  const selected = locations.find((loc) => loc.id === selectedLocation);
  if (!selected) return null;

  // For the map, use lat/lng if available; otherwise default to 0.
  const center = {
    lat: selected.lat ?? 0,
    lng: selected.lng ?? 0,
  };

  // Ensure opening_hours is a string (fallback to empty string if null)
  const openingHours = selected.opening_hours ?? "";
  const openingHoursParts = openingHours.split(/\r\n/);

  return (
    <div className="hidden md:col-span-2 md:block" ref={desktopDetailRef}>
      <motion.div
        initial={{ opacity: 0.6, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        viewport={{ once: false }}
        className="mt-6 flex w-full flex-col gap-7 border-b border-t border-[rgba(232,232,232,1)] py-8"
      >
        <motion.div
          className="flex flex-col gap-10 md:flex-row"
          initial={{ opacity: 0.6, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Map Section */}
          <div className="md:w-1/2">
            {selected.lat !== null && selected.lng !== null ? (
              <MapComponent lat={selected.lat} lng={selected.lng} />
            ) : (
              <p>Map data unavailable</p>
            )}
          </div>

          {/* Text Section */}
          <div className="flex flex-col md:w-1/2">
            <div className="flex items-start justify-between">
              <motion.h2
                className="font-TWKEverett text-3xl font-bold leading-[1.4] tracking-normal text-black"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
              >
                {selected.name}
              </motion.h2>
              <motion.button
                className="text-xl text-gray-500 hover:text-black"
                onClick={closeDetailAndScroll}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
              >
                ✕
              </motion.button>
            </div>

            {selected.address && (
              <motion.div
                className="mt-2 flex flex-col gap-1 text-lg text-gray-600"
                initial={{ opacity: 0.6, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
              >
                {selected.address.split(", ").map((line, i) => (
                  <p
                    key={i}
                    className="font-NeueHaasUnica text-[18px] font-[400] leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]"
                  >
                    {line}
                  </p>
                ))}

                {selected.city.split(", ").map((cityLine, i) => {
                  const provinceParts = selected.province.split(", ");
                  const provinceLine = provinceParts[i] || "";
                  return (
                    <p
                      key={i}
                      className="font-NeueHaasUnica text-[18px] font-[400] leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]"
                    >
                      {cityLine}
                      {provinceLine && `, ${provinceLine}`}
                    </p>
                  );
                })}

                {selected.postal_code.split(", ").map((line, i) => (
                  <p
                    key={i}
                    className="font-NeueHaasUnica text-[18px] font-[400] leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]"
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            )}

            <motion.a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}&travelmode=driving&zoom=20&maptype=satellite`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 cursor-pointer font-NeueHaasUnica text-[18px] font-medium leading-[25.2px] tracking-normal text-[rgba(25,25,25,1)] underline hover:text-red-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
            >
              Get Directions
            </motion.a>

            <motion.div
              className="mt-7 grid grid-cols-2 gap-2 py-5 text-lg text-gray-700"
              initial={{ opacity: 0.6, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
            >
              {selected.phone && (
                <p className="font-NeueHaasUnica text-[18px] font-normal leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]">
                  <span>Phone: </span>
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-[rgba(71,71,71,1)]"
                  >
                    {selected.phone}
                  </a>
                </p>
              )}

              {openingHoursParts[0] && (
                <p className="font-NeueHaasUnica text-[18px] font-normal leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]">
                  {openingHoursParts[0]}
                </p>
              )}

              {selected.fax && (
                <p className="font-NeueHaasUnica text-[18px] font-normal leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]">
                  <span>Fax: </span>
                  {selected.fax}
                </p>
              )}
              {openingHoursParts[1] && (
                <p className="font-NeueHaasUnica text-[18px] font-normal leading-[25.2px] tracking-normal text-[rgba(71,71,71,1)]">
                  {openingHoursParts[1]}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Gallery Section: Display detailed images instead of a single cover image */}
        <div className="flex flex-col gap-10 md:flex-row">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0.6, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
          >
            {selected.images && selected.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {selected.images.map((img) => (
                  <Image
                    key={img.id}
                    src={img.image}
                    alt={img.alt_text || `${selected.name} detail`}
                    layout="responsive"
                    width={600}
                    height={400}
                    className="w-full border"
                  />
                ))}
              </div>
            ) : (
              // If there are no detailed images, fall back to the cover image.
              <Image
                src={selected.image}
                alt={`${selected.name} interior view`}
                layout="responsive"
                width={600}
                height={400}
                className="w-full border"
              />
            )}
          </motion.div>

          <motion.div
            className="flex flex-col md:w-1/2"
            initial={{ opacity: 0.6, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
          >
            {selected.description && (
              <div>
                <h3 className="text-xl font-bold">About The Location</h3>
                <motion.p
                  className="mt-2 font-NeueHaasUnica text-[20px] text-[#36454F]"
                  initial={{ opacity: 0.6, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
                >
                  {selected.description}
                </motion.p>
              </div>
            )}
            {selected.note && (
              <div className="mt-6">
                <h3 className="text-xl font-bold">Location Notes</h3>
                <motion.p
                  className="mt-2 font-NeueHaasUnica text-[20px] text-[#36454F]"
                  initial={{ opacity: 0.6, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
                >
                  {selected.note}
                </motion.p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
