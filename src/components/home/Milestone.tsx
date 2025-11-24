// components/TwoSideTimeline.tsx

const leftSide = {
  2022: [
    {
      date: "December 23, 2022",
      text: "EBL becomes the first local bank to act as a Visa National Net Settlement Service (NNSS) agent.",
    },
    {
      date: "December 22, 2022",
      text: "EBL launches the 'Freelancer Ambassador Program' to inspire Bangladesh’s freelancing community.",
    },
    {
      date: "December 12, 2022",
      text: "Ali Reza Iftekhar receives the 'C-Suite CEO of the Year Award'.",
    },
    {
      date: "December 12, 2022",
      text: "EBL relaunches Mastercard Platinum Aqua Prepaid Card in a vertical look.",
    },
    {
      date: "December 07, 2022",
      text: "EBL and SOS Children’s Village join hands for youth skill development.",
    },
  ],
  2023: [
    {
      date: "December 23, 2023",
      text: "EBL becomes the first local bank to act as a Visa National Net Settlement Service (NNSS) agent.",
    },
    {
      date: "December 22, 2023",
      text: "EBL launches the 'Freelancer Ambassador Program'.",
    },
    {
      date: "December 12, 2023",
      text: "Ali Reza Iftekhar receives the 'C-Suite CEO of the Year Award'.",
    },
    {
      date: "December 12, 2023",
      text: "EBL relaunches Mastercard Platinum Aqua Prepaid Card in vertical look.",
    },
    {
      date: "December 07, 2023",
      text: "EBL and SOS Children’s Village join hands for youth skill development.",
    },
  ],
};

const rightSide = {
  2024: [
    {
      date: "December 23, 2024",
      text: "EBL becomes the first local bank to act as a Visa National Net Settlement Service (NNSS) agent.",
    },
    {
      date: "December 22, 2024",
      text: "EBL launches the 'Freelancer Ambassador Program'.",
    },
    {
      date: "December 12, 2024",
      text: "Ali Reza Iftekhar receives the 'C-Suite CEO of the Year Award'.",
    },
    {
      date: "December 12, 2024",
      text: "EBL relaunches Mastercard Platinum Aqua Prepaid Card.",
    },
    {
      date: "December 07, 2024",
      text: "EBL and SOS Children’s Village join hands for youth skill development.",
    },
  ],
  2025: [
    {
      date: "February 27, 2025",
      text: "EBL honors organizations for climate change initiatives at 'EBL Climate Change Action Awards 2025'.",
    },
    {
      date: "April 24, 2025",
      text: "EBL wins Digital CX Award for Cash Management Platform, presented by The Digital Banker.",
    },
    {
      date: "May 12, 2025",
      text: "EBL partners with IFC to advance climate risk management frameworks.",
    },
    {
      date: "May 13, 2025",
      text: "EBL partners with Grameen Digital Healthcare Solutions to support Hajj pilgrims with digital services.",
    },
  ],
};

export default function Milestone() {
  return (
    <section className="px-4 py-10 mx-auto container">
      {/* Heading */}
      <h2 className="text-center pt-16 pb-8 uppercase text-3xl md:text-5xl font-bold mb-12 text-gray-800">
        Company <span className="text-foreground-accent">Milestone</span>
      </h2>
      <div className="flex justify-between items-top gap-6">
        {/* Left Side */}
        <div className="space-y-6 md:w-[45%] w-auto">
          {Object.entries(leftSide).map(([year, items]) => (
            <div
              key={year}
              className="bg-gray-50 w-full p-5 rounded-lg shadow-md overflow-y-auto h-[380px] my-[15px]"
            >
              <h3 className="text-center text-xl font-bold py-3 bg-gray-200 rounded-md mb-4">
                {year}
              </h3>
              <ul className="space-y-3 text-sm">
                {items.map((event, idx) => (
                  <li key={idx}>
                    <strong>{event.date}</strong> - {event.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Vertical Divider */}
        <div className="flex justify-center md:w-[10%] w-auto">
          <div className="w-[3px] bg-gray-400 h-full rounded-md"></div>
        </div>

        {/* Right Side */}
        <div className="space-y-6 md:w-[45%] w-auto">
          {Object.entries(rightSide).map(([year, items]) => (
            <div
              key={year}
              className="bg-gray-50 w-full p-5 rounded-lg shadow-md overflow-y-auto h-[380px] my-[15px]"
            >
              <h3 className="text-center text-xl font-bold py-3 bg-gray-200 rounded-md mb-4">
                {year}
              </h3>
              <ul className="space-y-3 text-sm">
                {items.map((event, idx) => (
                  <li key={idx}>
                    <strong>{event.date}</strong> - {event.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
