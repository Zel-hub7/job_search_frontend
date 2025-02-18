console.log("Team Categories:", teamCategories);

{teamCategories?.map((category: TeamCategory, catIndex: number) => {
  console.log("Current Category:", category);
  return (
    <motion.div
      key={catIndex}
      className="mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <h2 className="mb-4 text-2xl font-bold text-[rgba(25,25,25,1)]">
        {category.name}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {category.team.map((tm: any) => {
          console.log("Team Member:", tm);
          return (
            <Link
              key={tm.id}
              href={`/team/${tm.id}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
                <Image
                  src={tm.image}
                  alt={tm.name}
                  priority
                  width={300}
                  height={320}
                  className="h-full w-full rounded-2xl object-cover object-top"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full space-y-2 rounded-b-lg bg-black bg-opacity-10 p-2 text-white">
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
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
})}
